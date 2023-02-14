const menu = require("../../models/menu").model("menu");
var crypto = require('crypto');
exports.add_menu = async function (req, res) {
    try {
        var menu_data = await menu.findOne({ $or: [{ day: req.body.day }, { type: req.body.type }] })
        if (menu_data) {
            throw new Error("menu already added")
        }
        var add_new_menu=new menu({
            day:req.body.day,
            type:req.body.type,
            item:req.body.item,
        })
        if(!add_new_menu){
            throw new Error("failed to add menu")
        }
        add_new_menu.save();
        res.json({success:true,message:"menu added sucessfully"})
    } catch (error) {
        res.json({ sucess: false, error: error.message })
    }
}

exports.update_menu = async function (req, res) {
    try {
        var menu_data = await menu.findByIdAndUpdate(req.body.id,req.body);
        console.log(menu_data);
        if(!menu_data) {
            throw new Error("failed to update menu");
        }
        res.json({success:true,message:"menu update sucessfully"})
    } catch (error) {
        res.json({ sucess: false, error: error.message })
    }
}