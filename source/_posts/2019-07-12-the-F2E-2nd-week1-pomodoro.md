---
title: The F2E - 前端修練精神時光屋挑戰系列 - 2nd Week 1. Pomodoro
keywords:
  - 番茄鐘, Vue.js, CSS Animation, todolist
categories:
  - the F2E challenge
thumbnailImagePosition: left
date: 2019-07-12 10:54:00
thumbnailImage: https://kakadodo.github.io/theF2EChallange/img/2nd-week1.jpg
---

> 第二屆 The F2E 來了!!!

這次參賽規模好大，除了有專門的作品投稿網站，還可以自行挑選不同 UI 設計師作的設計稿當主題，慶幸這次是選工程師類型，跪著看設計稿啊..
<!-- excerpt -->
![blog image](https://kakadodo.github.io/theF2EChallange/img/2nd-week1.jpg "Week 1. Pomodoro")

這次主題根本是第一屆第一週的升級版啊~~
除了 todolist 還要做計時器，洧杰老師真得很會挖坑耶😱

## 使用者故事:
1. 我可以記錄代辦任務
2. 我可以設定蕃茄鐘定時器
3. 我可以透過報表檢視使用狀況

來自俊儀老師的[設計稿](https://challenge.thef2e.com/user/2760?schedule=2468#works-2468)，看起來簡約做起來卻..不簡單!😂

## 運用技術:
- Pug (html模板語言)
- SCSS (css預處理語言)
- Animate.css
- Vue.js
- Chart.js

## 挑戰心得:

對我來說這次的魔王應該是"計時器的動態顯示"跟"不同模式的介面顯示"吧。
自己的心態過程滿好笑的，從一開始抱著【第一週這甚麼鬼!不管啦切完初始畫面就當完成了\~】的念頭切版，但初始畫面就把我覺得最需要挑戰的功能涵蓋了，好不容易把功能做出來後，覺得其他剩下的不做完有點可惜...所以，恩~我算是有盡可能地完成設計師給的版面。

計時器的動態顯示苦惱了一段時間，雖然有想到用 SVG 或手刻 Canvas，但要搭配動態改變就有點想關機😂
最後決定用 [Chart.js](https://www.chartjs.org/) 這款圖表函式庫來客製成計時器。看上它原因是圖表簡單乾淨，本身就有響應式及動態功能，圖表調整彈性還算夠，對這次的設計稿來說應該滿好改的，圖型更新的方式也不難，修改原來的 data 值再執行 update 就會動態更新圖型了。
殊不知，官網的 Document 根本在開玩笑...我覺得它可以當作工程師需要通靈的最高指標性物件，文件寫得比別人做的 sample 還難懂，最後乾脆是用 Stack Overflow 來找寫法了，非常佩服那些可以解答的開發者..居然知道怎麼寫。
如果不太需要客製化圖表的話我覺得它還滿好用的啦~塞個 data 進去就可以秒產生圖表，一但要細節調整最好邊查 Stack Overflow 囉!
![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20190712-the-F2E-2nd-week1-pomodoro.jpg?alt=media&token=b87cbd14-12a9-423b-9346-2b5d58c63d09)
<small style="display: block; text-align: center;">有開發者還說寫文件的應該是個喝醉酒的律師 XDD</small>

至於不同模式介面其實是 CSS 要設定兩種主題樣式的意思，雖然不難但需要細心跟耐心(本人的弱點之一二..)
搭配 Vue 使用可以靈活的依照數據控制當前顯示的 class，所以我就先把兩種主題顏色的 class 寫好，再用 Vue 下判斷。(現在真的得了**沒有框架該怎麼活**的病了..)
雖然耗最多時間在樣式設定..但做好看到成品又滿感動的，不搭配點微互動效果不是很可惜嗎?!就這樣靠著奇怪的慣老闆心態讓我順利完成了挑戰🤣

作品網址: <https://kakadodo.github.io/theF2EChallange/pomodoro.html>


以上內容如有勘誤，還請不吝告知🙇
