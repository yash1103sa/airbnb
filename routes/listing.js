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

// index route
router.get("/",wrapAsync(listingController.index));


//new route
router.get("/new",isLoggedIn,listingController.renderNewForm);



// show route
router.get("/:id",wrapAsync(listingController.showListing));

// create route
router.post("/",isLoggedIn,wrapAsync(listingController.createListing));

// edit route
router.get("/:id/edit",isLoggedIn,wrapAsync(listingController.renderEditForm));

// update route
router.put("/:id",isLoggedIn,wrapAsync(listingController.updateListing));

// delete route
router.delete("/:id",isLoggedIn,wrapAsync(listingController.destroyListing));

module.exports=router;