---
title: Day29 - tag控管機制(3)
date: 2020-09-29 09:27:13
tags: [node.js,bot,discord,discord.js,教學,12th鐵人賽]
categories:
  - [鐵人賽, 用Node.js製作後台零負擔的DiscordBot]
---
昨天我們做好了 將使用者加入身份組指令
今天把 創建身分組的指令做好

<!-- more -->

跟昨天一樣，請先開啟GAS，身分組的GAS叫做getPartyPower
新增以下

![29-1](https://i.imgur.com/eqoYtRi.png)

```
function doPost(e){
  var para = e.parameter; // 存放 post 所有傳送的參數
  
  var id = '1mQ6qTJfOs3Gv5--K9r87w56wmDc3hUcpHm5hF1YKTms'; //抓取表單
  var spreadsheet = SpreadsheetApp.openById(id); // Sheet id
  var sheet1 = spreadsheet.getSheetByName("PartyPower"); // 根據表格名稱取表
  var rowLength = sheet1.getLastRow()-1;
  var columnLength = sheet1.getLastColumn();
  var data = sheet1.getRange(2,1,rowLength,columnLength).getValues(); // 取得的資料
  var ID   = para.ID,
      type = para.type,
      Power    = para.Power;
  
  var upData = [];
  
  for(i=0;i<=rowLength-1;i++){
    upData = data[i]
    if((upData[0]==ID) == false){
      upData = undefined;
    }
  
  
    if(upData != undefined){
      sheet1.getRange(i+2, 1).setValue(ID);
      sheet1.getRange(i+2, 2).setValue(type);
      sheet1.getRange(i+2, 3).setValue(Power);
      return ContentService.createTextOutput(upData).setMimeType(ContentService.MimeType.JSON);
    }
  }
  
  
  sheet1.appendRow([ID,type,Power]); // 插入一列新的資料
  var dataExportFormat = JSON.stringify(para);
  return ContentService.createTextOutput(dataExportFormat).setMimeType(ContentService.MimeType.JSON);
}
```

加到auth.json

![29-2](https://i.imgur.com/0brSMZw.png)

GetGas.js

![29-3](https://i.imgur.com/9KlDFkj.png)

bot.js

![29-4](https://i.imgur.com/oKcdCTg.png)

![29-5](https://i.imgur.com/nQgPf3p.png)

```
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
                msg.channel.send(`申請資料如下:\n申請人 <@${msg.author.id}>\n權限組 <@${DoData[0]}>\ntagID ${DoData[2]}\n正確 Y / 錯誤 N`);
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
```

![29-6](https://i.imgur.com/FB6RfAd.png)

作法基本上跟上次新增使用者一樣
試著運行看看

![29-7](https://i.imgur.com/x3Qx41S.png)

![29-8](https://i.imgur.com/Mf6vO49.png)

![29-9](https://i.imgur.com/VH2f5L2.png)

成功
明天就是最後一篇了，筆者會把刪除的指令做好
其實跟現在新增的作法是大同小異的，各位不彷試試看

為了將CheckID與CheckParty的分工化更明確一點，因此有稍微修改程式碼
這邊貼上程式碼

```
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
        OtherFunction(msg, cmd, haveUserData, false);
    } else {
        OtherFunction(msg, cmd, haveUserData, havePartyPower);
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

//#endregion
```