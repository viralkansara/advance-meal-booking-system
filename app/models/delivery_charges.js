const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var delivery_fee=new Schema({
    day:{type:Number,default:0},
    type:{type:Number,default:0},
    created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now },
    token:{type: String, default: ""},
    tax:{type:Number,defalut:0},//in pertentage
    delivery_fee:{type:Number,defalut:0},//per km
    packing_charge:{type:Number,defalut:0}
})
delivery_fee.index({background: true});
module.exports=mongoose.model('delivery_fee',delivery_fee);