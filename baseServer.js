var defer = require('./util.js').defer,
    Emitter = require('./Emitter.js');

function BaseServer() {

}

BaseServer.prototype = {
    _emitter: (function() {
        var emitter = Emitter();
        emitter.name = 'server';
        return emitter;
    }()),

    createServer: function(req, res) {
        throw new Error('You must implement createServer method');
    },

    on: function(event, context) {
        return this._emitter.on(event, context);
    },

    once: function(event, context) {
        return this._emitter.once(event, context);
    },

    trigger: function(event, data) {
        return this._emitter.trigger(event, data);
    },
};

BaseServer.rootClass();

module.exports = BaseServer;