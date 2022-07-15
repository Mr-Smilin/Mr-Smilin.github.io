---
title: Day19 - GAS抓表(3)
date: 2020-09-19 20:00:43
tags: [node.js,bot,discord,discord.js,教學,12th鐵人賽]
categories:
  - [鐵人賽, 用Node.js製作後台零負擔的DiscordBot]
---
昨天我們的程式成功抓到API的資料並且對他做分析了
現在要串回主程序(bot.js)上

<!-- more -->

![19-1](https://i.imgur.com/lLXAqcN.png)

請幫我在bot.js引用GetGas.js

![19-2](https://i.imgur.com/mwE3NRg.png)

![19-3](https://i.imgur.com/xMGI9Fa.png) 

然後之前的文字回應系統，跟音樂系統一樣用一個function包起來，比較好看

![19-4](https://i.imgur.com/uvfVZ2Q.png)

我們希望當訊息不符合任一前綴系統的情況，就要拿字串跟資料庫比對
所以我們把function放在default(默認)，只要前面的case都沒進去就會到default

![19-5](https://i.imgur.com/N0R0NAW.png) 

之後新增BaseExcelFunction方法
內容是執行GetGas底下的getBaseExcel元素

![19-6](https://i.imgur.com/lg1t1wq.png)

回來看GetGas的getBaseExcel
getBaseExcel元素指向一callback方法
帶了一個參數userTalk，callback方法使用callback代表方法的結束，呼叫方會在callback欄位宣告function，其帶回參數(messageED)就是getBaseExcel的方法中callback的值

![19-7](https://i.imgur.com/XXBAW5u.png)

這樣寫完，機器人就能做簡單的回話了!

---

雖然功能做好了，但有許多問題

依嚴重性依序列舉的話

1.	bot每從discord收到一則訊息就會使用一次API
2.	使用JsonObject做迴圈查詢十分沒有效率
3.	缺乏防呆&參數替換

理論上，機器人對對應的詞句回話這個動作是即時的，透過這個寫法，我們每次查詢API都必須等待2~3秒的時間，API才會將結果反饋給bot
而且多次傳送API不僅降低了程序的穩定，也要考慮GAS提供的每日配額
如果bot所在的群組一天訊息超過2萬筆，API就一定會被花光，而一天兩萬筆訊息、對於一個支援多群組的bot來說其實並不困難

GetGas中對於data的處理方式也是極其低效的，雖然在捨棄SQL這種專為優化資料存取的系統時，就難以追求最高效的方法，但目前的做法也仍是相對低效的

以及程序目前只是簡單的判A給B，功能十分單一
我沒辦法針對特定群組，有該群組專屬的詞彙，或是對特定回應帶tag等

明天我們會將程序做一次翻新
