YUI.add("{{opts.module-name}}", function(Y) {
{{#each templates}}
	{{{.}}}
{{/each}}
}, "{{opts.version}}", {
	requires: [ "handlebars-base" ]
});