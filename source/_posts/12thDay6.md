---
toc: false
title: Day6 - 防呆觀念
date: 2020-09-06 20:57:08
tags: [node.js,bot,discord,discord.js,教學,12th鐵人賽]
categories:
  - [鐵人賽, 用Node.js製作後台零負擔的DiscordBot]
---
昨天我們大致說明了關於bot.js的運作
今天對library文檔做一些補充，以及程序防呆概念

<!-- more -->

昨天我們介紹bot.js時，有提到client在監聽message事件時，會回傳一message物件

![6-1](https://i.imgur.com/72h5m9a.png)

我們將message物件取名為msg，並且從msg中撈出content來檢查訊息內容，用reply來回傳訊息到訊息原本的頻道。

這些功能都可以從library文檔中找到，我們開啟昨天的discord.js文檔，然後在左側的功能列表中找到Message

![6-2](https://i.imgur.com/UUCJ4Zw.png)

這就是client監聽事件後帶回給我們的物件了，左側是變數，右側是方法
可以看到content在左側，在右側可以找到reply

所以如果要對msg有進一步的調用，我們都必須來看文檔，了解這個library提供了哪些功能給開發者。


在前面，我多次強調client監聽，獲得message事件這件事情
discord.js的功能使用是基於物件，也就是想做到甚麼事情、要先了解這件事情該調用哪個物件合適

![6-3](https://i.imgur.com/g7wSDiK.png)

這是我們昨天使用的回傳訊息的方式，也是discord.js包好給我們的方式

![6-4](https://i.imgur.com/qsapj00.png)

這是透過message物件獲得他所屬的channel(頻道)物件，再指定我要從這個channel底下send(發送)我要發送的訊息。

除非原本要做的行為很簡單，以及需要tag訊息來源user，這種情況才會使用reply
不然正常我們是使用msg.channel.send，這種寫法就不會再在訊息前方自動tag使用者了，且傳入的內容也不局限於文字；
之後如果要新增甚麼功能，也都是依這個邏輯下去文檔尋找。

-----

讓我們回來到今天的主題，我們要稍微的修改一下我們的程式

![6-5](https://i.imgur.com/gSQ2dXd.png)

為了讓bot之後更好修改內容，我們將msg.reply統一改成msg.channel.send

![6-6](https://i.imgur.com/rTgjNW0.png)

眼尖的同學應該注意到了，筆者除了修改reply以外，還把pong改成ping了
這是為了後續的測試，同學們可以運行起來，看看效果

![6-7](https://i.imgur.com/myPjROx.png)

機器人的訊息傳送停不下來了!
這是因為機器人傳送訊息的同時，也代表著client會再接到一個message事件，這是機器人自己的訊息，同時他也觸發了機器人的下一個訊息回應，這就導致了無限迴圈

同學們可以先在終端機上面用ctrl+c來強制中止程序
![6-8](https://i.imgur.com/vr8LN0C.png)

那麼，我們該怎麼迴避這個問題呢?

- 讓程序的回應不要跟判斷的句子一樣
- 判斷訊息來源

第一種作法就是說改成像之前一樣ping回pong
因為判斷與觸發的句子不一樣，就不會有問題了
但如果之後程序變得龐大，或是我們的觸發與回應句可以供其他人添加的話，第一種作法就會比較沒辦法達成我們的需求

第二種作法就是在client監聽到message事件時，先判斷訊息來源是否符合條件，套在現在的問題的話就是我們要判斷是不是bot
這樣做，除了我們的程序不會再因為自己的話無限自閉以外，對於有多機器人的群組，也就不會去理會其他機器人的訊息了，大家各自服務。

![6-9](https://i.imgur.com/tKiHz04.png)

只要msg.member.user.bot這個參數是true，就代表訊息來自於機器人，不會再處理下面的事情，是不是很簡單呢?
