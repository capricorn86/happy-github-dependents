import FS from "fs";
import Path from "path";
import Chalk from "chalk";
import { getCSVOutput, getHTMLOutput, getMarkdownOutput } from "./output.js";
import { getDependents } from "./browser.js";

export async function build(
	url: string,
	type: "markdown" | "html" | "csv" | null,
	output: string | null,
): Promise<void> {
	console.log(Chalk.bold(Chalk.blue("Fetching dependents...\n")));

	const dependents = await getDependents(url);

	dependents.sort((a, b) => b.stars - a.stars);

	switch (type) {
		case "markdown":
			await FS.promises.writeFile(
				Path.resolve(output || "./dependents.md"),
				getMarkdownOutput(dependents),
			);
			break;
		case "csv":
			await FS.promises.writeFile(
				Path.resolve(output || "./dependents.csv"),
				getCSVOutput(dependents),
			);
			break;
		case "html":
		default:
			await FS.promises.writeFile(
				Path.resolve(output || "./dependents.html"),
				getHTMLOutput(dependents),
			);
	}

	console.log(Chalk.bold(Chalk.green("\nDone!\n")));
}
