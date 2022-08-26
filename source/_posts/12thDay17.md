---
toc: true
title: Day17 - GAS抓表(1)
date: 2020-09-17 09:48:31
tags: [node.js,bot,discord,discord.js,教學,12th鐵人賽]
categories:
  - [鐵人賽, 用Node.js製作後台零負擔的DiscordBot]
---
今天我們來寫GAS

<!-- more -->

## 文件創建

首先請打開google，登入你自己的google雲端，並且在喜歡的地方創建一個資料夾，取名為DiscordDataBaseApi

![17-1](https://i.imgur.com/rczINQm.png)

右鍵分別創建一個試算表跟一個GAS

![17-2](https://i.imgur.com/gGDTERM.png)

![17-3](https://i.imgur.com/EIbdgPE.png)

兩個文件創立後都會直接開一個新視窗
Excel取名為MyData，像我們一樣隨便輸入一些資料
然後複製網址上面d/ 到 /edit 中間的亂碼，我的是
1mQ6qTJfOs3Gv5--K9r87w56wmDc3hUcpHm5hF1YKTms

這串英數是我們Excel的ID，只要把這串亂碼給Google看，他就知道你找的是這張表

![17-4](https://i.imgur.com/EPVxxkb.png)

我們回到 GAS ，填入以下程式

```
var id = '你的表格ID'; //抓取表單
  var spreadsheet = SpreadsheetApp.openById(id); // Sheet id
  var sheet = spreadsheet.getSheets()[0]; // 要第幾個sheet？ 0 就是第一個
  var rowLength = sheet.getLastRow()-1; //取行長度
  var columnLength = sheet.getLastColumn(); //取列長度
  var data = sheet.getRange(2,1,rowLength,columnLength).getValues(); // 取得的資料
```

把剛剛的id給GAS抓表，抓到表後讀取行列範圍，然後從範圍中抓取資料
那一長串程式碼全都是google提供的function，雖然好像有library可以看，筆者是建議記下來就好

我們範圍是從第2行開始抓取資料到最底，這是因為我們表格的第一行屬於標題行，給使用者看的，我們就不抓取這行資料

![17-5](https://i.imgur.com/YGdSESn.png)

再來幫我新增這幾行資料

```
  var dataExport = {};
  
  for(i in data){
    if(data[i][0] != ""){
    dataExport[data[i][0]] = {
      DATE:   data[i][1],
      NAME:   data[i][2],
      VALUE:  data[i][3]
      }
    }
  }
```

如果對json操作有一點經驗的同學，對這幾行應該不陌生
把data中的資料一個個串成json，這樣才方便我們做後續處理

![17-6](https://i.imgur.com/mewJW4N.png)

最後加上這行

```
  var dataExportFormat = JSON.stringify(dataExport);
  return ContentService.createTextOutput(dataExportFormat).setMimeType(ContentService.MimeType.JSON);
```

把整理好的資料return回去
GAS回傳需要先經手過他們的方法，API接收到的資料才是正常的
這部份當成return dataExport就可以了。

## 發布

表格都填完，GAS都寫好後，我們就能抓取到表格資料了
但是程式該怎麼訪問GAS呢?
為了讓程式可以訪問到GAS，我們需要將GAS做成API
確認程式存檔後，幫我點左上角發布->部屬為網頁應用程式

![17-7](https://i.imgur.com/jR2dTYm.png)

會有三個下拉框出現
1.	是版本號
2.	發布者
3.	存取權限

因為是第一次發布，版本一定是1
發布者是你就好不要動
這邊要注意第三點，務必設定成Anyone,even anonymous
確定無誤後我們點擊Deploy，他會要你核對權限，一路允許就好

![17-8](https://i.imgur.com/HD5slmK.png)

都完成後，我們最後會拿到一組連結，我們試著將連結放在瀏覽器上

![17-9](https://i.imgur.com/mZh9b3a.png)

如果成功就會像筆者這樣拿到表格上的檔案了!
