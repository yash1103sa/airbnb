const express = require("express");
const router =  express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const expressError = require("../utils/expressError.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const mongoose = require("mongoose");
const path = require("path");
const { isLoggedIn , isreviewAuthor } = require("../middleware.js");
const reviewController = require("../controllers/review.js");

// review
// post rourte
router.post("/",isLoggedIn,wrapAsync(reviewController.createReview));
  
// delete review route
 router.delete("/:reviewId",isreviewAuthor,isLoggedIn,wrapAsync(reviewController.destroyReview));

  module.exports=router;