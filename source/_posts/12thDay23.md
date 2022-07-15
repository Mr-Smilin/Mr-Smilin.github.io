---
title: Day23 - 音樂系統的歌單批量載入(額外)
date: 2020-09-23 15:04:44
tags: [node.js,bot,discord,discord.js,教學,12th鐵人賽]
categories:
  - [鐵人賽, 用Node.js製作後台零負擔的DiscordBot]
---
昨天我們把音樂系統的多群組支援做好了
今天想講一下怎麼直接導入歌單

<!-- more -->

首先請在專案目錄下的終端機安裝

```
npm install ytpl
```

![23-1](https://i.imgur.com/Ugc2fg4.png) 

安裝完成後，我們打開看package.json

![23-2](https://i.imgur.com/BZIUj5U.png) 

最後一行出現了ytpl
請到這個網站比對ytpl的版本，如果像筆者一樣版本過低的話，請將package.json內的ytpl版本拉高，然後更新一次ytpl
https://www.npmjs.com/package/ytpl

![23-3](https://i.imgur.com/prueQ8r.png) 

官方文檔版本1.0.1

![23-4](https://i.imgur.com/zDoQ0ox.png) 

手動把0.3.0改成1.0.1然後下指令

![23-5](https://i.imgur.com/XAAeYn1.png) 

```
npm update ytpl
```

這樣就會更新你的ytpl函式庫

---

一安裝完就去確認版本是否最新，是因為舊版本的ytpl在抓取歌單資料時十分不穩，甚至有可能直接被yt擋下

原因不明，但這道理可以套到ytdl-core上，之後同學們有任何問題都可以先更新版本看看

---

更新好後，我們在bot.js引用ytpl

![23-6](https://i.imgur.com/saOcdBI.png) 

在音樂指令底下加入歌單載入功能

![23-7](https://i.imgur.com/r8rRLh7.png)  

```
//?playList
async function playListMusic(guildID, msg) {
    try {
        //沒在音樂廳不能使用此功能
        if (!client.voice.connections.get(guildID)) {
            msg.channel.send(`請先正常啟用音樂指令後，再使用歌單載入喔`);
            return false;
        }
        //網址
        const valueED = msg.content.split(' ');
        //先用library自帶的方式檢查一次能不能用
        const canPlay = await ytpl.validateID(valueED[1]);
        //讀取到幾首歌，上限默認100首
        let a = 0;
        //幾首成功放入歌單
        let b = 0;
        if (canPlay) {
            const listED = await ytpl(valueED[1]);
            await listED.items.forEach(async function(element) {
                a = a + 1;
                if (element.title !== '[Deleted video]') {
                    canPlay2 = await ytdl.validateURL(element.url_simple);
                    if (canPlay2) {
                        b = b + 1;
                        musicList.get(guildID).push(element.url_simple);
                    }
                }
            });
            //回傳統計資訊
            msg.channel.send(`歌單 ${listED.title}\n共載入${b}首歌曲\n${a-b}首載入失敗`);
        } else {
            msg.channel.send(`This Url isn't working in function.`);
        }
    } catch (err) {
        console.log(err, 'playListMusicError');
    }
}
```

由上而下依序說明…

![23-8](https://i.imgur.com/06WUq7e.png) 

因為歌單功能僅提供將yt歌單放入bot歌單的功能
正常使用play指令，不在語音廳的情況下是會直接進入語音廳並開始播放歌曲
筆者這邊寫成不能從歌單指令開始播歌

![23-9](https://i.imgur.com/v9gRPGn.png) 

宣告了四份參數

valueED
第一個單純是使用空白做字串分割，valueED[0]是前綴字+playList
valueED[1]則是一格空白後加上網址

canPlay
使用ytpl自帶的檢查語法，會根據帶入的url回傳布林

a
載入迴圈的每一次都會+1，代表著載入幾首歌

b
載入迴圈的每一次，當成功將歌曲加入歌單時+1，表示成功抓取幾首歌

![23-10](https://i.imgur.com/dBhEpU2.png) 

當canPlay等於ture後，正式查詢歌單並且將資料回傳給listED
listED底下有一items為JSONArray，他就是歌單的集合
對他使用迴圈，並在迴圈內用ytdl驗證一次網址是否可用
驗證全部通過後將歌曲加入該群組歌單
最後統計數字

---

因為加入批量歌曲載入的緣故，當機器人在列出queueShow時，極有可能回傳大量文字
discord單封文字的上限數是2000，我們取1900就好

![23-11](https://i.imgur.com/fdzjXHy.png) 

都好了後，試著運行看看

![23-12](https://i.imgur.com/G0vZbae.png) 

![23-13](https://i.imgur.com/06dEnP9.png) 

![23-14](https://i.imgur.com/qSyICGj.png) 

這樣音樂系統也能做到批量載入音樂了
其餘還剩一些瑕疵，如歌單功能有限制，歌曲詳細資訊載入偏慢，沒有過濾私人影片還有更多可能的問題等…就讓各位自己嘗試看看吧

那音樂系統就教到這，我們明天見
