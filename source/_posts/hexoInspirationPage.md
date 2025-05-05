---
toc: true
title: 網站新增靈感頁面心得
date: 2025-05-05 12:00:00
tags: [hexo, icarus, 日記]
categories:
  - [hexo主題分享]
---

![title](/img/post/hexoInspirationPage/title.png)

寫網誌其實是一件很麻煩的事情  
如果希望網站的文章保持相同的分類，就會更加麻煩

有時想寫點日記，或是分享生活上遇到的瑣事  
「只打一句話會不會太短了？」「感覺這不適合分享在網站上欸..」  
加上寫網誌本身並不是不需要消耗時間，一來一往也就不了了之

「如果有個頁面能專門放一些瑣碎的事情就好了」

忽然想到這點的我，幫網誌加了個『靈感』頁面———

<br>

<!-- more -->

# 目前實現

他可以實現的效果目前有

- [x] 方便記錄，取代網誌這類相對嚴謹的形式
- [x] 根據日期在首頁順序刷出
- [x] 從首頁點擊跳轉靈感頁面(未來可能會換成其他目標)

未來希望/可能會有的功能

- [ ] 添加日期樓層電梯，根據輸入日期尋找最接近的靈感
- [ ] 整合本地管理套件，自動創建文檔&building 靈感頁面
- [ ] 狀態根據靈感隨機刷新
- [ ] 給予靈感加權，影響各式配套功能的顯示機率
- [ ] 隨機賦予首頁靈感不同 style

etc...

# 展示

在靈感頁面的效果

![01](/img/post/hexoInspirationPage/01.jpg)  
![02](/img/post/hexoInspirationPage/02.jpg)

<br>

在首頁的效果

![03](/img/post/hexoInspirationPage/03.jpg)  
![04](/img/post/hexoInspirationPage/04.jpg)

# 思路過程

## Markdown 檔

創建 `source/_inspirations/` 資料夾  
創建 `source/inspiration/` 資料夾

`_inspirations` - 靈感檔案放置

文檔範例

```
---
date: 2025-05-05
layout: inspiration
---

靈感內容
```

`inspiration` - 靈感頁面(透過 `generate_inspirations.js` 生成)

<br>

## 產生頁面 JS

創建 `scripts/generate_inspirations.js`

```
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
```

<br>

## 添加 CSS

這部份僅供參考，實際 style 根據個人 theme 而定

```
.inspiration-list {
  display: flex;
  flex-direction: column;
  gap: 1.5em;
  padding: 1em 0;
}

.inspiration-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1em;
  background-color: rgba(255,255,255,0.75);
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
  transition: transform 0.2s, background-color 0.5s ease;
}

.inspiration-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

.inspiration-title-wrap{
  display: flex;
  justify-content space-between;
  color: #7a7a7a;
}

.inspiration-date {
  font-weight: bold;
  color: #666;
  margin-bottom: 0.5em;
  font-size: 0.9em;
}

.inspiration-content {
  font-size: 1.8em;
  font-weight: bold;
  line-height: 1.6;
  color: #8186e9;
}

.night .inspiration-card {
  background-color: rgba(40,44,52,0.5);
  border-color: #333;
  color: #ddd;
  box-shadow: 0 2px 8px rgba(255, 255, 255, 0.05);
}

.night .inspiration-card:hover {
  box-shadow: 0 4px 12px rgba(255, 255, 255, 0.1);
}

.night .inspiration-date {
  color: #aaa;
}

.night .inspiration-content {
  color: #ddd;
}

@keyframes fadeUpSmooth {
  from {
    opacity: 0;
    transform: translateY(60px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.inspiration-card-inner {
  animation: fadeUpSmooth 0.8s cubic-bezier(0.22, 1, 0.36, 1) both;
}
```

# 結語

以上，就是這麼一個小功能

很長一段時間，寧願在論壇分享自己的事情  
網誌卻幾個月不去動他，只因為分享日常瑣事並非我建立這個網站的初衷

然而，網誌應該是可以更加自由的  
我希望他可以接納我的生活

希望這個功能在未來可以活用。
