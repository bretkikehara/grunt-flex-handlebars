/*
 * grunt-handlebars-template
 * http://gruntjs.com/
 *
 * Copyright (c) 2013 Bret K. Ikehara
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {
    "use strict";

    var libhandlebars = require('./lib/libhandlebars.js'),
        Handlebars = require('Handlebars'),
        handleFilter = function(filepath) {
            // Remove nonexistent files (it's up to you to filter or warn here).
            if (!grunt.file.exists(filepath)) {
                grunt.log.warn('Source file "' + filepath + '" not found.');
                return false;
            }

            return true;
        };

    grunt.registerMultiTask(
        'handlebars',
        'Compile Handlebars templates and partials using Handlebars',
        function() {

            var options = this.options(libhandlebars.getDefaultOptions()),
                done = this.async();
            libhandlebars.init(options);

            grunt.verbose.writeflags(options, 'Options');

            /**
            * Run the program.
            */
            this.files.forEach(function(file) {
                var files = file.src.filter(handleFilter),
                    wrapperObj = {
                        templates: files.map(function(filepath) {
                            var filecontent = grunt.file.read(filepath),
                                precompiled = Handlebars.precompile(Handlebars.parse(filecontent)),
                                template;

                            template = libhandlebars.createTemplateFile({
                                filepath: filepath,
                                template: precompiled,
                                opts: options.opts
                            });

                            return template;
                        }),
                        opts: options.opts
                    };

                grunt.verbose.writeln(wrapperObj.templates.join(''));

                // Write joined contents to destination filepath.

                grunt.file.write(file.dest, libhandlebars.createWrapperFile(wrapperObj));

                // Print a success message.
                grunt.log.writeln('File "' + file.dest + '" created.');
            }, this);

            done();
        }
    );
};