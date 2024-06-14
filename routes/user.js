const express = require("express");
const router =  express.Router();
const User = require("../models/user.js");
const mongoose = require("mongoose");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require('passport');
const { saveRedirectUrl } = require("../middleware.js");
const usercontroller = require("../controllers/user.js");

// signup form
router.get("/signup",usercontroller.renderSignupForm);

// signup
router.post("/signup",wrapAsync(usercontroller.signUp));

// login form
router.get("/login",usercontroller.renderLoginForm); 

// login
router.post("/login",saveRedirectUrl,passport.authenticate("local",{
    failureRedirect:"/login",
    failureFlash:true,
}),
 usercontroller.logIn
);

// logout
router.get("/logout",usercontroller.logout);

module.exports=router;