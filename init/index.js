const mongoose = require("mongoose");
const initdata = require("./data");
const Listing = require("../models/listing")

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

const initDB = async ()=>{
    await Listing.deleteMany({});
    initdata.data = initdata.data.map((obj)=>({...obj,owner:"6669611e9b05a5a45b58ab9b"}));
    await Listing.insertMany(initdata.data);
    console.log("data initialize");
};

initDB();
