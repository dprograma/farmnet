// File validation and optimization utilities

export const FILE_CONSTRAINTS = {
  video: {
    maxSize: 20 * 1024 * 1024, // 20MB
    allowedTypes: ['video/mp4', 'video/avi', 'video/mov', 'video/wmv', 'video/webm'],
    allowedExtensions: ['.mp4', '.avi', '.mov', '.wmv', '.webm']
  },
  image: {
    maxSize: 5 * 1024 * 1024, // 5MB per image
    totalMaxSize: 5 * 1024 * 1024, // 5MB total for all images
    allowedTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
    allowedExtensions: ['.jpg', '.jpeg', '.png', '.webp']
  }
};

export const validateFile = (file, type, existingFiles = []) => {
  const errors = [];
  const constraints = FILE_CONSTRAINTS[type];
  
  if (!constraints) {
    errors.push('Invalid file type specified');
    return { isValid: false, errors };
  }
  
  // Check file size
  if (file.size > constraints.maxSize) {
    const maxSizeMB = constraints.maxSize / (1024 * 1024);
    errors.push(`File size (${formatFileSize(file.size)}) exceeds maximum allowed size of ${maxSizeMB}MB`);
  }
  
  // Check file type
  if (!constraints.allowedTypes.includes(file.type)) {
    errors.push(`File type '${file.type}' is not allowed. Allowed types: ${constraints.allowedTypes.join(', ')}`);
  }
  
  // Check file extension
  const extension = getFileExtension(file.name);
  if (!constraints.allowedExtensions.includes(extension.toLowerCase())) {
    errors.push(`File extension '${extension}' is not allowed. Allowed extensions: ${constraints.allowedExtensions.join(', ')}`);
  }
  
  // For images, check total size constraint
  if (type === 'image' && existingFiles.length > 0) {
    const existingImageFiles = existingFiles.filter(f => f.type === 'image');
    const totalExistingSize = existingImageFiles.reduce((sum, f) => sum + f.file.size, 0);
    
    if (totalExistingSize + file.size > constraints.totalMaxSize) {
      const totalMaxSizeMB = constraints.totalMaxSize / (1024 * 1024);
      errors.push(`Total image size would exceed ${totalMaxSizeMB}MB limit`);
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateMultipleFiles = (files, type, existingFiles = []) => {
  const results = [];
  let cumulativeFiles = [...existingFiles];
  
  for (const file of files) {
    const validation = validateFile(file, type, cumulativeFiles);
    
    if (validation.isValid) {
      // Add valid file to cumulative list for next validation
      cumulativeFiles.push({
        file,
        type,
        name: file.name,
        size: file.size
      });
    }
    
    results.push({
      file,
      validation
    });
  }
  
  return results;
};

export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const getFileExtension = (filename) => {
  return filename.toLowerCase().substr(filename.lastIndexOf('.'));
};

export const generateThumbnail = (videoFile) => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    video.preload = 'metadata';
    video.muted = true;
    
    video.onloadeddata = () => {
      // Set canvas dimensions to video dimensions
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      // Seek to 2 seconds or 10% of video duration, whichever is smaller
      const seekTime = Math.min(2, video.duration * 0.1);
      video.currentTime = seekTime;
    };
    
    video.onseeked = () => {
      try {
        // Draw video frame to canvas
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Convert canvas to blob
        canvas.toBlob((blob) => {
          if (blob) {
            const thumbnailFile = new File([blob], `${videoFile.name}-thumbnail.jpg`, {
              type: 'image/jpeg'
            });
            resolve(thumbnailFile);
          } else {
            reject(new Error('Failed to generate thumbnail'));
          }
        }, 'image/jpeg', 0.8);
      } catch (error) {
        reject(error);
      }
    };
    
    video.onerror = () => {
      reject(new Error('Failed to load video for thumbnail generation'));
    };
    
    // Create object URL and set as video source
    const videoURL = URL.createObjectURL(videoFile);
    video.src = videoURL;
    
    // Clean up object URL after processing
    video.onloadeddata = (originalHandler => () => {
      if (originalHandler) originalHandler();
      URL.revokeObjectURL(videoURL);
    })(video.onloadeddata);
  });
};

export const compressImage = (imageFile, maxWidth = 1920, maxHeight = 1080, quality = 0.8) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    img.onload = () => {
      // Calculate new dimensions
      let { width, height } = img;
      
      if (width > maxWidth || height > maxHeight) {
        const aspectRatio = width / height;
        
        if (width > height) {
          width = Math.min(width, maxWidth);
          height = width / aspectRatio;
        } else {
          height = Math.min(height, maxHeight);
          width = height * aspectRatio;
        }
      }
      
      // Set canvas dimensions
      canvas.width = width;
      canvas.height = height;
      
      // Draw and compress image
      ctx.drawImage(img, 0, 0, width, height);
      
      canvas.toBlob((blob) => {
        if (blob) {
          const compressedFile = new File([blob], imageFile.name, {
            type: imageFile.type,
            lastModified: Date.now()
          });
          resolve(compressedFile);
        } else {
          reject(new Error('Failed to compress image'));
        }
      }, imageFile.type, quality);
    };
    
    img.onerror = () => {
      reject(new Error('Failed to load image for compression'));
    };
    
    // Create object URL and set as image source
    const imageURL = URL.createObjectURL(imageFile);
    img.src = imageURL;
    
    // Clean up object URL after processing
    img.onload = (originalHandler => () => {
      if (originalHandler) originalHandler();
      URL.revokeObjectURL(imageURL);
    })(img.onload);
  });
};

export const getVideoDuration = (videoFile) => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.preload = 'metadata';
    video.muted = true;
    
    video.onloadedmetadata = () => {
      resolve(Math.round(video.duration));
      URL.revokeObjectURL(video.src);
    };
    
    video.onerror = () => {
      reject(new Error('Failed to load video metadata'));
      URL.revokeObjectURL(video.src);
    };
    
    video.src = URL.createObjectURL(videoFile);
  });
};

export const processUploadedFile = async (file, type) => {
  const validation = validateFile(file, type);
  
  if (!validation.isValid) {
    throw new Error(validation.errors.join(', '));
  }
  
  const processedFile = {
    originalFile: file,
    type,
    name: file.name,
    size: file.size,
    validationPassed: true
  };
  
  try {
    if (type === 'video') {
      // Generate thumbnail and get duration
      const [thumbnail, duration] = await Promise.all([
        generateThumbnail(file),
        getVideoDuration(file)
      ]);
      
      processedFile.thumbnail = thumbnail;
      processedFile.duration = duration;
      processedFile.previewUrl = URL.createObjectURL(file);
      
    } else if (type === 'image') {
      // Compress image if needed
      const compressedImage = await compressImage(file);
      processedFile.processedFile = compressedImage;
      processedFile.previewUrl = URL.createObjectURL(compressedImage);
      processedFile.compressionRatio = ((file.size - compressedImage.size) / file.size * 100).toFixed(1);
    }
    
    return processedFile;
    
  } catch (error) {
    throw new Error(`Failed to process ${type}: ${error.message}`);
  }
};

// Cleanup function to revoke object URLs
export const cleanupFileUrls = (files) => {
  files.forEach(file => {
    if (file.previewUrl) {
      URL.revokeObjectURL(file.previewUrl);
    }
  });
};