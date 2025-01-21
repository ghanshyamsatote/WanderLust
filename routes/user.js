const express=require("express");
const router=express.Router();
const User=require("../models/user.js");
const wrapAsync=require("../Utils/wrapAsync.js");
const passport=require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController =require("../Controllers/user.js");
const user = require("../models/user.js");

router.route("/signup")  
.get(userController.renderSignupForm)
.post(wrapAsync(userController.Signup));

router.route("/login")
.get(userController.renderLoginForm)
.post(saveRedirectUrl,
    passport.authenticate("local",{failureRedirect:'/login',failureFlash: true}),userController.login);

router.get("/logout",userController.logout)
module.exports = router;

//base
// router.get("/signup",userController.renderSignupForm);
// router.post("/signup",wrapAsync(userController.Signup));


// router.get("/login",userController.renderLoginForm);
// router.post("/login",saveRedirectUrl,
//     passport.authenticate("local",{failureRedirect:'/login',failureFlash: true}),userController.login);