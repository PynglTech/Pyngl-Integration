import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

// --- CLOUDINARY CONFIGURATION ---
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer storage for normal poll images (using CloudinaryStorage)
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'Pyngl',
    allowed_formats: ['jpeg', 'png', 'jpg'],
  },
});
const upload = multer({ storage });

// --- Core Upload Function ---
// Accepts a file buffer and a folder name
const handleUpload = (fileBuffer, folder = 'Pyngl') => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: folder,
        allowed_formats: ['jpeg', 'png', 'jpg'],
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result); // result.secure_url is the hosted image URL
      }
    );
    // Write the Buffer directly to the upload stream
    uploadStream.end(fileBuffer); 
  });
};

// --- Helper for preview image upload (Now uses the buffer directly) ---
// Note: Multer's memoryStorage gives us req.file.buffer (a Node.js Buffer), not a browser Blob.
const uploadPreviewImage = async (fileBuffer) => {
  // Upload to Cloudinary in "Pyngl/Previews" folder
  const result = await handleUpload(fileBuffer, 'Pyngl/Previews');
  return result.secure_url; // This is your hosted preview image URL
};

// --- EXPORTS ---
export { cloudinary, upload, handleUpload, uploadPreviewImage, storage };