var cron = require('node-cron');
module.exports=()=>{
    var task = cron.schedule('* * * * *', () =>  {
        console.log('stopped task');
      }, {
        scheduled: false
      });
      task.start();
}