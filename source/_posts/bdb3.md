---
toc: true
title: BDB更新日誌#3
date: 2022-11-01 18:00
tags: [discord.js, discord, node.js, bot, 教學]
categories:
  - [BaseDiscordBot, 更新日誌]
---

## 主要更新

- DiscordJSmySelf 更名為 BaseDiscordBot
- discord.js 的所有參考都塞進 BaseDiscordBot
- 斜線 / 選項 / 按鈕 / 菜單 框架完成

### 次要更新

- env 更新
- readMe 更新

### github

[github 頁面](https://github.com/Mr-Smilin/BaseDiscordBot/tree/v14.6.0)

<!-- more -->

---

## 一些話

<br>
嗨，昨天才見面呢  
最近比較閒，忽然就可以比較常更新日誌了

其實原本有點懶得寫，但 BDB 目前的狀態，跟之前相比算是有了非常大的改變  
所以就稍微紀錄一下，雖然、大概、沒人看就是了 xD ~~

<br>

---

### 主要更新說明

  <br>
首先，最重要的就是，DBD 的核心文件做了一次更名啦 ~~ <br> 
筆者實在是對命名很不在行，原本的想法很單純，想寫一套屬於我的翻譯文件  <br>
用來翻譯 discord.js 的 API ，這樣以後 discord.js 改版的時候，就不用再把原有的邏輯拆掉重組了  
  <br><br>
新的名字與專案相同，也算是重新確立了本專案的方向 (啪嘰啪嘰~)  
  
  <br>
  
雖然認真的朋友應該早就看出來了，其實筆者的程式水平並不怎樣呢，也難怪會當受薪階級了 (x)  
不過筆者也沒有因此放棄，目標一直都是在程式的道路上磨練，所以相較於以往，對程式的理解還是有提高的喔

這次花了些時間整理，正式將所有與 discord.js 有關的 import 都塞入 BDB 內了  
也就是以後使用 BDB，就真正可以做到換一個檔案 -> 升級完畢，的這種事情了 ~~  
雖然只是初衷一般的事情，也是最近稍微閒下來才終於可以整理好啊..感覺審視了一次自己的作業效率阿 (汗)

  <br>

以及相比前兩個比較小咖，但也算是主要更新的  
discord.js 13 版引入，14 版改過一次實例方式的各種功能都做出框架了  
雖然沒能在 13 版時就做出來有點遺憾，但筆者對目前的框架很有自信，相信等 15 版出來的時候，這些 code 也會很容易維護吧！

<br>

---

### 次要更新說明

  <br>
在env的部分加上了 `MASTER_ID`，並沒有實際功能<br>    
更多是用於 DEBUG，或是往後要開一些只有自己能用的開發人員指令時可以使用  
  
  <br>
  
因為更新內容眾多， readMe 也做了一次更新，改了不少，但還是缺很多東西，只交代了最基本的內容  
畢竟使用 BDB 相當於重新認識一種 API ，未來想開一份專屬於 BDB 的文檔  
不知道還要多久就是了，請大家等等我囉 xD ~

<br>