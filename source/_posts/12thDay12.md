---
title: Day12 - Discord的訊息刪除與更新事件(額外)
date: 2020-09-12 23:26:32
tags: [node.js,bot,discord,discord.js,教學,12th鐵人賽]
categories:
  - [鐵人賽, 用Node.js製作後台零負擔的DiscordBot]
---
欸...原本接下來想教後台託管與資料庫的教學的
但因為筆者禮拜五把文稿跟圖片還有範例程式全都留在公司了...所以這兩天筆者先教一下其他東西

<!-- more -->

就當作是惡補前面沒講到的Discord.js功能，我們今天來說說Discord.js的其他事件監聽吧

---

# 刪除與更新事件

目前我們的所有事件都是建立在
使用者發送訊息 -> Discord廣播給機器人 -> 機器人的Message事件觸發

```
client.on('message', msg => {})
```

我們的 bot 是使用登入了 bot 自身 keyValue 的 client 來監聽 message 事件的

![12-1](https://i.imgur.com/qXdmhzO.png)
![12-2](https://i.imgur.com/hbkivnR.png)

這樣，我們在Client下的Event分類中，就會找的到message的內容

在程序中Client代表我們機器人本身，他的Event直接表示了他能對那些事情做出反應
也因此，Client的Event功能非常的多

今天我們來說說MessageDelete跟MessageUpdate事件，也就是當有人刪除訊息跟更新訊息的時要做的事情

![12-3](https://i.imgur.com/OZ84Nlj.png)
![12-4](https://i.imgur.com/FSfPNZq.png)

Discord.js的文庫其實也蠻簡單的，不用看那些英文在說甚麼，透過事件名稱跟屬性已經足夠我們知道
當有人刪除留言時，Discord會將Message返還給我們
當有人更新留言時，Discord會將oldMessage跟newMessage

![12-5](https://i.imgur.com/ouPctCU.png)

請試著用console.log查看Discord分別給了我們甚麼內容吧!

之後我們把屬性中我們需要的元素拿出來組成字串，發送到原本的頻道去

```
//抓刪 刪除事件
client.on('messageDelete', function (message) {
    if (!message.guild) return; //只要是來自群組的訊息
    let mStr = '';
    try{
        mStr = mStr+
            `事件 刪除\n`+
            `使用者 ${message.member.user.username}\n`+
            `群組 ${message.channel.name}\n`+
            `刪除內容 ${message.content}`;

        client.channels.get(message.channel.id).send(mStr);
    }catch(err){
        console.log("messageDeleteError",err);
    }
});

//抓刪 更新事件
client.on('messageUpdate', function (oldMessage, newMessage) {
    if (!oldMessage.guild || !newMessage.guild) return;
    mStr = '';
    try {
        mStr = mStr +
            `事件 更新\n` +
            `使用者 ${oldMessage.member.user.username}\n` +
            `群組   ${oldMessage.channel.name}\n` +
            `舊對話 ${oldMessage.content}\n` +
            `新對話 ${newMessage.content}`;

        client.channels.get(oldMessage.channel.id).send(mStr);
    } catch (err) {
        console.log('messageUpdateError', err);
    }
})
```

這樣，你的bot就會在頻道有人刪除訊息時接收訊息，然後把刪除的內容貼出來玩羞恥play了(
