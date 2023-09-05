---
toc: true
title: discord.js 升上 14 版，架構說明
date: 2023-06-01 20:00
tags: [node.js, bot, discord, discord.js]
categories:
  - [程式簡記]
---

[github 連結](https://github.com/Mr-Smilin/AliceZero/tree/v14)

從 2021 年，discord.js 升上 13 版  
heroku 改成收費  
youtube 不喜歡 discord 蹭他們的服務  
音樂機器人相繼關閉 yt 服務  
12 版許多功能時常報錯  
discord.js 升上 14 版..

<br>

期間不管是工作又或是休假時，都很希望能升級以前寫的機器人  
不斷想重構出更好維護的程式架構，也一再推翻之前的程式

<br>

終於..！在最近 Alice 也正式升上了 discord.js 14.11.0 版本  
不會總是因為舊版本不支援而爆炸啦！(誤)

![levelUp!](https://i.imgur.com/M6hj8wU.jpg)

<!-- more -->

<br>

---

<br>

## 安裝套件

必備

- Node.js v16.9.0 或以上
- Discord.js v14.11.0  
  discord.js 核心套件
  ```
  npm install discord.js@14.11.0
  ```
- dotenv v16.0.3  
  讀取 .env ，即 token 的套件
  ```
  npm install dotenv@16.0.3
  ```

<details>
<summary>點我展開BDB(baseDiscordBot.js)所需套件</summary>

<br>

- @discordjs/builders v1.3.0  
  discord.js 提供的類別產生器類型
  ```
  npm install @discordjs/builders@1.3.0
  ```

</details>

<br>

<details>
<summary>點我展開音樂系統所需套件</summary>

<br>

- @discordjs/voice v0.16.0  
  控制 discord 語音的核心套件  
  p.s.使用舊版本極度容易出現問題，如果播放過程發生 bug 可以先檢查 voice 是不是最新版
  ```
  npm install @discordjs/voice@0.16.0
  ```
- @discordjs/opus v0.9.0  
  Opus 編碼器
  ```
  npm install @discordjs/opus@0.9.0
  ```
- ffmpeg-static v5.1.0  
  ffmpeg 轉碼器
  ```
  npm install ffmpeg-static@5.1.0
  ```
- libsodium-wrappers v0.7.11  
  串流加密工具
  ```
  npm install libsodium-wrappers@0.7.11
  ```
- play-dl v1.9.6  
   串流套件，取代 ytdl-core
  ```
  npm install play-dl@1.9.6
  ```

</details>

<br>

<details>
<summary>點我展開Render託管推薦套件</summary>

<br>

- axios v1.4.0  
  打 http 使用的套件
  ```
  npm install axios@1.4.0
  ```
- node-schedule v2.1.0  
  定時任務套件
  ```
  npm node-schedule@2.1.0
  ```

</details>

<br>

---

<br>

## 前置動作

如果是舊版 discord bot ，要先去 [discordDeveloper](https://discord.com/developers/applications)  
選中自己的 bot 後，選擇左邊 Bot 選項，然後將這邊的開關都打開

![2](https://i.imgur.com/GoIc5Ld.png)

這是一些限制機器人存取特定資訊的開關，默認是關閉的，如果沒有打開，就算在程式中要求存取權，也是拿不到這些資訊的喔！

之後在專案根目錄創建一個 `.env` 檔案，性質類似於以前教學中的 `auth.json`  
差別在於，放在 `Environment` 的參數意味著參數不該被公開，不會在任何的公開場合獲得此類 value (例如 github)，僅在執行專案時會被注入

### .env 預覽

```
TOKEN="your bot token"
MASTER_ID="your client ID"
```

## 專案結構

<br>

<details>
<summary>點我展開專案結構</summary>

AliceZero/  
├─ baseJS/  
│ 　　 ├ BaseDiscordBot.js  
│ 　　 ├ CatchF.js  
│ 　　 ├ CronTask.js  
│ 　　 ├ HealthCheck.js  
├─ manager/  
│ 　　 ├ buttonManager/  
│ 　　 ├ 　　 ├ commands/  
│ 　　 ├ 　　 ├ 　　 ├ helpNowQueue.js  
│ 　　 ├ 　　 ├ 　　 ├ helpPause.js  
│ 　　 ├ 　　 ├ 　　 ├ helpPlay.js  
│ 　　 ├ 　　 ├ 　　 ├ helpPlayFirst.js  
│ 　　 ├ 　　 ├ 　　 ├ helpResume.js  
│ 　　 ├ 　　 ├ 　　 ├ helpSkip.js  
│ 　　 ├ 　　 ├ 　　 ├ helpSleep.js  
│ 　　 ├ 　　 ├ 　　 ├ helpTrpgDice.js  
│ 　　 ├ 　　 ├ 　　 ├ helpTrpgSort.js  
│ 　　 ├ 　　 ├ 　　 ├ myKiritoSkillNicename.js  
│ 　　 ├ 　　 ├ 　　 ├ myKiritoSkillSkill.js  
│ 　　 ├ 　　 ├ 　　 ├ myKiritoSkillStatus.js  
│ 　　 ├ 　　 ├ buttonC.js  
│ 　　 ├ 　　 ├ buttonM.js  
│ 　　 ├ 　　 ├ buttonType.json  
│ 　　 ├ componentManager/  
│ 　　 ├ 　　 ├ componentM.js  
│ 　　 ├ embedManager/  
│ 　　 ├ 　　 ├ embedC.js  
│ 　　 ├ messageManager/  
│ 　　 ├ 　　 ├ messageC.js  
│ 　　 ├ 　　 ├ messageM.js  
│ 　　 ├ 　　 ├ messagePrefix.json  
│ 　　 ├ 　　 ├ messageUpdateM.js  
│ 　　 ├ 　　 ├ nineData.js  
│ 　　 ├ musicManager/  
│ 　　 ├ 　　 ├ musicC.js  
│ 　　 ├ 　　 ├ musicM.js  
│ 　　 ├ mykiritoManager/  
│ 　　 ├ 　　 ├ requests/  
│ 　　 ├ 　　 ├ 　　 ├ boss.js  
│ 　　 ├ 　　 ├ 　　 ├ level.js  
│ 　　 ├ 　　 ├ 　　 ├ skill.js  
│ 　　 ├ 　　 ├ myKiritoC.js  
│ 　　 ├ 　　 ├ myKiritoM.js  
│ 　　 ├ selectMenuManager/  
│ 　　 ├ 　　 ├ commands/  
│ 　　 ├ 　　 ├ 　　 ├ help.js  
│ 　　 ├ 　　 ├ selectMenuC.js  
│ 　　 ├ 　　 ├ selectMenuM.js  
│ 　　 ├ slashManager/  
│ 　　 ├ 　　 ├ commands/  
│ 　　 ├ 　　 ├ 　　 ├ help.js  
│ 　　 ├ 　　 ├ 　　 ├ m.js  
│ 　　 ├ 　　 ├ slashM.js  
│ 　　 ├ trpgManager/  
│ 　　 ├ 　　 ├ trpgC.js  
│ 　　 ├ 　　 ├ trpgM.js  
├─ .env  
├─ alice.js  
├─ package.json  
├─ package-lock.json

</details>

<br>

因為這篇不是教學，不會一個個講解，大概說明一下各 Manager 的作用

- BaseDiscordBot.js  
  從登入 token 到訊息傳送  
  與 discord.js 的任何交互都在這，唯一引用 discord.js 的地方  
  好處是當 discord.js 改版時只要更改 BDB 即可  
  壞處是其他地方的邏輯可能會比較難以理解，都需要點進 BDB 查看
- CatchF.js  
  自定義的 log 工具，改這裡就可以一次更改所有的 log style
- CronTask.js  
  託管平台用到的工具
- HealthCheck.js  
  同上
- alice.js  
  `npm start` 的執行檔，敘述了啟動時會執行的內容
- slashManager  
  discord.js 13 版以後新增的斜線指令，包含其註冊與監聽的方法都寫在這  
  commands 可以看出這個 bot 目前有多少指令(本次範例來說有 `help` 跟 `m` 指令)
- messageManager  
  傳統 bot 對文字訊息回應的主要行為，`messageUpdate` 訊息更新觸發的行為也放在這
- selectMenuManager  
  菜單組件，commands 可以看出這個 bot 目前有多少菜單組件
- buttonManager
  按鈕組件，commands 可以看出這個 bot 目前有多少按鈕組件
- embedManager  
  嵌入式訊息組件，`@discordjs/builders` 有著 `EmbedBuilder` 這個 embed 產生器  
  避免往後的更新要改一堆地方，在 BDB 中被繼承完才給 embedManager 使用
- componentManager  
  組件管理器，當訊息非單純的文字訊息，有使用到 菜單 / 按鈕 / 嵌入訊息 任一組件時，會從這裡拿
- musicManager  
  音樂相關邏輯，musicM 負責定義邏輯，musicC 實例實際內容，與 `play-dl` 等套件互動
- trpgManager
  派對系統，目前只會骰骰子，而且 code 還是從舊版直接搬過來的..
- mykiritoManager  
  攻略組系統，提供 mykirito 大群的資訊查詢，雖然很久沒更新，但仍然還有人在使用，所以也更新過來了。

[github 連結](https://github.com/Mr-Smilin/AliceZero/tree/v14)

<br>

現在的架構算是終於確定下來，以後會在這個架構上繼續更新  
不過畢竟是 side project ，架構中有些地方整理的比較草率  
如果之後寫教學，會重新寫一個 bot 的

看到這裡的朋友，如果在寫 bot ，但苦於不知該如何下手的話  
這裡推薦可以看看 [藍莓大大](https://b-l-u-e-b-e-r-r-y.github.io/post/DiscordBot03/) 的文章  
淺顯以懂，最後甚至是給了乾貨，可以直接載了拿去用~

或是使用 [我的 BDB](https://github.com/Mr-Smilin/BaseDiscordBot)  
除了像是 mykirito 這種比較偏門的功能，其他 alice 會的指令都會慢慢更新在 BDB 專案上，可以自由取用~

感謝看到這裡的你^^!
