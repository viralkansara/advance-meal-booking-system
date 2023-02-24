var cron = require('node-cron');
exports.stop_order_cron=(hour,minute)=>{
  var cron_timer_value_set=`${minute} ${hour} * * *`
  console.log(cron_timer_value_set)
    var task = cron.schedule(cron_timer_value_set, () =>  {
      var d = new Date();
      var n = d.toLocaleTimeString();
      console.log(n);
      if(n=="9:21:00"){
        console.log("hell")
      }
      }, {
        scheduled: false
      });
      task.start();
}
