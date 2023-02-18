const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var menuschema=new Schema({
    day:{type:Number,default:0},
    type:{type:Number,default:0},
    menu:{type:Array,default:[]},
    created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now },
    token:{type: String, default: ""},
    price:{type: Number, default:0}
})
menuschema.index({background: true});
module.exports=mongoose.model('menu',menuschema);