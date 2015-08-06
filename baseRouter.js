var defer = require('./util.js').defer,
    Mediator = require('./Mediator.js')(),
    HttpServer = require('./HttpServer.js');

function BaseRouter() {

};

BaseRouter.prototype = {

    _server: HttpServer,

    routes: void 0,

    init: function() {
        var routes = this.routes,
            uri,
            method,
            signals;

        for(uri in routes) {
            if(routes.hasOwnProperty(uri)) {
                signals = routes[uri];

                var arr = uri.split(' ');
                if(arr.length = 1) {
                    method = 'GET';
                } else {
                    method = arr[0];
                    uri = arr[1];
                }

                var actions = [], params = [],
                    len, handle,
                    handle_str;

                if(/[^\w\d\/\:\_]+/.test(uri)) {
                    throw new Error('not valid uri');
                }

                if(uri === '/') {
                    handle = '/';
                } else {
                    actions = uri.split('/');
                    len = actions.length;
                    while(len--) {
                        if(actions[len].indexOf(':') === 0) {
                            actions.slice(len, 1);
                        }
                    }
                    handle = '/'+actions.join('/');
                }

                //regexp string to action parametrs
                handle_str = handle;
                handle_str = handle_str.replace(/\:[a-zA-Z0-9]+/g, '([\\w\\d\_]+)').replace(/\//g, '\\/'); /*jshint ignore:line */

                routes[handle] = {
                    signals: signals,
                    params: params,
                    regexp: new RegExp('^' + handle_str +'$')
                }
            }
        }

        this._server = new this._server(routes);
    }
};

BaseRouter.rootClass();

module.exports = BaseRouter;