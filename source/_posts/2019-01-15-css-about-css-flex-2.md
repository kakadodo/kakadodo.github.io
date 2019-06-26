---
title: 好加在有 CSS - Flex-下
keywords:
  - CSS, Flex
categories:
  - CSS
tags:
  - CSS
thumbnailImagePosition: left
date: 2019-01-15 09:00:00
thumbnailImage: https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20190108-css-about-css.jpg?alt=media&token=4f09cf23-48dd-4727-8006-9fdbd4f1b638
---

嗯，同一個主題隔一個禮拜才寫好像對我這種金魚不太適合...
如果範例圖看起來跟上一篇不太一樣感覺的話請見諒 XD
<!-- excerpt -->
![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20190108-css-about-css.jpg?alt=media&token=4f09cf23-48dd-4727-8006-9fdbd4f1b638 "好加在有 CSS")

上篇提到的 Flex Container 可以看出其屬性都是針對整體版面的布局做設定，大部分排版都可以輕鬆靠它達成，但總是會有那麼一個"有時候"，會需要排出較特殊的版面，Flex Item 就有很重要的戲份囉!

# For 子層元素使用的屬性:

## 子層元素在父容器空間中的彈性調整相關屬性
- `flex-grow: 0 | 正整數 ;`
  設定 flex item 可以分配到剩餘空間的比例，預設值為 0，表示不會因為父容器中還有剩餘空間就變大，如果有設定 0 之外的**正整數**數值，就會依照該值的比例去分配空間。
  **比例計算方式: 自身設定的比例/全部元素設定的比例總數*剩餘空間大小**

![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20190115-css-about-css-flex-7.png?alt=media&token=c7c8e540-553f-47e3-a722-24e3fed1016e "flex-grow 圖例")
上圖第三個例子分別設定 flex item 有不同的 flex-grow 比例，可看出 item 3 因為設定 0 所以大小不會變，而 item 1 與 item 2 則將剩餘的空間依照 2:1 的比例分別加到自己身上。


- `flex-shrink: 0 | 正整數 ;`
  設定 flex item 超出父容器時要不要自行瘦身 😂，預設值為 1，表示有超出父容器空間的話，自己的大小會依照比例縮減。如果設定為 0 就不會自行縮減喔!也可設定其他正整數，原理同 flex-grow 一樣，會將原本超出的空間大小，依據子層元素全部的比例總數以及自身的比例決定各自縮減的量。

![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20190115-css-about-css-flex-8.png?alt=media&token=6cb07de2-3e57-4d47-82b6-01a89907ef75 "flex-shrink 圖例")
上圖第三個例子分別設定 flex item 有不同的 flex-shrink 比例，可看出 item 3 因為設定 0 所以大小不會變，而 item 1 與 item 2 則依照超出空間的 2:1 比例分別縮減自己。


- `flex-basic: auto | 一般寬高設定單位 ;`
  設定 flex item 的"基本大小"，預設值為 auto，大小針對寬或高會根據父容器的主軸方向為何， 主軸為 row 的話是寬度， column 則是高度。該屬性可以當成是針對 flex 物件的寬高設定，因為當父容器是 display: flex 時，子層元素的 flex-basic 權重就會比原本的 width / height 屬性還高!建議元素為 flex-item 時都使用 flex-basic 這個屬性來設定寬高，可以省略額外修改 width / height 的功夫。
  
![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20190115-css-about-css-flex-9.png?alt=media&token=78f2ca47-4e28-4118-a05b-3f741af8916e "flex-basic 圖例")  


- `flex: 0 | 1 | auto ;`
  flex-grow、flex-shrink 及 flex-basic 的 shorthand，設定有先後順序之差喔!


## 子層元素自身的對齊方式
可以改變各個子層元素在容器中的排列方式，整個超強大的功能啊~~用 float 這樣排會哭吧...

- `align-self: auto | flex-start | flex-end | center | strecth | baseline;`
  設定子層各自針對**交錯軸**方向的對齊
  - auto: 預設值，會跟隨父層設定
  - flex-start: 對齊交錯軸起始處
  - flex-end: 對齊交錯軸結尾處
  - center: 對齊交錯軸中間
  - baseline: 以文字基線為標準對齊
  - strecth: 在交錯軸的方向延伸與主容器同高度

![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20190115-css-about-css-flex-10.png?alt=media&token=89e355d3-6579-4896-b17e-dceb76b243e4 "align-self 圖例")


## 子層元素的排序
非常方便的功能，尤其版面要因應 RWD 調整時靠它很輕鬆就可以改變元素的排序位置!

- `order: 0 | Number ;`
  預設值是 0，都沒有特地設值或 item 之間數值相同的話會依據 html 正常的流動順序排列，如果每個 item 的 order 值都不同時就會改變元素之間的順序位置喔! order 可以設定負值，總之數值越小排列越前面，數值越大就反之。

![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20190115-css-about-css-flex-11.png?alt=media&token=05ac3d63-0dc6-4134-bd30-9207e5dcf396 "order 圖例")


## 與 flex 的神搭配 - margin
雖然 flex 提供很多對齊方式，不過這些對齊通常是在某種"定律"之下，可能彼此距離相等或者周圍的邊距相等之類的，如果想排出其中一欄離大家很遠，或是彼此之間距離不一的版型，其實可以依靠**margin**這個屬性來幫忙。雖然元素變成 flex 性質的物件，但依然保有 box-model 的特性喔!所以一般 margin 使用方式用在它身上也是可以通的。其中特別的是，如果元素設定成 `margin-[left/right]:auto;` 的話，該元素就會往反方向推擠直到父容器邊距。

![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20190115-css-about-css-flex-12.png?alt=media&token=4afbeeaa-eb93-4f9b-845d-2815fec567e9 "flex 搭配 margin auto")


以上內容如有勘誤，還請不吝告知🙇