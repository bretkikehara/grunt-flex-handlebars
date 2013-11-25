/*
 * grunt-handlebars-template
 * http://gruntjs.com/
 *
 * Copyright (c) 2013 Bret K. Ikehara
 * Licensed under the MIT license.
 */
var libdir = __dirname + '/../tasks/lib/handlebars-template.js',
	writeOptions = {
		encoding: 'utf-8'
	},
	yuiInit = {
		templateFile: __dirname + '/template/yui-template.js',
		wrapperFile: __dirname + '/template/yui-wrapper.js',
	};

exports.handlebars = {
	compileDefaultTemplate: function(test) {
		var libhandlebars = require(libdir).init(),
			actual =  libhandlebars.createTemplateFile({
				template: 'function() {return "hello"}',
				opts: {
					namespace: 'template1',
					name: 'hello'
				}
			}),
			expected = 'this["template1"]["hello"] = Handlebars.template(function() {return "hello"});';

		test.equal(actual, expected, 'Compiled default template');
		test.done();
	},
	compileDefaultWrapper: function(test) {
		var libhandlebars = require(libdir).init(),
			actual =  libhandlebars.createWrapperFile({
				templates: [
					'1',
					'2'
				],
				opts: {
					namespace: 'template1',
					name: 'hello'
				}
			}).replace(/\r|\n/g, ''),
			expected = 'if (!this["template1"]) { this["template1"] = {}; }\t1\t2';
		test.equal(actual, expected, 'Compiled default template');
		test.done();
	},
	compileYUITemplate: function(test) {
		var libhandlebars = require(libdir).init(yuiInit),
			actual =  libhandlebars.createTemplateFile({
				template: 'function() {return "hello"}',
				opts: {
					namespace: 'template1',
					name: 'hello'
				}
			}),
			expected = 'Y.namespace("template1")["hello"] = Y.Handlebars.template(function() {return "hello"});';

		test.equal(actual, expected, 'Compiled default template');
		test.done();
	},
	compileYUIWrapper: function(test) {
		var libhandlebars = require(libdir).init(yuiInit),
			actual =  libhandlebars.createWrapperFile({
				templates: [
					'1',
					'2'
				],
				opts: {
					'module-name': 'star-mobile',
					namespace: 'template1',
					name: 'hello',
					version: '1.0.0'
				}
			}).replace(/\r|\n/g, ''),
			expected = 'YUI.add("star-mobile", function(Y) {\t1\t2}, "1.0.0", {	requires: [ "handlebars-base" ]});';

		test.equal(actual, expected, 'Compiled default template');
		test.done();
	}
};