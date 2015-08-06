var Emitter = require('./Emitter.js');

var Mediator = Emitter();

var getInstance = function() {
    return Mediator;
};

module.exports = getInstance;