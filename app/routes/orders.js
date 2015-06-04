var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var _ = require('underscore');

var _OrderModel = require('../application/model/order') ;

/*

    READ orders

*/
router.get('/', function(req, res) {

	var req_FindOrders = _OrderModel.find();
	req_FindOrders.exec(function(err, _orders){

        var noDuplicates = [] ;

        _.each(_orders, function(order){
            var alreadyExist = false ;
            _.each(noDuplicates, function(ord){
                if(order.orderId == ord.name) {
                    alreadyExist = true ;   
                }
            }) ;
            if(alreadyExist == false){
                var obj = {
                    "name" : order.orderId
                }
                noDuplicates.push(obj) ;
            }

        }) ;

        var listOfOrders = _.sortBy(noDuplicates, 'name'); 

        res.send(listOfOrders) ;

	});

});

/*

    DELETE orders

*/
router.post('/', function(req, res) {

    var req_FindOrders = _OrderModel.find({orderId : req.query.orderId});
    req_FindOrders.exec(function(err, _orders){

        _.each(_orders, function(order){
            order.remove()
        }) ;

        if(err){
            res.send("Sorry an error occured :/")
        } else {
            res.send("Done !") ;
        }

    });

});

module.exports = router;