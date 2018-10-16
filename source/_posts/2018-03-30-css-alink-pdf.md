---
title: 神奇的 < a > 錨點 - 網頁轉存 PDF 後的畫面跳轉功能
keywords:
  - save as PDF, 網頁轉存 PDF, CSS media print
thumbnailImagePosition: left
date: 2018-03-30 10:25:46
categories:
  - Web Other
tags:
  - media print
  - HTML to PDF
thumbnailImage: https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/2018-03-30-css-alink-pdf.jpg?alt=media&token=10b38439-fd8d-4329-b1c0-9ca49e1e2d38
---

這陣子一直在研究專案的畫面呈現，如同之前[關於 @media print 的二三事..](2018/03/13/css-media-print-setting)提到的，人客希望打包整個網頁變成 PDF..於是開始了 try 到抓狂的實驗路程 ┏(_д_┏)┓))
<!-- excerpt -->
![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/2018-03-30-css-alink-pdf.jpg?alt=media&token=10b38439-fd8d-4329-b1c0-9ca49e1e2d38 "神奇的 < a > 錨點 - 網頁轉存 PDF 後的畫面跳轉功能")

由於專案的方向是要讓使用者可以自行決定要呈現的畫面內容量，無法確定實際會產生的區塊數，因此就有個大大大大大~問題，當轉存成 PDF 後，該怎麼讓使用者依然能方便的找到他們想看的區塊?一想到這點腦子就卡住了，怎麼想都覺得"就用滑鼠跟手指慢慢划，慢慢找吧 哈哈"，然後我就會去領便當了...

於是先把線上呈現的畫面做出來看看感覺，因為要打包整個內容，想到的處理方式是內容全部塞在同一頁，再用導覽選單去做區塊錨點的切換，這樣即使不確定使用者實際要看的內容多寡，也可確保他能快速瀏覽到想要的位置。

殊不知~殊不知啊~~~就這樣被我 try 出了(我不知道的)強大功能!!原來直接用網頁轉存 PDF 後，依然會保有 html 錨點的功能性，只要區塊跟導覽列之間有設好錨點連接，即使存成 PDF 檔依然可以起作用啊!!!這樣一來只要控制好在 media print 模式下導覽列的呈現方式就 no problem 了!忍不住想給 PDF 格式來個節奏拍拍👏👏👏

下面就來個示意版範例:
- 原始碼
<iframe width="100%" height="300" src="//jsfiddle.net/a4wdjnh7/78/embedded/js,html,css/dark/" allowpaymentrequest allowfullscreen="allowfullscreen" frameborder="0"></iframe>

- 另存後的 PDF 檔
<iframe src="2018-03-30-css-alink-pdf.pdf" width="100%" height="500" frameborder="0"></iframe>

這個範例比較特別的是，PDF 列印的尺寸有用 JavaScript 控制，不確定內容長度的情況下，尺寸如果寫死，可能會造成分頁切割時的破版狀況，雖然可以用 CSS 的 `page-break` 屬性來避免區塊被分割，但列印出來的畫面就會不時地出現一片留白..怎麼說服自己都覺得這樣會被嫌棄..
因此才想到如果可以由 JavaScript 幫忙判斷畫面渲染完的總長度，再動態設定 CSS 的 page size。不過這想法因為不知道怎麼用 js 寫 media print 的 CSS 卡很久，直到這篇[感人的發問](https://stackoverflow.com/q/46202655/9330569)解救了我!!

```js
//抓出渲染完後的頁面總高度，另外+50是預留一點空間以免高度的值有小數點
var height = $(document).height() + 50;
//動態在body最後加一段内嵌 CSS，沒想到這方法的我真是好傻好天真!!
$('body').append('<style>@media print{@page{size:210mm '+height+'px;}}</style>');
```

a 連結的錨點功能真得好棒棒!雖然知道 word 轉 PDF 時可產生連結效果..沒想到連一般網頁轉存也通耶~~
終於離打完收工的日子又更靠近了~嗚嗚

以上內容如有勘誤，還請不吝告知🙇