var BaseService = require('../../../../../../baseService');

function MainService() {

}

MainService.prototype = {
    testMethod: function () {
        console.log('this is test method!');
    }
};

MainService.extends(BaseService);

module.exports = MainService;