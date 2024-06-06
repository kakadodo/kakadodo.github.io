---
title: Sass - @mixin 與 @extend
categories: CSS
tags:
  - Sass/SCSS
  - CSS
date: 2018-11-06
thumbnail: https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/2018-10-15-css-sass.jpg?alt=media&token=bf9f5870-7806-48db-9d36-34c6f65b9c71
---

# {{ $frontmatter.title }}

要使用 Sass 絕對不能錯過它提供的一些好用函式，這些函式可以幫助我們省去許多的"重工"。其中 mixin 與 extend 算是主要的大功能。

![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/2018-10-15-css-sass.jpg?alt=media&token=bf9f5870-7806-48db-9d36-34c6f65b9c71 "Sass - 前端工程師應該要會的工程化 CSS")

Sass 的主要功能前方都會使用 `@` 符號表示，雖然 Sass 本身有縮寫的版本但只提供 Sass 使用 SCSS 是不吃的，這邊統一用 SCSS 的方式來表示!

## @mixin / @include
當我們在撰寫樣式碼時，很容易出現"重複"的樣式語法，它們可能都有固定模式的寫法，只是要塞入的數值不同。這時候使用 mixin 來包裝，就可以快速產生相應的語法又能依據各區塊調整成不同的數值。

```scss
@mixin NAME($val1,$val2...){
  // style code here with arguments...
  css-property: $val1;
  css-property: $val2;
}

.class{
  @include NAME;
}
```

@mixin 後方接的是這組定義的命名 (NAME)，再之後的 `()` 其實取決於要不要帶 $ 參數，它是可以省略不寫的。`{}` 內塞的就是實際要產生的樣式語法，值寫成帶入的參數編譯後就會將參數值替換過去。要調用 @mixin 則於選擇器中 `@include`。

下方以寬度高度為例，假設很多區塊都會設定寬高，那這兩個語法就可以組成一組 mixin。
```scss
// 參數也可以設定 default 值，下方表示如果 $h 沒設定就會帶入 $w 的值
@mixin size($w, $h:$w){
  width: $w;
  height: $h;
}
.container{
  @include size(1024px, auto);
  background-color: #ccc;
}
.sidebar{
  @include size(400px, 700px);
  border: 1px solid #666;
}

// 轉成 CSS
.container {
  width: 1024px;
  height: auto;
  background-color: #ccc;
}

.sidebar {
  width: 400px;
  height: 700px;
  border: 1px solid #666;
}
```
要注意的是如果 @mixin 有設定參數，實際使用就一定要塞值給它否則編譯會出錯，或是也可像上例一樣設定預設值。

從轉出的 CSS 可以看出，`@mixin` 本身是不會被輸出的，他只在 Sass 的環境下運行，當 Sass 要編譯為 CSS 時取用它的規則。因此我們可以定義很多常用到的 @mixin 而不用怕 CSS 檔案變大。

### @content

@mixin 提供一種"插槽"的撰寫方式，除了事先定義要寫入的語法外，也可以設置插槽於 @include 這組 mixin 時再另外設定內容。假設我們想要將 media query 做成 @mixin 來用:
```scss
@mixin breakpoint($point) {
  // 判斷變數是 pc、pad 還是 mobile，再載入對應的 media query
  @if ( $point == pc ){
    @media only screen and (max-width: 1024px) {
      // 使用 @content 置入插槽，於調用時再寫入實際的內容
      @content;
    }
  }
  @else if ( $point == pad ){
    @media only screen and (max-width: 768px) {
      @content;
    }
  }
  @else if ( $point == mobile ){
    @media only screen and (max-width: 320px){
      @content;
    }
  }
}

.container{
  width: 600px;
  @include breakpoint(pc){
    width: 300px;
    height: 50px;
  }
  @include breakpoint(pad){
    width: 100%;
  }
}

// 轉成 CSS
.container {
  width: 600px;
}
@media only screen and (max-width: 1024px) {
  .container {
    width: 300px;
    height: 50px;
  }
}
@media only screen and (max-width: 768px) {
  .container {
    width: 100%;
  }
}
```

@mixin 的參數除了一個一個帶入之外，也可以帶入 list 或 map
- list 範例
```scss
// $參數後方加上...，會自動將之後帶入的值視為一組 list
@mixin box-shadow($borderColor, $shadows...) {
  border-color: $borderColor;
  box-shadow: $shadows;
}
.shadows {
  @include box-shadow(#ccc, 0px 4px 5px #666, 2px 6px 10px #999);
}

// 轉成 CSS
.shadows {
  border-color: #ccc;
  box-shadow: 0px 4px 5px #666, 2px 6px 10px #999;
}
```

- map 範例
```scss
@mixin colors($text, $background, $border) {
  color: $text;
  background-color: $background;
  border-color: $border;
}
// 事先定義一組變數來存放 map，map 的 key 需和 @mixin 的參數名相同
$value-map: (text: #00ff00, background: #0000ff, border: #ff0000);
.box {
  // 帶入 map 變數需要用...將各個值展開到各自對應的位置上
  @include colors($value-map...);
}

// 轉成 CSS
.box {
  color: #00ff00;
  background-color: #0000ff;
  border-color: #ff0000;
}
```

## @extend / %
@extend 跟 @mixin 有點像，主要的目的也是集合共通的樣式語法，最大的不同點在於沒有參數設定、不同的輸出方式以及具有"繼承"的概念。@extend 的設定方式有兩種，一種是直接"繼承選擇器"，另一種則跟 @mixin 類似，先另外定義再於選擇器中載入。

- 繼承選擇器
```scss
.error {
  border: 1px #f00;
  background-color: #fdd;
}
.error.intrusion {
  background-image: url("/image/hacked.png");
}
.seriousError {
  @extend .error;  // 此處寫入繼承 .error ，這樣包含 .error 所有相關的屬性都會繼承到
  border-width: 3px;
}

//轉成css
.error, .seriousError {
  border: 1px #f00;
  background-color: #fdd; }

.error.intrusion, .seriousError.intrusion {  //附帶的 class 也會一併被繼承套用
  background-image: url("/image/hacked.png"); }

.seriousError {
  border-width: 3px; }
```
上例可以發現，雖然 `.seriousError` 繼承 `.error` 的樣式，但實際會連 `.error.intrusion` 這組選擇器也一併繼承。輸出成 CSS 後就會自動多出一行是 `.seriousError.intrusion`。這在執行上可能會產生不可預料的問題( 跟個人的撰寫習慣有關 )，也會多出不必要的 CSS 設定。

- 使用 `%NAME` 自定義
定義本身並不會實際轉出 CSS，於選擇器中 @extend 即可。這種方式輸出的 CSS 跟 @mixin 會不同。
```scss
// 自定義 extend
%posAbsolute{
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.container{
  // 於選擇器中 @extend
  @extend %posAbsolute;
  border: 2px solid #ccc;
}

.box{
  @extend %posAbsolute;
  background-color: #5444ee;
}

// 轉成 CSS
.container, .box {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.container {
  border: 2px solid #ccc;
}

.box {
  background-color: #5444ee;
}
```
上例可以看出，使用 @extend 的選擇器輸出後會被統一歸納，以共通樣式的角度來輸出 CSS。@mixin 的話則是以選擇器的角度來輸出。
其實兩種方式都可以使用，只是 @extend 無法載入參數，因此較適合用來設定"固定不變"的 CSS 寫法。(像範例的絕對置中)