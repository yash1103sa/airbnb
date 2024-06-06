const express = require("express");
const app =   express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

main()
.then(()=>{
    console.log("connected to db");
})
.catch((err) => { 
    console.log(err);
});

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

// index route
app.get("/listing",async(req,res)=>{
    const allListings=await Listing.find({});
    res.render("listings/index.ejs",{allListings});
    })


//new route
app.get("/listing/new",(req,res)=>{
    res.render("listings/new.ejs");
})



// show route
app.get("/listing/:id",async(req,res)=>{
       let {id}=req.params;
       const listing=await Listing.findById(id);
       res.render("listings/show.ejs",{listing});
}) 

// create route
app.post("/listing",async(req,res)=>{
    let newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listing");
})

// edit route
app.get("/listing/:id/edit",async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
})

// update route
app.put("/listing/:id",async(req,res)=>{
    let {id}=req.params;
   const waitedListing = await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect(`/listing/${id}`);
})

// delete route
app.delete("/listing/:id",async(req,res)=>{
    let {id}=req.params;
    const deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listing")
})


// app.get("/testlisting",async (req,res)=>{
//     let sampleListing = new Listing({
//         title:"my villa",
//         description:"affordable",
//         price:7000,
//         location:"kamrej",
//         country:"india",
//     })
//     await sampleListing.save();
//     console.log("create");
//     res.send("testing done");
// })

app.get("/",(req,res)=>{
    res.send("hi, i am root");
})

app.listen(8000,()=>{
    console.log("server is on");
})