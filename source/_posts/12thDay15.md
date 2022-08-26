---
toc: true
title: Day15 - Heroku架設&細部設定
date: 2020-09-15 18:20:11
tags: [node.js,bot,discord,discord.js,教學,12th鐵人賽]
categories:
  - [鐵人賽, 用Node.js製作後台零負擔的DiscordBot]
---
早安
昨天我們把Heroku跟Git都安裝好了，今天我們要將我們的專案變成Git專案
並且推上Heroku

<!-- more -->

# 第一次推送專案

首先，跟之前一樣
我們先用VSCode開啟專案資料夾

![15-1](https://i.imgur.com/ACltFP5.png)

確定終端機路徑正確後，輸入
git init

![15-2](https://i.imgur.com/7aVXFF2.png)

左側的檔案都變得綠綠的
如果你有看的到隱藏資料夾的話，在專案底下還會看到一個.git的隱藏資料夾
那就是用來識別git專案的檔案，也是執行git語言時的依據

這樣專案就轉換成git專案了，然後我們接下來要在heroku上創建一個專案庫
專案名稱的命名方式大多為 aaa-bbb-ccc
第一個字必須為小寫，且不能與其他在heroku上的專案撞名，所以越獨特越好
這邊筆者的專案名稱取做 the-bot-alice-on-heroku
我們輸入
heroku create 你的專案名稱

![15-3](https://i.imgur.com/rpv8elG.png)

這時候如果到這裡看，成功的話就會看到剛剛創建的專案了
https://dashboard.heroku.com/

![15-4](https://i.imgur.com/KXLt0MO.png)

我們繼續輸入

git add .
git commit -m init
git push heroku master

![15-5](https://i.imgur.com/FJAbH1V.png)

最後有看到Build succeeded就是成功了!
這三個指令的意思依序是

git add . 
將目錄下的所有檔案加入git控管

git commit -m init 
將git控管下的檔案全部加入本次要推送的版本，因為是第一次推送所以是init，之後第n次推送的話程式碼要改成 git commit -m ‘版本說明’

git push heroku master
將commit起來的版本推送(上傳)到heroku的主分支，總之就是上傳檔案

所以之後如果要更新程式，都是依序使用這三個命令來上傳機器人

接著我們運行看看
heroku logs –t

![15-6](https://i.imgur.com/BezAjQn.png)

這是呼叫heroku的控制後台，相當於在看遠端主機運行程序時的終端機
要退出時按ctrl+c退出

可以看到對方也接收到我們上傳的檔案，有一個Build succeeded
但是後面都是npm ERR
以及可以看到他嘗試使用 npm start 來運行我們的專案
還記得我們的程序啟動試透過甚麼方式嗎?
沒錯，node bot!

# 平台設定

我們在專案的根目錄新增一個檔案，取名叫做Procfile
 
![15-7](https://i.imgur.com/4Xl8BEd.png)

裡面只有一行，寫上
worker: node bot

可以看到，檔案在取名為Procfile後，icon會變成Heroku的標誌
這是Heroku可以辨識的檔案，作用是指定Heroku的啟動命令
worker是代表我們要運行的啟動命令是worker(程序)
heroku預設的啟動命令屬於web(網頁)

寫好後，我們再做一次推送
git add .
git commit -m ‘npm bot’
git push heroku master

![15-8](https://i.imgur.com/foAIKIR.png)

push完，我們打開網頁，回到heroku控制台，進入我們的專案

![15-9](https://i.imgur.com/gLPqwGs.png)

會看到，紅框處是我們的推送日誌，這也是用git來控管程式時的日誌檔

藍框就顯示了我們程序的啟動方式，可以看到node bot已經出現在上面了，但是沒有開啟

我們點擊紫框的Resources

![15-10](https://i.imgur.com/s2C5V61.png)

將 npm start給關閉，node bot開啟，這樣回去主頁面看node bot也會是開啟的狀態了

最後我們在終端機輸入 heroku restart

![15-11](https://i.imgur.com/10oZqCf.png)

這是重啟專案的指令，當程序崩潰或是遇到任何問題時，都可以重啟看看

heroku logs -t

![15-12](https://i.imgur.com/ZVirlHw.png) 

![15-13](https://i.imgur.com/SrXdjRa.png)

成功!
到此為止，我們成功將Bot推送到Heroku上，以後不用我們自己運行
機器人也會是24小時運行了，給做到這邊的自己一個鼓勵吧^^

# 其他設定

Heroku的免費時數預設是550小時/月，如果說是自己幾個朋友使用是沒關係
當機器人在一個人數比較多的群組時，550小時是沒辦法支撐1個月的，每到月底、機器人就會想休息幾天

但是!如果你有在Heroku的帳戶綁定信用卡的話，他會免費再給你450小時，每個月的免費時數會變成1000小時，運行機器人是完全足夠的!不用擔心會扣款

我們點選右上角的設定
 
![15-14](https://i.imgur.com/84iDGli.png)

點Billing，然後點Add credit card
 
![15-15](https://i.imgur.com/Rqh5IfU.png)

再來就是綁卡流程，相信這部份不用截圖，各位自己會的

![15-16](https://i.imgur.com/A1PkaAG.png)

綁完後，底下原本的550小時就會變成有1000小時的扣打了~
