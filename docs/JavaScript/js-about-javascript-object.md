---
title: 物件 (Object)
categories: JavaScript
tags:
  - JavaScript
date: 2018-04-25
thumbnail: https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20180319-js-about-javascript.jpg?alt=media&token=68f6351d-34bc-45bf-ae3f-9671da27b39d
---

# {{ $frontmatter.title }}

![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20180319-js-about-javascript.jpg?alt=media&token=68f6351d-34bc-45bf-ae3f-9671da27b39d "這個朋友必交! 關於 JavaScript 的眉眉角角")

### 建立物件
物件是由一組大括號`{}`組成，可以直接宣告物件實例，也可以用物件的建構式來產生
```js
//建立空陣列
var obj = {};
//建立的同時直接設定屬性(key)跟值(value)
var mary = {
  name: 'Mary',
  age: 18
}
```

### 物件屬性的取值賦值
要取得物件屬性的值可用`.`符號作連接，也可以用陣列的`[]`，只是屬性名稱須用引號框起來
```js
var mary = {
  name: 'Mary',
  age: 18
}
console.log(mary.name); //Mary
console.log(mary["name"]); //Mary
mary.job = 'Home-Stayer';
console.log(mary); //{name: "Mary", age: 18, job: "Home-Stayer"}
```
會用到`[]`通常在於屬性的值被設為變數來儲存，這時就無法用點符號來取值
```js
var mary = {
  name: 'Mary',
  age: 18
}
//for in 會巡訪物件的每個屬性
for(var key in mary){
  console.log(mary[key]);
}
//Mary,18
for(var key in mary){
  console.log(mary.key);
}
//顯示兩次undefined，因為 mary 並沒有 key 這個屬性名稱
```

### 物件方法
物件可以有自己的方法(method)，方法即為一組函式，而且是歸屬於這個物件的函式，其他人需要走旁門左道(?)才能使用。而方法中可使用`this`來取得自己的屬性。
```js
var mary = {
  name: 'Mary',
  job: 'Home-Stayer',
  introSelf: function(){
    console.log('Hi! I\'m '+this.name+', you can call me '+this.job+'.');
  }
}
//因為方法就是函式，所以呼叫時要加()
mary.introSelf(); //Hi! I'm Mary, you can call me Home-Stayer.

//假設 Ben 也想要介紹自己..
var ben = {
  name: 'Ben',
  job: 'Neet'
}
ben.introSelf(); //Uncaught TypeError: ben.introSelf is not a function
mary.introSelf.call(ben); //Hi! I'm Ben, you can call me Neet.
```
`call()`、`apply()`跟 `bind()` 這三組就是用來盜用別人方法的旁門左道，藉由竄改 this 對象讓沒有該方法的物件也能使用，以上述為例就是呼叫 mary 的 introSelf 方法，但 this 的對象改為 ben 的意思。
而這三組的使用差異在於，call 跟 apply 呼叫的當下就執行 function，call 如果有額外的參數需要一個一個帶入，apply 則可以用陣列的方式將額外參數帶入; bind 跟前面兩者不同，他只會先改變 this 的對象而不直接執行 function，可於之後的特定時機再執行
```js
var mary = {
  name: 'Mary',
  job: 'Home-Stayer',
  introSelf: function(hobby1, hobby2){
    console.log('Hi! I\'m '+this.name+', you can call me '+this.job+'.I like '+hobby1+' and '+hobby2+' in my free time.');
  }
}
var ben = {
  name: 'Ben',
  job: 'Neet'
}
//使用 call() 大法
mary.introSelf.call(ben,'watch TV','ask mommy to get money');
//使用 apply() 大法
mary.introSelf.apply(ben,['watch TV', 'ask mommy to get money']);
//使用 bind() 大法，此時 benIntro 只是先綁定 this 對象，還未執行 function
var benIntro = mary.introSelf.bind(ben,'watch TV');
//執行 benIntro()，參數也可這時候再帶入
benIntro('ask mommy to get money');
//三種結果: Hi! I'm Ben, you can call me Neet.I like watch TV and ask mommy to get money in my free time.
```

### 物件中的陣列、陣列中的物件
這不是繞口令，而是很常見的資料結構
```js
//物件中的陣列，ben你...強者!
var ben = {
  name: 'Ben',
  job: 'Neet',
  girlfriends: ['Jade','Amy','Connie']
}
//要知道 ben 的女友有哪些，可以這樣寫
ben.girlfriends.forEach(function(girl,i){
  console.log('第 '+(i+1)+' 位: '+girl);
});
//第 1 位: Jade, 第 2 位: Amy, 第 3 位: Connie

//陣列中的物件
var people = [{
  name: 'Mary',
  relation: 'sister'
},{
  name: 'Ben',
  relation: 'boyfriend'
}];
//介紹人物關係，可以這樣寫
people.forEach(function(person){
  console.log(person.name + ' is my '+ person.relation + '.');
})
//Mary is my sister. Ben is my boyfriend.
```

### by Reference 特性
物件是傳址不傳值的，因此將物件指定給變數時要非常注意。
```js
var mary = {
  name: 'mary',
  age: 18
}
var ben = mary;
ben.name = 'Ben';
console.log(mary);
//{name: "Ben", age: 18}
```
當物件被宣告時，JavaScript 會將它存放在記憶體中的一個位置，變數則是記住那個位置在哪裡，當宣告另一個變數來指定時，自然還是指定記憶體的位置在哪而不是它真正的值，要真正產生出一組有相同結構但不同值的物件，就會使用到物件建構式。

### 物件建構式(constructor)與原型(prototype)
建構式本身是一組函式，而這組函式可以有結構性的產生出不同的物件實體(產生出來的物件記憶體位置都不相同)
```js
var Person = function(name, job){
  this.name = name;
  this.age = 18;
  this.job = job;
  this.introSelf = function(){
    console.log('Hi! I\'m '+this.name+', you can call me '+this.job+'.');
  }
}
var mary = new Person('Mary', 'Home-stayer');
var ben = new Person('Ben', 'Neet');
mary.introSelf();
ben.introSelf();
//結果同之前一樣
```
建構式的名稱會以大寫字母開頭作命名，以區分出在使用建構式而非一般變數，建構式的參數則是用來建立實例時可以客製化的屬性值。屬性也可直接預設值，這樣產生出來的實例就會有相同的屬性值，如上兩人的年齡都是 18 歲
`new`其實就是建立一個空物件的意思，而建構式會自動 return 出屬性跟值給空物件，藉此產生一個物件實例，所以每個實例都有自己的記憶體位置。
也因為實例會有自己的記憶體位置，物件方法都一樣的話，等於產生多少個實例，就增加多少個相同方法，這樣會製造不必要的記憶體浪費，因此 prototype 原型的觀念就該出馬了!
每個被產生出來的物件實例，都有自己的建構式，而建構式本身有自己的 prototype，當實例被產生出來時，就會有個 `__proto__` 的屬性來連接到自己建構式的 prototype。
```js
var Person = function(name, job){
  this.name = name;
  this.age = 18;
  this.job = job;
}
//方法其實都相同，因此可另外拉出來寫成 Person 這個建構式的 prototype
Person.prototype.introSelf = function(){
  console.log('Hi! I\'m '+this.name+', you can call me '+this.job+'.');
}
var mary = new Person('Mary', 'Home-stayer');
var ben = new Person('Ben', 'Neet');
mary.introSelf();
ben.introSelf();
//這樣即使實例本身沒有 introSelf 的方法，也可藉由自己建構式的 prototype 找到該方法來使用
```
![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/2018-04-25-js-about-javascript-object.jpg?alt=media&token=63cdade6-f964-485f-9d87-d79274905c02)

上圖為 mary 這個物件的內容，黃色框框可看到`__proto__`屬性中有 introSelf 這個方法，而橘色框框的 `constructor` 就是建構式 Person，裡面可找到有個屬性為 prototype，也就是 introSelf 真正存在的地方。
利用 prototype 的方式就可讓多個實例共享同一個方法，以減少記憶體的使用。這種模式也就是原型鍊，藉由原型來彼此相連，原型的終點都會導向到 Object.prototype。

![blog image](https://ithelp.ithome.com.tw/upload/images/20171228/20065504Yf8N277vXl.jpg)

附上[Kuro大大在iT鐵人賽](https://ithelp.ithome.com.tw/articles/10194356?sc=iThelpR)中 po 的鬼打牆原型鍊圖解，看懂功力瞬間上升 100 點。