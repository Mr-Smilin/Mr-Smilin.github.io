---
toc: true
title: Alist 單檔太大上傳失敗，思路整理
date: 2023-09-11 18:00
tags: [Alist, Cloudflare]
categories:
  - [程式簡記, 雲端相關]
---

**註：本文並沒有完全解決遇到的上傳問題**  
**筆者只想到替代方案，曲線救國**

<br>

筆者是自建雲端的愛用者，目前使用 Alist

前一陣子因為自身需求，添加了 Cloudflare 反向代理

原本一切看起來都很美好，但某天上傳檔案時才發現不對，只要檔案大於 100 MB 就有機會遇到 413 問題。

![1](https://i.imgur.com/rNNhTq5.png)

[官方的反向代理配置](https://alist.nn.ci/zh/guide/install/reverse-proxy.html)

可以看到，文檔下大多也是哀鴻遍野，看來只要配置了反代很容易就會碰到這個問題

尤其文檔不支援 Cloudflare，實在頭痛..

<!-- more -->

# 問題排查

## NGINX 設定 client_max_body_size

參考資料時，大多資料都指向是 NGINX 設定的問題  
只要將 `client_max_body_size` 上限拉高即可解決

```
server {
	．．．．．．．．．
	location / {
    ．．．．
		client_max_body_size 10G;
    ．．．．
	}
	．．．．．．．．．
}
```

不過筆者並沒有使用到 NGINX，此解顯然並非這次遇到的問題

<br>

## Cloudflare 緩存問題

爬文發現有人提到可能是 Cloudflare 緩存的問題

在 Rule -> Page Rules -> Create Page Rule

![2](https://i.imgur.com/N8gi01N.png)

之後再到 Caching -> Cache Rules -> Create rule

![3](https://i.imgur.com/TAkvVl3.png)

設定完後再上傳，成功迴避掉 413 問題!

<br>

# 新的問題

甜美的日子沒過多久  
雖然照著上述配置後，不會再出現 413 了，但..

![4](https://i.imgur.com/hHjLAns.png)

馬上就遇到新的錯誤了 QQ...

這個問題問 google 大神也沒甚麼好辦法  
沒辦法囉，只好再次自己動手檢查

## 測試過程

Error Log 只寫了網路問題，偶而會提示

```
{"message":"A listener indicated an asynchronous response by returning true, but the message channel closed before a response was received"}
```

猜測是 Cloudflare 提早關閉了連線

有趣的是只要同時下載檔案，上傳不會失敗

開啟 Cloudflare Development Mode ，上傳失敗

## Cloudflare 免費版限制

![5](https://i.imgur.com/lm8M9jc.png)

Cloudflare 免費版用戶上傳檔案時，有著 100MB 的上限

Alist 僅支援單檔上傳  
[github issue](https://github.com/alist-org/alist/issues/5176)

想來或許就是在這關上卡住了

如開發者所說， Alist 的上傳存在一定的缺陷

就算不使用 Cloudflare，直連上傳過大的檔案也有機會失敗

好在除此之外功能正常，頂多不透過網頁，自行額外實現上傳方法即可(Ex:webdav/ftp/nasGui/local..)

<br>

---

文章參考:  
https://lanwp.org/12-cloudreve-nextcloud-alist-and-cloudflare_cdn/