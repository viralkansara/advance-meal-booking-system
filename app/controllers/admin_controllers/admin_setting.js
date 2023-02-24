var admin_setting=require('../../models/admin_setting').model("admin_setting");
var cron=require("../../../cron");
exports.order_stop_time_setting=(req,res)=>{
    console.log(req.body);
    try{
        var get_hours=req.body.time.split(":");
    var add_stop_time_order_setting=new admin_setting({
        lunch_stop_order_time:req.body.time
    })
    if(!add_stop_time_order_setting){
        throw new Error("some problem to add order stop time data");
    }
    add_stop_time_order_setting.save();
    cron.stop_order_cron(Number(get_hours[0]),Number(get_hours[1]))
    res.json({sucess:true,message:"add stop order time sucessfully"})
    //frist parameter or cron is hour and second is miniute
    }catch(error){
        res.json({sucess:false,message:error.message})
    }
}