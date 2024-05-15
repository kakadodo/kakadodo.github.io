---
title: Javascript 的全域物件
categories: JavaScript
tags:
  - JavaScript
date: 2018-06-04
thumbnail: https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20180319-js-about-javascript.jpg?alt=media&token=68f6351d-34bc-45bf-ae3f-9671da27b39d
---

# {{ $frontmatter.title }}

使用 JavaScript 創建各種型態的資料時，資料本身已經有許多方法可使用，因為每個創建出來的實例可以藉由 prototype 來追循到上層擁有的方法。這次要來寫的就是這些上層物件!它們都是 JavaScript 的全域物件。

![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20180319-js-about-javascript.jpg?alt=media&token=68f6351d-34bc-45bf-ae3f-9671da27b39d "這個朋友必交! 關於 JavaScript 的眉眉角角")

### String - 處理字串型別資料
- `.length` : 取得字串的總長度(含符號及空白)
- `.toUpperCase()` : 將英文字串轉換成大寫模式
- `.toLowerCase()` : 將英文字串轉換成小寫模式
- `.charAt(index)` : 傳遞索引值作為參數，取得索引位置的字元
- `.indexOf()` : 傳遞字元作為參數，取得索引位置(如為-1表示沒有該字元存在)
- `.substring(beginIndex, endIndex)` : 取得開始索引值~結束索引值之間的字元(不包含結束索引值位置)
- `.split('分割字元/符號')` : 指定一個字元/符號當作分割關鍵，分割字元的前後字串片段會存成一組陣列
- `.trim()` : 字串開頭與結尾端移除空白字元
- `.replace('原始字元','替換字元')` : 將字串中含有原始字元的部分換成替換字元(搭配正規式 `/字元/g` 可替換全部)
```js
var strCht = '只要有上班，禮拜一永遠是惡夢';
var strEng = 'Always Fucking Hell on Monday!!!';

//.length
console.log(strCht.length); //14，連符號都會算進去

//.toUpperCase()
console.log(strEng.toUpperCase()); //"ALWAYS FUCKING HELL ON MONDAY!!!"

//.toLowerCase()
console.log(strEng.toLowerCase()); //"always fucking hell on monday!!!"

//.charAt()
console.log(strCht.charAt(3)); //"上"

//.indexOf()
console.log(strCht.indexOf('一')); //8

//.subString()
console.log(strCht.substring(6)); //"禮拜一永遠是惡夢"，第二個參數不寫的話就會切到最後

//split()
console.log(strCht.split('，')); //["只要有上班", "禮拜一永遠是惡夢"]

//.trim()
console.log('  前面兩個空白，後面兩個空白  '.trim()); //"前面兩個空白，後面兩個空白"

//.replace()
console.log('哭哭喔'.replace('哭' , '氣')); //"氣哭喔"
console.log('哭哭喔'.replace(/哭/g , '氣')); //"氣氣喔"，用正規式可以將全部相同的字元都替換掉
```

### Number - 處理數字型別資料
- `isNaN()` : 檢查是否為數值(此方式可判斷為 NaN 的值)
  NaN 是 not a number 的意思，這種值會出現通常是程式運算出現不可預料的錯誤時，JavaScript 的防崩潰機制，回傳 NaN 來表示這不是個數值，無法運算。但 NaN 是一個特例，任何值與它都不會相等，甚至連自己都不相等 XD
  因此要得知結果是不是 NaN 的話，就需要用到 isNaN() 這個方法囉!
- `.toFixed(num)` : 四捨五入至小數點後指定位數(回傳字串)
- `.toPrecision(num)` : 四捨五入至指定的整數位數(回傳指定數字的數目，字串型態) toPrecision 會從整數開始算字數，假設數值為 33.456，而要取的字數為 3，那麼會是從整數開始往右三個字數再經過四捨五入後的結果 33.5 喔!
```js
// isNaN()
console.log(isNaN(77)); //false
console.log(isNaN('77')); //false，如是數字字串，會自動轉型態
console.log(isNaN(true)); //false，true 可以當作數字中的 1
console.log(isNaN('悽悽慘慘戚戚')); //true
console.log(isNaN(NaN)); //true

// .toFixed()
var floatNum = 33.45678;
console.log(floatNum.toFixed(2)); //"33.46"
console.log(typeof floatNum.toFixed(2)); //"string"

// .toPrecision()
console.log(floatNum.toPrecision(3)); //"33.5"
console.log(floatNum.toPrecision(4)); //"33.46"
```

### Math - 處理數值和計算
- `Math.PI` : 回傳 PI 常數(3.1416...)
- `Math.round()` : 四捨五入運算
- `Math.sqrt()` : 開根號運算
- `Math.ceil()` : 向上取整數(取得大於或等於指定數值的整數)
- `Math.floor()` : 向下取整數(取得小於或等於指定數值的整數)
- `Math.random()` : 隨機產生0~1(不包含)之間的數值
  Math.random() 與 Math.floor() 搭配可得出隨機範圍的整數，這種用法常拿來做動畫效果的數值代入。
```js
// Math.PI
console.log(Math.PI); //3.141592653589793

// Math.round()
console.log(Math.round(33.5)); //34

// Math.sqrt()
console.log(Math.sqrt(9)); //3

//Math.ceil()
console.log(Math.ceil(99.23)); //100，有浮點數就會自動進位成整數

//Math.floor()
console.log(Math.floor(99.63)); //99，會刪除浮點數且不會進位

//Math.random()
console.log(Math.random()); //0.13712655625557457，隨機0~1的浮點數

//Math.floor() + Math.random()
console.log(Math.floor(Math.random()*4)+1); //取得1~5之間的整數
```

### Date - 處理日期資料 (毫秒自 1970/1/1 起計算)
建立一個 Date 物件 `new Date(日期)`，如沒帶入指定日期預設取得當下的日期時間
- `.getDate()` : 回傳日期(1-31)
- `.getDay()` : 回傳星期(0-6)，從 0 開始，0 等同於星期日
- `.getFullYear()` : 回傳年份(4位數)
- `.getHours()` : 回傳小時(0-23)
- `.getMilliseconds()` : 回傳毫秒(0-999)
- `.getMinutes()` : 回傳分鐘(0-59)
- `.getMonth()` : 回傳月份(0-11)，從 0 開始，因此換算後記得 +1 才是正確的月份
- `.getSeconds()` : 回傳秒數(0-59)
- `.getTime()` : 回傳至1970/1/1之間的毫秒數
- `.toDateString()` : 回傳具可讀性的日期字串
- `.toTimeString()` : 回傳具可讀性的時間字串
- `.toString()` : 回傳日期時間的字串
```js
var today = new Date();
console.log(today); //Mon Jun 04 2018 10:32:49 GMT+0800 (台北標準時間)

// .getDate()
console.log(today.getDate()); //4

// .getDay()
console.log(today.getDay()); //1

// .getFullYear()
console.log(today.getFullYear()); //2018

// .getHours()
console.log(today.getHours()); //10

// .getMilliseconds()
console.log(today.getMilliseconds()); //982

// .getMinutes()
console.log(today.getMinutes()); //32

// .getMonth()
console.log(today.getMonth()); //5，但當下是6月，因此記得+1
console.log(today.getMonth()+1); //6

// .getSeconds()
console.log(today.getSeconds()); //49

// .getTime()
console.log(today.getTime()); //1528079569982

// .toDateString()
console.log(today.toDateString()); //Mon Jun 04 2018

// .toTimeString()
console.log(today.toTimeString()); //10:32:49 GMT+0800 (台北標準時間)

// .toString()
console.log(today.toString()); //Mon Jun 04 2018 10:32:49 GMT+0800 (台北標準時間)
```

通過以上方式就可以取得日期的詳細資料~而在現實中常會用到的倒數計時，就會經過上述幾個方法計算來得出。
```js
var today = new Date('Mon Jun 04 2018 10:32:49');
var anotherDay = new Date('2018/6/30'); //只寫日期的話，時間預設會是00:00:00

var todayTime = today.getTime();
var anotherDayTime = anotherDay.getTime();

console.log(todayTime, anotherDayTime); //1528079569000, 1530288000000

var leftDayTime = (anotherDayTime - todayTime);

var leftDay = Math.floor(leftDayTime/1000/60/60/24);
var leftHours = Math.floor(((leftDayTime/1000/60/60/24) - leftDay)*24);
var leftMinutes = Math.floor((((leftDayTime/1000/60/60/24) - leftDay)*24 - leftHours)*60);
var leftSeconds = Math.floor(((((leftDayTime/1000/60/60/24) - leftDay)*24 - leftHours)*60 - leftMinutes)*60);

console.log('還剩下 '+leftDay+' 天 '+leftHours+' 時 '+leftMinutes+' 分 '+leftSeconds+' 秒.');
//"還剩下 25 天 13 時 27 分 11 秒."
```
如此一來便可得知剩餘多少時間，再搭配 setTimeout 之類的排程函式，就可以做出動態的倒數計時囉!

<iframe width="100%" height="300" src="//jsfiddle.net/kakadodo/6fxcset8/11/embedded/js,result/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>