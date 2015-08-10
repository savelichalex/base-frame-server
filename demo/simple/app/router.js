var BaseRouter = require('../../../baseRouter.js');

function Router() {
    this.init();
}

Router.prototype = {
    routes: {
        '/': 'index',
        'test': 'test',
        'test/:id': 'testWithParams'
    }
};

Router.extends(BaseRouter);

module.exports = Router;