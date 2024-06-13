const express = require("express");
const router =  express.Router();
const User = require("../models/user.js");
const mongoose = require("mongoose");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require('passport');
const { saveRedirectUrl } = require("../middleware.js");


router.get("/signup",(req,res)=>{
    res.render("Users/signup.ejs");
});

router.post("/signup",wrapAsync(async(req,res)=>{
   try{
    let { username , email  , password} = req.body;
   const newUser = new User({ email, username});
   const registeredUser = await User.register(newUser, password);
   console.log(registeredUser);
   req.login(registeredUser,(err)=>{
    if(err){
        return next(err);
    }
    req.flash("success","user registered");
    res.redirect("/listing");
   })
   }
   catch(e){
    req.flash("error",e.message);
   res.redirect("/signup");
   }
}));

router.get("/login",(req,res)=>{
    res.render("Users/login.ejs");
}); 

router.post("/login",saveRedirectUrl,passport.authenticate("local",{
    failureRedirect:"/login",
    failureFlash:true,
}),
 async(req,res)=>{
    req.flash("success","welcomeback to wanderlust");
    let redirectUrl =res.locals.redirectUrl || "/listing";
    res.redirect(redirectUrl);
 }
);

router.get("/logout",(req,res,next)=>{
    req.logout((err)=>{
        if(err){
           return next(err);
        }
        req.flash("success","you are logged out");
        res.redirect("/listing");
    })
})

module.exports=router;