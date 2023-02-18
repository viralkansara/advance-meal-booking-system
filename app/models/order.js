const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var orderschema=new Schema({
    menu:{type:Schema.Types.ObjectId},
    created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now },
    token:{type: String, default: ""},
    price:{type: Number, default:0},
    user_id:{type:Schema.Types.ObjectId}
})
orderschema.index({background: true});
module.exports=mongoose.model('order',orderschema);