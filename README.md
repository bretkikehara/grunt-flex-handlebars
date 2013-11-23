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

#### partialRegex
Type: `Regexp`  
Default: `/^_/`

This option accepts a regex that defines the prefix character that is used to identify Handlebars partial files.

``` javascript
// assumes partial files would be prefixed with "par_" ie: "par_header.hbs"
options: {
  partialRegex: /^par_/
}
```

#### partialsPathRegex
Type: `Regexp`  
Default: `/./`

This option accepts a regex that defines the path to a directory of Handlebars partials files. The example below shows how to mark every file in a specific directory as a partial.

``` javascript
options: {
  partialRegex: /.*/,
  partialsPathRegex: /\/partials\//
}
```

#### compilerOptions
Type `Object`  
Default: `{}`

This option allows you to specify a hash of options which will be passed directly to the Handlebars compiler.

``` javascript
options: {
  compilerOptions: {
    knownHelpers: {
      "my-helper": true,
      "another-helper": true
    },
    knownHelpersOnly: true
  }
}
```

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


 * 2013-11-21   v0.0.1   Refactored from grunt-contrib-handlebars into individual repo.

---


## Original Source

Author: [Tim Branyen](http://tbranyen.com)

Source for the original code ca be found at [https://github.com/gruntjs/grunt-contrib-handlebars](https://github.com/gruntjs/grunt-contrib-handlebars).