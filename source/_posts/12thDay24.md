---
title: Day24 - 愛麗絲安靜!
date: 2020-09-24 10:58:46
tags: [node.js,bot,discord,discord.js,教學,12th鐵人賽]
categories:
  - [鐵人賽, 用Node.js製作後台零負擔的DiscordBot]
---
今天想教怎麼讓機器人安靜/啟動
這樣才能說之後想教的東西

<!-- more -->

# 情境描述

機器人需要有個控制是否啟動的開關
可設定在該群組 or 頻道是否可以接收指令

因為我們的機器人會有多組系統(文字回答&音樂系統)
會希望再額外設定可以在指定的群組 or 頻道是否可以接收特定系統的指令


# 實作開始

首先請先幫我新建一個JSON檔案，叫做shup.json…或是你喜歡的名字xD

![24-1](https://i.imgur.com/A3FgZSp.png)

記得JSON檔案都要放在JSONHome喔

type
型態，代表這一筆JSONObject是甚麼類型
目前還用不到，都設1就好

GroupID
群組ID，主要給後續判定的部份

GroupName
群組名稱，用處不大、主要給使用者好分辨的

Power
代表不可使用的權限，後面會一邊寫一邊解說


禁言指令，顧名思義、希望機器人是否被禁言的開關
這開關需要放在所有指令之前，這樣才可以判斷出內容是否需要被禁止

老樣子，我們要先引入json

![24-2](https://i.imgur.com/P7TjmyD.png)

放在message事件的上方，當判斷權限為false，就停止後續行為

![24-3](https://i.imgur.com/Ijtpyyk.png)

接著我們實作IsShut
IsShut根據shup.json，先判斷訊息群組&訊息有沒有資料，再來判斷資料中存不存在tempPrefix，存在的話就要禁用功能，因為默認不存在時文檔中不會有資料，自然就不該設限

```
//禁言系統判斷
function IsShut(msg, tempPrefix) {
    //群組id
    const guildID = msg.guild.id;
    //頻道id
    const channelID = msg.channel.id;
    //當前狀態
    let status = true;

    //先判斷群組，群組判斷完判斷頻道(頻道權限優先於群組)
    const guildIF = shup.Group.find(element => {
        if (element.GroupID == guildID) {
            return element.Power.indexOf(tempPrefix) !== -1;
        }
        return false;
    })

    //找到資料 = 此群組存在Group中且Power存在此次指令代碼
    if (guildIF !== undefined) {
        status = false;
    }

    //頻道
    const channelIF = shup.Channel.find(element => {
        if (element.ChannelID == channelID) {
            return true;
        }
        return false;
    })

    //找到資料 = 此頻道存在Channel中
    if (channelIF !== undefined) {
        //Power有此資料=>禁用功能 無資料=>不設限
        if (channelIF.Power.indexOf(tempPrefix) !== -1) {
            status = false;
        } else {
            status = true;
        }
    }

    return status;
}
```

接著我們將資料實際key入shup.json看看

![24-4](https://i.imgur.com/r2YX14O.png)

不知道同學有沒有看出Power的判斷依據了?

![24-5](https://i.imgur.com/IQw9uKQ.png)

沒錯，就是依據prefix時設置的各系統代表ID

我們試著跑看看

![24-6](https://i.imgur.com/fPPlTwE.png)

另一個頻道

![24-7](https://i.imgur.com/uV9zJ4q.png)

大成功~
這樣就做到各頻道各功能權限設置了

不過存在一些問題
例如放在預設(default)的資料庫文字比對功能要怎麼判，應該是預設的-1吧
如果是-1要怎麼判斷呢?

以及目前這樣的做法只做到判斷禁言功能的實作，還沒有辦法在前台讓使用者手動新增

這部份筆者先賣個關子，各位可以嘗試寫看看，明天我們繼續做別的功能，之後再繞回來
