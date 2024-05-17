---
title: ES6 - 字串模板、展開與剩餘、解構賦值
categories: JavaScript
tags:
  - JavaScript
  - ES6
date: 2018-08-31
thumbnail: https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20180319-js-about-javascript.jpg?alt=media&token=68f6351d-34bc-45bf-ae3f-9671da27b39d
---

# {{ $frontmatter.title }}

![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20180319-js-about-javascript.jpg?alt=media&token=68f6351d-34bc-45bf-ae3f-9671da27b39d "這個朋友必交! 關於 JavaScript 的眉眉角角")

雖然現在的瀏覽器大多支援 ES6 語法，如要考慮到舊版瀏覽器，還是得透過編譯的工具將 ES6 的語言轉為舊版瀏覽器可用的語法才行。例如 [Babel](https://babeljs.io/)。

提供兩個介紹 ES6 語法的 gitbooks:
- [從ES6開始的JavaScript學習生活](https://eyesofkids.gitbooks.io/javascript-start-from-es6/content/) 作者: eyesofkids 大大
- [ECMAScript 6 入门](http://es6.ruanyifeng.com/) 作者: 阮一峰 大大 (簡體中文)

## 字串模板 (template string)
ES6 提供了字串模板的功能，可以更方便的於 JavaScript 中做字串組合。字串模板會以兩個 **\` \` (反斜線)** 框起，於反斜線中寫入的任何文字都會當成 string 處理，此時要使用變數或是表達式，就要另外用 `${}` 包住。
```js
// 示範一: 使用 ES6
const imgUrl = "img/logo.png";
const str = `<li><img src=${imgUrl}></li>`;

// 示範一: 使用 ES5
var imgUrl = "img/logo.png";
var str = "<li><img src="+imgUrl+"></li>";

// 示範二: 使用 ES6
function greet(name, days){
  console.log(`hi ${name}, it has been ${days * 24} hours not to see you`);
}

// 示範二: 使用 ES5
function greet(name, days){
  console.log("hi " + name + ", it has been " + 24 * days + " hours not to see you");
}

// 示範三: 使用 ES6
const people = [
  {name: 'Troy', age: 18},
  {name: 'Chelsea', age: 16}
];
const ul = `
  <ul>
  ${ people.map( person => `<li>我叫做 ${person.name}</li>` ).join('') }
  </ul>
`;

//示範三: 使用 ES5
var people = [
  {name: 'Troy', age: 18},
  {name: 'Chelsea', age:16}
];
var ul = '<ul>' + people.map( function(person){
    return '<li>我叫做' + a.name + '</li>'
  }).join('') + '</ul>';
```
示範二可看出組字串要帶的變數變多，原本的組法就要不斷用引號分割，閱讀上也較為困難。

示範三中也可以知道被反引號包起的範圍內，直接空行換行是不會被另外編譯的，可以用一般在寫 html 的方式來組標籤內容，字串模板也可巢狀應用，這樣不僅閱讀上可容易，程式碼更精簡，也不用擔心一直用引號分割結果格式亂掉。

## 展開與剩餘 (spread and rest)
展開與剩餘其實是兩個截然不同的功能，只是看起來都是三個點符號 `...`，一開始還滿容易搞混的，想說放在一起解釋比較有助於區分差異。

#### 展開 (...spread)
展開可以將物件中的值一個個的抽取出來，這種方式可以很簡單的達成物件合併、拆解二維陣列變一維，也可以做到物件的複製(淺拷貝)。
```js
//示範一: 合併二維陣列變成一維陣列
const concat = [...[1,2,3], 4, ...[5,6,7]];
console.log(concat); //[1,2,3,4,5,6,7]

//示範二: 複製陣列(複製後的陣列跟原陣列不是同一個參考，屬於淺拷貝)
const arr = ['apple', 'lime', 'banana'];
let copy = [...arr];
copy[0] = 'melon';
console.log(arr[0], copy[0]); //apple, melon

//示範三: 排除陣列中某筆資料
const arr2 = [1,2,3,4,5,6];
const newArr = [...arr3.slice(0,3), ...arr3.slice(4)];
console.log(newArr); //[1,2,3,5,6], 4被過濾掉了

//示範四: 物件格式也可用展開，屬於淺拷貝
const chelsea = {
  name: 'Chelsea',
  family: ['Dad', 'Mon', 'Brother', 'Cat']
};
const troy = {...chelsea};
troy.name = 'Troy';
troy.family.pop();
console.log(chelsea, troy); //name 會不同，但 family 是相同的
```
使用展開符號進行物件(陣列)的複製時要特別注意子層的型別，如果抓出來的值是一組陣列或物件，那麼他們的參考來源還是會相同。

#### 剩餘 (...rest)
剩餘的目的就是將剩餘的部分另存到指定變數中，主要會在兩種情境用到，一是在物件(陣列)的解構賦值，二是作為函式參數宣告。
- 運用在解構賦值
```js
// array 解構
const arr4 = [1,2,3,4];
const [a, ...b] = arr4;
console.log(a,b); //a = 1, b = [2,3,4]

// obj 解構
const foods = {
  taiwan: ['麻婆豆腐', '牛肉麵', '熱炒'],
  japan: ['壽司', '拉麵', '丼飯'],
  america: ['漢堡', '熱狗', '捲餅']
}
const {america, ...asia} = foods;
console.log(america, asia); //america 會直接變成陣列， asia 依然是個物件並保有 taiwan 及 japan 的 key/value
```
- 運用在函式參數，當函式可能帶入不確定數量的參數時，使用剩餘就可以存取所有參數到指定的變數中。
```js
function convertCurrency(rate, ...amounts){
  return amounts.map( amount => amount * rate);
}
console.log(convertCurrency(1.5, 20, 50, 66, 150)); // [30, 75, 99, 225]
```

## 解構賦值 (destructuring)
解構賦值可以在宣告變數的同時，順便進行值的拆解以及重新指定。短短一行程式碼就可以達成以往需要二到三行才能完成的動作。
主要分為陣列解構及物件解構:

#### 陣列解構
陣列解構會用 `[]` 符號框起要被賦值的變數，這種方式可以達成取出一組陣列當中的某個值，或是變數之間值的互換。變數也可先設預設值，如果解構時抓不到值就會以預設值為準。
```js
// 取出陣列中的值並直接儲存到宣告的變數中
const [a, b] = [1, 2, 3];
console.log(a,b); //a = 1, b = 2

// 取出陣列中特定位置的值
const [,, third] = [1,2,3,4,5];
console.log(third); //3

// 變數設定預設值
const [a, b, c=0] = [1,2];
console.log(a,b,c); //1,2,0

// 變數值互換
let a = 1, b = 2;
[a,b] = [b,a];  //a變成2，b變成1
```

#### 物件解構
物件解構會用 `{}` 符號框起要被賦值的變數，與陣列不同的是，物件取值時預設是拿 key 值當取值的變數，如要改變數名稱須要另外設定，一樣可以設預設值。
```js
// 使用 key 值為變數名稱
const obj = { x: 50, y: 100 };
const {x, y} = obj;
console.log(x, y); //50, 100

// 另外命名其他變數及設定預設值, key : variable name = default value
const obj = { x: 50, y: 100 };
const {x: a, y: b, z: c = 0} = obj;
console.log(a, b, c); //50, 100, 0
```
命名成其他變數後，key 本身就無效了，以上例來說等於是把 x 的值直接指定到變數 a 的意思。

陣列/物件解構可以讓函式的參數寫法更彈性方便:
```js
const point = {
  x: 30,
  y: 100
};

// 不使用解構的寫法:
function distance(point){
  return Math.sqrt( point.x * point.x + point.y * point.y);
}

// 參數解構寫法1:
function distance(point){
  const {x, y} = point;
  return Math.sqrt(x * x + y * y);
}

//參數解構寫法2(更簡短):
function distance({x, y}){
  return Math.sqrt(x * x + y * y);
}
```