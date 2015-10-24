var Emitter = require('base-components').Emitter;

var Mediator = Emitter();

Mediator.name = 'mediator';

var getInstance = function() {
    return Mediator;
};

module.exports = getInstance;