const user=require('../../controllers/user_controllers/user');
module.exports=(app)=>{
    app.route("/user_register").post(user.user_register);
    app.route("/user_login").post(user.user_login);
}