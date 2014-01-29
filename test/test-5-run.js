exports.run = {
    writeDefaultFile: function(test) {
        var os = require('os'),
            cp = require('child_process'),
            cmd = [
                (os.platform() === 'win32' ? 'grunt.cmd' : 'grunt'),
                '--verbose',
                '--gruntfile',
                'test/Gruntfile-test.js',
                'handlebars'
            ].join(' ');

        test.expect(4);
        cp.exec(cmd, function(error, stdout, stderr) {

            console.log(stdout);
            console.log(stderr);

            if (error) {
              console.log(error);
            }

            // load compiled script into memory.
            GLOBAL.Handlebars = require('handlebars');
            script = require('./tmp/handlebars-template.js');

            // execute without helper
            actual = script.JST['greeting-without-helper']({
                name: 'Name'
            });
            test.equal(actual, '<p>Hello Name</p>', 'Execute compiled template');

            // execute with internal helper
            actual = script.JST['greeting-with-helper']({
                name: 'Name'
            });
            test.equal(actual, '<p>Hello Name!</p>', 'Execute compiled template');

            // execute with external helper (Example: https://github.com/assemble/handlebars-helpers)
            Handlebars.registerHelper('external-view-name', function(name) {
                return 'external';
            });
            actual = script.JST['greeting-with-external-helper']({
                name: 'Name'
            });
            test.equal(actual, '<p>Hello external</p>', 'Execute compiled template');

            // execute with partial            
            actual = script.JST['greeting-with-partial']({
                name: 'Name'
            });
            test.equal(actual, '<p>Hello Name!</p>', 'Execute compiled template');

            test.done();
        });
    }
};