var mysql = require('mysql'),
    DbManager = require('./DbManager');

function MysqlManager() {
    this.connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '119911',
        database: 'test'
    });

    var self = this;
    this.mediator.commandFrom('mysql:query').then(function(s) {
        console.log(s);
        return self.query(s);
    });
}

MysqlManager.prototype = {
    query: function(query_str) {
        var _resolve, _reject, promise;

        promise = new this.mediator.Promise(function( resolve, reject ) {
            _resolve = resolve;
            _reject = reject;
        });

        this.connection.query(query_str, function(err, rows, field) {
            if(err) {
                _reject(err);
            } else {
                _resolve({
                    rows: rows,
                    field: field
                });
            }
        });

        return promise;
    }
};

MysqlManager.extends(DbManager);

module.exports = MysqlManager;