var Emitter = require('./Emitter.js');

var Mediator = Emitter();

Mediator.name = 'mediator';

var getInstance = function() {
    return Mediator;
};

module.exports = getInstance;