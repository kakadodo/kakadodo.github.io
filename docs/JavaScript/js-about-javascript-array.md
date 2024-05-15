---
title: 陣列 (Array)
categories: JavaScript
tags:
  - JavaScript
date: 2018-04-11
thumbnail: https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20180319-js-about-javascript.jpg?alt=media&token=68f6351d-34bc-45bf-ae3f-9671da27b39d
---

# {{ $frontmatter.title }}

![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20180319-js-about-javascript.jpg?alt=media&token=68f6351d-34bc-45bf-ae3f-9671da27b39d "這個朋友必交! 關於 JavaScript 的眉眉角角")

陣列是物件衍伸出來的一種資料型態，js 中以中括號 `[]` 表示，例如 `[1,2,3]`。陣列是有順序性的，因此索引 (index) 在陣列中是很重要的判斷關鍵。陣列中可以存放不同的型別。

以下列出常見的陣列用法:

### 建立陣列
可以直接宣告陣列實例，也可以用陣列的建構式`new Array()`來產生
```js
//直接建立陣列實例
var array1 = [1,2,3];
//使用建構式建立陣列
var array2 = new Array(1,2,3);
//也可以先建立成空的陣列，之後再給值
var emptyArray = [];
```

### 陣列取值賦值
`array[index]`的方式可取得、新增或更新特定筆數的值，前提是要知道程式語言的索引是從 0 開始，一組資料的第 1 筆對他們而言是第 0 筆，假設陣列共有 5 筆資料，但要分別取得每筆內容時會是從 0~4 而不是 1~5。
```js
var array = [1,2,3];
//取得 array 第一筆資料
console.log(array[0]); //結果是1
//更新 array 第二筆資料
array[1] = 4;
console.log(array); //結果是[1,4,3]
//新增 array 第四筆資料
array[3] = 5;
console.log(array); //結果是[1,4,3,5]
```

### 取得陣列長度
`array.length` 很常拿來做資料的顯示判斷、數量判斷。
```js
var array = [1,2,3];
console.log(array.length) //結果是3
```

### 找出值所在的索引位置
`array.indexOf(value)`這個方法常用在判斷某筆資料是否存在於陣列中，如果結果是 **-1**，表示陣列中沒有這筆資料。
```js
var friends = ['Tom','Mary','Hank','Tina'];
console.log(friends.indexOf('Hank')); //結果是2
console.log(friends.indexOf('Troy')); //結果是-1，表示沒 Troy 這位朋友😆
```

### 新增一筆資料到陣列的最前面/最後面
`array.unshift(value)`可將值插入到陣列的最前面，`array.push(value)`則是加到最後面
```js
var friends = ['Tom','Mary','Hank','Tina'];
friends.unshift('Amy');
console.log(friends); //["Amy", "Tom", "Mary", "Hank", "Tina"]
friends.push('Ben');
console.log(friends); //["Amy", "Tom", "Mary", "Hank", "Tina", "Ben"]
```

### 刪除陣列的最前面/最後面資料
`array.shift()`刪除第一筆陣列資料，`array.pop()`刪除最後一筆陣列資料，由於是刪除所以不用帶任何值
```js
var friends = ['Tom','Mary','Hank','Tina'];
friends.shift();
console.log(friends); //["Mary", "Hank", "Tina"]
friends.pop();
console.log(friends); //["Mary", "Hank"] 一個朋友越來越少的概念...
```

### 陣列資料反轉
`array.reverse()`反轉陣列的順序，會改變原始陣列。
```js
var array = [1,2,3];
array.reverse();
console.log(array); //[3,2,1]
```

### 合併陣列
`array1.concat(array2)`合併 array2 到 array1 裡面，2 的資料會排在 1 後面，但合併後的陣列不會改變原本的 array1，而是 return 一組新的合併後的陣列
```js
var arr1 = [1,2,3];
var arr2 = [4,5,6];
var newArr = arr1.concat(arr2);
console.log('newArr: '+ newArr, 'arr1: '+ arr1, 'arr2 :'+ arr2); //newArr: 1,2,3,4,5,6 arr1: 1,2,3 arr2 :4,5,6
```
::: tip concat()的妙用
陣列與物件宣告成變數時都是傳址不傳值的，即使另外宣告一個變數來指定到原本的陣列變數，改變新變數的值後，原本的陣列變數也會被改變，在不使用 ES6 解構賦值的情況下，如果要複製一份原本的陣列又不會改變原本陣列的值，就可用`concat()`來做到。
:::
```js
//如果單純重新宣告的話...
var arr = [1,2,3,4,5,6,7,8,9];
var newArr = arr;
newArr.reverse();
console.log('newArr: '+ newArr, 'arr: '+ arr); //newArr: 9,8,7,6,5,4,3,2,1 arr: 9,8,7,6,5,4,3,2,1

//利用concat()是重新產生一組新陣列的方式，來複製原本的陣列資料
var arr = [1,2,3,4,5,6,7,8,9];
var arrCopy = [].concat(arr);
arrCopy.reverse();
console.log('arrCopy: '+ arrCopy, 'arr: '+ arr); //arrCopy: 9,8,7,6,5,4,3,2,1 arr: 1,2,3,4,5,6,7,8,9
```

### 陣列排序(升降序)
`array.sort()` 用來處理陣列資料中的大小排序，會重新改變陣列的內容順序，因此如要保留原本的陣列順序，一樣可使用 concat() 複製新的一份陣列後再排序。
```js
//升序排序，可簡寫成 arr.sort();
var arr = [3,7,5,1,4,9];
arr.sort();
//實際運作是這樣
//arr.sort(function(a,b){
//  return a-b;
//});
console.log(arr); //[1,3,4,5,7,9]

//改為降序排序
var arr = [3,7,5,1,4,9];
arr.sort(function(a,b){
  return b-a;
});
console.log(arr); //[9,7,5,4,3,1]

//降序也可搭配 reverse() 達成
var arr = [3,7,5,1,4,9];
arr.sort();
arr.reverse();
console.log(arr);
```
sort() 當中的`return a-b`就是判斷大小排序的關鍵，如果 return 的結果大於 0，a 就會放在 b 後面，小於 0 則反之，因此改成`return b-a`就會變成降序排列。

### 迭代陣列的方法
`array.map()` 結果會回傳一組新陣列而不影響原本內容，很常用來將資料轉換成新的組合方式。
```js
var friends = ['Tom', 'Mary', 'Ben'];
var friendsData = friends.map(function(value, index){
  if(value == 'Mary'){
    return value + ' is female.';
  }else{
    return value + ' is male.';
  }
});
console.log(friends, friendsData)
//friends結果: ["Tom", "Mary", "Ben"]
//friendsData結果: ["Tom is male.", "Mary is female.", "Ben is male."]
```

`array.forEach()` 遍歷每筆資料並可對資料做處理，不會回傳值，類似 for 迴圈，但 for 迴圈可以中斷執行，forEach 還是會跑完所有資料。
```js
var friends = ['Tom', 'Mary', 'Ben'];
friends.forEach(function(value, index){
  console.log(value + ' Wake up!!');
});
//結果出現三行 "Tom Wake up!!", "Mary Wake up!!", "Ben Wake up!!"，原本的 friends 陣列不會有變化
//Wake up 根本在對現在的自己說吧XD
```
forEach 也可以做條件式判斷，例如只想叫醒 Tom 跟 Ben 然後排擠 Mary 的話，就可以用 `return` 大法跳過 Mary，因為 forEach 不會理回傳值，因此在 if 判斷中加上 return 等於結束這回合的意思， forEach 還是會繼續跑下一回合直到全部跑完。
```js
var friends = ['Tom', 'Mary', 'Ben'];
friends.forEach(function(value, index){
  if(value == 'Mary'){
    return;
  }else{
    console.log(value + ' Wake up!!');
  }
});
//結果只出現兩行 "Tom Wake up!!", "Ben Wake up!!"，Mary 表示已流淚
```

`array.filter()` 用來篩選陣列值，會回傳符合條件為 true 的值存成一組新的陣列，filter 的 callback function 可以帶入三個參數 -  value、index 跟原本的 array。
```js
var numbers = [1,2,3,5,7,9,4,2,6];
//依序跑每筆資料，只會回傳數字大於 3 的值
var bigNumbers = numbers.filter(function(value, index, array){
  return value > 3;
});
console.log(bigNumbers); //[5, 7, 9, 4, 6]
```
filter 也可以過濾掉陣列中重複出現的值。
```js
var numbers = [1,2,3,5,7,9,4,2,6,5,3,9,8,1];
var uniqueNumbers = numbers.filter(function(value, index, array){
  return array.indexOf(value) == index;
});
console.log(uniqueNumbers); //[1, 2, 3, 5, 7, 9, 4, 6, 8]
```

`array.some()` 檢查陣列資料，回傳布林值 true or false，只要有一筆符合條件為 true，檢查結果就算 true
```js
var numbers = [1,2,3,5,7,9,4,2,6];
var result = numbers.some(function(value){
  return value == 7;
})
console.log('資料中有7嗎? 結果: '+result); //資料中有7嗎? 結果: true
```

`array.every()` 檢查陣列資料，回傳布林值 true or false，每筆資料皆符合條件為 true，檢查結果才算 true
```js
var numbers = [3,5,7,9,1,4,6];
var result = numbers.every(function(value){
  return value > 4;
})
console.log('資料中數字都大於4嗎? 結果: '+result); //資料中數字都大於4嗎? 結果: false
```

`array.reduce(callback, initialValue)` 將陣列中資料依序與一個累加器(accumlator)傳入 callback function 做某件事，這件事的結果只會回傳單一值。累加器預設是陣列第一個值，當 reduce 執行一次後，累加器的值就會變成執行後的結果，以此類推到跑完整個陣列，累加器也可以另外設初始值(initialValue)，只要當作 reduce 本身的第二個參數即可。
```js
//可以短短一行就讓陣列資料作加總
var money = [100,300,500,200,1500];
var totalMoney = money.reduce(function(accumlator,currentValue){
  return  accumlator + currentValue;
});
console.log(totalMoney); //2600

//累加器給定初始值，展開多維陣列
var mutipleArray = [[1,2],[3,4],[5,6]];
var concatArray = mutipleArray.reduce(function(accumlator,currentValue){
  return accumlator.concat(currentValue);
}, []);
console.log(concatArray); //[1, 2, 3, 4, 5, 6]
```

### 陣列組合成字串
`array.join(separator)` 把陣列組成字串，separator 可自行決定要用甚麼，沒輸入的話預設是逗號，如果要串成完整的一段字則輸入`""`兩個引號。
```js
var strArray = ['你','今天','吃','飯了嗎','?'];
var str = strArray.join('');
console.log(str); //"你今天吃飯了嗎?"

//沒輸入相連符號預設是用逗號連接
var str2 = strArray.join();
console.log(str2); //"你,今天,吃,飯了嗎,?"
```

### 取陣列某一段範圍的資料
`array.slice(beginIndex, endIndex)` 切割陣列的某一段範圍，會回傳一組擷取後的陣列(原陣列不受影響)。要注意的是 endIndex 的值不包含在擷取範圍內，假設從 index 0 切到 index 3，實際得到的結果會是 index 0、1、2 這三個的值。
```js
var strArray = ['你','今天','吃','飯了嗎','?'];
var sliceArray = strArray.slice(1,3);
console.log(sliceArray); //["今天", "吃"]
```

### 改變陣列某一段範圍的資料
`array.splice(start, deleteCount, value..)` 可以同時刪除值及新增值的方法，start 是要更動的索引位置，deleteCount 可指定從 start 開始要刪除的數量，第三個參數(value..)以後則是要追加到 start 位置的值。(值可以多個)如果有另外宣告變數來執行 splice， 刪除的值會存到該變數。
```js
//刪除值，且不指定數量
var strArray = ['你','今天','吃','飯了嗎','?'];
var deleteArray = strArray.splice(3);
console.log('strArray: '+strArray, 'deleteArray: '+deleteArray); //strArray: [你,今天,吃], deleteArray: [飯了嗎,?]

//不刪值，且從開始位置增加值
var strArray = ['你','今天','吃','飯了嗎','?'];
strArray.splice(3,0,'午');
console.log(strArray); //["你", "今天", "吃", "午", "飯了嗎", "?"]

//刪除特定數量的值，再增加多個值
var strArray = ['你','今天','吃','飯了嗎','?'];
strArray.splice(3,1,'甚麼','午餐');
console.log(strArray); //["你", "今天", "吃", "甚麼", "午餐", "?"]

//開始位置可以設為負數，表示從陣列最後面倒數的位置
var strArray = ['你','今天','吃','飯了嗎','?'];
strArray.splice(-2,1,'甚麼','午餐');
console.log(strArray); //["你", "今天", "吃", "甚麼", "午餐", "?"]
```
