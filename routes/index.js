var express = require('express');
var router = express.Router();
var fs = require("fs");
var path = require("path");
var db_api = require("../lib/db_api");

/* GET home page. */
router.get('/', function (req, res, next) {
    res.redirect("/index/enterprise");
});

router.get('/enterprise', function (req, res, next) {
    if (req.user) {
        db_api.get_enterprise_info_by_user(req.user, req.query, function(err, enterprise_info) {
            if (err || !enterprise_info){
                enterprise_info = []
            }
            res.render('index', {title: "Demo Website", user: req.user, enterprise_info: enterprise_info});
       });
   }
   else {
       res.redirect("/login");
   }
});

router.get('/engineer', function (req, res, next) {
    if (req.user) {
        db_api.get_engineer_info_by_user(req.user, req.query, function(err, engineer_info) {
            if (err || !engineer_info){
                engineer_info = []
            }
            res.render('index', {title: "Demo Website", user: req.user, engineer_info: engineer_info});
       });
   }
   else {
       res.redirect("/login");
   }
});
module.exports = router;
