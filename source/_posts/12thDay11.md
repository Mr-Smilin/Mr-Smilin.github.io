---
toc: true
title: Day11 - 音樂系統(2)
date: 2020-09-11 09:05:34
tags: [node.js,bot,discord,discord.js,教學,12th鐵人賽]
categories:
  - [鐵人賽, 用Node.js製作後台零負擔的DiscordBot]
---
![11-1](https://i.imgur.com/0pmzip7.png)

今天我們把剩下的功能做完

<!-- more -->

繼續做之前，我們回顧一下音樂播放的其中一小段

![11-2](https://i.imgur.com/LxEyK0Q.png)

在playMusic2這段，我們將音樂網址與相關設定打入connection後，connection開始播放歌曲，並且返還控制項；
我們宣告一個dispatcher來接收控制項，並且在下一行監聽finish事件

從這一段會注意到他解決了一件事情，那就是我們該怎麼監測歌曲播放的狀態?

dispatcher這個物件在被賦予後，可以直接當成是我們的遙控器
不管是監聽歌曲是不是播完了，還是調整音量&咖歌等，都會需要調用dispatcher

所以如果之後我們要繼續實作咖歌&循環播放等功能，除了需要調用歌曲清單以外，還需要調用到dispatcher

![11-3](https://i.imgur.com/pcZSGNK.png)

這邊在音樂系統的最上方，將dispatcher宣告成全域變數
並且記得原本宣告dispatcher的const要拿掉!

觀念說完，那我們繼續:

## 中斷歌曲

```
//?skip
function skipMusic() {
    //將歌曲關閉，觸發finish事件
    if (dispatcher !== undefined) dispatcher.end();
}
```

## 重播歌曲

```
//?replay
function replayMusic() {
    if (musicList.length > 0) {
        //把當前曲目再推一個到最前面
        musicList.unshift(musicList[0]);
        //將歌曲關閉，觸發finish事件
        //finish事件將清單第一首歌排出，然後繼續播放下一首
        if (dispatcher !== undefined) dispatcher.end();
    }
}
```

## 顯示歌曲清單

```
//?queue
async function queueShow(channelID) {
    try {
        if (musicList.length > 0) {
            let info;
            let message = '';
            for (i = 0; i < musicList.length; i++) {
                //從連結中獲取歌曲資訊 標題 總長度等
                info = await ytdl.getInfo(musicList[i]);
                //歌曲標題
                title = info.videoDetails.title;
                //串字串
                message = message + `\n${i+1}. ${title}`;
            }
            //把最前面的\n拿掉
            message = message.substring(1, message.length);
            client.channels.fetch(channelID).then(channel => channel.send(message))
        }
    } catch (err) {
        console.log(err, 'queueShowError');
    }
}
```

## 顯示當前歌曲

```
//?np
async function nowPlayMusic(channelID) {
    try {
        if (dispatcher !== undefined && musicList.length > 0) {
            //從連結中獲取歌曲資訊 標題 總長度等
            const info = await ytdl.getInfo(musicList[0]);
            //歌曲標題
            const title = info.videoDetails.title;
            //歌曲全長(s)
            const songLength = info.videoDetails.lengthSeconds;
            //當前播放時間(ms)
            const nowSongLength = Math.floor(dispatcher.streamTime / 1000);
            //串字串
            const message = `${title}\n${streamString(songLength,nowSongLength)}`;
            client.channels.fetch(channelID).then(channel => channel.send(message))
        }
    } catch (err) {
        console.log(err, 'nowPlayMusicError');
    }
}

//▬▬▬▬▬▬▬▬▬?▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
function streamString(songLength, nowSongLength) {
    let mainText = '?';
    const secondText = '▬';
    const whereMain = Math.floor((nowSongLength / songLength) * 100);
    let message = '';
    for (i = 1; i <= 30; i++) {
        if (i * 3.3 + 1 >= whereMain) {
            message = message + mainText;
            mainText = secondText;
        } else {
            message = message + secondText;
        }
    }
    return message;
}
```

---

這樣，我們的音樂系統的基本教學就告一段落

![11-4](https://i.imgur.com/MUI4mAt.png)

![11-5](https://i.imgur.com/4i1uqpf.png)

![11-6](https://i.imgur.com/HBYoQl6.png)

其實音樂功能除了本篇教學的基本以外，還有很多花樣可以玩
這個寫法有個很大的問題是，有多個群組同時在使用時，機器人的歌單會掛掉

筆者明天想先說其他主題，音樂系統的教學先告一段落
因為繼續完善下去的話，程式的可讀性會降低，現在的音樂系統筆者認為是最純粹，最好理解的了
同學們不訪想想該怎麼完善這些問題，我們明天見~
