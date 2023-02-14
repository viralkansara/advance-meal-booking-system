//main route file
var express = require('express');
var app = express();
var bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
module.exports = function (){
  require("../app/routes/admin_routes/admin")(app);
  require("../app/routes/restaurant/restaurant")(app);
  require("../app/routes/user_routes/user")(app);
  require("../app/routes/restaurant/menu")(app);
  return app;
}