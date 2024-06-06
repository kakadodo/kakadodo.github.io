---
title: ES6 - Generator 與 yield
categories: JavaScript
tags:
  - JavaScript
  - ES6
date: 2018-12-04
thumbnail: https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20180319-js-about-javascript.jpg?alt=media&token=68f6351d-34bc-45bf-ae3f-9671da27b39d
---

# {{ $frontmatter.title }}

![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20180319-js-about-javascript.jpg?alt=media&token=68f6351d-34bc-45bf-ae3f-9671da27b39d "這個朋友必交! 關於 JavaScript 的眉眉角角")

Generator 中文直譯為生成器，其運作原理會依照開發者提供的"生產步驟"來一一執行每項任務，直到任務完成。

宣告的寫法跟一般 function 很像，只是會在 function 這個名稱後方加上 `*` 號以作為生成器的定義。但這個 `function*` 其實最後是要回傳一個生成器的 Object，這個 Object 就會有相關的 methods 來執行生產步驟。

## yield / next()
生成器中， `yield` 扮演了很重要的角色，用於暫停生成器目前的執行並回傳當前結果出去，直到呼叫了 `.next()` 指令後才會執行下一步動作。

```js
// 寫法跟 function 相同，但要記得加上 * 號
function* myGenerator(){
  // yield 是生成器很重要的夥伴!用來通知生成器何時要暫停，以及將當前階段的結果回傳出去
  yield 'ya!';
}

// 執行生成器 fn 以產生一個生成器 Obj
const myG = myGenerator();

// 執行生成器 Obj 的 .next() 進行下一步動作，直到 yield 都走完了結果會變成 true
myG.next(); //{value: 'ya!', done: false}
myG.next(); //{value: undefined, done: true}
```

使用 `.next()` 時如果有帶入參數的話，這個參數會由 ==上一個 yield== 來接收並返回給變數存取。

```js
function* myGenerator(word){
  yield 'ya!';
  let result = yield 'yo!'; // 設定一個變數來存放"下一個" next() 要丟進來的值
  yield word; // yield 參數出去
  yield result; // 最後回傳這個值的結果
}

const myG = myGenerator('yup!'); // 帶參數進去

myG.next(); // {value: 'ya!', done: false}
myG.next(); // {value: 'yo!', done: false}
myG.next('wtf!'); // {value: 'yup!', done: false}
myG.next(); // {value: 'wtf!', done: false}
myG.next(); // {value: undefined, done: true}
```

## yield*
加上了星號的 `yield*` 則是可以在一個生成器當中執行另一個生成器的內容。

```js
function* myGen2(){
  yield 'Hi!';
  yield 'Hello!';
}
function* myGenerator(){
  yield 'ya!';
  yield 'yo!';
  yield* myGen2();
  yield 'bye!';
}

const myG = myGenerator();

myG.next(); // {value: 'ya!', done: false}
myG.next(); // {value: 'yo!', done: false}
myG.next(); // {value: 'Hi!', done: false}
myG.next(); // {value: 'Hello!', done: false}
myG.next(); // {value: 'bye!', done: false}
myG.next(); // {value: undefined, done: true}
```
從中可以發現使用生成器除了能照自己想要的步驟一一執行內容外，也可以把多個生成器集合在一起執行。

## 搭配 for of 來遍歷生成器的結果
由於生成器產生出來的 Object 其實是個 Iterator Obj，因此使用 `for of` 來跑生成器對象就可以一次產生全部的結果出來!

```js
function* myGen2(){
  yield 'Hi!';
  yield 'Hello!';
}
function* myGenerator(){
  yield 'ya!';
  yield 'yo!';
  yield* myGen2();
  yield 'bye!';
}

let greetingWords = [];

for(const word of myGenerator()){
  greetingWords.push(word);
}

console.log(greetingWords); // ["ya!", "yo!", "Hi!", "Hello!", "bye!"]
```
值得一提的是，搞懂 Generator / yield 跟 Promise 的用法，其實 ES2017 的 async / await 就很好懂了~原理是相同的概念，[Async-Await≈Generators+ Promises](https://hackernoon.com/async-await-generators-promises-51f1a6ceede2) 這篇文章也有提到 async / await 其實就是 Generator / Promise 的語法糖，babel 轉化 async / await 時就是改成 Generator 跟 Promise 喔!