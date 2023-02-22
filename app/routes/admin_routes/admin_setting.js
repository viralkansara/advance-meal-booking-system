var admin=require("../../controllers/admin_controllers/admin_setting");
module.exports=(app)=>{
    app.route("/order_stop_time_setting").post(admin.order_stop_time_setting);
}