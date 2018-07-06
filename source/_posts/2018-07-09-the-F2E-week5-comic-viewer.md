---
title: The F2E - 前端修練精神時光屋挑戰系列 - Week 5. Comic Viewer
keywords:
  - viewer, 閱讀器, slider
categories:
  - the F2E challenge
thumbnailImagePosition: left
date: 2018-07-09 08:49:11
thumbnailImage: https://kakadodo.github.io/theF2EChallange/img/week5.jpg
---

這次主題是宅宅如我的最愛之一!!身為一個資深宅女不看線上漫畫怎麼說的過去呢?!
以往都是當使用者，這次卻是當開發者...以後看漫畫要用感恩的心去使用~~閱讀器要做的好用不簡單呀! 😛
<!-- excerpt -->

![blog image](https://kakadodo.github.io/theF2EChallange/img/week5.jpg "Week 5. Comic Viewer")

設計稿: <http://bit.ly/2KBBjWF>

### 使用者故事:
1. 請設計出易於閱讀的 web 漫畫瀏覽介面
2. 需考量日夜間瀏覽模式
3. 需要有多種瀏覽方式，頁碼、左右觸擊便可切換上下頁
4. B2B商業模式，漫畫網站本身不向使用者收費，轉以向欲曝光的廠商收取 AD 廣告費，故需設計廣告版位，以及前端顯示方式，以不過度影響使用者閱讀為前提來設計。

### 運用技術:
- Pug (html模板語言)
- SCSS (css預處理語言)
- jQuery

### 挑戰心得:
本來想說如果有找到相關的 api 就來做做看完整的網站...但找了很久都沒找到可以用的 + 對於怎麼開漫畫的 api 沒概念，這次的重點就放在閱讀器的功能呈現!

閱讀器會需要以下幾種功能:
- 頁面可以用下拉選單切換
- 頁面有上一頁與下一頁的按鈕切換
- 下方會有全部頁面的導覽縮圖，點擊可以直接跳往該頁，導覽列有滾軸，滾軸會隨著頁面變更而滾動到相對位置
- 閱讀器可以做日夜顯示的樣式切換

把功能列成清單之後，其實就有概念要記錄哪些參數，跟可能會共用到的函數有哪些。
需要紀錄的參數有 **當前頁數** 以及 **總頁數**，每個功能的目的其實就是要顯示變更的頁面，所以這個功能就可以拉出來另外寫再讓大家呼叫即可。剩下就是各個功能自己執行的步驟啦!

分享一下日夜顯示切換的作法，首先切換的按鈕是用 label + checkbox 去達成，checkbox 設定隱藏後，對 label 設定樣式，再讓 label 去對應到該 checkbox，就可以做出客製化的切換按鈕。jQuery 則是監聽 checkbox 點擊後，會在當前頁面的最外層容器加上一個特定 class，css 再針對這個 class 的子層去修改樣式，就可以做出頁面的樣式切換啦!!
```html
<!--html-->
<div class="container"> //最外層的 container
  <input type="checkbox" id="ckb" style="display:none">
  <label for="ckb">日夜切換按鈕</label>
</div>
```

```scss
//scss
#ckb:checked + label{
  //寫checkbox被點擊後，後面的 label 要改變的狀態樣式...
}
.dark.container{
  //當 container 有 .dark 這個 class 時，裡面的子元素要改變的樣式設定
  background-color: #000;
}
```

```js
//jQuery 只做切換 class 這件事，其他就交給 css 處理啦!
$('#ckb').click(function(){
  $('.container').toogleClass('dark');
});
```

另外就是最下方的導覽列縮圖，因為寬度限制的關係，縮圖的數量太多勢必會超出寬度，所以會有滾軸這件事的產生~這樣要做出對應當前頁面的滾軸位置就要經過一番計算..偏偏我對這種計算超不擅長 😭😭😭

一開始做完的結果是，滾軸會隨著頁面切換而改變位置沒錯，但是是很不自然的改變..當前頁面的縮圖永遠會在外層容器的最右邊..這樣使用者體驗一定差到爆啊!!

好加在這周的直播主 Alex 有在最後講到這塊的作法!!真心感謝他的無私貢獻~立馬照他提供的作法來修正導覽列滾動~~~現在頁面切換後，當前頁面的縮圖就都會在中間顯示囉!!(灑花
```html
<!-- 導覽列縮圖的架構如下，li會做成橫向排列，ul會設定overflow-x:auto -->
<ul class="navWrapper">
  <li class="nav-list"><img/></li>
  <li class="nav-list"><img/></li>
  <li class="nav-list"><img/></li>
  ...
</ul>
```
```js
//假設切換到第5頁，外層 ul 要滾動的距離就是..
$('navWrapper')[0].scrollLeft = $('.nav-list')[4].offsetLeft - $('navWrapper')[0].offsetLeft - $('navWrapper')[0].offsetWidth / 2 + $('.nav-list')[4].offsetWidth / 2;
//要scroll的距離 = 縮圖離視窗的距離 - 外層容器離視窗的距離 - 外層容器寬度的一半 + 縮圖自身寬度的一半
```
<附上圖解說明，可以觀察滾軸的位置變化>
![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/2018-07-09-the-F2E-week5-comic-viewer.png?alt=media&token=d6979946-0e81-441c-acf3-8b2d955755e6 "scroll left 算法圖解")


作品網址: <https://kakadodo.github.io/theF2EChallange/comic-viewer.html>


以上內容如有勘誤，還請不吝告知🙇
