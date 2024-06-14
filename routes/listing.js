const express = require("express");
const router =  express.Router();
const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const path = require("path");
// const methodOverride = require("method-override");
// const ejsMate = require("ejs-mate");
const wrapAsync = require("../utils/wrapAsync.js");
const expressError = require("../utils/expressError.js");
const Review = require("../models/review.js");
const { isLoggedIn } = require("../middleware.js");
mongoose.set('strictPopulate', false);


const listingController = require("../controllers/listing.js");

router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(isLoggedIn,wrapAsync(listingController.createListing));
  
  
//new route
router.get("/new",isLoggedIn,listingController.renderNewForm);


  router
  .route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(isLoggedIn,wrapAsync(listingController.updateListing))
  .delete(isLoggedIn,wrapAsync(listingController.destroyListing));


// edit route
router.get("/:id/edit",isLoggedIn,wrapAsync(listingController.renderEditForm));


module.exports=router;