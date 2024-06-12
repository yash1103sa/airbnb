module.exports.isLoggedIn=(req,res,next)=>{
    console.log(req);
    if(!req.isAuthenticated()){
        req.flash("error","you must be loggedin to create new listing");
        return res.redirect("/login");
    }
    next();
}