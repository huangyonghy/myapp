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
           res.redirect('/index');
       }

    });
});

router.get('/delete', require('connect-ensure-login').ensureLoggedIn(), function(req, res, next) {
    db_api.delete_enterprise(req.query, function(err) {
        res.redirect('/index');
    });
});


router.get('/modify', require('connect-ensure-login').ensureLoggedIn(), function(req, res, next) {
    db_api.get_enterprise_info_by_name(req.query, function(err, enterprise_info) {
        if (err || !enterprise_info) {
            res.redirect('/information');
        }
        else {
            res.render('enterprise_modify', {username:req.user.username, enterprise_info: enterprise_info});
        }
    });
});

router.post('/modify', function(req, res, next) {
    db_api.update_enterprise(req.body, function(err) {
       if (err) {
           console.log(err);
           res.send('Error:', err);
       }
        else {
           res.redirect('/index');
       }

    });
});

module.exports = router;
