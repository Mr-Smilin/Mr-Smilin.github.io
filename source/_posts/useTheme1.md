---
toc: true
title: 前幾天有人詢問我用的啥主題
date: 2024-05-03 15:00:00
tags: [hexo, 日記]
categories:
  - [日記]
---

![](/img/ai/letter_circle.png)

前幾天收到信，信中詢問使用的主題  
想了下的確從沒寫過，索性紀錄一下。

<!-- more -->

<br>

---

<br>

# Hexo

<img width="128" src="/img/post/useTheme1/hexo.png">

首先本站使用模板為 [Hexo](https://hexo.io/zh-tw/)

該模板提供靜態網頁生成，  
搭配 Github Page，或是其他免費架設平台，  
可以輕易實現無開銷環境的長期 blog 支持

`Hexo` 從 2013 年開發至今，  
筆者發文的 2 周前推出 v7.2.0 版本的 `Hexo`，  
有著優秀的基底與長期穩定的維護。

<br>

---

<br>

# Icarus

![](/img/post/useTheme1/Icarus.png)

除了默認的設置以外，
`Hexo` 提供自行開發主題(THEME)的接口

本站使用主題為 [Icarus](https://github.com/ppoffice/hexo-theme-icarus)

該主題默認提供 default(白色) 跟 cyberpunk(黃色) 主題可供選用

由於 Icarus 後來經過多次更迭，  
加上筆者自己對 blog 有諸多修改，  
如今已與原本的 Icarus 有很多差異，  
不過仍看得出排版等元素皆承襲自 Icarus。

<br>

---

<br>

# 星空

![](/img/post/useTheme1/01.jpg)

黑暗主題的星空背景，參考[imaegoo](https://github.com/imaegoo/hexo-theme-icarus)大大的開源代碼

`imaegoo` 的開源代碼同樣是從 `Icarus` 改進而來  
如果喜歡星空背景，該開源代碼可以直接套來用

不過由於筆者在此之前，已經對 blog 做過諸多修改  
最終是自行研究該代碼後，另外自己寫 css，  
想辦法移植過來的。

<br>

---

<br>

# PJAX

本站的局部加載使用 PJAX，  
同樣是另外加寫的

原本網站是使用 [Fluid](https://github.com/fluid-dev/hexo-theme-fluid) 這套 `Hexo` 主題

但因為 `Fluid` 並不支援局部加載，  
自己想辦法實作後發現基底的確不適合，  
無奈之下只好棄用。

當時為了魔改 `Fluid` 還寫了篇[紀錄](https://smilin.net/2021/11/16/fluidThemeShare/)，  
有興趣可以看看。

<br>

---

<br>

# Live 2D

![](/img/post/useTheme1/03.jpg)

本站的 Live 2D 小人，  
使用 [fghrsh](https://github.com/fghrsh/live2d_demo) 大大撰寫的開源工具

該專案主要負責 live 2d 的加載，  
與針對網頁元素互動的邏輯撰寫

得益於開源專案的優勢，該工具有著許多變種，  
同時支持多項設定自定義

像本站是使用了原本的前端工具 + 後端 API 本地靜態化  
以此來避免 憑證過期 & 後端額外開銷 等等問題。

<br>

---

<br>

# Gittalk & 熱門評論 & 最新評論

![](/img/post/useTheme1/04.jpg)

Gittalk 一直都是本站的評論系統  
他主要依賴於 Github Issue 與其 API  
讓原本靜態的網站，彷彿支援動態的評論系統一般

如果 blog 原本是使用 Github Page 架設，  
懶一點的話可以架在同一個 Repository，  
如此便不需花費額外的維護成本。

<br>

除了 Gittalk 原本的功能，  
熱門&最新評論的 API 串接則是參考[辣椒的醬](https://removeif.github.io/theme/%E5%8D%9A%E5%AE%A2%E6%BA%90%E7%A0%81%E5%88%86%E4%BA%AB.html)大大

由於過於方便，並沒有多加修改，

就是那個評論數統計，  
當時看代碼會偷偷灌水，所以改回了原始數值。

另外由於辣椒的醬大大的 blog 已經多年未有更新，  
考慮到 `hexo`&`Icarus` 在之後有多次版本更迭  
以剛起步來說，會更加推薦直接使用官方模板來做修改。

<br>

---

<br>

# 明亮主題的粒子特效

![](/img/post/useTheme1/02.jpg)

這部份使用 [canvas-nest](https://github.com/hustcc/canvas-nest.js/)

使用非常簡單，在網頁引入 js 即可  
網路教學不少

由於跟夜晚主題適配性差，  
根據個人需求不同，要稍微調整 css。

<br>

---

<br>

# 音樂箱

![](/img/post/useTheme1/05.jpg)

音樂箱功能使用 [Aplayer](https://github.com/DIYgod/APlayer) 播放器

非常低調地摺疊收納在網站角落，  
按照預想，就算是多次瀏覽本站的旅客也不一定能發現

畢竟音樂箱只需要服務需要聽音樂的人即可，  
大多人瀏覽網站時也有自己在背景播放的歌曲，  
這時候若太過強調網站自帶的音樂，顯得不識趣了些。

值得一提的是，  
本站的音樂箱，在手機可以當作歌曲列表自動播放。

<br>

---

<br>

# RSS

![](/img/post/useTheme1/06.jpg)

本站 RSS 提供三種格式  
分別是預設的 RSS、ATOM 與 Json Feed

![](/img/post/useTheme1/07.jpg)

使用 RSS 訂閱，便可即時知道網站更新了文章

對筆者來說，就像是提醒自己一直都沒在更新文章

看到一排去年的文章，  
彷彿說著「再不更新就要死了！」這樣。

<br>

---

<br>

# 寫在後面

列一列大概是這些，如果有甚麼缺漏，  
或是未來更新沒寫在這，想問的

歡迎提出來，有時間便會回覆。
