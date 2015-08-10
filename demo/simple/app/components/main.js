var Mediator = require('../../../../Mediator.js')(),
    fs = require('fs'),
    _ = require('underscore');

Mediator.on('request:testWithParams')
        .then(function(data) {
            fs.readFile(__dirname + '/views/test.html', function(err, file) {
                var templateFn = _.template(file + '');
                data.res.writeHead(200, {'Content-type': 'text/html'});
                data.res.end(templateFn({
                    id: data.params[0]
                }));
            });
        });