---
title: ES6 - Promise、Fetch 處理非同步程式
categories: JavaScript
tags:
  - JavaScript
  - ES6
date: 2018-09-25
thumbnail: https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20180319-js-about-javascript.jpg?alt=media&token=68f6351d-34bc-45bf-ae3f-9671da27b39d
---

# {{ $frontmatter.title }}

ES6 新增了 Promise 物件可以方便包裝非同步程式，而 Fetch 則是經過包裝後的 Promise，專門用來處理非同步資料。

![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20180319-js-about-javascript.jpg?alt=media&token=68f6351d-34bc-45bf-ae3f-9671da27b39d "這個朋友必交! 關於 JavaScript 的眉眉角角")

## Promise
使用 Promise 物件可以讓我們對非同步程式的執行結果更有掌握度(成功/失敗狀態都可取得)，也可避免 callback hell 產生，其關鍵在於建立出來的 Promise 物件可由 `.then()` 這個方法來不斷串接下一步要做的事情，如此一來可讓程式碼都維持在單層的情況下而不是一層包著一層來撰寫。

### new Promise()
建立 Promise 物件的方法是使用它的建構式 `new Promise((resolve, reject) => {})`，帶入一個執行函式，執行函式有兩個參數:成功 (resolve) 及失敗 (reject) 的回調函式，藉由這兩個回調函式來取得執行的結果。一般會再把 Promise 這個物件包裝在 function 裡面，藉由 return 的方式來產生 Promise 物件，這樣做的好處是可以讓這個 Promise 物件更為彈性且重複使用。

### .then().catch()
取得回傳資料有兩種方式，一是完全使用 then() 來接受成功與失敗，二則是使用 then() 接受成功狀態， catch() 來接受失敗狀態。
- 只使用 .then(): `.then((result)=>{//成功要做的事...}, (error)=>{//失敗要做的事})`
- 使用 .then().catch(): `.then((result)=>{//成功要做的事...}).catch((error)=>{//失敗要做的事})`

使用串接的方式，就可以不只一次的使用 `.then()` 來執行下一次的 Promise，以達到依序執行非同步程式卻又不會造成 callback hell 的情況。

以下為使用 Promise 來處理傳統 xmlHTTPRequest 的方式:
```js
// 建立 function 來產生 Promise 物件
const getData = (APIUrl)=>{
  return new Promise((resolve, reject)=>{
    //執行 ajax 請求，將 XMLHttpRequest 的內容塞進 Promise 來執行
    const xhr = new XMLHttpRequest();
    xhr.open('get', APIUrl);
    xhr.onload = function(){
      // 成功取得資料就執行 resolve()
      resolve(xhr.responseText);
    };
    xhr.onerror = function(){
      // 失敗就執行 reject()
      reject('Error失敗訊息');
    }
    xhr.send();
  });
}

// 呼叫 getData() 回傳一個 Promise 物件
const dataPromise = getData('https://...');

// Promise 的 then() 會等待 ajax 連線成功後，再執行相關內容
dataPromise.then((result)=>{
  console.log(result);
  // then()中執行下一次的 Promise
  return getData('https://...');
})
  .then((newResult)=>{
    console.log(newResult);
  })
  .catch((error)=>{
  console.log(error);
});
```
Promise 也提供兩種方法可以辦到同時執行多個非同步程式，`.race()` 會回傳多個非同步中最快執行完畢的內容，`.all()` 則是一次回傳全部非同步程式成功的內容，但如果其中一支非同步程式執行失敗，就會視為全部失敗。

### Promise.race([promise1, promise2,...])
```js
const introSelf = (name, time)=>{
  return new Promise((resolve, reject)=>{
    setTimeout(()=>{
      resolve(`哈囉! 我是${name}`);
    }, time);
  });
}

Promise.race([introSelf('Chelsea', 1000), introSelf('Mary', 1500)])
  .then((result)=>{
    console.log(result);
  })
  .catch((error)=>{
    console.log(error);
  });

// 等待 1 秒後，出現 "哈囉! 我是Chelsea"，並不會再跑出 Mary 打招呼。
```

### Promise.all([promise1, promise2,...])
(狀態皆成功會將資料存成一組 array 回傳)
```js
const introSelf = (name, time, success)=>{
  return new Promise((resolve, reject)=>{
    if(success){
      setTimeout(()=>{
        resolve(`哈囉! 我是${name}`);
      }, time);
    }else{
      reject('出錯啦!!!');
    }
  });
}

Promise.all([introSelf('Chelsea', 1000, true), introSelf('Mary', 1500, false)])
  .then((result)=>{
    console.log(result);
  })
  .catch((error)=>{
    console.log(error);
  });

// 直接出現 catch error "出錯啦!!!"，因為 Mary 無法成功執行 resolve，
// 如果將 Mary 也改成 true，則兩個結果都會成功，回傳的會是一組 array ["哈囉! 我是Chelsea", "哈囉! 我是Mary"]
```

## Fetch
Fetch 是 Promise 經過包裝後，專門用來處理非同步資料的 API，因此可以輕鬆使用 .then() 來串接!不過使用 Fetch 接收資料時要特別注意，回傳的資料格式是一個 ReadableStream 物件，需要再轉成正確的資料格式才行。
```js
// 以 random user 為例
fetch('https://randomuser.me/api/')
  .then((response) => {
    // 這裡會得到一個 ReadableStream 的物件
    console.log(response);
    // 可以透過 blob(), json(), text() 轉成可用的資訊
    return response.json();
  }).then((jsonData) => {
    console.log(jsonData);
  }).catch((err) => {
    console.log('錯誤:', err);
});
```

預設 Fetch 是使用 GET 方法，要使用 POST 的話，需要於第二個參數做 POST 的相關設定
```js
fetch('post API', {
  method: 'POST',
  // headers 加入 json 格式
  headers: {
  'Content-Type': 'application/json'
  },
  // body 內容須為字串格式
  body: JSON.stringify({
    email: 'xxx@gmail.com',
    password: '12345678'
  })
}).then((response) => {
    return response.json();
  }).then((jsonData) => {
    console.log(jsonData);
  }).catch((err) => {
    console.log('錯誤:', err);
})
```

ES6 的 Promise 大大改善了操作非同步時會遇到的困境，使用原生語法也更友善。