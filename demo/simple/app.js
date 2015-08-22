var defer = require('../../util.js').defer,
    Router = require('./app/router.js'),
    MainComponent = require('./app/components/Main/main.js'),
    MysqlManager = require('../../MysqlManager');

var router = new Router();
var main = new MainComponent();
var mysqlManager = new MysqlManager();