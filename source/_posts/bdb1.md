---
toc: true
title: BDB更新日誌#1
date: 2022-01-17 18:00
tags: [discord.js, discord, node.js, bot, 教學]
categories:
  - [BaseDiscordBot, 更新日誌]
---

## 主要更新

- bot 啟動時自動註冊斜線命令

### 次要更新

- 斜線命令相關邏輯調整
- 修改 js 檔名
- 修改部分註解

### github

[github 頁面](https://github.com/Mr-Smilin/BaseDiscordBot/tree/2e168a31c74994c18e276f8f4bf1ff67d74803c9)

<!-- more -->

<br>

---

## 一些話

大家好，我是微笑

總覺得很久沒發文，自上次簡單介紹 discord.js 升版後有四個月了...

與以往渾渾噩噩不同，
架設了 blog、有了實際的紀錄後更可以感覺到自己必需努力(雖然平常更多時間都在放電 haha)

原本新年後第一篇文章，希望可以寫點想說的話；
可之前沒有相關經驗，一到真的要動筆時總是不知道該寫些甚麼。
結果就拖到現在了，實在是有點慚愧(抹臉

雖然不是 2022 第一篇，相關的雜談就留待日後吧~
這邊做為更新日誌，會盡量以介紹更新為主的，恩恩。

<br>

---

### 主要更新說明

敘述上挺好懂的，BDB(BaseDiscordBot)原本並不會在註冊時自動跑[斜線指令](https://discord.js.org/#/docs/discord.js/v13/class/GuildApplicationCommandManager)。
原本的 code 有點問題，這次改了寫法，並且拉進了[Client#ready](https://discord.js.org/#/docs/discord.js/v13/class/Client?scrollTo=e-ready)事件內。
以後執行時，就會將 bot 所在的所有群組都註冊一次斜線指令

![移除註解，修改傳入的參數](https://i.imgur.com/wFQPoia.png)

![實際在ready呼叫了InsertSlash](https://i.imgur.com/J8d01FY.png)

<br>

---

### 次要更新說明

原本 BDB 在升級到 discord.js 13 時，目標著重在保全 **功能模組化** 此一優點上，
斜線指令的兼容，並沒有花費過多的時間去研究。

此次除了主要更新中提到的內容，還修改了斜線指令被觸發時的邏輯，
將 reply 一同寫在 json 內，以利於往後擴充。

改動簡易，優點也是顯而易見的，
有效避免日後斜線指令過多，註冊與回傳列表不同步的風險。

基於 **功能模組化** 訴求，針對這一塊的下一步優化，
預計會是在程式碼上做出子母 json 檔案；
可以根據要使用的功能別，來直接套用各個功能對應的 json。

<br>

---

<br>

原本 BDB 的啟動檔取名做 bot.js，因筆者自身寫的 bot，檔名都是 alice(女兒)。
BDB 畢竟也是我的專案，怎麼可以有差別待遇呢(不是
乾脆就一併統一成愛稱了。

另外調整了一點點註解上的形容。

![修改了斜線指令，以回傳類型決定邏輯](https://i.imgur.com/l93RXrB.png)

![調整後的slashJson](https://i.imgur.com/QOybZGB.png)

![調整了註解與執行的jsName](https://i.imgur.com/bvwPWkT.png)
