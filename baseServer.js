var Emitter = require('base-components').Emitter;

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

module.exports = BaseServer;