var initdb = require('./init_db');
var crypto = require('crypto');
Enterprise_model = initdb.Enterprise_model;
Engineer_model = initdb.Engineer_model;
User_model = initdb.User_model;

function enterprise_add(params, cb){
    var enterprise = new Enterprise_model(params);
    enterprise.save(function(err, result){
        cb(err, result);
    });
}

function enterprise_delete(){}

function enterprise_modify(){}

function get_enterprise_info_by_user(user, cb){
    var oMatch = {};
    if (user && user.username != "admin") {
        oMatch.username = user.username;
    }
    Enterprise_model.find(oMatch).lean().exec(function(err, enterprises){cb(err, enterprises)});
}


function engineer_add(params, cb){
    var engineer = new Engineer_model(params);
    engineer.save(function(err, result){
        cb(err, result);
    });
}

function engineer_delete(){}

function engineer_modify(){}

function get_engineer_info_by_user(user, cb){
    var oMatch = {};
    if (user && user.username != "admin") {
        oMatch.username = user.username;
    }
    Engineer_model.find(oMatch).lean().exec(function(err, results){cb(err, results)});
}


function user_add(username, password, telephone, cb) {
    var params = {username: username, password: password, telephone:telephone};
    var user = new User_model(params);
    user.save(function(err, result){
        cb(err, result);
    });
}

function user_check(username, password, cb) {
   User_model.findOne({username: username}, function(err, doc){
       if (doc) {
           if (doc.password == password) {
               cb(null, doc)
           }
           else {
               cb(err, null);
           }
       }
       else {
           cb(err, null);
       }
   });
}

function get_user_list(cb) {
    User_model.find().lean().exec(function(err, users){cb(err, users)});
}

module.exports = {
   add_enterprise: enterprise_add,
   delete_enterprise: enterprise_delete,
   modify_enterprise: enterprise_modify,
   get_enterprise_info_by_user: get_enterprise_info_by_user,
   
   add_engineer: engineer_add,
   delete_engineer: engineer_delete,
   modify_engineer: engineer_modify,
   get_engineer_info_by_user: get_engineer_info_by_user,

   check_user: user_check,
   get_user_list: get_user_list,
   add_user: user_add

}
