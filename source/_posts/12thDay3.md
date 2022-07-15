---
title: Day3 - 你自己的...他叫甚麼名字?
date: 2020-09-03 09:22:15
tags: [node.js,bot,discord,discord.js,教學,12th鐵人賽]
categories:
  - [鐵人賽, 用Node.js製作後台零負擔的DiscordBot]
---
今天來說說怎麼創建Bot

<!-- more -->

建立DiscordBot，首先要有一個Discord帳號

到[這個網站](https://discordapp.com/developers/applications/)

登入帳號後，右上角會有一個[ New Application ]

![NewApplication](https://i.imgur.com/QeKQ4fK.png)

這邊的名字是”應用名稱”
同時也會是預設的機器人名稱，仔細想好後就送出吧~

![basicUI](https://i.imgur.com/kXSwy3I.png)

送出後就會進來應用介面了

點擊頭像可替換應用的大頭貼，名字就是你剛剛取的


都設定好之後，我們點選左邊列表第三排的Bot

![BotUI](https://i.imgur.com/r1NSe8O.png)

第一次點應該會問你是否要建立，點選是
這樣Discord就會幫你的機器人實際創建一個帳戶
點擊右邊TOKEN底下的Copy，他會給你一組很長的亂碼
## **先存在記事本，我們明天會用到**

-----

接下來我們點左邊的OAuth2

![Oauth2UI](https://i.imgur.com/o5eSFy6.png)

這是創建邀請連結的地方，SCOPES欄的部份點Bot，這樣下面就會出現第二欄
下面是要給予機器人在群組內的權限，需要根據Bot實際上具備哪些功能，來判斷需要給予哪些權限
如果不知道怎麼用，先選Administrator就可以了。

都做完後，中間的就會有完整的邀請連結，請複製後輸入在瀏覽器上

![url](https://i.imgur.com/9oCUzUZ.png)

使用此連結，就可以把Bot拉入你的群組內，前提是你在此群組有管理者權限喔

![su](https://i.imgur.com/nJ3jUuW.png)

喔耶，成功了!

