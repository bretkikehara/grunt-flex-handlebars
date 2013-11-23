/*
 * grunt-handlebars-template
 * http://gruntjs.com/
 *
 * Copyright (c) 2013 Bret K. Ikehara
 * Licensed under the MIT license.
 */

var Handlebars = require('handlebars'),
    fs = require('fs');

module.exports = {
    init: function(options) {
        var opts = options || {
                // default values.
            };

        this.initCreateTemplateFile(opts);
        this.isInit = true;
    },
    isInit: function() {
        return !!(this.createTemplateFile);
    },
    initCreateTemplateFile : function(opts) {
        var templateFile = opts.templateFile ||  __dirname + '/template/template.js',
            templateFileContent = fs.readFileSync(templateFile, {
                encoding: 'utf-8'
            });

        // create template handler.
        if (!templateFileContent) {
            templateFileContent = '{{{template}}}';
        }

        this.createTemplateFile = Handlebars.compile(Handlebars.parse(templateFileContent));
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