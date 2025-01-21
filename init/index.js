const mongoose=require("mongoose");
const initdata=require("./data.js")
const Listing=require("../models/listings.js");
const MONGO_URL="mongodb://127.0.0.1:27017/wanderlustt"
main().then(()=>{
    console.log("Connection successfull");
}).catch(err =>{console.log(err)});;

async function main() {
  await mongoose.connect(MONGO_URL);

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
const initDB= async()=>{
   await Listing.deleteMany({});
   initdata.data=initdata.data.map((obj)=>({...obj, Owner: "6787366a3db8b24b38ce519d"}))
   await Listing.insertMany(initdata.data);
    console.log("data was initialized")
};
initDB();