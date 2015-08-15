var defer = require('./util').defer;

'use strict';

function BaseService() {

}

BaseService.prototype = {
    type: 'service'
};

BaseService.rootClass();

module.exports = BaseService;