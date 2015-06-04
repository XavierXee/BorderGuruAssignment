/*

    Application dependencies

*/
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongo = require('mongodb');
var monk = require('monk');
var mongoose = require('mongoose');
var _ = require('underscore');

var http = require('http')
var server;


/*

    Database connection

*/
mongoose.connect('mongodb://localhost/appdb') ;
// mongoose.connect('mongodb://localhost/test') ;

var db = mongoose.connection ;


var app = express();

db.on('error', console.error.bind(console, 'connection error'));

db.once('open', function () {
    
    var db = mongoose.connection;

    var Collections = db.Collections

    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));

    /*
        Resources for routes
    */
    var route_Index = require('./routes/index');
    var route_ByCompany = require('./routes/bycompany');
    var route_CompanyList = require('./routes/companylist');
    var route_ByCustomerAdress = require('./routes/bycustomeradress');
    var route_CustomerAdressList = require('./routes/customeradresslist');
    var route_Orders = require('./routes/orders');
    var route_Order = require('./routes/order');
    var route_LoadSample = require('./routes/loadsample');
    var route_OrderedItems = require('./routes/ordereditems');
    var route_RegisterOrder = require('./routes/register');

    /*
        View engine setup
    */
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');

    /*
        Make our db accessible to our router
    */
    app.use(function(req,res,next){
        req.db = db;
        next();
    });

    /*
        Routes definition
    */
    app.use('/', route_Index);
    app.use('/companylist', route_CompanyList);
    app.use('/customeradresslist', route_CustomerAdressList);
    app.use('/bycompany', route_ByCompany);
    app.use('/bycustomeradress', route_ByCustomerAdress);
    app.use('/orders', route_Orders);
    app.use('/order', route_Order);
    app.use('/loadsample', route_LoadSample);
    app.use('/ordereditems', route_OrderedItems);
    app.use('/register', route_RegisterOrder);




    /*
        catch 404 and forward to error handler
    */
    app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });


    /*
        development error handler
        will print stacktrace
    */
    if (app.get('env') === 'development') {
        app.use(function(err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: err
            });
        });
    }


    /* 
        production error handler
        no stacktraces leaked to user
    */
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });

});

module.exports = app;
