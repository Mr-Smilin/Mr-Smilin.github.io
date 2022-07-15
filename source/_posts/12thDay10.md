---
title: Day10 - 音樂系統(1)
date: 2020-09-10 09:03:48
tags: [node.js,bot,discord,discord.js,教學,12th鐵人賽]
categories:
  - [鐵人賽, 用Node.js製作後台零負擔的DiscordBot]
---
昨天我們把架構很籠統的說了大概
今天的內容會專注在編程為主，discord.js的元素不會再多贅述
可能會比較枯燥一點
萬里長路始於足下，同學們加油~

<!-- more -->

## 音樂總方法

![10-1](https://i.imgur.com/5wwXNdo.png)

新增一個音樂系統的分類，然後在底下創建MusicFunction方法
一併把OnMessage事件下的音樂指令導向這個方法
這樣Message事件就不會因為我們的程式碼肥大，進而影響閱讀

```
function MusicFunction(msg) {
    //將訊息內的前綴字截斷，後面的字是我們要的
    const content = msg.content.substring(prefix[1].Value.length);
    //指定我們的間隔符號
    const splitText = ' ';
    //用間隔符號隔開訊息 contents[0] = 指令,contents[1] = 參數
    const contents = content.split(splitText);

    switch (contents[0]) {
        case 'play':
            //點歌&播放歌曲功能
            playMusic(msg, contents);
            break;
        case 'replay':
            //重播當前歌曲
            break;
        case 'np':
            //當前歌曲資訊
            break;
        case 'queue':
            //歌曲清單
            break;
        case 'skip':
            //中斷歌曲
            break;
        case 'disconnect':
            //退出語音頻道並且清空歌曲清單
            disconnectMusic(msg.guild.id, msg.channel.id);
            break;
    }
}
```

按照昨天說的，我們分割字串後，用switch case把每個指令獨立出來
後面指令也會function化，用呼叫的更加美觀

## 歌曲指令 play

```
//?play
async function playMusic(msg, contents) {
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
                    //將歌曲加入歌單
                    musicList.push(urlED);
                    //進入語音頻道
                    msg.member.voice.channel.join()
                        .then(connection => {
                            msg.reply('來了~');
                            const guildID = msg.guild.id;
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
                    musicList.push(urlED);
                    msg.reply('已將歌曲加入歌單!');
                }
            } else return msg.reply('請先進入頻道:3...');
        } else return msg.reply('The link is not working.3');
    } catch (err) {
        console.log(err, 'playMusicError');
    }
}
```

![10-2](https://i.imgur.com/RGusrht.png)

寫到這會發現需要一個填充歌曲列表的變數，歌曲列表應該是不管到哪一個音樂系統下都可以使用的，所以我們宣告在function外面(全域變數)

```
//?play 遞迴函式
async function playMusic2(connection, guildID, channelID) {
    try {
        //播放前歌曲清單不能沒有網址
        if (musicList.length > 0) {
            //設定音樂相關參數
            const streamOptions = {
                seek: 0,
                volume: 0.5,
                Bitrate: 192000,
                Passes: 1,
                highWaterMark: 1
            };
            //讀取清單第一位網址
            const stream = await ytdl(musicList[0], {
                filter: 'audioonly',
                quality: 'highestaudio',
                highWaterMark: 26214400 //25ms
            })

            //播放歌曲，並且存入dispatcher
            const dispatcher = connection.play(stream, streamOptions);
            //監聽歌曲播放結束事件
            dispatcher.on("finish", finish => {
                //將清單中第一首歌清除
                if (musicList.length > 0) musicList.shift();
                //播放歌曲
                playMusic2(connection, guildID, channelID);
            })
        } else disconnectMusic(guildID, channelID); //清空歌單並且退出語音頻道
    } catch (err) {
        console.log(err, 'playMusic2Error');
    }
}
```

## 歌曲指令 disconnect

```
//?disconnect
function disconnectMusic(guildID, channelID) {
    try {
        //判斷bot是否在此群組的語音頻道
        if (client.voice.connections.get(guildID)) {
            //清空歌曲清單
            musicList = new Array();
            //退出語音頻道
            client.voice.connections.get(guildID).disconnect();

            client.channels.fetch(channelID).then(channel => channel.send('晚安~'));
        } else client.channels.fetch(channelID).then(channel => channel.send('可是..我還沒進來:3'))
    } catch (err) {
        console.log(err, 'disconnectMusicError');
    }
}
```

到此，音樂系統的一個基本循環(播放->退出)就寫完了
明天我們繼續完善剩下的功能

以下是今天的程式碼

```
//#region 全域變數
const Discord = require('discord.js');
const client = new Discord.Client();
const ytdl = require('ytdl-core');
const auth = require('./JSONHome/auth.json');
const prefix = require('./JSONHome/prefix.json');

//#endregion

//#region 登入
client.login(auth.key);

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

//#endregion

//#region message事件入口
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
                MusicFunction(msg);
                break;
        }
    } catch (err) {
        console.log('OnMessageError', err);
    }
});

//#endregion

//#region 音樂系統

//歌曲清單
let musicList = new Array();

function MusicFunction(msg) {
    //將訊息內的前綴字截斷，後面的字是我們要的
    const content = msg.content.substring(prefix[1].Value.length);
    //指定我們的間隔符號
    const splitText = ' ';
    //用間隔符號隔開訊息 contents[0] = 指令,contents[1] = 參數
    const contents = content.split(splitText);

    switch (contents[0]) {
        case 'play':
            //點歌&播放歌曲功能
            playMusic(msg, contents);
            break;
        case 'replay':
            //重播當前歌曲
            break;
        case 'np':
            //當前歌曲資訊
            break;
        case 'queue':
            //歌曲清單
            break;
        case 'skip':
            //中斷歌曲
            break;
        case 'disconnect':
            //退出語音頻道並且清空歌曲清單
            disconnectMusic(msg.guild.id, msg.channel.id);
            break;
    }
}

//?play
async function playMusic(msg, contents) {
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
                    //將歌曲加入歌單
                    musicList.push(urlED);
                    //進入語音頻道
                    msg.member.voice.channel.join()
                        .then(connection => {
                            msg.reply('來了~');
                            const guildID = msg.guild.id;
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
                    musicList.push(urlED);
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
        if (musicList.length > 0) {
            //設定音樂相關參數
            const streamOptions = {
                seek: 0,
                volume: 0.5,
                Bitrate: 192000,
                Passes: 1,
                highWaterMark: 1
            };
            //讀取清單第一位網址
            const stream = await ytdl(musicList[0], {
                filter: 'audioonly',
                quality: 'highestaudio',
                highWaterMark: 26214400 //25ms
            })

            //播放歌曲，並且存入dispatcher
            const dispatcher = connection.play(stream, streamOptions);
            //監聽歌曲播放結束事件
            dispatcher.on("finish", finish => {
                //將清單中第一首歌清除
                if (musicList.length > 0) musicList.shift();
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
            musicList = new Array();
            //退出語音頻道
            client.voice.connections.get(guildID).disconnect();

            client.channels.fetch(channelID).then(channel => channel.send('晚安~'));
        } else client.channels.fetch(channelID).then(channel => channel.send('可是..我還沒進來:3'))
    } catch (err) {
        console.log(err, 'disconnectMusicError');
    }
}
//#endregion

//#region 子類方法
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

//#endregion
```
