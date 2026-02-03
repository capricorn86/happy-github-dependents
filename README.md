# About

Uses [Happy DOM](https://github.com/capricorn86/happy-dom) to scrape GitHub dependents pages for a Github repository and generate a report sorted by stars in various formats (HTML, Markdown, CSV).

This tool doesn't require any API keys as it uses the public GitHub web interface to get the data.

# Usage

```bash
npx happy-github-dependents --url=<repository_url>
```

or

```bash
npx happy-github-dependents --url=<repository_url> --type=<html|markdown|csv> --output=<output_file>
```

# Arguments

| Argument   | Description                                 | Default value        | Required |
| ---------- | ------------------------------------------- | -------------------- | -------- |
| `--url`    | URL of the GitHub repository                |                      | Yes      |
| `--type`   | Output format: `html`, `markdown`, or `csv` | `html`               | No       |
| `--output` | Output file path                            | `./dependents.{ext}` | No       |
