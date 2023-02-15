const menu = require("../../models/menu").model("menu");
var user = require("../../models/user").model("user");
var crypto = require('crypto');
exports.get_menu = async (req, res) => {
    try {
        var menu_item = await menu.find({});
        if (!menu_item) {
            throw new Error("Couldn't find menu item")
        }
        res.json({ sucess: true, message: "data get sucessfully", items: menu_item })
    } catch (error) {
        res.json({ sucess: false, message: error.message })
    }
}
exports.add_menu = async function (req, res) {
    //1 for break fast 
    //2 for lunch
    //3 for dinner
    try {
        var menu_data = await menu.findOne({ $and: [{ day: req.body.day }, { type: req.body.type }] })
        console.log(menu_data);
        if (menu_data) {
            throw new Error("menu already added")
        }
        var add_new_menu = new menu({
            day: req.body.day,
            type: req.body.type,
            item: req.body.item
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
        if (!user_data) {
            throw new Error('you are not register')
        }
        if(!user_data.is_approved){
            throw new Error('you are not approved')
        }
        user_selectes_item=await menu.findOne({$and:[{day:req.body.day},{type:req.body.type}]});
        if(!user_selectes_item){
            throw new Error('failed to find selected item')
        }
        req.body.item.forEach(iteam_data => {
            Number(iteam_data)
            console.log(user_selectes_item.item[iteam_data]);
        });
    } catch (error) {
        res.json({ sucess: false, error: error.message });
    }
}