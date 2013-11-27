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
            actual =  libhandlebars.precompileTemplate({
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
        var libhandlebars = require(libdir).init(),
            actual =  libhandlebars.precompileWrapper({
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
        var libhandlebars = require(libdir).init(yuiInit),
            actual =  libhandlebars.precompileTemplate({
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
        var libhandlebars = require(libdir).init(yuiInit),
            actual =  libhandlebars.precompileWrapper({
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
    },
    writeDefaultFile: function(test) {
        var os = require('os'),
            cp = require('child_process'),
            cmd;

        test.expect(4);

        cmd = [
            (os.platform() === 'win32' ? 'grunt.cmd' : 'grunt'),
            '--verbose',
            '--gruntfile',
            'test/Gruntfile-test.js',
            '--base',
            __dirname + '/../',
            'handlebars'
        ].join(' ');
        cp.exec(cmd, function(error, stdout, stderr) {

            // console.log(stdout);
            // console.log(stderr);

            if (error) {
              console.log(error);
            }

            // load compiled script into memory.
            GLOBAL.Handlebars = require('handlebars');
            script = require(__dirname + '/../tmp/handlebars-template.js');

            // execute without helper
            actual = script.JST['greeting-without-helper']({
                name: 'Name'
            });
            test.equal(actual, '<p>Hello Name</p>', 'Execute compiled template');

            // execute with internal helper
            actual = script.JST['greeting-with-helper']({
                name: 'Name'
            });
            test.equal(actual, '<p>Hello Name!</p>', 'Execute compiled template');

            // execute with external helper (Example: https://github.com/assemble/handlebars-helpers)
            Handlebars.registerHelper('external-view-name', function(name) {
                return 'external';
            });
            actual = script.JST['greeting-with-external-helper']({
                name: 'Name'
            });
            test.equal(actual, '<p>Hello external</p>', 'Execute compiled template');

            // execute with partial            
            actual = script.JST['greeting-with-partial']({
                name: 'Name'
            });
            test.equal(actual, '<p>Hello Name!</p>', 'Execute compiled template');

            test.done();
        });
    }
};
