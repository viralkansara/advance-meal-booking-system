var user = require("../../models/user").model("user");
const menu = require("../../models/menu").model("menu");
var order = require("../../models/order").model("order");
var delivery_charges=require("../../models/delivery_charges").model("delivery_fee");
var admin_setting=require('../../models/admin_setting').model("admin_setting");
var crypto = require("crypto");
const { query } = require("express");
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
exports.user_place_order = async (req, res) => {
    try {
        var user_data = await user.findOne({ _id: req.body.user_id });
        var total_price=0;
        var is_delivery=false
        if (!user_data) {
            throw new Error('you are not register')
        }
        if (!user_data.is_approved) {
            throw new Error('you are not approved')
        }
        var user_selectes_item = await menu.findOne({ _id: req.body.menu });
        total_price=user_selectes_item.price;
        if (user_selectes_item == null) {
            console.log("No menu selected")
        }
        if (user_selectes_item == undefined) {
            console.log("No menu")
        }
        if (!user_selectes_item) {
            throw new Error('your selected menu not available')
        }
        //cron for stop order_time
        var admin_setting_data=await admin_setting.findOne({});
        console.log("--admin setting data----");
        console.log(admin_setting_data);
        if(admin_setting_data.is_lunch_order_stop){
            throw new Error('stop time for place order')
        }
        if(req.body.is_delivery){
            is_delivery=true;
            var get_order_deliver_charge=await delivery_charges.findOne({$and:[{day:req.body.day},{type:req.body.type}]})
            var total_tax=((total_price*get_order_deliver_charge.tax)/100);
            var delivery_fee=(get_order_deliver_charge.delivery_fee*req.body.distance);
            var packing_charge=(get_order_deliver_charge.packing_charge);
            total_price=total_price+total_tax+delivery_fee+packing_charge;
        }
        var new_order = await new order({
            user_id: user_data._id,
            price: user_selectes_item.price,
            select_menu: user_selectes_item._id,
            day: req.body.day,
            type: req.body.type,
            is_delivery:is_delivery,
            total:total_price
        })
        new_order.save();
        if (!new_order) {
            throw new Error("falid to place order")
        }
        res.json({ sucess: true, message: "your order sucessfully placed" ,order_data:new_order})
    } catch (error) {
        res.json({ sucess: false, error: error.message });
    }
}