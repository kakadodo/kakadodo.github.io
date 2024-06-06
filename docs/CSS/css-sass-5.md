---
title: Sass - 計算功能與顏色、list、map 的輔助函式
categories: CSS
tags:
  - Sass/SCSS
  - CSS
date: 2018-11-13
thumbnail: https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/2018-10-15-css-sass.jpg?alt=media&token=bf9f5870-7806-48db-9d36-34c6f65b9c71
---

# {{ $frontmatter.title }}

![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/2018-10-15-css-sass.jpg?alt=media&token=bf9f5870-7806-48db-9d36-34c6f65b9c71 "Sass - 前端工程師應該要會的工程化 CSS")

## 計算功能
搭配變數設定一個基礎值，可以讓整體數值的變化更有統一性，除了基本的加減乘除外，還可以取餘數以及做顏色上的計算處理。
```scss
$base:10px;
.box{
  width: 500px;
  padding: $base*2 + 5px;
  margin-bottom: $base*3 - 5px;
  font-size: $base*2;
  letter-spacing: $base % 7;
  background-color: #333 + rgb(33,250,158);
}

// 轉成 CSS
.box {
  width: 500px;
  padding: 25px;
  margin-bottom: 25px;
  font-size: 20px;
  letter-spacing: 3px;
  background-color: #54ffd1;
}
```
一般計算過程要注意單位是否正確，px 就對 px，em 就對 em，不同單位的計算會有問題。不過顏色的單位例外...以上例的 hex 跟 rgb 就可以混用，但如果是 hex 跟 rgba 就會報錯(多了透明度的計算)。如果要處理透明度的計算，兩者之間的透明度值一定要相等否則一樣會報錯喔!
經測試下來，不含透明度的顏色計算輸出會是 hex 的格式，含透明度的顏色計算輸出則是 rgba。
```scss
.box{
  background-color: rgba(55,78,30,0.5)+ rgba(200,30,67,0.5);
  // OK! background-color: rgba(255, 108, 97, 0.5);

  background-color: rgba(55,78,30,0.5)+ rgba(200,30,67,0.2);
  // 不OK! Alpha channels must be equal: rgba(55, 78, 30, 0.5) + rgba(200, 30, 67, 0.2)

  background-color: rgba(55,78,30,0.5)+ hsla(20,70%,50%,0.5);
  // OK! background-color: rgba(255, 176, 68, 0.5);

  background-color: rgba(55,78,30,0.5)+ hsla(20,70%,50%,0.2);
  // 不OK! Alpha channels must be equal: rgba(55, 78, 30, 0.5) + rgba(217, 98, 38, 0.2)
}
```

### random($limit)
產生隨機數值的方法，$limit 值必須大於0，會產生 1 ~ $limit 之間(包括 $limit)的正整數。
```scss
.box{
  width: random(300)+px;
  height: random(300)+px;
  border-radius:50%;
}

// 轉成 CSS
.box {
  width: 155px;
  height: 101px;
  border-radius: 50%;
}
```

## 顏色輔助函式
比起顏色的加減，自己比較常用輔助函式，Sass 關於顏色方面的函式真的很多...有興趣可以直接看 [Sass documents](https://sass-lang.com/documentation/Sass/Script/Functions.html)
- `darken($color, %)`: 回傳暗化的顏色
- `lighten($color, %)`: 回傳亮化的顏色
- `adjust-hue($color, degree)`: 回傳調整色相後的顏色
- `invert($color)`: 回傳相反色
- `fade-in($color, %)`: 顏色增加不透明度
- `fade-out($color, %)`: 顏色減少不透明度

```scss
$color: #beed25;
.btn{
  background-color: $color;
  &:hover{
    background-color: darken($color, 8%);
  }
  &:active{
    background-color: lighten($color, 8%);
  }
  &.btn-secondary{
    background-color: invert($color);
  }
}

// 轉成 CSS
.btn {
  background-color: #beed25;
}
.btn:hover {
  background-color: #a9d712;
}
.btn:active {
  background-color: #c9f04b;
}
.btn.btn-secondary {
  background-color: #4112da;
}
```
以上例來說，使用顏色的輔助函式可以很方便的產生按鈕不同狀態下的顏色，且這些顏色是有整體關聯性的，當主顏色被改變時，其他狀態的顏色也會跟著變化。

## list 與 map 的輔助函式
之前提到的 list 和 map 其實最常和表達式指令一起使用。例如 `@for、@each` 它們都具有遍歷的特性，在遍歷中取特定的值就需要依靠 list 和 map 的輔助函式。

#### list 可用的 function
- `length($list)`: 取得 list 的長度
- `nth($list，index)`: 取得 list 索引位置的值(index 從 1 開始)
- `index($list，val)`: 取得 list 某個值的索引位置

```scss
$types: primary, secondary, danger, warn, success;
$colors: blue, gray, red, orange, green;

// 使用 @for 來產生一系列的 btn 樣式
@for $i from 1 through length($types){
  .btn-#{nth($types, $i)}{
    background-color: nth($colors, $i);
    color: white;
  }
}

// 轉成 CSS
.btn-primary {
  background-color: blue;
  color: white;
}

.btn-secondary {
  background-color: gray;
  color: white;
}

.btn-danger {
  background-color: red;
  color: white;
}

.btn-warn {
  background-color: orange;
  color: white;
}

.btn-success {
  background-color: green;
  color: white;
}

```

#### map 可用的 function
- `map-get（$map，$key）`: 取得 key 的 value
- `map-keys（$map）`: 取得 map 所有的 key
- `map-values（$map）`: 取得 map 所有的 value

```scss
$btns: (primary: blue, secondary: gray, danger: red, warn: orange, success: green);
$className: map-keys($btns);

@for $i from 1 through length($className){
  .btn-#{nth($className, $i)}{
    background-color: map-get($btns, nth($className, $i));
  }
}

// 轉成 CSS
.btn-primary {
  background-color: blue;
}

.btn-secondary {
  background-color: gray;
}

.btn-danger {
  background-color: red;
}

.btn-warn {
  background-color: orange;
}

.btn-success {
  background-color: green;
}
```
用 list 還是 map 都可以達成想要的結果~就看自己對哪一種方式比較順手。