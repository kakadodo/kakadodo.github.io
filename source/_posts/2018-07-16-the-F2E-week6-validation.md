---
title: The F2E - 前端修練精神時光屋挑戰系列 - Week 6. Validation
keywords:
  - form validation, HTML5
categories:
  - the F2E challenge
thumbnailImagePosition: left
date: 2018-07-16 08:49:11
thumbnailImage: https://kakadodo.github.io/theF2EChallange/img/week6.jpg
---

不知不覺挑戰週數已經超過一半了...這週是第六週~~還剩三週要受到驚嚇，加油吧自己 😈😈😈
<!-- excerpt -->

![blog image](https://kakadodo.github.io/theF2EChallange/img/week6.jpg "Week 6. Validation")

設計稿: <http://bit.ly/2udrg3l>

### 使用者故事:
實現表單驗證功能，使用者體驗可以得知輸入的內容是否正確

### 運用技術:
- Pug (html模板語言)
- SCSS (css預處理語言)
- Vue
- HTML5 form validation

### 挑戰心得:
要做表單驗證馬上想到可以用 Vue.js，對 input 做 model 的資料綁定，就不需要另外綁一堆監聽 哈哈(懶人模式ing)

資料驗證則嘗試用 HTML5 原生的表單驗證功能，HTML5 有針對表單元件追加不少用來驗證、限制輸入內容的屬性，當使用者觸發 submit 時，會檢查欄位是否符合標準，再對欄位加上 CSS 的偽類選擇器 `:valid` 及 `:invalid`，這樣可以針對選擇器寫自訂的樣式，做出提示使用者輸入的訊息!Bootstrap 4 有對 HTML5 的表格驗證做自定義的樣式設定，所以這次就套用它的設定來寫表單啦!

以下列出有用到的表單驗證 attribute:
- novalidate  `<form>`加上此屬性會禁用瀏覽器預設的回饋提示( JavaScript 還是可以透過 [約束驗證 API][0] 來得知欄位是否通過驗證)
- min / max  限制 input 的最小值與最大值，可用在 type=number, range, date..等數字型態的欄位
- pattern  正規式判斷，可用在 text, search, url, tel, email, and password。input 可加上 title 屬性來提示使用者輸入的規範。
- required  欄位必填，如果沒輸入內容會視為 :invalid

表單驗證失敗時瀏覽器會出現預設的訊息回饋，這類訊息無法更改 CSS 樣式設定，各家瀏覽器的顯示方式也會不同，僅能用 JavaScript 來自定義訊息的文字內容。Bootstrap 有建議可以在表單加上 novalidate 屬性取消預設的驗證訊息，再用 JavaScript 阻擋表單送出來觸發自定義的驗證回饋。

每個欄位依據 [約束驗證 API][0] 判斷的結果會加上 :valid 或 :invalid 的偽元素，這兩個偽元素預設沒有任何的樣式設定，需要自行撰寫 CSS 樣式。
```scss
input:valid {
  border-bottom: 1px solid green;
}
input:invalid {
  border-bottom: 1px solid red;
}
//驗證通過的欄位會顯示綠色的下底線，沒通過的則是紅色的下底線
```
當欄位綁上偽元素後，只要一改變值，就會驗證輸入是否正確，正確就換成 `:valid`，錯誤則反之，因此 CSS 樣式也能即時改變顯示。而 Bootstrap 也利用這點加上自訂的錯誤訊息 div，只要欄位有綁上 `:invalid`， div 的 display 就會改成 true，用這方式來顯示錯誤訊息。

![blog images](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/2018-07-16-the-F2E-week6-validation.jpg?alt=media&token=4d6d10de-9365-4675-a0a3-29d049425e5c "約束驗證 API property")
DOM 元素 input 的 `validity` 屬性會顯示約束驗證的結果，結果要全部為 false 欄位才會判定為 `:valid`，但這些屬性的結果是依照 HTML5 提供的驗證屬性來判斷，如果今天要做的判斷無法從上述方式獲得結果，就要用到 **客製化驗證 setCustomValidity()** 這個功能啦~
只要 setCustomValidity() 有填入內容，該 input 的 validity.customError 就會等於 true，反之填入空字串的話，validity.customError 就會等於 false，用這樣的方式來自行下 if else 判斷是否驗證通過。

以這次主題的 "Confirm Password" 欄位為例，就可以寫成:
```js
//Confirm Password input
if(confirmPassword.val !== password.val){
  confirmPassword.setCustomValidity('not match'); //只要有輸入內容就表示驗證失敗
}else{
  confirmPassword.setCustomValidity(''); //輸入空字串表示驗證通過
}
```

約束驗證也提供了回傳表單驗證結果的功能，要知道表單中的欄位是否都驗證通過，可以調用 `checkValidity()` 這個 method，結果會回傳布林值，true 表示驗證通過。checkValidity()可以用在 form 元素檢查整個表單，也可以用在 input 檢查單一欄位。
```js
console.log(form.checkValidity());
```

[0]: https://www.w3.org/TR/html5/sec-forms.html#the-constraint-validation-api

作品網址: <https://kakadodo.github.io/theF2EChallange/validation.html>

以上內容如有勘誤，還請不吝告知🙇
