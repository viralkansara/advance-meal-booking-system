var restaurant = require("../../models/restaurants").model("restaurant");
var order = require("../../models/order").model("order");
var deliver_charge = require("../../models/delivery_charges").model("delivery_fee");
var crypto = require('crypto');
exports.restaurant_register = function (req, res) {
    console.log(req.body);
    restaurant.findOne({ email: req.body.email }).then((restaurant_register_data) => {
        console.log(restaurant_register_data);
        if (restaurant_register_data) {
            res.send({ sucess: false, message: "email address already registered" });
        }
        else {
            var hash = crypto.createHash('md5').update(String(req.body.password)).digest('hex');
            var add_new_restaurant = new restaurant({
                name: req.body.name,
                email: req.body.email,
                password: hash,
                address: req.body.address,
                type: req.body.type
            })
            add_new_restaurant.save().then((result) => {
                res.json({ sucess: true, message: "restaurant add sucesfully" })
            })
        }
    })
}
exports.restaurant_updatedetails = function (req, res) {
    var restaurant_request_data = req.body;
    if (req.body.password) {
        var hash = crypto.createHash('md5').update(req.body.password).digest('hex');
        req.body.password = hash;
    }
    restaurant.findByIdAndUpdate(req.body.id, restaurant_request_data).then((updated_data) => {
        res.json({ sucess: true, message: "restaurant data update sucessfully" })
    })
}
exports.restaurant_delete = function (req, res) {
    restaurant.findByIdAndRemove(req.body.id).then((detete_restaurant_data) => {
        res.json({ success: true, message: "restaurant delete sucessfully" })
    })
}

exports.restaurant_get_total_order = async (req, res) => {
    try {
        var query = [];
        if (req.body.day) {
            query.push({ day: req.body.day });
        }
        if (req.body.type) {
            query.push({ type: req.body.type });
        }
        if (req.body.menu) {
            query.push({ _id: req.body.menu });
        }
        var lookup = {
            $lookup:
            {
                //mistake conde
                // from:"user",
                // localField:"_id",
                // foreginField:"user_id",
                // as:"user_data",
                from: "users",
                localField: "user_id",
                foreignField: "_id",
                as: "user_detail"
            }
        };
        var search = { $match: { $and: query } }
        var unwind = { $unwind: "$user_detail" };
        var order_item = await order.aggregate([lookup, unwind, search]);
        if (order_item.length == 0) {
            throw new Error("filter data not found");
        }
        res.json({ sucess: true, filterdata: order_item })
    } catch (error) {
        res.json({ sucess: false, message: error.message })
    }
}
exports.restaurant_add_delivery_charges = async (req, res) => {
    try {
        var delivery_fee = await deliver_charge.findOne({ $and: [{ day: req.body.day }, { type: req.body.type }] })
        if (delivery_fee) {
            throw new Error("this menu chare alerday added")
        }
        var new_delivery_fee =await new deliver_charge({
            day:req.body.day,
            type:req.body.type,
            tax:req.body.tax,//in pertentage
            delivery_fee:req.body.delivery_fee,//per km
            packing_charge:req.body.packing_charge
        })
        if(! new_delivery_fee) {
            throw new Error("some problem to add chargers")
        }
        new_delivery_fee.save();
        res.json({success:true, message:"charge added successfully"})
    }catch(error){
        res.json({success:false, message:error.message})
    }
}