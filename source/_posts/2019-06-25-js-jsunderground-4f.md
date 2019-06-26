---
title: JS 地下城挑戰心得 4F - 時區
keywords:
  - JavaScript, JS 地下城
categories:
  - JavaScript, JS 地下城
tags:
  - JavaScript, JS 地下城
thumbnailImagePosition: left
date: 2019-06-25 14:00:00
thumbnailImage: https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20190625-js-jsunderground-4f.jpg?alt=media&token=a246df01-1436-4d58-a9f2-e72d2ce080ec
---

這回的地下城主題不陌生，但試著用了比較稱得上"工程師"的方式來撰寫(以前寫法真的好傻好天真..)
途中也 google 了不少資料，覺得自己對這塊又更熟悉了，真心感謝這個練功機會呀~~
<!-- excerpt -->
![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20190625-js-jsunderground-4f.jpg?alt=media&token=a246df01-1436-4d58-a9f2-e72d2ce080ec "JS 地下城挑戰心得 4F - 時區")

[六角學院提供的設計稿連結](https://xd.adobe.com/spec/6f0eb277-9976-489c-5668-95757eccfa55-193f/screen/e900dd75-7b6c-4a48-bbd6-789c4e100856/007-world-clock/)

## 運用技術:

- Vanilla JavaScript

## 挑戰心得:

>"天啊! Moment.js 也太好用了吧!"

這次感觸最深的心得結語 XDDDDD

只能用原生 JavaScript 來寫的話，就要乖乖去 MDN 爬文了，雖然寫法可能會比較複雜，但總會有那麼個方法是可以提供時區轉換的吧???
抱著對 JavaScript 莫名的信心，果真找到相關的方法了，其實原生 `Date()` 物件就有提供時區轉換的功能:
- [Date.prototype.toLocaleString()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString) 轉換當地日期跟時間
- [Date.prototype.toLocaleDateString()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString) 轉換當地日期
- [Date.prototype.toLocaleTimeString()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleTimeString) 轉換當地時間

這三個方法都可以額外帶兩個參數進去，第一個參數是"當地顯示格式(locale)"，第二個參數則是"格式的詳細設定(options)"

舉例來說:
英國(en-BG)預設顯示日期的格式會是 `日/月/西元年, 時:分:秒 (24小時制)`
而台灣(zh-TW)則是 `西元年/月/日 時/分/秒 (12小時制)`

不同國家有其預設的格式，locale 就是可以指定要以哪個國家的格式作顯示。當然這個格式可以再作進一步的調整，像是月份要用數字或英文顯示，時間要用 12小時還是 24小時顯示，時區是取當地時間或是有特別指定哪個時區等等，比較細部的設定就會設定在第二個參數 options 中。

至於語系預設的格式長怎樣，各城市的 country code 是什麼，就只能靠 google 了，此次設計稿剛好跟 MDN 提供的範例 "英國" 很像，所以自己在寫 code 的時候就直接拿 en-BG 來用(感謝設計師通情達理)，直到現在在寫心得才認真去找一下參考，最後找到以下兩個參考來源:
- [Date format by country - Wikipedia](https://en.wikipedia.org/wiki/Date_format_by_country)
  維基百科有歸納各國的日期格式，也有列出標準規範的日期格式代表的意義
- [country_date_formats - by mlconnor, Gist](https://gist.github.com/mlconnor/1887156)
  好心的國外大大整理的日期格式列表，內容還包含了各城市的語系及 country code

除了語系代碼之外，還要知道各城市的 time zone 名稱，這樣才能設定到 options 中，讓日期轉換成指定 timezone 的時間。
- [List of Time Zones - timezonedb](https://timezonedb.com/time-zones)
  列出各國城市的 time zone 名稱，以台灣為例，time zone 名稱就是 `Asia/Taipei`

有了以上這些資訊就可以順利完成這次的挑戰啦!

<br>

#### 關於 UTC 及 GMT

- UTC 世界協調時間（Universal Time Coordinated ）
- GMT 格林威治標準時間 ( Greenwich Mean Time )

雖然是兩種不同計算時間的方法，但所得的結果相差微小，因此大多會將兩者視為相同，例如 Chrome 瀏覽器取得的 Date 內容是用 GMT，IE 則用 UTC 表示，兩個瀏覽器同時取得本地時間都是一樣的(台灣 GMT+8/UTC+8)。關於兩者的詳細介紹可以參考這篇 - [到底是 GMT+8 還是 UTC+8 ?](https://pansci.asia/archives/84978)

<br>

#### JavaScript 如何取得 UTC/GMT 時間

Date() 物件有提供以下幾種方式可以取得 UTC 國際標準時間(依 time zone 不同，結果可能與本地時間不同)
```js
.getUTCDate() // 從 Date 物件返回一個月的某一天( 1 ~ 31 )。國際標準時間
.getUTCDay() // 從 Date 物件返回一周的某一天( 0 ~ 6 )。國際標準時間
.getUTCMonth() // 從 Date 物件返回某月( 0 ~ 11 )。國際標準時間
.getUTCFullYear() // 從 Date 物件返回 4 位數年分。國際標準時間
.getUTCHours() // 從 Date 物件返回小時( 0 ~ 23 )。國際標準時間
.getUTCMinutes() // 從 Date 物件返回分鐘( 0 ~ 59 )。國際標準時間
.getUTCSeconds() // 從 Date 物件返回秒鐘( 0 ~ 59 )。國際標準時間
.getUTCMilliseconds() // 從 Date 物件返回毫秒( 0 ~ 999 )。國際標準時間
```
上述方法把 get 換成 set 的話則可以設定某個時段的 UTC 時間。
除此之外也可以使用 `toUTCString()` 將 Date 物件轉換成 UTC 的完整時間格式。

<br>

#### 何謂 TimeStamp?
TimeStamp 中文譯為 "時間戳"，表示某一個時刻以毫秒為基本單位加總起來的數字。Date 物件中有個 `getTime()` 的方法可以取得時間戳，而時間戳的計算其實是從國際標準時間 **1970 年 1 月 1 日 0 點** 至今的毫秒數。因此我們也可以利用時間戳來轉換成一般的日期格式作顯示。
```js
// 假設時間戳為 1561453601031
var getDate = new Date(1561053601031);
console.log(getDate); // Fri Jun 21 2019 02:00:01 GMT+0800 (台北標準時間)
```
TimeStamp 非常好用，因為格式就是一串數字，所以方便儲存(資料庫儲存時間通常都會轉換成時間戳)，也很常拿來當作檔案名稱的 Hash Filename，可以避免檔名重複，作用於網頁上時也是避免瀏覽器快取檔案的方式之一。

Codepen 作品:
<iframe height="735" style="width: 100%;" scrolling="no" title="JS地下城 - 4F 時區" src="//codepen.io/chelseac/embed/mZwGRO/?height=735&theme-id=0&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/chelseac/pen/mZwGRO/'>JS地下城 - 4F 時區</a> by Chelsea
  (<a href='https://codepen.io/chelseac'>@chelseac</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

以上內容如有勘誤，還請不吝告知🙇