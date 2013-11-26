/*
 * grunt-handlebars-template
 * http://gruntjs.com/
 *
 * Copyright (c) 2013 Bret K. Ikehara
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {
    "use strict";

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

    grunt.loadTasks(__dirname + '/../tasks');

    grunt.registerTask('default', [ 'handlebars' ]);
};