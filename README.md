# About

Uses [Happy DOM](https://github.com/capricorn86/happy-dom) to scrape GitHub dependents pages for a Github repository and generate a report sorted by stars in various formats (HTML, Markdown, JSON, CSV).

This tool doesn't require any API keys as it uses the public GitHub web interface to get the data.

<a href="https://www.npmjs.com/package/happy-github-dependents">
    <img alt="Published on NPM" src="https://img.shields.io/npm/v/happy-github-dependents.svg">
</a>

# Usage

## Command Line

### Example

```bash
npx happy-github-dependents --url=<repository_url>
```

or

```bash
npx happy-github-dependents --url=<repository_url> --type=<html|markdown|json|csv> --output=<output_file>
```

### Arguments

| Argument   | Description                                         | Default value        | Required |
| ---------- | --------------------------------------------------- | -------------------- | -------- |
| `--url`    | URL of the GitHub repository                        |                      | Yes      |
| `--type`   | Output format: `html`, `markdown`, `json`, or `csv` | `html`               | No       |
| `--output` | Output file path                                    | `./dependents.{ext}` | No       |

## JavaScript

### Example

```typescript
import { getDependents } from "happy-github-dependents";

const dependents = await getDependents(
	"https://github.com/capricorn86/happy-dom",
);

console.log(dependents);
```
