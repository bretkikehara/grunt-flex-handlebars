if (!this["{{opts.namespace}}"]) { this["{{opts.namespace}}"] = {}; }

{{#each templates}}
	{{{.}}}
{{/each}}