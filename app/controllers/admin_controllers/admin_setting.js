var admin_setting=require('../../models/admin_setting').model("admin_setting");
var cron=require("../../../cron");
exports.order_stop_time_setting=(req,res)=>{
    console.log(req.body);
    // cron.stop_order_cron("10:20")
}