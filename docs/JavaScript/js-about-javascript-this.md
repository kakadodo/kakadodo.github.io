---
title: This
categories: JavaScript
tags:
  - JavaScript
date: 2018-05-09
thumbnail: https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20180319-js-about-javascript.jpg?alt=media&token=68f6351d-34bc-45bf-ae3f-9671da27b39d
---

# {{ $frontmatter.title }}

![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20180319-js-about-javascript.jpg?alt=media&token=68f6351d-34bc-45bf-ae3f-9671da27b39d "這個朋友必交! 關於 JavaScript 的眉眉角角")

this 指的是 function 的執行情境，簡單想就是呼叫 function 執行的對象是誰。

主要的 this 對象有以下幾種:

1. window 物件
2. 一般物件
3. DOM 物件

### this == window: 
一般 function 的 this 對象都是 window，把它想成是預設值就好。ES5 的 function 判斷 this 的時機是 function 執行時的情境。在沒有指定給其他物件去呼叫的情況下，this 都是指向 window。
```js
var env = 'global window';
function showContext(){
  var env = 'local scope';
  console.log('this == '+ this.env);
}
showContext(); //"this == global window"
```
如上，即使 function 中有宣告一樣的變數名稱，但 this.env 依然會是找全域的變數。
剛開始接觸時，可能會想說"那不然 function 寫在另一個 function 中執行吧，在外層 function 執行的環境中呼叫內層 function，這樣執行環境就會是外層 function 吧?"
會跟我一樣這樣想的話..那就直接試試看吧。
```js
var name = 'global Mary';
function wrapper(){
  var name = 'local John';
  function sayMyName(){
    console.log('My name is '+ this.name);
  }
  sayMyName();
}
wrapper(); //"My name is global Mary"
```
結果還是導向 global 去了，其實照上面的說法去想的話還滿合理的，首先 function 預設 this 會是全域 window，而 function 執行時如果不是由其他物件呼叫，this 對象不會改變。因此上面的例子中，即使包了一層 function 去執行，但這個內層 function 並沒有被指定給其他物件來用，this 對象當然還是在 window 啦。跟宣告的地方在哪沒有關係，執行情境則是要看呼叫它的物件是誰。

### this == obj:
依照上面的方向思考下去，this 是 obj 的時機就很好理解了。
```js
var name = 'global Mary'
var mary = {
  name: 'obj mary',
  sayMyName: function(){
    console.log('My name is '+ this.name)
  }
}
mary.sayMyName(); //"My name is obj mary"
```
疑心病發作的我有想過，那是因為 function 寫在物件裡面呀~那 this 對象當然是那個 obj，既然會這樣想，那就寫在外面試試看吧XD
```js
var name = 'global Mary'
var mary = {
  name: 'obj mary',
  sayMyName: sayName
}
function sayName(){
  console.log('My name is '+ this.name);
}
mary.sayMyName(); //"My name is obj mary"
```
結果還是一樣~跟 function 宣告的地點無關~而是在於呼叫它的對象是誰。很重要所以講超過三遍!
但物件的 function (method) 中如果有另外執行其他 function 的話，就要特別注意 this 的使用。假設內層 function 也會用到 this，就需要另外設定 this 的參考，否則又會指定到 window 去了。
```js
var name = 'global Mary'
var mary = {
  name: 'obj mary',
  sayMyName: function(){
    function sayName(){
      console.log('My name is '+ this.name);
    }
    sayName();
  }
}
mary.sayMyName(); //"My name is global Mary" <--變成 global Mary
//------要改成以下模式才能正確指回 obj-------------
var name = 'global Mary'
var mary = {
  name: 'obj mary',
  sayMyName: function(){
    var _this = this; //另外設定this的參考來套用
    function sayName(){
      console.log('My name is '+ _this.name);
    }
    sayName();
  }
}
mary.sayMyName(); //"My name is obj mary"
```
上例的問題在於，雖然最終執行 sayMyName 是由 mary 這個物件呼叫的沒錯，但 function 中的 sayNmae 並非由其他物件呼叫，裡面的 this 就會是預設的 window。因此才會另外設定物件 this 的參考(_this)，讓裡面的 function 也能抓到這個物件 this。

### this == DOM obj:
第三種情況比較特殊，主要發生在監聽事件上，針對 DOM 物件做監聽時，callback function 的 this 會指向那個 DOM 物件，這時就不是 window 囉!
```js
//假設 html 有個 id 為 a 的 a 連結
var a = document.getElementById('a');
a.addEventListener('click', function(){
  console.log(this);
});
//this 會顯示這個 DOM 元素的內容
```

以上就是 ES5 的 this 變心過程，自己最常採到的雷就是 method 中的 this 忘記另外設定，這種在 debug 時如果腦袋運作不流暢還會卡很久..搞到最後才發現是忘記設 this 的參考。

### 箭頭函式的 this
至於 ES6 的箭頭函式，this 的對象依據就大大不同了!箭頭函式的 this 不會重新綁定對象，而是參考它外層的執行環境中 this 是誰，也就要看它被宣告的位置在哪裡。因此箭頭函式不能作為物件的 method，也不能用做事件監聽的 callback function，不然 this 永遠都是 window。
```js
//物件 method 使用箭頭函式的話
var mary = {
  name: 'Mary',
  sayMyName: ()=>{
    console.log(this.name)
  }
}
mary.sayMyName(); //not defined，因為 global 沒有 name 這個變數

//監聽事件使用箭頭函式的話
var a = document.getElementById('a');
a.addEventListener('click', ()=>{
  console.log(this);
});
//會抓到 window 而不是 a 這個 DOM 元素
```

跟 ES5 相反，箭頭函式就可以很方便的用在 method 中，不用另外設定 this 參考就可以抓到同樣的 this 對象。
```js
var mary = {
  name: 'Mary',
  sayMyName: function(){
    var sayName = ()=>{
      console.log(this.name);
    }
    sayName();
  }
}
mary.sayMyName(); //"Mary"
```