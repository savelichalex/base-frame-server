var Mediator = require('../../../../../Mediator.js')(),
    fs = require('fs'),
    _ = require('underscore'),
    defer = require('../../../../../util').defer,
    BaseComponent = require('../../../../../baseComponent');

function MainComponent() {
    this.init();
}

MainComponent.prototype = {

    slots: {
        'global': {
            'on@request:testWithParams': defer(function(data) {
                this.render('test', {
                    id: data.params[0]
                }, data.res);
            })
        }
    },

    dirname: __dirname

};

MainComponent.extends(BaseComponent);

module.exports = MainComponent;