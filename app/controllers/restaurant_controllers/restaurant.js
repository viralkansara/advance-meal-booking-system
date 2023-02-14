var restaurant=require("../../models/restaurants").model("restaurant");
var crypto = require('crypto');
exports.restaurant_register=function(req,res){
    console.log(req.body);
restaurant.findOne({email:req.body.email}).then((restaurant_register_data)=>{
    console.log(restaurant_register_data);
    if(restaurant_register_data){
        res.send({sucess:false,message:"email address already registered"});
    }
    else{
        var hash = crypto.createHash('md5').update(String(req.body.password)).digest('hex');
        var add_new_restaurant=new restaurant({
            name:req.body.name,
            email:req.body.email,
            password:hash,
            address:req.body.address,
            type:req.body.type
        })
        add_new_restaurant.save().then((result) => {
            res.json({sucess:true,message:"restaurant add sucesfully"})
        })
    }
})
}
exports.restaurant_updatedetails=function(req, res){
    var restaurant_request_data=req.body;
    if(req.body.password){
        var hash = crypto.createHash('md5').update(req.body.password).digest('hex');
        req.body.password=hash;
    }
    restaurant.findByIdAndUpdate(req.body.id,restaurant_request_data).then((updated_data)=>{
        res.json({sucess:true,message:"restaurant data update sucessfully"})
    })
}
exports.restaurant_delete=function(req, res){
    restaurant.findByIdAndRemove(req.body.id).then((detete_restaurant_data)=>{
        res.json({success:true,message:"restaurant delete sucessfully"})
    })
}