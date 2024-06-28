---
title: function 的進階概念 - IIFE
categories: JavaScript
tags:
  - JavaScript
date: 2018-12-25
thumbnail: https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20180319-js-about-javascript.jpg?alt=media&token=68f6351d-34bc-45bf-ae3f-9671da27b39d
---

# {{ $frontmatter.title }}

![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20180319-js-about-javascript.jpg?alt=media&token=68f6351d-34bc-45bf-ae3f-9671da27b39d "這個朋友必交! 關於 JavaScript 的眉眉角角")

平常在寫 code 時，可能是想到甚麼寫甚麼的概念，照腦袋所想的順序 var 很多變數或是宣告很多 function，這種寫法雖然沒有甚麼不對，但當程式碼一多時...可能就會出現 "不好管理"、"重複命名" 或是 "結果好像出乎意料?" 的狀況發生。由於 JavaScript 最小的私有作用域在 function，一般寫在最外圍的變數可能不小心值就被改變了也沒注意到。IIFE 就是為了避免這樣的情境發生，讓變數處於被保護的狀態，只能被作用域中的功能給修改或取用。

## IIFE (immediately invoked function expression)

中文直譯為"立即函示表達式"，會取成這樣的名稱可以從他的語法定義看出蛛絲馬跡。
```js
(function (){
  // code here...
})();
```
最外層的結構是一個括號包住一個匿名 function，後方再接一個括號。前面包住 function 的括號其實是為了讓 JavaScript 在一開始解析文件時，把這段當成一般表達式看待(像是 if()、for() 那種)，從而跳過 function 本應被 hoisting 的步驟，而之後接的括號就是一般要調用 function 時會有的括號。因此實際上 JavaScript 會在真正逐行跑程式碼跑到這段時才同時 **定義 + 調用** 立即函式表達式。

使用 IIFE 有甚麼好處??
- 可以是一次性執行的 function，程式碼永遠只會調用一次
- 可保有 IIFE 被調用時，當下的環境變數
- 雖然會在定義的下一步就被執行，但因為有遵守程式碼逐行執行的規則，因此是可以取用外部環境的變數
- 由於本體是個 function，因此作用域是私有的，外部或其他函式無法直接取用，可避免全域汙染
- 適合用來撰寫 MVC 架構

以簡單的例子來說:
```js
var num1 = 1;
(function(){
  var num2 = 2;
  console.log(num1 + num2); // 3
  num1 = 2;
})();
console.log(num1); // 2
console.log(num2); // num2 is not defined
```
首先 num1 在立即函式中是可以被取用的，而 num2 由於是在立即函式內宣告的變數，因此會受到保護而無法被外部存取，全域的 console.log 是找不到這個變數的。而當立即函式執行完後再取得 num1 也可發現 num1 確實被改變值了。

但如果還是希望可以透過某種方式來取用在 IIFE 中的值或 function 該怎麼辦?其實是可以的喔!由於本體是 function 的關係，因此具有 return 的功能，我們依然可以在保有私有域的環境下撰寫相關的功能，並在最後 return 出可讓外部取用的功能或是值。
```js
var iife = (function(){
  var a = 1;
  var b = 2;
  return {
    addA: function(){
      a++;
      return a;
    },
    multiply: function(){
      return a*b;
    },
    name: 'Tom'
  }
})();

console.log(iife.addA()); // 2
console.log(iife.multiply()); // 4
console.log(iife.name); // Tom
```
像上例這樣的寫法，即使 IIFE 會在最初就執行完畢，但依然可以藉由 return 方法或是值來存取到本應該在執行完畢就被刪除記憶體的內容!

另外 IIFE 也常被第三方函式庫使用，由於函式庫很多又廣，難保證不會出現重複命名的問題發生，這時候如果沒有私有域保護的話，很可能會出現函式庫彼此發生衝突的情況，像使用率最普及的 jQuery，它的原始碼最外圍就是用 IIFE 包住的喔!

最後還有一種用法也是滿常見的!因為 IIFE 可以保存當下執行環境的參數值，這在撰寫與"非同步"相關的程式碼時非常有幫助!以下例子來講就可以知道它有多好用了。
```html
// html 有 3 個 button
<button value="A">A</button>
<button value="B">B</button>
<button value="C">C</button>

// 使用 for 迴圈一次對按鈕做 click 的監聽
var btns = document.querySelectorAll('button');
for(var i=0; i< btns.length; i++){
  (function(i){
    var a = 1;
    btns[i].addEventListener('click', function(e){
      console.log(i);
      console.log(e.target.value);
      a+=1;
      console.log(a);
    })
  })(i);
}
```
當迴圈搭配 event 監聽時，如果有要取用 for 迴圈中的參數時是很容易發生致命錯誤的!由於 for 迴圈是同步執行而監聽是非同步的關係，當真正觸發監聽的行為時，for 迴圈老早就跑完了。以上例的 i 來說，如果沒使用 IIFE 來保存每次迴圈時改變的 i 值，i 永遠都會是最後跑完的值。所以很容易出現不是自己想要的結果。而要存取當下環境的外層變數也很簡單，只要把變數當作 IIFE 的參數帶入即可，這樣 IIFE 就會記住當下環境時的那個值，而不會因為外層迴圈跑完值也跟著被改變。