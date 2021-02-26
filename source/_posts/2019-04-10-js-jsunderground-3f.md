---
title: JS 地下城挑戰心得 3F - 計算機
keywords:
  - JavaScript, JS 地下城
categories:
  - JS 地下城
tags:
  - JavaScript
  - JS 地下城
thumbnailImagePosition: left
date: 2019-04-10 15:00:00
thumbnailImage: https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20190410-js-jsunderground-3f.jpg?alt=media&token=dddba219-1762-4169-9b63-49e939956c5b
---

寫計算機寫到懷疑人生...好想回到國小重新上數學課 💀
<!-- excerpt -->
![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20190410-js-jsunderground-3f.jpg?alt=media&token=dddba219-1762-4169-9b63-49e939956c5b "JS 地下城挑戰心得 3F - 計算機")

[六角學院提供的設計稿連結](https://xd.adobe.com/spec/9dc81ec7-dd2e-46f6-5f76-5a64df413c97-ebf9/screen/3c3e8e4f-df7d-480d-8236-e60803d4645f/002-calculator/)

## 運用技術:
- Vue.js
- [Numeral.js](http://numeraljs.com/)
- SCSS

## 挑戰心得:
好痛苦啊...這關，到底為何計算機會在第三關就出現啊 XDD
這關除了要把計算機給寫出來之外，也有額外的過關條件【自學一個你原本不太會的技巧】，剛好最近在群組看到有人分享處理數字格式的 JS 套件，就趁這機會來試試看了~(擺明想偷懶)

*Numeral.js* 這款套件使用方式非常簡潔有力，掛載 CDN 後基本上就是把要處理的數字當作參數傳入 `numeral()` 函式轉化成套件的實例，就能使用套件提供的數學運算或是轉換格式的方法啦~
```js
const myNumeral = numeral(1000);
// myNumeral 會是一個物件，享有 numeral 提供的屬性跟方法

numeral(myNumeral).format('0,0');
// 可以依照官網提供的格式化寫法轉換出想要的數字格式，上例是會每千單位加上逗號

myNumeral.add(10);
// 也可以做數學運算 + - * /
```
自己覺得最方便的地方是不太需要去管傳入到 numeral 的值是不是 Number 型別，官方有針對幾種 input 型態自動轉成對應的數字。

雖然設計稿是依照六角提供的範本來作，但操作模式上我是參考 win10 內建的"小算盤"來寫，例如:
1. 數字的計算過程中按下運算鍵會自動顯示之前運算的總和
1. 計算總和上方的操作步驟會在使用者按下運算鍵後才顯示出上一筆紀錄，按下等於鍵後則清除操作步驟
1. 重複按下等於鍵會重複執行上一次的操作步驟(ex. 5 + 5 = 10，再按一次 = 結果會變 15)
1. 限制畫面顯示的最大數字量為 16 個單位，數字過多時會縮小呈現
1. 數字顯示會有千分單位

本來有打算用原生 JavaScript 來寫寫看，但光刻 html 就覺得到時候要命名一堆 ID 好麻煩...所以還是拿 Vue 來助我一臂之力了!!!整個撰寫流程下來就是先把 html 刻完，上 CSS 樣式，new 個 Vue 實例出來後，再來想要怎麼綁事件到按鈕上。

按鈕綁定的事件我是依照類型來區分，例如數字鍵的功能就是"加上一個數字到現有數字字串"的意思，因此 0~9 及 00 都使用 `addNumber` 這個方法，而加減乘除四個運算鍵則統一使用 `manipulate` 方法，因為模式其實差不多只是運算符不同而已，判斷運算符後作各自的運算即可。

其他像"加小數點"、"移除最後一個輸入的數字"及"取得總和"等功能就要各自撰寫了，還有比較關鍵的是要去記錄當下的操作模式為何，例如默默在背後作真正的數字運算、用陣列紀錄操作紀錄、上一個步驟是否按了運算鍵、是不是重複按總和鍵之類的~這幾個關鍵點在過程中不段打擊我的寫 code 信心 XDDD

寫下來其實要說超級難是也不至於啦，只能說要顧慮的細節很多 = = ...一個關鍵遺漏，過程就全亂掉了 哈哈哈哈(崩潰笑

前前後後加起來花了快 7 小時才寫完，數學邏輯太差了 Q_Q

於是乎............

Codepen 作品:
<iframe height="735" style="width: 100%;" scrolling="no" title="JS地下城 - 3F 計算機" src="//codepen.io/chelseac/embed/vMyQMQ/?height=732&theme-id=0&default-tab=js,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/chelseac/pen/vMyQMQ/'>JS地下城 - 3F 計算機</a> by Chelsea
  (<a href='https://codepen.io/chelseac'>@chelseac</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

以上內容如有勘誤，還請不吝告知🙇