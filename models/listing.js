const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title:{
        type:String,
        require:true,
    },
    description:String,
    image:{
        filename: String,
        url: String,
        //  default:"https://unsplash.com/photos/white-and-red-wooden-house-miniature-on-brown-table-rgJ1J8SDEAY",
    //      set:(v)=>v===""?"https://unsplash.com/photos/white-and-red-wooden-house-miniature-on-brown-table-rgJ1J8SDEAY":v,
     },
    price:String,
    location:String,
    country:String,
})

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;