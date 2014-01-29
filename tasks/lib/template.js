var fs = require('fs'),
    Handlebars = require('handlebars');

module.exports = {
    initTemplate: function(filepath) {
        var file = filepath,
            readOptions = {
                encoding: 'utf-8'
            },
            content = fs.readFileSync(file, readOptions);

        // create template handler.
        if (!content) {
            return null;
        }

        return Handlebars.compile(Handlebars.parse(content));
    },
    get: function(opts) {
        Handlebars.registerHelper('helper-helper-name', function(filepath) {
            var path = opts['helper-helper-name'].call(opts, filepath);
            return opts.createPackage.call(opts, path);
        });
        Handlebars.registerHelper('helper-partial-name', function(filepath) {
            var path = opts['helper-partial-name'].call(opts, filepath);
            return opts.createPackage.call(opts, path);
        });
        Handlebars.registerHelper('helper-template-name', function(filepath) {
            var path = opts['helper-template-name'].call(opts, filepath);
            return opts.createPackage.call(opts, path);
        });

        return {
            helper: this.initTemplate(opts.helperFile),
            partial: this.initTemplate(opts.partialFile),
            template: this.initTemplate(opts.templateFile),
            wrapper: this.initTemplate(opts.wrapperFile)
        };
    }
};