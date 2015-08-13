var Emitter = require('./Emitter'),
    Mediator = require('./Mediator')();

'use strict';

var BaseComponent = function() {
};

BaseComponent.prototype = {

    _emitter: (function() {
        var emitter = Emitter();
        emitter.name = 'local';
        return emitter;
    }()),

    _globalEmitter: Mediator,

    emit: {},

    _slots: function(channels) {
        for(var channel in channels) {
            if(channels.hasOwnProperty(channel)) {

                var slots = channels[channel];

                if (typeof slots === 'function') {
                    slots = slots.call({});
                }

                if (Object.prototype.toString.call(slots) !== '[object Object]') {
                    throw new Error("Slots must be (or return from func) hash object");
                }

                var emitter = channel === 'global' ? this._globalEmitter : this._emitter;

                for (var slot in slots) {
                    if (slots.hasOwnProperty(slot)) {
                        var _arr = slot.split('@');
                        if (_arr.length > 2) {
                            throw new Error("Incorrect name of slot");
                        }
                        var method = _arr[0];
                        var event = _arr[1];

                        var promise;

                        switch (method) {
                            case 'on':
                                promise = emitter.on(event, this);
                                break;
                            case 'once':
                                promise = emitter.once(event, this);
                                break;
                            case 'command':
                                promise = emitter.commandFrom(event, this);
                                break;
                        }

                        slots[slot]._queue.forEach(function (cb) {
                            promise = promise.then(cb.onFulfill, cb.onReject);
                        });
                    }
                }
            }
        }
    },

    _signals: function(channels) {
        for(var channel in channels) {
            if(channels.hasOwnProperty(channel)) {

                var signals = channels[channel];

                if (typeof signals === 'function') {
                    signals = signals.call({});
                }

                if (Object.prototype.toString.call(signals) !== '[object Object]') {
                    throw new Error("Signals must be (or return from func) hash object");
                }

                var emitter = channel === 'global' ? this._globalEmitter : this._emitter;

                for (var signal in signals) {
                    if (signals.hasOwnProperty(signal)) {
                        var _arr = signal.split('@');
                        if (_arr.length > 2) {
                            throw new Error("Incorrect name of signal");
                        }

                        var method = _arr[0];
                        var event = _arr[1];

                        this.emit[signals[signal]] = function (data) {
                            switch (method) {
                                case 'trigger':
                                    emitter.trigger(event, data);
                                    break;
                                case 'command':
                                    return emitter.commandTo(event, data);
                                    break;
                            }
                        };
                    }
                }
            }
        }
    },

    addSignal: function(channel, signal, methodname) {
        var emitter = channel === 'global' ? GlobalEmitter : this._emitter;

        var _arr = signal.split('@');
        if(_arr.length > 2) {
            throw new Error("Incorrect name of signal");
        }

        var method = _arr[0];
        var event = _arr[1];

        this.emit[methodname] = function(data) {
            switch(method) {
                case 'trigger': emitter.trigger(event, data); break;
                case 'command': emitter.commandTo(event, data); break;
            }
        };
    },

    init: function() {
        this._slots(this.slots);
        this._signals(this.signals);
    },

    parseTemplate: function(data, obj) {
        if(!obj || obj.length === 0) {
            return data;
        }
        var template_regexp = /\{\{([\w\d]+)\}\}/g;

        data = data + '';
        data = data.replace(template_regexp, function() {
            var entry = Array.prototype.slice.call(arguments)[1],
                val = obj[entry];
            if(val) {
                return val;
            } else {
                return '';
            }
        });

        return data;
    },

};

BaseComponent.rootClass();

module.exports = BaseComponent;