// // const cloudinary = require('cloudinary').v2;
// // const { CloudinaryStorage } = require('multer-storage-cloudinary');

// // cloudinary.config({ 
// //     cloud_name: process.env.CLOUD_NAME,
// //     api_key: process.env.CLOUD_API_KET,
// //     api_secret: process.env.CLOUD_API_SECRET
// // });

// // const storage = new CloudinaryStorage({
// //   cloudinary: cloudinary,
// //   params: {
// //     folder: 'wanderlust_DEV',
// //     allowedFormates: ['jpeg', 'png', 'jpg'],
// //   },
// // });

// module.exports = {
//     cloudinary,
//     storage,
// }

// const cloudinary = require("cloudinary").v2;
// const { CloudinaryStorage } = require("multer-storage-cloudinary");

// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUD_API_KEY,      // ✅ FIXED
//   api_secret: process.env.CLOUD_API_SECRET,
// });

// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: "wanderlust_DEV",
//     allowedFormats: ["jpeg", "png", "jpg"], // ✅ FIXED
//   },
// });

// module.exports = {
//   cloudinary,
//   storage,
// };

const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "wanderlust_DEV",
    allowed_formats: ["jpeg", "png", "jpg","webp","avif"]
  },
});

module.exports = {
  cloudinary,
  storage,
};
