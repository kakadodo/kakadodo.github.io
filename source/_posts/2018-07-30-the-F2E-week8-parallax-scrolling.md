---
title: The F2E - 前端修練精神時光屋挑戰系列 - Week 8. Parallax Scrolling
keywords:
  - Parallax, CSS animation, transition
categories:
  - the F2E challenge
thumbnailImagePosition: left
date: 2018-07-30 16:04:52
thumbnailImage: https://kakadodo.github.io/theF2EChallange/img/week8.jpg
---

滾動視差出現啦!!!(哀號)
<!-- excerpt -->

![blog image](https://kakadodo.github.io/theF2EChallange/img/week8.jpg "Week 8. Parallax Scrolling")

繼上週的 Canvas 遊戲...這次出現滾動視差一度想放棄XD
但還是默默走完了這條衰弱不少神經的路..

設計稿: <http://bit.ly/2uX1m47>
影片模擬動線: <https://www.youtube.com/watch?v=xViDpVyIBoU>

## 使用者故事:
1. 一開始直接進場到第一個題目
2. 點選第一題題目完，自動轉場到第二個題目，以此類推
3. 33秒後必須一直觸發滑鼠滾輪，滾到直到看到答案。

## 運用技術:
- Pug
- CSS Animation
- Parallax Skrollr Plugin

## 挑戰心得:

看了這次直播主的介紹才知道有 TweenMax 這款好用的動畫函式庫，雖然也需要一個口令一個動作去描述..但用 JavaScript 寫指令總是比用 CSS 寫 animation 流暢啊 QQ
但直播主還沒介紹前就開始寫了..所以成品是用最原始的 transition + animation 完成
這樣的代價就是 CSS 檔案瞬間肥大..裡面應該有 1/5 的成分在寫 `@keyframes`，為了讓元素看起來不會太規律..所以有稍微認真的在不同的元素上加不同的動畫，做完真的成就感大增但心也好累 XD

寫了之後才回憶起元素可以掛載多個 animation!!太久沒用真的都忘記了...
```scss
.box{
  animation: step1 1s linear, step2 2s 1s linear; //用逗號隔開兩個 animation
}
@keyframes step1{
  0%{
    left:0%
  }
  100%{
    left:50%
  }
}
@keyframes step2{
  0%{
    transform: scale(0)
  }
  100%{
    transform: scale(1.5)
  }
}
```
這樣 `.box` 這個元素就會在一開始執行 step1 動畫，結束後再執行 step2，可以依不同步驟來分開撰寫動畫過程。

因此設計稿的前半段(開頭~測驗問答)就這樣默默靠 CSS 解決了...

問答完成之後就是要顯示統計結果，這塊設計稿要求用滾動視差來完成，因為之前有短暫接觸過 [Skrollr](https://github.com/Prinzhorn/skrollr) 這個套件，這次就用它來解決!

Skrollr 厲害的一點就是可以完全靠 html 埋屬性來設定滾動視差，滾動的依據可以是 document 的高度，或是相關元素距離 viewport 的位置來觸發。JavaScript 則只要寫短短的一句初始化指令即可!

而設計稿呈現方式是當頁面在滾動時，背景會不斷出現圖形並且有一定的角度滑入及滑出...當下整個腦塞，想不出來要怎麼搭配套件做出這個效果，所以用了一個最原始最暴力(最爛)的方式來完成 XDDD
默默開 Illstrator 輸出了三張背景圖..再針對頁面滾動的比例來改變背景圖的位置，於是乎~滾動視差的背景動畫就完成啦!!!(被打)

全部做下來，用電腦看的話是沒甚麼大問題..但因為很多元素都是用 `position: absolute` 的方式來固定，手機裝置就破版了(哭)

要再好好思考怎麼樣撰寫才能更好達到響應式效果 :(

作品網址: <https://kakadodo.github.io/theF2EChallange/parallax-scrolling.html>

以上內容如有勘誤，還請不吝告知🙇
