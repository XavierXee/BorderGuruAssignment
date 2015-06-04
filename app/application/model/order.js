var mongoose = require('mongoose');

var Schema = mongoose.Schema;  

var OrderSchema = new Schema({  
    orderId: { type: String},
    companyName: { type: String },
    customerAdress: { type: String },
    orderedItem: { type: String },
});

var _OrderModel = mongoose.model('orderModel', OrderSchema); 

module.exports = _OrderModel ;
