// const multer = require('multer');
// const path = require('path');

// // Define storage configuration
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     // Set destination folder for file uploads

//     cb(null, '../uploads/images')
//   },
//   filename: (req, file, cb) => {
//     // Set filename with original name and timestamp
//     cb(null, `${Date.now()}_${file.originalname}`);
//   },
// });

// // Define file filter
// const fileFilter = (req, file, cb) => {
//   // Allowed file types
//   const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];


//   if (allowedTypes.includes(file.mimetype)) {
//     cb(null, true); // Accept file
//   } else {
//     cb(new Error('Invalid file type. Only JPEG, PNG, and JPG are allowed.'), false); // Reject file
//   }
// };

// // Create multer instance
// const upload = multer({
//   storage: storage,
//   fileFilter: fileFilter,
//   limits: {
//     fileSize: 5 * 1024 * 1024, // Limit file size to 5MB
//   },
// });

// module.exports = upload;



const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Set up Cloudinary storage for Multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads/images', // The folder in Cloudinary where the images will be stored
    allowed_formats: ['jpg', 'jpeg', 'png'], // Allowed file types
    public_id: (req, file) => Date.now() + '-' + file.originalname, // File name on Cloudinary
  },
});

// Initialize Multer with Cloudinary storage
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
});

module.exports = upload;


