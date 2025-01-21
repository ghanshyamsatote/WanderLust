const Reviews=require("../models/rating.js");
const Listing=require("../models/listings.js");
module.exports.createReview=async(req,res)=>{
    console.log(req.params.id);
    let listing=await Listing.findById(req.params.id);
   // let newReview=new Reviews(req.body.review);
    let NewReview=new Reviews(req.body.review);
    NewReview.author = req.user._id;
    console.log(NewReview);
    listing.reviews.push(NewReview);
    await NewReview.save();
    await listing.save();
    req.flash("success","New Review created");
    console.log("Review Are Save")
    res.redirect(`/listings/${listing._id}`);


}
module.exports.destroyedReview=async(req,res)=>{
    let {id, reviewID}=req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewID}});
    await Reviews.findByIdAndDelete(reviewID);
    req.flash("success","REview Deleted");
    res.redirect(`/listings/${id}`);
}