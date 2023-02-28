var admin_setting=require('../../models/admin_setting').model("admin_setting");
const { query } = require('express');
var cron=require("../../../cron");
exports.order_stop_time_setting=async (req,res)=>{
    var query;
    if(req.body.type==1){
        query={break_fast_stop_order_time:req.body.time,is_breakfast_order_stop:false}
    }
    else if(req.body.type==2){
        query={lunch_stop_order_time:req.body.time,is_lunch_order_stop:false}
    }
    else if(req.body.type==3){
        query={diner_stop_order_time:req.body.time,is_diner_order_stop:false}
    }
    console.log(query)
    try{
        var get_hours=req.body.time.split(":");
    var add_stop_time_order_setting=await admin_setting.findOneAndUpdate(query)
    if(!add_stop_time_order_setting){
        throw new Error("some problem to add order stop time data");
    }
    var cron_job_function=cron.stop_order_cron(Number(get_hours[0]),Number(get_hours[1]),req.body.type);
    console.log(cron_job_function);
    res.json({sucess:true,message:"add stop order time sucessfully"})
    //frist parameter or cron is hour and second is miniute
    }catch(error){
        res.json({sucess:false,message:error.message})
    }
}