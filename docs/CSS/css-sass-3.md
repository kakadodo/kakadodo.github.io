---
title: Sass -  變數與插值
categories: CSS
tags:
  - Sass/SCSS
  - CSS
date: 2018-10-30
thumbnail: https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/2018-10-15-css-sass.jpg?alt=media&token=bf9f5870-7806-48db-9d36-34c6f65b9c71
---

# {{ $frontmatter.title }}

Sass 方便之一的功能就是變數設定，可以幫助我們更有效管理樣式。

![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/2018-10-15-css-sass.jpg?alt=media&token=bf9f5870-7806-48db-9d36-34c6f65b9c71 "Sass - 前端工程師應該要會的工程化 CSS")

## $變數
共通的基準值、常使用到或可能需要主題化調整的值、網站主要的色彩基調等都適合設定成變數做管理。
變數要設定在 Sass 文件的最開始處，後面要取用這些變數時才不會報錯。
設定變數的方法也很簡單，以 `$` 字號為開頭後面接變數名稱即可。
```scss
$base: 10px;
$base_fontsize: 16px;
$color_primary: #222;
```
Sass 不會區分 - 與 _ 兩者差別，例如 $base_fontsize 與 $base-fontsize 會認為是相同的變數名稱，撰寫時最好擇一當標準以免不小心寫到相同的命名造成值被取代

### 全域變數與區域變數
Sass 的變數也有位置的設定差異，於最外層設定的變數是全域變數，大家都可以取用。而於樣式選擇器的 `{}` 內設定的變數就是區域變數，只能在該大括號內運作。(有額外的狀況下面會再提到)
```scss
$width: 500px;
.box{
  width: $width;
}
.card{
  $width: 350px;
  width: $width;
}

// 轉成 CSS
.box {
  width: 500px;
}
.card {
  width: 350px;
}
```
以上例來說，雖然兩個選擇器都套用 $width 這個變數作為寬度的設定，但值卻是不一樣的~

### Flag
在寫 CSS 時應該多少都會用到 `!important` 這個特殊 flag，Sass 也有兩種給變數用的 flag 設定。
- `!default`: 變數的默認值。如果變數沒有被重新賦值的話，就會套用預設的默認值。
```scss
$base: 12px;
$base: 10px !default;
$color_primary: #222 !default;

.main {
  padding: $base;
  background-color: $color_primary;
}

// 轉成 CSS
.main {
  padding: 12px;  // $base 有被重新賦值為 12px，因此不會套用 default 值
  background-color: #222;
}
```

- `!global`: 讓變數為全域變數。即使寫在 `{}` 內也能被其他選擇器使用。
```scss
.main {
  $width: 5em !global;
  width: $width;
}
.sidebar {
  width: $width;
}

// 轉成 CSS
.main {
  width: 5em;
}
.sidebar {
  width: 5em;
}
```
這兩種 flag 是 Sass 提供的設定，寫在一般 CSS 是沒有用的喔

### list 與 map 格式
設定變數時，除了給定一個純值( ex. 16px、50、#222.. ) 之外，也提供 list 與 map 的格式，不過這兩種格式需要搭配輔助函示來取用。
- list: 存放一組值，值與值之間可用 "空白" 或 "逗號" 分割。(如果是 list 包 list，則外層用逗號、內層用空白來區別)
```scss
$color_values: #ff0000, #00ff00, #0000ff;
$shdow: 0px 0px 15px #222, 0px 15px 30px #666;

.box{
  background-color: nth($color_values, 3);
  box-shadow: nth($shadow, 1); // nth() 可以取得變數某索引位置的值
}

// 轉成 CSS
.box {
  background-color: #0000ff;
  box-shadow: 0px 0px 15px #222;
}
```

- map: 存放一組含有 key/value 的值，最外層需用 `()` 號框起。
```scss
$heading: (h1: 2em, h2: 1.5em, h3: 1.2em);
.main_title{
  font-size: map-get($heading, h1); // map-get($變數, key) 取得 value
}

// 轉成 CSS
.main_title {
  font-size: 2em;
}
```
只是單純取其一值來用的話，使用 list 或 map 顯得有點 "自找麻煩"，這兩種格式比較適合與其他 function 搭配使用。像是用來遍歷的 @each，或是 @mixin 等。這部分就留待之後再說~

## \#\{插值\}
類似 JavaScript ES6 的字串模板，使用插值可以做字符串的替換。
插值的寫法為 `#{ $變數 }`
``` scss
$name: foo;
$attr: border;
p.#{$name} {
  #{$attr}-color: blue;
}

// 轉成 CSS
p.foo {
  border-color: blue; }
```
"選擇器名稱" 及 "屬性名稱" 是基本的字符串，寫甚麼就顯示甚麼，如果不使用插值符號直接帶入變數的話是會報錯的。(Sass 會認為是一般的字符串而不是變數)