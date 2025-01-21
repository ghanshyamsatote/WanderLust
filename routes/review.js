const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../Utils/wrapAsync.js");
const ExpressError=require("../Utils/ExpressError.js");
const {validateReview, isLoggedIn,isReviewAuthor}=require("../middleware.js");

const Reviews=require("../models/rating.js");
const Listing=require("../models/listings.js");
const reviewController=require("../Controllers/reviews.js");
//Reviews
router.post("/",isLoggedIn,validateReview,wrapAsync(reviewController.createReview));

//Delete review Route
router.delete("/:reviewID",isLoggedIn,isReviewAuthor,wrapAsync(reviewController.destroyedReview));

module.exports = router;