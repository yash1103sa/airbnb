const express = require("express");
const app =   express();
const mongoose = require("mongoose");
// const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
// const wrapAsync = require("./utils/wrapAsync.js");
const expressError = require("./utils/expressError.js");
// const Review = require("./models/review.js");

const listing = require("./routes/listing.js");
const review = require("./routes/review.js");

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

app.use("/listing",listing);
app.use("/listing/:id/review",review);




app.all("*",(req,res,next)=>{
    next(new expressError(404,"page not found"));
});

app.use((err,req,res,next)=>{
 let{statuscode=500,message}=err;
res.status(statuscode).render("error.ejs",{message});
});

app.get("/",(req,res)=>{
    res.send("hi, i am root");
})

app.listen(8000,()=>{
    console.log("server is on");
})