---
title: 關於 @media print 的二三事..
keywords:
  - CSS, media print
thumbnailImagePosition: left
autoThumbnailImage: 'yes'
metaAlignment: center
date: 2018-03-13 10:52:00
categories:
  - CSS
tags:
  - media print
thumbnailImage: https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20180313-css-media-print-setting.jpg?alt=media&token=eb3e2b6e-d75e-476e-9e34-c065c48c6047
---

這次來記錄一下對我而言比較陌生的 @media print 功能，因為 "還沒機會用到" 呀~~
@media 由於要做響應式 web 的關係很常使用，但平常習慣簡寫，所以一時之間還真沒想到 CSS 有針對 print 的媒體設定 🤦
<!-- excerpt -->
![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20180313-css-media-print-setting.jpg?alt=media&token=eb3e2b6e-d75e-476e-9e34-c065c48c6047 "關於 @media print 的二三事..")

先來點題外的相關話:(總是忍不住想寫與標題不相關的內容😆)
會提到 print，主要來自公司最近的專案，企劃很奇葩的想要有功能是可以客製化選取多筆文章，再打包成一份 PDF 檔讓人下載..
於是乎，問題來了~究竟該怎麼做才能達成多筆文章轉成一份跟網頁不同規格的 PDF 咧?

一開始方向在想要怎麼用 javascript 產生出 PDF 文件，所以跑去跟 Stack Overflow 打交道，查詢 + 測試下來的可行方式為:
- 使用 [html2canvas](http://html2canvas.hertzen.com/documentation/) 將網頁內容轉成 Canvas 畫布(可作為圖像)
- 使用 [jsPDF](https://rawgit.com/MrRio/jsPDF/master/docs/index.html) 建立一個空白 PDF，並將頁面的 Canvas 畫布轉為圖片格式置入，輸出即可下載

jsPDF 滿強大的!語法直觀、支援分頁功能，chrome 及 firefox 都可正常使用，萬惡 IE 格式會跑掉( but who care? )
只是專案的文章內容無法掌握它的顯示長度以及存成圖片格式來置入，畫質有點難控制。

爬了大多文章都是介紹這些插件的運用，只好換個角度去思考，有沒有甚麼方式可以將網頁存成 PDF，突然腦閃想到 "靠~阿平常線上付款會用到的功能我怎麼就給忘了?!" 用瀏覽器的轉存 PDF 功能就好啦~🤓🤓🤓
不過目前只有 chrome 有內建另存 PDF 的模式，其他瀏覽器需要本身電腦有安裝可轉存 PDF 的工具(例: Adobe Acrobat..)，看在 chrome 這麼普及、Adobe 軟體這麼多人有的份上~就決定以 "貼心提示: 請使用 chrome 瀏覽器操作" 結束這回合!

---

# @media print 相關設定

## 兩種撰寫 @media print 的方式:
  1. CSS 檔分為 screen 及 print 兩種格式。
    ```html
    <link href="screen.css" media="screen">
    <link href="print.css" media="print">
    ```
  2. CSS 統一寫一起，屬於列印模式下的設定需用 @media print{} 包住。
    ```css
    body{
      background: #49c;
    }
    @media print{
      body{
        background: #fff;
      }
    }
    ```

## 列印模式下的頁面配置( @page ):
@page 是列印模式下對頁面配置的特殊屬性，主要可設定頁面的 size, margin , orphans 和 widow。
  - size 可直接指定寬度與高度(搭配單位 mm 或 cm 皆可)、或是通用尺寸( A4、A5.. )，此外可設定頁面的呈現方向( portrait / landscape )
  - margin 就是一般頁面的邊距(常用 word 的人應該不陌生 :D )
  - orphans 和 widow 這印刷術語取名滿妙..， orphans 是指頁面最後一個段落的行數、widow 則是頁面第一個段落的行數，初始值都是2，表示限制頁面頂部及底部的段落不能只顯示一行就被分頁。
```css
@page{
  size: A4 portrait;
  margin: 0.5cm;
  orphans:4;
  widows:2;
}
```

## 元素分頁的斷點設定:
元素後要被分頁嗎? page-break-after : auto | always | avoid | left | right
元素前要被分頁嗎? page-break-before : auto | always | avoid | left | right
元素本身要被分頁嗎? page-break-inside : auto | avoid
這三個屬性**超重要**!!!網頁內容無法預估長度的情況下，很難完美的呈現頁面布局，盡可能做到的就是避免顯示的元素被分頁切割。
下面是收集來的大神設定😋
```css
h1, h2, h3, h4, h5, h6 {
  page-break-after:avoid;
  page-break-inside:avoid
}
h1+p, h2+p, h3+p {
  page-break-before: avoid;
}
a {
  page-break-inside:avoid
}
img{
  page-break-after: avoid;
  page-break-inside: avoid;
}
table, blockquote{
  page-break-inside: avoid;
}
ul, ol, dl {
  page-break-before:avoid;
}
/* 如架構本身用一組一組的 DIV 包住，也可強制設定每組 DIV 會各自切成一頁 */
div.pageBlock{
  page-break-before: always;
}
```

## 其他通用設定:
- 字體大小的單位建議改成 pt 以符合印刷設定
- 非必要列印的內容( nav、 video.. )就設 `display: none`
- img 寬度設為 `max-width: 100%`
- 容器寬度改為 100%、取消浮動、margin: 0
- 顯示 a 連結的網址於畫面
- 如屬性設定後沒反應，表示樣式的優先權不夠，那就招喚 !important 出場吧
```css
header nav, footer, video, audio, object, embed {
  display: none;
}
body{
  width: 100%;
  margin: 0;
  float: none;
  line-height: 1.5;
  font-size: 12pt;
}
img {
  max-width: 100%;
}
a:link, a:visited, a {
  background: transparent;
  color: #222;
  font-weight: bold;
  text-decoration: underline;
  text-align: left;
  word-wrap: break-word; /*避免網址過長超出頁面*/
}
a[href^="http://"]:after, a[href^="https://"]:after {
  content: " (" attr(href) ") ";
}
thead{
  display: table-header-group; /* 表格即使分頁也會顯示表頭 */
}
```

## 為了列印 PDF 的特殊設定:
因 chrome 列印模式下會清除部分樣式讓畫面變簡潔，因此背景顏色及背景圖片都會取消顯示，雖然在列印介面下可以手動勾選是否顯示背景圖形，但前端就是要想辦法滿足人客的惰性..因此找到了可以強制設定列印模式時依然顯示背景圖的屬性 σ`∀´)σ
```css
body{
  -webkit-print-color-adjust: exact;
  background-image: url('...') !important; /*如果背景圖沒顯示請加必殺技 !important*/
}
```

---

雖然無法讓想要的內容全部塞在同一頁，但利用 page-break 至少可以限制分頁的斷點判斷~整體閱讀起來也比較舒服了!!
以上內容如有勘誤，還請不吝告知🙇