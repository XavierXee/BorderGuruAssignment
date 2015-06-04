var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

router.get('/', function(req, res) {
    res.render('index', { title: 'OrdersViewer' });
});

module.exports = router;
