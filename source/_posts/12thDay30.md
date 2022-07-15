---
title: Day30 - tag控管機制(4)
date: 2020-09-30 09:53:30
tags: [node.js,bot,discord,discord.js,教學,12th鐵人賽]
categories:
  - [鐵人賽, 用Node.js製作後台零負擔的DiscordBot]
---
今天把tag的最後一件事做完

將使用者從指定權限組移除
將指定權限組移除

在tag入口新增Delete方法

<!-- more -->

![30-1](https://i.imgur.com/7Y2m2Rl.png)


創建實例

![30-2](https://i.imgur.com/78vy8E8.png)

```
//從權限組中刪除使用者 OR 刪除權限組
function DeleteTag(msg) {
    try {
        if (DoUserID === '') {
            tempIsAdmin = CheckID(msg, null, msg.author.id, function(msg, cmd, haveUserData) {
                if (haveUserData.IsAdmin) return true;
                else return false;
            });
            if (tempIsAdmin) {
                nowDoFunction = DeleteTagNow;
                DoUserID = msg.author.id;
                DoData = new Array;
                msg.channel.send('請問要編輯使用者權限還是權限組?\n1 使用者權限 / 2 權限組');
            } else {
                msg.channel.send('此指令只有管理員可執行');
            }
        } else {
            msg.channel.send('有其他人正在使用續行中，請稍等');
        }
    } catch (err) {
        console.log('DeleteTagError', err);
    }
}
```

創建續行實例

```
//從權限組中刪除使用者 OR 刪除權限組(續行)
function DeleteTagNow(msg) {
    try {
        switch (DoingCount) {
            case 0:
                switch (msg.content) {
                    case '1':
                        msg.channel.send('請輸入要編輯的使用者ID');
                        break;
                    case '2':
                        DoingCount = 10;
                        msg.channel.send('請輸入要編輯的權限組');
                        break;
                    default:
                        DoingCount--;
                        msg.channel.send('無法辨識訊息，請輸入1/2來選擇');
                        break;
                }
                break;
            case 1:
                if (msg.content == 'N') {
                    CloseAllDoingFunction();
                    msg.channel.send('指令關閉');
                } else {
                    if (CheckID(msg, null, msg.content, (msg, cmd, haveUserData) => { return haveUserData })) {
                        DoData.push(msg.content); //userID
                        DoData.push(msg.author.id); //userName
                        msg.channel.send('請輸入要刪除的群組權限');
                    } else {
                        DoingCount--;
                        msg.channel.send('此用戶不存在資料，請確認，如果要關閉指令請輸入 N');
                    }
                }
                break;
            case 2:
                DoData.push(msg.content); // Power
                DoData.push(false); // IsAdmin
                msg.channel.send(`申請資料如下:\n申請人 <@${msg.author.id}>\n使用者 <@${DoData[0]}>\n刪除權限組 ${DoData[2]}\n正確 Y / 錯誤 N`);
                break;
            case 3:
                if (msg.content === 'Y') {
                    msg.channel.send('已確認，輸入資料中...');
                    //與舊資料比對，已有此人資料變進行更新
                    CheckID(msg, null, DoData[0], DeleteOldUserPower);
                    GetGas.postUserPower(DoData, function(dataED) {
                        if (dataED) {
                            //bot內變數不會更新，手動更新
                            UserPowerData.unshift({
                                'userID': DoData[0],
                                'userName': DoData[1],
                                'Joins': DoData[2],
                                'IsAdmin': DoData[3]
                            });
                            msg.channel.send('輸入完畢!');
                        } else {
                            msg.channel.send('資料輸入失敗，請重新嘗試');
                        }
                        CloseAllDoingFunction();
                    });
                } else if (msg.content === 'N') {
                    CloseAllDoingFunction();
                    msg.channel.send('已取消行為，請重新下達指令')
                } else {
                    DoingCount--;
                    msg.channel.send('無法辨識訊息，請輸入Y/N來選擇');
                }
                break;
            case 11:
                DoData.push(msg.content); //身分組ID
                DoData.push('2'); //type 2
                DoData.push('');
                msg.channel.send(`申請資料如下:\n申請人 <@${msg.author.id}>\n刪除權限組 ${DoData[0]}\n正確 Y / 錯誤 N`);
                break;
            case 12:
                if (msg.content === 'Y') {
                    msg.channel.send('已確認，輸入資料中...');
                    //與舊資料比對，沒有此身分組資料清除
                    DeleteOldPartyPower();
                    if (DoData[0] != '') {
                        GetGas.postPartyPower(DoData, function(dataED) {
                            if (dataED) {
                                //bot內變數不會更新，手動更新
                                PartyPowerData.unshift({
                                    'ID': DoData[0],
                                    'type': DoData[1],
                                    'Power': DoData[2]
                                });
                                msg.channel.send('輸入完畢!');
                            } else {
                                msg.channel.send('資料輸入失敗，請重新嘗試');
                            }
                            CloseAllDoingFunction();
                        });
                    } else {
                        msg.channel.send('輸入完畢!');
                        CloseAllDoingFunction();
                    }
                } else if (msg.content === 'N') {
                    CloseAllDoingFunction();
                    msg.channel.send('已取消行為，請重新下達指令')
                } else {
                    DoingCount--;
                    msg.channel.send('無法辨識訊息，請輸入Y/N來選擇');
                }
                break;
        }
        if (DoUserID !== '') DoingCount++;
    } catch (err) {
        CloseAllDoingFunction();
        client.channels.fetch(msg.channel.id).then(channel => channel.send('發生意外錯誤，中斷指令行為，請重新下達指令!'))
        console.log('DeleteTagNowError', err);
    }
}
```

創建刪除類方法

![30-3](https://i.imgur.com/QZUmmzj.png)

```
//用戶舊資料更新
function DeleteOldUserPower(msg, cmd, haveUserData) {
    //二次確認
    if (haveUserData) {
        if (DoData[0] == haveUserData.userID) {
            let str = haveUserData.Joins;
            DoData[2] = str.toString().replace(DoData[2], '');
            DoData[3] = haveUserData.IsAdmin;
            return true;
        } else return false;
    } else return false;
}
```

![30-4](https://i.imgur.com/6x3lpht.png)

```
//權限組舊資料更新
function DeleteOldPartyPower() {
    if (PartyPowerData) {
        const tempPartyData = PartyPowerData.find(element => {
            return element.ID == DoData[0];
        })

        if (tempPartyData == undefined) {
            DoData[0] = '';
            DoData[1] = '';
            DoData[2] = '';
        }
    }
}
```

運行看看

![30-5](https://i.imgur.com/QrQC5iq.png)

![30-6](https://i.imgur.com/vbEQ8EO.png)

![30-7](https://i.imgur.com/q9MDunU.png)

![30-8](https://i.imgur.com/RUpxxCl.png)

成功

到此，番外的部分也說完了

與基本的內容不同，多說了post的API，以及程式碼的部份相對複雜
且比起前面的篇幅，後續的文章大多都是直接貼了程式碼的順序，很少講解

想必讀起來十分艱澀吧?能讀到這裡的你是十分了不起的，恭喜你看完了這篇文章

儘管如此，這支程式仍然是不成熟的，筆者對每個功能盡量都只是點到為止，希望能把大部份的應用都帶到，後面便是要靠各位讀者
根據自己遇到的需求，來改善加強他吧，相信只要努力堅持，完成後的機器人一定會帶給各位程式能力上的提升的

那麼，用Node.js製作後台零負擔的DiscordBot到此結束
祝各位中秋佳節愉快

底下附上完整的bot.js，供參考

```
//#region 全域變數
const Discord = require('discord.js');
const client = new Discord.Client();
const ytdl = require('ytdl-core');
const ytpl = require('ytpl');
const auth = require('./JSONHome/auth.json');
const prefix = require('./JSONHome/prefix.json');
const GetGas = require('./Script/GetGas.js');
const shup = require('./JSONHome/shup.json');

//存放BaseExcelAPI資料
let BaseExcelData = false;
let UserPowerData = false;
let PartyPowerData = false;

//持續執行方法
let nowDoFunction = false;
let DoingCount = 0;
let DoUserID = '';
let DoData = undefined;

//#endregion

//#region 登入
client.login(auth.key);

client.on('ready', () => {
    GetGas.getBaseExcel(function(dataED) {
        if (dataED) {
            BaseExcelData = dataED //有資料
        }
        GetGas.getUserPower(function(dataED) {
            if (dataED) {
                UserPowerData = dataED;
            }
            GetGas.getPartyPower(function(dataED) {
                if (dataED) {
                    PartyPowerData = dataED;
                }
                console.log(`Logged in as ${client.user.tag}!`);
            });
        })
    })
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

    //續行方法
    if (nowDoFunction && msg.author.id === DoUserID) {
        nowDoFunction(msg);
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

        //禁言系統判斷
        if (!IsShut(msg, tempPrefix)) return;

        //實作
        switch (tempPrefix) {
            case '0': //文字回應功能
                BasicFunction(msg, tempPrefix);
                break;
            case '1': //音樂指令 
                MusicFunction(msg);
                break;
            case '2': //機器人tag指令
                TagFunction(msg, tempPrefix);
                break;
            default:
                BaseExcelFunction(msg);
                break;
        }
    } catch (err) {
        console.log('OnMessageError', err);
    }
});

//#endregion

//#region 基本指令系統
function BasicFunction(msg, tempPrefix) {
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
            // case 'test':
            //     const testStr2 = msg.content.split(' ');
            //     console.log(client.users.fetch(testStr2[1]).then(element => console.log(element.displayAvatarURL())));
            //     break;
    }
}

//#endregion

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
        case 'playList':
            //載入歌單
            playListMusic(guildID, msg);
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
            if (message.length > 1900) message = message.substring(0, 1900);
            client.channels.fetch(channelID).then(channel => channel.send(message))
        }
    } catch (err) {
        console.log(err, 'queueShowError');
    }
}

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
//#endregion

//#region tag系統
function TagFunction(msg, tempPrefix) {
    const cmd = msg.content.substring(prefix[tempPrefix].Value.length).split(' '); //以空白分割前綴以後的字串

    switch (cmd[0]) {
        case 'AddUser': //將使用者加入身份組
            addUserFunction(msg);
            break;
        case 'CreateParty': //創建身分組&增加身分組可tag對象
            CreatePartyFunction(msg);
            break;
        case 'Delete': //從權限組中刪除使用者 OR 刪除權限組
            DeleteTag(msg);
            break;
        default: //身份組ID
            tagOther(msg, cmd);
            break;
    }
}

//tag人
function tagOther(msg, cmd) {
    CheckID(msg, cmd, msg.author.id, (msg, cmd, haveUserData) => {
        CheckParty(msg, cmd, haveUserData, SendTagMessage);
    });
}

//判斷此人有沒有登記資料
function CheckID(msg, cmd, userID, OtherFunction) {
    const haveUserData = UserPowerData.find(element => {
        return element.userID == userID;
    })

    if (haveUserData !== undefined) {
        //有資料
        return OtherFunction(msg, cmd, haveUserData);
    } else {
        return OtherFunction(msg, cmd, false);
    }
}

//根據UserPower獲得Party
function CheckParty(msg, cmd, haveUserData, OtherFunction) {
    let havePartyPower;
    havePartyPower = PartyPowerData.filter(element => {
        if (haveUserData.Joins[i].indexOf(element.ID) != -1) {
            return element.Power.indexOf(cmd[1]) != -1
        }
    })

    if (isEmptyObject(havePartyPower)) {
        return OtherFunction(msg, cmd, haveUserData, false);
    } else {
        return OtherFunction(msg, cmd, haveUserData, havePartyPower);
    }
}

//傳送訊息單獨實例
function SendTagMessage(msg, cmd, haveUserData, havePartyPower) {
    if (haveUserData.IsAdmin) {
        msg.channel.send(`<@&${cmd[1]}>\n來自管理員<@${msg.author.id}>的指令呼叫`);
    } else if (havePartyPower) {
        msg.channel.send(`<@&${cmd[1]}>\n來自<@${msg.author.id}>的指令呼叫`);
    } else {
        msg.channel.send('無權限，請確認參數是否正確');
    }
}

//將xxx加入身分組
function addUserFunction(msg) {
    try {
        if (DoUserID === '') {
            tempIsAdmin = CheckID(msg, null, msg.author.id, function(msg, cmd, haveUserData) {
                if (haveUserData.IsAdmin) return true;
                else return false;
            });
            if (tempIsAdmin) {
                nowDoFunction = addUserFunctionNow;
                DoUserID = msg.author.id;
                DoData = new Array;
                msg.channel.send('請輸入要加入的使用者id');
            } else {
                msg.channel.send('此指令只有管理員可執行');
            }
        } else {
            msg.channel.send('有其他人正在使用續行中，請稍等');
        }
    } catch (err) {
        console.log('addUserFunctionError', err);
    }
}

//將xxx加入身份組(續行方法)
function addUserFunctionNow(msg) {
    try {
        switch (DoingCount) {
            case 0:
                DoData.push(msg.content); //加入使用者id
                DoData.push(msg.author.username); //加入申請者名字
                msg.channel.send(`請輸入要加入的群組`);
                break;
            case 1:
                DoData.push(msg.content); //加入群組
                DoData.push(false); //IsAdmin預設False不可修改
                msg.channel.send(`申請資料如下:\n申請人 <@${msg.author.id}>\n使用者 <@${DoData[0]}>\n加入權限組 ${DoData[2]}\n正確 Y / 錯誤 N`);
                break;
            case 2:
                if (msg.content === 'Y') {
                    msg.channel.send('已確認，輸入資料中...');
                    //與舊資料比對，已有此人資料變進行更新
                    CheckID(msg, null, DoData[0], EditOldUserPower);
                    GetGas.postUserPower(DoData, function(dataED) {
                        if (dataED) {
                            //bot內變數不會更新，手動更新
                            UserPowerData.unshift({
                                'userID': DoData[0],
                                'userName': DoData[1],
                                'Joins': DoData[2],
                                'IsAdmin': DoData[3]
                            });
                            msg.channel.send('輸入完畢!');
                        } else {
                            msg.channel.send('資料輸入失敗，請重新嘗試');
                        }
                        CloseAllDoingFunction();
                    });
                } else if (msg.content === 'N') {
                    CloseAllDoingFunction();
                    msg.channel.send('已取消行為，請重新下達指令')
                } else {
                    DoingCount--;
                    msg.channel.send('無法辨識訊息，請輸入Y/N來選擇');
                }
                break;
        }
        if (DoUserID !== '') DoingCount++;
    } catch (err) {
        CloseAllDoingFunction();
        client.channels.fetch(msg.channel.id).then(channel => channel.send('發生意外錯誤，中斷指令行為，請重新下達指令!'))
        console.log('addUserFunctionNowError', err);
    }
}

//用戶舊資料更新
function EditOldUserPower(msg, cmd, haveUserData) {
    //二次確認
    if (haveUserData) {
        if (DoData[0] == haveUserData.userID) {
            DoData[2] = haveUserData.Joins + ';' + DoData[2];
            DoData[3] = haveUserData.IsAdmin;
            return true;
        } else return false;
    } else return false;
}

//用戶舊資料更新
function DeleteOldUserPower(msg, cmd, haveUserData) {
    //二次確認
    if (haveUserData) {
        if (DoData[0] == haveUserData.userID) {
            let str = haveUserData.Joins;
            DoData[2] = str.toString().replace(DoData[2], '');
            DoData[3] = haveUserData.IsAdmin;
            return true;
        } else return false;
    } else return false;
}

//創建身分組&增加身分組可tag對象
function CreatePartyFunction(msg) {
    try {
        if (DoUserID === '') {
            tempIsAdmin = CheckID(msg, null, msg.author.id, function(msg, cmd, haveUserData) {
                if (haveUserData) {
                    if (haveUserData.IsAdmin) return true;
                    else return false;
                } else return false;
            });
            if (tempIsAdmin) {
                nowDoFunction = CreatePartyFunctionNow;
                DoUserID = msg.author.id;
                DoData = new Array;
                msg.channel.send('請輸入身份組名稱');
            } else {
                msg.channel.send('此指令只有管理員可執行');
            }
        } else {
            msg.channel.send('有其他人正在使用續行中，請稍等');
        }
    } catch (err) {
        console.log('CreatePartyFunctionError', err);
    }
}

//創建身分組&增加身分組可tag對象(續行)
function CreatePartyFunctionNow(msg) {
    try {
        switch (DoingCount) {
            case 0:
                DoData.push(msg.content); //身分組ID
                DoData.push('2'); //type 2
                msg.channel.send(`請輸入要加入的tagID`);
                break;
            case 1:
                DoData.push(msg.content); //加入tagID
                msg.channel.send(`申請資料如下:\n申請人 <@${msg.author.id}>\n權限組 ${DoData[0]}\ntagID ${DoData[2]}\n正確 Y / 錯誤 N`);
                break;
            case 2:
                if (msg.content === 'Y') {
                    msg.channel.send('已確認，輸入資料中...');
                    //與舊資料比對，已有此人資料變進行更新
                    EditOldPartyPower();
                    GetGas.postPartyPower(DoData, function(dataED) {
                        if (dataED) {
                            //bot內變數不會更新，手動更新
                            PartyPowerData.unshift({
                                'ID': DoData[0],
                                'type': DoData[1],
                                'Power': DoData[2]
                            });
                            msg.channel.send('輸入完畢!');
                        } else {
                            msg.channel.send('資料輸入失敗，請重新嘗試');
                        }
                        CloseAllDoingFunction();
                    });
                } else if (msg.content === 'N') {
                    CloseAllDoingFunction();
                    msg.channel.send('已取消行為，請重新下達指令')
                } else {
                    DoingCount--;
                    msg.channel.send('無法辨識訊息，請輸入Y/N來選擇');
                }
                break;
        }
        if (DoUserID !== '') DoingCount++;
    } catch (err) {
        CloseAllDoingFunction();
        client.channels.fetch(msg.channel.id).then(channel => channel.send('發生意外錯誤，中斷指令行為，請重新下達指令!'))
        console.log('CreatePartyFunctionNowError', err);
    }
}

//權限組舊資料更新
function EditOldPartyPower() {
    if (PartyPowerData) {
        const tempPartyData = PartyPowerData.find(element => {
            return element.ID == DoData[0];
        })

        if (tempPartyData !== undefined) {
            DoData[2] = tempPartyData.Power + ';' + DoData[2];
        }
    }
}

//權限組舊資料更新
function DeleteOldPartyPower() {
    if (PartyPowerData) {
        const tempPartyData = PartyPowerData.find(element => {
            return element.ID == DoData[0];
        })

        if (tempPartyData == undefined) {
            DoData[0] = '';
            DoData[1] = '';
            DoData[2] = '';
        }
    }
}

//從權限組中刪除使用者 OR 刪除權限組
function DeleteTag(msg) {
    try {
        if (DoUserID === '') {
            tempIsAdmin = CheckID(msg, null, msg.author.id, function(msg, cmd, haveUserData) {
                if (haveUserData.IsAdmin) return true;
                else return false;
            });
            if (tempIsAdmin) {
                nowDoFunction = DeleteTagNow;
                DoUserID = msg.author.id;
                DoData = new Array;
                msg.channel.send('請問要編輯使用者權限還是權限組?\n1 使用者權限 / 2 權限組');
            } else {
                msg.channel.send('此指令只有管理員可執行');
            }
        } else {
            msg.channel.send('有其他人正在使用續行中，請稍等');
        }
    } catch (err) {
        console.log('DeleteTagError', err);
    }
}

//從權限組中刪除使用者 OR 刪除權限組(續行)
function DeleteTagNow(msg) {
    try {
        switch (DoingCount) {
            case 0:
                switch (msg.content) {
                    case '1':
                        msg.channel.send('請輸入要編輯的使用者ID');
                        break;
                    case '2':
                        DoingCount = 10;
                        msg.channel.send('請輸入要編輯的權限組');
                        break;
                    default:
                        DoingCount--;
                        msg.channel.send('無法辨識訊息，請輸入1/2來選擇');
                        break;
                }
                break;
            case 1:
                if (msg.content == 'N') {
                    CloseAllDoingFunction();
                    msg.channel.send('指令關閉');
                } else {
                    if (CheckID(msg, null, msg.content, (msg, cmd, haveUserData) => { return haveUserData })) {
                        DoData.push(msg.content); //userID
                        DoData.push(msg.author.id); //userName
                        msg.channel.send('請輸入要刪除的群組權限');
                    } else {
                        DoingCount--;
                        msg.channel.send('此用戶不存在資料，請確認，如果要關閉指令請輸入 N');
                    }
                }
                break;
            case 2:
                DoData.push(msg.content); // Power
                DoData.push(false); // IsAdmin
                msg.channel.send(`申請資料如下:\n申請人 <@${msg.author.id}>\n使用者 <@${DoData[0]}>\n刪除權限組 ${DoData[2]}\n正確 Y / 錯誤 N`);
                break;
            case 3:
                if (msg.content === 'Y') {
                    msg.channel.send('已確認，輸入資料中...');
                    //與舊資料比對，已有此人資料變進行更新
                    CheckID(msg, null, DoData[0], DeleteOldUserPower);
                    GetGas.postUserPower(DoData, function(dataED) {
                        if (dataED) {
                            //bot內變數不會更新，手動更新
                            UserPowerData.unshift({
                                'userID': DoData[0],
                                'userName': DoData[1],
                                'Joins': DoData[2],
                                'IsAdmin': DoData[3]
                            });
                            msg.channel.send('輸入完畢!');
                        } else {
                            msg.channel.send('資料輸入失敗，請重新嘗試');
                        }
                        CloseAllDoingFunction();
                    });
                } else if (msg.content === 'N') {
                    CloseAllDoingFunction();
                    msg.channel.send('已取消行為，請重新下達指令')
                } else {
                    DoingCount--;
                    msg.channel.send('無法辨識訊息，請輸入Y/N來選擇');
                }
                break;
            case 11:
                DoData.push(msg.content); //身分組ID
                DoData.push('2'); //type 2
                DoData.push('');
                msg.channel.send(`申請資料如下:\n申請人 <@${msg.author.id}>\n刪除權限組 ${DoData[0]}\n正確 Y / 錯誤 N`);
                break;
            case 12:
                if (msg.content === 'Y') {
                    msg.channel.send('已確認，輸入資料中...');
                    //與舊資料比對，沒有此身分組資料清除
                    DeleteOldPartyPower();
                    if (DoData[0] != '') {
                        GetGas.postPartyPower(DoData, function(dataED) {
                            if (dataED) {
                                //bot內變數不會更新，手動更新
                                PartyPowerData.unshift({
                                    'ID': DoData[0],
                                    'type': DoData[1],
                                    'Power': DoData[2]
                                });
                                msg.channel.send('輸入完畢!');
                            } else {
                                msg.channel.send('資料輸入失敗，請重新嘗試');
                            }
                            CloseAllDoingFunction();
                        });
                    } else {
                        msg.channel.send('輸入完畢!');
                        CloseAllDoingFunction();
                    }
                } else if (msg.content === 'N') {
                    CloseAllDoingFunction();
                    msg.channel.send('已取消行為，請重新下達指令')
                } else {
                    DoingCount--;
                    msg.channel.send('無法辨識訊息，請輸入Y/N來選擇');
                }
                break;
        }
        if (DoUserID !== '') DoingCount++;
    } catch (err) {
        CloseAllDoingFunction();
        client.channels.fetch(msg.channel.id).then(channel => channel.send('發生意外錯誤，中斷指令行為，請重新下達指令!'))
        console.log('DeleteTagNowError', err);
    }
}

//#endregion

//#region 對話資料庫系統
function BaseExcelFunction(msg) {
    const messageED = GetBaseExcelData(msg);
    if (messageED) msg.channel.send(messageED);
}

//#endregion

//#region 子類方法
//獲取頭像
function GetMyAvatar(msg) {
    try {
        return {
            files: [{
                attachment: msg.users.author.displayAvatarURL('png', true),
                name: 'avatar.jpg'
            }]
        };
    } catch (err) {
        console.log('GetMyAvatar,Error');
    }
}

//BaseExcel字串比對
function GetBaseExcelData(msg) {
    try {
        if (BaseExcelData) {
            const userMessage = msg.content;

            e = BaseExcelData.filter(element => {
                return element.NAME === userMessage;
            })

            if (e.length != 0) return e[0].VALUE;
            else return false;
        }
    } catch (err) {
        console.log('GetBaseExcelDataError', err);
    }
}

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

//ArrayIsEmpty
function isEmptyObject(obj) {
    return !Object.keys(obj).length;
}

//關閉續行方法
function CloseAllDoingFunction() {
    nowDoFunction = false;
    DoingCount = 0;
    DoUserID = '';
    DoData = undefined;
}
//#endregion
```