const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");
const userSchema = new Schema({
    email:{
        type:String,
        require:true,
    }
    //username and password automatically defined by  plugin password-local-mongoose
})
userSchema.plugin(passportLocalMongoose);
// why define here this plugin beacuase automatically define 
// username,hashing, salting, password automatically implements
// and add some methods It is methods so IMP
module.exports = mongoose.model("User", userSchema);