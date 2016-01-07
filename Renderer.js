'use strict';

const fs = require('fs');

module.exports =  class Renderer {
	static parseTemplate(data, obj) {
		if(!obj || !obj.length) {
			return data;
		}

		const templateRegexp = /\{\{([\w\d]+)\}\}/g;

		data = data + ''; //data to string conversation
		return data.replace(tempateRegexp, (_, entry) => obj[entry] ? obj[entry] : '')
	}

	static parse(file, data, res) {
		fs.readFile(file, (err, fileData) => {
			if(err) {
				res.end();
			} else {
				const template = Renderer.parseTemplate(fileData, data);
				res.writeHead(200, {'Content-type': 'text/html'});
				res.end(template);
			}
		});
	}

	static json(data, res) {
		res.writeHead(200, {'Content-type': 'text/json'});
		res.end(JSON.stringify(obj));
	}
}
