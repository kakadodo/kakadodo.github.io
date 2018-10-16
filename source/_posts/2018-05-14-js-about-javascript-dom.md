---
title: 這個朋友必交! 關於 JavaScript 的眉眉角角 - 6.DOM
keywords:
  - JavaScript, DOM element
categories:
  - JavaScript
tags:
  - JavaScript
thumbnailImagePosition: left
date: 2018-05-14 08:53:04
thumbnailImage: https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20180319-js-about-javascript.jpg?alt=media&token=aa9b337d-f36d-4b93-afd3-03b01f56938a
---

各位母親們，母親節快樂!!這次自家的哥哥大手筆請客，整個假日就是吃好吃滿的概念..(撐)
這回來寫 JavaScript 的 DOM 元素，瀏覽器會將 html 的內容轉換成各個 DOM 元素，讓 JavaScript 可以巡訪及操作。
DOM 就像一個大家庭~彼此之間的關係是有跡可循滴~熟的話可以直接找到本人，不熟的話就要透過親戚間的巡訪才能找到~就是個小型社會嘛!
<!-- more -->
![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20180319-js-about-javascript.jpg?alt=media&token=aa9b337d-f36d-4b93-afd3-03b01f56938a "這個朋友必交! 關於 JavaScript 的眉眉角角")

JavaScript 提供以下幾種方式可以直接找到指定的 DOM 元素:

1. getElementById
  由於 html 中 ID 不會重複命名的情況下，使用這個方法可以很直接地找到想要的單一元素。不過是不是每個元素都要設 ID 那就見仁見智了...ID 用太頻繁應該會被後端追殺 XDD
  ```js
  //html中有個id為a的a連結
  var a = document.getElementById('a');
  console.log(a); //可以取得這個 DOM 元素
  ```

2. getElementsByTagName
  取得 html 中某個標籤的全部集合，elements 是有加 s 的喔!
  ```js
  var a = document.getElementsByTagName('a');
  console.log(a); //會抓到全部的 a 連結
  ```

3. querySelector
  IE8 後新增的方法，可以用 CSS 選擇器的方式來選取元素，假設元素有多個，只會抓取到第一個。
  ```js
  //html中有個id為a的a連結
  var a = document.querySelector('a'); //一樣可以用標籤當選擇器
  var b = document.querySelector('#a'); //id或class的話，就要加上相對應的css符號
  ```

4. querySelectorAll
  跟上一個大同小異~差在後面加個 all，很清楚知道是選全部了
  ```js
  var a = document.querySelectorAll('a'); //抓取全部的a連結
  ```

5. getElementsByClassName
  IE9 後新增的方法，顧名思義是以 class 作為選取的方式，這種方式抓取的結果，即使該 class 符合的元素只有一個，依然會以陣列的形式呈現喔!(元素會是一組 HTMLCollection) 要取得當中的某個元素的話，則可使用 item(index) 抓取。
  ```js
  //html中有個class為aa的a連結
  var a = document.getElementsByClassName('aa');
  console.log(a); //結果會是一組 HTMLCollection 的節點陣列，只是該陣列的 length 是 1。
  console.log(a.item(0)); //可以抓到真正的 DOM 元素
  ```

如果今天要查找的元素，沒有設定 id / class，或是用 JavaScript 動態新增的話，DOM 間的巡訪就很重要了!

1. parentNode
  找到目前 DOM 元素的父層元素
  ```js
  //html中有個ul>li.list
  var ul = document.querySelector('.list').parentNode;
  console.log(ul); //可找到 .list 的父層ul
  ```

2. children / childNodes
  可以找父親就可以找孩子啦!不過爸爸通常只有一個，孩子可能一打的關係，這兩種方式找到的結果都會是節點陣列。其中 childNodes 會將元素中的文字也視為查找的範圍(文字也是 DOM 的一種節點)
  ```js
  //html中有個ul>li.list
  var ulChildNodes = document.querySelector('ul').childNodes;
  var ulChildren = document.querySelector('ul').children;
  console.log(ulChildNodes, ulChildren); //如果 li 有文字的話，childNodes 會連文字也一起抓取
  ```

3. firstChild / lastChild
  一樣找孩子，只是結果不是第一個就是最後一個，文字節點也算子節點的一種。

4. previousSibling / nextSibling
  兄弟姊妹當然也可以找啦!文字節點也算在內。

不過上述的方式，都有可能因文字節點(空白也會產生文字節點)的關係而找錯對象，DOM 之間的尋訪用 jQuery 來達成會比較保險。(講半天是在自打臉嗎?XD)

html 的表單存取除了設定 id / class 之外，也可以用 document.forms 的方式來抓取，預設會抓取 html 中的所有表單。選取表單中的所有元素則用 elements 來抓取，選取表單中的特定元素，則再指定到特定的 name 屬性。
```js
//html中有個form>input[name="email"]
var form = document.forms[0]; //forms預設也是節點陣列，即使只有一個 form 也要用陣列方式選取才能抓到單一表單
var inputEmail = form.elements.email; //elements後面接的是表單元素的name屬性名稱
console.log(inputEmail);
```

除了查找 DOM 之外，動態產生 DOM 也是很重要的~~ JavaScript 有兩種方式可產生 DOM 元素
1. innerHTML
  以某個元素為容器，容器內的原始內容會被 innerHTML 全部替換掉，塞入的值是字串，執行效能較快，但設定方式若不當容易有資安風險。
  ```js
    //<div class="temp">123</div>
    var tempDIV = document.querySelector('.temp');
    tempDIV.innerHTML = "<h1>這是用innerHTML塞入的H1喔!!</h1>";
  ```

2. createElement
  比較正規的 DOM 元素建立方法，執行效能較差，但安全性高。這種方式新增的 DOM 元素不會替換原有的內容，而是加到原有內容的最後方。刪除內容則可使用 removeChild() 來移除子節點。
  ```js
  var el = document.createElement('h1'); //建立一個尚未綁定到DOM上面的元素
  el.textContent = "這是用createElement建立的H1喔!!"; //雖然尚未綁定，還是可以針對這個元素加東西
  document.body.appendChild(el); //最後把這個元素加到 document 中，才算正式綁定為 DOM 元素
  ```

以上內容如有勘誤，還請不吝告知🙇