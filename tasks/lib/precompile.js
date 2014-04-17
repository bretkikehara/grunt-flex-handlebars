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
    get: function(grunt, options) {
        var helper,
            partial,
            template;

        Handlebars.registerHelper('helper-helper-name', function(filepath) {
            var path = options['helper-helper-name'].call(options, filepath);
            return options.createPackage.call(options, path);
        });
        Handlebars.registerHelper('helper-partial-name', function(filepath) {
            var path = options['helper-partial-name'].call(options, filepath);
            return options.createPackage.call(options, path);
        });
        Handlebars.registerHelper('helper-template-name', function(filepath) {
            var path = options['helper-template-name'].call(options, filepath);
            return options.createPackage.call(options, path);
        });

        // create the templates

        return {
            wrap: this.initTemplate(options.wrapperFile),
            precompileHelper: this.initTemplate(options.helperFile),
            precompilePartial: this.initTemplate(options.partialFile),
            precompileTemplate: this.initTemplate(options.templateFile),
            precompile: function (files, handlerType) {
                if (handlerType){
                    if (handlerType === 'helper') {
                        return files.map(function(filepath) {
                            var filecontent = grunt.file.read(filepath),
                                helper;

                            helper = this.precompileHelper({
                                filepath: filepath,
                                helper: filecontent,
                                opts: options.opts
                            });

                            return helper;
                        }, this);
                    }
                    else if (handlerType === 'partial') {
                        return files.map(function(filepath) {
                            var partialArray,
                                out;

                            if (options.allTemplatesArePartials) {
                                return this.precompilePartial({
                                    filepath: filepath,
                                    opts: options.opts 
                                });
                            }
                            else {
                                try {
                                    partialArray = eval(grunt.file.read(filepath, {
                                        encoding: 'utf-8'
                                    }));
                                    out = [];
                                    partialArray.forEach(function(partialName) {
                                        var data = this.precompilePartial({
                                            filepath: filepath,
                                            name: partialName,
                                            opts: options.opts 
                                        });
                                        out.push(data);
                                    }, this);

                                    return out.join('\n');
                                }
                                catch(e) {
                                    grunt.log.warn('Failed to parse the partial file!\nPlease ensure the partial is in an array format.');
                                    grunt.log.warn(e);
                                }
                            }
                        }, this);
                    }
                    else if (handlerType === 'template') {
                        return files.map(function(filepath) {
                            var filecontent = grunt.file.read(filepath),
                                precompiled = Handlebars.precompile(Handlebars.parse(filecontent)),
                                template;

                            template = this.precompileTemplate({
                                filepath: filepath,
                                template: precompiled,
                                opts: options.opts
                            });

                            return template;
                        }, this);
                    }
                }

                return null;
            }
        };
    }
};