//main route file
var express = require('express');
var app = express();
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
module.exports = function (){
  require("../app/routes/admin_routes/admin")(app);
  require("../app/routes/restaurant/restaurant")(app);
  require("../app/routes/user_routes/user")(app);
  require("../app/routes/restaurant/menu")(app);
  require("../app/routes/admin_routes/admin_setting")(app);
  require("../app/routes/provider_routes/prvider")(app);
  return app;
}