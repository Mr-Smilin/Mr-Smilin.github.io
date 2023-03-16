---
toc: true
title: fluid支持pjax主題源碼分享
date: 2021-11-16 12:00:00
tags: [hexo, fluid, 教學]
categories:
  - [hexo主題分享]
---

![theme](https://i.imgur.com/yl9bnuZ.png)

# 寫在前面

```
本主題基於 fluid 1.8.11 版本製作，在此之上參雜了許多私貨
又因為本人前端並不熟練，源碼被改得亂七八糟的，因此有任何問題在blog聯繫我詢問即可。
再此感謝開發 and 維護源碼的所有大大們。
```

## fluid 主題主要改動

- [x] pjax 支持
- [x] 添加本地音樂箱
- [x] 添加右下角 Live2D 妹子
- [x] pjax JS 回調(解決大部分 fluid 不支持 pjax 之異常)
- [x] 目錄頁次浮動顯示
- [ ] 文章列表搜出留言數
- [x] Markdown 介面修改
- [x] 文章底部上下篇連結位置對調(上一篇就該在左邊，下一篇就該在右邊 = = )
- [x] 修復繁體中文字型
- [x] rss 功能

<!-- more -->

## 環境配置

```
hexo -v
INFO  Validating config
hexo: 5.4.0
hexo-cli: 4.3.0
```

主題下載

```
https://github.com/Mr-Smilin/hexo-theme-fluid.git
```

hexo \_config 配置請添加以下

### rss

```
feed:
    type: atom # RSS的类型(atom/rss2)
    path: atom.xml # 文件路径,默认是atom.xml/rss2.xml
    limit: 20 # 展示文章的数量,使用0或则false代表展示全部
    hub:
    content: # 在RSS文件中是否包含内容 ,有3个值 true/false默认不填为false
    content_limit: # 指定内容的长度作为摘要,仅仅在上面content设置为false和没有自定义的描述出现
    content_limit_delim: ' ' # 上面截取描述的分隔符,截取内容是以指定的这个分隔符作为截取结束的标志.在达到规定的内容长度之前最后出现的这个分隔符之前的内容,，防止从中间截断.
```

### live 2D

```
live2d:
    enable: true
    scriptFrom: local
    pluginRootPath: live2dw/
    pluginJsPath: lib/
    pluginModelPath: assets/
    tagMode: false
    log: false
    model:
        use: live2d-widget-model-shizuku
    display:
        position: right
        width: 150
        height: 300
    mobile:
        show: false
    react:
        opacity: 0.7
```

更多 live2D 模組可訪問 `https://smilin.net/2021/11/16/live2DShareList/`

### 音樂箱音樂

開啟 `source\dist\music.js`

```
const ap = new APlayer({
    container: document.getElementById('aplayer'),
	fixed: true,
	mini: true,
    autoplay: false,
    loop: 'all',
    volume: 0.7,
    listFolded: true,
    listMaxHeight: 60,
    audio: [
        {
            name: '最近在聽的歌',
            artist: '星茶会',
            url: '/music/星茶会.mp3',
            cover: '/img/avatar.png',
        },
		{
            name: '最近在聽的歌',
            artist: 'Fullmetal Alchemist Brotherhood',
            url: '/music/Fullmetal-Alchemist-Brotherhood.mp3',
            cover: '/img/avatar.png',
        }
    ]
});
```

對應路徑檔案可替換

---

配置好後，做 hexo 上傳 sop

```
$ npm install #安裝library（僅第一次執行）
$ hexo clean #清除
$ hexo g #編譯
$ hexo d #上傳git
```

以上就是配置此 theme 的流程，使用上若有遇到問題歡迎在底下詢問

---

## 期待這篇文章可以幫助到需要的人

fluid 是本 blog 第一個使用的 theme
fluid 的設計...非常讚!(詞窮)
逛著 blog 的期間，可以從各處巧思中感受到作者對美感的一套見解

不過 fluid 因為其框架的侷限，其致命傷便是無法支援 pjax(ajax)做局部頁面更新
從 issues 上可以看到，對於 pjax 的開發目前是不了了之

但這並非是 fluid 無法支援 pjax，而是因為引入 pjax 會破壞 fluid 既有框架
也因此這些改動要改進正式版本是十分困難的，但如果只是魔改的話，儘管是像筆者對前端並不精熟，也能試著修改(code 不保證好看就是了 xD)

因為筆者最近可能會試著替換成其他主題，故想記錄下使用版本，算是分享。
