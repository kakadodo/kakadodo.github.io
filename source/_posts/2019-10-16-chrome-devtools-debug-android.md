---
title: 來用 Chrome Devtools 遠程調試 Android 設備(Windows 作業系統)
keywords:
  - Chrome Devtools, Android, debug
categories:
  - Web Others
thumbnailImagePosition: left
date: 2019-10-16 21:00:00
thumbnailImage: https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20191016-chrome-devtools-debug-android.jpg?alt=media&token=be192c38-22aa-4178-a06f-2086cbf85ce2
---

前陣子被多語系檢查搞到心累，Chrome 雖然可以模擬手機尺寸來查看，但裝置上的呈現可能還是有誤差..明明瀏覽器模擬的畫面是 OK 的，手機打開還是跑版了!!
礙於手機沒有 devtools 功能只能自己盲改，前後來回修改、上版再檢查，人生的美好時光就是這樣消逝掉的 XD
想到之前公司在測平板版面時，自己有用過 Chrome 的 Android 遠程調試工具來 debug，照著以前的模式操作電腦卻始終偵測不到裝置，經過幾番折磨當了兩個晚上的鍵盤偵探後，終於順利讓我成功了!故有此篇操作說明的誕生~~希望這篇廢廢的操作說明文也能幫助到有這問題的捧油!

<!-- excerpt -->

![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20191016-chrome-devtools-debug-android.jpg?alt=media&token=be192c38-22aa-4178-a06f-2086cbf85ce2 '來用 Chrome Devtools 遠程調試 Android 設備')

Google 本身有一份如何使用[遠程調試](https://developers.google.com/web/tools/chrome-devtools/remote-debugging/#enable_usb_debugging_on_your_android_device)的說明文章，裡面有提到各作業系統的操作說明，因為我是使用 Windows 系統，所以接下來的操作說明是 base 在 Windows 的方式喔! ( Mac 跟 Linux 反而沒那麼麻煩的樣子..🤔)
說明文章有提到如果是非 Google 自家的行動裝置，需要安裝 OEM USB drivers，而且 OEM 會根據電腦廠牌的不同需要自行去廠牌的官網下載對應的驅動程式，這時問題就來了~我的筆電是 DELL 的，但在 DELL 的支援網站怎----麼----找----就是找不到 OEM USB drivers 的驅動程式...難不成就要因此放棄了嗎?!!?!?(大哭

事實證明，只要有心(不讓自己加班)，一定能找到第二種解決方案 XDD
這個解法是使用 Android 提供的 SDK 工具包，讓電腦可以偵測到裝置並啟動連線，之後就能順利在 Chrome 感應到連接的裝置啦!

## 前置準備:

1. 於 Android Studio 下載 [platform-tools](https://developer.android.com/studio/releases/platform-tools) 壓縮檔並解壓縮(廢話)。
1. 一台 Android 裝置，版本系統至少 4.0 以上，並且安裝 Android 版的 Chrome 瀏覽器及開啟 Android 開發人員選項。
1. 一條具有傳輸功能的電纜線。(本來對這句感到疑惑，但居然真的有純充電用的電纜線我也是醉了..)
1. 電腦的 Chrome 版本至少 32 以上。

### 前置準備中的開啟開發人員選項操作:

要知道裝置有沒有開啟開發人員選項很簡單，打開**設定**掃過一遍，如果沒有看到"開發人員選項"這幾個字，就表示沒開啟啦 XDD
開啟的方式也滿有趣的，有機關破解的概念。
![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20191016-chrome-devtools-debug-android-1.jpg?alt=media&token=ea30ad0b-5531-4e73-a70b-95d84726da73 '來用 Chrome Devtools 遠程調試 Android 設備')

前往設定->關於裝置->軟體資訊->版本號碼，有些廠牌手機會有提示字在版本號碼下，會說連按 n 次可開啟開發人員模式，有些可能路徑的名稱會稍有不同，但大概看一下都會設定在版本號碼這個區塊，連按幾次後會看到有提示框出現"剩下 n 個步驟啟用開發人員選項"，滿足連按的次數後就會跳出提示框"您已啟用開發人員選項"，這時再回到設定頁面就可以看到原本不存在的開發人員選項功能囉。

## 操作說明:

首先用電纜線連接裝置到電腦，然後在電腦使用 command line 進入解壓縮後的 platform-tools 目錄，並輸入指令 `./adb devices`，等待一段時間後，可以看到顯示偵測到裝置並啟動的訊息，這樣就表示電腦與裝置有正式連接了。
接下來於裝置前往設定->開發人員選項->開啟開發人員模式及使用 USB 偵錯，會跳出下圖的提示訊息，都選擇確認後，就能使用 Chrome 來遠程調試了!
![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20191016-chrome-devtools-debug-android-2.jpg?alt=media&token=ab5d37b9-f382-43d1-99a2-705326240345 '來用 Chrome Devtools 遠程調試 Android 設備')

先在裝置中使用 Chrome 打開要偵測的網頁畫面，然後回到電腦打開 Chrome 的 Devtools，照著下圖的說明開啟 **Remote devices** 面板，等待一段時間，可以看到面板中出現偵測到的裝置型號及裝置目前使用 Chrome 開啟的頁面 URL，點擊 URL 旁邊的 **inspect** 按鈕就能開啟裝置映射後的 debug 頁面。
![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20191016-chrome-devtools-debug-android-3.jpg?alt=media&token=e5ac1d58-d934-407a-a4a4-d70dd61eab3a '來用 Chrome Devtools 遠程調試 Android 設備')
![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20191016-chrome-devtools-debug-android-4.jpg?alt=media&token=fe9bcbc5-5b2a-443c-a12f-639d348a2fcf '來用 Chrome Devtools 遠程調試 Android 設備')
看到這特殊的畫面有沒有很感動!!!裝置的頁面即時反應在電腦上，並且可以查看網頁結構當然也可以在裡面動手腳啦!改變後的畫面會同時反應回裝置身上~這樣就能即時測試調整裝置的版面了!!上圖做了個簡單的範例更換 Google 的 logo 圖，就是這麼簡單 :D

雖然步驟比 Google 說明的複雜，但能解決的方法就是好方法 XD
至於 ios 系列的裝置..沒有 Mac 系統的話還是繼續盲改吧!哀~

以上內容如有勘誤，還請不吝告知 🙇
