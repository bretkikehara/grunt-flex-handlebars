
module.exports = {
    get: function (grunt, compiler, options) {
        return {
            pattern: function (files, pattern) {
                return files.filter(function(filepath) {
                    // Remove nonexistent files (it's up to you to filter or warn here).
                    if (pattern && !pattern.test(filepath)) {
                        return false;
                    }
                    else if (!grunt.file.exists(filepath)) {
                        grunt.log.warn('Source file "' + filepath + '" not found.');
                        return false;
                    }

                    return true;
                });
            },
            helper: function(filepath) {
                var filecontent = grunt.file.read(filepath),
                    helper;

                helper = compiler.helper({
                    filepath: filepath,
                    helper: filecontent,
                    opts: options.opts
                });

                return helper;
            },
            partial: function(filepath) {
                var partialArray = eval(grunt.file.read(filepath, {
                        encoding: 'utf-8'
                    })),
                    out = [];

                partialArray.forEach(function(partialName) {
                    var data = compiler.partial({
                        name: partialName,
                        opts: options.opts 
                    });
                    out.push(data);
                });

                return out.join('\n');
            },
            template: function(filepath) {
                var filecontent = grunt.file.read(filepath),
                    precompiled = Handlebars.precompile(Handlebars.parse(filecontent)),
                    template;

                template = compiler.template({
                    filepath: filepath,
                    template: precompiled,
                    opts: options.opts
                });

                return template;
            }
        };
    }
};