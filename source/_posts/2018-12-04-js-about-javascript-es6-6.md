---
title: 這個朋友必交! 關於 JavaScript 的眉眉角角 - 16.ES6 - Generator 與 yield
keywords:
  - JavaScript, ES6
categories:
  - JavaScript
tags:
  - JavaScript
  - ES6
thumbnailImagePosition: left
date: 2018-12-04 09:01:58
thumbnailImage: https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20180319-js-about-javascript.jpg?alt=media&token=aa9b337d-f36d-4b93-afd3-03b01f56938a
---

覺得這篇內容應該是自己最不可能用到的功能了 XD
但都接觸到了就記錄一下吧~
<!-- excerpt -->
![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20180319-js-about-javascript.jpg?alt=media&token=aa9b337d-f36d-4b93-afd3-03b01f56938a "這個朋友必交! 關於 JavaScript 的眉眉角角")

這陣子一直在把之前"收集"起來的教學影片慢慢消化...發現自己真的發了瘋的狂註冊內容都差不多的課程 XD ( Udemy 免費跟促銷真得太過分了!!) 但講師不同就覺得好像會獲得不同收穫...還是默默看起來了

而在介紹 ES6 語法的課程中，幾乎都會帶到的一個功能就是這次要寫的 Generator，中文直譯為生成器，其運作原理確實有生成器的感覺啦~會依照開發者提供的"生產步驟"來一一執行每項任務，直到 mission completed~~~!!

光聽這名稱應該多少感覺這玩意跟 function 脫離不了關係吧!宣告的寫法也跟一般 function 很像，只是會在 function 這個名稱後方加上 `*` 號以作為生成器的定義。但這個 `function*` 其實最後是要回傳一個生成器的 Object，這個 Object 就會有相關的 methods 來執行生產步驟。

除了生成器本身外，它還有個很重要的賢內助 `yield`，少了這個賢內助的生成器就跟賽一樣。(喂~

```js
// 寫法跟 function 相同，但要記得加上 * 號
function* myGenerator(){
  // yield 是生成器很重要的夥伴!用來通知生成器何時要暫停，以及將當前步驟的結果回傳出去
  yield 'ya!';
}

// 執行生成器 fn 以產生一個生成器 Obj
const myG = myGenerator();

// 執行生成器 Obj 的 .next() 進行下一步動作，直到 yield 都走完了結果會變成 true
myG.next(); //{value: 'ya!', done: false}
myG.next(); //{value: undefined, done: true}
```

上例就是一個基本的 Generator 寫法，接下來就要進入稍稍複雜一點的細節，首先~生成器既然是用 function 的外觀，那就可以有參數的帶入!恩恩~這很合理!
再來， `yield` 這個賢內助掌管的事情真的很多!不僅要告知生成器暫停當前步驟，還要回傳當前結果，更甚至要顧慮到外層使用 `.next()` 時如果有帶入參數的話，這個參數就要由"上一個" yield 來接受並返回給變數存取(前提是要有設變數存取啊~) 啥? 我在寫甚麼鬼東西? 看不懂的話，看範例最快!

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
是不是很有事!!!!!!! 這 part 莫名困擾我一段時間~會搞不懂到底是誰在處理這些行為，為什麼 next() 明明是後一步處理的，上一個 yield 卻可以收到值 XD，覺得 yield 工作量有點太大了點，是在慣老闆嗎(氣)

除了基本的 `yield` 之外，加上了星號的 `yield*` 又是另一回事，主要目的是可以在一個生成器當中執行另一個生成器的內容(像是把工作塞到同一個人身上一次做..要哭了)

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

寫到這可能會懷疑人生，到底這東西要用在哪啊......其實從中可以發現使用生成器除了能照自己想要的步驟一一執行內容外，也可以把多個生成器集合在一起執行，感覺就很適合用來執行異步程式的處理。最重要的是，生成器有個非常強大的得力幫手 `for of` 可以快速跑完生產過程，由於生成器產生出來的 Object 其實是個 Iterator Obj，`for of` 又是一個專門用來跑 Iterator 的遍歷指令，因此使用 `for of` 來跑生成器對象就可以一次產生全部的結果出來!

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
結果最終是產生一組打招呼的 array...哈哈!

其實看了幾個講師介紹完 Generator 之後也是各種評語，"這不是很常用~但可以知道原理"、"真搞不懂為何要這樣寫~但還是介紹好了" XDD
聰明的工程師或許可以藉由生成器寫出非常強大的功能吧~(我是愚昧的 🌝

值得一提的是，搞懂 Generator / yield 跟 Promise 的用法，其實 ES2017 的 async / await 就很好懂了~原理是相同的概念，[Async-Await≈Generators+ Promises](https://hackernoon.com/async-await-generators-promises-51f1a6ceede2) 這篇文章也有提到 async / await 其實就像 Generator / Promise 的語法糖，babel 轉化 async / await 時就是改成 Generator 跟 Promise 喔!

以上內容如有勘誤，還請不吝告知🙇