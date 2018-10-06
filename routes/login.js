var express = require('express');
var router = express.Router();

var fs = require("fs");
var path = require("path");
const crypto = require('crypto');

var passport = require('../lib/myPassport');

router.get('/', function(req, res, next) {
    res.render('login', {title: 'Demo-Web', action:'/login'});
});

router.post('/',
    passport.authenticate('local', { successRedirect: '/information',
        failureRedirect: '/login' }));

module.exports = router;
