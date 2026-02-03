import { Dependent } from "./types.js";

export function getMarkdownOutput(dependents: Dependent[]): string {
	return `
    |Avatar | User | Repository | Stars |
    |-------|------|------------|-------|
    ${dependents
		.map(
			(dependent) =>
				`| ![image](${dependent.avatarUrl}) | [${dependent.user}](https://github.com/${dependent.user}/) | [${dependent.repo}](https://github.com/${dependent.user}/${dependent.repo}/) | ⭐ **${withThousandSeparator(dependent.stars)}** |`,
		)
		.join("\n")}
    `;
}

export function getHTMLOutput(dependents: Dependent[]): string {
	return `<table border="0" cellpadding="0" cellspacing="0">
        <thead>
            <tr>
                <th>Avatar</th>
                <th>User</th>
                <th>Repository</th>
                <th>Stars</th>
            </tr>
        </thead>
        <tbody>
            ${dependents
				.map(
					(dependent) => `
                <tr>
                    <td><img src="${dependent.avatarUrl}" width="50" height="50" /></td>
                    <td><a href="https://github.com/${dependent.user}/">${dependent.user}</a></td>
                    <td><a href="https://github.com/${dependent.user}/${dependent.repo}/">${dependent.repo}</a></td>
                    <td><b>⭐ ${withThousandSeparator(dependent.stars)}</b></td>
                </tr>
            `,
				)
				.join("")}
        </tbody>
    </table>
    <style>
        html,
        body {
            font-family:
                apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans",
                Helvetica, Arial, sans-serif;
            margin: 10px;
        }

        table {
            border-collapse: collapse;
            width: 100%;
        }

        th,
        td {
            text-align: left;
            padding: 8px;
        }

        tr:nth-child(even) {
            background-color: #f9f9f9;
        }

        th {
            background-color: #f2f2f2;
        }

        a {
            text-decoration: none;
            color: rgb(9, 105, 218);
        }
    </style>
    `;
}

function withThousandSeparator(stars: number): string {
	return String(stars).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function getCSVOutput(dependents: Dependent[]): string {
	const header = "Avatar,User,Repository,Stars\n";
	const rows = dependents
		.map(
			(dependent) =>
				`"${dependent.avatarUrl}","${dependent.user}","${dependent.repo}",${dependent.stars}`,
		)
		.join("\n");
	return header + rows;
}
