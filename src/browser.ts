import { Browser, IBrowserPage } from "happy-dom";
import Chalk from "chalk";
import { Dependent } from "./types.js";

export async function getDependents(url: string): Promise<Dependent[]> {
	const browser = new Browser();
	const page = browser.newPage();

	let dependents: Dependent[] = [];
	let nextPageUrl: string | null = getDependentsURL(url);

	while (nextPageUrl) {
		try {
			await page.goto(nextPageUrl);
		} catch (error) {
			// Sometimes GitHub rate limits requests, so we wait and retry
			console.error(Chalk.red(error));
			console.log(
				Chalk.yellow("\nWaiting 5 seconds before retrying...\n"),
			);
			await sleep(5000);
			continue;
		}
		dependents = dependents.concat(getPageDependents(page));
		nextPageUrl = getNextPageUrl(page);
	}

	return dependents;
}

function getNextPageUrl(page: IBrowserPage): string | null {
	const document = page.mainFrame.document;
	const links = document.querySelectorAll(".paginate-container a");
	for (const link of links) {
		if (link.textContent?.trim() === "Next") {
			return link.getAttribute("href") || null;
		}
	}
	return null;
}

function sleep(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

function getDependentsURL(url: string): string {
	const urlObject = new URL(url);
	if (
		urlObject.pathname.endsWith("/network/dependents") ||
		urlObject.pathname.endsWith("/network/dependents/")
	) {
		return url;
	}
	if (urlObject.pathname.endsWith("/")) {
		urlObject.pathname += "network/dependents";
	} else {
		urlObject.pathname += "/network/dependents";
	}
	return urlObject.toString();
}

function getPageDependents(page: IBrowserPage): Dependent[] {
	const dependents: Dependent[] = [];
	const document = page.mainFrame.document;

	const dependentsElement = document.getElementById("dependents");
	const rowElements = dependentsElement?.querySelectorAll(".Box-row") || [];

	for (const rowElement of rowElements) {
		const avatarUrl = rowElement.querySelector("img")?.src || "";
		const user =
			rowElement
				.querySelector(
					'a[data-hovercard-type="user"], a[data-hovercard-type="organization"]',
				)
				?.textContent.trim() || "";
		const repo =
			rowElement
				.querySelector('a[data-hovercard-type="repository"]')
				?.textContent.trim() || "";
		const stars = parseInt(
			rowElement
				.querySelector("svg.octicon-star")!
				.parentElement?.textContent.trim()
				.replace(",", "") || "0",
			10,
		);

		console.log(Chalk.gray(` • ${user}/${repo}: ${stars} stars`));

		dependents.push({
			avatarUrl,
			user,
			repo,
			stars,
		});
	}

	return dependents;
}
