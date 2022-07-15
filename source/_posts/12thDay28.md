---
title: Day28 - tag控管機制(2)
date: 2020-09-28 09:25:39
tags: [node.js,bot,discord,discord.js,教學,12th鐵人賽]
categories:
  - [鐵人賽, 用Node.js製作後台零負擔的DiscordBot]
---
今天來把postAPI跟續行的框架與加入使用者至身份組的功能寫好

<!-- more -->

請打開之前再google雲端上創建的GAS ， getUserPower

![28-1](https://i.imgur.com/cPksdp2.png)

原本的程式寫在doGet方法，我們在doGet方法下新增一個doPost方法，然後寫上這些東西

```
function doPost(e){
  var para = e.parameter; // 存放 post 所有傳送的參數
  
  var id = '1mQ6qTJfOs3Gv5--K9r87w56wmDc3hUcpHm5hF1YKTms'; //抓取表單
  var spreadsheet = SpreadsheetApp.openById(id); // Sheet id
  var sheet1 = spreadsheet.getSheetByName("UserPower"); // 根據表格名稱取表
  var rowLength = sheet1.getLastRow()-1;
  var columnLength = sheet1.getLastColumn();
  var data = sheet1.getRange(2,1,rowLength,columnLength).getValues(); // 取得的資料
  var userID   = para.userID,
      userName = para.userName,
      Joins    = para.Joins,
      IsAdmin  = para.IsAdmin;
  
  var upData = [];
  
  for(i=0;i<=rowLength-1;i++){
    upData = data[i]
    if((upData[0]==userID) == false){
      upData = undefined;
    }
  
  
    if(upData != undefined){
      sheet1.getRange(i+2, 1).setValue(userID);
      sheet1.getRange(i+2, 2).setValue(userName);
      sheet1.getRange(i+2, 3).setValue(Joins);
      sheet1.getRange(i+2, 4).setValue(IsAdmin);
      return ContentService.createTextOutput(upData).setMimeType(ContentService.MimeType.JSON);
    }
  }
  
  
  sheet1.appendRow([userID,userName,Joins,IsAdmin]); // 插入一列新的資料
  var dataExportFormat = JSON.stringify(para);
  return ContentService.createTextOutput(dataExportFormat).setMimeType(ContentService.MimeType.JSON);
}
```

doGet與doPost是GAS默認的Get與Post方法
使用他的Url執行Get請求就會進doGet
反之post就會進doPost


回到程序，一樣在auth加入url
雖然值跟Get方法時的Url一樣，不過這樣寫會比較好分辨，之後想改成兩個檔案也可以

![28-2](https://i.imgur.com/znAkUYg.png)

因為我們要在post請求帶入參數，這邊將請求URL的宣告直接放到實作裡面
這樣在創建的同時也會帶入參數

![28-3](https://i.imgur.com/tiDcUkk.png)

```
exports.postUserPower = function(bodyData, callback) {
    const userPowerPost = {
        'method': 'POST',
        'url': auth.Gas.Post.UserPower,
        'headers': {},
        form: {
            'userID': bodyData[0],
            'userName': bodyData[1],
            'Joins': bodyData[2],
            'IsAdmin': bodyData[3]
        }
    };
    request(userPowerPost, function(error, response) {
        try {
            if (error) {
                console.log('postUserPowerError1', error);
                callback(false);
            } else {
                callback(true);
            }
        } catch (err) {
            console.log('postUserPowerError2', err);
            callback(false);
        }
    });
};
```

在全域變數(最上方)新增這四個東西

![28-4](https://i.imgur.com/qJhS30L.png)

在子類方法(最下方)加入初始化方法

![28-5](https://i.imgur.com/bSFGj1I.png)

在onMessage中間加入續行方法入口

![28-6](https://i.imgur.com/4NE1BQC.png)

```
    //續行方法
    if (nowDoFunction && msg.author.id === DoUserID) {
        nowDoFunction(msg);
        return;
    }
```

在tag系統入口加入addUser

![28-7](https://i.imgur.com/66thUHz.png)

實例addUserFunction

![28-8](https://i.imgur.com/Fxh4bSy.png)

```
//將xxx加入身分組
function addUserFunction(msg) {
    try {
        if (DoUserID === '') {
            nowDoFunction = addUserFunctionNow;
            DoUserID = msg.author.id;
            DoData = new Array;
            msg.channel.send('請輸入要加入的使用者id');
        } else {
            msg.channel.send('有其他人正在使用續行中，請稍等');
        }
    } catch (err) {
        console.log('addUserFunctionError', err);
    }
}
```

實例addUserFunctionNow(續行方法)

```
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
                    CheckID(msg, null, EditOldUserPower, DoData[0]);
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
```

微調CheckID與CheckParty
將userID的取值獨立，將admin判斷拉到CheckParty

![28-9](https://i.imgur.com/EFqmBqa.png)

![28-10](https://i.imgur.com/6Oos50b.png)

實例EditOldUserPower

![28-11](https://i.imgur.com/0HXohq7.png)

---

# 測試環節

![28-12](https://i.imgur.com/HWloU7g.png)

![28-13](https://i.imgur.com/dJplXOG.png)

![28-14](https://i.imgur.com/ppMXmB4.png) 

![28-15](https://i.imgur.com/EO9pkZt.png)

完成

因為今天有修改到Day26的東西，這可能導致教學有點雜亂
底下附上tag系統目前的程式碼，當作彌補

```
//#region tag系統
function TagFunction(msg, tempPrefix) {
    const cmd = msg.content.substring(prefix[tempPrefix].Value.length).split(' '); //以空白分割前綴以後的字串

    switch (cmd[0]) {
        case 'addUser': //將使用者加入身份組
            addUserFunction(msg);
            break;
        default: //身份組ID
            CheckID(msg, cmd, CheckParty, msg.author.id);
            break;
    }
}

//判斷此人有沒有登記資料
function CheckID(msg, cmd, OtherFunction, userID) {
    const haveUserData = UserPowerData.find(element => {
        return element.userID == userID;
    })

    if (haveUserData !== undefined) {
        //有資料
        return OtherFunction(msg, cmd, haveUserData);
    } else {
        return false;
    }
}

//根據UserPower獲得Party
function CheckParty(msg, cmd, haveUserData) {

    if (haveUserData.IsAdmin) {
        //是管理員，直接做後續事情
        return SendTagMessage(msg, `<@&${cmd[1]}>\n來自管理員<@${msg.author.id}>的指令呼叫`);
    }

    let havePartyPower;
    havePartyPower = PartyPowerData.filter(element => {
        if (haveUserData.Joins[i].indexOf(element.ID) != -1) {
            return element.Power.indexOf(cmd[1]) != -1
        }
    })

    if (isEmptyObject(havePartyPower)) {
        SendTagMessage(msg, '無權限，請確認參數是否正確');
    } else {
        SendTagMessage(msg, `<@&${cmd[1]}>\n來自<@${msg.author.id}>的指令呼叫`);
    }
}

//傳送訊息單獨實例
function SendTagMessage(msg, data) {
    msg.channel.send(data);
}

//將xxx加入身分組
function addUserFunction(msg) {
    try {
        if (DoUserID === '') {
            nowDoFunction = addUserFunctionNow;
            DoUserID = msg.author.id;
            DoData = new Array;
            msg.channel.send('請輸入要加入的使用者id');
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
                    CheckID(msg, null, EditOldUserPower, DoData[0]);
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
    if (DoData[0] == haveUserData.userID) {
        DoData[2] = haveUserData.Joins + ';' + DoData[2];
        DoData[3] = haveUserData.IsAdmin;
        return true;
    } else return false;
}
//#endregion
```