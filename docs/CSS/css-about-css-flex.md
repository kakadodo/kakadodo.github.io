---
title: CSS - Flex
categories: CSS
tags:
  - CSS
date: 2019-01-08
thumbnail: https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20190108-css-about-css.jpg?alt=media&token=e3c7ccc9-7207-4705-a791-c9ab07627e9b
---

# {{ $frontmatter.title }}

![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20190108-css-about-css.jpg?alt=media&token=e3c7ccc9-7207-4705-a791-c9ab07627e9b "好加在有 CSS")

Flex 可以自由地達成多欄式排版，多欄中可以各自設定自己的位置布局，或是依據某種模式平均分配位置，每一欄的空間可擴張也可縮減，會隨著畫面大小響應式的自動調整，以往比較難處理的"區塊垂直置中"都可以輕鬆做到喔!

## 主容器 (Flex Container) 與子層元素 (Flex Item)
開始使用 Flex 之前，要先了解它的組成結構，**由一個外層的主容器及其內一個以上的子元素所組成**，才能形成一個 Flex 物件。
主容器的掌控性會比較強，可以想成是對整體的操縱布局，子層元素的話當然就是針對自身做調整囉!

Flex 定位的標準會依據**主軸(main axis)**及**交錯軸(cross axis)**而定，首先來看看 MDN 提供的圖解:

![blog image](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox/flex_terms.png)

黃底的區塊是 flex container，其內部的三個藍色區塊就是它的 flex item，預設情況下，橫向軸會是主軸，縱向軸是交錯軸，但兩者之間是可以互換的，互換的依據在於排版呈現要以橫式 (row) 還是直式 (column) 顯示。軸線本身有分起始處 (axis start) 及結尾處 (axis end) ，這兩處也是可以互相調換的，這也是 Flex 可以這麼彈性調整位置的關鍵之一。

## For 主容器使用的屬性:
### 顯示屬性
- `display: flex;`
  表示該區塊的 display 方式要使用 Flex，因此其內部的元素就會被當作是 Flex item 囉!


### axis 相關屬性
- `flex-direction: row | row-reverse | column | column-reverse;`
  設定主要的排版呈現方式
  - row: 預設值，子層元素由左到右排列(橫式)
  - row-reverse: 子層元素由右到左排列(起始與結尾處互換了)
  - column: 子層元素由上而下排列(直式)
  - column-reverse: 子層元素由下而上排列

![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20190108-css-about-css-flex-2.png?alt=media&token=0737d56a-39a0-4d3f-953d-aed60d1fc5d0 "flex-direction 圖例")

- `justify-content: flex-start | flex-end | center | space-between | space-around | space-evenly;`
  設定**主軸**方向的對齊
  - flex-start: 預設值，對齊主軸起始處
  - flex-end: 對齊主軸結尾處
  - center: 對齊主軸中間
  - space-between: 兩邊的子層元素會貼齊起始處及結尾處，中間剩餘的元素會平均分配空間
  - space-around: 子層元素周圍留下的距離平均分配空間
  - space-evenly: 子層元素與子層元素之間平均分配空間(不考慮周圍距離)

![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20190108-css-about-css-flex-3.png?alt=media&token=6aae2553-36c5-4afb-930f-203ecf76ca5e "justify-content 圖例")

- `align-items: flex-start | flex-end | center | strecth | baseline;`
  設定**交錯軸**方向的對齊
  - flex-start: 對齊交錯軸起始處
  - flex-end: 對齊交錯軸結尾處
  - center: 對齊交錯軸中間
  - strecth: 預設值，子層元素在交錯軸的方向延伸與主容器同高度
  - baseline: 以子層元素的文字基線為標準對齊

![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20190108-css-about-css-flex-4.png?alt=media&token=232b5ae6-60a2-4d6d-9a09-8c108925771d "align-items 圖例")


### wrap 相關屬性
wrap 設定跟 flex item 排版的行數有關，預設模式是 nowrap 的情況下，如果子層元素寬度設死或是內容超過容器的寬度，就會出現破版的狀況。如果有設定要 wrap，則原本超出容器的範圍會自動往下一行擺放，變成多行的排列。於是乎就會有 wrap 的屬性設定以及多行排列的方式設定囉!

- `flex-wrap: nowrap | wrap | wrap-reverse;`
  設定子層元素超過容器大小是否要換行排列
  - nowrap: 預設值，不換行
  - wrap: 子層元素超過容器寬度會換行
  - wrap-reverse: 會換行，且上下行及對齊位置都顛倒

![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20190108-css-about-css-flex-5.png?alt=media&token=e4290e83-4bb3-46fc-82dc-d58a124c4c2e "flex-wrap 圖例")

- `align-content: flex-start | flex-end | center | space-between | space-around | stretch;`
  每一行 flex line 與交錯軸的對齊設定
  - flex-start: 對齊交錯軸起始處
  - flex-end: 對齊交錯軸結尾處
  - center: 對齊交錯軸中間
  - space-between: 兩邊的 flex line 會貼齊起始處及結尾處，中間剩餘的 flex line 會平均分配空間
  - space-around: flex line 周圍留下的距離平均分配空間
  - strecth: 預設值，flex line 的 item 在交錯軸的方向延伸與主容器同高度

![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20190108-css-about-css-flex-6.png?alt=media&token=9e149625-a419-4f51-bf0e-ac44dc3c6d84 "align-content 圖例")

### flex-direction 與 flex-wrap 的 shorthand
- `flex-flow`
  就是一個方便一次設定 direction 及 wrap 的屬性，寫法會像這樣: `flex-flow: row wrap;`


## For 子層元素使用的屬性:

### 子層元素在父容器空間中的彈性調整相關屬性
- `flex-grow: 0 | 正整數 ;`
  設定 flex item 可以分配到剩餘空間的比例，預設值為 0，表示不會因為父容器中還有剩餘空間就變大，如果有設定 0 之外的**正整數**數值，就會依照該值的比例去分配空間。
  **比例計算方式: 自身設定的比例/全部元素設定的比例總數*剩餘空間大小**

![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20190115-css-about-css-flex-7.png?alt=media&token=c7c8e540-553f-47e3-a722-24e3fed1016e "flex-grow 圖例")
上圖第三個例子分別設定 flex item 有不同的 flex-grow 比例，可看出 item 3 因為設定 0 所以大小不會變，而 item 1 與 item 2 則將剩餘的空間依照 2:1 的比例分別加到自己身上。

- `flex-shrink: 0 | 正整數 ;`
  設定 flex item 超出父容器時要不要自行瘦身，預設值為 1，表示有超出父容器空間的話，自己的大小會依照比例縮減。如果設定為 0 就不會自行縮減喔!也可設定其他正整數，原理同 flex-grow 一樣，會將原本超出的空間大小，依據子層元素全部的比例總數以及自身的比例決定各自縮減的量。

![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20190115-css-about-css-flex-8.png?alt=media&token=6cb07de2-3e57-4d47-82b6-01a89907ef75 "flex-shrink 圖例")
上圖第三個例子分別設定 flex item 有不同的 flex-shrink 比例，可看出 item 3 因為設定 0 所以大小不會變，而 item 1 與 item 2 則依照超出空間的 2:1 比例分別縮減自己。

- `flex-basic: auto | 一般寬高設定單位 ;`
  設定 flex item 的"基本大小"，預設值為 auto，大小針對寬或高會根據父容器的主軸方向為何， 主軸為 row 的話是寬度， column 則是高度。該屬性可以當成是針對 flex 物件的寬高設定，因為當父容器是 display: flex 時，子層元素的 flex-basic 權重就會比原本的 width / height 屬性還高!建議元素為 flex-item 時都使用 flex-basic 這個屬性來設定寬高，可以省略額外修改 width / height 的功夫。

![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20190115-css-about-css-flex-9.png?alt=media&token=78f2ca47-4e28-4118-a05b-3f741af8916e "flex-basic 圖例")  

- `flex: 0 | 1 | auto ;`
  flex-grow、flex-shrink 及 flex-basic 的 shorthand，設定有先後順序之差喔!

### 子層元素自身的對齊方式
可以改變各個子層元素在容器中的排列方式。

- `align-self: auto | flex-start | flex-end | center | strecth | baseline;`
  設定子層各自針對**交錯軸**方向的對齊
  - auto: 預設值，會跟隨父層設定
  - flex-start: 對齊交錯軸起始處
  - flex-end: 對齊交錯軸結尾處
  - center: 對齊交錯軸中間
  - baseline: 以文字基線為標準對齊
  - strecth: 在交錯軸的方向延伸與主容器同高度

![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20190115-css-about-css-flex-10.png?alt=media&token=89e355d3-6579-4896-b17e-dceb76b243e4 "align-self 圖例")

### 子層元素的排序
非常方便的功能，尤其版面要因應 RWD 調整時靠它很輕鬆就可以改變元素的排序位置!

- `order: 0 | Number ;`
  預設值是 0，都沒有特地設值或 item 之間數值相同的話會依據 html 正常的流動順序排列，如果每個 item 的 order 值都不同時就會改變元素之間的順序位置喔! order 可以設定負值，總之數值越小排列越前面，數值越大就反之。

![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20190115-css-about-css-flex-11.png?alt=media&token=05ac3d63-0dc6-4134-bd30-9207e5dcf396 "order 圖例")

### 與 flex 的神搭配 - margin
雖然 flex 提供很多對齊方式，不過這些對齊通常是在某種"定律"之下，可能彼此距離相等或者周圍的邊距相等之類的，如果想排出其中一欄離大家很遠，或是彼此之間距離不一的版型，其實可以依靠**margin**這個屬性來幫忙。雖然元素變成 flex 性質的物件，但依然保有 box-model 的特性喔!所以一般 margin 使用方式用在它身上也是可以通的。其中特別的是，如果元素設定成 `margin-[left/right]:auto;` 的話，該元素就會往反方向推擠直到父容器邊距。

![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20190115-css-about-css-flex-12.png?alt=media&token=4afbeeaa-eb93-4f9b-845d-2815fec567e9 "flex 搭配 margin auto")