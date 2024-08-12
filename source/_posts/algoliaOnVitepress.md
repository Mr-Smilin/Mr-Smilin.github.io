---
title: 關於 algolia 在 vitepress 集成，踩雷過程
toc: true
date: 2024-08-12 17:00:00
tags: [node.js, vitepress, algolia, 活俠傳]
categories:
  - [LoM-wiki]
---

![](/img/post/algoliaOnVitepress/01.jpg)

因為想增強網站的搜尋力度，希望連文章的內文都可以搜索到  
剛好 `vitepress` 是支援 `algolia` 的，試著配置  
不料遇到的問題比想像的多，網路上的教學像是缺了幾塊拼圖似的  
索性趁著剛完成腦袋還熱呼的現在，記錄一下遇到的問題。

<!-- more -->

---

## 官方文檔

首先我們看到 [vitepress 的文檔](https://vitepress.dev/zh/reference/default-theme-search#algolia-search)

![](/img/post/algoliaOnVitepress/02.jpg)

去 `Algolia` 申請 `api`，然後填入，完成  
恩，看起來挺簡單的，再看看 [Algolia 怎麼說](https://docsearch.algolia.com/apply)

![](/img/post/algoliaOnVitepress/03.jpg)

註冊完後，我們審核完畢就會寄信到你的信箱，裡面可以拿到 `apikey`  
恩...這邊也很方便阿，註冊完等大概五分鐘就收到信了

```Markdown
Hi there 👋

Thanks for your interest and trust in Algolia DocSearch.
 We've received your request for https://smilin.net/LoM-wiki/, and will get back to you soon.

DocSearch is built in two parts:
- A crawler which we run in our own infrastructure every week (configurable). It follows every link in your website and extracts content from every page it traverses. It then pushes this content to an Algolia index. (Read more: https://www.algolia.com/doc/tools/crawler/getting-started/overview/ )
- A JavaScript snippet to be inserted in your website that will bind this Algolia index to your search input and display its results in a modal UI. (Read more: https://github.com/algolia/docsearch )

If you want to find more details on how DocSearch works, take a look at the docs: https://docsearch.algolia.com/

Meanwhile, let us know if you have any other questions.

Have a great day,
The DocSearch team.

DocSearch is powered by Algolia. See more at https://www.algolia.com/
```

大意是說 `algolia` 分成兩個部分

- 他們會配置爬蟲，每周瀏覽網站
- 為了使用 `algolia`，必須在網站配置他們的 `js`

第一部份 `algolia` 會協助，第二部份也有 `vitepress` 集成，一切看起來都很美好

但是去 `algolia` 後台要拿 `api` 的時候，問題來了。

---

## 問題？

![](/img/post/algoliaOnVitepress/04.jpg)

(註：由於筆者已經踩完雷了，圖中是已解決的樣子)

只要進入後台，他就會彈出 `Get Start`  
大意是要求我們自己寫爬蟲讀取自己網站的資料，然後透過他們的工具上傳給 `algolia`

不對呀？爬蟲的部份`algolia`不是幫我們做好了嗎？  
上網找了下，其他人似乎沒有遇到這個狀況，甚至可以在後台要求 `algolia` 主動重爬

恩...回頭去看信中的第一點，點進他提供的網址，看看爬蟲相關的問題

![](/img/post/algoliaOnVitepress/05.jpg)

痾，原來你們家的爬蟲不支援免費仔了啊

那沒辦法，畢竟爬蟲也是要資源的，只好自己搞。

---

## github action

由於筆者的網站放在 `github` 上  
想到要寫 for 網站的爬蟲後，第一時間想到的就是 `action` 啦

```yml
name: Algolia DocSearch Scraper
on:
  push:
    branches: [release-algolia]

jobs:
  scrape:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2

      - name: Prepare Algolia DocSearch config
        run: |
          echo '${{ secrets.ALGOLIA_CONFIG }}' > config.json
          cat config.json

      - name: Run DocSearch Scraper
        env:
          APPLICATION_ID: ${{ secrets.ALGOLIA_ID }}
          API_KEY: ${{ secrets.ALGOLIA_KEY }}
        run: |
          docker run \
            -e APPLICATION_ID=$APPLICATION_ID \
            -e API_KEY=$API_KEY \
            -e CONFIG="$(cat config.json | jq -c .)" \
            algolia/docsearch-scraper
```

透過 `action` 執行 `algolia/docsearch-scraper`  
`id`跟`key`可以在前面的`algolia後台`獲得  
`ALGOLIA_CONFIG` 則是爬蟲的相關 `config`，設置方式可以[參考這裡](https://docsearch.algolia.com/docs/legacy/config-file/)

全都必須放在 `Repository secrets`，根據使用的環境不同，載入環境變量的方式略有差異

以上做完，`action`成功執行後，`algolia`上就會有資料囉

---

## 後續步驟

![](/img/post/algoliaOnVitepress/06.jpg)

前面爬完資料，第一步會自動打勾  
由於我們的前端都由 `vitepress` 自動配置好了，剩下三步驟並不需要設定，一直送出讓他打勾就好

![](/img/post/algoliaOnVitepress/07.jpg)

終於來到後台，依序點選 Search -> CONFIGURE -> Index  
找到 `Create Index` ，輸入 `IndexName`  
這裡設定的，就是最前面`vitepress`要求輸入的第三個參數

![](/img/post/algoliaOnVitepress/01.jpg)

都設定完畢，網頁的搜尋功能連內文都可以搜到，更加強大囉～

---

## 閒談

文中提到使用 `vitepress` 的網站是 [活俠傳 wiki](https://smilin.net/LoM-wiki/)，也是最近筆者在休息時間把玩的小專案  
網站在 `2024-07-01` 建立，當時是打算在這寫點文章的，恰巧近期工作也忙，沒甚麼時間更新這邊  
其實連這篇文都更新的很吃力，不過想了想，過幾天恐怕連怎麼寫這篇文都不知道，還是寫吧 xD

建立這個網站，一方面是我自己對`vue + vite`體系全家桶不太熟悉，趁機學習  
另一方面是活俠傳真的很好玩，這邊推薦大家都可以去玩。

關於`wiki`的建立心路歷程甚麼的，之後會再另外寫一篇的  
很感謝同樣喜歡活俠傳的朋友，願意一同維護這個 `wiki`，也歡迎志同道合的新夥伴加入。

<br>
