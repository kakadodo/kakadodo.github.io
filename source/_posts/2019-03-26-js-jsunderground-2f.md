---
title: JS 地下城挑戰心得 2F - 時鐘
keywords:
  - JavaScript, JS 地下城
categories:
  - JavaScript, JS 地下城
tags:
  - JavaScript, JS 地下城
thumbnailImagePosition: left
date: 2019-03-26 17:00:00
thumbnailImage: https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20190326-js-jsunderground-2f.jpg?alt=media&token=921d0825-f518-444d-b339-aae9d582122c
---

下班前是該來刷一下進度了，這種攻城速度在古代應該會秒死 :p
<!-- excerpt -->
![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20190326-js-jsunderground-2f.jpg?alt=media&token=921d0825-f518-444d-b339-aae9d582122c "JS 地下城挑戰心得 2F - 時鐘")

[六角學院提供的設計稿連結](https://xd.adobe.com/spec/43be2f02-1d11-4dfb-4e3d-5c4df1df3896-358f/screen/e7b79d5d-37bb-41f7-8ca2-9df3811589e9/003-clock/)

## 運用技術:
- svg (根本複製貼上)
- 原生 JavaScript Date 物件運用

## 挑戰心得:
這關作的我好心虛...大概半小時寫完 = ="
看到過關條件說時鐘可以用圖產生，立馬開 AI 秒上圖啊~~~不過組裝零件的過程要注意一下初始放置位置就是了。

以下是我的作法:

整體時鐘使用六角揪甘心提供的 XD 設計稿，可以直接下載時鐘的 svg 檔(會分成時鐘背景、秒針、分針及時針)，打開 AI 把這些零件組起來，要抓好時鐘的中心點位置，再用參考線等對齊方式把指針置於中心，針頭統一指向 0 點，到時搭配 code 來跑秒數動畫才不會有額外的問題要處理。

我有另外把這幾個物件都各自塞成圖層命名，這樣用 AI 轉出 svg 時會自動依照命名作為群組 `<g>` 標籤的 ID 喔!(算是小 tips)

CSS 這塊設定更少..除了基本的背景顏色外，主要就是在指針們的 ID 上套用 `transform-origin` 的設定就搞定了，在設定這塊時讓我有點疑惑，svg 裡面的物件設定 transform-origin 時好像是以 svg 本體作依據，所以設成 center 才會照原本設想的方式呈現(覺得怪但秒接收了，改天再來 google 一下)
```scss
#hour-hand, #minute-hand, #second-hand {
  transform-origin: center; // 預先改變它們 transform 的原點，到時用 rotate 就不會位置跑掉
}
```

再來就是 JavaScript 的工作啦!我也真的沒寫甚麼..幾個重點先設想要怎麼處理就寫得出來了(標準想到甚麼寫甚麼)
1. 這跟時間有關，所以必用 Date 物件
1. 把需要動的元素抓出來(就 3 個指針呀)
1. 思考這 3 個指針代表的時間數字怎麼轉換成旋轉角度
1. 取得當下的時間，分別要取 秒、分及小時
1. 把這些時間換算成角度之後，用 transform 的 rotate 來旋轉元素
1. 用 setInterval 固定每秒執行一次上述內容，Done!

```js
const hourHand = document.getElementById('hour-hand');
const minuteHand = document.getElementById('minute-hand');
const secondHand = document.getElementById('second-hand');

function timeToDegree(type, time) {
  if (type === 'hours') {
    return 360/12*time;
  }
  return 360/60*time;
}

function timeAnimate(hours, minutes, seconds) {
  hourHand.style.transform = `rotate(${timeToDegree('hours', hours)}deg)`;
  minuteHand.style.transform = `rotate(${timeToDegree('minutes', minutes)}deg)`;
  secondHand.style.transform = `rotate(${timeToDegree('seconds', seconds)}deg)`;
}

function updateTime() {
  const today = new Date();
  const seconds = today.getSeconds(); // 60 sec
  const minutes = today.getMinutes(); // 60 min
  const hours = today.getHours(); // 24hr
  timeAnimate(hours, minutes, seconds);
}

setInterval(updateTime, 1000);
```


於是乎............

Codepen 作品:
<iframe height="350" style="width: 100%;" scrolling="no" title="JS地下城 - 2F 時鐘" src="//codepen.io/chelseac/embed/gEyxGv/?height=351&theme-id=0&default-tab=js,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/chelseac/pen/gEyxGv/'>JS地下城 - 2F 時鐘</a> by Chelsea
  (<a href='https://codepen.io/chelseac'>@chelseac</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

之前看群組說有人用 Canvas 把時鐘刻出來...想到就覺得敬佩.....只能說我真得是很不爭氣 XD

以上內容如有勘誤，還請不吝告知🙇