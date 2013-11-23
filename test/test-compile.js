/*
 * grunt-handlebars-template
 * http://gruntjs.com/
 *
 * Copyright (c) 2013 Bret K. Ikehara
 * Licensed under the MIT license.
 */
var libhandlebars = require(__dirname + '/../tasks/lib/handlebars-template.js'),
	writeOptions = {
		encoding: 'utf-8'
	};

libhandlebars.init();

exports.handlebars = {
	compileDefaultTemplate: function(test) {
		var actual =  libhandlebars.createTemplateFile({
				template: 'function() {return "hello"}',
				opts: {
					namespace: 'template1',
					name: 'hello'
				}
			}),
			expected = 'this["template1"]["hello"] = Handlebars.template(function() {return "hello"});';

		test.equal(actual, expected, 'Compiled default template');
		test.done();
	}
};