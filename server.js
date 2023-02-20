const http=require('http');
//router file
express_routes=require('./config/express');
const app = express_routes();
cron=require("./cron");
const cron_job=cron();
//db connection
Mongoose=require("./config/mongoose");
db=Mongoose();
port=8000;
app.get('/',(req,res)=>{
    res.send("hello from other side")
})
const server = http.Server(app);
server.listen(port,()=>{
    console.log(`magic happens on:${port}`)
})