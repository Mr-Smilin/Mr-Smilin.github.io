const fs = require("fs");
const path = require("path");
const moment = require("moment");

hexo.extend.generator.register("generate_inspirations", function (locals) {
	const sourceDir = path.join(hexo.source_dir, "_inspirations");
	const outputFile = path.join(hexo.source_dir, "inspiration/index.md");

	const files = fs
		.readdirSync(sourceDir)
		.filter((file) => file.endsWith(".md"));

	let inspirations = [];

	files.forEach((file) => {
		const content = fs.readFileSync(path.join(sourceDir, file), "utf8");
		const match = content.match(/---\s*([\s\S]*?)---\s*([\s\S]*)/);

		if (match) {
			const metaBlock = match[1];
			const body = match[2].trim();
			const dateMatch = metaBlock.match(/date:\s*(\d{4}-\d{2}-\d{2})/);

			if (dateMatch) {
				inspirations.push({
					date: dateMatch[1],
					content: body,
				});
			}
		}
	});

	// 依照日期排序（新到舊）
	inspirations.sort((a, b) => new Date(b.date) - new Date(a.date));

	const indexContent =
		`---\ntitle: 靈感\nlayout: page\n---\n\n` +
		'<div class="inspiration-list">\n' +
		inspirations
			.map(
				(item) =>
					`<div class="inspiration-card">
				<div class="inspiration-card-inner">
      <div class="inspiration-date">${item.date}</div>
      <div class="inspiration-content">${item.content.replace(
				/\n/g,
				"<br>"
			)}</div>
		</div>
    </div>`
			)
			.join("\n") +
		"\n</div>";

	fs.writeFileSync(outputFile, indexContent);

	return []; // 這是 generator 的需求（不回傳任何 page）
});

hexo.extend.filter.register("inspiration_date_filter", function (text) {
	return moment(text).format("YYYY-MM-DD");
});
