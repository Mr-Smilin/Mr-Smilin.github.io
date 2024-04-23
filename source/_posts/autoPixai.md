---
toc: true
title: 自動領取 Pixai 每日獎勵
date: 2024-04-13 19:00
tags: [node.js, docker, 教學]
categories:
  - [程式簡記]
---

![title](/img/post/autoPixai/01.jpg)

工程網址  
[Github](https://github.com/Mr-Smilin/auto-pixai)  
[Docker Hub](https://hub.docker.com/r/smile0301/auto-pixai)

近幾年 AI 工具日新月異  
我也有幸接觸了 AI 繪圖的一鱗半爪

其中 [pixai](https://pixai.art) 是少有的雲端免費算圖網站

在 pixai 如果對產出來的圖感到滿意的話  
可以透過 AI 進一步運算，產出會動的圖

<!-- more -->

---

<br>

說是免費，其實還是有些限制的

在網站上的運算行為都需要消耗點數，無論是靜態或動態

而點數除了透過付費與活動取得以外  
pixai 每日都有一萬點數可供會員領取，也就是每日獎勵

![每日獎勵](/img/post/autoPixai/02.jpg)

只要每天領取就可以免費算圖了，整個佛心來著對吧

不過筆者最喜歡花費幾個小時來搞定原本一分鐘可以做到的事情(x

---

<br>

[auto-pixai](https://github.com/Mr-Smilin/auto-pixai)

輸入帳號跟密碼，該腳本執行一次就會自動進網站領取每日獎勵

使用 node.js 撰寫，另有 Docker 容器化，開箱即用

```
docker pull smile0301/auto-pixai
docker run -e LOGINNAME=<你的帳號> -e PASSWORD=<你的密碼> --name <container-name> smile0301/auto-pixai
```
