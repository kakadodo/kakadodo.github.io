---
title: 這個朋友必交! 關於 JavaScript 的眉眉角角 - 10.Ajax - XMLHttpRequest
keywords:
  - JavaScript, XMLHttpRequest, Ajax 非同步請求
categories:
  - JavaScript
tags:
  - JavaScript
thumbnailImagePosition: left
date: 2018-08-27 09:01:58
thumbnailImage: https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20180319-js-about-javascript.jpg?alt=media&token=aa9b337d-f36d-4b93-afd3-03b01f56938a
---

身為前端的一份子，使用 Ajax 取得資料應該是必經過程吧! 由於現在越來越多優化的套件可以使用，原生 JavaScript 的語法反而快忘光了!
這篇就來重溫紀錄一下最開始接觸的底層語法 XMLHttpRequest :D
<!-- excerpt -->
![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20180319-js-about-javascript.jpg?alt=media&token=aa9b337d-f36d-4b93-afd3-03b01f56938a "這個朋友必交! 關於 JavaScript 的眉眉角角")

Ajax (Asynchronous JavaScript and XML，AJAX) 非同步 JavaScript 及 XML，其原理是讓 Web 應用程式能快速、即時更動介面及內容，不需要重新讀取整個網頁，讓程式更快回應使用者的操作。雖然這個名稱提到的是 XML，但以現代的資料處理來說，使用輕量化的 JSON 格式更為方便且通用!而 Ajax 當中的核心物件就是 XMLHttpRequest 啦!

根據 MDN 提供的描述，要送出一個 HTTP 請求，需要三個步驟: **建立一個 XMLHttpRequest 物件**、**開啟一個 URL**，並 **發送一個請求**。在 **交易（transaction）完成** 後，XMLHttpRequest 物件將會包含如回應內容（response body）及 HTTP 狀態等等請求結果中的有用資訊。

常用到的 XMLHttpRequest 方法有:

- `xhr.open(method, url, async)`: 開啟一個請求，method 是與伺服器溝通的方法，像是 "GET", "POST", "PUT", "DELETE" 等等，url 為請求的伺服器網址，第三個參數 async 可省略，預設為 true 表示要用非同步的方式進行，如果設為 false 則會以同步的方式來發送請求!

- `xhr.setRequestHeader('Context-type','資料格式');` : 傳送資料到伺服器需要設定 HTTP request header。setRequestHeader() 可被呼叫的時間點必須於 open() 之後、在 send() 之前。主要的資料格式有兩種:
  - `application/x-www-form-urlencoded` : 傳統表單格式
  - `application/json` : json 格式(需透過 `JSON.stringify()` 將物件轉成字串)

- `xhr.send(data)` : 送出請求，參數可帶入要傳送到伺服器的資料(字串格式)，如果單純使用 GET 而不需帶資料的話，可省略不寫或是傳入 null。

以 [Random User](https://randomuser.me/) 為例，要取得一筆使用者資料就可用以下方式來發送請求:
```js
var xhr = new XMLHttpRequest();  //建立一個 XMLHttpRequest 物件
xhr.addEventListener("load", function(){
  console.log(xhr);  //交易完成後，取得回應內容並對內容做後續的操作
});
xhr.open("GET", "https://randomuser.me/api/");  //開啟一個請求
xhr.send();  //送出請求
```
![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/2018-08-27-js-about-javascript-XMLHttpRequest-1.jpg?alt=media&token=bbd8e971-ddec-4d29-be28-fa60dbcf22ea "這個朋友必交! 關於 JavaScript 的眉眉角角")

當 XMLHttpRequest 接收完回傳的內容，便會觸發 load 事件，我們便可以藉由 onload 的 callback function 取得回傳資料來做後續動作。而回傳的資料除了 data(responseText) 本身外，也包含了這筆請求的相關狀態。
- readyState: XMLHttpRequest 請求的狀態。

| 值 | 狀態 | 狀態描述 |
| - | - | - |
| 0 | UNSENT | XMLHttpRequest 已被建立，但 open() 方法尚未被呼叫 |
| 1 | OPENED | open() 方法已被呼叫 |
| 2 | HEADERS_RECEIVED | send() 方法已被呼叫，而且可取得 header 與狀態 |
| 3 | LOADING | 回應資料下載中，此時 responseText 會擁有部分資料 |
| 4 | DONE | 完成下載操作 |


- responseText: 回傳一個 DOMString，其內容為請求之回應的文字內容。如請求失敗或尚未發送，則為 null。由於回傳的是 string 格式，需使用 `JSON.parse()` 轉成物件!
```js
//前面略...
xhr.addEventListener("load", function(){
  console.log(typeof xhr.responseText); //result: string
});
```

- status: 已發送請求之回應的狀態。例如狀態 200 表示回傳成功， 404 表示資料讀取失敗等等.. [MDN 這篇](https://developer.mozilla.org/zh-TW/docs/Web/HTTP/Status)有提供詳細的 HTTP 狀態碼說明。
status 可讓我們在資料使用前先做一次檢查，以免資料讀取失敗卻還是將錯誤訊息顯示到頁面上造成使用者閱讀的困擾。
```js
//前面略...
xhr.addEventListener("load", function(){
  if(xhr.status === 200){
    //處理回傳資料的程式碼..
  }else{
    //資料沒有正確回傳時的解決方案
  }
});
```

使用 onload 事件目的是要確保資料完整載入後才去執行後續動作，但後續動作都寫在 onload 的 callback 中可能會不好閱讀，因此可改寫成呼叫另一個 function 的形式，把資料處理的動作統一寫在該 function 來管理。
```js
function getData(callback){
  //2.準備 XMLHTTPRequest() 請求
  let req = new XMLHTTPRequest();
  req.open('get','data.txt');
  req.onload = function(){
      //4.等待一段時間後，觸發 load 事件，取得資料
      //5.呼叫 callback，即透過參數傳入的 showData 函式
      callback(this.responseText);
};
  req.send();  //3.送出請求，進行非同步處理
}

function showData(result){
  alert(result);  //6.可以從 result 取得回傳的資料
};

getData(showData);  //1.呼叫 getData，並將 showData 透過參數傳入
```

這樣寫下來會覺得有 jQuery 真好! 不過了解底層有助於加深對它的觀念，搞懂 JavaScript 怎麼去實現這些功能，搭配現成套件使用的話就更好上手了!

以上內容如有勘誤，還請不吝告知🙇