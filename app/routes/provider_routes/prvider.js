const provider=require("../../controllers/provider_controllers/provider");
module.exports=(app)=>{
app.route("/provider_register").post(provider.provider_register);
app.route("/user_login").post(provider.provider_login)
}