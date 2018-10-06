// getting-started.js
var dboper = require('./mongo_operator');
dboper.connectMongoose();

var enterpriseSchema = new dboper.Schema({
    username: String,
    name: String,
    contact_name: String,
    contact_title: String,
    contact_telephone: String,
    follow_state: String, //color-set{"yixiang", "daigaigenjin", "qianyue"}
    postscript: String,
    date: { type: Date, default: Date.now }
});
enterpriseSchema.index({ name: 1 }, { unique: true });

var engineerSchema = new dboper.Schema({
    username: String,
    name: String,
    telephone: String,
    title_info: String, //color-set{"jianzhu", "kuaijishi", ...}
    title_state: String, //color-set{"chushi", "biangeng"}
    work_state: String,  //set{"zaizhi", "lizhi"}
    postscript: String,
    date: { type: Date, default: Date.now }
});
engineerSchema.index({ name: 1 }, { unique: true });

var userSchema = new dboper.Schema({
    username: String,
    telephone: String,
    password: String
});
userSchema.index({ username: 1}, {unique: true });

var Enterprise_model = dboper.mongo.model('Enterprise', enterpriseSchema);
var Engineer_model = dboper.mongo.model('Engineer', engineerSchema);
var User_model = dboper.mongo.model('User', userSchema);

module.exports = {
    Enterprise_model: Enterprise_model,
    Engineer_model: Engineer_model,
    User_model: User_model
}
