var user = require("../../models/user").model("user");
var crypto = require("crypto");
exports.user_register = async (req, res) => {
    console.log(req.body)
    try {
        var user_data = await user.findOne({ $or: [{ email: req.body.email }, { phone: req.body.phone }] })
        if (user_data) {
            if (user_data.email == req.body.email) {
                throw new Error("this email address already register")
            }
            else {
                throw new Error("this phone number already registered")
            }
        }
        var hash = crypto.createHash('md5').update(req.body.password).digest('hex');
        var add_new_user = await new user({
            frist_name: req.body.frist_name,
            last_name: req.body.last_name,
            phone: req.body.phone,
            password: hash,
            address: req.body.address,
            email:req.body.email
        })
        var user_data_added =add_new_user.save();
        if (!user_data_added) {
            throw new Error("failed to add user data");
        }
        else{
            res.json({ success: true, message: "user data added successfully" })
        }}
    catch (error) {
        res.json({ success: false, message: error.message })
    }
}
exports.user_login = async (req, res) => {
    try {
        var hash = crypto.createHash('md5').update(req.body.password).digest('hex');
        var user_data = await user.findOne({ email: req.body.email });
        if (!user_data) {
            throw new Error("user data not found")
        }
        if (req.body.email == user_data.email) {
            if (user_data.password != hash) {
                throw new Error("your password is incorrect")
            }
            else {
                res.json({ sucess: true, message: "you are logged in successfully" })
            }
        }
    }
    catch (error) {
        res.json({sucess:"false",message:error.message});
    }
}