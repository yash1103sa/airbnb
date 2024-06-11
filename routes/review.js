const express = require("express");
const router =  express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const expressError = require("../utils/expressError.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const mongoose = require("mongoose");
const path = require("path");


// review
// post rourte
router.post("/",wrapAsync(async(req,res)=>{
    const listing= await Listing.findById(req.params.id);
    let newReview=new Review(req.body.review);
  
    listing.review.push(newReview);
  
    await newReview.save();
    await listing.save();
  
  res.redirect(`/listing/${listing._id}`);
  }));
  
  // delete review route
  
  router.delete("/:reviewId",wrapAsync(async(req,res)=>{
      let{id, reviewId}=req.params;
      await Listing.findByIdAndUpdate(id,{$pull:{Review:reviewId}})
      await Review.findByIdAndDelete(reviewId);
      
      res.redirect(`/listing/${id}`);
  }))

  module.exports=router;