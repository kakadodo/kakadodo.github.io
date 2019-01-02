---
title: 這個朋友必交! 關於 JavaScript 的眉眉角角 - 20.function 的進階概念 - Closure 閉包
keywords:
  - JavaScript
categories:
  - JavaScript
tags:
  - JavaScript
thumbnailImagePosition: left
date: 2019-01-02 09:00:00
thumbnailImage: https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20180319-js-about-javascript.jpg?alt=media&token=aa9b337d-f36d-4b93-afd3-03b01f56938a
---

我的天啊!不知不覺就這樣到了 2019 年...時間真得過很快~
收收連假的心趕緊來寫一篇~畢竟之後有更"盛大"的過年要來 哈(整個文不對題)
<!-- excerpt -->
![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20180319-js-about-javascript.jpg?alt=media&token=aa9b337d-f36d-4b93-afd3-03b01f56938a "這個朋友必交! 關於 JavaScript 的眉眉角角")

"閉包"跟上次介紹的 IIFE 都屬於 JavaScrupt Function 比較進階的概念，尤其是這個命名...一開始看到這名詞真的會滿臉黑人問號 🤷🏿‍🤷🏿‍🤷🏿‍

來看看 MDN 對閉包的定義 - **閉包（Closure）是函式的組合，以及該宣告函式所包含的作用域環境（lexical environment）**
老實說...看完這句我還是不知道它在說甚麼 XD
但從上句中可以抓幾個關鍵字出來參考，像是"函式"、"作用域環境"等，可見閉包跟函式的作用域有關，且它應該是函式的一種(有說到是函式的組合)

## 閉包 (Closure)

閉包形成的定義在於一個 function 其結果會回傳一個內部定義的 function，且該內部 function 有使用到外層 function 作用域中的變數值，當這種情境成立時，外部 function 照理說在執行完畢後就會被清除(跟 JavaScript 運行模式有關)，實際上卻會因為回傳的 function 依然有使用到外部環境的變數，而被保留住記憶體。這個回傳的內部 function 就會是一個閉包，它的外部環境是封閉的，可以保護裡面的值不會被其他函式汙染。
```js
function sayHello(job){
  return function(name){
    if (job === 'designer'){
      console.log('Hello ' + name + ', you are a designer right?');
    }else if (job === 'teacher'){
      console.log('Hello ' + name + ', you are a teacher right?');
    }
  }
};

const sayIt = sayHello('designer');
sayIt('Mary'); // Hello Mary, you are a designer right?

sayHello('teacher')('Ben'); // Hello Ben, you are a teacher right?
```
上例中的 sayHello 函式雖然內部沒有設定變數值，但因為有參數帶入的關係，其參數值就會存在該函式的作用域中。而 sayIt 這個變數存放 sayHello 回傳的 function，該 function 就可以存取到其外部 function 帶入的參數值，因此執行 sayIt 時，原本外部帶入的參數實際上不會消失，並且只能被回傳的 function 存取及改變。

閉包也可以搭配 IIFE 使用，會讓程式碼更精簡。
```js
const count=(function(){
  let counter = 0;
  return function(){
    return counter += 1;
  }
})();
count(); // counter 為 1
console.log(count()); // counter 為 2
```
利用 IIFE 會在定義同時就調用的特性， count 實際上已經是回傳的 function，也因為有存取到 IIFE 中的變數值，所以這個變數值依然被保留住記憶體且可被回傳的 function 修改。

所以，使用閉包有啥好處?
- 所在的作用域環境是被保護的，不會受其他程式干擾
- 外層環境是 function 的情況下，每次 function 執行後的閉包其實都是不同的個體，內部存取到的變數值也都是不同的。

不過並不代表 function 都要寫成閉包的模式，如果今天根本不需要用到外層環境的變數，寫成閉包只是增加自己困擾而已 XD



以上內容如有勘誤，還請不吝告知🙇