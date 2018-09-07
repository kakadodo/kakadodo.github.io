---
title: 這個朋友必交! 關於 JavaScript 的眉眉角角 - 12.ES6 - 物件與函式的新寫法、箭頭函式
keywords:
  - javascript, ES6
categories:
  - javascript
tags:
  - javascript
  - ES6
thumbnailImagePosition: left
date: 2018-09-07 09:01:58
thumbnailImage: https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20180319-js-about-javascript.jpg?alt=media&token=aa9b337d-f36d-4b93-afd3-03b01f56938a
---

在 js 中，物件及函式是很常見的型態，ES6 版本改良了他們的寫法，可以用更簡潔有力的方式來完成。
<!-- excerpt -->
![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20180319-js-about-javascript.jpg?alt=media&token=aa9b337d-f36d-4b93-afd3-03b01f56938a "這個朋友必交! 關於 JavaScript 的眉眉角角")

## 物件實例新寫法

#### 屬性
以前在組物件格式時，需要分別設定屬性名稱跟值，ES6 下我們可以設定共通的變數名稱，這樣指定給物件時，就可以省略撰寫。
```js
const x = 5, y = 4, z = 1;
const axis = { x, y, z }  //等同於 axis = { x: x, y: y, z: z}
console.log(axis); //{ x: 5,  y: 4,  z: 1}
```
還有一種較假掰的寫法，屬性名稱可能改變時，可以先將屬性名稱當成變數的值，在組物件時以帶入變數的方式動態生成屬性名稱。
```js
const key = 'color';
const value = '#fff';
const tShirt = {
  [key]: value
}
//上述寫法其實同理於 tShirt[key] = value，方括號內也可使用字串模板做其他延伸的寫法
console.log(tShirt); //{ color: "#fff"}
```

#### 方法
ES6 中物件的方法變得更簡潔了~原本格式為 `方法名稱: function(){//..}` 簡化成 `方法名稱(){//...}`，一開始寫可能會有點不習慣，不過一段時間後就會覺得超好寫!!!
```js
const person = {
  name: 'Chelsea',
  sayHi(){
    console.log(`Hi!! I'm ${this.name}.`);
  }
}
person.sayHi(); //Hi!! I'm Chelsea.
```

## 函式新寫法
上一篇在講解構賦值時有提到函式的參數可以用解構的方式來做設定，除了這樣的功能外，ES6 的函式參數還可以設 **預設值**，這是何等佛心的功能啊!!
```js
//傳統寫法
function show(message){
  if(typeof message === "undefined"){
    message = '預設值';
  }
  console.log(message);
}
show('Hello'); //顯示:Hello
show();  //顯示:預設值

//ES6寫法
function show(message='預設值'){
  console.log(message);
}
show('Hello');  //顯示:Hello
show();  //顯示:預設值

//加強版善用預設值的方式
function combineName(first="Chelsea", last="Chang", name= first + " " + last){
  console.log(name);
}
combineName('Troy'); //顯示 Troy Chang
combineName();  //顯示 Chelsea Chang
```

## 箭頭函式
ES6 新增的箭頭函式非常厲害!除了看起來很奇特、寫起來超簡潔、用起來也是無比方便。
箭頭函式的寫法不只一種，可依照當下給定的內容來簡化其撰寫方式:
1. 完整的寫法: `(arg1, arg2) => { //... }`
1. 函式內容為回傳值: `(arg1, arg2) => (arg1 + arg2)`
1. 參數只有一個且函式內容為回傳值: `arg1 => arg1*arg1`
```js
//1.完整寫法
//傳統函式宣告
let add = function(n1, n2){
  return n1 + n2;
}
//箭頭函式宣告
let add = (n1, n2) => {
  return n1 + n2;
}

//2.函式內容為回傳值
//傳統函式宣告
let add = function(n1,n2){
  return n1 + n2;
}
//箭頭函式宣告
let add = (n1, n2) => (n1 + n2);

//3.參數只有一個且函式內容為回傳值
//箭頭函式宣告
let add = n1 => n1 * n1;
```
第三種寫出來時會有一種莫名的爽感 XDD 感覺已經不像在寫 javascript 了。

不過好用的東西往往會有稍不注意就踩到的大雷，不了解這些雷點的話，寫出來的結果只會讓人想 QQ
以下就列出幾個需要注意的雷點:

1. 沒有參數要帶入時，() 號不可省略 `() => {//...}`
1. 箭頭函式沒有 arguments 參數，無法用 `Array.from(arguments)` 抓出函式帶入的參數值
1. 箭頭函式的 this 不會重新綁定對象，而是參照它被宣告時外層的執行環境 this 是誰。

第三點超級無敵重要!!如果不清楚它 this 特性，很容易就雷點滿天下~~會跟 this 扯上的關係的像是 **物件方法**、**物件建構式**、**事件監聽的 callback** 等千萬 **不能用箭頭函式來撰寫**，否則會發現 this 怎麼指永遠都是指到不對的對象。

這樣的特點有壞當然就會有好，因為不會重新綁定的特性，如果在物件方法裡面使用或是定時器 setTimeout 的 callback 使用箭頭函式，就不用擔心 this 對象跑掉了。

以上內容如有勘誤，還請不吝告知🙇