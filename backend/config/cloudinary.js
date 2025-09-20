import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// --- Multer Configuration (Unchanged) ---
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'Pyngl',
    allowed_formats: ['jpeg', 'png', 'jpg'],
  },
});
const upload = multer({ storage: storage });

// --- SIMPLIFIED Upload Handler (Corrected) ---
// This function now ONLY handles the upload, without asking for any analysis.
const handleUpload = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'Pyngl', // We just specify the folder
        // The problematic "detection" line has been removed.
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result);
      }
    );

    uploadStream.end(fileBuffer);
  });
};

// --- Exports (Unchanged) ---
export { cloudinary, upload, handleUpload, storage };