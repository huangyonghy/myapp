var express = require('express');
var router = express.Router();

var db_api = require('../lib/db_api'); 
var passport = require('../lib/myPassport');

/* GET users listing. */
router.get('/', require('connect-ensure-login').ensureLoggedIn(), function(req, res, next) {
    db_api.get_user_list(function(err, users){
        if (err) {
            res.redirect('/');
        }
        else {
            res.render('userList', {user: req.user, users: users});
        }
    });
});


router.get('/delete', require('connect-ensure-login').ensureLoggedIn(), function(req, res, next) {
    db_api.delete_user(req.query, function(err) {
        res.redirect('/users');
    });
});

module.exports = router;
