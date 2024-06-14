const Review = require("./models/review");

module.exports.isLoggedIn=(req,res,next)=>{
    // console.log(req);
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","you must be loggedin to create new listing");
        return res.redirect("/login");
    }
    next();
};

module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
};

module.exports.isreviewAuthor=async(req,res,next)=>{
    let { id , reviewId} = req.params;
    let review = await Review.findById(reviewId);
    if(!review.author.equals(res.locals.curruser
        
    )){
        req.flash("error","you are not owner of this review");
        return res.redirect(`/listing/${id}`);
    }
    next();
}