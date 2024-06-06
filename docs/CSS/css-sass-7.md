---
title: Sass -  @each、 @function
categories: CSS
tags:
  - Sass/SCSS
  - CSS
date: 2018-11-27
thumbnail: https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/2018-10-15-css-sass.jpg?alt=media&token=bf9f5870-7806-48db-9d36-34c6f65b9c71
---

# {{ $frontmatter.title }}

![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/2018-10-15-css-sass.jpg?alt=media&token=bf9f5870-7806-48db-9d36-34c6f65b9c71 "Sass - 前端工程師應該要會的工程化 CSS")

## @each
之前提到 Sass 有兩種資料格式儲存: list 和 map。一般可以藉由內建 function 來取得單一值，例如: `nth($list，2)` 取得 $list 第二個索引的值。但如果今天是要跑全部的 list 或是全部的 map，就會需要 @each 這個指令!

### 遍歷 list
```scss
@each $item in $list {
  //some rules or conditions
}
```
上述語法的 $list 為要帶入的 list 資料，可以預先存成變數使用，也可以直接塞入一組 list。而 $item 則是遍歷整個 list 時每筆 item 的變數名，此名稱可以自己定義。
```scss
$list: (orange, purple, teal);
@each $item in $list {
  .#{$item} {
    background: $item;
  }
}

// 也可以直接在 @each 中直接寫 list，兩者結果相同
@each $item in orange, purple, teal {
  .#{$item} {
    background: $item;
  }
}

// 轉成 CSS
.orange {
  background: orange;
}

.purple {
  background: purple;
}

.teal {
  background: teal;
}
```

既然可以遍歷整個 list 的資料，當然也可以搞定更複雜一點的二維 list，二維 list 的格式會像這樣:
```scss
$list: (puma, black, default), (sea-slug, blue, pointer), (egret, white, move)
```
假設有三組 list，而每筆 list 本身又包含數個值，這樣二維 list 就會成立，因此我們可以想像成是 @each 總共會遍歷三次，而且每次的遍歷都會需要三個變數來塞值，因此就會寫成這樣:
```scss
// 這邊以直接寫入 list 示範，變數會依序對應每組 list 的值
@each $animal, $color, $cursor in (puma, black, default),
                                  (sea-slug, blue, pointer),
                                  (egret, white, move) {
  .#{$animal}-icon {
    background-image: url('/images/#{$animal}.png');
    border: 2px solid $color;
    cursor: $cursor;
  }
}

// 轉成 CSS
.puma-icon {
  background-image: url("/images/puma.png");
  border: 2px solid black;
  cursor: default;
}

.sea-slug-icon {
  background-image: url("/images/sea-slug.png");
  border: 2px solid blue;
  cursor: pointer;
}

.egret-icon {
  background-image: url("/images/egret.png");
  border: 2px solid white;
  cursor: move;
}
```

### 遍歷 map
遍歷 map 的方式會跟 list 有一點點不同，list 是多個單一值組在一起，但 map 會是多個含有 key 跟 value 的集合。使用 @each 在 map 身上的話，等於是依序遍歷 key 與 value，因此 @each 的變數會有兩個，分別在遍歷時帶入 key 與 value。
```scss
@each $header, $size in (h1: 2em, h2: 1.5em, h3: 1.2em) {
  #{$header} {
    font-size: $size;
  }
}

// 轉成 CSS
h1 {
  font-size: 2em;
}

h2 {
  font-size: 1.5em;
}

h3 {
  font-size: 1.2em;
}
```


## @function
使用 @function 的方式其實跟 JavaScript 差不多，一樣會宣告 @function 並於需要時調用，可以帶入參數，需要使用 `@return` 才收的到產生的值。
但有個不同的觀念是，在 Sass 中使用 function 其最終目的會是產生一個經過計算的值，它無法動態的去改變任何結構，最終都會經過編譯輸出成 CSS。
```scss
$grid-width: 60px;
$gutter-width: 10px;

@function grid-width($n) {
  @return $n * $grid-width + ($n - 1) * $gutter-width;
}

#sidebar { width: grid-width(4);}

#main {width: grid-width(8);}

// 轉成 CSS
#sidebar {
  width: 270px;
}

#main {
  width: 550px;
}
```
