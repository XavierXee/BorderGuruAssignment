var express = require('express');
var _ = require('underscore');
var router = express.Router();

var _OrderModel = require('../application/model/order') ;

router.get('/', function(req, res) {
    /*
        get all companies name
    */
    var req_RetrieveCompanyNames = _OrderModel.find();
    req_RetrieveCompanyNames.exec(function(err, _orders){

        var tmpListOfCompanies = [] ;
        _.each(_orders, function(order){
            var obj = {
                "name" : order.companyName
            }
            tmpListOfCompanies.push(obj)
        }) ;

        var listOfCompanies = [] ;
        _.each(tmpListOfCompanies, function(tmpCompEntry){
            var push = true ;
            _.each(listOfCompanies, function(compEntry){
                if(tmpCompEntry.name == compEntry.name){
                    push = false ;
                }
            })
            if (push == true) {
                listOfCompanies.push(tmpCompEntry) ;
            }
        }) ;

        res.send(listOfCompanies) ;

    }) ;

});

module.exports = router;
