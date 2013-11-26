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
        Handlebars = require('Handlebars');

    grunt.registerMultiTask(
        'handlebars',
        'Compile Handlebars templates and partials using Handlebars',
        function() {

            var options = libhandlebars.getDefaultOptions(this.options());
            libhandlebars.init(options);

            grunt.verbose.writeflags(options, 'Options');

            /**
            * Run the program.
            */
            if (this.files.length > 0) {
                this.files.forEach(function(file) {
                    var helperFiles = file.src.filter(libhandlebars.patternFilter(options.helperPattern)),
                        templateFiles = file.src.filter(libhandlebars.patternFilter(options.templatePattern)),
                        templateOptions = {
                            helpers: helperFiles.map(function(filepath) {
                                var filecontent = grunt.file.read(filepath),
                                    helper;

                                helper = libhandlebars.createHelperFile({
                                    filepath: filepath,
                                    helper: filecontent,
                                    opts: options.opts
                                });

                                return helper;
                            }),
                            templates: templateFiles.map(function(filepath) {
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

                    // Write joined contents to destination filepath.
                    grunt.file.write(file.dest, libhandlebars.createWrapperFile(templateOptions));

                    // Print a success message.
                    grunt.log.writeln('File "' + file.dest + '" created.');
                }, this);
            }
            else {
                grunt.verbose.writeln('Failed to find files');
            }
        }
    );
};