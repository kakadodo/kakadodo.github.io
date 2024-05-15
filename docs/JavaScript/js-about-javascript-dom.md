---
title: DOM API
categories: JavaScript
tags:
  - JavaScript
date: 2018-05-14
thumbnail: https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20180319-js-about-javascript.jpg?alt=media&token=68f6351d-34bc-45bf-ae3f-9671da27b39d
---

# {{ $frontmatter.title }}

![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20180319-js-about-javascript.jpg?alt=media&token=68f6351d-34bc-45bf-ae3f-9671da27b39d "這個朋友必交! 關於 JavaScript 的眉眉角角")

## 找到指定 DOM 元素

### getElementById
由於 html 中 ID 不會重複命名的情況下，使用這個方法可以很直接地找到想要的單一元素。
```js
//html中有個id為a的a連結
var a = document.getElementById('a');
console.log(a); //可以取得這個 DOM 元素
```

### getElementsByTagName
取得 html 中某個標籤的全部集合，elements 是有加 s 的喔!
```js
var a = document.getElementsByTagName('a');
console.log(a); //會抓到全部的 a 連結
```

### querySelector
IE8 後新增的方法，可以用 CSS 選擇器的方式來選取元素，假設元素有多個，只會抓取到第一個。
```js
//html中有個id為a的a連結
var a = document.querySelector('a'); //一樣可以用標籤當選擇器
var b = document.querySelector('#a'); //id或class的話，就要加上相對應的css符號
```

### querySelectorAll
跟上一個差在後面加個 all，可取得全部符合的元素集合。
```js
var a = document.querySelectorAll('a'); //抓取全部的a連結
```

### getElementsByClassName
IE9 後新增的方法，顧名思義是以 class 作為選取的方式，這種方式抓取的結果，即使該 class 符合的元素只有一個，依然會以陣列的形式呈現喔!(元素會是一組 HTMLCollection) 要取得當中的某個元素的話，則可使用 `.item(index)` 抓取。
```js
//html中有個class為aa的a連結
var a = document.getElementsByClassName('aa');
console.log(a); //結果會是一組 HTMLCollection 的節點陣列，只是該陣列的 length 是 1。
console.log(a.item(0)); //可以抓到真正的 DOM 元素
```

## 巡訪 DOM 元素
如果今天要查找的元素，沒有設定 id / class，或是用 JavaScript 動態新增的話，DOM 間的巡訪就很重要了!

### parentNode
找到目前 DOM 元素的父層元素
```js
//html中有個ul>li.list
var ul = document.querySelector('.list').parentNode;
console.log(ul); //可找到 .list 的父層ul
```

### children / childNodes
可以找父親就可以找孩子啦!不過爸爸通常只有一個，孩子可能一打的關係，這兩種方式找到的結果都會是節點陣列。其中 childNodes 會將元素中的文字也視為查找的範圍(文字也是 DOM 的一種節點)
```js
//html中有個ul>li.list
var ulChildNodes = document.querySelector('ul').childNodes;
var ulChildren = document.querySelector('ul').children;
console.log(ulChildNodes, ulChildren); //如果 li 有文字的話，childNodes 會連文字也一起抓取
```

### firstChild / lastChild
一樣找孩子，只是結果不是第一個就是最後一個，文字節點也算子節點的一種。

### previousSibling / nextSibling
兄弟姊妹當然也可以找啦!文字節點也算在內。

## 巡訪表單元素
html 的表單存取除了設定 id / class 之外，也可以用 `document.forms` 的方式來抓取，預設會抓取 html 中的所有表單。選取表單中的所有元素則用 `elements` 來抓取，選取表單中的特定元素，則再指定到特定的 `name` 屬性。
```js
//html中有個form>input[name="email"]
var form = document.forms[0]; //forms預設也是節點陣列，即使只有一個 form 也要用陣列方式選取才能抓到單一表單
var inputEmail = form.elements.email; //elements後面接的是表單元素的name屬性名稱
console.log(inputEmail);
```

## 新增 DOM 元素

### innerHTML
以某個元素為容器，容器內的原始內容會被 innerHTML 全部替換掉，執行效能較快，但設定方式若不當容易有資安風險，因為 innerHTML 會將標籤也進行編譯，要避免被人插入惡意程式碼造成 XSS 漏洞。
```js
  //<div class="temp">123</div>
  var tempDIV = document.querySelector('.temp');
  tempDIV.innerHTML = "<h1>這是用innerHTML塞入的H1喔!!</h1>";
```

### createElement
比較正規的 DOM 元素建立方法，執行效能較差，但安全性高。使用 `appendChild()` 可將新增的元素加到原有內容的最後方。
```js
var el = document.createElement('h1'); //建立一個尚未綁定到DOM上面的元素
el.textContent = "這是用createElement建立的H1喔!!"; //雖然尚未綁定，還是可以針對這個元素加東西
document.body.appendChild(el); //最後把這個元素加到 document 中，才算正式綁定為 DOM 元素
```