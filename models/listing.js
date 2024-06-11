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
        filename:{type: String, require:true,},
        url: {type: String, require:true,},
        //  default:"https://unsplash.com/photos/white-and-red-wooden-house-miniature-on-brown-table-rgJ1J8SDEAY",  
        // Set:(v)=>v==""?"https://unsplash.com/photos/white-and-red-wooden-house-miniature-on-brown-table-rgJ1J8SDEAY":v,
     },
     review:
        [{ type: Schema.Types.ObjectId, ref: 'Review' }],    
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