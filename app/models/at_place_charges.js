const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var at_plcae_charge=new Schema({
    day:{type:Number,default:0},
    type:{type:Number,default:0},
    created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now },
    token:{type: String, default: ""},
    tax:{type:Number,defalut:0}
})
at_plcae_charge.index({background: true});
module.exports=mongoose.model('at_place_charge',at_plcae_charge);