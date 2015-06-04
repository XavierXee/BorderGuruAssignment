var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var _ = require('underscore');

var _OrderModel = require('../application/model/order') ;

router.get('/', function(req, res) {

	var req_FindOrders = _OrderModel.find();
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

        var itemsList = {} ;
        _.each(ordersList, function(order){
            if(typeof(itemsList[order.orderedItem]) == 'undefined'){
                itemsList[order.orderedItem] = {
                    name : order.orderedItem,
                    count : 1 ,
                }
            } else {
                var newCount = itemsList[order.orderedItem].count+1 ;
                itemsList[order.orderedItem] = {
                    name : order.orderedItem,
                    count : newCount ,
                }
            }

            itemsList[order.orderedItem]

            var newCount = itemsList[order.orderedItem]['count'] ? 0 : itemsList[order.orderedItem].count ;
            newCount = newCount+1 ;

        }) ;

        res.send(itemsList) ;

	});

});

module.exports = router;