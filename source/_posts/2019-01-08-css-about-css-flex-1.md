---
title: 好加在有 CSS - Flex-上
keywords:
  - CSS, Flex
categories:
  - CSS
tags:
  - CSS
thumbnailImagePosition: left
date: 2019-01-08 09:00:00
thumbnailImage: https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20190108-css-about-css.jpg?alt=media&token=4f09cf23-48dd-4727-8006-9fdbd4f1b638
---

驚覺自己有好一陣子沒在碰樣式了，怕會忘光的恐懼下...來回歸初心撰寫 CSS 紀錄 XD
以目前最常使用的功能來說大概非 Flex 莫屬吧!
<!-- excerpt -->
![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20190108-css-about-css.jpg?alt=media&token=4f09cf23-48dd-4727-8006-9fdbd4f1b638 "好加在有 CSS")

相信現在還是有不少人在使用 float 排版，雖然沒甚麼不好~但要特別處理 float 之後的 clearfix 實在有點煩，有時候會忘記加導致 div 整個跑掉(看到畫面跑掉就覺得煎熬)，有些比較特殊的版面也較難靠它達成。

而 Flex 就是跳脫既有排版框架誕生的產物!其彈性度高到不可思議，難怪名字就叫 flex (中文有收縮、柔性等意思，雖然扯題了)，它可以自由地達成多欄式排版，多欄中可以各自設定自己的位置布局，或是依據某種模式平均分配位置，每一欄的空間可擴張也可縮減，會隨著畫面大小響應式的自動調整，更甚至過去比較難處理的"區塊垂直置中"都可以輕鬆做到喔!

不過現實面還是得考慮，由於該屬性是比較後期才出現(CSS3)，某萬惡瀏覽器早期版是不支援的，不過...真得還有人在用嗎? 😭
![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20190108-css-about-css-flex-1.jpg?alt=media&token=ee93b61f-500a-4eb9-b92d-7bba6d160956 "各瀏覽器對 Flex 的支援度")
上圖截自 [Can I Use](https://caniuse.com/#search=flex) 提供各瀏覽器對 Flex 的支援度一覽，格子呈現紅色就表示不支援該功能，淺綠色表示只支援部分功能，要完全的草綠才是全支援喔!拜託用 IE 的好歹轉用 Edge 吧~官方本身都說不再維護了ㄋㄟ...(碎念)

總之，如果沒在 care 舊版瀏覽器的話!使用 Flex 絕對是讓 CSS 設計更加事半功倍。

## 主容器 (Flex Container) 與子層元素 (Flex Item)
開始使用 Flex 之前，要先了解它的組成結構，**由一個外層的主容器及其內一個以上的子元素所組成**，才能形成一個 Flex 物件。
主容器的掌控性會比較強，可以想成是對整體的操縱布局，子層元素的話當然就是針對自身做調整囉!

Flex 定位的標準會依據**主軸(main axis)**及**交錯軸(cross axis)**而定，首先來看看 MDN 提供的圖解:
![blog image](https://developer.mozilla.org/files/3739/flex_terms.png)
橘底的區塊是 flex container，其內部的三個藍色區塊就是它的 flex item，預設情況下，橫向軸會是主軸，縱向軸是交錯軸，但兩者之間是可以互換的，互換的依據在於排版呈現要以橫式 (row) 還是直式 (column) 顯示。軸線本身有分起始處 (axis start) 及結尾處 (axis end) ，這兩處也是可以互相調換的，這也是 Flex 可以這麼彈性調整位置的關鍵之一。


### For 主容器使用的屬性:
#### 顯示屬性
- `display: flex;`
  最重要的設定，不設後面也不用寫了 XD，表示該區塊的 display 方式要使用 Flex，因此其內部的元素就會被當作是 Flex item 囉!

#### axis 相關屬性
- `flex-direction: row | row-reverse | column | column-reverse;`
  設定主要的排版呈現方式
  - row: 預設值，子層元素由左到右排列(橫式)
  - row-reverse: 子層元素由右到左排列(起始與結尾處互換了)
  - column: 子層元素由上而下排列(直式)
  - column-reverse: 子層元素由下而上排列

![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20190108-css-about-css-flex-2.png?alt=media&token=0737d56a-39a0-4d3f-953d-aed60d1fc5d0 "flex-direction 圖例")

<br>

- `justify-content: flex-start | flex-end | center | space-between | space-around | space-evenly;`
  設定**主軸**方向的對齊
  - flex-start: 預設值，對齊主軸起始處
  - flex-end: 對齊主軸結尾處
  - center: 對齊主軸中間
  - space-between: 兩邊的子層元素會貼齊起始處及結尾處，中間剩餘的元素會平均分配空間
  - space-around: 子層元素周圍留下的距離平均分配空間
  - space-evenly: 子層元素與子層元素之間平均分配空間(不考慮周圍距離)

![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20190108-css-about-css-flex-3.png?alt=media&token=6aae2553-36c5-4afb-930f-203ecf76ca5e "justify-content 圖例")
註: space-between 為了示意兩邊 item 是貼邊的，所以圖例有比較明顯的往邊界移，但正常邊界的距離應該是一致的喔...(沒有畫圖例的天分)

<br>

- `align-items: flex-start | flex-end | center | strecth | baseline;`
  設定**交錯軸**方向的對齊
  - flex-start: 對齊交錯軸起始處
  - flex-end: 對齊交錯軸結尾處
  - center: 對齊交錯軸中間
  - strecth: 預設值，子層元素在交錯軸的方向延伸與主容器同高度
  - baseline: 以子層元素的文字基線為標準對齊

![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20190108-css-about-css-flex-4.png?alt=media&token=232b5ae6-60a2-4d6d-9a09-8c108925771d "align-items 圖例")

#### wrap 相關屬性
wrap 設定跟 flex item 排版的行數有關，預設模式是 nowrap 的情況下，如果子層元素寬度設死或是內容超過容器的寬度，就會出現破版的狀況。如果有設定要 wrap，則原本超出容器的範圍會自動往下一行擺放，變成多行的排列。於是乎就會有 wrap 的屬性設定以及多行排列的方式設定囉!

- `flex-wrap: nowrap | wrap | wrap-reverse;`
  設定子層元素超過容器大小是否要換行排列
  - nowrap: 預設值，不換行
  - wrap: 子層元素超過容器寬度會換行
  - wrap-reverse: 會換行，且上下行及對齊位置都顛倒

![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20190108-css-about-css-flex-5.png?alt=media&token=e4290e83-4bb3-46fc-82dc-d58a124c4c2e "flex-wrap 圖例")

<br>

- `align-content: flex-start | flex-end | center | space-between | space-around | stretch;`
  每一行 flex line 與交錯軸的對齊設定
  - flex-start: 對齊交錯軸起始處
  - flex-end: 對齊交錯軸結尾處
  - center: 對齊交錯軸中間
  - space-between: 兩邊的 flex line 會貼齊起始處及結尾處，中間剩餘的 flex line 會平均分配空間
  - space-around: flex line 周圍留下的距離平均分配空間
  - strecth: 預設值，flex line 的 item 在交錯軸的方向延伸與主容器同高度

![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20190108-css-about-css-flex-6.png?alt=media&token=9e149625-a419-4f51-bf0e-ac44dc3c6d84 "align-content 圖例")

#### flex-direction 與 flex-wrap 的 shorthand
- `flex-flow`
  就是一個方便一次設定 direction 及 wrap 的屬性，寫法會像這樣: `flex-flow: row wrap;`

欸....才差不多寫完 flex container 的功能就覺得篇幅好長，看來只好把 flex item 留到下回了~(藉口)

以上內容如有勘誤，還請不吝告知🙇