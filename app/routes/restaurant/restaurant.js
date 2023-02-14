const restaurant=require('../../controllers/restaurant_controllers/restaurant')
module.exports=function(app) {
 app.route('/register_restaurant').post(restaurant.restaurant_register);
 app.route('/restaurant_updatedetails').post(restaurant.restaurant_updatedetails);
 app.route('/restaurant_delete').post(restaurant.restaurant_delete);
}