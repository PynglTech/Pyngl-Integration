// import { v2 as cloudinary } from 'cloudinary';
// import { CloudinaryStorage } from 'multer-storage-cloudinary';
// import multer from 'multer';
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// // --- Multer Configuration (Unchanged) ---
// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: 'Pyngl',
//     allowed_formats: ['jpeg', 'png', 'jpg'],
//   },
// });
// const upload = multer({ storage: storage });

// // --- SIMPLIFIED Upload Handler (Corrected) ---
// // This function now ONLY handles the upload, without asking for any analysis.
// const handleUpload = (fileBuffer) => {
//   return new Promise((resolve, reject) => {
//     const uploadStream = cloudinary.uploader.upload_stream(
//       {
//         folder: 'Pyngl', // We just specify the folder
//         // The problematic "detection" line has been removed.
//       },
//       (error, result) => {
//         if (error) {
//           return reject(error);
//         }
//         resolve(result);
//       }
//     );

//     uploadStream.end(fileBuffer);
//   });
// };

// // --- Exports (Unchanged) ---
// export { cloudinary, upload, handleUpload, storage };
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

// --- CLOUDINARY CONFIGURATION ---
// This remains the same and is correct.
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// --- MULTER STORAGE FOR FORM UPLOADS ---
// This is used for direct file uploads from a client's form.
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


// --- NEW HELPER FUNCTION (FROM YOUR NEW FILE) ---
// A specialized helper for uploading preview images to a specific sub-folder.
const uploadPreviewImage = async (fileBuffer) => {
  // Uploads to the "Pyngl/Previews" sub-folder
  const result = await handleUpload(fileBuffer, 'Pyngl/Previews');
  return result.secure_url;
};

// --- EXPORTS ---
// Exporting everything for maximum flexibility.
export { cloudinary, upload, handleUpload, uploadPreviewImage, storage };