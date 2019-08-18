---
title: The F2E - 前端修練精神時光屋挑戰系列 - 2nd Week 6. Booking
keywords:
  - Vue.js, Element UI
categories:
  - the F2E challenge
thumbnailImagePosition: left
date: 2019-08-18 22:00:00
thumbnailImage: https://kakadodo.github.io/theF2EChallange/img/2nd-week6.jpg
---

有 API 串接的題目了!!!灑花~
<!-- excerpt -->
![blog image](https://kakadodo.github.io/theF2EChallange/img/2nd-week6.jpg "Week 6. Booking")

## 使用者故事:
1. 要幫一間旅館設計訂房流程
2. 不需進行會員註冊，只需填寫姓名、電話、預約起迄時間等三個欄位，就可進行訂房。
3. 可以觀看該房型詳細資訊，例如旅館描述、平日價格(一~四)、假日價格(五~日)、checkIn 時間、其他服務。
4. 客戶可以用日曆方式，瀏覽未來 90 天已預約與尚未預約的時段。
5. 客戶在選擇預約日期時，會即時顯示訂房價格總價
6. 若預約失敗，會回傳訊息讓客戶知曉，失敗原因項目如下: 預訂 90 天後、預約時間已被人預訂、預約的是過去時間，例如昨天


來自 Zoey 的[設計稿](https://challenge.thef2e.com/user/1461?schedule=3862)，金色配暗色調讓旅店很有高級感 🥰

## 運用技術:
- Pug
- Vue.js
- [Element UI](https://element.eleme.io/) (Vue 的 UI 組件庫)

## 挑戰心得:
感謝六角學院花時間心力開發 API，果然成品有串後端資料看起來就是不一樣 QQ
這次的題目雖然大眾化，但實際寫起來要注意的細節還真是不少..
在 API 呼叫這塊卡了好久，怎麼 call 都跳錯誤，好不容易終於 get 到資料了，要 post 時又繼續碰雷，實在是哭x。
碰雷的過程就不提了..下面放上最終可以運作的 code 就好。
我是使用 axios 來執行 Ajax，axios 可以預先定義要丟給後端的 Headers，這樣實際呼叫時就不怕忘記要附上的參數囉!
```js
// 初始創建 axios 實例
this.axios = axios.create({
  baseURL: 'https://challenge.thef2e.com/api/thef2e2019/stage6',
  timeout: 5000,
  headers: {
    Acctept: 'application/json',
    Authorization: 'Bearer xxxxxxxxxxxxx',
  }
});
// 用實例真正呼叫 api
this.axios.get('/rooms').then((res) => {
  if (res.data.success) {
    this.roomsInfo = res.data.items;
  }
});
```
因為有設定好 baseUrl，實際呼叫時只要填入正確的路徑即可，且 Headers 的資訊都幫你綁好好一起傳送過去了~超方便呀!!
post 的部分則需要加工一下，因為後端接收的格式無法用 JSON 物件直接傳入(我也搞不懂為何)，最後是包裝成 formData 後才送出成功。
```js
const bodyFormData = new FormData();
bodyFormData.append('name', this.formBooking.name);
bodyFormData.append('tel', this.formBooking.tel);
this.bookingTotalDates.forEach((date, i) => {
  bodyFormData.append(`date[${i}]`, date);
});
this.axios.post(`/room/${id}`, bodyFormData, {
  headers: { 'Content-Type': 'multipart/form-data' }
}).then((res) => {
  if (res.data.success) {
    // do something after success
  }
});
```
其中 date 的格式又比較特殊，多個日期的話需要用 array 的形式來傳遞，好險有想出來要怎麼寫 = =
而且這時才發現，Element UI 的 datePicker 回傳的值只有開始日及結束日，中間不會自動幫你補齊涵蓋的天數，但實際傳到後端時是需要全部提供的..所以還要另外轉換一包有完整日期的資料才行。
```js
// 這個方法會藉由 booking 的開始日及總共訂的天數來得出全部天數的日期
// 日期需要轉換格式符合後端要求
bookingTotalDates() {
  const startDate = new Date(this.formDate[0]).getTime();
  let dates = [this.formDate[0]];
  for (let i = 1; i <= this.bookingTotalDays; i++) {
    const dayTime = 1000 * 60 * 60 * 24;
    let newDay = new Date(startDate + (dayTime * i));
    const year = newDay.getFullYear();
    const month = (newDay.getMonth() + 1).toString().padStart(2, 0);
    const date = (newDay.getDate()).toString().padStart(2, 0);
    dates.push(`${year}-${month}-${date}`);
  }
  return dates;
},
```
滿心歡喜地做完後，想說來看看 RWD 要不要調整，不看還好，一看又是個無窮火海的改 code 地獄 XDDD

UI 框架會使用 Element UI 就是看在它的 dateRangePicker 還滿符合設計需求的，之前公司專案有使用過還算順手想說這次就拿來用，結果 dateRangePicker 在小螢幕的畫面給我直接破版 Q_Q (說好的響應式呢......)
最後的解法是在小螢幕尺寸把 dateRangePicker 拆成兩個單一日期選擇器來操作，因為 data 綁定的形式不同，要再針對兩個單一日期選擇器綁定別的 v-modal，日期驗證及即時顯示價錢變動也要改成兩邊的 data 都要顧。
做完，假日也掰了(遠目)
但 Element UI 還是滿好用的啦，組件功能很多，提供的客製化也有一定程度，下個 prop 值就可以把組件外觀做大調整，尤其是 table 組件可以調整的形式非\~\~常多!
form 表單也有提供驗證功能，擺我一道的 datePicker 也有提供 disabled 特定日期的自訂函式，總結來說，可以解決問題的框架就是好框架 XDDD


作品網址: <https://kakadodo.github.io/theF2EChallange/booking.html>

以上內容如有勘誤，還請不吝告知🙇
