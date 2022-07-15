---
title: Day26 - tag控管機制(1)
date: 2020-09-26 09:54:26
tags: [node.js,bot,discord,discord.js,教學,12th鐵人賽]
categories:
  - [鐵人賽, 用Node.js製作後台零負擔的DiscordBot]
---
昨天我們描繪了權限系統的架構，今天來建立身份組環境

<!-- more -->

打開我們之前的試算表，新增兩個table

![26-1](https://i.imgur.com/uoHRTQ9.png)

UserPower
代表成員table

userID
discord的userID，主要用來辨識訊息方是否是此用戶

userName
用處一樣不大，給人看的

Joins
表示此用戶有哪些身份組的權限，筆者打算之後把所有身份都寫在這欄，用分號來做區隔

IsAdmin
管理員開關，開啟後不做任何身份組判斷，可以使用任何功能

下圖中，筆者的userID有E有+的，這是Excel自動給予的格式，可以在左上角看到實際數值，讀取時仍然是讀取165753385385984000，不用修改

![26-2](https://i.imgur.com/2ilbHq9.png)

PartyPower
代表身份組table

ID
該身份組的ID，使用者透過這個ID來判斷自己有哪些權限

type
代表這個身份組的類型
目前暫定1是禁言類身份組，2是tag權限身份組

Power
代表實際可行駛的權限，會根據type的不同有不同的含意
在tag權限下，Power帶入tagID，代表可以行使此tag
這邊帶入Power的是身份組ID

![26-3](https://i.imgur.com/uNgxfC1.png)

教一下手動獲取身份組ID

把人點開，對身份組右鍵

![26-4](https://i.imgur.com/Z2t6akk.png)

或是先拉出tag，然後在tag前方加上一個反斜線

![26-5](https://i.imgur.com/vtlv8pE.png)

![26-6](https://i.imgur.com/tlpvlge.png)

如果以上操作遇到問題，甚至是UserID也抓不到
可以看一下[這篇文章](https://support.discord.com/hc/zh-tw/articles/206346498-%E6%88%91%E5%9C%A8%E5%93%AA%E8%A3%A1%E5%8F%AF%E4%BB%A5%E6%89%BE%E5%88%B0%E6%88%91%E7%9A%84%E7%94%A8%E6%88%B6-%E6%9C%8D%E5%8B%99%E5%99%A8-%E6%B6%88%E6%81%AFID-)

或是找找怎麼開啟Discord的開發者模式

---

再來我們要新增兩個GAS檔案

![26-7](https://i.imgur.com/L7WOiyD.png)

```
function doGet(e) {
  var id = '你的ID'; //抓取表單
  var spreadsheet = SpreadsheetApp.openById(id); // Sheet id
  var sheet = spreadsheet.getSheetByName("UserPower"); // 根據表格名稱取表
  var rowLength = sheet.getLastRow()-1; //取行長度
  var columnLength = sheet.getLastColumn(); //取列長度
  var data = sheet.getRange(2,1,rowLength,columnLength).getValues(); // 取得的資料
  
  var dataExport = [];
  
  for(i in data){
    if(data[i][0] != ""){
    dataExport[i] = {
      userID:     data[i][0],
      userName:   data[i][1],
      Joins:   data[i][2],
      IsAdmin: data[i][3]
      }
    }
  }
  
  
  var dataExportFormat = JSON.stringify(dataExport);
  return ContentService.createTextOutput(dataExportFormat).setMimeType(ContentService.MimeType.JSON);
}
```

![26-8](https://i.imgur.com/7P09NvS.png)

```
function doGet(e) {
  var id = '你的ID'; //抓取表單
  var spreadsheet = SpreadsheetApp.openById(id); // Sheet id
  var sheet = spreadsheet.getSheetByName("PartyPower"); // 根據表格名稱取表
  var rowLength = sheet.getLastRow()-1; //取行長度
  var columnLength = sheet.getLastColumn(); //取列長度
  var data = sheet.getRange(2,1,rowLength,columnLength).getValues(); // 取得的資料
  
  var dataExport = [];
  
  for(i in data){
    if(data[i][0] != ""){
    dataExport[i] = {
      ID:     data[i][0],
      type:   data[i][1],
      Power:   data[i][2]
      }
    }
  }
  
  
  var dataExportFormat = JSON.stringify(dataExport);
  return ContentService.createTextOutput(dataExportFormat).setMimeType(ContentService.MimeType.JSON);
}
```

記得都要存檔後，發佈成網路應用，獲取URL

![26-9](https://i.imgur.com/iohSLWG.png)

(之前示範JSONArray的[]，可以拿掉)
跟baseExcel一樣，我們會希望bot在啟動時就把表都讀取進來，從雲端下載成本地db的感覺，順便做資料二次處理

![26-10](https://i.imgur.com/s3bibHM.png)

```
const userPower = {
    'method': 'GET',
    'url': auth.Gas.Get[0].UserPower,
    'headers': {}
};

const partyPower = {
    'method': 'GET',
    'url': auth.Gas.Get[0].PartyPower,
    'headers': {}
};
```

![26-11](https://i.imgur.com/hykI0wE.png)
 
![26-12](https://i.imgur.com/2K8yobJ.png)

```
exports.getUserPower = function(callback) {
    let backValue = new Array;
    request(userPower, function(error, response) {
        try {
            if (error) {
                console.log('getUserPowerError1', error);
                callback(false);
            } else {
                const data = JSON.parse(response.body); //接收回傳(response)的body
                for (i in data) {
                    backValue.push(data[i]);
                    backValue[i].Joins = backValue[i].Joins.split(';');
                }
                callback(backValue);
            }
        } catch (err) {
            console.log('getUserPowerError2', err);
            callback(false);
        }
    });
};

exports.getPartyPower = function(callback) {
    let backValue = new Array;
    request(partyPower, function(error, response) {
        try {
            if (error) {
                console.log('getPartyPowerError1', error);
                callback(false);
            } else {
                const data = JSON.parse(response.body); //接收回傳(response)的body
                for (i in data) {
                    backValue.push(data[i]);
                    backValue[i].Power = backValue[i].Power.split(';');
                }
                callback(backValue);
            }
        } catch (err) {
            console.log('getPartyPowerError2', err);
            callback(false);
        }
    });
};
```

![26-13](https://i.imgur.com/PEI3XAU.png)

(開始變成callback地獄了)

資料都接到也處理好了，再來要用這些資料實作功能

增加指令列表的一個新系統

![26-14](https://i.imgur.com/8g2yKAQ.png)

在message事件新增入口

![26-15](https://i.imgur.com/5k6UBOp.png)

然後做出實際功能

![26-16](https://i.imgur.com/f4FEeTh.png)

```
//#region tag系統
function TagFunction(msg, tempPrefix) {
    const cmd = msg.content.substring(prefix[tempPrefix].Value.length).split(' '); //以空白分割前綴以後的字串

    switch (cmd[0]) {
        case '其餘指令':
            break;
        default: //身份組ID
            CheckID(msg, cmd, CheckParty);
            break;
    }
}

//判斷此人有沒有登記資料
function CheckID(msg, cmd, OtherFunction) {
    const haveUserData = UserPowerData.find(element => {
        return element.userID == msg.author.id;
    })

    if (haveUserData !== undefined) {
        //有資料
        if (haveUserData.IsAdmin) {
            //是管理員，直接做後續事情
            return SendTagMessage(msg, `<@&${cmd[1]}>\n來自管理員<@${msg.author.id}>的指令呼叫`);
        } else {
            //不是管理員，先看有甚麼群組
            return OtherFunction(msg, cmd, haveUserData);
        }
    }
}

//根據UserPower獲得Party
function CheckParty(msg, cmd, haveUserData) {
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
```

最後補個判斷Array是不是空集合的小function

![26-17](https://i.imgur.com/LWubzzI.png)

---

大致解說一下

![26-18](https://i.imgur.com/I4egiAN.png)

Tag系統的入口function
跟其他系統一樣，判斷要使用甚麼指令
今天先把預設(default)指令，也就是tag身分組做出來

![26-19](https://i.imgur.com/leRaRUt.png)

檢查UserPower中是否有此人資料，以及是否是管理員
如果有資料且不是管理員，繼續檢查其所屬身份組權限

![26-20](https://i.imgur.com/5u8N8DC.png)

檢查身份組中是否有權限符合這次要tag的對象id，有的話代表此次指令滿足權限，給予tag

我們跑看看

![26-21](https://i.imgur.com/R4VEGBa.png)

成功
