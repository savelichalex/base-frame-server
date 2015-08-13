var Mediator = require('../../../../../Mediator.js')(),
    fs = require('fs'),
    _ = require('underscore'),
    defer = require('../../../../../util').defer,
    BaseComponent = require('../../../../../baseComponent');

/*Mediator.on('request:testWithParams')
        .then(function(data) {
            fs.readFile(__dirname + '/views/test.html', function(err, file) {
                var templateFn = _.template(file + '');
                data.res.writeHead(200, {'Content-type': 'text/html'});
                data.res.end(templateFn({
                    id: data.params[0]
                }));
            });
        });*/

function parseTemplate( data, obj ) {
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
}

function render( filename, obj, res ) {
    if(typeof filename === 'object') {
        var obj = filename,
            filename = 'index';
    } else {
        var filename = filename || 'index';
    }
    var path = __dirname + '/views/' + filename + '.html', //hardcode!!!
        template;
    fs.readFile(path, function(err, data) {
        if(err) {
            res.end();
        } else {
            template = parseTemplate(data, obj);
            res.writeHead(200, {'Content-type': 'text/html'});
            res.end(template);
        }
    });
}

function MainComponent() {
    this.init();
}

MainComponent.prototype = {

    slots: {
        'global': {
            'on@request:testWithParams': defer(function(data) {
                console.log(data);
                render('test', {
                    id: data.params[0]
                }, data.res);
            })
        }
    }

};

MainComponent.extends(BaseComponent);

module.exports = MainComponent;