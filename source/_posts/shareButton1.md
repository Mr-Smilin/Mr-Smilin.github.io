---
toc: true
title: 使用 AddToAny 分享箱，踩雷過程
date: 2024-04-23 18:00:00
tags: [hexo, addtoany]
categories:
  - [程式簡記]
---

![](/img/post/shareButton1/01.jpg)

網站之前有配置分享箱的系統，使用 [sharejs](https://github.com/overtrue/share.js) 依賴  
該依賴只要套上預設即可，十分方便

不過 sharejs 最新的 release 已經是 2016 年的事了...

實際上有些按鈕已經過時，無法使用

<!-- more -->

[關於本主題的分享箱適配](https://ppoffice.github.io/hexo-theme-icarus/Plugins/Share/icarus%E7%94%A8%E6%88%B7%E6%8C%87%E5%8D%97-%E5%88%86%E4%BA%AB%E6%8C%89%E9%92%AE)

icarus 本身是支援多種分享功能的  
由於 sharejs 停止維護，官方建議採用別的分享功能

<br>

---

# AddToAny

![addtoany](/img/post/shareButton1/addtoany_logo.svg)

看了一圈，決定改用 [AddToAny](https://www.addtoany.com)

其一是因為該插件支援的社群足夠多，有持續在維護

與 blog 代碼沒甚麼交集，自定義客製方便

<br>

---

# 踩雷過程

簡單選一下想要的按鈕，產出代碼後，扔進 jsx 內

到此就搞定了(超快~)，build 看下輸出

![](/img/post/shareButton1/02.jpg)

hmmm...為什麼會是一片空白呢？

<br>

---

## 沒有 CSS ?

看了一下，似乎是 css 沒有載入

不過 css 這些內容應該會隨著 js 一併輸出才對

花了些時間尋找問題，之後發現

![](/img/post/shareButton1/03.jpg)

原來是被瀏覽器擋住了，會被瀏覽器攔截主要有幾個可能性

- 混和內容(Mixed Content):  
  如果網站是透過 HTTPS 協定提供服務的，而嘗試載入的資源（如 page.js）使用的是 HTTP 鏈接，那麼這種「混合內容」可能會被現代瀏覽器封鎖。 確保所有外部載入的資源都使用 HTTPS 來避免這種問題。
- 安全策略(CSP):  
  瀏覽器可能會因為安全策略(Content Security Policy)而阻止某些腳本的載入。
- 跨域問題(CORS):  
  服務商有可能因為沒有提供適當的跨域策略(Cross-Origin Resource Sharing)，導致資源無法載入
- 廣告攔截器:  
  一些廣告攔截器或安全相關的瀏覽器擴充功能可能會阻止諸如 AddToAny 這樣的第三方服務。

由於我們網站跟 AddToAny 都是 https，第一點可以排除  
本站並沒有設置 CSP (目前沒有)  
AddToAny 這類插件沒處理好 CORS 的機率是很低的

簡單排除後，比較有可能的是被廣告攔截器擋住了

<br>

![](/img/post/shareButton1/04.jpg)

喔喔喔！總算出來了！

<br>

---

## 廣告攔截器

試了分享功能正常，就是按鈕有點多  
可能減少一些..之後客製 style...

恩..不過這樣好像沒有解決問題阿？

根據統計，全世界有至少**四成**的人口，常駐廣告攔截器在上網

只是我看的到而已，如果其他人看不到的話就沒意義了 qq

不過攔截的問題還算好解決，只要讓他不會被攔截就好了！(廢話)

方法很多，最簡單的是將原本被攔截的檔案納入網域下  
載入原本就是同域名下的資源，通常就能繞過限制了。

```
<script async src="https://static.addtoany.com/menu/page.js" defer={true}></script>
```

根據產出的代碼來看，主要是這個檔案需要拉進來

![](/img/post/shareButton1/05.jpg)

整理格式，創建一個 addtoany.js 放進去  
以 hexo 來說就是將 js 檔案放在 `themes/{theme_name}/source/js` 底下

之後回到 addtoany.jsx 修改來源

```
<script async src="/js/addtoany.js" defer={true}></script>
```

RUN！

![](/img/post/shareButton1/02.jpg)

失敗了！

![](/img/post/shareButton1/06.jpg)

載入失敗的檔案反而變多了！

<br>

---

## 更多的廣告

看了下失敗的內容，來源都是出自 addtoany.js，也就是剛剛新增的檔案

回頭翻代碼...

![](/img/post/shareButton1/07.jpg)

![](/img/post/shareButton1/08.jpg)

看來是原本的 page.js 引入了其他檔案  
然後其他檔案又被攔截了...

雖然有點亂，但還是好解決的

首先在 `source` 目錄新增 `addtoany` 資料夾  
將 `addtoany.js` 改名回 `page.js` ，放進 `addtoany` 資料夾  
原本 `addtoany.jsx` 的 script 也要修改

```
<script async src="/addtoany/page.js" defer={true}></script>
```

之後將三個攔截的檔案拷貝整理後，在 `source/addtoany` 創建同名檔案

然後..然後...  
然後在 `core.js` 引用了更多會被攔截的 url...

估計是進行一些第三方 icon 的載入等等...

<br>

---

<br>

# 結語

![](/img/post/shareButton1/09.jpg)

重新修改 `core.js` 的代碼，最終是成功了

但是  
修改已經壓縮過的代碼，過程是麻煩且沒營養的  
處理方法相當於暴力破解，也不排除往後產生其他 ERROR 的可能，故這邊不多贅述———

<br>

---

如果有幸你也在想辦法處理 AddToAny 的問題，又懶得架 cdn 等方式

這邊提供整理後的檔案，歡迎參考。

[addtoany.7z](/share_file/shareButton1/addtoany.7z)

MD5: `e4c6ac982c223e6449d1d962be077bfb`
SHA1: `a9cc39cc5e9a7d0854d63b15a4801829c1718efb`