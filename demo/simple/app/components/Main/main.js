var BaseComponent = require('base-components').BaseComponent,
    MainService = require('./services/mainService'),
    r = require('../../../../../Renderer');

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
            'on@request:testWithParams': function* (ch) {
                var self = this;
                this.mainService.getUser(data.params[0]).then(function (d) {
                    self.render('test', {
                        id: d.rows[0].name
                    }, data.res);
                });
            }
        }
    },

    mainService: new MainService(),

    dirname: __dirname

};

MainComponent.extends(BaseComponent);

module.exports = MainComponent;