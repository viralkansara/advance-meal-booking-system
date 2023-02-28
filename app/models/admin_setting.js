const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var admin_setting=new Schema({
    created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now },
    break_fast_stop_order_time: { type: String, default: ''},
    is_breakfast_order_stop:{type:Boolean,default:false},
    is_lunch_order_stop:{type:Boolean,default:false},
    is_diner_order_stop:{type:Boolean,default:false},
    lunch_stop_order_time: { type: String, default: ''},
    diner_stop_order_time:{type :String ,default: ''},
})
admin_setting.index({background: true});
module.exports=mongoose.model('admin_setting',admin_setting);