const menu = require("../../models/menu").model("menu");
var user = require("../../models/user").model("user");
var order = require("../../models/order").model("order");
var crypto = require('crypto');
exports.get_menu = async (req, res) => {
    var query = { $and: [{ day: req.body.day }, { type: req.body.type }] }
    try {
        var menu_item = await menu.find(query);
        if (!menu_item) {
            throw new Error("Couldn't find menu item")
        }
        res.json({ sucess: true, message: "data get sucessfully", menu: menu_item })
    } catch (error) {
        res.json({ sucess: false, message: error.message })
    }
}
exports.add_menu = async function (req, res) {
    //1 for break fast 
    //2 for lunch
    //3 for dinner
    try {
        // var menu_data = await menu.findOne({ $and: [{ day: req.body.day }, { type: req.body.type }] })
        // console.log(menu_data);
        // if (menu_data) {
        //     throw new Error("menu already added")
        // }
        var add_new_menu = new menu({
            day: req.body.day,
            type: req.body.type,
            menu: req.body.menu,
            price: req.body.price
        })
        if (!add_new_menu) {
            throw new Error("failed to add menu")
        }
        add_new_menu.save();
        res.json({ success: true, message: "menu added sucessfully" })
    } catch (error) {
        res.json({ sucess: false, error: error.message })
    }
}

exports.update_menu = async function (req, res) {
    try {
        var menu_data = await menu.findByIdAndUpdate(req.body.id, req.body);
        console.log(menu_data);
        if (!menu_data) {
            throw new Error("failed to update menu");
        }
        res.json({ success: true, message: "menu update sucessfully" })
    } catch (error) {
        res.json({ sucess: false, error: error.message })
    }
}

exports.delete_menu = async function (req, res) {
    try {
        var menu_data = await menu.findByIdAndDelete(req.body.id);
        if (!menu_data) {
            throw new Error("failed to delete menu");
        }
        res.json({ success: true, message: "menu delete sucessfully" })
    } catch (error) {
        res.json({ sucess: false, error: error.message })
    }
}

exports.selected_item_by_user = async (req, res) => {
    try {
        var user_data = await user.findOne({ _id: req.body.user_id });
        console.log(user_data);
        if (!user_data) {
            throw new Error('you are not register')
        }
        if (!user_data.is_approved) {
            throw new Error('you are not approved')
        }
        var user_selectes_item = await menu.findOne({ _id: req.body.menu });
        console.log(user_selectes_item)
        if (user_selectes_item == null) {
            console.log("No menu selected")
        }
        if (user_selectes_item == undefined) {
            console.log("No menu")
        }
        if (!user_selectes_item) {
            throw new Error('your selected menu not available')
        }
        var new_order = await new order({
            user_id: user_data._id,
            price: user_selectes_item.price,
            select_menu: user_selectes_item._id,
            day: req.body.day,
            type: req.body.type
        })
        new_order.save();
        if (!new_order) {
            throw new Error("falid to place order")
        }
        res.json({ sucess: true, message: "your order sucessfully placed" })
    } catch (error) {
        res.json({ sucess: false, error: error.message });
    }
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