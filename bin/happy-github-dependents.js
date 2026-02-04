#!/bin/env node
"use strict";

import { build } from "../lib/index.js";

function getArguments() {
	const args = {
		url: null,
		type: null,
		output: null,
	};

	for (const arg of process.argv) {
		if (arg.startsWith("--url=")) {
			args.url = arg.split("=")[1];
		} else if (arg.startsWith("--type=")) {
			args.type = arg.split("=")[1];
		} else if (arg.startsWith("--output=")) {
			args.output = arg.split("=")[1];
		}
	}

	return args;
}

const args = getArguments();

if (!args.url) {
	throw new Error('Invalid arguments. Expected "--url={url}".');
}

if (
	args.type !== null &&
	!["markdown", "html", "csv", "json"].includes(args.type)
) {
	throw new Error(
		'Invalid arguments. Expected "--type={markdown|html|csv}".',
	);
}

build(args.url, args.type, args.output);
