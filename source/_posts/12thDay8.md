---
toc: false
title: Day8 - 呃...他會需要更多前綴字
date: 2020-09-08 09:07:55
tags: [node.js,bot,discord,discord.js,教學,12th鐵人賽]
categories:
  - [鐵人賽, 用Node.js製作後台零負擔的DiscordBot]
---
昨天我們對message事件做了完善的前置判斷

如果你做的跟範例一樣，這時我們可以在 ! 後面加入任何字串，來命令機器人做對應的事情

<!-- more -->

假設之後機器人的指令不斷增加，除了單純的文字回覆，可能還會有查表，投票，管理員指令，權限控制與音樂功能等

這種時候、比起單純的只使用!，機器人支援多種前綴詞顯然是更好的分類手段
今天我們進一步修改昨天已經完善的message框架，並且做出音樂功能(假)

-----

首先，請幫我在DiscordBot資料夾內新增一個JSONHome資料夾，把auth.json放進去，然後新增一個prefix.json檔

![8-1](https://i.imgur.com/fW5erlr.png)
![8-2](https://i.imgur.com/0Io1ydQ.png)
 
(prefix.json的內容)

bot.js的最上方幫我加載prefix.json

![8-3](https://i.imgur.com/0kIli9N.png)
 
(auth.json的路徑記得也要一併修改喔!)

-----

我們把前綴字整理成了JSONArray物件
這樣一來，我們就做到了前綴字的統整，之後不管是新增或調用參數都會方便許多

然後我們把下面的message事件改成這樣
 
![8-4](https://i.imgur.com/m35t6Db.png)

簡單來說就是從原本只判斷驚嘆號，變成只要前綴詞符合prefix.json內的任一Value就給過，並且由tempPrefix來接受符合條件的參數
同學們可以參考昨天的範例，來比對每一行的作用。

做到這裡，我們已經可以判斷多種前綴了，不過還沒在實作區判斷成功的是哪一個前綴
原本我們打!ping，機器人會回pong
現在打@ping也會通過了，如果prefix.json內的值不是@而是#或$$#@#$@甚麼的也一樣，依此類推
切割字串的方式也是可以動態化的，不過筆者不在此贅述。
我們繼續完善後續判斷

![8-5](https://i.imgur.com/wpLUo7R.png)

這樣，如果使用者輸入!xxx，就會進入上方的文字回應功能
輸入@xxx，就會進入下方的音樂指令了
 
![8-6](https://i.imgur.com/xB8Rpkt.png)
 
-----

音樂指令的部份我們明天繼續製作，以下是今天的完整程式碼:

```
const Discord = require('discord.js');
const client = new Discord.Client();
const auth = require('./JSONHome/auth.json');
const prefix = require('./JSONHome/prefix.json');

client.login(auth.key);

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    //前置判斷
    try {
        if (!msg.guild || !msg.member) return; //訊息內不存在guild元素 = 非群組消息(私聊)
        if (!msg.member.user) return; //幫bot值多拉一層，判斷上層物件是否存在
        if (msg.member.user.bot) return; //訊息內bot值為正 = 此消息為bot發送
    } catch (err) {
        return;
    }

    //字串分析
    try {
        let tempPrefix = '-1';
        const prefixED = Object.keys(prefix); //前綴符號定義
        prefixED.forEach(element => {
            if (msg.content.substring(0, prefix[element].Value.length) === prefix[element].Value) {
                tempPrefix = element;
            }
        });

        //實作
        switch (tempPrefix) {
            case '0': //文字回應功能
                const cmd = msg.content.substring(prefix[tempPrefix].Value.length).split(' '); //以空白分割前綴以後的字串
                switch (cmd[0]) {
                    case 'ping':
                        msg.channel.send('pong');
                        break;
                    case '老婆':
                        msg.reply('你沒有老婆!!');
                        break;
                    case 'myAvatar':
                        const avatar = GetMyAvatar(msg);
                        if (avatar.files) msg.channel.send(`${msg.author}`, avatar).catch(err => { console.log(err) });
                        break;
                }
                break;
            case '1': //音樂指令
                msg.channel.send('music');
                break;
        }
    } catch (err) {
        console.log('OnMessageError', err);
    }
});

//獲取頭像
function GetMyAvatar(msg) {
    try {
        return {
            files: [{
                attachment: msg.author.displayAvatarURL('png', true),
                name: 'avatar.jpg'
            }]
        };
    } catch (err) {
        console.log('GetMyAvatar,Error');
    }
}
```
