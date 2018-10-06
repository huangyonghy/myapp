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
            res.render('userList', {users: users});
        }
    });
});


module.exports = router;
