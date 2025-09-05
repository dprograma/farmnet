import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { requireAdmin } from '../../../lib/auth';

const prisma = new PrismaClient();

// GET - Admin: Fetch all market updates and submissions
const getHandler = async (request) => {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const type = searchParams.get('type');
    const search = searchParams.get('search');
    const limit = parseInt(searchParams.get('limit')) || 50;
    const offset = parseInt(searchParams.get('offset')) || 0;

    const where = {};
    
    if (status && status !== 'all') {
      where.status = status;
    }
    
    if (type && type !== 'all') {
      where.type = type;
    }
    
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { commodity: { contains: search, mode: 'insensitive' } },
        { location: { contains: search, mode: 'insensitive' } },
        { submittedBy: { contains: search, mode: 'insensitive' } }
      ];
    }

    // Get pending submissions (not yet processed into market updates)
    const submissions = await prisma.marketSubmission.findMany({
      where: { processed: false },
      orderBy: { createdAt: 'desc' }
    });

    // Get existing market updates
    const updates = await prisma.marketUpdate.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset
    });

    const total = await prisma.marketUpdate.count({ where });

    // Get statistics including submissions
    const submissionCount = await prisma.marketSubmission.count({ where: { processed: false } });
    const stats = await prisma.marketUpdate.groupBy({
      by: ['status'],
      _count: {
        status: true
      }
    });

    const statsFormatted = {
      total: await prisma.marketUpdate.count(),
      pending: stats.find(s => s.status === 'PENDING')?._count.status || 0,
      approved: stats.find(s => s.status === 'APPROVED')?._count.status || 0,
      rejected: stats.find(s => s.status === 'REJECTED')?._count.status || 0,
      submissions: submissionCount
    };

    return NextResponse.json({
      success: true,
      data: {
        updates,
        submissions
      },
      stats: statsFormatted,
      meta: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total
      }
    });

  } catch (error) {
    console.error('Error fetching admin market updates:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch market updates' },
      { status: 500 }
    );
  }
};

export const GET = requireAdmin(getHandler);

// POST - Admin: Approve submissions and create market updates
const postHandler = async (request) => {
  try {
    const { submissionIds, action = 'approve' } = await request.json();

    if (!submissionIds || !Array.isArray(submissionIds)) {
      return NextResponse.json(
        { success: false, error: 'Invalid submission IDs provided' },
        { status: 400 }
      );
    }

    if (action === 'approve') {
      // Get submissions to approve
      const submissions = await prisma.marketSubmission.findMany({
        where: {
          id: { in: submissionIds },
          processed: false
        }
      });

      const createdUpdates = [];

      for (const submission of submissions) {
        // Determine update type based on media files
        const hasVideo = submission.mediaFiles.some(url => 
          url.includes('/videos/') || url.match(/\.(mp4|avi|mov|wmv|webm)$/i)
        );
        const updateType = hasVideo ? 'VIDEO' : 'TEXT_WITH_IMAGES';

        // Create market update
        const marketUpdate = await prisma.marketUpdate.create({
          data: {
            title: `${submission.commodity} Market Update - ${submission.location}`,
            description: submission.description,
            type: updateType,
            status: 'APPROVED',
            commodity: submission.commodity,
            location: submission.location,
            price: submission.price,
            unit: submission.unit,
            videoUrl: hasVideo ? submission.mediaFiles.find(url => url.includes('/videos/')) : null,
            videoThumbnail: hasVideo ? submission.mediaFiles.find(url => url.includes('/videos/'))?.replace('/videos/', '/images/thumb_') : null,
            images: submission.mediaFiles.filter(url => url.includes('/images/')),
            submittedBy: submission.submitterName,
            submitterContact: submission.submitterPhone,
            approvedAt: new Date(),
            approvedBy: request.admin.name
          }
        });

        // Mark submission as processed
        await prisma.marketSubmission.update({
          where: { id: submission.id },
          data: {
            processed: true,
            marketUpdateId: marketUpdate.id,
            processedAt: new Date()
          }
        });

        createdUpdates.push(marketUpdate);
      }

      return NextResponse.json({
        success: true,
        message: `${createdUpdates.length} submissions approved and published`,
        data: createdUpdates
      });

    } else if (action === 'reject') {
      // Mark submissions as processed but don't create market updates
      await prisma.marketSubmission.updateMany({
        where: {
          id: { in: submissionIds },
          processed: false
        },
        data: {
          processed: true,
          processedAt: new Date()
        }
      });

      return NextResponse.json({
        success: true,
        message: `${submissionIds.length} submissions rejected`
      });
    }

  } catch (error) {
    console.error('Error processing submissions:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process submissions' },
      { status: 500 }
    );
  }
};

export const POST = requireAdmin(postHandler);

// PUT - Admin: Update existing market updates (approve/reject/edit)
const putHandler = async (request) => {
  try {
    const { updateIds, action, reason } = await request.json();

    if (!updateIds || !Array.isArray(updateIds) || updateIds.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Invalid update IDs provided' },
        { status: 400 }
      );
    }

    if (!['approve', 'reject'].includes(action)) {
      return NextResponse.json(
        { success: false, error: 'Invalid action. Must be approve or reject' },
        { status: 400 }
      );
    }

    const updateData = {
      status: action === 'approve' ? 'APPROVED' : 'REJECTED',
      updatedAt: new Date()
    };

    if (action === 'approve') {
      updateData.approvedAt = new Date();
      updateData.approvedBy = request.admin.name;
    } else if (action === 'reject' && reason) {
      updateData.adminNotes = reason;
    }

    const result = await prisma.marketUpdate.updateMany({
      where: {
        id: { in: updateIds },
        status: 'PENDING' // Only allow updating pending updates
      },
      data: updateData
    });

    return NextResponse.json({
      success: true,
      message: `${result.count} updates ${action}d successfully`,
      updatedCount: result.count
    });

  } catch (error) {
    console.error('Error updating market updates:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update market updates' },
      { status: 500 }
    );
  }
};

export const PUT = requireAdmin(putHandler);

// DELETE - Admin: Delete market updates
const deleteHandler = async (request) => {
  try {
    const { updateIds } = await request.json();

    if (!updateIds || !Array.isArray(updateIds) || updateIds.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Invalid update IDs provided' },
        { status: 400 }
      );
    }

    // Delete the updates
    const result = await prisma.marketUpdate.deleteMany({
      where: {
        id: { in: updateIds }
      }
    });

    return NextResponse.json({
      success: true,
      message: `${result.count} updates deleted successfully`,
      deletedCount: result.count
    });

  } catch (error) {
    console.error('Error deleting market updates:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete market updates' },
      { status: 500 }
    );
  }
};

export const DELETE = requireAdmin(deleteHandler);