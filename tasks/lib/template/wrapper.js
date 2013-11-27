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