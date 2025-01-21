const express=require("express");
const router=express.Router();
const wrapAsync=require("../Utils/wrapAsync.js");

const Listing=require("../models/listings.js");
const {isLoggedIn, isOwner,validateListing} = require("../middleware.js");
const listingController=require("../Controllers/listings.js");
const multer  = require('multer')
const {storage}=require("../cloudConfig.js");
const upload = multer({ storage})

router.route("/")
                // index Route
 .get(wrapAsync(listingController.index))
  //create Route
  .post(isLoggedIn,
   
    upload.single('listing[image]'), validateListing,
    wrapAsync(listingController.createListing));
 
  //New Route
  router.get("/new",isLoggedIn,(listingController.renderNewForm));
  
router.route("/:id")
    // show Route
  .get(wrapAsync(listingController.showListing))
  //Update Route
 .put(isLoggedIn,isOwner,upload.single('listing[image]'),
 validateListing,wrapAsync(listingController.updateListing))
  //Delete route
.delete(isLoggedIn,isOwner,wrapAsync(listingController.destroyedListing));


//edit Route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.editListing))

module.exports = router;

// based routes
// index Route
// router.get("/",wrapAsync(listingController.index));
//create Route
// router.post("/",isLoggedIn,validateListing,wrapAsync(listingController.createListing));
  // show Route
  // router.get("/:id",wrapAsync(listingController.showListing));
  //Update Route
//router.put("/:id",isLoggedIn,isOwner,validateListing,wrapAsync(listingController.updateListing));
//Delete route
//router.delete("/:id",isLoggedIn,isOwner,wrapAsync(listingController.destroyedListing));