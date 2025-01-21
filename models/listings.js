const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const Review=require("./rating.js");

const ListingSchema=new Schema({
    title:{
        type:String,
        required:true,
    },
    description:String,
    image:{
        url:String,
        filename:String
    }, 
    price:Number,
    location:String,
    country:String,
   // extra
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:"Review"
        }
    ],
    Owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
   

});
ListingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await Review.deleteMany({_id:{$in:listing.reviews}})
    }
    
})
const Listing =mongoose.model("listing",ListingSchema);
module.exports=Listing;


//old logic of Images
// image:{
//     type:String,
//     default:"https://media.istockphoto.com/id/1216946182/photo/tropical-beach-pool-with-palm-trees.jpg?s=1024x1024&w=is&k=20&c=8R0d44FLb6_l56azcV29yvrPwr0fH9fkWVQMKYq0ook=",
//     set:(v)=> v === "" ? "https://media.istockphoto.com/id/1216946182/photo/tropical-beach-pool-with-palm-trees.jpg?s=1024x1024&w=is&k=20&c=8R0d44FLb6_l56azcV29yvrPwr0fH9fkWVQMKYq0ook=" : v,
// }, 