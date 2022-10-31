---
toc: true
title: BDB更新日誌#2 - discord.js v14.6.0
date: 2022-10-31 18:00
tags: [discord.js,discord,node.js,bot,教學]
categories:
  - [BaseDiscordBot,更新日誌]
---

## 主要更新
- 將專案適配到 `discord.js` v14.6.0 版本
- 全版本專案棄用 `auth.json` ，改成 `.env`

### 次要更新
- message邏輯整合
- 修改部分註解

### github
[github頁面](https://github.com/NALocal/BaseDiscordBot/tree/v14.6.0)

<!-- more -->

---

## 一些話

大家好，我是微笑

這次版本更新，在基本架構上跟13並沒有差太多
主要是修改了之前code的一些架構設計，讓主體更加精簡了一些，以及使用更加正規的方式儲存私密數值

之後如果時間允許，希望可以將自己的bot提升到14.6.0的版本(12遇到的bug越來越多了~~)
屆時或許會再將功能拆分，更新到這邊吧，不過因為已經真鹿太多次了，已經有點不好意思給承諾了，各位看看就好吧，哈哈哈~~

<br>

---

### 主要更新說明

原本專案使用 json 做參數管理
最近筆者因為換了上雲平台，重新研究了一次相關資料，這次索性將 `auth.json` 棄用，統一改成 `.env`
利用 `dotenv` 的效果，就可以用 `process.env.` 的方式載入各種環境參數了

![引入dotenv，改用process.env.xxx來取值](https://i.imgur.com/yCrkWDD.png)

<br>

---

### 次要更新說明

另外比較重要的修改，就是原本將message入口放在主程序，看起來挺奇怪的，就跟 `prefix.json` 一起重新統合到獨立的分類了
以及在註解上，也重新做了一輪調整，讓文件間的註解存在統一性，相對不會太過雜亂

![prefix.json更名，並且放入messageManager模組內](https://i.imgur.com/0m0R3m4.png)

![把message邏輯搬到獨立文件內，以及部分註解統一](https://i.imgur.com/c7brWXz.png)

<br>