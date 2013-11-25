/*
 * grunt-handlebars-template
 * http://gruntjs.com/
 *
 * Copyright (c) 2013 Bret K. Ikehara
 * Licensed under the MIT license.
 */

var Handlebars = require('handlebars'),
    fs = require('fs'),
    readOptions = {
        encoding: 'utf-8'
    };

module.exports = {
    init: function(options) {
        var opts = options || {
                // default values.
            };

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
    },
    compileTemplate : function(fileContent, compilerOptions) {
        if (this.isInit()) {
            this.init();
        }

        // Read and return the file's source.
        var fileTemplate = Handlebars.precompile(Handlebars.parse(fileContent), compilerOptions),
            data = {
                template: fileTemplate,
                opts: compilerOptions
            };

        return this.createTemplateFile(data);
    }
};