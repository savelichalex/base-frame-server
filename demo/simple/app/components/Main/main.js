var defer = require('../../../../../util').defer,
    BaseComponent = require('../../../../../baseComponent'),
    MainService = require('./services/mainService');

function MainComponent() {
    this.init();
}

MainComponent.prototype = {

    slots: {
        'global': {
            'on@request:testWithParams': defer(function(data) {
                this.mainService.testMethod();
                this.render('test', {
                    id: data.params[0]
                }, data.res);
            })
        }
    },

    mainService: new MainService(),

    dirname: __dirname

};

MainComponent.extends(BaseComponent);

module.exports = MainComponent;