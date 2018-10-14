var initdb = require('./init_db');
var crypto = require('crypto');

Enterprise_model = initdb.Enterprise_model;
Engineer_model = initdb.Engineer_model;
User_model = initdb.User_model;

const time_zone_8 = 8*3600*1000;

function enterprise_add(params, cb){
    params.update_time = new Date().getTime();
    params.update_time_str = new Date(params.update_time + time_zone_8).toLocaleString();
    var enterprise = new Enterprise_model(params);
    enterprise.save(function(err, result){
        cb(err, result);
    });
}


function enterprise_delete(oMatch, cb){
    Enterprise_model.remove(oMatch).exec(function(err, results){cb(err, results)});
}

function enterprise_update(params, cb){
    params.update_time = new Date().getTime();
    params.update_time_str = new Date(params.update_time + time_zone_8).toLocaleString();
    Enterprise_model.findOneAndUpdate({username:params.username, name: params.name}, params, function(err, result){
        cb(err, result);
    });
}

function get_enterprise_info_by_user(user, params, cb){
    var oMatch = {};
    if (user && user.username != "admin") {
        oMatch.username = user.username;
    }
    if (params) {
        var keyword = params.keyword;
        var reg = new RegExp(keyword, 'i');
        oMatch.$or = [{name: {$regex: reg}}, {contact_name: {$regex: reg}}, {contact_title: {$regex: reg}}, {contact_telephone: {$regex: reg}}, {follow_state: {$regex: reg}}, {postscript: {$regex: reg}}];
    };
    Enterprise_model.find(oMatch).lean().exec(function(err, enterprises){
cb(err, enterprises)});
}

function get_enterprise_info_by_name(oMatch, cb){
    Enterprise_model.findOne(oMatch).lean().exec(function(err, enterprises){cb(err, enterprises)});
}

function engineer_add(params, cb){
    params.update_time = new Date().getTime();
    params.update_time_str = new Date(params.update_time + time_zone_8).toLocaleString();
    var engineer = new Engineer_model(params);
    engineer.save(function(err, result){
        cb(err, result);
    });
}

function engineer_delete(oMatch, cb){
    Engineer_model.remove(oMatch).exec(function(err, results){cb(err, results)});
}

function engineer_update(params, cb){
    params.update_time = new Date().getTime();
    params.update_time_str = new Date(params.update_time + time_zone_8).toLocaleString();
    Engineer_model.findOneAndUpdate({username:params.username, name: params.name}, params, function(err, result){
        cb(err, result);
    });
}

function get_engineer_info_by_user(user, params, cb){
    var oMatch = {};
    if (user && user.username != "admin") {
        oMatch.username = user.username;
    }
    if (params) {
        var keyword = params.keyword;
        var reg = new RegExp(keyword, 'i');
        oMatch.$or = [{name: {$regex: reg}}, {telephone: {$regex: reg}}, {title_info: {$regex: reg}}, {title_state: {$regex: reg}}, {work_state: {$regex: reg}}, {postscript: {$regex: reg}}];
    }
    Engineer_model.find(oMatch).lean().exec(function(err, results){cb(err, results)});
}

function get_engineer_info_by_name(oMatch, cb){
    Engineer_model.findOne(oMatch).lean().exec(function(err, result){cb(err, result)});
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

function user_delete(oMatch, cb){
    User_model.remove(oMatch).exec(function(err, results){cb(err, results)});
}

function get_user_list(cb) {
    User_model.find().lean().exec(function(err, users){cb(err, users)});
}

module.exports = {
   add_enterprise: enterprise_add,
   delete_enterprise: enterprise_delete,
   update_enterprise: enterprise_update,
   get_enterprise_info_by_user: get_enterprise_info_by_user,
   get_enterprise_info_by_name: get_enterprise_info_by_name,
   
   add_engineer: engineer_add,
   delete_engineer: engineer_delete,
   update_engineer: engineer_update,
   get_engineer_info_by_user: get_engineer_info_by_user,
   get_engineer_info_by_name: get_engineer_info_by_name,

   check_user: user_check,
   get_user_list: get_user_list,
   add_user: user_add,
   delete_user: user_delete

}
