---
title: JS 地下城挑戰心得 1F - 九九乘法表
keywords:
  - JavaScript, JS 地下城
categories:
  - JS 地下城
tags:
  - JavaScript
  - JS 地下城
thumbnailImagePosition: left
date: 2019-03-12 09:00:00
thumbnailImage: https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20190312-js-jsunderground-1f.jpg?alt=media&token=bdc56b3e-d5ec-4a43-9a9d-935064b009f4
---

終於有時間來寫一下部落格了!!荒廢了快兩個月說...😿
很開心又有前端的挑戰任務可以做~雖然無法即時跟進，還是想找時間試試看自己能不能達成任務嘿嘿
<!-- excerpt -->
![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20190312-js-jsunderground-1f.jpg?alt=media&token=bdc56b3e-d5ec-4a43-9a9d-935064b009f4 "JS 地下城挑戰心得 1F - 九九乘法表")

[六角學院提供的設計稿連結](https://xd.adobe.com/spec/256981fc-ef65-4d9b-773c-45d8ef0353c6-5358/screen/50fba855-bde7-4771-b73c-3fd839418cf0/multiplication-chart/)

## 運用技術:
- Pug
- SCSS、Grid、Flexbox
- Vue.js

## 挑戰心得:
覺得這關算是滿佛心的任務，雖然乍看要做出跟"數學"有關的東西就莫名恐懼
我自己覺得困難點在畫面排版，一開始很猶豫要用 Flexbox 還是 Grid 來排...結果最後做一做兩種都用到了哈哈

外層九個大區塊使用 Grid 來產生，主要的設定都會寫在 Grid 外層，一下就可以輕鬆搞定裡面的排列模式。
```scss
.grid_wrapper {
  display: grid; // 使用 Grid 排版
  grid-template-columns: 350px 350px 350px; // 三欄模式，每欄固定 350px 寬
  grid-auto-rows: 366px; // 列不寫死數量，只要有新的列產生預設高度就是 366px
  grid-column-gap: 30px; // 設定欄之間的間距
  grid-row-gap: 40px; // 設定列之間的間距
}
```
設定完後畫面馬上就切成想要的格式了~這塊大概在 5 分鐘內就完成了吧
稍微複雜的是欄位內容的呈現方式，我是覺得使用 Grid 反而沒那麼輕鬆，所以改成用 Flex 來完成

第一欄因為是標題，所以跟其他欄位用不同的 class 來設定，一開始被上下兩條的裝飾線卡住，最後乾脆開 AI 畫成 svg 了事 XDD
後來看到其他人作品是用 span 做出橫線再加上兩個 X 字母完成，只能說我好像小題大作了.........(反正有做出來啊!!Q_Q)

公式這塊主要藉由 Flex 可以改變排列方向及 wrap 的特性來達成
```scss
.grid_column {
  display: flex;
  flex-direction: column; // 變成縱向排列
  flex-wrap: wrap; // 高度不夠內容就會移至下一欄
  justify-content: space-between;
  align-content: space-around;
  padding: 64px 40px;
}
```
設定後畫面大概就差不多了~之後就是調一些間距跟文字樣式的設定等等~Done!
(不過沒 RWD 就是了)

再來就輪到 JavaScript 跑資料了~本來以為這塊要花不少時間...(莫名心虛)
由於這陣子天天跟 Vue 相依偎，自然使用它來搞定，事實也證明用 Vue 來寫根本犯規，codepen 的 JavaScript 欄只有掛載 Vue 這條內容，html 大概也就兩三行指令吧 XDDD
```html
<!-- html 內容，使用 pug 寫法 -->
<!-- 排除第一欄的標題，所以只用 v-for 產生 8 個欄位，
內部的公式再使用一次 v-for 來跑每一行的內容，完成! -->
.grid_column(v-for="num in 8", :key="num")
  .main_number {{num+1}}
  .mult_number(v-for="subNum in 9", :key="'sub${subNum}'")
    | {{num+1}} x {{subNum}} = {{(num+1)*(subNum)}}
```

```js
// JavaScript 就寫這樣而已 XDDD
new Vue({
  el: '#app',
});
```

於是乎............

Codepen 作品:
<iframe height="500" style="width: 100%;" scrolling="no" title="JS地下城 - 1F 九九乘法表" src="//codepen.io/chelseac/embed/rRzGxg/?height=500&theme-id=0&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/chelseac/pen/rRzGxg/'>JS地下城 - 1F 九九乘法表</a> by Chelsea
  (<a href='https://codepen.io/chelseac'>@chelseac</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

心得就是，有前端工具真是太幸福了~(笑)

以上內容如有勘誤，還請不吝告知🙇