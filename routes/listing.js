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

// index route
router.get("/",wrapAsync(async(req,res)=>{
    const allListings=await Listing.find({});
    res.render("listings/index.ejs",{allListings});
    }));


//new route
router.get("/new",(req,res)=>{
    res.render("listings/new.ejs");
})



// show route
router.get("/:id",wrapAsync(async(req,res)=>{
       let {id}=req.params;
       const listing=await Listing.findById(id).populate("review");
       res.render("listings/show.ejs",{listing});
}));

// create route
router.post("/",wrapAsync(async(req,res)=>{
    let newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listing");
}));

// edit route
router.get("/:id/edit",wrapAsync(async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
}));

// update route
router.put("/:id",wrapAsync(async(req,res)=>{
    let {id}=req.params;
   const waitedListing = await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect(`/listing/${id}`);
}));

// delete route
router.delete("/:id",wrapAsync(async(req,res)=>{
    let {id}=req.params;
    const deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listing")
}));

module.exports=router;