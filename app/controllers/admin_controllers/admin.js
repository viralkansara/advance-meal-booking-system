var admin = require('../../models/admin').model('admin');
var crypto = require('crypto');
exports.admin_login = async function(req,res){
 var admindata=await admin.findOne({$or:[{email:req.body.email},{username:req.body.username}]})
 if(admindata){
    var hash = crypto.createHash('md5').update(req.body.password).digest('hex');
    if(hash==admindata.password){
        res.json({success:true,message:"sucessfully login"})
    }
    else{
        res.json({success:false,message:"your password is incorrect"})
    }
 }
 else{
    res.json({success:false,message:"your username and password is incorrect"})
 }
}
exports.add_admin=async function(req,res){
   var admin_details=await admin.findOne({email:req.body.email})
        if(admin_details){
            res.json({sucess:false,message:"this email address alredy used"})
        }
        else{
            var hash = crypto.createHash('md5').update(req.body.password).digest('hex');
            var add_new_admin = new admin({
                username: (req.body.username).trim(),
                email: req.body.email,
                password: hash,
                url_array: req.body.url_array,
                type: Number(req.body.type)//1 for sub admin 0 for admin
            });
           var add_admin_data=await add_new_admin.save();
           console.log(add_admin_data);
           if(add_admin_data){
            res.json({success:true,message:"add admin successfully"})
           }
           else{
            res.jons({sucess:false,message:"something want to wrong to add admin"})
           }
        }

}
exports.update_admin=async function(req, res){
    var admin_update_data=req.body;
    if(req.body.password){
        var hash = crypto.createHash('md5').update(req.body.password).digest('hex');
        req.body.password=hash;
    }
    var updated_data=await admin.findByIdAndUpdate(req.body.id,admin_update_data)
       if(updated_data){
        res.send({sucess:true,message:"admin data update sucessfully"})
       }
       else{
        res.send({sucess:false,message:"fail to update admin details"})
       }
}
exports.delete_admin=async function(req, res){
    var delete_admin_details=await admin.findByIdAndRemove(req.body.id)
      if(delete_admin_details){
        res.send({success: true,message:"admin delete sucessfully"});
      }
      else{
        res.send({success: false,message:"failed to delete admin"});
      }
}