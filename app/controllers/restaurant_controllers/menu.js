const menu = require("../../models/menu").model("menu");
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