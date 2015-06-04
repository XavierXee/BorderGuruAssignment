var express = require('express');
var _ = require('underscore');
var router = express.Router();

var _OrderModel = require('../application/model/order') ;

router.get('/', function(req, res) {

    var req_FindByCompany = _OrderModel.find({customerAdress : req.query.customerAdress});
    
    req_FindByCompany.exec(function(err, _orders){

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

module.exports = router;
