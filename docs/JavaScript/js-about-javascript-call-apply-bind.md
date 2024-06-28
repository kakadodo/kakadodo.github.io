---
title: 三種重新指向 this 的方法 - call、apply、bind
categories: JavaScript
tags:
  - JavaScript
date: 2018-12-18
thumbnail: https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20180319-js-about-javascript.jpg?alt=media&token=68f6351d-34bc-45bf-ae3f-9671da27b39d
---

# {{ $frontmatter.title }}

![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20180319-js-about-javascript.jpg?alt=media&token=68f6351d-34bc-45bf-ae3f-9671da27b39d "這個朋友必交! 關於 JavaScript 的眉眉角角")

通常會改變 this 的對象可能是某個物件中的方法我們想要在別處來調用，但因為物件的 this 會指向物件本身，如果別的物件想要使用的話，就會需要將 this 的指向改變到自己身上，這時就會借用到 Function prototype 內建的三種方法: **call、apply、bind**。

這三種方法其實目的都差不多，為的就是要達成 this 被重新指向，不過他們還是各有不同之處，主要是看我們在怎樣的情境來使用。
而寫法上也很簡單，只要呼叫原本要調用的函式，再於函式的後方加上 call / apply / bind 的方法並帶入新的 this 及相關參數即可。

## Function.prototype.call
使用 call 的時機有以下幾種:
- 重新指定 this 對象的同時調用函式
- 可接受多個參數值(除了第一個參數一定是放 this 對象，之後看有幾個參數就塞入幾個)

```js
const tom = {
  firstName: 'Tom',
  lastName: 'Li',
  fullName(job1, job2) {
    console.log(`${this.firstname} ${this.lastname} is a ${job1}, also is a ${job2}.`);
  }
}

const ben = {
  firstname: 'Ben',
  lastname: 'Liu'
}

// 使用 .call() 讓 Ben 也能調用 Tom 的 fullName 方法，且該方法會立即執行
tom.fullName.call(ben, 'doctor', 'professor');
// 輸出: Ben Liu is a doctor, also is a professor.
```
這樣一來，即使 ben 沒有 fullName 這個方法，依然可以使用啦! 且有多個參數帶入時，使用 call 就能一一的帶入要用的參數，它會自動對應 function 的參數位置。

## Function.prototype.apply
使用 apply 的時機有以下幾種:
- 重新指定 this 對象的同時調用函式
- 固定為兩個參數值(第一個參數為 this 對象，第二個參數則放剩餘要帶的參數，如有多個參數則以 array 的格式帶入)
```js
const tom = {
  firstName: 'Tom',
  lastName: 'Li',
  fullName(job1, job2) {
    console.log(`${this.firstname} ${this.lastname} is a ${job1}, also is a ${job2}.`);
  }
}

const ben = {
  firstname: 'Ben',
  lastname: 'Liu'
}

// 使用 .apply() 讓 Ben 也能調用 Tom 的 fullName 方法，且該方法會立即執行
tom.fullName.apply(ben, ['doctor', 'professor']);
// 輸出: Ben Liu is a doctor, also is a professor.
```
可以看出 call 跟 aplly 的差異只在於參數帶入的方式不同而已~兩種都會在重新指定 this 的同時調用該 function。

## Function.prototype.bind
最後一個 bind 就跟上面兩個執行模式不同了!上方有一直提到使用 call 跟 apply 會在重新指定的同時立即調用函式，但是 bind 則是先重新指定 this 對象，之後再於想要調用的時機調用即可，也因為它會分成兩個步驟執行，因此參數其實可以分批帶入喔!

使用 apply 的時機有以下幾種:
- 先重新指定 this，再於適當時機調用
- 參數可以批次帶入
```js
const tom = {
  firstName: 'Tom',
  lastName: 'Li',
  fullName(job1, job2) {
    console.log(`${this.firstname} ${this.lastname} is a ${job1}, also is a ${job2}.`);
  }
}

const ben = {
  firstname: 'Ben',
  lastname: 'Liu'
}

// 使用 .bind() 讓 Ben 也能調用 Tom 的 fullName 方法，首先先改變 this 對象並且只帶入一個參數
const benFullName = tom.fullName.bind(ben, 'doctor');
// 呼叫已經充新綁定 this 的函式，並且帶入剩餘的參數
benFullName('professor');
// 輸出: Ben Liu is a doctor, also is a professor.
```
bind 的用法其實還滿常見的，很多函式庫都會利用 bind 可以先綁定再執行的運作模式來達成許多功能。bind 可以達成分批帶參數的原理也不難理解，呼叫 bind 時，如果有帶入任何參數，則該參數會被 bind 視為接下來產生的 function 的定值，因此之後再呼叫新產生的 function 時，原本設定的參數值就已經是該 function 的預設值囉!以上面的範例解讀的話會像這樣:
```js
// 呼叫 bind 並且指定 this 對象跟帶入一個參數值
const benFullName = tom.fullName.bind(ben, 'doctor');

// 因此新產生的 benFullName 內部結構應該會是這樣
function benFullName(obj2) {
  var obj1 = 'doctor';
  console.log(`${this.firstname} ${this.lastname} is a ${job1}, also is a ${job2}.`);
}

// 所以之後再執行 benFullName 時，只要補上剩餘的參數即可! 這種方式就能更靈活的產生不同結果
benFullName('professor'); // Ben Liu is a doctor, also is a professor.
benFullName('sales'); // Ben Liu is a doctor, also is a sales.
```

這三個改變 this 的方法非常好用，例如使用 Array.apply 可將 nodelist 或 HTMLCollection 轉換成真正的 array 格式。
```js
// 假設有好幾個 button 並且一次選取它們，此時 btns 其實是一組 HTMLCollection (類陣列但不是真的陣列)
let btns = document.getElementsByTagName('button');

// 短短一行，就變成真的 array 了 XDDD
btns = Array.apply(null, btns);
```

也有大神介紹使用 apply 來"展開二維陣列"的方法，算是不使用 ES6 展開語法前提下的替代方案~
```js
var myArray = [[1, 2],[3, 4, 5], [6, 7, 8, 9]];
var myNewArray = [].concat.apply([], myArray);
console.log(myNewArray); // [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

也可以利用 call 跟 apply 來做建構式的重構，由於 call 跟 apply 會立即執行，因此可在建立 B 建構式的物件時，先執行 A 建構式，並重新指定 this 對象，這樣 A 建構式的特性就會變成 B 建構式物件的特性，兩個建構式之間是沒有繼承關係喔!
```js
// 原始的 Car 建構式
function Car(make, model, year){
  this.make = make;
  this.model = model;
  this.year = year;
  this.wheel = 4;
}

// 要利用 Car 來產生 Motobike 建構式，但兩者之間又不算繼承的關係!
function Motobike(make, model, year){
  // 使用 call 的寫法
  Car.call(this, make, model, year);
  // 使用 apply 的寫法(直接取用 arguments，等於一次取得所有參數)
  Car.apply(this, arguments);
  // 另外設定自己的屬性值
  this.wheel = 2;
  this.fuel = 92;
}

var vespa = new Motobike('VESPA', 'GTV', 1951);
// {make: "VESPA", model: "GTV", year: 1951, wheel: 2, fuel: 92}
```
