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

// index route
router.get("/",wrapAsync(async(req,res)=>{
    const allListings=await Listing.find({});
    res.render("listings/index.ejs",{allListings});
    }));


//new route
router.get("/new",isLoggedIn,(req,res)=>{
    res.render("listings/new.ejs");
})



// show route
router.get("/:id",wrapAsync(async(req,res)=>{
       let {id}=req.params;
       const listing=await Listing.findById(id).populate({path:"review",populate:{path:"author",},}).populate("owner");
       if(!listing){
        req.flash("error"," property not found");
        res.redirect("/listing");
       }
       console.log(listing);
       res.render("listings/show.ejs",{listing});
}));

// create route
router.post("/",isLoggedIn,wrapAsync(async(req,res)=>{
    let newListing = new Listing(req.body.listing);
    newListing.owner=req.user._id;
    await newListing.save();
    req.flash("success","new property add");
    res.redirect("/listing");
}));

// edit route
router.get("/:id/edit",isLoggedIn,wrapAsync(async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    if(!listing){
        req.flash("error"," property not found");
        res.redirect("/listing");
       }
    res.render("listings/edit.ejs",{listing});
}));

// update route
router.put("/:id",isLoggedIn,wrapAsync(async(req,res)=>{
    let {id}=req.params;
   const waitedListing = await Listing.findByIdAndUpdate(id,{...req.body.listing});
   req.flash("success"," property updated ");
    res.redirect(`/listing/${id}`);
}));

// delete route
router.delete("/:id",isLoggedIn,wrapAsync(async(req,res)=>{
    let {id}=req.params;
    const deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success"," property deleted");
    res.redirect("/listing")
}));

module.exports=router;