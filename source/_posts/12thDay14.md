---
title: Day14 - Heroku與Git，介紹與安裝
date: 2020-09-14 14:10:55
tags: [node.js,bot,discord,discord.js,教學,12th鐵人賽]
categories:
  - [鐵人賽, 用Node.js製作後台零負擔的DiscordBot]
---
好勒，上禮拜我們終於把基本的音樂系統做好
現在你的機器人支援多種功能，加上你自己做的其他系統，已經是一個強大的機器人了!

<!-- more -->

之後如果我要使用機器人，只要打開cmd運行node bot，然後電腦一直開著就好

- 一直開著就好
- 自己不在其他人就沒辦法使用bot
- 程序如果掛掉要自已重啟

其實這就是將自己的電腦做為後端主機在運行bot
而這方法對於平常沒有長時間開機習慣的使用者來說是略為有些負擔了
就算是順便開著也要擔心程式會不會自己崩潰跳閘

也因此，今天我們就會來解決這個問題，同時也是終於能提到我們的主題啦

---
# 後端0負擔

一個面向使用者的服務都會有
一個前端視覺介面(Discord)
一個後端(bot.js)
再在後端的後面獨立出一個資料庫主機就更好了(SQL)

後端0負擔的意思是我們不必再支付運行程序的電費等維護費用
那麼該怎麼做才能實現呢?其實也很簡單，我們把程序給其他人的電腦跑，讓他幫你管就好，也就是
### 雲端託管

![14-1](https://i.imgur.com/7OKEagE.png)

[Heroku官方網站](https://www.heroku.com/)

Heroku是支援多語言的全自動託管平台
只要將你的程序放上去並且做好相關設定，程序就會在他們的主機上自動運行


# 註冊Heroku帳號

請先到[這個網址](https://signup.heroku.com/login)註冊帳號資訊

![14-2](https://i.imgur.com/7PeESWm.png)

First name姓
Last name名
Email Address信箱
Role職業
Primary Development Language開發語言

基本上只要信箱跟開發語言沒打錯選錯就好，填好後我們直接送出

![14-3](https://i.imgur.com/N7yKXIJ.png)

到這個步驟就代表前面填的資料ok，請去收信

![14-4](https://i.imgur.com/GeRJh01.png)

點擊信中的連結

![14-5](https://i.imgur.com/oVhFOKt.png)

這邊他要你重複輸入密碼，需8碼，由英數符號組成

![14-6](https://i.imgur.com/1PBEoJs.png)

一路確認後就會來到這裡了
這裡是heroku的後台，左側是創建我們的應用程序專案，右側是成立小組

不過我們通常會透過 Heroku CLI 來操作，所以不用管這兩個東東，我們繼續做


# 安裝Heroku CLI

點擊[這個網址](https://devcenter.heroku.com/articles/heroku-cli#windows)

按照你的作業系統安裝對應的版本，通常是Windows 64-bit

![14-7](https://i.imgur.com/j8Nhzgo.jpg)

一路next就好，最後Close

最後我們開啟終端機(cmd)，注意必須是重新開啟的cmd，安裝前已經開啟的不行
在上面輸入heroku
![14-8](https://i.imgur.com/Q5PDR5H.png)

只要出現類似這樣的畫面就代表安裝成功了
如果沒有成功出現，可以先重開機看看，再不然可能是你的安裝版本有錯，電腦不是64位元等

成功的話我們繼續輸入 heroku login

![14-9](https://i.imgur.com/4riBzSS.png)

在鍵盤上輸入除了q以外的按鍵 = 同意他開啟瀏覽器提供登入

![14-10](https://i.imgur.com/hIbxrs0.png)

![14-11](https://i.imgur.com/yUICBY3.png)

chrome會自動打開，因為我們前面剛在heroku註冊，所以網頁還存著登入訊息，直接按Log In，回頭看cmd就會顯示登入成功了!

這樣Heroku CLI就裝好了，我們再來安裝Git

# Git安裝

Git是一種提供程式版本控制的語言，最常見的例子是GitHub
透過Git語言，我們可以將專案製作成Git專案，然後透過Git將程式推送到雲端，並且保證每個版本間的修改與來源都得到紀錄

Heroku正是依循Git的規則來上傳下載程式

點擊[這個網址](https://git-scm.com/download/win)

一樣選擇對應的版本
安裝時的選項很多，請跟我底下的圖片選擇一樣

![14-12](https://i.imgur.com/DprmCvj.jpg)

![14-13](https://i.imgur.com/Y0z1v5M.jpg)

路徑跟我不一樣沒關係，總之要照他預設給你的，不要改

![14-14](https://i.imgur.com/MqCh8g0.jpg) 

![14-15](https://i.imgur.com/jsvzoZd.jpg)

![14-16](https://i.imgur.com/TlaJ0d8.jpg)

![14-17](https://i.imgur.com/ME0BGhq.jpg)

![14-18](https://i.imgur.com/NnHcvxN.jpg)

![14-19](https://i.imgur.com/EJs2X40.jpg)

![14-20](https://i.imgur.com/aw4G31d.jpg)

![14-21](https://i.imgur.com/ZJTODzR.jpg)

這樣就安裝好Git了，跟剛剛一樣，我們開一個新的cmd測試是否安裝成功

![14-22](https://i.imgur.com/cG2Rs1B.png)

失敗的話，除了版本問題以外，有可能是PATH檔不正確，可以拿這個keyword去排除問題試試看

都沒問題的話，我們輸入以下兩個指令

git config --global user.name "smile"
git config --global user.email "a28826252252@gmail.com"

![14-23](https://i.imgur.com/VMeScbF.png)

這是設定你的使用者名稱與信箱
我的名稱是smile，你要改成你自己的稱呼，信箱與heroku一樣就可以了

之後透過git推送時，都會以這個稱呼與信箱來識別
這樣Heroku跟Git的前置作業都做好了，明天將專案推上Heroku
