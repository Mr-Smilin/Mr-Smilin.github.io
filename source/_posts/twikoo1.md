---
toc: true
title: 最近想更換評論系統
date: 2024-04-23 11:00:00
tags: [hexo, 日記]
categories:
  - [日記]
---

![logo](/img/post/twikoo1/twikoo-logo-home.png)

最近想把 blog 的評論系統換了

原本的 gittalk 免費，開源  
巧妙利用 github 的 issue，在靜態網站上也能加入評論系統

存在些許不方便，仍瑕不掩瑜。

不過既然存在限制，總有人會想開發更好的工具  
twikoo 就挺符合 blog 需求的

<!-- more -->

---

# gittalk

既然原本是用 gittalk，先說說 gittalk 的優點

- 與 github page 的高度適配
- 基於 issue 特性，綁定 github 帳戶，防止小白

兩邊都有的優點不提，大概是這些  
至於缺點

- 因為綁在 issue，評論必須先註冊 github
- 對中國使用者的支援較差(疑似)

![01](/img/post/twikoo1/01.jpg)

而且本站基於 gittalk ，魔改了許多功能

- 撈取最新留言
- 撈取熱門留言
- 從外部撈取文章留言數

替換評論系統，不只是舊有的評論會消失  
也代表著這些功能都需要重新適配，或是棄用。

---

# twikoo

[官方文檔](https://twikoo.js.org)

twikoo 與 gittalk 不同，資料存放於 MongoDB  
意味著我們需要自行架設 DB 跟 API Server

不過兩者在網路上都有許多免費資源可用，用來支持一個 blog 的運作綽綽有餘

說說這個評論系統的優點

- 無須登入即可留言
- 避免騷擾留言，分別配有多種自動偵測垃圾留言的接口，也能開啟人工審核
- 暱稱&信箱&網址 的填寫方式，很有幾十年前，傳統 blog 那味，我超愛

至於缺點

- 比起 gittalk，由於個人資料是自由填寫，相對難以得知發文者的背景
- 與依附著 github issue 的 gittalk 相比，twikoo 於第三方架設 DB 跟 API Server 環境，長遠來看需要消耗更多的維護成本
- 以前的評論會全部消失，嗚嗚嗚

---

![02](/img/post/twikoo1/02.jpg)

基本的配置已經做好了，只是還在猶豫是否該使用

個人 blog 要提高評論數還是比較難的，至少沒辦法跟社群平台競爭  
在這個前提下，評論門檻相對高的 gittalk，這份缺點也會被不斷放大

但 gittalk 同樣有著他本身天然的優勢在——
