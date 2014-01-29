/*
 * grunt-handlebars-template
 * http://gruntjs.com/
 *
 * Copyright (c) 2013 Bret K. Ikehara
 * Licensed under the MIT license.
 */

var grunt = require('grunt'),
	libdir = __dirname + '/../tasks/lib',
    liboptions = require(libdir + '/options.js'),
    libprecompile = require(libdir + '/precompile.js'),
    libfilter = require(libdir + '/filter.js'),
    options = liboptions.get(),
    precompiler = libprecompile.get(grunt, options),
    filter = libfilter.get(grunt, options);

exports.filter = {
	testHelperPattern: function (test) {
		var files = grunt.file.expand('test/src/*'),
			expectedFiles = {
				'test/src/helper-view-name.hbs': true,
				'test/src/helper-dummy.hbs': true
			};

		helperFiles = filter.match(files, options.helperPattern);

		test.expect(2);

		helperFiles.forEach(function(value, index) {
			test.equal(expectedFiles[value], true, "Helper files only");
		});

		test.done();
	},
	testPartialPattern: function (test) {
		var files = grunt.file.expand('test/src/*'),
			expectedFiles = {
				'test/src/partial-list.hbs': true
			};

		helperFiles = filter.match(files, options.partialPattern);

		test.expect(1);

		helperFiles.forEach(function(value, index) {
			test.equal(expectedFiles[value], true, "Partial files only");
		});

		test.done();
	},
	testTemplatePattern: function (test) {
		var files = grunt.file.expand('test/src/*'),
			expectedFiles = {
				'test/src/template-greeting-with-external-helper.hbs': true,
				'test/src/template-greeting-with-helper.hbs': true,
				'test/src/template-greeting-with-partial.hbs': true,
				'test/src/template-greeting-without-helper.hbs': true
			};

		helperFiles = filter.match(files, options.templatePattern);

		test.expect(4);
		helperFiles.forEach(function(value, index) {
			test.equal(expectedFiles[value], true, "Template files only");
		});

		test.done();
	}
};