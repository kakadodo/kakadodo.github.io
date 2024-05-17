---
title: Sass - 階層式寫法、註解
categories: CSS
tags:
  - Sass/SCSS
  - CSS
date: 2018-10-23
thumbnail: https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/2018-10-15-css-sass.jpg?alt=media&token=bf9f5870-7806-48db-9d36-34c6f65b9c71
---

# {{ $frontmatter.title }}

![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/2018-10-15-css-sass.jpg?alt=media&token=bf9f5870-7806-48db-9d36-34c6f65b9c71 "Sass - 前端工程師應該要會的工程化 CSS")

## 階層式寫法
class 在命名如果有遵照命名規範來設定的話，使用階層式寫法可以節省重複的名稱撰寫。
舉例來說，設計 class 名稱時如果遵循 [BEM](http://getbem.com/) 的命名規範，一個表單組件可能就會包含以下 class name: `.form`、`.form__input`、`.form__input_focus`、`form__submit`、`form__submit_disabled`

那麼在寫樣式時，就可以寫成以下的格式
```scss
.form{
  width: 400px;
  &__input{
    border: 2px solid #ccc;
    &_focus{
      outline: none;
      border: 2px solid red;
    }
  }
  &__submit{
    background: transparent;
    border: 2px solid green;
    &_disabled{
      background-color: #ccc;
      border-color: #aaa;
    }
  }
}
```
轉成一般 CSS 的話則是下面的格式
```css
.form {
  width: 400px;
}
.form__input {
  border: 2px solid #ccc;
}
.form__input_focus {
  outline: none;
  border: 2px solid red;
}
.form__submit {
  background: transparent;
  border: 2px solid green;
}
.form__submit_disabled {
  background-color: #ccc;
  border-color: #aaa;
}
```
Sass 的寫法可以將同一組件內的 class 名稱集合在一個區塊內，當程式碼一多時會比較容易區分它們之間的關係。
而當中用到的 `&` 符號是作為連接 class 名稱的關鍵。符號之後接文字、下底線、中線，產生出來的會是前後連接的樣式名。(`.form&__input -> .form__input`)
如果 `&` 符號後方接的是 `.` 、`#` 或是 `:` 符號那情況就大不同囉!這幾個符號在 CSS 裡面本來就有特別的涵義。以 `<button class="btn">` 為例:
```scss
.btn{
  // ...
  &.btn-primary{
    // ...
  }
  &:hover{
    // ...
  }
}

// 轉成 CSS 後
.btn {
  // ...
}
.btn.btn-primary {
  // class 同時有 btn 及 btn-primary 才會套用該樣式
}
.btn:hover {
  // class 有 .btn 且被 hover 時才會套用該樣式
}
```
所以即使是不同狀態下的樣式依然可以整合在同一個外層之內，但也要注意不要因為都放在同一個區塊內而導致 class 層級包覆太多，通常階層保持在 1~2 層是比較理想的狀態。

除此之外，Sass 還針對幾個具有相同命名空間的 CSS 特性提供類似"物件"格式的寫法
具有相同命名空間的意思就是特性名稱會有 `-` 作為連接，而前面的名稱都是統一的。例如 `background` 系列:
```scss
.block{
  background:{
    color: red;
    position: center center;
    size:cover;
  };
}
// 轉成 CSS
.block {
  background-color: red;
  background-position: center center;
  background-size: cover;
}
```
background 這個相同的命名會變成物件的名稱，而裡面含有的屬性名就是這個命名之下的後綴詞。另外也可以寫成:
```scss
.block{
  background: red center center {
    size:cover;
  };
}
// 轉成 CSS
.block {
  background: red center center;
  background-size: cover;
}
```
不過自己是覺得這樣寫過一段時間再看應該會短暫的懷疑人生 XD

## 註解
平常用 CSS 寫註解的話應該會用 `/* */` 這種符號，使用 Sass 的話，註解可以有兩種寫法:
1. `// ...` 使用兩條斜線可以做單行註解
1. `/* ... */` 依然可以使用 CSS 的註解方式做單行或多行註解

Sass 檔在編譯輸出後，可能會因註解使用的方式而有不同顯示。使用單行註解的話，編譯成 CSS 後註解會消失。使用多行註解編譯後會保留，但如果是進行編譯+壓縮的話則多行註解也會消失。只有在多行註解的開頭加上 `!` 符號，才能保持註解始終存在。