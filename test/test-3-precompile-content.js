/*
 * grunt-flex-handlebars
 * http://gruntjs.com/
 *
 * Copyright (c) 2013 Bret K. Ikehara
 * Licensed under the MIT license.
 */
var grunt = require('grunt'),
    libdir = __dirname + '/../tasks/lib',
    liboptions = require(libdir + '/options.js'),
    libprecompile = require(libdir + '/precompile.js'),
    fs = require('fs'),
    writeOptions = {
        encoding: 'utf-8'
    },
    yuiInit = {
        templateFile: __dirname + '/template/yui-template.js',
        wrapperFile: __dirname + '/template/yui-wrapper.js',
    };

exports.template = {
    compileDefaultTemplate: function(test) {
        var options = liboptions.get(),
            compiler = libprecompile.get(grunt, options),
            actual =  compiler.precompileTemplate({
                template: 'function() {return "hello"}',
                filepath: '/template-hello.hbs',
                opts: {
                    namespace: 'template1',
                    name: 'hello'
                }
            })
            .replace(/\/\/.+[\r\n]*?/g, ''),
            expected = 'this["template1"]["hello"] = Handlebars.template(function() {return "hello"});';

        test.equal(actual, expected, 'Compiled default template');
        test.done();
    },
    compileDefaultWrapper: function(test) {
        var options = liboptions.get(),
            compiler = libprecompile.get(grunt, options),
            actual =  compiler.wrap({
                templates: [
                    '1',
                    '2'
                ],
                opts: {
                    namespace: 'template1',
                    name: 'hello'
                }
            })
            .replace(/\/\/.+[\r\n]*?/g, '')
            .replace(/\r|\n/g, '')
            .replace(/\t/g, ' '),
            expected = 'if (!this["template1"]) { this["template1"] = {}; } 1 2';
        test.equal(actual, expected, 'Compiled default template');
        test.done();
    },
    compileYUITemplate: function(test) {
        var options = liboptions.get(yuiInit),
            compiler = libprecompile.get(grunt, options),
            actual =  compiler.precompileTemplate({
                template: 'function() {return "hello"}',
                filepath: '/template-hello.hbs',
                opts: {
                    namespace: 'template1'
                }
            })
            .replace(/\/\/.+[\r\n]*?/g, '')
            .replace(/\r|\n/g, '')
            .replace(/\t/g, ' '),
            expected = 'Y.namespace("template1")["hello"] = Y.Handlebars.template(function() {return "hello"});';

        test.equal(actual, expected, 'Compiled default template');
        test.done();
    },
    compileYUIWrapper: function(test) {
        var options = liboptions.get(yuiInit),
            compiler = libprecompile.get(grunt, options),
            actual =  compiler.wrap({
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
            })
            .replace(/\/\/.+[\r\n]*?/g, '')
            .replace(/\r|\n/g, '')
            .replace(/\t/g, ' '),
            expected = 'YUI.add("star-mobile", function(Y) { 1 2}, "1.0.0", { requires: [ "handlebars-base" ]});';

        test.equal(actual, expected, 'Compiled default template');
        test.done();
    }
};
