---
title: Day4 - 機器人的家
date: 2020-09-04 09:03:30
tags: [node.js,bot,discord,discord.js,教學,12th鐵人賽]
categories:
  - [鐵人賽, 用Node.js製作後台零負擔的DiscordBot]
---
昨天我們成功創建了自己的機器人並且加入群組

<!-- more -->

![4-1](https://i.imgur.com/4nFmZyM.png)

可是機器人加入後怎麼都在睡覺，我怎麼找不到地方操作呢?

那是因為我們昨天做的事情是在Discord申請一個機器人帳戶而已~
就像我們的Discord帳戶需要透過Discord登入，Bot其實也需要登入喔

不過Bot的登入路口是要”自己寫”的，今天我們就來叫機器人起床吧!

-----

# 環境安裝

首先請確保你已經安裝

Node.js
[安裝教學](https://ithelp.ithome.com.tw/articles/10199058)

Node.js是我們機器人會使用到的後端語言
Node.js屬於弱型別語言，相較於其他語言，Node.js編譯前的限制較少，寫起來通常會感到較為自由
不過如果對於自己寫的東西不夠了解，弱型別語言並不一定能幫你抓出問題，導致你的問題直到實際運行時才會發生；
所以使用Node.js時、知道自己寫的東西具備甚麼效果是重要的

VSCode
[下載路徑](https://code.visualstudio.com/)
[中文化教學](https://wcc723.github.io/development/2019/12/01/vscode-chinese/)

VSCode是筆者愛用的編輯器
VSCode本身體積很小，同時又支援許多的擴充套件，上面的中文化教學正是其中之一
因此VSCode可以輕鬆的做到客製化，且不改變他的體積簡約。

如果同學們原本就有在使用的編輯器，VSCode可以跳過不安裝

-----

# 蓋一個機器人的家

首先我們要先替機器人做一個”家”，我們先在自己喜歡的地方建一個資料夾，名字先取作DiscordBot就可以了

![4-2](https://i.imgur.com/62P5P4i.png)

一個機器人的家裡面，我們基本需要…
機器人的工具箱(node_modules)
機器人與工具箱的說明書(package.json)
一隻機器人本體(bot.js)
門牌號碼(auth.json)
![4-3](https://i.imgur.com/vohV8ms.png)

像這樣子
(看到package-lock.json是你業障重，別刪掉也別管他)

其中，node_modules跟package.json是透過node.js自動生成的，要生成這兩個東西，我們需要先在DiscordBot這個資料夾打開vscode

![4-4](https://i.imgur.com/WP2M2GQ.png)
![4-5](https://i.imgur.com/FFxXcMQ.png)

成功的話，左邊的路徑就會顯示資料夾名稱喔!
然後選擇上方的開啟終端機->新增終端
確認終端上面顯示的路徑是正確的後，在終端上面鍵入npm init

![4-6](https://i.imgur.com/mZhlOAv.png)

這是node的初始化行為
會要你輸入一些關於這個project的基本資料，之後輸出在package.json  

![4-7](https://i.imgur.com/d095eIo.png)

就像這樣!

然後我們再手動創建bot.js檔與auth.json檔

![4-8](https://i.imgur.com/gE4hfc7.png)

![4-9](https://i.imgur.com/ObeweYi.png)

如果說bot.js是機器人的本體，那auth.json就是機器人的內部授權碼
auth.json裡面的key代表的是機器人的啟動鑰匙，把鑰匙插進對應的地方才能啟動(有找到bot.js裡面有一行auth.key嗎?)

這邊我們把昨天在bot頁存下來的key放到your key value裡面，注意不要刪掉””

兩個檔案都創建好後記得存檔，我們回到終端機輸入
npm install discord.js

![4-10](https://i.imgur.com/hbEYTK9.png)

![4-11](https://i.imgur.com/nIETLkm.png)

輸入 npm install discord.js後，node.js就會幫我們安裝discord.js這個工具
然後把檔案放在node_modules裡面，再到package.json底下紀錄我們使用了哪些工具

沒問題的話，最後我們在終端機輸入node bot

![4-12](https://i.imgur.com/yEANgJU.png)

![4-13](https://i.imgur.com/1Q4C2Q4.png)

成功!明天我們會再針對今天的程式碼做講解
