---
title: The F2E - 前端修練精神時光屋挑戰系列 - 2nd Week 9. Notebook
keywords:
  - Vue.js, 筆記軟體
categories:
  - the F2E challenge
thumbnailImagePosition: left
date: 2019-09-07 21:00:00
thumbnailImage: https://kakadodo.github.io/theF2EChallange/img/2nd-week9.jpg
---

我撐過去了\~我撐過去啦~~九週真得好漫長 😭😭😭
<!-- excerpt -->
![blog image](https://kakadodo.github.io/theF2EChallange/img/2nd-week9.jpg "Week 9. Notebook")

## 使用者故事:
1. 筆記服務請挑選任一操作載體來設計，例：桌面版、網頁版、Mobile APP
1. 我可以新增一個筆記，填寫文章內容
1. 我可以將筆記打星號，以方便快速搜尋
1. 我的筆記擁有日/夜間瀏覽模式
1. 若您挑選的是 deksop、網頁版筆記服務，在筆記列表上，至少要有兩種以上檢視筆記方式，例如卡片檢視、摘要檢視、純文字列表檢視等等
1. 我可以在筆記裡，將文字變成粗體、斜體、下底線等基本樣式，並且載入連結
1. 我可以在筆記裡插入圖片、檔案


來自 Abel 的[設計稿](https://challenge.thef2e.com/user/3341?schedule=4268)，有印象這位之前都是投稿工程師啊 XD 居然連設計也有，好逆害!

## 運用技術:
- Pug
- Vue.js
- [Vue-Quill-Editor](https://surmon-china.github.io/vue-quill-editor/)
- [highlight.js](https://highlightjs.org/download/)

## 挑戰心得:
有點意外這週主題可以在 6 個小時內搞定，真的多虧有現成的編輯器套件可以用，讓我還有一個星期天可以好好休息 😭
自己平常有在使用 Evernote 這套筆記軟體，所以滿習慣文章列表點選後立刻編輯的模式，設計稿也是走這種風格剛好可以來嘗試寫看看!

我是採用 Quill 這套編輯器，官方滿貼心的有附上多種情境及不同環境的範例檔案，因此我就不客氣直接複製貼上使用了。(感謝有大神另外寫成 Vue 用的插件)
基本上沒要客製化外觀的話，程式碼是可以隨插隨用的，編輯器整體包裝成一個 component，只要寫好對應的 data 及 methods 作綁定即可，編輯器的內容會自動轉換成 html 標籤，藉由 v-model 的雙向綁定，可以很方便的取得當下撰寫並轉換格式後的所有內容。如果想要立即看到編輯器輸出的效果，可以另外建立個容器並用 v-html 屬性來即時輸出。

日夜間的模式我是在 `#app` 標籤綁定一個動態 class "dark"，再於 CSS 中設定 dark 模式下的外觀改變，編輯器的部分會比較麻煩一點，需要慢慢找編輯器的樣式標籤，再逐一覆蓋，也因此這時才發現編輯器的 toolbar 圖標居然都是用 svg 標籤生成的，好險套件有在各個 svg 設定 class，不然一時要改還真的不知道從何改起 XD

Quill 的 toolbar 功能非常完善，如果只要呈現部分工具，可以在 `editorOption` 作詳細設定:
```js
// 預設提供全部的 toolbar 功能，可以省略不寫
editorOption: {
  modules: {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ 'header': 1 }, { 'header': 2 }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],
      [{ 'indent': '-1' }, { 'indent': '+1' }],
      [{ 'direction': 'rtl' }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'font': [] }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'align': [] }],
      ['clean'],
      ['link', 'image', 'video']
    ],
    syntax: {
      highlight: text => hljs.highlightAuto(text).value
    }
  }
}
```
其中 modules 的 syntax 屬性可以設定 `code-block` 的語法 highlight，套件的範例是搭配 **highlight.js** 來使用，highlight.js 有提供多種主題可以套用，只要載入想要的主題 css 及本體 js 即可，載入後就可以讓編輯器在使用 code-block 時會自動偵測語法呈現對應的 highlight 效果囉!
```html
<!-- Include your favorite highlight.js stylesheet -->
<link href="highlight.js/monokai-sublime.min.css" rel="stylesheet">
<!-- Include the highlight.js library -->
<script href="highlight.js"></script>
```

Quill 本身有提供兩種主題模式作選擇，分別是 `snow` 跟 `bubble`，我是使用 snow 主題，bubble 主題則是選取文字後再彈出讓你改樣式的編輯模式。
設定方式一樣寫在 `editorOption` 中:
```js
editorOption: {
  theme: 'bubble',
}
```
記得也要載入對應的主題 css 檔才會套到樣式喔!

Quill 編輯器的圖片插入方式基本有兩種，一種是直接點擊 toolbar 從本地電腦上傳圖片，不過圖片會是 base64 的格式載入，另一種是直接複製網路上的圖片，再於編輯器中貼上，這樣就會是以 `<img>` 標籤的方式連結圖片的網址，如果需要加強編輯器的圖片功能，可以使用其他開發者為 Quill 設計的擴充插件，可以做到從本地拖曳置入圖片、圖片調尺寸、圖片上傳至 server 等功能。

總結來說，這週主題讓我和 Quill 有一個好的開始 XDD 可以短短時間快速上手真心不錯用。

作品網址: <https://kakadodo.github.io/theF2EChallange/notebook.html>

以上內容如有勘誤，還請不吝告知🙇
