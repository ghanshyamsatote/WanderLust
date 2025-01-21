const User=require("../models/user.js");
module.exports.renderSignupForm=(req,res)=>{
    res.render("users/signup.ejs");
}
module.exports.Signup=async(req,res)=>{
     try{
    let {username, email, password}=req.body;
    const newUser= new User({email, username});
        const resisterUser= await User.register(newUser, password);
        console.log(resisterUser);
        req.login(resisterUser, (err)=>{
            if(err){
                return next(err);
            }else{
                req.flash("success","Welcome to Wanderlust");
                res.redirect("/listings");
            }
        })
        
    }catch(e){
        req.flash("error",e.message)
        res.redirect("/signup");
    }
}
module.exports.renderLoginForm=(req,res)=>{
    res.render("users/login.ejs");
}

module.exports.login=async(req,res)=>{
    req.flash("success","walcome to wanderlust")
    let redirectUrl=res.locals.redirectUrl || "/listings"
     res.redirect(redirectUrl);

}

module.exports.logout=(req,res)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }else{
            req.flash("success","you are logged out now");
            res.redirect("/listings");
        }
    })
}