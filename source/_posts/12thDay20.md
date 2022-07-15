---
title: Day20 - GAS抓表(4)
date: 2020-09-20 10:26:24
tags: [node.js,bot,discord,discord.js,教學,12th鐵人賽]
categories:
  - [鐵人賽, 用Node.js製作後台零負擔的DiscordBot]
---
昨天我們成功把API跟程式做了連結，並且可以在dc使用

但從GAS到程序寫法都存在問題，今天筆者會一一修正

<!-- more -->

![20-1](https://i.imgur.com/fR5A15o.png)

首先請開啟GAS，這是我們目前的樣子

為了讓搜尋方式從JSONObject轉成JSONArray，第9~19行請改寫如下

![20-2](https://i.imgur.com/T9RPJMS.png)

重點在於宣告dataExport的時候，從{}變成了[]
這就是JSONObject跟JSONArray的差別了
{}表示JSONObject，而[]表示JSONArray

做好後我們跟上次一樣發布成網頁應用程式

![20-3](https://i.imgur.com/ilA3YVL.png)

以後要記得，只要想修改GAS，修改完就一定要發布，然後版本一定要+1
版本只會越來越高，如果選擇舊的版號的話，API是抓不到你最新的修改的喔!

成功改成JSONArray後，原本的寫法就不適用了，不過我們也不打算繼續使用舊的邏輯
先來整理目前程序接收到API後的邏輯

discord訊息事件觸發 -> 沒有前綴字，進入API字串比對 -> 比對完成，反饋結果 -> 將結果反饋回discord

這樣做最明顯的問題就是每有一個訊息事件，bot就要打一次API上去
花費的時間過長，容易增加bot錯誤
且沒有考量過GAS每日免費額度問題

那麼該怎麼解決這問題呢?其實也很簡單，只要讓抓取API的行為只要執行一次就好

整個DiscordBot，唯一只會執行一次的地方就在ready事件

![20-4](https://i.imgur.com/XBnoUg1.png)

當程序啟動，程序自動執行login方法，login成功就會收到唯一一次的ready

![20-5](https://i.imgur.com/xRZkc3k.png)

將原本在下面的API事件拉上ready，並且將messageED改成dataED
我們之後就不讓GetGas做字串比對了，只要幫我們打API並且整理好資料後反饋就好

![20-6](https://i.imgur.com/Tcb5HJq.png)

![20-7](https://i.imgur.com/lif9ZJN.png)

處理好上面後，做字串比對

![20-8](https://i.imgur.com/xSzaxE8.png)

```
//BaseExcel字串比對
function GetBaseExcelData(msg) {
    try {
        if (BaseExcelData) {
            const userMessage = msg.content;

            e = BaseExcelData.filter(element => {
                return element.NAME === userMessage;
            })

            if (e) return e[0].VALUE;
            else return false;
        }
    } catch (err) {
        console.log('GetBaseExcelDataError', err);
    }
}
```

然後將字串比對的function拉到原本請求API的地方

![20-9](https://i.imgur.com/jnV3w2k.png)

都完成後，我們試著執行看看

![20-10](https://i.imgur.com/Y4k84C8.png)

成了!
這樣我們的bot只在執行時會去取API
解決了GAS限制的問題，並且每次的讀寫速度也提升許多

到此，DiscordBot後台0負擔這個主題的基本設置大致說完了
這邊附上完整的教學專案
https://supr.link/MePIY

剩下十天會教一些額外的內容，例如昨天提到GAS的訊息應該是分群組的，音樂系統如何分群使用等，以及GitHub使用….如果讀者有想看的也可以留言給筆者知道，筆者會的話再做安排

最後我們將檔案推上Heroku，記得怎麼推嗎?

git add .
git commit -m ‘版本說明’
git push heroku master

