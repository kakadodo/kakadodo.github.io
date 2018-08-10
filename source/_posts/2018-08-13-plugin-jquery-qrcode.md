---
title: 來做個 QR Code 產生器吧! jQuery.qrcode
keywords:
  - qrcode plugin, jQuery, javascript
categories:
  - javascript plugin
tags:
  - jQuery
  - plugin
thumbnailImagePosition: left
date: 2018-08-13 08:38:34
thumbnailImage: https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/2018-08-13-plugin-jquery-qrcode.jpg?alt=media&token=50234ac7-e9f1-4b48-9720-5f0a81cf7a39
---

因應公司出現的奇怪需求...這次的任務是要做出 QR Code 產生器，本來一臉愁雲慘霧的自己藉由了估狗大神的幫助，瞬間哀愁變成喜悅啊~~~
感謝另一個大神 *jeromeetienne* 做出這個無敵簡單操作的 jQuery.qrcode 套件~!!
<!-- excerpt -->

![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/2018-08-13-plugin-jquery-qrcode.jpg?alt=media&token=50234ac7-e9f1-4b48-9720-5f0a81cf7a39 "來做個 QR Code 產生器吧! jQuery.qrcode")
<small style="display: block; text-align: center;"><這次的文章附圖被我做得好像網拍頁面的縮圖XDD 無腦產生></small>

會需要做 QR Code 產生器的原因在於要讓不同的使用者可以取得專屬於他的 QR Code 連結，而且最重要的一點是產生這個東西需要在無網路的環境 ( º﹃º )
(內心大概吶喊了上百次: NO~~~~為何又是無網路!!!大家還活在 21 世紀嗎?!)

所以之前提到的 phonegap APP 又要派上用場了!無網路界的前端霸主非他莫屬!在 phonegap 提供的環境下，用熟悉的 html、css 跟 javascript 來寫即可~有興趣的可以參考之前寫的這篇 [不用 CLI 也能製作 Andriod APP - Adobe PhoneGap](https://kakadodo.github.io/2018/05/22/adobe-phonegap/)

基於上述產生 QR Code 的條件還算單純，只要套件可以滿足產生特定網址這件事就 OK 了!所以我找到了這個非常親民的 [jQuery.qrcode.js](http://jeromeetienne.github.io/jquery-qrcode/)

雖然大神已經有寫操作步驟了~但還是用自己理解的方式來說明怎麼使用:

1. 第一步，於你的頁面載入 jQuery.qrcode.js，因為這支是用 jQuery 寫的，所以也別忘記載入 jQuery 啊~(自己用3.x版本還是可運行)
  ```js
    <script type="text/javascript" src="jquery.qrcode.min.js"></script>
  ```
1. html 建立一個 div 來放 qrcode (div 會是 qrcode 的外層元素)
  ```js
    <div id="qrcode"></div>
  ```
1. qrcode 有兩種產生的格式，一個是用 html 的 table 去拼出圖案，另一個是用 canvas 畫出來。
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
然後，QR Code 就出來了 END 😆😆😆😆😆😆😆😆😆😆

這款套件說簡單真得很簡單~簡單到讓我覺得這樣真的好嗎? 套件的 github 也只列出簡易步驟，沒有其他的詳細設定...其實這款也是參照另一款原生 javascript 版本來改寫的，有特地跑去看原本的是不是有比較詳細的說明，但結果是更精簡XD 連步驟的懶得寫了。
但確實是有滿足我的需求啦~所以就開心的接受並使用它了!!

附上線上範例檔，有 canvas 跟 table 兩種顯示...覺得用 table 來生成有點厲害。
<iframe width="100%" height="300" src="//jsfiddle.net/dLqjr0nz/6/embedded/js,html,result/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

以上內容如有勘誤，還請不吝告知🙇