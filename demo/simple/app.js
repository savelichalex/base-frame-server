var defer = require('../../util.js').defer,
    BaseRouter = require('../../baseRouter.js');

function Router() {
    this.init();
}

Router.prototype = {
    routes: {
        '/': 'index',
        '/test': 'test'
    }
};

Router.extends(BaseRouter);

(0, new Router());