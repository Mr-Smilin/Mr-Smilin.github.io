---
title: 關於discord.js升級至13版本
date: 2021-09-27 13:47:20
tags: [node.js, bot, discord, discord.js]
categories:
  - [BaseDiscordBot]
---

discord.js 是基於 node.js ，提供開發人員架設 discord bot 的一套 library

在去年的這個月，我寫了一篇關於[使用 discord.js 架設 bot 的教學文章](https://smilin.net/tags/12th%E9%90%B5%E4%BA%BA%E8%B3%BD/)

而在今年的 8 月 13 號， discord.js 從 12 版升至 13 版

此改動影響了不少功能，聲明了以 message 事件為首的許多功能即將遭到廢棄(目前的 13 版仍然可用)，且使用前必須先行宣告 partials 與 intents

至此，使用最新版本的開發者，理所當然的無法在網路上找到較為全面的教學，因為 13 版在一開始初始化時的寫法就與以往大相逕庭

針對於現況，繼續使用 12 版 library ，又或是試著自己摸索 13 版的寫法都不失為一種辦法

對此我也寫了一個模板，提供最基礎的套用

<!-- more -->

---

此專案最初的起因，出自於不斷重構 bot 的過程

考慮到 library 版本汰換的不方便，想將邏輯與函式分隔，中間用自己的方法重新宣告

如此，往後 library 的更新，我們可以最大限度的僅更新自身提供的方法即可，而不修改邏輯

截止於本文為止，此庫提供 12.5.3 與 13.1.0 的模板，可以直接輸入 bot key 套用

由於此模板偏向基礎的重構，目前尚未添加額外的功能

因此，此模板適合給

- 原本就對 discord.js 有一定了解的人
- 針對重構的方法沒有頭緒，同時又希望可以解決版本汰換問題的使用者

較不適合於

- 原本對 discord.js 較不熟悉的人
- 希望啟動後可以立即實現多種功能的人

不過，關於功能的部分，目前也有計畫開發；
諸如基本指令，音樂系統等功能，未來預計會以插件的形式，另外放在其他 project 中。

[Git](https://github.com/Mr-Smilin/BaseDiscordBot)
