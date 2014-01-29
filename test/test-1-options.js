/*
 * grunt-handlebars-template
 * http://gruntjs.com/
 *
 * Copyright (c) 2013 Bret K. Ikehara
 * Licensed under the MIT license.
 */
var libdir = __dirname + '/../tasks/lib',
    grunt = require('grunt'),
    liboptions = require(libdir + '/options.js');

exports.options = {
    testGetOptions: function (test) {
        var userOpts = {
                name: "bret"
            },
            defOpts = {
                message: 'hello',
                name: "world"
            },
            mixedOpts = liboptions.getOptions(userOpts, defOpts);

        test.equal(mixedOpts.name, userOpts.name, "Default options was overridden");
        test.equal(mixedOpts.message, defOpts.message, "Default options was not overridden");
        test.done();
    },
    testSeparator: function(test) {
        var options = liboptions.get();
        test.equal(grunt.util.linefeed + grunt.util.linefeed, options.separator, "OS line separator");
        test.done();
    }
};