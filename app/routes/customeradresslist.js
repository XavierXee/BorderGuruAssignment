var express = require('express');
var _ = require('underscore');
var router = express.Router();

var _OrderModel = require('../application/model/order') ;

router.get('/', function(req, res) {
    /*
        get all companies name
    */
    var req_RetrieveCustomerAdress = _OrderModel.find();
    req_RetrieveCustomerAdress.exec(function(err, _orders){

        var tmpListOfCustomerAdress = [] ;
        _.each(_orders, function(order){
            var obj = {
                "name" : order.customerAdress
            }
            tmpListOfCustomerAdress.push(obj)
        }) ;

        var listOfCustomerAdress = [] ;
        _.each(tmpListOfCustomerAdress, function(tmpAdressEntry){
            var push = true ;
            _.each(listOfCustomerAdress, function(adressEntry){
                if(tmpAdressEntry.name == adressEntry.name){
                    push = false ;
                }
            })
            if (push == true) {
                listOfCustomerAdress.push(tmpAdressEntry) ;
            }
        }) ;

        res.send(listOfCustomerAdress) ;

    }) ;

});

module.exports = router;
