const mongoose=require("mongoose");
const Schema=mongoose.Schema;
var user=new Schema({
    frist_name:{type:String,default:""},
    last_name:{type:String,default:""},
    phone:{type:String,default:""},
    email:{type:String,default:""},
    password:{type:String,default:""},
    token:{type:String,default:""},
    address:{type:String,default:""},
    is_approved:{type:Boolean,default:false},
})
user.index({email:1},{background:true});
module.exports=mongoose.model("user",user);