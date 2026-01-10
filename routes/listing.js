const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middileware.js");

const listingController = require("../controllers/listings.js");

const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });


// INDEX + CREATE
router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    wrapAsync(listingController.createListing)
  );


// NEW FORM
router.get(
  "/new",
  isLoggedIn,
  listingController.renderNewForm
);


// SHOW + UPDATE + DELETE
router
  .route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateListing)
  )
  .delete(
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.destroyListing)
  );


// EDIT FORM
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);

module.exports = router;


// const express = require('express');
// const router = express.Router();

// // Import Cloudinary upload
// const { upload } = require('../cloudConfig');

// // Single file upload route
// router.post('/upload', upload.single('image'), (req, res) => {
//   console.log(req.file); // Cloudinary से upload info
//   res.send({
//     message: 'File uploaded successfully!',
//     file: req.file
//   });
// });

// // Multiple files upload example
// router.post('/uploads', upload.array('images', 5), (req, res) => {
//   console.log(req.files); // array of uploaded files
//   res.send({
//     message: 'Files uploaded successfully!',
//     files: req.files
//   });
// });

// module.exports = router;
