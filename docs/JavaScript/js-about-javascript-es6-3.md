---
title: ES6 - Class 類別
categories: JavaScript
tags:
  - JavaScript
  - ES6
date: 2018-09-14
thumbnail: https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20180319-js-about-javascript.jpg?alt=media&token=68f6351d-34bc-45bf-ae3f-9671da27b39d
---

# {{ $frontmatter.title }}

JavaScript 中創建物件的正統用法是使用建構式，而 ES6 新出的 Class 類別其實是建構式的語法糖，撰寫方式更為簡潔。

![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20180319-js-about-javascript.jpg?alt=media&token=68f6351d-34bc-45bf-ae3f-9671da27b39d "這個朋友必交! 關於 JavaScript 的眉眉角角")

介紹 Class 之前，先回顧一下原本建構式，寫法跟創建 function 很像，不過為了容易辨別與 function 之間的差異，命名會是大寫駝峰式，而 function 內部則是定義建構式的屬性及方法。如果方法是共用給物件實例的話，則會寫在建構式的 prototype 中而不是建構式本身，因為這樣會造成不必要的記憶體產生。
```js
// 建立一個 Person 的建構式
function Person(name, age) {
  this.name = name;
  this.age = age;
}
// 共用的方法寫在 prototype
Person.prototype.introSelf = function() {
  console.log('嗨!我是 ' + this.name + ', 我 ' + this.age + ' 歲了!');
}
// 建立物件實例
var mary = new Person('Mary', 15);
mary.introSelf(); // 嗨!我是 Mary, 我 15 歲了!
```

這種寫法由於將 prototype 另外拉出來設定，當內容一多時，可能就不易閱讀，因此就有 Class 這樣的語法糖誕生來改善這樣的問題。

## Class 類別

首先以 `class` 這個特殊命名做開頭再接上要賦予他的類別名稱，之後則用大括號框起定義建構式的內容。
建構式的內容會寫在 `constructor` 中，裡面的寫法基本上同原本建構式沒有太大差別，而原本要在外層設定 prototype 的方法，可以直接寫在 Class 內，寫法可用 ES6 的物件方法模式來寫。
```js
class Person{
  constructor(name, age){
    this.name = name;
    this.age = age;
  }
  introSelf(){
    console.log('嗨!我是 ' + this.name + ', 我 ' + this.age + ' 歲了!');
  }
}
const mary = new Person('Mary', 15);
mary.introSelf(); // 嗨!我是 Mary, 我 15 歲了!
```

## 計算屬性

ES6 新增了物件計算屬性的方法，可藉由方法的 get 與 set 來回傳/設定經過計算後的值，以此減少屬性不必要的重複設定，取得計算屬性時會觸發 get 來回傳計算後的值，設定計算屬性的話則是觸發 set，並且將設定的值當作參數傳入 set 的 function 以改變既有屬性的值。
```js
class Person{
  constructor(firstname, lastname, age){
    this.firstname = firstname;
    this.lastname = lastname;
    this.age = age;
  }
  get fullname(){
    return `${this.firstname} ${this.lastname}`;
  }
  set fullname(val){
    this.firstname = val.split(' ')[0];
    this.lastname = val.split(' ')[1];
  }
  introSelf(){
    console.log('嗨!我是 ' + this.fullname + ', 我 ' + this.age + ' 歲了!');
    // 利用 get 特性取得 firstname + lastname
  }
}
const mary = new Person('Mary', 'Chang', 15);
mary.introSelf(); // 嗨!我是 Mary Chang, 我 15 歲了!

mary.fullname = 'Chelsea Chang'; // 利用 set 特性來改變原本的值
mary.introSelf(); // 嗨!我是 Chelsea Chang, 我 15 歲了!
```

## 類別繼承
Class 的繼承，也就是建立子類別，子類別會命名自己的類別名稱再加上 `extends` 延伸父類別。而子類別的 `constructor` 中，需要特別使用 `super()` 來呼叫父類別的建構式設定，可以想成是把父類別的建構式 copy 一份到自己身上的概念~子類別如果有撰寫相同名稱的方法，會取代原本父類別的方法。
```js
// 父類別
class Person{
  constructor(name, age){
    this.name = name;
    this.age = age;
  }
  introSelf(){
    console.log('嗨!我是 ' + this.name + ', 我 ' + this.age + ' 歲了!');
  }
}

// 子類別
class Engineer extends Person{
  constructor(name, age){
    super(name, age); // 參數如果是設定到父類別的建構式，super() 就要帶入這些參數
    this.job = 'engineer';
  }
  introSelf(){
    console.log(`嗨!我是 ${this.name}，我 ${this.age} 歲了!我的職業是 ${this.job} !`);
  }
}

const chelsea = new Engineer('Chelsea', 31);
chelsea.introSelf(); // 嗨!我是 Chelsea，我 31 歲了!我的職業是 engineer !
```

## 靜態方法
靜態方法是與類別綁定的方法，此方法不會被繼承，只能 Class 自身使用。建立靜態方法的方式就是在 Class 中於指定的方法前加上 `static` 這個特殊命名。呼叫靜態方法由 Class 本身作為呼叫的對象，創建出來的實例是無法使用這個方法喔!
```js
class Person{
  constructor(name, age){
    this.name = name;
    this.age = age;
  }
  introSelf(){
    console.log('嗨!我是 ' + this.name + ', 我 ' + this.age + ' 歲了!');
  }
  static eat(){
    console.log('好餓!我要吃 10 碗!');
  }
}

const mary = new Person('Mary', 'Chang', 15);
mary.eat(); // 跳錯: mary.eat is not a function
Person.eat(); // 好餓!我要吃 10 碗!
```