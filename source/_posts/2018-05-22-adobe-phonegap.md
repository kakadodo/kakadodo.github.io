---
title: 不用 CLI 也能製作 Andriod APP - Adobe PhoneGap
keywords:
  - Adobe PhoneGap, Android App, Cordova
categories:
  - web other
tags:
  - Adobe PhoneGap
thumbnailImagePosition: left
date: 2018-05-22 08:38:34
thumbnailImage: https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/2018-05-22-adobe-phonegap-1.jpg?alt=media&token=d121e35d-c152-4143-b389-582d239e1bdf
---

我絕對沒有要踏入 APP 開發的深淵...實務所需，踏邊邊應該極限了吧 QQ
<!-- more -->
![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/2018-05-22-adobe-phonegap-1.jpg?alt=media&token=d121e35d-c152-4143-b389-582d239e1bdf "不用 CLI 也能製作 Andriod APP - Adobe PhoneGap")

照理說 APP 開發是軟體工程的範圍，但現在的前端開發能力越來越廣 + 強大，如果用前端來開發 APP 是可能的嗎???
這問題連想都不用想，已經有人把這概念實際做出來了 Σ(ﾟдﾟ)

能夠應用 html, css 及 javascript 做出 APP 軟體，就是靠 Cordova 這個腳本框架，關於 Cordova 的故事有興趣可以估狗維基百科，簡而言之這個框架是佛心的 open source，只要有需要你就可以用~他也提供很多能夠連接裝置硬體的 API，就算不會各廠手機原生的程式語言，也能藉此與它們溝通。

當然也不是說有了這個就不需要原生語言啦，要做出大型應用或遊戲類型等要求流暢度、高互動的軟體，還是要靠原生語言才行。Cordava 能做好的是讓一般 web 網頁結構也能包裝成一個行動裝置的 APP。

而 Adobe PhoneGap 則是 Cordova 在最初階段時 Adobe 公司額外拉出的服務，它包含了 Cordova 核心，並且有相當程度的便利性來製作 APP，真心覺得 Adobe 公司很會賺錢...總是可以生出一堆神奇的軟體讓人花錢用(?)

實際測試過有三種方式可以開發 Cordova 應用:
1. [Cordova CLI](https://cordova.apache.org/)
  自家出產應該沒甚麼好說的，主流開發 Cordova 應用的方式，但就是要跟 command line 當好朋友，排斥用 CLI 的人可能會覺得用的很煎熬 ｡ﾟヽ(ﾟ´Д`)ﾉﾟ｡
  也因為是 CLI 的關係，一些配置會需要另外打指令碼來產生，所以相關文件要仔細閱讀過才會知道流程要怎麼走，最後也是用指令打包出 APP

2. [Visual Studio IDE](https://msdn.microsoft.com/zh-tw/library/dn879821.aspx)
  Visual Studio 本來就是個融合多種程式開發語言的 IDE，他們也有提供開發 Cordova 應用的模組喔!!個人覺得滿好用的，在空白專案建立的同時，會自動幫你設好專案的結構，重要的配置檔 config.xml 也幫你寫好好，不太需要自己爬文去補配置語法。相關的 API 也會以擴充功能的方式讓你直接下載安裝，安裝好的同時，API 的配置檔也幫你寫進去了，超棒棒來著!!
  另外強大的一點是，提供多種裝置模擬器測試，也可連接實際裝置測試，邊寫邊改 code，寫好後也能使用內建功能一鍵佈署，APP 就被打包出來了!
  講成這樣應該要介紹 Visual Studio 才對啊!!但想想當初在研究這個花了不少時間~且會需要額外配置 Android AVD、SDK 等裝置相關套件才能正常運作...故..有興趣請自行估狗(逃避)

3. [Adobe PhoneGap CLI](https://build.phonegap.com/)
  Adobe PhoneGap 本身提供兩種方式來開發，一種跟 Cordova CLI 差不多，一樣以 npm 來安裝。另一種就是官方提供的桌機板應用程式(Windows / Mac)，等於是給你 GUI 介面來做等同於 CLI 做的事啦~
  配置好後，搭配 Adobe 線上的 PhoneGap Build 就可以打包成 APP 了!
  ![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/2018-05-22-adobe-phonegap-5.jpg?alt=media&token=a7be2513-157b-4c5e-8260-c277f17649cc "Adobe account 選擇") 
  要使用 PhoneGap Build 需要有 Adobe 的帳號，一般帳號有一個免費的私有 APP 空間，APP的大小需在 50MB 內，如果要放更多 APP 空間的話，就要成為付費會員囉!
  PhoneGap Build 的特點之一就是可以讓你在沒有 Android SDK 的情況下也能打包 APP，並且放置在它提供的雲端空間讓人下載，這樣即使沒有上架到 Google 商店，只要知道連結都可以下載到 APP。


![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/2018-05-22-adobe-phonegap-2.jpg?alt=media&token=a1c4bc8a-3b4f-4591-8345-7c9e158d9d49 "Adobe PhoneGap GUI 介面")
PhoneGap 官網有非常親民簡單的圖文使用教學，跟著步驟做應該不會有問題。介面很簡單直覺，+號按了可以新增專案或開啟現有專案，-號則是關閉現有專案的執行，預設建立專案或開啟專案後，PhoneGap 會開啟本地端的伺服器，這樣就可以邊寫 code 邊看畫面。
PhoneGap 也提供多種建立專案的 template，可依照自己需求選擇。

![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/2018-05-22-adobe-phonegap-3.jpg?alt=media&token=9bcbf2a6-7de0-4ff3-b899-c9685f0ace79 "PhoneGap 自動生成的文件結構")
(以 hellow world template 為示例)
專案建立後，打開資料夾可以看到自動幫你生好的資料結構，主要會動到的只有 **www資料夾** 跟 **config.xml** (plugin 資料夾是在有需要使用行動裝置硬體的 API 才會用到，不然也可以略過)，www 資料夾就是主要放置 html、css、javascript 及靜態資料的地方，其中 res 的資料夾存放 APP 會用到的 icon 圖示及 screen 畫面(screen 畫面需要搭配 Codorva API 設定才會出現)。

![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/2018-05-22-adobe-phonegap-4.jpg?alt=media&token=c1028a7b-0f52-4e6b-a45c-f12e2aa9d36e "PhoneGap 自動生成的 config.xml")
專案建立時會有幾個欄位需要填寫，這些欄位的內容實際上就是設定到 **confing.xml** 裡，裡面會描述所有與這個 APP 有關的設定。`<widget>` 的 id 是一串倒過來的網址，這個 id 是用來辨識 APP 的，id 必須唯一且不能跟其他 APP 重複到。
`<name>`則是該 APP 的顯示名稱，`<description>`是 APP 的描述，`<author>`應該不用說了吧XD，這些會在上架到 Google 商店時看的到。
`<plugin>`就是這個 APP 有用到的擴充元件，只要有用就必須要寫到配置檔裡，不然 Cordova 會抓不到這個元件。`<platform>`則是關於各廠牌裝置的設定，icon、screen 等連結位置會寫在裡面。

上述都設定好，網頁也寫好的話，就可以來打包 APP 了，上傳檔案前，記得先將專案壓縮成 **\.zip 檔**，進入 Adboe PhoneGap Build，並連結帳號成功，會進到以下畫面。
![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/2018-05-22-adobe-phonegap-6.jpg?alt=media&token=675ee0e5-b13b-44e6-a2ee-21ac80c7c15e "PhoneGap Build 操作步驟")
選擇 private 後會出現上傳 zip 檔的選項，選好會跳到下一個畫面，這邊就可以看到當初在 config.xml 設定的基本內容，確認沒問題就執行 ready to build，畫面跳轉後右邊會出現 QR Code 的圖示，PhoneGap Build 提供 QR Code 可以直接掃描下載檔案。如果顯示圖中的步驟三 pending ，表示檔案尚未打包完成需要等待一下，確定完成並且成功會顯示像步驟四的畫面。如此如此~~就成功產出自己用 web 前端技術做出來的 APP 囉!!鼓掌!!

看!完全沒用到 command line 吧! XDDDD

以上內容如有勘誤，還請不吝告知🙇