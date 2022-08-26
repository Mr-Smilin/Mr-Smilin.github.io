---
toc: true
title: Day9 - 註解摺疊與音樂系統介紹
date: 2020-09-09 10:21:54
tags: [node.js,bot,discord,discord.js,教學,12th鐵人賽]
categories:
  - [鐵人賽, 用Node.js製作後台零負擔的DiscordBot]
---
昨天我們把機器人的架構做了些修改，對功能做了分類
今天我們稍微整理一下程式，並且說說音樂系統；
如果正在觀看文章的小夥伴不需要音樂系統可以跳過接下來三天的內容，不會影響後續教學的!

<!-- more -->

# region

![9-1](https://i.imgur.com/oZB8tKp.png)

開始寫音樂前，因為程式碼準備要開始增加了
筆者先對所有程式做了分類
#region
#endregion
被這兩段覆蓋的程式碼可以摺疊，摺疊後只看的到region後的字

![9-2](https://i.imgur.com/w6UlfLn.png)

這個功能必須IDE有支援才可以使用，VSCode支援這個好用的收納方法，所以我們就好好利用一下!

---

# 函式庫安裝

那麼我們準備要開始音樂功能了喔!
在正式開始撰寫前，我們先開啟終端機
依序安裝
npm install ffmpeg-static
npm install opusscript
跟
npm install ytdl-core

![9-3](https://i.imgur.com/zYAoHnj.png)

記得路徑要在project的根目錄下

這些都是discordBot要播放音樂時需要的插件
其中ytdl-core是後續抓取youtube歌曲的library，會需要透過程式來調用
所以安裝完之後，我們還要在最上面引用ytdl-core

![9-4](https://i.imgur.com/zyCqZa8.png)

這樣一來，撰寫音樂系統的前置作業都算完成了!
那麼接下來就該開始撰寫程式囉?nonono

實際上我們在撰寫程式前應該先去參考網路上是否有重複的功能可以參考

既然要寫音樂系統，那當然必需先參考其他人的音樂機器人是怎麼寫的囉!

---

# 音樂系統整理

Discord 教學 - 如何簡單加音樂機器人進伺服器 (Rythm)
https://fightwennote.blogspot.com/2018/06/discord-rythm.html

Rythm是筆者在研究音樂系統前，看過最多次的音樂Bot
Rythm的功能非常完善，觀察他的指令對於描繪心目中那個接收音樂指令的Bot架構十分有幫助

![9-5](https://i.imgur.com/INTGTOT.png)

![9-6](https://i.imgur.com/sIgLCsj.png)

!play (網址)

提供youtube音樂的網址，bot需判斷網址是否符合規範，是不是抓得到歌
並且判斷使用者是不是在語音頻道，一切都正常無誤後反饋音樂資訊並且播放歌曲

![9-7](https://i.imgur.com/XNDlGTj.png)

!replay

輸入此指令後，讓歌曲重頭開始播放
與play一樣，如果使用者不在音樂頻道中，則此指令失效

![9-8](https://i.imgur.com/rHmPN8m.png)

!np 

顯示當前播放歌曲資訊

![9-9](https://i.imgur.com/wqhXg2H.png)

!queue

顯示歌曲清單

![9-10](https://i.imgur.com/mfzApM9.png)

!skip

跳過當前播放曲目

---

其他還有循環播放，單曲循環，請機器人退出語音廳等…

我們大概知道了，一個音樂系統需要
前綴詞(!)，表示我現在下的指令是音樂系統

音樂指令(play)，表示我在音樂系統中要使用哪一個功能

內容(xxx.com.tw)，不是一定會有，當指定功能需要參數時，我們需要給予他對應的內容

間隔符號(空格) 用來將音樂指令與內容分隔開的決定性符號

![9-11](https://i.imgur.com/J7cWTuc.png)