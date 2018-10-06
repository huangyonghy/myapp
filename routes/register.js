var express = require('express');
var router = express.Router();

var fs = require("fs");
var path = require("path");
const crypto = require('crypto');
var db_api = require('../lib/db_api');

router.get('/', function (req, res, next) {
    res.render('register', {title: 'Demo-Web', action:'/register'});
});

router.post('/', function (req, res, next) {
    var username = req.body['username'];
    var password = req.body['password'];
    var telephone = req.body['telephone'];

    const hmac = crypto.createHmac('sha256', 'a secret');
    hmac.update(password);
    password = hmac.digest('hex');
   
    if (username == "admin") {
        res.redirect('/register');
    }

    db_api.add_user(username, password, telephone, function (err, result) {
        if (err) {
            res.render('register', {title: 'Demo-Web', error: err, action:'/register'});}
        else{
            res.redirect('/login');
        }
    });
});

module.exports = router;
