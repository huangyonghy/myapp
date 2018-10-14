var express = require('express');
var router = express.Router();
var url = require('url');
var querystring = require('querystring');

var passport = require('../lib/myPassport');
var db_api = require('../lib/db_api');

router.get('/add', require('connect-ensure-login').ensureLoggedIn(), function(req, res, next) {
    res.render('engineer_add', {username: req.user.username});
});

router.post('/add', function(req, res, next) {
    db_api.add_engineer(req.body, function(err) {
       if (err) {
           console.log(err);
           res.redirect('/engineer/add');
       }
        else {
           res.redirect('/index/engineer');
       }

    });
});

router.get('/delete', require('connect-ensure-login').ensureLoggedIn(), function(req, res, next) {
    db_api.delete_engineer(req.query, function(err) {
        res.redirect('/index/engineer');
    });
});

router.get('/modify', require('connect-ensure-login').ensureLoggedIn(), function(req, res, next) {
    db_api.get_engineer_info_by_name(req.query, function(err, engineer_info) {
        if (err || !engineer_info) {
            res.redirect('/index/engineer');
        }
        else {
            res.render('engineer_modify', {username:req.user.username, engineer_info: engineer_info});
        }
    });
});

router.post('/modify', function(req, res, next) {
    db_api.update_engineer(req.body, function(err) {
       if (err) {
           console.log(err);
           res.send('Error:', err);
       }
        else {
           res.redirect('/index/engineer');
       }

    });
});

module.exports = router;
