---
toc: true
title: Day22 - 音樂系統的多群組化(額外)
date: 2020-09-22 10:10:05
tags: [node.js,bot,discord,discord.js,教學,12th鐵人賽]
categories:
  - [鐵人賽, 用Node.js製作後台零負擔的DiscordBot]
---
這兩天來把音樂系統教完好了

<!-- more -->

目前為止的音樂系統只支援一隻機器人 for 一個群組的模式
如果有多群組同時要使用音樂系統，會導致歌單列表共用

這是因為機器人的系統中，並沒有將群組納入判斷
要改起來並不難，但邏輯要清晰

不知道當時有沒有小夥伴自己搞定這一塊的?我們今天會再帶過

程式碼是依照之前的進度，不會重頭開始，如果需要但沒有基礎程式碼的話可以回去看音樂系統的教學

---

# MusicFunction

![22-1](https://i.imgur.com/sKuhlfp.png)

首先請把宣告成全域變數的兩個參數，初始化都設為Map()

![22-2](https://i.imgur.com/KSRmbTG.png)

再來我們在音樂指令的入口提取guildID，並且放入每一個function內

# playMusic

![22-3](https://i.imgur.com/gax5Dun.png)

修改了151,155跟171行
(可以根據左側顏色判斷)

第一次進入語音廳的群組需要先以群組ID宣告一個歌曲列表
原本歌曲列表放入資料的方法是這樣
```
musicList.push(網址)
```

現在變成

```
music.get(群組id).push(網址)
```

也就是根據群組id提取歌曲列表


# playMusic2

![22-4](https://i.imgur.com/MpGvBiu.png)

改了185,195,202,204跟206行
(可以根據左側顏色判斷)

原則上都跟剛剛一樣，注意歌曲清單跟播放遙控器應該是一個群組一個而已


# disconnectMusic

![22-5](https://i.imgur.com/GHYrwdz.png)

修改了222行
(可以根據左側顏色判斷)


# replayMusic

![22-6](https://i.imgur.com/0noksiD.png)

改了235,237與240行
(可以根據左側顏色判斷)


# skipMusic

![22-7](https://i.imgur.com/j3vClrt.png)

只有一行


# nowPlayMusic

![22-8](https://i.imgur.com/0mjB6g9.png)

修改了253,255跟261行
(可以根據左側顏色判斷)

字串串接部分拿的是已經處理好的參數，所以不用修改streamString


# queueShow

![22-9](https://i.imgur.com/6ekTspK.png)

修改了291,294跟296行
(可以根據左側顏色判斷)

---

這樣基本就都改好了，我們試著運行看看

運行前，因為之前我們已經上傳機器人到heroku上，理論上現在機器人是在運行狀態的
這時候如果我們使用node bot，雖然不會有bug，但會造成bot裡面同時有兩隻程序登入，會造成很有趣的現象，各位有興趣可以試試

那這邊筆者為了繞過這問題，想直接上傳至heroku，這樣就可以只跑一個程序，也剛好介紹怎麼用heroku瀏覽程序歷程

# 測試

我們先回到專案資料夾底下，將.git改名gitHub，然後將gitHeroku改回.git

回到vsCode，將專案推上heroku

推完看到Build succeeded後幫我下

```
heroku log -t
```

之前應該有提到
這是觀察專案在heroku上的託管狀態
如果我們要透過heroku來直接跑程序，或是之後出問題都是來這邊看error訊息

開好訊息後，我們試著測試看看機器人是不是真的可以分群播音樂了

![22-10](https://i.imgur.com/BMVGiLi.png)
 
![22-11](https://i.imgur.com/5dS1Qmq.png)
 
![22-12](https://i.imgur.com/7rysBLk.png)
 
![22-13](https://i.imgur.com/GdOBJIn.png)
 
![22-14](https://i.imgur.com/Eu0wFM2.png)
 
![22-15](https://i.imgur.com/FgMco0X.png)
 
![22-16](https://i.imgur.com/3J61doA.png)

---

大致如此，我們可以看到，機器人確實在兩個群組收到指令時，不會影響到對方了

音樂系統的多群組支援教到這
明天看看要不要教一些額外的功能，我們明天見

# 主程序

```
//#region 音樂系統
//歌曲控制器
let dispatcher = new Map();
//歌曲清單
let musicList = new Map();

function MusicFunction(msg) {
    //將訊息內的前綴字截斷，後面的字是我們要的
    const content = msg.content.substring(prefix[1].Value.length);
    //指定我們的間隔符號
    const splitText = ' ';
    //用間隔符號隔開訊息 contents[0] = 指令,contents[1] = 參數
    const contents = content.split(splitText);
    //因為會持續使用到，將群組ID獨立成參數
    const guildID = msg.guild.id;

    switch (contents[0]) {
        case 'play':
            //點歌&播放歌曲功能
            playMusic(guildID, msg, contents);
            break;
        case 'replay':
            //重播當前歌曲
            replayMusic(guildID);
            break;
        case 'np':
            //當前歌曲資訊
            nowPlayMusic(guildID, msg.channel.id);
            break;
        case 'queue':
            //歌曲清單
            queueShow(guildID, msg.channel.id);
            break;
        case 'skip':
            //中斷歌曲
            skipMusic(guildID);
            break;
        case 'disconnect':
            //退出語音頻道並且清空歌曲清單
            disconnectMusic(guildID, msg.channel.id);
            break;
    }
}

//?play
async function playMusic(guildID, msg, contents) {
    //定義我們的第一個參數必需是網址
    const urlED = contents[1];
    try {
        //第一個參數不是連結就要篩選掉
        if (urlED.substring(0, 4) !== 'http') return msg.reply('The link is not working.1');

        //透過library判斷連結是否可運行
        const validate = await ytdl.validateURL(urlED);
        if (!validate) return msg.reply('The link is not working.2');

        //獲取歌曲資訊
        const info = await ytdl.getInfo(urlED);
        //判斷資訊是否正常
        if (info.videoDetails) {
            //指令下達者是否在語音頻道
            if (msg.member.voice.channel) {
                //判斷bot是否已經連到語音頻道 是:將歌曲加入歌單 不是:進入語音頻道並且播放歌曲
                if (!client.voice.connections.get(msg.guild.id)) {
                    //因為是第一次加入，宣告新的歌曲列表
                    musicList.set(guildID, new Array());

                    //將歌曲加入歌單
                    musicList.get(guildID).push(urlED);
                    //進入語音頻道
                    msg.member.voice.channel.join()
                        .then(connection => {
                            msg.reply('來了~');
                            //const guildID = msg.guild.id;
                            const channelID = msg.channel.id;
                            //播放歌曲
                            playMusic2(connection, guildID, channelID);
                        })
                        .catch(err => {
                            msg.reply('bot進入語音頻道時發生錯誤，請再試一次');
                            console.log(err, 'playMusicError2');
                        })
                } else {
                    //將歌曲加入歌單
                    musicList.get(guildID).push(urlED);
                    msg.reply('已將歌曲加入歌單!');
                }
            } else return msg.reply('請先進入頻道:3...');
        } else return msg.reply('The link is not working.3');
    } catch (err) {
        console.log(err, 'playMusicError');
    }
}

//?play 遞迴函式
async function playMusic2(connection, guildID, channelID) {
    try {
        //播放前歌曲清單不能沒有網址
        if (musicList.get(guildID).length > 0) {
            //設定音樂相關參數
            const streamOptions = {
                seek: 0,
                volume: 0.5,
                Bitrate: 192000,
                Passes: 1,
                highWaterMark: 1
            };
            //讀取清單第一位網址
            const stream = await ytdl(musicList.get(guildID)[0], {
                filter: 'audioonly',
                quality: 'highestaudio',
                highWaterMark: 26214400 //25ms
            })

            //播放歌曲，並且存入dispatcher
            dispatcher.set(guildID, connection.play(stream, streamOptions));
            //監聽歌曲播放結束事件
            dispatcher.get(guildID).on("finish", finish => {
                //將清單中第一首歌清除
                if (musicList.get(guildID).length > 0) musicList.get(guildID).shift();
                //播放歌曲
                playMusic2(connection, guildID, channelID);
            })
        } else disconnectMusic(guildID, channelID); //清空歌單並且退出語音頻道
    } catch (err) {
        console.log(err, 'playMusic2Error');
    }
}

//?disconnect
function disconnectMusic(guildID, channelID) {
    try {
        //判斷bot是否在此群組的語音頻道
        if (client.voice.connections.get(guildID)) {
            //清空歌曲清單
            musicList.set(guildID, new Array());
            //退出語音頻道
            client.voice.connections.get(guildID).disconnect();

            client.channels.fetch(channelID).then(channel => channel.send('晚安~'));
        } else client.channels.fetch(channelID).then(channel => channel.send('可是..我還沒進來:3'))
    } catch (err) {
        console.log(err, 'disconnectMusicError');
    }
}

//?replay
function replayMusic(guildID) {
    if (musicList.get(guildID).length > 0) {
        //把當前曲目再推一個到最前面
        musicList.get(guildID).unshift(musicList[0]);
        //將歌曲關閉，觸發finish事件
        //finish事件將清單第一首歌排出，然後繼續播放下一首
        if (dispatcher.get(guildID) !== undefined) dispatcher.get(guildID).end();
    }
}

//?skip
function skipMusic(guildID) {
    //將歌曲關閉，觸發finish事件
    if (dispatcher.get(guildID) !== undefined) dispatcher.get(guildID).end();
}

//?np
async function nowPlayMusic(guildID, channelID) {
    try {
        if (dispatcher.get(guildID) !== undefined && musicList.get(guildID).length > 0) {
            //從連結中獲取歌曲資訊 標題 總長度等
            const info = await ytdl.getInfo(musicList.get(guildID)[0]);
            //歌曲標題
            const title = info.videoDetails.title;
            //歌曲全長(s)
            const songLength = info.videoDetails.lengthSeconds;
            //當前播放時間(ms)
            const nowSongLength = Math.floor(dispatcher.get(guildID).streamTime / 1000);
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

//?queue
async function queueShow(guildID, channelID) {
    try {
        if (musicList.get(guildID).length > 0) {
            let info;
            let message = '';
            for (i = 0; i < musicList.get(guildID).length; i++) {
                //從連結中獲取歌曲資訊 標題 總長度等
                info = await ytdl.getInfo(musicList.get(guildID)[i]);
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
//#endregion
```
