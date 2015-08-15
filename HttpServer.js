var defer = require('./util.js').defer,
    BaseServer = require('./baseServer.js'),
    http = require('http'),
    url = require('url'),
    fs = require('fs'),
    PORT = +process.env.PORT || 1337;

function HttpServer() {

}

HttpServer.prototype = {

    _util: {
        http: http,
        url: url,
        fs: fs,
        PORT: PORT
    },

    run: function(routes) {
        var self = this;

        this.routes = routes;
        this._util.http.createServer(function(req, res) {
            self.handleRequest(req, res);
        }).listen(this._util.PORT);
        console.log('Server listen on port ' + this._util.PORT);
    },

    handleRequest: function(req, res) {
        var pathname = this._util.url.parse(req.url).pathname,
            i,
            match = false, //need to check route match
            params = [],
            http_method,
            routes = this.routes;
        console.log(pathname);
        for(i in routes) {
            if(routes.hasOwnProperty(i)) {
                if(routes[i].regexp.test(pathname) || pathname === i) {
                    match = true;
                    params = pathname.match(routes[i].regexp).splice(1); //TODO: params must be an hash object

                    http_method = req.method;
                    if(http_method === 'GET' && routes[i].method === 'GET') {
                        this.onGet(req, res, i, params);
                    } else if(http_method === 'POST' && routes[i].method === 'POST') {
                        this.onPost(req, res, i, params);
                    } else if(http_method === 'PUT' && routes[i].method === 'PUT') {
                        this.onPut(req, res, i, params);
                    } else if(http_method === 'DELETE' && routes[i].method === 'DELETE') {
                        this.onDelete(req, res, i, params);
                    } else {
                        match =false;
                    }
                }
            }
        }
        if(!match) {
            this.onNoHandler(res, pathname);
        }
    },

    callAction: function(id, params, req, res) {
        this.trigger('request:' + id, {
            params: params,
            req: req,
            res: res
        });
    },

    onGet: function(req, res, route_id, params) {
        this.callAction(route_id, params, req, res);
    },

    onPost: function(req, res, route_id, params) {
        this.callAction(route_id, params, req, res);
    },

    onPut: function(req, res, route_id, params) {
        this.callAction(route_id, params, req, res);
    },

    onDelete: function(req, res, route_id, params) {
        this.callAction(route_id, params, req, res);
    },

    onNoHandler: function(res, pathname) {
        var tmp = pathname.lastIndexOf('.'),
            extension = pathname.substring(tmp + 1),
            mimes = {
                'css': 'text/css',
                'js': 'text/javascript',
                'html': 'text/html',
                'png': 'image/png',
                'jpg': 'image/jpeg',
                'jpeg': 'image/jpeg',
                'eot': 'application/vnd.ms-fontobject',
                'ttf': 'application/octet-stream',
                'woff': 'application/octet-stream',
                'svg': 'image/svg+xml'
            },
            file_path,
            key;

        for(key in mimes) {
            if(mimes.hasOwnProperty(key)) {
                if(key === extension) {
                    file_path = '.' + pathname;
                }
            }
        }
        if(file_path) {
            this._util.fs.readFile(file_path, function (err, data) {
                if (err) {
                    res.writeHead(500, {'Content-type': 'text/plain'});
                    res.end('500: Internal Server Error');
                }
                res.writeHead(200, {'Content-type': mimes[extension]});
                res.end(data);
            });
        } else {
            console.warn(pathname + ' handler not found');
            /*fs.readFile('public/404.html', function(err, data) { //TODO: change hardcoded 404 template(must be on config)
                res.writeHead(404);
                res.end(data);
             });*/
        }
    }
};

HttpServer.extends(BaseServer);

module.exports = HttpServer;