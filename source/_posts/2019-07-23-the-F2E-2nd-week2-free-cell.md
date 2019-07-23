---
title: The F2E - 前端修練精神時光屋挑戰系列 - 2nd Week 2. Free Cell
keywords:
  - 新接龍, Vue.js, CSS Animation
categories:
  - the F2E challenge
thumbnailImagePosition: left
date: 2019-07-23 15:00:00
thumbnailImage: https://kakadodo.github.io/theF2EChallange/img/2nd-week2.jpg
---

第二週關卡難度整個三級跳...
<!-- excerpt -->
![blog image](https://kakadodo.github.io/theF2EChallange/img/2nd-week2.jpg "Week 2. Free Cell")

## 使用者故事:
1. 做出新接龍遊戲
2. 額外功能：需有「還原上一步」
3. 額外功能：需有「計時遊玩時間」

來自 CHANG 的[設計稿](https://challenge.thef2e.com/user/638?schedule=2813#works-2813)，像素風格太可愛了\~\~看到立馬決定採用 XD
而且設計師滿佛心的，素材提供滿完整，牌卡每一張都有獨立檔案可以下載，還有提供 function map 可以參考介面流程! 在此感謝你~

## 運用技術:
- Pug (html模板語言)
- SCSS (css預處理語言)
- Animate.css
- Vue.js
- HTML5 Drag and Drop API

## 挑戰心得:

說實在剛看到關卡主題是處於一個呆滯的狀態，過去沒有做過 web 遊戲的我只能嚇到吃手手...
剛好這次活動時程更動的關係變成一週先出設計稿隔一週再交程式碼下，很幸運地可以先看到直播主的 coding 講解，因此才能做出"稍微"有個遊戲樣子的新接龍 😂
當然也感恩讚嘆這次的直播主懷恩非常詳細的解釋製作的過程，可以快速了解新接龍遊戲邏輯的觀念，在此附上揪甘心的[直播連結](https://www.facebook.com/haowei.liou/videos/10214294364489378/)

這次的主要流程分成三大部分:
1. 前期素材準備
2. 畫面切版 + 小動畫
3. 套程式邏輯

## 前期素材準備
自己在素材準備這塊花了不少時間..因為牌卡有點多，一開始想到做成 Sprite 來指定 CSS 位置，但可能自己算數太差..在設定 background-position 的時候始終無法完美呈現圖片 XD
最後只好退而求其次設定好每張卡牌的命名方便之後程式可以快速套用..
不過還是有個小地方(介面右上角的完成牌區 icon)讓我順利用到了 Sprite，這邊也推薦一個[線上產生 Sprite 圖][sprite] 的網站，除了可以設定 sprite 之間的 padding 之外，還能指定 sprite 圖呈現的方式(從上到下、從左到右，甚至奇怪的樓梯排法 = =?)

## 畫面切版 + 小動畫
這次採用的設計稿最吸引人的莫過於可愛的像素圖示，因此盡可能忠實的呈現這些可愛的小圖。
製作過程中也順便學習到一個**文字加上 border** 的 CSS 技巧，我是參考 CSS-TRICKS [Adding Stroke to Web Text][textBorder] 來寫的。
文章中有提到字型也可以當作一種向量圖來看待，不論畫面放多大都不會失真就是其特色，因此按照常理推論，字型應該也具有可以加上 *stroke* 的功能，不過瀏覽器支援度需求高，且需要搭配 -webkit- 前綴使用。
![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20190723-the-F2E-2nd-week2-free-cell-1.jpg?alt=media&token=6f40cd32-b493-483c-b45f-e800365ba8bc "Can I Use - Text Stroke")

保險一點的話，可以使用"模擬 Stroke"的方式來製作文字外框，雖然寫法有點 tricky，但能寫出效果就是好 code 😆
```css
h1 {
  color: white;
  text-shadow:
   -1px -1px 0 #000,  
    1px -1px 0 #000,
    -1px 1px 0 #000,
     1px 1px 0 #000;
}
```
其原理其實滿簡單的，就是使用 CSS 本來就有的 `text-shadow` 屬性來達成，shadow 類型的屬性本身就具有可以 **疊加陰影** 的功能，因此想像成在文字的四個邊界都各加上稍微偏移的文字陰影，視覺上看起來就會是文字的邊框了。不過須注意偏移量不能太大，否則陰影的形狀就會跑出來見人。

小動畫的部分這次一樣採用平易近人的 Animate.css，搭配 Vue 的 class binding 真的超好用!!雖然遊戲根本不可能讓你成功破關，但搭配小圖一直不斷震動是不是會有想趕快破關的錯覺呢?? 😆

## 套程式邏輯
遊戲邏輯真的不是自己的強項..平常玩遊戲也只會狂按 AAA 或 BBB 而已..更何況還要設計怎麼讓人玩呢..
這次能寫出個雛型真的依靠懷恩大大非常多，這邊就分享一個我認為很不錯的程式碼，之後有碰到就可以直接拿出來用啦!
```js
function shuffle(arr) {
  for (var i = arr.length - 1; i >= 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var _ref = [arr[j], arr[i]];
    arr[i] = _ref[0];
    arr[j] = _ref[1];
  }
  return arr;
}
```
這個 Shuffle 功能可以將帶入的一組陣列 return 出隨機排序後的新陣列，隨機的模式比用 `Math.random()` 的效果更好，洗得更乾淨。
懷恩大大的 code 是用 ES6 語法寫的，上面提供的則是經過 babel 編譯後可於一般 ES5 使用的語法。

其他邏輯處理其實就是不斷的作數學判斷..這部分就只能靠各自的數學天分了，至少對我而言就是在不斷的出錯中持續修改以達成最後想要的結果(爛尾)

至於 Drag and Drop API 的部分，網路上其實教學很多也講解的滿詳細的，這邊只講我在製作過程中碰到的小狀況。
首先正常認知是要在可被拖曳的元素上加上 `draggable="true"` 屬性元素才能夠被拖曳，因此我也自動解讀成只有可被拖曳的元素托放到其他容器上時，才會觸發 dragenter 及 dragleave 等屬於托放容器的事件。
但實作上卻碰到某些卡牌沒被設定 draggable 也一樣會觸發托放到容器上時的事件，後來查文件才發現可能是我指定拖曳的元素是 `<img>`，瀏覽器本身就針對 img 及 a 標籤賦予可被拖曳的功能。但寫都寫下去了的心態作祟，決定默默當作這是一個奇怪的 bug 結束這回合，只好搭配塞入自訂參數來阻擋未知的意外發生 XDDD

另外一個小狀況是，因為利用事件觸發塞入自訂參數的關係，需要藉由 dragenter 及 dragleave 這兩個事件來紀錄當下實際進入的托放容器為何，但實作上會碰到明明就在可托放的元素上 drop 拖曳元素卻還是觸發了 dragleave 事件，導致紀錄的參數內容被清除...於是，決定再當作一個奇怪的 bug 先想辦法完成功能再說。(對自己感到慚愧..)
但是!但是!寫這篇文章的最終，我還是找出了原因，原來是 dragenter 與 dragleave 之間的 **dragover** 在搞鬼，dragover 觸發的時機點很廣，只要拖曳元素在托放元素身上，就會以每幾百毫秒的方式不斷觸發事件，而幾乎所有元素默認都是不允許 drop 發生的關係，導致 dragover 會不斷的阻擋元素被 drop 因此又會觸發後續的 dragleave 事件。解決這樣的問題其實只要:
```js
dropzone.addEventListener('dragover', (evt) => {
  evt.preventDefault();
  return false;
});
```
也就是阻止 dragover 的默認行為即可😑，怪只能怪我眼睛太大..文件看不完全..
除了 dragover 之外，dragenter 也會阻擋 drop 行為喔!因此記得兩個事件都要阻止默認行為才行。
附上查到的[文件教學][draganddrop]，解釋的非常之清楚。

不過整個遊戲還有未解的功能在於如何拖曳下方區塊"已排序"過的牌組到別的位置就是了..
也因此這是一款你永遠破不了關的遊戲，厲害吧!

作品網址: <https://kakadodo.github.io/theF2EChallange/free-cell.html>


[sprite]: https://www.toptal.com/developers/css/sprite-generator
[textBorder]: https://css-tricks.com/adding-stroke-to-web-text/
[draganddrop]: https://lotabout.me/2018/HTML-5-Drag-and-Drop/

以上內容如有勘誤，還請不吝告知🙇
