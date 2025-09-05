import multer from 'multer';
import sharp from 'sharp';
import path from 'path';
import { promises as fs } from 'fs';
import { v4 as uuidv4 } from 'uuid';

// Configure multer for memory storage
export const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 20 * 1024 * 1024, // 20MB max
    files: 10 // Max 10 files per request
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'image/jpeg', 'image/jpg', 'image/png', 'image/webp',
      'video/mp4', 'video/avi', 'video/mov', 'video/wmv', 'video/webm'
    ];
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`File type ${file.mimetype} not allowed`), false);
    }
  }
});

export const processImage = async (buffer, filename) => {
  try {
    const uniqueFilename = `${uuidv4()}_${filename}`;
    const outputPath = path.join(process.cwd(), 'public', 'uploads', 'images', uniqueFilename);
    
    // Compress and resize image
    await sharp(buffer)
      .resize(1920, 1080, { 
        fit: 'inside', 
        withoutEnlargement: true 
      })
      .jpeg({ 
        quality: 85, 
        progressive: true 
      })
      .toFile(outputPath);
    
    return `/uploads/images/${uniqueFilename}`;
  } catch (error) {
    throw new Error(`Image processing failed: ${error.message}`);
  }
};

export const processVideo = async (buffer, filename) => {
  try {
    const uniqueFilename = `${uuidv4()}_${filename}`;
    const outputPath = path.join(process.cwd(), 'public', 'uploads', 'videos', uniqueFilename);
    
    // Save video file
    await fs.writeFile(outputPath, buffer);
    
    return `/uploads/videos/${uniqueFilename}`;
  } catch (error) {
    throw new Error(`Video processing failed: ${error.message}`);
  }
};

export const generateVideoThumbnail = async (videoPath) => {
  try {
    // For now, return a placeholder thumbnail
    // In production, you'd use ffmpeg to generate actual thumbnails
    const thumbnailName = `thumb_${uuidv4()}.jpg`;
    const thumbnailPath = path.join(process.cwd(), 'public', 'uploads', 'images', thumbnailName);
    
    // Create a simple placeholder thumbnail (400x225)
    await sharp({
      create: {
        width: 400,
        height: 225,
        channels: 3,
        background: { r: 64, g: 64, b: 64 }
      }
    })
    .png()
    .composite([{
      input: Buffer.from(`
        <svg width="80" height="80">
          <polygon points="30,20 30,60 70,40" fill="white"/>
        </svg>
      `),
      top: 72,
      left: 160
    }])
    .jpeg()
    .toFile(thumbnailPath);
    
    return `/uploads/images/${thumbnailName}`;
  } catch (error) {
    console.error('Thumbnail generation failed:', error);
    return null;
  }
};

export const deleteFile = async (filePath) => {
  try {
    const fullPath = path.join(process.cwd(), 'public', filePath);
    await fs.unlink(fullPath);
    return true;
  } catch (error) {
    console.error('File deletion failed:', error);
    return false;
  }
};

export const validateFileSize = (files) => {
  let totalImageSize = 0;
  let errors = [];
  
  for (const file of files) {
    if (file.mimetype.startsWith('image/')) {
      totalImageSize += file.size;
      
      if (file.size > 5 * 1024 * 1024) { // 5MB per image
        errors.push(`Image ${file.originalname} exceeds 5MB limit`);
      }
    } else if (file.mimetype.startsWith('video/')) {
      if (file.size > 20 * 1024 * 1024) { // 20MB per video
        errors.push(`Video ${file.originalname} exceeds 20MB limit`);
      }
    }
  }
  
  if (totalImageSize > 5 * 1024 * 1024) { // Total image size limit
    errors.push('Total image size exceeds 5MB limit');
  }
  
  return errors;
};

// Helper to run multer in Next.js API route
export const runMiddleware = (req, res, fn) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
};