const Listing=require("../models/listings.js");
module.exports.index=async(req,res)=>{
    const alllistings= await Listing.find({})
    res.render("listings/index.ejs",{alllistings});
  }

module.exports.renderNewForm=(req,res)=>{
    
    
      res.render("listings/New.ejs");
}

module.exports.showListing=async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id).populate(
      {path:"reviews",populate:{path:"author"}}).populate("Owner");
      
    console.log(listing);
    if(!listing){
      req.flash("error","Listing does not exist");
      res.redirect("/listings");
    }
    res.render("listings/show.ejs",{listing});
}
module.exports.createListing=async(req,res,next)=>{
  let url=req.file.path;
  let filename=req.file.filename;
 
    const newListing=new  Listing(req.body.listing);
    newListing.image={url,filename}
  newListing.Owner=req.user._id;
 
   await newListing.save();

    req.flash("success","New listing created");
    res.redirect("/listings")
}
module.exports.editListing=async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing does not exist");
        res.redirect("/listings");
      }
      let originaleImage=listing.image.url;
      let originaleImageUrl=originaleImage.replace("/upload","/upload/w_250")
    res.render("listings/edit.ejs",{listing, originaleImageUrl});
}

module.exports.updateListing=async(req,res)=>{
    
    let {id}=req.params; 
    let listing = await Listing.findByIdAndUpdate(id,{...req.body.listing});
     if(typeof req.file != "undefined"){
    let url=req.file.path;
    let filename=req.file.filename;
    listing.image = {url, filename};
    await listing.save();
    }
    req.flash("success","Listing updated");
    res.redirect(`/listings/${id}`);
}

module.exports.destroyedListing=async(req,res)=>{
    let {id}=req.params;
    let deleteListing = await Listing.findByIdAndDelete(id);
    req.flash("success","Listing Deleted");
    console.log(deleteListing);
    res.redirect("/listings");
}