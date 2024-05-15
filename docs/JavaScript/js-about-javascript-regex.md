---
title: 正規式 Regex
categories: JavaScript
tags:
  - JavaScript
date: 2018-08-20
thumbnail: https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20180319-js-about-javascript.jpg?alt=media&token=68f6351d-34bc-45bf-ae3f-9671da27b39d
---

# {{ $frontmatter.title }}

![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20180319-js-about-javascript.jpg?alt=media&token=68f6351d-34bc-45bf-ae3f-9671da27b39d "這個朋友必交! 關於 JavaScript 的眉眉角角")

Regex (Regular Expression 正規表示式)，原理是利用它規範的一系列規則來找出符合語句的字串。通常會用它來進行字串檢索、驗證或是替換某些條件下的內容。

正規式有兩種創建方式:
(範例 - 檢查是否有符合 "abc" 的字串片段)
1. 直接撰寫正規表達式的實例，將匹配規則寫在 `/ /` 之中
```js
const regex = /abc/;
const str = 'aaabcabcbc';
console.log(regex.test(str)); //true
```
2. 使用 RegExp 建構式來創建實例，呼叫 `new RegExp()`
```js
const regex = new RegExp('abc');
const str = 'aaabcabcbc';
console.log(regex.test(str)); //true
```
上面用的 `.test()` 是正規式物件的方法，可以用來檢測帶入的內容是否有符合正規式，有就回傳 true，沒有反之。
```js
//語法
/我是正規式/.test(我是要檢查的內容); //回傳布林值
```

除了 test 之外，String 物件的 match、replace、split 等方法都可以搭配正規式來使用。
<iframe width="100%" height="300" src="//jsfiddle.net/utvbxo7y/4/embedded/js,result/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>


一般用 Regex 大多會在較複雜的驗證模式，舉例來說最常看到使用正規式的 email 驗證，條件可能需要判斷是否含英文大小寫、數字或是 @ 符號等等，這種時候用 Ragex 來做就可以一行秒殺
```js
function validateEmail(email) {
  const reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return reg.test(email);
}
validateEmail('test@gmail.com'); //return true
```

以下就來介紹主要常見的正規式寫法:
(匹配對象以字母 abc 為例)
- `/a/` 比對 a
- `^a` 比對字串的起始位置是否為 a
- `a$` 比對字串的結束位置是否為 a
- `\` 避開特殊字元
  (假設要比對 ^，就可以寫成 `\^` 避開 ^ 符號的特殊意義)
- `*` 比對前一個字元有 0~無限多個
- `+` 比對前一個字元有 1~無限多個
- `?` 比對前一個字元有 0~1個，如果是接在*、+、? 或 {} 之後，則表示要取得符合標準的最小片段
- `{n}` 比對前一個字元有 n 個，`{n, m}` 設定範圍 ，`{n,}` n~無限多個
- `.` 任意字元
- `[abc]` 比對方括號中任意字元，a or b or c 其中一個符合即可
- `(ab)` 比對括號中的字串，並將符合的字串設成變數暫存($1,$2...)，RegExp.$1 可調用變數
- `|` "or" 的意思，比對使否符合前一個字元或是後一個字元，通常會用 () 包起
- `[^a]` 不含 a 的字串
- `\d` 比對數字，同理可用 `[0-9]`
- `\D` 比對非數字，同理可用 `[^0-9]`
- `\w` 比對數字、字母、底線，同理可用 `[a-zA-Z0-9_]`
- `\W` 比對 \w 以外的字元，同理可用 `[^a-zA-Z0-9_]`
- `\s` 比對空白字元，同理可用 `[ \r\t\n\f]`
- `\S` 比對非空白字元，同理可用 `[^ \r\t\n\f]`

另外 RegExp 還提供了搜尋方式的設定，可以讓匹配範圍更有靈活，其中最常用的就是 g 跟 i 了!
`g` 為全域搜尋，可以匹配出全部有符合正規式標準的字串。(預設只會匹配到第一個)
`i` 為搜尋涵蓋大小寫，可以匹配出符合正規式標準的大小寫字串。(預設是會區分大小寫)
實例會直接將設定加在後面，建構式建立的話則是設定在第二個參數。
```js
  //替換指定文字沒加 g
const sentence = "Today is Friday, i can't wait to back home. Crazy Friday!!";
console.log(sentence.replace(/Friday/, 'Monday')); 
//Today is Monday, i can't wait to back home. Crazy Friday!! 只有第一個 Friday 被換掉

//替換指定文字有加 g
console.log(sentence.replace(/Friday/g, 'Monday')); 
//Today is Monday, i can't wait to back home. Crazy Monday!!

//替換指定文字沒加 i
console.log(sentence.replace(new RegExp('friday'), 'Monday'));
//Today is Friday, i can't wait to back home. Crazy Friday!! 找不到匹配的正規式

//替換指定文字有加 i
console.log(sentence.replace(new RegExp('friday', 'ig'), 'Monday'));
//Today is Monday, i can't wait to back home. Crazy Monday!!
```