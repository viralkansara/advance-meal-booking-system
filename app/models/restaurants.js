const mongoose=require("mongoose");
const Schema=mongoose.Schema;
var restaurant_schema=new Schema({
    name:{type:String,default:""},
    email:{type:String,default:""},
    password:{type:String,default:""},
    token:{type:String,default:""},
    address:{type:String,default:""},
    type:{type:Number,default:0},
})
restaurant_schema.index({email:1},{background:true});
module.exports=mongoose.model("restaurant",restaurant_schema);