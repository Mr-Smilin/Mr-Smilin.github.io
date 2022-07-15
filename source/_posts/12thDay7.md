---
title: Day7 - 你的Bot需要一個前綴字
date: 2020-09-07 09:22:24
tags: [node.js,bot,discord,discord.js,教學,12th鐵人賽]
categories:
  - [鐵人賽, 用Node.js製作後台零負擔的DiscordBot]
---
今天接續昨天的主題，進一步修改message方法

正常我們在Discord上看到別人玩bot的指令都是有一個前綴字，後面附帶著指令的
例如: !help $dice

之類的，今天我們要來完成這個需求，並且把前置防呆做好

<!-- more -->

![7-1](https://i.imgur.com/biTOOUy.png)

(終於要開始來爆改啦)

## 前置判斷

除了判斷訊息是否是機器人以外，我希望機器人只回應來自群組的消息

![7-2](https://i.imgur.com/aDj39xo.png)

因為message物件屬於discord包好給我們的，擔心有哪一層物件的錯誤導致整個機器人崩潰，我希望在前置判斷增加嚴謹性與try catch

![7-3](https://i.imgur.com/Ic1KoYn.png)

如果這一段出錯的話，可以在catch中log錯誤訊息喔!

## 字串分析

我們希望可以在定義出前置符號後，只接取來自前置符號正確的內容，再判斷後面的內容

![7-4](https://i.imgur.com/PJZ8fnf.png)


## 功能實作

最後我們把之前的行為修改一下後放回去實作區

![7-5](https://i.imgur.com/kEshR77.png)

從原本的if改成switch，這樣我們如果要新增新的判斷式就會快速許多
原本判斷的msg.content改成了cmd[0]

![7-6](https://i.imgur.com/KWR5SHY.png)

運行一下，結果就跟我們要的一樣了!

最後再稍微加一些範例

![7-7](https://i.imgur.com/Omv4wA5.png)
![7-8](https://i.imgur.com/Q3wnJHS.png)

-----

今天的完整程式碼如下

```
const Discord = require('discord.js');
const client = new Discord.Client();
const auth = require('./auth.json');

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
        const prefix = '!' //前綴符號定義
        if (msg.content.substring(0, prefix.length) === prefix) //如果訊息的開頭~前綴字長度的訊息 = 前綴字
        {
            const cmd = msg.content.substring(prefix.length).split(' '); //以空白分割前綴以後的字串

            //功能實作
            switch (cmd[0]) {
                case 'ping':
                    msg.channel.send('pong');
                    break;
                case '老婆':
                    msg.reply('你沒有老婆!!');
                    break;
                case 'myAvatar':
                    const avatar = GetMyAvatar(msg);
                    if (avatar.files) msg.channel.send(`${msg.author}`, avatar);
                    break;
            }
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
                attachment: msg.author.displayAvatarURL,
                name: 'avatar.jpg'
            }]
        };
    } catch (err) {
        console.log('GetMyAvatar,Error');
    }
}
```

完工~!
