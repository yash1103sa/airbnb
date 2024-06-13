const express = require("express");
const router =  express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const expressError = require("../utils/expressError.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const mongoose = require("mongoose");
const path = require("path");
const { isLoggedIn , isreviewAuthor } = require("../middleware.js");

// review
// post rourte
router.post("/",isLoggedIn,wrapAsync(async(req,res)=>{
    const listing= await Listing.findById(req.params.id);
    let newReview=new Review(req.body.review);
    newReview.author=req.user._id; 
    console.log(newReview);
    listing.review.push(newReview);
  
    await newReview.save();
    await listing.save();
    req.flash("success"," review posted ");
  
  res.redirect(`/listing/${listing._id}`);
  }));
  
  // delete review route
  
  router.delete("/:reviewId",isreviewAuthor,isLoggedIn,wrapAsync(async(req,res)=>{
      let{id, reviewId}=req.params;
      await Listing.findByIdAndUpdate(id,{$pull:{Review:reviewId}})
      await Review.findByIdAndDelete(reviewId);
      req.flash("success"," review deleted ");
      res.redirect(`/listing/${id}`);

  }))

  module.exports=router;