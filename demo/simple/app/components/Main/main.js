var defer = require('../../../../../util').defer,
    BaseComponent = require('../../../../../baseComponent'),
    MainService = require('./services/mainService');

function MainComponent() {
    this.init();
}

MainComponent.prototype = {

    'signals': {
        'global': {
            'command@mysql:query': 'mysqlQuery'
        }
    },

    slots: {
        'global': {
            'on@request:testWithParams': defer(function(data) {
                this.mainService.testMethod();
                var self = this;
                this.emit.mysqlQuery('SELECT name FROM test WHERE id=' + data.params[0])
                    .then(function(d) {
                        console.log(d);
                        self.render('test', {
                            id: d.rows[0].name
                        }, data.res);
                    });
            }),
        }
    },

    mainService: new MainService(),

    dirname: __dirname

};

MainComponent.extends(BaseComponent);

module.exports = MainComponent;