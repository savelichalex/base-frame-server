var BaseComponent = require('../../../../../../baseComponent'),
    defer = require('../../../../../../util').defer;

function MainService() {
    this.init();
}

MainService.prototype = {

    'signals': {
        'global': {
            'command@mysql:query': 'mysqlQuery'
        }
    },

    getUser: function (id) {
        return this.query('SELECT name FROM test WHERE id=' + id);
    },

    query: function (query) {
        return this.emit.mysqlQuery(query);
    }

};

MainService.extends(BaseComponent);

module.exports = MainService;