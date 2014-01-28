/*
 * grunt-handlebars-template
 * http://gruntjs.com/
 *
 * Copyright (c) 2013 Bret K. Ikehara
 * Licensed under the MIT license.
 */

var Handlebars = require('handlebars'),
    grunt = require('grunt'),
    fs = require('fs'),
    REGEX_TEMPLATE_PATTERN = /^.*\/template[-\\\/](.+)\.(hbs|handlebars|js|html)/i,
    REGEX_PARTIAL_PATTERN = /^.*\/partial[-\\\/](.+)\.(hbs|handlebars|js)/i,
    REGEX_HELPER_PATTERN = /^.*\/helper[-\\\/](.+)\.(hbs|handlebars|js)/i,
    readOptions = {
        encoding: 'utf-8'
    };

var libhandlebars = {
    getDefaultOptions: function(options) {
        var defaultOptions = {
            separator: grunt.util.linefeed + grunt.util.linefeed,
            templatePattern: REGEX_TEMPLATE_PATTERN,
            partialPattern: REGEX_PARTIAL_PATTERN,
            helperPattern: REGEX_HELPER_PATTERN,
            'helper-template-name': function(filepath) {
                return filepath.replace(this.templatePattern, "$1");
            },
            'helper-helper-name': function(filepath) {
                return filepath.replace(this.helperPattern, "$1");
            },
            'helper-partial-name': function(name) {
                return name;
            },
            opts: {
                namespace: 'JST'
            }
        };

        for (var key in options) {
            if (options.hasOwnProperty(key)) {
                if (Object.prototype.toString.call(options[key]) === '[object Object]') {
                    for (var key2 in options[key]) {
                        if (options[key].hasOwnProperty(key2)) {
                            defaultOptions[key][key2] = options[key][key2];
                        }
                    }
                }
                else {
                    defaultOptions[key] = options[key];
                }
            }
        }

        return defaultOptions;
    },
    init: function(options) {
        var opts = libhandlebars.getDefaultOptions(options);

        Handlebars.registerHelper('helper-helper-name', function(filepath) {
            return opts['helper-helper-name'].call(opts, filepath);
        });
        Handlebars.registerHelper('helper-partial-name', function(filepath) {
            return opts['helper-partial-name'].call(opts, filepath);
        });
        Handlebars.registerHelper('helper-template-name', function(filepath) {
            return opts['helper-template-name'].call(opts, filepath);
        });

        // create the helpers
        this.precompileHelper = this.initTemplate(opts.helperFile, __dirname + '/template/helper.js');
        this.precompilePartial = this.initTemplate(opts.partialFile, __dirname + '/template/partial.js');
        this.precompileTemplate = this.initTemplate(opts.templateFile, __dirname + '/template/template.js');
        this.precompileWrapper = this.initTemplate(opts.wrapperFile, __dirname + '/template/wrapper.js');

        return this;
    },
    isInit: function() {
        return !!(this.createTemplateFile);
    },
    initTemplate: function(filepath,  defaultFile) {
        var file = filepath || defaultFile,
            content = fs.readFileSync(file, readOptions);

        // create template handler.
        if (!content) {
            content = fs.readFileSync(defaultFile, readOptions);
        }

        return Handlebars.compile(Handlebars.parse(content));
    },
    patternFilter: function(pattern) {
        return function(filepath) {
            // Remove nonexistent files (it's up to you to filter or warn here).
            if (pattern && !pattern.test(filepath)) {
                return false;
            }
            else if (!grunt.file.exists(filepath)) {
                grunt.log.warn('Source file "' + filepath + '" not found.');
                return false;
            }

            return true;
        };
    }
};

module.exports = libhandlebars;