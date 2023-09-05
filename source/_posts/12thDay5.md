---
toc: false
title: Day5 - 函式庫文檔與基本範例講解
date: 2020-09-05 16:23:35
tags: [node.js, bot, discord, discord.js, 教學, 12th鐵人賽]
categories:
  - [鐵人賽, 用Node.js製作後台零負擔的DiscordBot]
---

昨天我們成功叫醒了自己的兒子/女兒

在繼續教育小孩(增加功能)前，今天想說說昨天安裝的 discord.js 這個工具

<!-- more -->

該怎麼使用，以及應用後的例子

discord.js 是 node.js 中的一個 library，也就是其他人寫好的程式集
我們可以安裝他人發佈的程式並且引用，進而降低開發的難度與作業性

https://discord.js.org/#/

這是 discord.js 的文檔庫，裡面有此庫作者撰寫的使用說明，涵蓋了從以前到現在的發行版本，以及各種小細節

進來後，我們點擊最下面的 Get Started

![5-1](https://i.imgur.com/lzlZZCz.png)

左側是 discord.js 的可用資源與方法，預設會在 welcome 頁面，這裡會介紹 discord.js 的功能與基本知識，我們先往下拉到 Example usage

![5-2](https://i.imgur.com/yAsK0m7.png)

這是 discord.js 的基本範例，拿來跟昨天的 bot.js 比對一下，是不是完全一樣呢?
只是範例中的 client.login(‘token’); 被我拉上去了；

這是因為在筆者的腦中，給機器人輸入 key 值是最優先的事情，再來依次進入 ready(登入完成)->message(訊息接收)…不然各區塊的上下順序在這邊其實是沒有差別的。

![5-3](https://i.imgur.com/JJAMzjd.png)

下面說回來目前 bot.js 每一行的功效

```
const Discord = require('discord.js');
```

這行的意思是引用 discord.js 這個工具，然後賦予到 Discord 這個常數(const)上
之後如果要引用 discord.js 的程式碼，都可以直接調用 Discord 來實現!

```
const client = new Discord.Client();
```

新宣告一個 Discord(discord.js)下的 Client 方法，然後將 Client 方法的結果賦予到 client 這個常數上
之後如果要引用 discord.js 底下的 Client，可以直接呼叫 client。

這邊我們額外從 Discord 中拉出 Client()是因為這個 client 是要用來當 bot 本體的，也就是我們的遙控器(x

```
const auth = require('./auth.json');
```

引用同目錄(./)下的 auth.json，賦予給 auth 這個常數
之後想調用 auth.json 底下的資源，可以直接呼叫 auth。

```
client.login(auth.key);
```

執行 client 的登入行為，登入的 key 我們放入 bot 的 key

```
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});
```

執行 client 的監聽(on)行為，要監聽的事件是 ready(準備完成)
只要 client 收到 ready 事件，就執行右邊的箭頭函式( () => {} )
箭頭函式的內容為

```
console.log(`Logged in as ${client.user.tag}!`);
```

在控制台打印(console.log) 出字串 Logged in as ${client.user.tag}!
Logged in as 就是單純的字串
其中 client.user.tag，我們可以從小數點來了解到，user 是 client 底下的一個可用變數，tag 則是 user 底下的一個可用變數
最後輸出的結果就是機器人的名字與 id
如果要仔細了解 client 的內容物，可以將 console.log 裡面的東西改成 client 看看

```
client.on('message', msg => {
    if (msg.content === 'ping') {
        msg.reply('pong');
    }
});
```

監聽 client 的 message(收到訊息)事件，觸發後執行箭頭函式 msg =>{}

這邊的 msg 是每當 client 收到 message 時，discord.js 會給予我們的變數，我們將變數稱作 msg
因為 discord.js 會回傳的變數是固定的，如果我們這邊像上面一樣寫成() => {}的話，雖然也可以執行但就不會將 discord.js 回傳的值再做處理。
反過來說，如果我們宣告了 msg1 跟 msg2 兩個變數來接回傳值，因為 discord.js 的 message 事件並沒有給我們這麼多參數，所以 msg2 是接收不到東西的

那麼要怎麼知道 message 事件下到底回傳了哪些參數呢?
這就要用到剛剛說的 discord.js 使用說明書了

https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-message

![5-4](https://i.imgur.com/mtq2Iqi.png)

我們監聽 message 事件的說明在左側元素列表的 client 分類中的 Events 中可以找到，可以看到他回傳了 Message Type 的變數，而這就是我們接收的內容。

繼續說箭頭函數內要做的事情

```
if (msg.content === 'ping') {
        msg.reply('pong');
    }
```

當 msg 變數底下的 content 元素，等於 ping 字串時，執行方法

```
msg.reply('pong');
```

使用 msg 底下的 replay 方法，並傳入 pong 字串。

以上的文言文翻譯過來就是
機器人(client)接收到訊息(message)的時候，去判斷訊息的內容(content)是不是 ping
如果是，回傳 pong(msg.reply)

![5-5](https://i.imgur.com/ZZr9Cqx.png)

先說到這，今天根據程式一行行做解釋，雖然很基本但對第一次觸碰這部分的人來說應該還是有點艱澀

請自行斟酌閱讀即可，明天我們說說如何讓機器人變得更聰明。
