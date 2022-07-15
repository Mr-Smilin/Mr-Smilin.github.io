---
title: Day21 - 認識GitHub
date: 2020-09-21 09:27:40
tags: [node.js,bot,discord,discord.js,教學,12th鐵人賽]
categories:
  - [鐵人賽, 用Node.js製作後台零負擔的DiscordBot]
---
今天想先說該怎麼把專案推上github，可以順便複習與heroku配套的git指令

<!-- more -->

heroku會用到git是因為heroku推程序這個動作跟github一樣，都是將專案推到網路上某個地方，推到github或heroku的差別而已

既然如此，heroku理所當然也可以做到跟github一樣的事情
那又為什麼還要額外放在github呢?

# GitHub

![21-1](https://i.imgur.com/J0tiaEH.png)

GitHub是基於Git語言的開源專案庫
他提供任何人將自己的程序打包成專案，透過Git推上GitHub進行開發&版本紀錄
GitHub對開源有著良好的圖形介面支持，所有人都可以在GitHub上看到對方的專案，並且提出協作要求、讓多位工程師來協同完成一件專案

一言以蔽之、將我們的機器人推上GitHub就像是展示你自己的作品，讓所有人都看的到你做過哪些東西，又是何時更新、更新了甚麼，是資訊人要讓人了解自己最快速的一步

推GitHub專案雖然也要使用Git語言，但因為GitHub是圍繞著Git開發的網站，其對Git語言的支援十分強大，除了網站本身按一按就能把專案推上去以外，他還推出了專案管理的圖形使用者介面

# GitHub Desktop

https://desktop.github.com/
請點擊連結並且下載GitHub Desktop

![21-2](https://i.imgur.com/rIGrdAg.png)

安裝完開啟後會要求你登入，請直接登入
可以選擇亮或暗主題
一開始會問你要不要直接新增專案，請拒絕，想辦法進到這個畫面 

![21-3](https://i.imgur.com/1YNrkrT.png)

點擊左上角，拉出Add下拉框，點開後有個Create new repository

![21-4](https://i.imgur.com/ZAwEqcQ.png)

這是新增一個新專案，點下去後他會先要你選擇本機上的路徑

![21-5](https://i.imgur.com/bj3clLV.png)

第一個是資料夾名稱，我們取DiscordBot
第二個是專案簡介，可以隨便寫、但注意不要太多，一行就好
第三個是路徑，請放在原專案外面
Initialize this repository with a README記得打勾
下面兩個是使用語言之類的，這部份GitHub上傳後會自動判斷，可以不管

都好了之後我們按…..不對!還不能按Create repository!
我們先進到專案資料夾

![21-6](https://i.imgur.com/G02dXTW.png)

我們把.git資料夾改名成Herokugit
如果看不到.git資料夾請上網查一下怎麼看到隱藏資料夾

![21-7](https://i.imgur.com/g4EsJIR.png)

好了之後我們回去按Create repository
按完會發現資料夾內多了

README.md
.gitattributes
.git
 
![21-8](https://i.imgur.com/r8bUU7S.png)

記得我們一開始建Heroku有提到嗎，只要是Git專案都會有.git檔案
因為使用Heroku的同時，他就是屬於Heroku的專案了，我們如果也要推上GitHub的話，就要先讓他不是Heroku的專案，不然會覆蓋掉!

然後我們新增一個.gitignore，注意沒有副檔名喔

![21-9](https://i.imgur.com/HWtBE6s.png)

![21-10](https://i.imgur.com/JbUJatt.png)

```
auth.json
.gitignore
Herokugit
```

這是給GitHub看的文件，可以讓GitHub在將專案commit前，選擇要忽略哪些檔案
我們的私密資料都在auth.json，所以auth.json自然不能推到任何人都能看得GitHub上
Herokugit是讓GitHub不會上傳到Heroku的.git檔案

![21-11](https://i.imgur.com/CeXOZni.png)

這時我們回到GitHubDesktop，可以看到左下角告訴你，專案commit好了，並且版號是init(初始化)

在宣告一個新專案庫時，相當於他幫你下了

git add .
git commit init

這兩個指令，我們可以點左上角的history看到我們有哪些檔案被commit，只要等等再下push就會被推上網際網路

那我們點一下右上角的Publish repository

![21-12](https://i.imgur.com/8oMDTIu.png)

第一次push時會有像這樣的提示框，他會二次確認你在GitHub上的專案要叫甚麼名字

Keep this code private打勾的話，這個專案就會是私人的，只有你登錄帳號時看的見
我們希望程序是可以被人看見的，所以我們要把打勾取消掉

好了之後我們點Publish repository，他就會開始上傳專案，第一次比較久，我們等一下，可以去到杯水再回來看看

![21-13](https://i.imgur.com/2UQueAh.png)

畫面長這樣就是成功了，左下角的commit消失(被推上去)

![21-14](https://i.imgur.com/RZ42yiU.png)

History可以看到我們的歷史版本，以及做了那些變動
