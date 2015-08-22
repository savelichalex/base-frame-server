var defer = require('./util').defer,
    Mediator = require('./Mediator');

'use strict';

function DbManager() {}

DbManager.prototype = {
    connection: void 0,

    mediator: Mediator(),
};

DbManager.rootClass();

module.exports = DbManager;