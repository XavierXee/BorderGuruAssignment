var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var _ = require('underscore');

var _OrderModel = require('../application/model/order') ;

/*

    READ particular order

*/
router.get('/', function(req, res) {

	var req_FindOrders = _OrderModel.find({orderId : req.query.orderId});
	req_FindOrders.exec(function(err, _orders){

        var noDuplicates = [] ;

        _.each(_orders, function(order){
            var alreadyExist = false ;
            _.each(noDuplicates, function(ord){
                if(order.orderId == ord.orderId) {
                    alreadyExist = true ;   
                }
            }) ;
            if(alreadyExist == false){
                noDuplicates.push(order) ;
            }

        }) ;

        var ordersList = noDuplicates ;
        res.send(ordersList) ;

	});

});

/*

    DELETE particular order

*/
router.post('/', function(req, res) {

    var req_FindOrders = _OrderModel.find({orderId : req.query.orderId});
    req_FindOrders.exec(function(err, _orders){

        _.each(_orders, function(order){
            order.remove()
        }) ;

    });

});

module.exports = router;