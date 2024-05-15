---
title: 迴圈(Loop)
categories: JavaScript
tags:
  - JavaScript
date: 2018-05-02
thumbnail: https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20180319-js-about-javascript.jpg?alt=media&token=68f6351d-34bc-45bf-ae3f-9671da27b39d
---

# {{ $frontmatter.title }}

![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20180319-js-about-javascript.jpg?alt=media&token=68f6351d-34bc-45bf-ae3f-9671da27b39d "這個朋友必交! 關於 JavaScript 的眉眉角角")

### for 迴圈
由一組小括號和大括號組成，對迴圈來說最重要的就是條件，如果條件沒設好可能會陷入無窮迴圈，然後就迎接瀏覽器的崩潰。(想試試看的人可以不要放條件更新..)
首先小括號`()`中會塞入三項內容:
1. 初始化條件 `(var i=0)`
2. 條件判斷 `(i<3)`
3. 條件更新 `(i++)`

大括號`{}`中則是寫入每跑一次迴圈要執行的內容，實際執行 for 迴圈的順序如下:
(1)宣告初始化值 -> (2)判斷是否符合條件限制 -> (3)執行內容 -> (4)條件更新 -> (2)判斷是否符合條件限制 -> (3) -> (4).....直到(2)的結果不符合時結束迴圈
```js
for(var i=0; i<3; i++){
  //執行內容
  console.log(i)
}
//結果會顯示 0,1,2，而 i 最後的值會是 3
```
以上例來說，`i<3`可知道迴圈要跑的次數，確保 i 在初始化是 0 時，最多只會跑 3 次。但如果資料是動態載入或新增而無法確定總共有幾筆，就要依靠陣列的 length 屬性啦!
```js
var data = [1,3,5,7,9]; //原本有5筆資料
data.push(11); //但之後有動態新增筆數
data = data.concat([2,4,6]); //或是合併了其他來源的資料
//這時想要顯示陣列所有的資料出來...
for (var i=0; i< data.length; i++){
  console.log(data[i]);
}
//1,3,5,7,9,11,2,4,6
//結果照樣一把抓~因為有 length 這個屬性可以得知陣列的確切長度
```

for 迴圈的次數更新可以`++`，當然也可以`--`，使用`--`可做到資料反序呈現。
```js
var data = [1,3,5,7,9];
//初始化的i值為總長度-1(可找到陣列的最後一筆index)
//i的判斷條件改為>=0，這樣當i變為-1時條件不成立就會結束迴圈
for(var i=data.length-1; i>=0; i--){
  console.log(data[i]);
}
//結果為 9,7,5,3,1
```
迴圈不是 function，因此在裡面宣告 var 的變數實際上是全域變數，使用上要小心變數被其他迴圈或函式汙染。若使用 ES6 的 let 宣告，變數會只存在於迴圈中。

### while 迴圈
跟 for 迴圈很像，兩者都可以達成相同的結果，一樣有初始化條件、條件判斷、條件更新，只差在放置的位置不同。初始化條件寫在迴圈外，while 的小括號`()`中寫入條件判斷，當條件為 true 時，會不斷執行大括號`{}`中的內容，直到條件為 false 結束迴圈。而條件更新則是一起寫在大括號中。
```js
var num = 0;
while(num<5){
  console.log(num);
  num ++;
}
//結果為 0,1,2,3,4,num值是6
```

### do while 迴圈
與 while 不同的是，不論初始條件值為何，都會先執行一次 do 裡面的內容，才做條件判斷。
```js
var num = 6;
do{
  console.log(num);
}while(num<5);
//還是有印出 num 是6，即使 while 的條件是 num<5
```

### for in 迴圈
for in 可以用在跑遍物件的每個屬性，當然它也可以用在陣列上，但要注意該陣列是否有另外設定過屬性，因為 for in 的特性就是會把每個屬性都抓出來，此時遍歷出來的結果就會包含陣列設定的屬性跟值。
```js
var arr = [1,2,3];
//arr可能因其他套件而增加了屬性的設定
arr.test = 'test';
console.log('array長度: '+arr.length);
for (num in arr){
  console.log('屬性: '+num);
  console.log('值: '+arr[num]);
}
//結果: "array長度: 3","屬性: 0","值: 1","屬性: 1","值: 2","屬性: 2","值: 3","屬性: test","值: test"
//除了原本的 array 內容外，連 array 設定的屬性也會一併抓出來
```
為避免發生不可預料的狀況，一般還是用 for in 跑 Object，而 Array 則使用 for 或其他後期新增的方法較安全。

### 迴圈的好幫手: break、continue
在跑迴圈時，可能會遇到想要在某個條件下就把迴圈終止掉，或者某個條件下要略過迴圈執行的內容並直接跑下一次迴圈，這時就會用到上述兩種語法。
- break: 顧名思義就是斷/結束的意思，只要在迴圈中加入 break，即使條件還在符合範圍內，也會終止整個迴圈。
```js
for(var i=0; i<3; i++){
  if(i == 1){
    break;
  }
  console.log(i);
}
//結果只顯示0，因為當i變1時就觸發break結束迴圈，break之後的內容也不會再跑了
```
- continue: 也是很直覺的命名，可以在迴圈的判斷式中加入 continue， 當判斷式成立時，continue 後的語法會被略過，並進入下一回迴圈。
```js
for(var i=0; i<3; i++){
  if(i == 1){
    continue;
  }
  console.log(i);
}
//結果顯示0跟2，1因為 continue 的關係被略過了，但迴圈依然有全部跑完
```