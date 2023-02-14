const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var adminschema=new Schema({
	username: {type: String, default: ""},
	password: {type: String, default: ""},
	email: {type: String, default: ""},
	token:{type: String, default: ""},
	type: {type: Number, default: 0},
	url_array: {type: Array, default: []},
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now },
	uid: {type: String},
})
adminschema.index({email:1},{background: true});
module.exports=mongoose.model('admin',adminschema);
// It means MongoDB can still serve queries and you can alter the database meanwhile it is building the index