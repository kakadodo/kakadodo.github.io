---
title: Sass - 基本介紹、運行環境
categories: CSS
tags:
  - Sass/SCSS
  - CSS
date: 2018-10-15
thumbnail: https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/2018-10-15-css-sass.jpg?alt=media&token=bf9f5870-7806-48db-9d36-34c6f65b9c71
---

# {{ $frontmatter.title }}

![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/2018-10-15-css-sass.jpg?alt=media&token=bf9f5870-7806-48db-9d36-34c6f65b9c71 "Sass - 前端工程師應該要會的工程化 CSS")

Sass 語言分為兩派，一是極度簡潔派的 Sass，另一個則是親和力高幾乎可以看成一般 CSS 的 SCSS。

## Sass 有多簡潔?
- 完全靠縮排來布局 CSS 的層級
- 不會使用到 {} 及 ; 這類的符號

![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/2018-10-15-css-sass-2.jpg?alt=media&token=e27a4114-5637-4275-82a6-dccf20e2c42f "Sass - 前端工程師應該要會的工程化 CSS")

## SCSS 有多親和?
- 一般 CSS 檔可以無痛轉成 SCSS 格式(副檔名改為 .scss)
- 看起來就像 CSS，只是具有階層式的撰寫模式
- 雖說一樣要加上 {} 及 ; 等符號，但相對來講較不容易因為縮排的問題出錯

![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/2018-10-15-css-sass-3.jpg?alt=media&token=6f09529d-ab43-463c-b7bc-7868ec77b7d7 "Sass - 前端工程師應該要會的工程化 CSS")

上面兩張截圖分別用兩種不同的撰寫模式來寫，結果都是得到同一份 CSS 內容，這樣一看就知道 Sass 真的超簡潔了
不過自己在寫示意時就不小心縮排沒排好出錯😢 個人還是偏好使用 SCSS 作為主要的 Sass 語言...
當然 Sass 不會就只是上面所說的那點差異啦...主要是它提供了不少實用的功能!可以讓你的 CSS 變得有結構、可以模組化、可以重用，這是一般 CSS 較難做到的事情。

## Sass 要怎麼運作?
由於 Sass 並不是瀏覽器可以理解的語言，我們需透過編譯的方式將 Sass 的檔案轉為瀏覽器可吃的 CSS 檔。

1. 使用專門的應用程式來編譯 Sass (例如[Prepros](https://prepros.io/))，這類有現成 GUI 介面的應用程式幾乎都會需要付費使用，之前有短暫用過 Prepros，雖然不付費也可以用但就會常常跳廣告要你購買
2. 使用 Sass 的 npm 套件來編譯，全局安裝後，可透過輸入指令的方式來編譯檔案。
```bash
npm install -g sass

sass source/stylesheets/index.scss build/stylesheets/index.css
```
3. 使用編輯器的擴充套件來編譯，主流的編輯器應該都會有可編譯 Sass 的擴充套件。

![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/2018-10-15-css-sass-4.jpg?alt=media&token=64264ad5-68c7-4c1d-ad25-4a438a1d569b "Sass - 前端工程師應該要會的工程化 CSS")

例如 VSCode 的 [Live Sass Compiler](https://marketplace.visualstudio.com/items?itemName=glenn2223.live-sass) 套件就可以靠簡單的設定來幫你即時監看 Sass 並編譯出 CSS 檔。

不過要在較大型的專案上寫 Sass，建議還是搭配打包工具來幫忙管理所有相依的套件比較理想。