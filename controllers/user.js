const User = require("../models/user.js");

module.exports.renderSignupForm=(req,res)=>{
    res.render("Users/signup.ejs");
};

module.exports.signUp=async(req,res)=>{
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
 };

 module.exports.renderLoginForm=(req,res)=>{
    res.render("Users/login.ejs");
};

module.exports.logIn=async(req,res)=>{
    req.flash("success","welcomeback to wanderlust");
    let redirectUrl =res.locals.redirectUrl || "/listing";
    res.redirect(redirectUrl);
 };

module.exports.logout=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
           return next(err);
        }
        req.flash("success","you are logged out");
        res.redirect("/listing");
    })
};