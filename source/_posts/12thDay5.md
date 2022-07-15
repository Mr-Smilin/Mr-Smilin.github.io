---
title: Day5 - 函式庫文檔與基本範例講解
date: 2020-09-05 16:23:35
tags: [node.js,bot,discord,discord.js,教學,12th鐵人賽]
categories:
  - [鐵人賽, 用Node.js製作後台零負擔的DiscordBot]
---
昨天我們成功叫醒了自己的兒子/女兒

在繼續教育小孩(增加功能)前，今天想說說昨天安裝的discord.js這個工具

<!-- more -->

該怎麼使用，以及應用後的例子

discord.js是node.js中的一個library，也就是其他人寫好的程式集
我們可以安裝他人發佈的程式並且引用，進而降低開發的難度與作業性

https://discord.js.org/#/

這是discord.js的文檔庫，裡面有此庫作者撰寫的使用說明，涵蓋了從以前到現在的發行版本，以及各種小細節

進來後，我們點擊最下面的Get Started

![5-1](https://i.imgur.com/lzlZZCz.png)

左側是discord.js的可用資源與方法，預設會在welcome頁面，這裡會介紹discord.js的功能與基本知識，我們先往下拉到 Example usage

![5-2](https://i.imgur.com/yAsK0m7.png)

這是discord.js的基本範例，拿來跟昨天的bot.js比對一下，是不是完全一樣呢?
只是範例中的 client.login(‘token’); 被我拉上去了；

這是因為在筆者的腦中，給機器人輸入key值是最優先的事情，再來依次進入ready(登入完成)->message(訊息接收)…不然各區塊的上下順序在這邊其實是沒有差別的。

![5-3](https://i.imgur.com/JJAMzjd.png)

下面說回來目前bot.js每一行的功效
```
const Discord = require('discord.js');
```
這行的意思是引用discord.js這個工具，然後賦予到Discord這個常數(const)上
之後如果要引用discord.js的程式碼，都可以直接調用Discord來實現!
```
const client = new Discord.Client();
```
新宣告一個 Discord(discord.js)下的Client方法，然後將Client方法的結果賦予到client這個常數上
之後如果要引用discord.js底下的Client，可以直接呼叫client。

這邊我們額外從Discord中拉出Client()是因為這個client是要用來當bot本體的，也就是我們的遙控器(x
```
const auth = require('./auth.json');
```
引用同目錄(./)下的auth.json，賦予給auth這個常數
之後想調用auth.json底下的資源，可以直接呼叫auth。
```
client.login(auth.key);
```
執行client的登入行為，登入的key我們放入bot的key
```
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});
```
執行client的監聽(on)行為，要監聽的事件是ready(準備完成)
只要client收到ready事件，就執行右邊的箭頭函式( () => {} )
箭頭函式的內容為
```
console.log(`Logged in as ${client.user.tag}!`);
```
在控制台打印(console.log) 出字串 Logged in as ${client.user.tag}!
Logged in as就是單純的字串
其中client.user.tag，我們可以從小數點來了解到，user是client底下的一個可用變數，tag則是user底下的一個可用變數
最後輸出的結果就是機器人的名字與id
如果要仔細了解client的內容物，可以將console.log裡面的東西改成client看看
```
client.on('message', msg => {
    if (msg.content === 'ping') {
        msg.reply('pong');
    }
});
```
監聽client的message(收到訊息)事件，觸發後執行箭頭函式 msg =>{}

這邊的msg是每當client收到message時，discord.js會給予我們的變數，我們將變數稱作msg
因為discord.js會回傳的變數是固定的，如果我們這邊像上面一樣寫成() => {}的話，雖然也可以執行但就不會將discord.js回傳的值再做處理。
反過來說，如果我們宣告了msg1跟msg2兩個變數來接回傳值，因為discord.js的message事件並沒有給我們這麼多參數，所以msg2是接收不到東西的

那麼要怎麼知道message事件下到底回傳了哪些參數呢?
這就要用到剛剛說的discord.js使用說明書了

https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-message

![5-4](https://i.imgur.com/mtq2Iqi.png)

我們監聽message事件的說明在左側元素列表的client分類中的Events中可以找到，可以看到他回傳了 Message Type的變數，而這就是我們接收的內容。

繼續說箭頭函數內要做的事情
```
if (msg.content === 'ping') {
        msg.reply('pong');
    }
```
當msg變數底下的content元素，等於ping字串時，執行方法
```
msg.reply('pong');
```
使用msg底下的replay方法，並傳入pong字串。

以上的文言文翻譯過來就是
機器人(client)接收到訊息(message)的時候，去判斷訊息的內容(content)是不是ping
如果是，回傳pong(msg.reply)

![5-5](https://i.imgur.com/ZZr9Cqx.png)

先說到這，今天根據程式一行行做解釋，雖然很基本但對第一次觸碰這部分的人來說應該還是有點艱澀

請自行斟酌閱讀即可，明天我們說說如何讓機器人變得更聰明。
