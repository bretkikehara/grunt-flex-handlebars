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

exports.combine = {
	testCombineHelper: function (test) {
		var files = grunt.file.expand('test/src/*'),
			helperFiles = filter.match(files, options.helperPattern),
			content = precompiler.precompile(helperFiles, 'helper');

		test.ok(content, "Precompiled helper");
		test.done();
	},
	testCombineTemplate: function(test) {
		var files = grunt.file.expand('test/src/*'),
			templateFiles = filter.match(files, options.templatePattern),
			content = precompiler.precompile(templateFiles, 'template');

		test.ok(content, "Precompiled template");
		test.done();

	},
	testCombinePartial: function(test) {
		var files = grunt.file.expand('test/src/*'),
			partialFiles = filter.match(files, options.partialPattern),
			content = precompiler.precompile(partialFiles, 'partial');

		test.ok(content, "Precompiled partial");
		test.done();

	}
};