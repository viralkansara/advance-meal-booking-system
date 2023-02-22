const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var admin_setting=new Schema({
    created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now },
    break_fast_stop_order_time: { type: String, default: ''},
    lunch_stop_order_time: { type: String, default: ''},
    diner_stop_order_time:{type :String ,default: ''},
})
admin_setting.index({background: true});
module.exports=mongoose.model('order',admin_setting);