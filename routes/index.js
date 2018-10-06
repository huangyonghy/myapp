var express = require('express');
var router = express.Router();
var fs = require("fs");
var path = require("path");
var db_api = require("../lib/db_api");

var pool = require('../lib/connect_db');

/* GET home page. */
router.get('/', function (req, res, next) {
    db_api.get_enterprise_info_by_user(req.user, function(err, enterprise_info) {
        if (err || !enterprise_info){
             enterprise_info = []
        }
        res.render('index', {title: "Demo Website", user: req.user, enterprise_info: enterprise_info});
    });
});

router.post('/', function (req, res, next) {
    console.log(req.body);
    var result = {hello: "hello Back"};
    res.send(JSON.stringify(result));
});

module.exports = router;
