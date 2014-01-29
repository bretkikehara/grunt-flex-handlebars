
module.exports = {
    get: function (grunt, options) {
        return {
            match: function (files, pattern) {
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
            }
        };
    }
};