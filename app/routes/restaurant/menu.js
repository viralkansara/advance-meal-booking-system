const menu=require("../../controllers/restaurant_controllers/menu");
module.exports=(app)=>{
app.route("/add_menu").post(menu.add_menu);
app.route("/update_menu").post(menu.update_menu);
app.route("/delete_menu").post(menu.delete_menu);
app.route("/get_menu").post(menu.get_menu);
app.route("/selected_item_by_user").post(menu.selected_item_by_user);
app.route("/restaurant_get_total_order").post(menu.restaurant_get_total_order);
}
