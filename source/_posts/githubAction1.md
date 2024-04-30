---
toc: true
title: Github Action 學習紀錄
date: 2024-04-30 15:00:00
tags: [github, CI/CD]
categories:
  - [程式簡記]
---

# Auto-Pixai

![auto-pixai](https://raw.githubusercontent.com/Mr-Smilin/Auto-Pixai/main/public/pic/logo.png)

之前撰寫的 [auto-pixai](https://github.com/Mr-Smilin/auto-pixai)  
經過多次調整，基本修復了大部分的 bug

該專案透過爬蟲，  
提供自動在 [pixai](https://pixai.art) 簽到的功能

考量到便利性，  
將專案打包成 docker image，  
實現無狀態的部屬環境，  
最後透過 github tag 控制版本歷程。

<br>

## 整合部屬需求

雖然 User 用起來是方便了，  
但每次開發部版都需要進行複雜的手續..

CI/CD ...好..好想要 CI/CD 阿..  
就在這麼想著的時候，想起了..

**Github Action!**

<!-- more -->

<br>

# Github Action

![Github Action!](/img/post/githubAction1/01.png)

Github Action 是 Github 提供的 CI/CD 方案

由 Github 提供整合環境，  
在統一的無狀態環境下進行整合

最重要的是，它對於 public repository 完全免費!

[Github Action 官方簡中文檔](https://docs.github.com/zh/actions/quickstart)  
在學習 github action 的過程，  
官方文檔幫助了我許多

因為有官方翻譯，在專有名詞的學習上也不容易被混淆。

<br>

## 需求?

![](/img/post/githubAction1/02.jpg)

做為 CI/CD (自動整合/自動部屬) 的角色，  
我希望他可以在我推送 release 的時候，去做幾件事——

- 根據 package.json 檢查版本
- 自動創建新版本代號
- 根據 Dockerfile 產出 Docker image
- 將 image 標上版號，推至 Docker Hub

並且由於 Github Action 還提供緩存功能，  
如果將 `npm install` 拉到 Github Action，  
搭配緩存可以有效縮短 Dockerfile 的產出時間與大小！

配上 Github Action 的一些格式後，我們還需要——

- 指定 `node` 版本
- 緩存儲存 `node_modules`
- 緩存加載 `node_modules`

根據[官方文檔](https://docs.github.com/zh/actions/using-workflows/caching-dependencies-to-speed-up-workflows)所述，  
7 天沒使用的 cache 會自動回收，  
並且一個 repository 的所有 cache 加總不可超出 10GB  

```
- name: Cache node modules
        id: cache-node-modules
        uses: actions/cache@v3
        with:
          path: node_modules
          key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
          restore-keys: |
            ${{ runner.os }}-node-
```

根據 package-lock.json 的變動來決定是否新建緩存，  
否則就取出原本的 node_modules，  
以此加速 CD 流程。

<br>

## 過程

![](/img/post/githubAction1/03.jpg)

搭啷，經過整理後，  
這是目前的 CI/CD 流程

由於沒有實作測試，  
僅有 release 被推送時需要 CI/CD

執行首先檢查 tag ，  
若 package 版號有變動則創建新版本

同時進行 cache 的載入，  
若是找不到 cache 則重新 `npm install`

兩邊都做完後，  
進行 Dockerfile 的 building 與 pushing。

<br>

## 結果

大功告成！原本繁瑣的整合部屬流程

- Push New Version
- Dockerfile build
- Docker image tag
- Docker push tag
- Docker push latest
- ...

上面列的事情 **通通不用**

只要在 main 寫完代碼，  
要推送版本的時候合併到 release，  
最後再用自動產生的 tag 生成 Release 說明即可。

<br>

# 結語

怎麼說呢...好爽

不過所謂爬蟲簽到甚麼的，  
說白了只是個小工具

藉著這次 project，  
心血來潮地想把 repository 弄得有模有樣

結果就是，  
花在打扮(?)外觀的時間遠遠超出了爬蟲本身的開發時間

感覺對 CICD 有了更深刻的了解；  
美中不足的大概是爬蟲的測試並不好寫，  
沒能在這次 action 中寫入自動測試，是比較可惜的。
