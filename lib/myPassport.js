/**
 * Created by huangyong on 12/23/16.
 */
var crypto = require('crypto');
var myPassport = require('passport');
var db_api = require('./db_api');

module.exports = myPassport;

var Strategy = require('passport-local').Strategy;

//define passport strategy
myPassport.use('local', new Strategy(
    function (username, password, cb) {
        var hmac = crypto.createHmac('sha256', 'a secret');
        hmac.update(password);
        password = hmac.digest('hex');
        db_api.check_user( username, password, function (err, result) {
            if (err) {
                return cb(err);
            }
            if (!result) {
                return cb(null, false, { message: 'Incorrect username or password.'});
            }
            return cb(null, result);
        });
    }));

myPassport.serializeUser(function (user, cb) {
    cb(null, user);
});

myPassport.deserializeUser(function (user, cb) {
    cb(null, user);
});
