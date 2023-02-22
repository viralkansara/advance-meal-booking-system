var cron = require('node-cron');
exports.stop_order_cron=(data)=>{
    // var t="1,2 * * * * *";run every 1,2 second when change miniute
    var t="*/2 * * * * *";//run every 2 second
    var task = cron.schedule(t, () =>  {
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
