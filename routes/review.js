const express = require('express');
// const router = express.Router();
const router = express.Router({ mergeParams:true });

const wrapAsync = require("../utils/wrapAsync.js")
const ExpressError = require("../utils/ExpressError");
const Review = require("../models/review.js")
const Listing = require("../models/listing.js")
const { 
  validateReview,
   isLoggedIn, 
   isReviewAuthor
   } = require("../middileware.js");
 
   const { createReview, destroyReview } = require("../controllers/reviews.js");
const review = require('../models/review.js');


// Review
//Post Route
router.post(
  "/",
  isLoggedIn,
   validateReview,
    wrapAsync(createReview));
//Delete Review Route
router.delete(
    "/:reviewId",
    isLoggedIn,
    isReviewAuthor,
    wrapAsync(destroyReview)
);


module.exports = router;