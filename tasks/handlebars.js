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
        libtemplate = require('./lib/template.js'),
        libfilter = require('./lib/filter.js'),
        Handlebars = require('handlebars');

    grunt.registerMultiTask(
        'handlebars',
        'Compile Handlebars templates and partials using Handlebars',
        function() {
            var options = liboptions.get(this.options()),
                compiler = libtemplate.get(options),
                filter = libfilter.get(grunt, compiler, options);

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
                        wrapperContent;

                    // sort the files
                    helperFiles = filter.pattern(file.src, options.helperPattern);
                    partialFiles = filter.pattern(file.src, options.partialPattern);
                    templateFiles = filter.pattern(file.src, options.templatePattern);

                    // precompile each file, then return all the precompiled content as one string
                    helperContent = helperFiles.map(filter.helper);
                    partialContent = partialFiles.map(filter.partial);
                    templateContent = templateFiles.map(filter.template);

                    // wrap the precompiled content
                    wrapperContent = compiler.wrapper({
                        helpers: helperContent,
                        partials: partialContent,
                        templates: templateContent,
                        opts: options.opts
                    });

                    // Write joined contents to destination filepath.
                    grunt.file.write(file.dest, wrapperContent);

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