/**
 * 该文件用来初始化数据库的连接
 */
var mongoose = require('mongoose');
var Schema   = require('mongoose').Schema;

mongoPara = 'mongodb://demo:demo@localhost:27017/demo';
function DbOper() {
    this.mongo  = null;
    this.Schema = mongoose.Schema;
}


// 连接mongoose数据库，如果只需要连接mongoose数据库，可调用此函数
// mongoosePara形如：'mongodb://admin:admin@192.168.110.33:40000/lyytest'
DbOper.prototype.connectMongoose = function(mongoosePara, bIsMonitor, poolSize) {
    if ((mongoosePara != undefined) && ('string' == typeof mongoosePara)) {
        this.setMongoPara(mongoosePara);
    } else {
        bIsMonitor = mongoosePara;
    }
    var argLen = arguments.length;
    switch(argLen) {
        case 2: {
            if ('boolean' == typeof bIsMonitor) {
                poolSize = 5;
            } else {
                poolSize   = bIsMonitor;
                bIsMonitor = false;
            }
            break;
        }
    }

    if (300 < poolSize || 1 > poolSize) {
        console.warn('The size %d of the pool you set is improper,setting to default now!', poolSize);
        poolSize = 5;
    }
    if (undefined == poolSize || 'boolean' == typeof poolSize) {
        poolSize = 5;
    }

    var options = {
        'server': {
            'reconnectTries': Number.MAX_VALUE,
            'reconnectInterval': 5000,
            'poolSize': poolSize
        },
        'db': {'readPreference': 'secondaryPreferred'}
    };
    this.mongo = mongoose.createConnection(mongoPara, options);
    var keepaliveSchema = new Schema({
        name: String
    });

    //为mongodb保活而定义的一张空表
    var keepaliveModel = this.mongo.model("mongo_keepalive", keepaliveSchema);
    var timerHandle = null;
    var serName = mongoPara.split('/').slice(3);
    var iSearchNoReturn = 0;
    var imongopara = mongoosePara;
    //定时器超时调用该函数查找一次空表，达到保活目的
    function procDbKeepalive() {

        if (iSearchNoReturn >= 5) {
            console.error('mongodb connection is wrong, process exit!!!!!! ', mongoPara);
            //setTimeout(function(){
            //    process.exit(7);
            // }, 2000);
            return;
        }

        iSearchNoReturn++;

        keepaliveModel.findOne({name: "mongo_keepalive"}, function (err, result) {

            iSearchNoReturn = 0;

            if (err) {
                console.error("find mongo_keepalive with error: " + err);
            } else {
                console.log(serName + ' find mongo_keepalive from mongoose success.');
            }
        });
    }

    this.mongo.on('connecting', function () {
        console.warn((new Date()) + ' connecting to mongoose %s.', mongoPara);
    });

    this.mongo.on('open', function () {
        console.warn((new Date()) + ' open to mongoose %s.', mongoPara);
    });

    this.mongo.on('connected', function () {
        console.warn((new Date()) + ' connected to mongoose success: ' + mongoPara + ', poolSize: ' + poolSize);
        if (null == timerHandle) {
            timerHandle = setInterval(procDbKeepalive, 30000);
        }
    });

    this.mongo.on('disconnected', function () {
        console.warn((new Date()) + ' disconnected to mongoose %s.', mongoPara);
        if (null != timerHandle) {
            clearTimeout(timerHandle);
            timerHandle = null;
        }
    });

    this.mongo.on('close', function () {
        console.warn((new Date()) + ' close to mongoose %s.', mongoPara);
    });

    function connectFailed() {
        process.exit(7);
    }

    this.mongo.on('error', function (error) {
        console.error((new Date()) + ' Connect to mongoose with error: ' + error + ', para: ' + mongoPara);
        setTimeout(connectFailed, 30000);
    });
};


var dboper = module.exports = new DbOper;
