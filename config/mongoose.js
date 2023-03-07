const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
module.exports = function () {
    var db;
    // mfRMf7Zn9TTMmQpU
    db = mongoose.connect("mongodb+srv://viral:mfRMf7Zn9TTMmQpU@cluster0.bxbykdj.mongodb.net/?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    require('../app/models/admin');
    require('../app/models/restaurants');
    require('../app/models/user');
    require('../app/models/menu');
    require('../app/models/order');
    require('../app/models/at_place_charges');
    require('../app/models/delivery_charges');
    require('../app/models/admin_setting');
    require('../app/models/provider')
    return db;
}
