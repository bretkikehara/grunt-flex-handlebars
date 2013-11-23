/*
 * grunt-handlebars-template
 * http://gruntjs.com/
 *
 * Copyright (c) 2013 Bret K. Ikehara
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {
    "use strict";

    var libhandlebars = require('./lib/handlebars-template.js'),
        defaultOptions = {
            separator: grunt.util.linefeed + grunt.util.linefeed,
            compilerOptions: {
                namespace: 'JST'     
            }
        };

    grunt.registerMultiTask(
        'handlebars',
        'Compile Handlebars templates and partials using Handlebars',
        function() {

            /**
            * Define user options.
            */
            var options = this.options(defaultOptions);
            libhandlebars.init(options);

            grunt.verbose.writeflags(options, 'Options');

            /**
            * Run the program.
            */
            this.files.forEach(function(file) {
                var files = file.src.filter(function(filepath) {
                        // Remove nonexistent files (it's up to you to filter or warn here).
                        if (!grunt.file.exists(filepath)) {
                            grunt.log.warn('Source file "' + filepath + '" not found.');
                            return false;
                        }

                        return true;
                    }),
                    output = files.map(function(filepath) {
                        var filecontent = grunt.file.read(filepath);
                        libhandlebars.compileTemplate(filecontent, options.compilerOptions);
                    }).join('\n');

                // Write joined contents to destination filepath.
                grunt.file.write(file.dest, output.join(grunt.util.normalizelf(options.separator)));

                // Print a success message.
                grunt.log.writeln('File "' + file.dest + '" created.');
            }, this);
        }
    );
};