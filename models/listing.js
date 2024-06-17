const mongoose = require("mongoose");
const Review = require("./review");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title:{
        type:String,
        require:true,
    },
    description:String,
    image:{
        url:String,
        filename:String,
     },
    review:
        [{ type: Schema.Types.ObjectId, ref: 'Review' }],   
    owner:{
        type: Schema.Types.ObjectId,
        ref: 'User', 
    } ,
    price:String,
    location:String,
    country:String,
})

listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await Review.deleteMany({_id:{$in: listing.review}});
    }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;