const restaurant=require('../../controllers/restaurant_controllers/restaurant')
module.exports=function(app) {
 app.route('/register_restaurant').post(restaurant.restaurant_register);
 app.route('/restaurant_updatedetails').post(restaurant.restaurant_updatedetails);
 app.route('/restaurant_delete').post(restaurant.restaurant_delete);
app.route("/restaurant_get_total_order").post(restaurant.restaurant_get_total_order);
app.route("/restaurant_add_delivery_charges").post(restaurant.restaurant_add_delivery_charges);
}