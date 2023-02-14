const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var menuschema=new Schema({
    day:{type:String,default:""},
    type:{type:String,default:""},
    item:{type:Array,default:[]},
    created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now },
    token:{type: String, default: ""}
})
menuschema.index({background: true});
module.exports=mongoose.model('menu',menuschema);