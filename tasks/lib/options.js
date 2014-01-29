/*
 * grunt-handlebars-template
 * http://gruntjs.com/
 *
 * Copyright (c) 2013 Bret K. Ikehara
 * Licensed under the MIT license.
 */
var REGEX_TEMPLATE_PATTERN = /^.*\/template[-\\\/](.+)\.(hbs|handlebars|js|html)/i,
    REGEX_PARTIAL_PATTERN = /^.*\/partial[-\\\/](.+)\.(hbs|handlebars|js)/i,
    REGEX_HELPER_PATTERN = /^.*\/helper[-\\\/](.+)\.(hbs|handlebars|js)/i,
    REGEX_PATH_SEPARATOR_PATTERN = /[\\\/]/g;

module.exports = {
    get: function(userOpt) {
        return this.getOptions(userOpt || {}, this.getDefaultOptions());
    },
    getOptions: function (userOpt, defOpt) {
        var obj,
            key;
        if (Object.prototype.toString.call(defOpt) === '[object Object]') {
            obj = {};
            for (key in defOpt) {
                // console.log('key: ' + key);
                // console.log('user val: ' + userOpt[key]);
                // console.log('def val: ' + defOpt[key]);
                if (key !== 'opts') {
                    obj[key] = this.getOptions(userOpt[key], defOpt[key]);
                }
                else {
                    obj[key] = userOpt[key];
                }
            }

            return obj;
        }
        
        obj = (userOpt) ? userOpt : defOpt;
        // console.log('value: ' + obj);
        return obj;
    },
    getDefaultOptions: function() {
        var os = require('os');
        return {
            separator: os.EOL + os.EOL,
            templatePattern: REGEX_TEMPLATE_PATTERN,
            partialPattern: REGEX_PARTIAL_PATTERN,
            helperPattern: REGEX_HELPER_PATTERN,
            packagePattern: REGEX_PATH_SEPARATOR_PATTERN,
            packageSeparator: '.',
            'helper-template-name': function(filepath) {
                return filepath.replace(this.templatePattern, "$1");
            },
            'helper-helper-name': function(filepath) {
                return filepath.replace(this.helperPattern, "$1");
            },
            'helper-partial-name': function(name) {
                return name;
            },
            createPackage: function (filepath) {
                return filepath.replace(this.packagePattern, this.packageSeparator);
            },
            opts: {
                namespace: 'JST'
            },
            helperFile: __dirname + '/template/helper.js',
            partialFile: __dirname + '/template/partial.js',
            templateFile: __dirname + '/template/template.js',
            wrapperFile: __dirname + '/template/wrapper.js'
        };
    }   
};