var crypto = require("crypto");
const provider=require("../../models/provider").model("provider");
exports.provider_register = async (req, res) => {
    console.log(req.body)
    try {
        var provider_data = await provider.findOne({ $or: [{ email: req.body.email }, { phone: req.body.phone }] })
        if (provider_data) {
            if (provider_data.email == req.body.email) {
                throw new Error("this email address already register")
            }
            else {
                throw new Error("this phone number already registered")
            }
        }
        var hash = crypto.createHash('md5').update(req.body.password).digest('hex');
        var add_new_provider = await new provider({
            frist_name: req.body.frist_name,
            last_name: req.body.last_name,
            phone: req.body.phone,
            password: hash,
            address: req.body.address,
            email:req.body.email
        })
        var provider_data_added =add_new_provider.save();
        if (!provider_data_added) {
            throw new Error("failed to add provider data");
        }
        else{
            res.json({ success: true, message: "provider data added successfully" })
        }}
    catch (error) {
        res.json({ success: false, message: error.message })
    }
}
exports.provider_login = async (req, res) => {
    try {
        var hash = crypto.createHash('md5').update(req.body.password).digest('hex');
        var provider_data = await provider.findOne({ email: req.body.email });
        if (!provider_data) {
            throw new Error("provider data not found")
        }
        if (req.body.email == provider_data.email) {
            if (provider_data.password != hash) {
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