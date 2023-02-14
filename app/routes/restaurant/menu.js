const menu=require("../../controllers/restaurant_controllers/menu");
module.exports=(app)=>{
app.route("/add_menu").post(menu.add_menu);
app.route("/update_menu").post(menu.update_menu);
}
