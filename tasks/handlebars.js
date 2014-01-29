/*
 * grunt-handlebars-template
 * http://gruntjs.com/
 *
 * Copyright (c) 2013 Bret K. Ikehara
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {
    "use strict";

    var liboptions = require('./lib/options.js'),
        libprecompile = require('./lib/precompile.js'),
        libfilter = require('./lib/filter.js'),
        Handlebars = require('handlebars');

    grunt.registerMultiTask(
        'handlebars',
        'Compile Handlebars templates and partials using Handlebars',
        function() {
            var options = liboptions.get(this.options()),
                precompiler = libprecompile.get(grunt, options),
                filter = libfilter.get(grunt, options);

            grunt.verbose.writeflags(options, 'Options');

            /**
            * Run the program.
            */
            if (this.files.length > 0) {
                this.files.forEach(function(file) {
                    var helperFiles,
                        helperContent,
                        partialFiles,
                        partialContent,
                        templateFiles,
                        templateContent,
                        precompiledContent;

                    // sort the files
                    helperFiles = filter.match(file.src, options.helperPattern);
                    partialFiles = filter.match(file.src, options.partialPattern);
                    templateFiles = filter.match(file.src, options.templatePattern);

                    // precompile each file, then return all the precompiled content as one string
                    helperContent = precompiler.precompile(helperFiles, 'helper');
                    partialContent = precompiler.precompile(partialFiles, 'partial');
                    templateContent = precompiler.precompile(templateFiles, 'template');

                    // wrap the precompiled content
                    precompiledContent = precompiler.wrap({
                        helpers: helperContent,
                        partials: partialContent,
                        templates: templateContent,
                        opts: options.opts
                    });

                    // Write joined contents to destination filepath.
                    grunt.file.write(file.dest, precompiledContent);

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