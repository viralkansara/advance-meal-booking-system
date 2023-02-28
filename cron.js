var cron = require('node-cron');
var admin_setting=require('./app/models/admin_setting').model("admin_setting");
exports.stop_order_cron=(hour,minute,type)=>{
  var query;
    var cron_timer_value_set=`${minute} ${hour} * * *`
    if(type==2){
      query={is_lunch_order_stop:true}
  }
  else if(type==1){
      query={is_breakfast_order_stop:true}
  }
  else if(type==3){
      query={is_diner_order_stop:true}
  }
      var task = cron.schedule(cron_timer_value_set, async () =>  {
        var admin_setting_data=await admin_setting.findOneAndUpdate(query);
        console.log(admin_setting_data)
        if(!admin_setting_data){
          return("some proble in run cron job")
        }
        else{
          return("cron run sucessfully")
        }
        }, {
          scheduled: false
        });
        task.start();
 
}
