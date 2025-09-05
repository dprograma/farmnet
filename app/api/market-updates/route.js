import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { upload, runMiddleware, processImage, processVideo, generateVideoThumbnail, validateFileSize } from '../../lib/fileUpload';

const prisma = new PrismaClient();

// GET - Fetch market updates with filtering
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const type = searchParams.get('type');
    const commodity = searchParams.get('commodity');
    const location = searchParams.get('location');
    const limit = parseInt(searchParams.get('limit')) || 50;
    const offset = parseInt(searchParams.get('offset')) || 0;

    const where = {};
    
    // Apply filters
    if (status && status !== 'all') {
      where.status = status;
    }
    
    if (type && type !== 'all') {
      where.type = type;
    }
    
    if (commodity) {
      where.commodity = {
        contains: commodity,
        mode: 'insensitive'
      };
    }
    
    if (location) {
      where.location = {
        contains: location,
        mode: 'insensitive'
      };
    }

    // For public API, only return approved updates
    if (!request.headers.get('admin-auth')) {
      where.status = 'APPROVED';
    }

    const updates = await prisma.marketUpdate.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset
    });

    const total = await prisma.marketUpdate.count({ where });

    return NextResponse.json({
      success: true,
      data: updates,
      meta: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total
      }
    });

  } catch (error) {
    console.error('Error fetching market updates:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch market updates' },
      { status: 500 }
    );
  }
}

// POST - Create new market update submission with real file uploads
export async function POST(request) {
  try {
    const formData = await request.formData();
    
    // Extract form fields
    const submitterName = formData.get('submitterName');
    const submitterPhone = formData.get('submitterPhone');
    const commodity = formData.get('commodity');
    const location = formData.get('location');
    const description = formData.get('description');
    const price = formData.get('price') ? parseFloat(formData.get('price')) : null;
    const unit = formData.get('unit');

    // Validate required fields
    if (!submitterName || !submitterPhone || !commodity || !location || !description) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Process uploaded files
    const uploadedFiles = [];
    const processedMediaFiles = [];
    let fileIndex = 0;
    
    // Collect all uploaded files
    const files = [];
    while (formData.get(`file_${fileIndex}`)) {
      const file = formData.get(`file_${fileIndex}`);
      const buffer = Buffer.from(await file.arrayBuffer());
      
      files.push({
        originalName: file.name,
        buffer,
        mimetype: file.type,
        size: file.size
      });
      
      fileIndex++;
    }

    // Validate file sizes
    const sizeErrors = validateFileSize(files);
    if (sizeErrors.length > 0) {
      return NextResponse.json(
        { success: false, error: sizeErrors.join(', ') },
        { status: 400 }
      );
    }

    // Process each file
    for (const file of files) {
      try {
        let processedUrl;
        let thumbnailUrl = null;
        
        if (file.mimetype.startsWith('image/')) {
          processedUrl = await processImage(file.buffer, file.originalName);
        } else if (file.mimetype.startsWith('video/')) {
          processedUrl = await processVideo(file.buffer, file.originalName);
          thumbnailUrl = await generateVideoThumbnail(processedUrl);
        }
        
        processedMediaFiles.push(processedUrl);
        
        uploadedFiles.push({
          originalName: file.originalName,
          url: processedUrl,
          thumbnailUrl,
          type: file.mimetype,
          size: file.size
        });
        
      } catch (error) {
        console.error(`Error processing file ${file.originalName}:`, error);
        return NextResponse.json(
          { success: false, error: `Failed to process file: ${file.originalName}` },
          { status: 500 }
        );
      }
    }

    // Determine update type based on uploaded files
    const hasVideo = uploadedFiles.some(f => f.type.startsWith('video/'));
    const updateType = hasVideo ? 'VIDEO' : 'TEXT_WITH_IMAGES';

    // Create market submission record
    const submission = await prisma.marketSubmission.create({
      data: {
        submitterName,
        submitterPhone,
        commodity,
        location,
        description,
        price,
        unit,
        mediaFiles: processedMediaFiles
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Market update submitted successfully! It will be reviewed by our team before publishing.',
      data: {
        submissionId: submission.id,
        filesProcessed: uploadedFiles.length,
        updateType
      }
    });

  } catch (error) {
    console.error('Error creating market update:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to submit market update. Please try again.' },
      { status: 500 }
    );
  }
}