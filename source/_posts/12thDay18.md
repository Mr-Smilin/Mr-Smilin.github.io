---
title: Day18 - GAS抓表(2)
date: 2020-09-18 09:17:51
tags: [node.js,bot,discord,discord.js,教學,12th鐵人賽]
categories:
  - [鐵人賽, 用Node.js製作後台零負擔的DiscordBot]
---
昨天我們在雲端上建好了試算表
將GAS發布成API的GET方法，只要我們訪問就能成功獲取試算表資料

<!-- more -->

今天我們來寫點程式

我們來回顧一下，目前機器人在Message下可以做到的事情

- 文字回應
- 音樂系統

我們希望增加一個可以針對表格內容，動態觸發回應的功能
這種功能因為不會直接知道有哪些指令，應該要是沒有前綴字的，只要字串符合就會觸發

由此可知，我們應該要將這個方法添加在所有功能的最底層
只有當前綴字都不符合時，才會來辨識表格資料

觀念大致帶過，我們開始動手

先幫我在專案目錄下建立一個Script資料夾，在裡面放一個GetGas.js

![18-1](https://i.imgur.com/OJB3z4l.png)

```
//#region 全域引用
const auth = require('../JSONHome/auth.json');
const request = require('request');

//#endregion

```

裡面請先幫我引用auth.json跟request

auth目前只有存放機器人的key，跟key一樣，我們不希望自己與GAS串接的API暴露&寫死在程式裡面，所以之後要把連結寫在auth，之後透過auth來讀取連結
務必注意引用auth的路徑比bot.js多了一個點，這是因為GetGas.js要先從Script路徑出來才找的到JSONHome。

request是提供給js的網路請求library，我們之後都會透過他來傳遞Get方法

![18-2](https://i.imgur.com/pwcJ7OJ.png)

auth.json目前的樣子

在原本的Key後面加上一個逗號，然後新增Gas參數，內涵一個JsonObject{}
{}裡面再包一個Get參數，內涵一個JsonArray[]
第一個JsonObject內包一個baseExcel參數
baseExcel參數會帶回我們昨天做的API連結

包三層是為了增加程式含意，方便之後閱讀
跟Get同一層之後可以再添加post等
不過Get原本是包JsonObject就好，這邊為了多介紹JsonArray所以用了，原本就會的同學可以少包Array

這種架構下，如果我們要獲取Url就會是
auth.Gas.Get[0].baseExcel

![18-3](https://i.imgur.com/YcsHJpa.png)

```
//#region 宣告請求
const baseExcel = {
    'method': 'GET',
    'url': auth.Gas.Get[0].baseExcel,
    'headers': {}
};

//#endregion
```

再來我們宣告一個baseExcel常數，將http請求需要的參數帶給他
method表示我們使用的是Get方法
url就帶我們剛剛寫好的url
headers是傳送時的表頭，這邊放空值就好

![18-4](https://i.imgur.com/8v4kmCE.png)

```
//#region 傳送請求
exports.getBaseExcel = function(userTalk, callback) {
    let backValue = new Array;
    request(baseExcel, function(error, response) {
        try {
            if (error) {
                callback(error);
            } else {
                const data = JSON.parse(response.body); //接收回傳(response)的body
                const keysValue = Object.keys(data); //將JsonObject的key值輸出成Array
                //迴圈判斷是否符合
                for (let i = 0; i < keysValue.length; i++) {
                    if (data[keysValue[i]].NAME === userTalk) {
                        callback(data[keysValue[i]].VALUE); //正確回傳結果
                    }
                }
                callback(false);
            }
        } catch (err) {
            console.log('getBaseExcelError', err);
            callback('getBaseExcelError');
        }
    });
};

//#endregion
```

最後我們實際創建一個callback方法，供外部調用
http請求後，將回傳值定義為JSON給data
之後讓data跑迴圈，判斷message是否與表格的NAME欄相符
叫到名字的話，機器人就要回傳VALUE值

這樣我們就把GetGas.js做好了，剩下bot.js呼叫與傳送訊息的部分
我們明天繼續
