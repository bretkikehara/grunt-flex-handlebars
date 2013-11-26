# grunt-handlebars-template v0.0.1

> Precompile Handlebars templates to JST file.



## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-handlebars-template --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-handlebars-template');
```

*This plugin was designed to work with Grunt 0.4.x. If you're still using grunt v0.3.x it's strongly recommended that [you upgrade](http://gruntjs.com/upgrading-from-0.3-to-0.4), but in case you can't please use [v0.3.3](https://github.com/gruntjs/grunt-handlebars-template/tree/grunt-0.3-stable).*



## Handlebars task
_Run this task with the `grunt handlebars` command._

Task targets, files and options may be specified according to the grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide.
### Options

#### separator
Type: `String`  
Default: `linefeed + linefeed`

Concatenated files will be joined on this string.

#### helperPattern
Type: `Regular Express`
Default: /^.+\/helper-(.+)\.hbs/i

#### partialPattern
Type: `Regular Express`
Default: /^.+\/partial-(.+)\.hbs/i

#### templatePattern
Type: `Regular Express`
Default: /^.+\/template-(.+)\.hbs/i

#### opts
Type: `Object`
Default: 

Options that will be passed to the underlying Handlebars template. For example, namespace can be called using {{opts.namespace}} in the generator templates.

### Usage Examples

```js
handlebars: {
  compile: {
    options: {
      namespace: "JST"
    },
    files: {
      "path/to/result.js": "path/to/source.hbs",
      "path/to/another.js": ["path/to/sources/*.hbs", "path/to/more/*.hbs"]
    }
  }
}
```


## Release History

 * 2013-11-26   v0.0.2   First stable code to create templates.
 * 2013-11-21   v0.0.1   Refactored from grunt-contrib-handlebars into individual repo.

---


## Original Source

Author: [Tim Branyen](http://tbranyen.com)

Source for the original code can be found at [https://github.com/gruntjs/grunt-contrib-handlebars](https://github.com/gruntjs/grunt-contrib-handlebars).