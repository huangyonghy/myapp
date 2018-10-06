var express = require('express');
var router = express.Router();
var url = require('url');
var querystring = require('querystring');

var passport = require('../lib/myPassport');
var db_api = require('../lib/db_api');

router.get('/add', require('connect-ensure-login').ensureLoggedIn(), function(req, res, next) {
    res.render('enterprise_add', {username: req.user.username});
});

router.post('/add', function(req, res, next) {
    db_api.add_enterprise(req.body, function(err) {
       if (err) {
           console.log(err);
           res.redirect('/enterprise/add');
       }
        else {
           res.redirect('/information');
       }

    });
});


module.exports = router;
