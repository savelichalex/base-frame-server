module.exports = function Renderer() {
};

Renderer.prototype = {
    parseTemplate: function (data, obj) {
        if (!obj || obj.length === 0) {
            return data;
        }
        var template_regexp = /\{\{([\w\d]+)\}\}/g;

        data = data + '';
        data = data.replace(template_regexp, function () {
            var entry = Array.prototype.slice.call(arguments)[1],
                val = obj[entry];
            if (val) {
                return val;
            } else {
                return '';
            }
        });

        return data;
    },

    render: function (filename, obj, res) {
        if (typeof filename === 'object') {
            obj = filename;
            filename = 'index';
        } else {
            filename = filename || 'index';
        }
        var path = this.dirname + '/views/' + filename + '.html', //hardcode!!!
            template,
            self = this;
        this._util.fs.readFile(path, function (err, data) {
            if (err) {
                res.end();
            } else {
                template = self.parseTemplate(data, obj);
                res.writeHead(200, {'Content-type': 'text/html'});
                res.end(template);
            }
        });
    }
};