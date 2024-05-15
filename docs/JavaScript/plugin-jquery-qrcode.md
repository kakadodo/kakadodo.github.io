---
title: 來做個 QR Code 產生器吧! jQuery.qrcode
categories: JavaScript
tags:
  - jQuery
  - plugin
date: 2018-08-13
thumbnail: https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/2018-08-13-plugin-jquery-qrcode.jpg?alt=media&token=50234ac7-e9f1-4b48-9720-5f0a81cf7a39
---

# {{ $frontmatter.title }}

![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/2018-08-13-plugin-jquery-qrcode.jpg?alt=media&token=50234ac7-e9f1-4b48-9720-5f0a81cf7a39 "來做個 QR Code 產生器吧! jQuery.qrcode")

套件官網: [jQuery.qrcode.js](http://jeromeetienne.github.io/jquery-qrcode/)

## 使用方式
1. 載入 jQuery.qrcode.js，因為這支是用 jQuery 寫的，所以也別忘記載入 jQuery (自己用 3.x 版本還是可運行)
```js
  <script type="text/javascript" src="jquery.qrcode.min.js"></script>
```
2. 建立一個來放 qrcode 的 div 容器 (div 會是 qrcode 的外層元素)
```js
  <div id="qrcode"></div>
```
3. qrcode 有兩種產生的格式，一個是用 html 的 table 去拼出圖案，另一個是用 canvas 畫出來。
```js
// canvas
$('#qrcode').qrcode({
  width: 64,
  height: 64,
  text: 'https://kakadodo.github.io/'
});
// table
$('#qrcode').qrcode({
  render: "table",
  text: "https://kakadodo.github.io/"
});
```
然後，QR Code 就出來了 END 😆

附上線上範例檔，有 canvas 跟 table 兩種顯示...覺得用 table 來生成有點厲害。
<iframe width="100%" height="300" src="//jsfiddle.net/dLqjr0nz/6/embedded/js,html,result/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>