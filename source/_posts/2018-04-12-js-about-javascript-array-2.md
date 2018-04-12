---
title: 這個朋友必交! 關於 JavaScript 的眉眉角角 - 2.陣列(Array)-下
keywords:
  - javascript, array
categories:
  - javascript
tags:
  - javascript
thumbnailImagePosition: left
date: 2018-04-12 09:23:15
thumbnailImage: https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20180319-js-about-javascript.jpg?alt=media&token=aa9b337d-f36d-4b93-afd3-03b01f56938a
---

承皆上回的陣列基本用法~來介紹更多處理陣列的方法!有些方法會有瀏覽器版本的限制在，今年是 2018 年...可以不用管舊 IE 了嗎? (☍﹏⁰。) 
<!-- more -->
![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20180319-js-about-javascript.jpg?alt=media&token=aa9b337d-f36d-4b93-afd3-03b01f56938a "這個朋友必交! 關於 JavaScript 的眉眉角角")

想要讓陣列中的每筆資料都能抓出來做應用，剛開始學應該會想到使用 for 迴圈，雖然 for 迴圈真得很萬用，但寫起來還是有點繁瑣..所以後來就新增了幾種方法來操作陣列，但這些方法不兼容 IE9 以下版本喔喔喔喔~

- array.map(): 結果會回傳一組新陣列而不影響原本內容，很常用來將資料轉換成新的組合方式，有點像加工食品機的概念(?)。
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
  map()會巡訪陣列每筆資料，因此不用知道陣列長度有多少，function 中就會寫要怎麼加工每筆資料，以及最後記得要用 `return` 來將每筆資料回傳，不然得到的結果會是一組滿滿 undefined 的新陣列~ (눈‸눈)
```js
  //如果純加工而不回傳..
  var friends = ['Tom', 'Mary', 'Ben'];
  var friendsData = friends.map(function(value, index){
    if(value == 'Mary'){
      value = value + ' is female.';
    }else{
      value = value + ' is male.';
    }
  });
  console.log(friendsData) //[undefined, undefined, undefined]
```

- array.forEach(): 與 map() 有點相似，但結果不太相同，map()目的是巡覽每筆資料做處理並回傳一組新陣列，forEach 則是巡覽每筆資料再用資料去做其他事，它不會回傳值，功能類似 for 迴圈，只是一定會跑遍每筆資料的概念。
```js
  var friends = ['Tom', 'Mary', 'Ben'];
  friends.forEach(function(value, index){
    console.log(value + ' Wake up!!');
  });
  //結果出現三行 "Tom Wake up!!", "Mary Wake up!!", "Ben Wake up!!"，原本的 friends 陣列不會有變化
  //Wake up 根本在對現在的自己說吧XD
```
  當然 forEach 也可以做條件式判斷，例如只想叫醒 Tom 跟 Ben 然後排擠 Mary 的話，就可以用 `return` 大法把 Mary 給 GG，因為 forEach 不會理回傳值，因此在 if 判斷中加上 return 等於結束這回合的意思， forEach 還是會繼續跑下一回合直到全部跑完。
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

- array.filter(): 用來篩選陣列值，會回傳符合條件為 true 的值存成一組新的陣列，filter 的 callback function 可以帶入三個參數 -  value、index 跟原本的 array。
```js
  var numbers = [1,2,3,5,7,9,4,2,6];
  //依序跑每筆資料，只會回傳數字大於 3 的值
  var bigNumbers = numbers.filter(function(value, index, array){
    return value > 3;
  });
  console.log(bigNumbers); //[5, 7, 9, 4, 6]
```
  filter 也可以過濾掉陣列中重複出現的值，敲棒棒。
```js
  var numbers = [1,2,3,5,7,9,4,2,6,5,3,9,8,1];
  var uniqueNumbers = numbers.filter(function(value, index, array){
    return array.indexOf(value) == index;
  });
  console.log(uniqueNumbers); //[1, 2, 3, 5, 7, 9, 4, 6, 8]
```

- array.some(): 檢查陣列資料，回傳布林值 true or false，只要有一筆符合條件為 true，檢查結果就算 true
```js
  var numbers = [1,2,3,5,7,9,4,2,6];
  var result = numbers.some(function(value){
    return value == 7;
  })
  console.log('資料中有7嗎? 結果: '+result); //資料中有7嗎? 結果: true
```

- array.every(): 檢查陣列資料，回傳布林值 true or false，每筆資料皆符合條件為 true，檢查結果才算 true
```js
  var numbers = [3,5,7,9,1,4,6];
  var result = numbers.every(function(value){
    return value > 4;
  })
  console.log('資料中數字都大於4嗎? 結果: '+result); //資料中數字都大於4嗎? 結果: false
```

- array.reduce(callback, initialValue): 將陣列中資料依序與一個累加器(accumlator)傳入 callback function 做某件事，這件事的結果只會回傳單一值。聽起來很玄..用起來也滿玄的~以為是用來做數學運算的，結果看了[MDN](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)的範例後覺得有眼不識泰山!
  累加器預設是陣列第一個值，當 reduce 執行一次後，累加器的值就會變成執行後的結果，以此類推到跑完整個陣列，累加器也可以另外設初始值(initialValue)，只要當作 reduce 本身的第二個參數即可。
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

---
以下為舊 IE 有支援的一些好用方法:

- array.join(separator): 把陣列組成字串，separator 可自行決定要用甚麼，沒輸入的話預設是逗號，如果要串成完整的一段字則輸入`""`兩個引號。
```js
  var strArray = ['你','今天','打','肉了嗎','?'];
  var str = strArray.join('');
  console.log(str); //"你今天打肉了嗎?"

  //沒輸入相連符號預設是用逗號連接
  var str2 = strArray.join();
  console.log(str2); //"你,今天,打,肉了嗎,?" 沙小!?
```

- array.slice(beginIndex, endIndex): 切割陣列的某一段範圍，會回傳一組擷取後的陣列(原陣列不受影響)。要注意的是 endIndex 的值不包含在擷取範圍內，假設從 index 0 切到 index 3，實際得到的結果會是 index 0、1、2 這三個的值。
```js
  var strArray = ['你','今天','打','肉了嗎','?'];
  var sliceArray = strArray.slice(1,3);
  console.log(sliceArray); //["今天", "打"]
```

- array.splice(start, deleteCount, value..): 可以同時刪除值及新增值的方法，start 是要更動的索引位置，deleteCount 可指定從 start 開始要刪除的數量，第三個參數(value..)以後則是要追加到 start 位置的值。(值可以多個，整批插隊的意思啦!)如果有另外宣告變數來執行 splice， 刪除的值會存到該變數。
```js
  //刪除值，且不指定數量
  var strArray = ['你','今天','打','肉了嗎','?'];
  var deleteArray = strArray.splice(3);
  console.log('strArray: '+strArray, 'deleteArray: '+deleteArray); //strArray: [你,今天,打], deleteArray: [肉了嗎,?]

  //不刪值，且從開始位置增加值
  var strArray = ['你','今天','打','肉了嗎','?'];
  strArray.splice(3,0,'肥');
  console.log(strArray); //["你", "今天", "打", "肥", "肉了嗎", "?"]

  //刪除特定數量的值，再增加多個值
  var strArray = ['你','今天','打','肉了嗎','?'];
  strArray.splice(3,1,'LOL','了嗎');
  console.log(strArray); //["你", "今天", "打", "LOL", "了嗎", "?"]

  //開始位置可以設為負數，表示從陣列最後面倒數的位置
  var strArray = ['你','今天','打','肉了嗎','?'];
  strArray.splice(-2,1,'LOL','了嗎');
  console.log(strArray); //["你", "今天", "打", "LOL", "了嗎", "?"]
```

自己常用到的大概就這些吧~雖然範例很爛..這些方法互相搭配使用，就可以產生各種不同的資料結構了!!另外上面提到的多維陣列，如果單純取值的話，可以用最簡單的中括號取得，假設是三維陣列`[[[1,6],[2,7]],[3,4,5]]`，要取得 2 這筆資料可以寫成 `[[[1,6],[2,7]],[3,4,5]][0][1][0]` 這樣，就會得到 2 囉!!(鬼才看得懂)

以上內容如有勘誤，還請不吝告知🙇