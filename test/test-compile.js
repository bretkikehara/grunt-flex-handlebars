/*
 * grunt-handlebars-template
 * http://gruntjs.com/
 *
 * Copyright (c) 2013 Bret K. Ikehara
 * Licensed under the MIT license.
 */
var libdir = __dirname + '/../tasks/lib/libhandlebars.js',
    fs = require('fs'),
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
                filepath: 'hello',
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
            })
            .replace(/\r|\n/g, '')
            .replace(/\t/g, ' '),
            expected = 'if (!this["template1"]) { this["template1"] = {}; } 1 2';
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
            })
            .replace(/\r|\n/g, '')
            .replace(/\t/g, ' '),
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
            })
            .replace(/\r|\n/g, '')
            .replace(/\t/g, ' '),
            expected = 'YUI.add("star-mobile", function(Y) { 1 2}, "1.0.0", { requires: [ "handlebars-base" ]});';

        test.equal(actual, expected, 'Compiled default template');
        test.done();
    },
    writeDefaultFile: function(test) {
        var grunt = require('grunt'),
            actual,
            script,
            waitUntilGruntQueueIsClear = function() {
                if (grunt.task._queue.length > 0) {
                    setTimeout(waitUntilGruntQueueIsClear, 1000);
                }
            };

        grunt.initConfig({
            handlebars: {
                compile: {
                    options: {
                        opts: {
                            namespace: 'JST'
                        }
                    },
                    files: {
                        'tmp/handlebars-template.js': [
                            'test/src/*.hbs'
                        ]
                    }
                }
            }
        });

        // run grunt script
        grunt.task.run('handlebars');
        waitUntilGruntQueueIsClear();
        
        // load compiled script into memory.
        GLOBAL.Handlebars = require('handlebars');
        script = require(__dirname + '/../tmp/handlebars-template.js');

        // execute compiled template
        actual = script['JST']['template-1']({
            name: 'Bret'
        });

        test.equal(actual, '<p>Hello Bret</p>', 'Compiled default template');
        test.done();
    }
};