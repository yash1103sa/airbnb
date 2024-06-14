const Listing = require("../models/listing.js");


module.exports.index=async(req,res)=>{
    const allListings=await Listing.find({});
    res.render("listings/index.ejs",{allListings});
};

module.exports.renderNewForm = (req,res)=>{
    res.render("listings/new.ejs");
}; 

module.exports.showListing=async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id).populate({path:"review",populate:{path:"author", },}).populate("owner");
    if(!listing){
     req.flash("error"," property not found");
     res.redirect("/listing");
    }
    console.log(listing);
    res.render("listings/show.ejs",{listing});
};

module.exports.createListing=async(req,res)=>{
    let newListing = new Listing(req.body.listing);
    newListing.owner=req.user._id;
    await newListing.save();
    req.flash("success","new property add");
    res.redirect("/listing");
};

module.exports.renderEditForm=async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    if(!listing){
        req.flash("error"," property not found");
        res.redirect("/listing");
       }
    res.render("listings/edit.ejs",{listing});
};

module.exports.updateListing=async(req,res)=>{
    let {id}=req.params;
   const waitedListing = await Listing.findByIdAndUpdate(id,{...req.body.listing});
   req.flash("success"," property updated ");
    res.redirect(`/listing/${id}`);
};

module.exports.destroyListing=async(req,res)=>{
    let {id}=req.params;
    const deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success"," property deleted");
    res.redirect("/listing")
};