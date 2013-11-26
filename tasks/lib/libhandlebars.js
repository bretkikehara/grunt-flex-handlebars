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
    REGEX_FILE_NAME = /^.+\/([^\/]+)\..+$/i,
    readOptions = {
        encoding: 'utf-8'
    };

var libhandlebars = {
    getDefaultOptions: function() {
        return {
            separator: grunt.util.linefeed + grunt.util.linefeed,
            'helper-template-name': function(filepath) {
                return filepath.replace(REGEX_FILE_NAME, "$1");
            },
            opts: {
                namespace: 'JST'
            }
        };
    },
    init: function(options) {
        var opts = options || libhandlebars.getDefaultOptions();

        Handlebars.registerHelper('helper-template-name', opts['helper-template-name']);

        this.initCreateTemplateFile(opts);
        this.initCreateWrapperFile(opts);

        return this;
    },
    isInit: function() {
        return !!(this.createTemplateFile);
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