---
title: ES7 - Async 與 Await
categories: JavaScript
tags:
  - JavaScript
  - ES7
date: 2018-12-11
thumbnail: https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20180319-js-about-javascript.jpg?alt=media&token=68f6351d-34bc-45bf-ae3f-9671da27b39d
---

# {{ $frontmatter.title }}

![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20180319-js-about-javascript.jpg?alt=media&token=68f6351d-34bc-45bf-ae3f-9671da27b39d "這個朋友必交! 關於 JavaScript 的眉眉角角")

Async、Await 最主要的特點就是可以依照順序逐個執行 Ajax 請求。

Async 的實體是一個 function，這個 function 會回傳一個 Promise 物件，如果 function 有 return 內容，則回傳的 Promise 物件會取得 resolve 的內容，有發生錯誤的話，則是回傳 reject 的狀態及錯誤訊息。也因為它是 function 的關係，可把非同步相關的程式碼都集中在一起，更好做管理。

而 Await 在 Async function 中扮演著非常重要的角色，它會負責控管當下 Promise 請求的進度，等到當前的 Promise 回傳完成後(不論成功或失敗)，才進行下一步。

```js
const getAllDatas = async (id1, id2)=>{
  const data1 = await fetch(`https://randomuser.me/api/?id=${id1}`).then(data=>data.json());
  console.log(data1);
  const data2 = await fetch(`https://randomuser.me/api/?id=${id2}`).then(data=>data.json());
  console.log(data1, data2);
}

getAllDatas(1,2);
```
以範例來說， `getAllDatas()` 是一個 Async function，其中 `async` 語法要寫在 function 的最開頭讓 JavaScript 知道它與一般 function 不同，function 中則直接撰寫非同步程式，執行 Ajax 的程式開頭加上 `await` 以告知這段程式需要暫停並等待完成。使用變數存放 await 的 Ajax，回傳結果會直接返回變數身上，因此在該 function 中就可以直接取得 data。

而錯誤訊息的捕獲則是使用 `try catch` 語法來幫忙，將要執行的一系列 Ajax 行為寫在 try block 中，如果 Ajax 有設定發生錯誤要顯示的特殊訊息，則錯誤發生時， catch block 就可取得該 error 資訊。
```js
const getAllDatas = async (id1, id2)=>{
  try{
    // 假設把 data1 的 api 連結打錯
    const data1 = await fetch(`https://randomuser.me/ap/?id=${id1}`).then(data=>data.json());
    console.log(data1);
    const data2 = await fetch(`https://randomuser.me/api/?id=${id2}`).then(data=>data.json());
    console.log(data1, data2);
  }catch(err){
    console.log('error:' + err);
  }
}

getAllDatas(1,2); //error: SyntaxError: Unexpected token N in JSON at position 0
```
Async/Await 乍看可能跟 Promise.all() 很像，但其實運行方式不同，前者在執行非同步程式時是一步一步的，會等待步驟完成才繼續下一步，而 Promise.all() 則是在執行的當下就各自跑呼叫的 api，但會等到全部的 api 都回傳資訊後才一起將資料 pass 回來。

```js
const getAllDatas = async ()=>{
  const gender = await new Promise(res=>{
    setTimeout(()=>{ res('female') }, 1000);
  })
  const data = await fetch(`https://randomuser.me/api/?gender=${gender}`).then(data=>data.json());
  console.log(data);
}

getAllDatas();
```
從上例就可以知道， `data` 的 api 呼叫會等到 `gender` 的 setTimeout 跑完才執行，這當中就是有 Await 在控管的關係。

Async/Await 也可以搭配 Promise.all() 來達成同時呼叫 api。
```js
async function runBoth(){
  const apis = ['https://randomuser.me/api/', 'https://picsum.photos/list'];
  const promise = apis.map(api=> fetch(api).then(res=>res.json()));
  const datas = await Promise.all(promise);
  console.log(datas);
}
runBoth();
```
