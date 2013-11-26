if (!this["{{opts.namespace}}"]) { this["{{opts.namespace}}"] = {}; }

{{#each helpers}}
	{{{.}}}
{{/each}}

{{#each templates}}
	{{{.}}}
{{/each}}