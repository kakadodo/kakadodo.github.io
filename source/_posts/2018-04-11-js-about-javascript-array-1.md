---
title: 這個朋友必交! 關於 JavaScript 的眉眉角角 - 2.陣列(Array)-上
keywords:
  - JavaScript, Array
categories:
  - JavaScript
tags:
  - JavaScript
thumbnailImagePosition: left
date: 2018-04-11 11:44:28
thumbnailImage: https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20180319-js-about-javascript.jpg?alt=media&token=aa9b337d-f36d-4b93-afd3-03b01f56938a
---

啊\~\~\~要養成寫 blog 的習慣好難~一開始就認定自己不可能每天都寫(腦容量不夠)，想說好歹一周要產出一篇..結果碰到一個連假就 GG 了，連假真是甜蜜的惡魔~~💘💘💘
<!-- more -->
![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20180319-js-about-javascript.jpg?alt=media&token=aa9b337d-f36d-4b93-afd3-03b01f56938a "這個朋友必交! 關於 JavaScript 的眉眉角角")
陣列及物件這兩位同胞在一開始接觸 js 時，帶來了不少磨難與困惑..看起來很像，用起來也很像，更不用說兩者之間還可以互相寄生(?)，甚至歸根到底都是同種來源(Object)..根本黑人問號 at all
這篇就先來寫關於陣列的二三事~

---

#### 陣列 (Array)
陣列是物件衍伸出來的一種資料型態，js 中以中括號 `[]` 表示，例如 `[1,2,3]`。陣列是有順序性的，因此索引(index)在陣列中是很重要的判斷關鍵。陣列中可以存放不同的型別，但閒閒沒事應該不會這樣自找麻煩..

以下列出常見的陣列用法:

- 建立陣列:可以直接宣告陣列實例，也可以用陣列的建構式`new Array()`來產生
```js
  //直接建立陣列實例
  var array1 = [1,2,3];
  //使用建構式建立陣列
  var array2 = new Array(1,2,3);
  //也可以先建立成空的陣列，之後再給值
  var emptyArray = [];
```

- 陣列取值賦值: `array[index]`的方式可取得、新增或更新特定筆數的值，前提是要知道程式語言的索引是從 0 開始，一組資料的第 1 筆對他們而言是第 0 筆，假設陣列共有 5 筆資料，但要分別取得每筆內容時會是從 0~4 而不是 1~5。
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

- 取得陣列長度: `array.length`必用~搭配 for 迴圈打遍天下。
```js
  var array = [1,2,3];
  console.log(array.length) //結果是3
```

- 找出值所在的索引位置: `array.indexOf(value)`這個方法常用在判斷某筆資料是否存在於陣列中，如果結果是 **-1**，表示陣列中沒有這筆資料。
```js
  var friends = ['Tom','Mary','Hank','Tina'];
  console.log(friends.indexOf('Hank')); //結果是2
  console.log(friends.indexOf('Troy')); //結果是-1，表示沒Troy這位朋友😆
```

- 新增一筆資料到陣列的最前面/最後面: `array.unshift(value)`可將值插入到陣列的最前面，`array.push(value)`則是加到最後面
```js
  var friends = ['Tom','Mary','Hank','Tina'];
  friends.unshift('Amy');
  console.log(friends); //["Amy", "Tom", "Mary", "Hank", "Tina"]
  friends.push('Ben');
  console.log(friends); //["Amy", "Tom", "Mary", "Hank", "Tina", "Ben"]
```

- 刪除陣列的最前面/最後面資料: `array.shift()`刪除第一筆陣列資料，`array.pop()`刪除最後一筆陣列資料，由於是刪除所以不用帶任何值
```js
  var friends = ['Tom','Mary','Hank','Tina'];
  friends.shift();
  console.log(friends); //["Mary", "Hank", "Tina"]
  friends.pop();
  console.log(friends); //["Mary", "Hank"] 一個朋友越來越少的概念...
```

- 陣列資料反轉: `array.reverse()`可用在排序時要反轉呈現的順序，如果要返回原本順序，就再 reverse 一次吧XD
```js
  var array = [1,2,3];
  array.reverse();
  console.log(array); //[3,2,1]
```

- 合併陣列: `array1.concat(array2)`合併 array2 到 array1 裡面，2 的資料會排在 1 後面，但合併後的陣列不會蓋掉原本的 array1，而是產生一組新的合併後的陣列
```js
  var arr1 = [1,2,3];
  var arr2 = [4,5,6];
  var newArr = arr1.concat(arr2);
  console.log('newArr: '+ newArr, 'arr1: '+ arr1, 'arr2 :'+ arr2); //newArr: 1,2,3,4,5,6 arr1: 1,2,3 arr2 :4,5,6
```
  **concat()的妙用:**陣列與物件宣告成變數時都是傳址不傳值的，即使另外宣告一個變數來指定到原本的陣列變數，改變新變數的值後，原本的陣列變數也會被改變，在不使用 ES6 解構賦值的情況下，如果要複製一份原本的陣列又不會改變原本陣列的值，就可用`concat()`來做到。
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

- 陣列排序(升降序): `array.sort()` 用來處理陣列資料中的大小排序，會重新改變陣列的內容順序，因此如要保留原本的陣列順序，一樣可使用concat()複製新的一份陣列後再排序。
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
  sort()當中的`return a-b`就是判斷大小排序的關鍵，如果 return 的結果大於 0，a 就會放在 b 後面，小於 0 則反之，因此改成`return b-a`就會變成降序排列。

結果寫到這邊又默默把標題改成"-上"，哈哈哈 寫文章時間好難掌控喔...跟寫 code 有的比
決定先結束這回合了!!

以上內容如有勘誤，還請不吝告知🙇