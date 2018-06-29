---
title: The F2E - 前端修練精神時光屋挑戰系列 - Week 4. Product Gallery
keywords:
  - css, grid
categories:
  - the F2E challenge
thumbnailImagePosition: left
date: 2018-07-2 08:49:11
thumbnailImage: https://kakadodo.github.io/theF2EChallange/img/week4.jpg
---

這週設計稿是一個逼死人的概念XDDDD
<!-- excerpt -->

![blog image](https://kakadodo.github.io/theF2EChallange/img/week4.jpg "Week 4. Product Gallery")

看到這週的設計稿一度定格...多麼隨興的排列方式，還以為在看雜誌的 PDF 檔XD
乍看一下想到的排版方式是用 float + position 來做
不過老師卻在這時候推坑 CSS grid，好像是個好機會來學新東西 🙋🙋🙋
設計稿: <http://bit.ly/2lxMFQC>

### 使用者故事:
請設計產品品項列表，設計時請在瀏覽器兼容性範圍內設計出讓人耳目一新的 UI 設計。

### 運用技術:
- Pug (html模板語言)
- SCSS (css預處理語言)
- CSS grid

### 挑戰心得:
之前沒有接觸過 grid，秉著前端就是要對新技術見怪不怪的吸收精神，花了點時間學習 grid 的使用方式，下面提供兩個教學連結:
- [CSS GRID - by Wes Bos](https://cssgrid.io/)
  大推 Wes Bos 的教學影片，講解清楚且 code 寫得超乾淨!!重點是課程免費!不看太對不起自己了~~
- [GRID GARDEN](http://cssgridgarden.com/)
  用玩遊戲的方式來了解 grid 的運作原理!超有趣XD 它的另一款 flexbox 也很好玩!!

雖然看影片跟玩遊戲時都滿順的~觀念好理解，用法也算簡單..不過回頭看設計稿，對於要在甚麼樣的區塊使用 grid 會感到困惑...
grid 雖然彈性很大，但基本上是格線的概念，設計稿雖然有照格線系統去排列，實際要去切好像不是那麼簡單就可以解決的 :(
如果照著設計稿設定的格子欄位去規劃，是可以一個一個刻到指定的位置沒錯..但勢必會寫死畫面~

最後決定的做法是，先把畫面元素區塊化，格線就用在排列這幾個大區塊，區塊中的各個元素再使用絕對定位去瞧位子XD
雖然 CSS 一樣會寫的落落長，但每個區塊其實元素大同小異，所以複製貼上改一改滿省事的。

但做下來的缺點就是無法自動 RWD，螢幕去 resize 時會讓區塊重疊到..除非有另外針對尺寸做 RWD 設定。教學有提出 grid 的強大性可讓 RWD 變得很簡單~甚至根本不需要用到 media query，但我好像還無法領悟要如何以現在的排版去做到這件事，整個版切下來反而是在練習絕對定位 哈哈

做完的結論是，grid 好用嗎?

**"懂得怎麼用的話，應該可以稱霸排版界"** 😆

現階段還是會 prefer flexbox 啦~~~~(逃避

作品網址: <https://kakadodo.github.io/theF2EChallange/product-gallery.html>


以上內容如有勘誤，還請不吝告知🙇
