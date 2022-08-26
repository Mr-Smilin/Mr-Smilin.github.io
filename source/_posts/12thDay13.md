---
toc: false
title: Day13 - 嵌入式訊息embed與 bot 的指令表(額外)
date: 2020-09-13 21:37:08
tags: [node.js,bot,discord,discord.js,教學,12th鐵人賽]
categories:
  - [鐵人賽, 用Node.js製作後台零負擔的DiscordBot]
---
今天說說Discord的另一種訊息方式，embed

<!-- more -->

![13-1](https://i.imgur.com/6cCIVuN.png)

在Discord.js中被稱為MessageEmbed，訊息嵌入元素，總之就是嵌入式訊息

![13-2](https://i.imgur.com/mw9N4MX.png)

跟一般傳送訊息的手段一樣是使用 send ，但是傳送的屬性從原本的文字(string)轉成是嵌入元素(Embed)

![13-3](https://i.imgur.com/kQQYhth.png)

embed宣告後，透過其文檔底下的各個方法(methods)來賦予嵌入式訊息本身，要放入哪些資訊

![14-4](https://i.imgur.com/rDwYLkd.png)

將一個一個訊息嵌入embed元素後，最後從send方法傳送到discord上，就是一則embed訊息了

![14-5](https://i.imgur.com/gRPZpUI.png)

底下附上標準版的embed，請各位嘗試在最初教學的 ! 方法中新增一則help觸發句，將底下範例套入後，試著替換成自己的指令文檔吧!

```
const embed = new Discord.MessageEmbed()
      .setColor('#0099ff')
      .setTitle('Some title')
      .setURL('https://discord.js.org/')
      .setAuthor('Some name', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
      .setDescription('Some description here')
      .setThumbnail('https://i.imgur.com/wSTFkRM.png')
      .addField('Regular field title', 'Some value here')
      .addField('\u200B', '\u200B')
      .addField('Inline field title', 'Some value here', true)
      .addField('Inline field title', 'Some value here', true)
      .addField('Inline field title', 'Some value here', true)
      .setImage('https://i.imgur.com/wSTFkRM.png')
      .setTimestamp()
      .setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');
msg.channel.send(embed);
```