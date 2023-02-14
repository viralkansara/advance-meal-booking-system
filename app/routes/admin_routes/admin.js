var admin=require("../../controllers/admin_controllers/admin");
module.exports=(app)=>{
    app.route("/admin_login").post(admin.admin_login);
    app.route("/admin_add").post(admin.add_admin);
    app.route("/update_admin").post(admin.update_admin);
    app.route("/delete_admin").post(admin.delete_admin);
}