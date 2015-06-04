var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var _ = require('underscore');

var _OrderModel = require('../application/model/order') ;


var sampleData = [
    {
        orderId : '001',
        companyName : 'SuperTrader',
        customerAdress : 'Steindamm 80',
        orderedItem : 'Macbook',
    },
    {
        orderId : '002',
        companyName : 'Cheapskates',
        customerAdress : 'Reeperbahn 153',
        orderedItem : 'Macbook',
    },
    {
        orderId : '003',
        companyName : 'MegaCorp',
        customerAdress : 'Steindamm 80',
        orderedItem : 'Book "Guide to Hamburg"',
    },
    {
        orderId : '004',
        companyName : 'SuperTrader',
        customerAdress : 'Sternstrasse  125',
        orderedItem : 'Book "Cooking  101"',
    },
        {
        orderId : '005',
        companyName : 'SuperTrader',
        customerAdress : 'Ottenser Hauptstrasse 24',
        orderedItem : 'Inline Skates',
    },
    {
        orderId : '006',
        companyName : 'MegaCorp',
        customerAdress : 'Reeperbahn 153',
        orderedItem : 'Playstation',
    },
    {
        orderId : '007',
        companyName : 'Cheapskates',
        customerAdress : 'Lagerstrasse  11',
        orderedItem : 'Flux compensator',
    },
    {
        orderId : '008',
        companyName : 'SuperTrader',
        customerAdress : 'Reeperbahn 153',
        orderedItem : 'Inline Skates',
    }
] ;

/*

    CREATE orders for each sampleData entry, if order doesn't already exist

*/
router.post('/', function(req, res) {

    var req_RetrieveCustomerAdress = _OrderModel.find();
    req_RetrieveCustomerAdress.exec(function(err, _orders){

        var error = err ;

        var noDuplicates = [] ;

        _.each(_orders, function(order){
            var alreadyExist = false ;
            _.each(noDuplicates, function(ordId){
                if(order.orderId == ordId) {
                    alreadyExist = true ;   
                }
            }) ;
            if(alreadyExist == false){
                noDuplicates.push(order.orderId) ;
            }

        }) ;

        var noEmpty = [] ;
        _.each(noDuplicates, function(entry){
            if(entry != ""){ noEmpty.push(entry) }
        })

        var ordersList = noEmpty ;

        _.each(sampleData, function(sampleOrder){
            var alreadyExist = false ;
            _.each(ordersList, function(existingOrder){
                if(existingOrder == sampleOrder.orderId){
                    alreadyExist = true ;
                }
            }) ;
            if(alreadyExist == false){
                var order = new _OrderModel({  
                    orderId: sampleOrder.orderId,
                    companyName: sampleOrder.companyName,
                    customerAdress: sampleOrder.customerAdress,
                    orderedItem: sampleOrder.orderedItem,
                });

                order.save(function(err, order){
                    if (err) {
                        error = err ;
                    }

                });
            }
        })

        if(error) {
            res.send("Sorry an error occurred :/")
        } else {
            res.send("Loaded !")
        }

    });

});



module.exports = router;
