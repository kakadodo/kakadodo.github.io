---
title: Sass - @if、@else if、@else 和 @for、@while
categories: CSS
tags:
  - Sass/SCSS
  - CSS
date: 2018-11-20
thumbnail: https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/2018-10-15-css-sass.jpg?alt=media&token=bf9f5870-7806-48db-9d36-34c6f65b9c71
---

# {{ $frontmatter.title }}

Sass 提供一系列表達式控制命令，像是 if 判斷、遍歷迴圈、自訂 function 等等，這些控制命令可以幫助撰寫 Sass 具有邏輯性且更省力!

![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/2018-10-15-css-sass.jpg?alt=media&token=bf9f5870-7806-48db-9d36-34c6f65b9c71 "Sass - 前端工程師應該要會的工程化 CSS")

## @if、@else if、@else
if 需給予判斷的條件，當 if 不成立時會往下找 else if 的條件，直到都不成立跳到 else。
@if 可以直接寫在選擇器中，也可以另外搭配 @mixin 或 @for。
邏輯運算子 `==`、`>`、`<` 這種 Sass 都吃，唯獨 `||` 符號在 Sass 中要寫成 `or` 才不會跳錯。

```scss
// 寫在選擇器中
$type: monster;
p {
  @if $type == ocean {
    color: blue;
  } @else if $type == monster {
    color: green;
  } @else {
    color: black;
  }
}

// 轉成 CSS
p {
  color: green;
}

// --------------------------------------------

// 搭配 @mixin
@mixin deck($suit) {
  @if($suit == hearts or $suit == spades){
    color: blue;
  }
  @else if($suit == clovers or $suit == diamonds){
    color:green;
  }
  @else{
    color: black;
  }
}

.suit{
  @include deck(clovers);
}

// 轉成 CSS
.suit {
  color: green;
}
```

## @for
@for 寫法上會跟 JavaScript 的有些不同，@for 語法有兩種範圍設定 `through` 及 `to`。
- through: 起始值 ~ 結束值都會遍歷
- to: 不包含結尾值遍歷

### @for $i from $begin <b style="color:#ff6060;">through</b> $end{ //style here..}
- $i: index 變數，每跑一次迴圈 $i 帶的值會改變
- $begin: 迴圈的起始值
- $end: 迴圈的結束值

```scss
$total: 10;
$step: 360deg / $total;
@for $i from 1 through $total {  // for 迴圈會跑 10 次，從 1 跑到 10
  .ray:nth-child(#{$i}) { // 分別指定到每個 .ray
    background: adjust-hue(blue, $i * $step);   // 調整每個 .ray 的色相顏色
  }
}

// 轉成 CSS
.ray:nth-child(1) {
  background: #9900ff;
}

.ray:nth-child(2) {
  background: #ff00cc;
}

.ray:nth-child(3) {
  background: #ff0033;
}

.ray:nth-child(4) {
  background: #ff6600;
}

.ray:nth-child(5) {
  background: yellow;
}

.ray:nth-child(6) {
  background: #66ff00;
}

.ray:nth-child(7) {
  background: #00ff33;
}

.ray:nth-child(8) {
  background: #00ffcc;
}

.ray:nth-child(9) {
  background: #0099ff;
}

.ray:nth-child(10) {
  background: blue;
}
```

<iframe width="100%" height="300" src="//jsfiddle.net/kakadodo/58aoqzv7/embedded/html,css,result/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
上例如此一寫就可以產生 10 個色相慢慢偏移的顏色區塊!! 純看 Sass code 整個超乾淨啊


### @for $i from $begin <b style="color:#ff6060;">to</b> $end{ //style here..}

```scss
$grid_number: 6;
@for $i from 1 to $grid_number{
  .grid-#{$i}{
    width: $i*80 px;
  }
}

// 轉成 CSS
.grid-1 {
  width: 80 px;
}

.grid-2 {
  width: 160 px;
}

.grid-3 {
  width: 240 px;
}

.grid-4 {
  width: 320 px;
}

.grid-5 {
  width: 400 px;
}
// 不包含結尾值 6
```

CSS 有撰寫順序的權重差異，使用 @for 遍歷時的順序會影響 CSS 產生的結果，上例是從 1 跑到結尾值，編譯後的 CSS 就是從 grid-1 排到 grid-5，如果改寫成 `@for $i from $grid_number through 1{}` 那就會變成從 grid-6 排到 grid-1 喔!


## @while
在跑 @for 時會依照起始值與結束值的範圍依序遍歷，但 @while 可以更進階的改變迴圈的遍歷條件以產生特定範圍的樣式。
語法: `@while $variable condition{//style and change condition here..}`
- $variable: 做為判斷條件的變數
- condition: while 運行的條件

```scss
$num: 6;
@while $num > 0 {
  .item-#{$num} { width: 2em * $num; }
  $num: $num - 2;
}

// 轉成 CSS
.item-6 {
  width: 12em;
}
.item-4 {
  width: 8em;
}
.item-2 {
  width: 4em;
}
```
