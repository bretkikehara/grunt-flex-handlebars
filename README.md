# grunt-flex-handlebars v0.1.1

> Precompile Handlebars templates to JST file.



## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-flex-handlebars --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-flex-handlebars');
```

*This plugin was designed to work with Grunt 0.4.x. If you're still using grunt v0.3.x it's strongly recommended that [you upgrade](http://gruntjs.com/upgrading-from-0.3-to-0.4), but in case you can't please use [v0.3.3](https://github.com/gruntjs/grunt-flex-handlebars/tree/grunt-0.3-stable).*


## Why is this tool different from other handlebars compiler?

This uses Handlebars to precompile Handlebars templates. O_o o_O

Fundamentally, the grunt-contrib-handlebars was flawed because any new option would need to be added to the code. Not only would this continue to increase the code complexity, but it would mean that users are left to wait until a certain option was added to the main plugin. In the end, the user may need to compile their own version just to add missing functionality.

This tool tries to eradicate the need to continually upgrade the tool when a new option is needed by controlling the precompiled output by using Handlebar templates. This tool precompiles the templates, then passes on the neccessary values to a template to create the precompiled file.

## Handlebars task
_Run this task with the `grunt handlebars` command._

Task targets, files and options may be specified according to the grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide.
### Options

#### separator
Type: `String`  
Default: `linefeed + linefeed`

Concatenated files will be joined on this string. Same value as Node.JS os.EOL value.

#### helperPattern
Type: `Regular Express`
Default: `/^.+\/helper[-\\\/](.+)\.(hbs|handlebars|js)/i`

This pattern categorizes files based on the file paths provides in the `files` grunt config. Any file matching this pattern will be assumed to be a helper.

The default `helper-helper-name` helper function will use the `(.+)` value as the precompiled helper's name.

#### partialPattern
Type: `Regular Express`
Default: `/^.+\/partial[-\\\/](.+)\.(hbs|handlebars|js)/i`

The default `helper-partial-name` helper function will use the `(.+)` value as the precompiled partial's name.

#### templatePattern
Type: `Regular Express`
Default: `/^.+\/template[-\\\/](.+)\.(hbs|handlebars|js|html)/i`

The default `helper-template-name` helper function will use the `(.+)` value as the precompiled template's name.

#### helper-helper-name
Type: `Function`
Default: 1st captured value defined in the `helperPattern` value.

Defines the helper name.

#### helper-partial-name
Type: `Function`
Default: 1st captured value defined in the `partialPattern` value.

Defines the partial name.

#### helper-template-name
Type: `Function`
Default: 1st captured value defined in the `templatePattern` value.

Defines the template name.

#### helperFile
Type: `String`
Default: `task/lib/template/helper.js`

Handlebars template that will render the helpers.

###### Helper Reserved Variables:

	* helper
	* filepath
	* opts

###### Here is the default helper template:

	Handlebars.registerHelper("{{helper-helper-name filepath}}", {{{helper}}});

#### partialFile
Type: `String`
Default: `task/lib/template/partial.js`

Handlebars template that will render the partials.

###### Partial Reserved Variables:

	* name
	* opts

###### Here is the default partial template:

	Handlebars.registerPartial("{{helper-partial-name name}}", this["{{opts.namespace}}"]["{{name}}"]);

#### templateFile
Type: `String`
Default: `task/lib/template/template.js`

Handlebars template that will render the templates.

###### Template Reserved Variables:

	* template
	* filepath
	* opts

###### Here is the default template template:

	this["{{opts.namespace}}"]["{{helper-template-name filepath}}"] = Handlebars.template({{{template}}});

#### wrapperFile
Type: `String`
Default: `task/lib/template/wrapper.js`

Handlebars template that will render the wrapper.

###### Wrapper Reserved Variables:

	* helpers
	* templates
	* partials
	* opts

###### Here is the default wrapper template:

	if (!this["{{opts.namespace}}"]) { this["{{opts.namespace}}"] = {}; }

	// START helpers
	{{#each helpers}}
		{{{.}}}
	{{/each}}
	// END helpers

	// START templates
	{{#each templates}}
		{{{.}}}
	{{/each}}
	// END templates


	// START partials
	{{#each partials}}
		{{{.}}}
	{{/each}}
	// END partials

#### opts
Type: `Object`
Default: 

`opts` are options that will help precompile the Handlebars template. These are user defined variables that will be passed onto the templating. As such, there are no official recognized values.

###### Default template attribute:

	* namespace

## Release History
 
 * 2013-01-28   v0.2.0   Refactored the code to be more modular.
 * 2014-01-28   v0.1.3   Added support for better file handling.
 * 2013-12-02   v0.1.1   Fixed letter-case for Handlebars library.
 * 2013-11-28   v0.1.0   Bumped version to indicate public release.
 * 2013-11-27   v0.0.6   Fixed external partial support.
 * 2013-11-26   v0.0.4   Fixed support for the external templates.
 * 2013-11-26   v0.0.3   Added partial and helper support.
 * 2013-11-26   v0.0.2   First stable code to create templates.
 * 2013-11-21   v0.0.1   Refactored from grunt-contrib-handlebars into individual repo.

---


## Original Source

Author: [Tim Branyen](http://tbranyen.com)

Source for the original code can be found at [https://github.com/gruntjs/grunt-contrib-handlebars](https://github.com/gruntjs/grunt-contrib-handlebars).