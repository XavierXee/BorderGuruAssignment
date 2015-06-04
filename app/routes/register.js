var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var _ = require('underscore');

var _OrderModel = require('../application/model/order') ;

router.get('/', function(req, res) {
    res.render('register', { title: 'OrdersViewer' });
});

router.post('/', function(req, res) {

    var order = new _OrderModel({  
        orderId: req.body.orderId,
        companyName: req.body.companyName,
        customerAdress: req.body.customerAdress,
        orderedItem: req.body.orderedItem,

    });

    order.save(function(err, order){
        if (!err) {
            return res.redirect('/');
        } else {
            return console.log(err);
        }
    });

});



module.exports = router;
