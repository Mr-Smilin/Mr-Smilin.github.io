---
toc: true
title: Alist 好用的自建雲端介紹
date: 2023-09-06 10:00
tags: [Alist]
categories:
  - [程式簡記, 雲端相關]
---

隨著 GOOGLE / ONEDRIVE 等空間限制增多

筆者轉為使用自架雲端方案一段時間，其中特別中意 Alist 的畫面

![1](https://i.imgur.com/cwZF7fX.png)

高自定義的 UI，強大的用戶管理  
最重要的是在目錄下默認讀取 readme.md 做介紹！

整理雲端檔案，最常遇到的難題  
就是多年後很難輕易在一堆檔案中找到自己需要的資料

除此以外還支援

- 元數據(載入特定目錄會跳出的訊息)
- 文件搜索
- 雲端掛載(GD/OD/MEGA/還有一堆..)

使用 Alist 不僅能讓雲端變得美觀，還能很輕鬆的管理文件

<!-- more -->

## [Alist 官方文檔](https://alist.nn.ci/zh/)

![2](https://i.imgur.com/pbxhpkZ.png)

從文檔首頁可以感受到，Alist 有著強大的功能

因為支援中文，在閱讀文檔時不會遇到障礙

## 環境建置

筆者使用 Docker 運行 Alist

```
docker pull xhofe/alist:v3.13.2

docker run -d --restart=always -v {你的本機目錄}:/opt/alist/data -p 5244:5244 -e PUID=0 -e PGID=0 -e UMASK=022 --name="alist" xhofe/alist:v3.13.2
```

記得將上方的 {你的本機目錄} 替換成你的環境

Container run 起後使用這段指令查看預設帳號密碼

```
docker exec -it alist ./alist admin
```

![3](https://i.imgur.com/sKMQUPf.png)

![4](https://i.imgur.com/wvAH9Od.png)

登入成功後我們會回到首頁，這裡目前甚麼都沒有

在網址後方加入 @manage 進入控制台

![5](https://i.imgur.com/8ziYJ8B.png)

這邊先將管理員帳密改成你好記的樣子

在存儲可以添加需要加入到 Alist 的空間  
從基本的本地環境到雲端都可以放在 Alist 管理

設置雲端掛載時記得根據 Alist 版本，查看對應的文檔，留意任何留言，記得備份~

筆者這邊以本地環境做示範

<br>

---

<br>

首先到設定 {你的本機目錄} 的地方，創建一個資料夾

這會做為未來我們掛載本地檔案的路徑

![6](https://i.imgur.com/FKzeLks.png)

- 驅動選擇 本地存儲
- 掛載路徑 /{資料夾名稱}
- 根資料夾路徑 /opt/alist/data/{資料夾名稱}

![7](https://i.imgur.com/oCqbTCR.png)
![8](https://i.imgur.com/mOr53lK.png)

設定完大概如上

<br>

![9](https://i.imgur.com/ZimHdEW.png)

回首頁看就會有空間了!

<br>

## 實用 CSS

Alist 後台的 "設置" ，可以調整絕大多數的 UI 畫面  
不過如果想自定義一些細節，推薦使用 CSS 達成

設置 -> 全域設定 -> 自定義頭部

可以在這做自定義 CSS 的添加  
以下提供一些不錯的樣式

<br>

### 去除網站圖標與搜索

```
<style>.hope-stack.hope-c-dhzjXW.hope-c-PJLV.hope-c-PJLV-iiOacaA-css {display: none!important;}</style>
```

### 站點公告去除 X 關閉按鈕

```
<style>.notify-render .hope-close-button{display: none;}</style>
```

### 使用背景圖(亮色背景)(GIF 可用)

```
<style>.hope-ui-light{background-image: url("")!important;background-repeat:no-repeat;background-size:cover;background-attachment:fixed;background-position-x:center;}</style>
```

### 使用背景圖(暗色背景)(GIF 可用)

```
<style>.hope-ui-dark {background-image: url("") !important;background-repeat:no-repeat;background-size:cover;background-attachment:fixed;background-position-x:center;}</style>
```

### 列表改透明(亮色背景)

```
<style>.obj-box.hope-stack.hope-c-dhzjXW.hope-c-PJLV.hope-c-PJLV-igScBhH-css{background-color: rgba(255, 255, 255, 0.5) !important;}</style>
```

### 列表改透明(暗色背景)

```
<style>.obj-box.hope-stack.hope-c-dhzjXW.hope-c-PJLV.hope-c-PJLV-iigjoxS-css{background-color:rgb(0 0 0 / 50%) !important;}</style>
```

### 元信息改透明(亮色背景)

```
<style>.hope-c-PJLV.hope-c-PJLV-ikSuVsl-css{background-color: rgba(255, 255, 255, 0.5)!important;}</style>
```

### 元信息改透明(暗色背景)

```
<style>.hope-c-PJLV.hope-c-PJLV-iiuDLME-css{background-color:rgb(0 0 0 / 50%)!important;}</style>
```

### 去除尾頁

```
<style>.footer {display: none !important;}]</style>
```

### 移除下載選項

```
<style>.hope-select__trigger.hope-c-kvTTWD.hope-c-huZphZ.hope-c-kvTTWD-hYRNAb-variant-filled.hope-c-kvTTWD-gfwxhr-size-md.hope-c-huZphZ-cIGthf-cv.hope-c-PJLV.hope-c-PJLV-ijSQbqe-css{display: none !important;}</style>
```

<br>

推薦一些網站:  
[Alist 魔改代碼分享](https://anwen-anyi.github.io)  
[CSS 參考](https://telegra.ph/AList-UI-01-11)
