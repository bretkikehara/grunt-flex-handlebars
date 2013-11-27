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
    REGEX_TEMPLATE_PATTERN = /^.+\/template-(.+)\.hbs/i,
    REGEX_PARTIAL_PATTERN = /^.+\/partial-(.+)\.hbs/i,
    REGEX_HELPER_PATTERN = /^.+\/helper-(.+)\.hbs/i,
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
            'helper-template-name': function() {
                var pattern = this.templatePattern;
                return function(filepath) {
                    return filepath.replace(pattern, "$1");
                }
            },
            'helper-helper-name': function() {
                var pattern = this.helperPattern;
                return function(filepath) {
                    return filepath.replace(pattern, "$1");
                }
            },
            'helper-partial-name': function() {
                var pattern = this.partialPattern;
                return function(filepath) {
                    return filepath.replace(pattern, "$1");
                }
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
    },
    init: function(options) {
        var opts = libhandlebars.getDefaultOptions(options);

        Handlebars.registerHelper('helper-helper-name', opts['helper-helper-name']());
        Handlebars.registerHelper('helper-partial-name', opts['helper-partial-name']());
        Handlebars.registerHelper('helper-template-name', opts['helper-template-name']());

        this.initCreateHelperFile(opts);
        this.initCreatePartialFile(opts);
        this.initCreateTemplateFile(opts);
        this.initCreateWrapperFile(opts);

        return this;
    },
    isInit: function() {
        return !!(this.createTemplateFile);
    },
    initCreateHelperFile: function(opts) {
        var defaultHelper = __dirname + '/template/helper.js',
            helperFile = opts.helperFile || defaultHelper,
            helperFileContent = fs.readFileSync(helperFile, readOptions);

        // create template handler.
        if (!helperFileContent) {
            helperFileContent = fs.readFileSync(defaultPartial, readOptions);
        }

        this.createHelperFile = Handlebars.compile(Handlebars.parse(helperFileContent));
    },
    initCreatePartialFile: function(opts) {
        var defaultPartial = __dirname + '/template/partial.js',
            partialFile = opts.partialFile || defaultPartial,
            partialFileContent = fs.readFileSync(partialFile, readOptions);

        // create template handler.
        if (!partialFileContent) {
            partialFileContent = fs.readFileSync(defaultPartial, readOptions);
        }

        this.createPartialFile = Handlebars.compile(Handlebars.parse(partialFileContent));
    },
    initCreateTemplateFile : function(opts) {
        var defaultTemplate = __dirname + '/template/template.js',
            templateFile = opts.templateFile || defaultTemplate,
            templateFileContent = fs.readFileSync(templateFile, readOptions);

        // create template handler.
        if (!templateFileContent) {
            templateFileContent = fs.readFileSync(defaultTemplate, readOptions);
        }

        this.createTemplateFile = Handlebars.compile(Handlebars.parse(templateFileContent));
    },
    initCreateWrapperFile : function(opts) {
        var defaultWrapper = __dirname + '/template/wrapper.js',
            wrapperFile = opts.wrapperFile || defaultWrapper,
            wrapperFileContent = fs.readFileSync(wrapperFile, readOptions);

        if (!wrapperFileContent) {
            wrapperFileContent = fs.readFileSync(defaultWrapper, readOptions);
        }

        this.createWrapperFile = Handlebars.compile(Handlebars.parse(wrapperFileContent));
    }
};

module.exports = libhandlebars;