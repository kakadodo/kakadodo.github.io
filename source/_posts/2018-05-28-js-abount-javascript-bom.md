---
title: 這個朋友必交! 關於 JavaScript 的眉眉角角 - 7.BOM
keywords:
  - JavaScript, 瀏覽器 BOM,
categories:
  - JavaScript
tags:
  - JavaScript
thumbnailImagePosition: left
date: 2018-05-28 08:31:19
thumbnailImage: https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20180319-js-about-javascript.jpg?alt=media&token=68f6351d-34bc-45bf-ae3f-9671da27b39d
---

BOM(Browser Object Model) 是指各家瀏覽器提供 JavaScript 對自身進行操控的物件，當然這樣的前提下，每家瀏覽器的元素名稱可能就會不同(有些人就是愛特立獨行..)
但大部分還是照共同的規範來實作功能，不然開發者會太煎熬......
<!-- more -->
![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20180319-js-about-javascript.jpg?alt=media&token=68f6351d-34bc-45bf-ae3f-9671da27b39d "這個朋友必交! 關於 JavaScript 的眉眉角角")

但要怎麼存取 BOM 物件咧?其實 window 就是 BOM 定義中最頂層的物件，一些好用的物件元素都歸屬在 window 之下。
下面提供一些比較常會用到的 BOM 元素:

1. window.history
  history 物件主要跟瀏覽器的瀏覽紀錄有關，就是平常會在瀏覽器上按"上一頁" or "下一頁"這類的功能。
  - `history.back()`
    回到瀏覽紀錄的上一頁
  - `history.forward()`
    如當前瀏覽紀錄中有下一頁的話，可以再跳到下一頁
  - `history.length`
    可以得知目前瀏覽紀錄的總長度

2. window.localStorage / window.sessionStorage
  瀏覽器預設會有 localstorage / sessionStorage 的資料空間來存放使用者的資料紀錄，藉由設定這個資料庫便可抓取紀錄來使用，只要資料沒被刪除或是瀏覽器沒關掉，紀錄會一直儲存著。

  而 loacalStorage 和 sessionStorage 的差異主要在於資料保存的時間長度，localStorage 儲存的紀錄除非特地去刪除(用程式 or 於瀏覽器的開發人員工具手動刪除)，不然可以一直保存著。但 sessionStorage 就只會在瀏覽器還開啟的狀態下保存資料，當瀏覽器關閉後，該資料也會被清除。
  - `localStorage.setItem('key', data)`
    儲存資料到 localStorage 中，第一個參數是這筆資料的 key 命名，第二個參數就是資料的內容囉!資料格式必須是字串，因此常搭配 `JSON.stringify()` 使用。
  - `localStorage.getItem('key')`
    取得 localStorage 的資料，這時就會用到設定的名稱，藉由這個名稱來找到相對應的 data。取出的 data 格式是字串，因此常搭配 `Json.parse()` 使用。
  - `localStorage.removeItem('key')`
    刪除資料，一樣是藉由 key 來找到要刪的資料
  - `localStorage.length`
    可以得知目前 storage 的資料筆數
  
  sessionStorage 其實跟 localStorage 的使用方式一樣，就...自行換字吧 \_(¦3」∠)\_

3. window.document
  看起來是不是很眼熟!! DOM 元素本身也包含在 BOM 之中啊啊啊啊啊~~一個包山包海的概念。DOM 之前寫過這邊就不贅述啦...

4. window.location
  取得瀏覽器當前的連結資訊
  - `location.href`
    這個也算滿常用的~用 JavaScript 的方式來進行轉址，跟用滑鼠點擊 a 連結後轉址一樣。

5. window.navigator
  取得瀏覽器本身的資訊，有在處理瀏覽器版本兼容的應該都不陌生..可以藉由取得它的資訊來判斷使用者的瀏覽器版本為何。
  - `navigator.userAgent`
    瀏覽器的版本資訊，像自己目前用的是 chrome，用上述方式取得的資料就是:
    "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36"
    得到的內容會是字串，每家瀏覽器得到的結果都會長這種格式，只是內容不同，這時要判斷就可用正規式等方式來拆解字串啦!這部分爬一下 Stack Overflow 會有很多佛心的大大提供寫法。

6. 取得瀏覽器尺寸大小 / 滑鼠位置 / 捲動位置的功能
  - `window.innerWidth` / `window.innerHeight`
    可取得當前視窗畫面範圍的寬高，範圍不包含瀏覽器的導覽列喔!
  - `window.outerHeight` / `window.outerWidth`
    可取得當前瀏覽器整體的寬高
  - `window.screen.width` / `window.screen.height`
    可取得螢幕裝置的寬高
  - `window.screenX` / `window.screenY`
    滑鼠座標相對於螢幕左上角的 X 與 Y 值
  - `window.pageXOffset` / `window.pageYOffset`
    網頁水平捲動及垂直捲動的距離

7. 三個超實用小功能
  - `window.alert()`
    初期寫到爛的警告視窗XD，平常都直接寫 `alert()`，但其實他也是 window 下的一個方法喔!
  - `window.open(URL, name, specs, replace)`
    開啟新視窗，有四個參數可以代入，預設 URL 就可以了~
    第二個參數是指定瀏覽器開啟視窗的方式，例如 `_blank` 另開新視窗。
    第三個參數則是針對開啟的視窗是否要另外做設定，像是要不要顯示網址列啊，或是開啟後要不要直接全螢幕之類的，相關參數都可以從 W3C 找到。
    最後一個參數則跟瀏覽紀錄有關，寫 true 的話新視窗的紀錄會取代原本頁面的紀錄， false 的話則會另外新增一筆新視窗的瀏覽紀錄。
  - `window.print()`
    呼叫瀏覽器的列印功能。
    可惜的是無法對瀏覽器的列印模式做更進階的操作...之前做網頁轉存 PDF 那個案子時就一直在賭爛這件事XDD

在使用 window 物件時，window 本身是可以省略不寫的喔!像 window.alert() 寫成 alert() 馬欸通~

咦我這篇完全沒在寫程式碼耶...難得!

以上內容如有勘誤，還請不吝告知🙇