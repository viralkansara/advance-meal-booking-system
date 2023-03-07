const mongoose=require("mongoose");
const Schema=mongoose.Schema;
var provider=new Schema({
    frist_name:{type:String,default:""},
    last_name:{type:String,default:""},
    phone:{type:String,default:""},
    email:{type:String,default:""},
    password:{type:String,default:""},
    token:{type:String,default:""},
    address:{type:String,default:""},
    created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now }
})
provider.index({email:1},{background:true});
module.exports=mongoose.model("provider",provider);