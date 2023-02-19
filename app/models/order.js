const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var orderschema=new Schema({
    select_menu:{type:Schema.Types.ObjectId},
    created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now },
    token:{type: String, default: ""},
    price:{type: Number, default:0},
    user_id:{type:Schema.Types.ObjectId},
    day:{type:Number,default:0},
    type:{type:Number,default:0},
    is_delivery:{type:Boolean, default:false},
    total:{type:Number,defalut:0}
})
orderschema.index({background: true});
module.exports=mongoose.model('order',orderschema);