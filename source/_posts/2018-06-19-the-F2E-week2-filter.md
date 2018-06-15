---
title: The F2E - 前端修練精神時光屋挑戰系列 - Week 2. filter
keywords:
  - filter, Vue, Google Map, UI
categories:
  - the F2E challenge
thumbnailImagePosition: left
date: 2018-06-19 10:39:39
thumbnailImage: https://kakadodo.github.io/theF2EChallange/img/week2.jpg
---

前端修練精神時光屋第二週的題目是 filter 篩選器，這次是自己規劃 UI 跟篩選主題，會有這樣的動力不外乎是近期要領新車啦!!好期待XD
<!-- excerpt -->

![blog image](https://kakadodo.github.io/theF2EChallange/img/week2.jpg "Week 2. filter")

我選擇的篩選器主題是 gogoro 的電池站查找，gogoro 很佛心有提供電池站資訊的 open data，做完剛好自己用的到~整個一舉兩得!
(雖然官方app就可以找站點了 XDD)

### 使用者故事:
一個好的服務都會有個強大的篩選功能，方便客戶篩選搜尋出想要的資料，舉凡旅館、活動、電商、線上課程皆能觀看到其應用。
開發者們可以自行尋找 OPEN API 或 JSON 假資料練習資料篩選功能。

### 運用技術:
- Pug (html模板語言)
- SCSS (css預處理語言)
- Vue (前端框架)
- Google Map API

### 挑戰心得:
既然要篩選器，就要先對 open data 研究一番才行，gogoro 的 [API](https://wapi.gogoro.com/tw/api/vm/list) 滿好懂~參數的內容大致如下:
- Id:站點ID
- LocName:站點名稱
- Latitude:站點緯度
- Longitude:站點經度
- ZipCode:郵遞區號
- Address:地址
- District:行政區
- City:縣市
- AvailableTime:站點營運時間
- AvailableTimeByte:null

而自己規劃的篩選內容有 **站點名稱**、 **縣市/行政區** 以及 **營運時間**，當點擊站點後，可打開地圖查看所在位置，因此上面的參數幾乎都用的到~
不過某幾個參數因為有關聯到中英文版本的問題，所以屬性值又會是一層子物件，在解析時需要多做一次 JSON 格式的轉換。

資料結構確定後，就是把 UI 繪製出來~說來慚愧...這好像是我第一次真正乖乖地做 Wireframe，發現有做真的有差，繪製的同時可以順便思考切版會不會有問題，或是之後串互動是否合理，有助於開始切版的速度跟順利程度 XD
UI 連結: <https://goo.gl/ze2YR7>

這次用 Vue.js 前端框架，其實跟它還不太熟，用起來會卡卡需要邊寫邊查官網 document，也暫時略過 component 這個大坑!不過也因此展現出 Vue 的好用性與淺力!!沒用 CLI、沒用 component 還是可以寫出一個小應用!!! (◔౪◔)
使用前端框架的好處就是可以數據來驅動畫面，Vue 剛好也是以這個特性作為出發點，整個功能寫下來，其實不太需要另外針對元素加 id 監聽，直接在模板做 data 跟 event 綁定即可。想到上一週用 jQuery 一個一個乖乖下監聽就覺得很煎熬...

而這次對我來說最困難的不是篩選，而是資料頁面呈現的頁數切換!!之前沒寫過 pagination..只能自己想像邏輯要怎麼寫才能呈現想要的功能，雖然勉強做出來了....但就是怪 =..=

既然要做電池站點查找，當然就需要地圖的功能啦!不外乎就是套用 Google Map 的 API，記得之前上六角課程時初碰 Google Map API 真的很驚，文件都已經中文了..看的還是一知半解。想不到這次再看文件卻覺得意外上手，物件導向真的要搞懂呀!!!
對物件導向有觀念的話，其實它的 API 很簡潔有力!基本上要呈現甚麼功能，就是新增那個功能的物件實例出來，而功能的細部設定則當作 option 參數帶入即可!所以這次就花了一點時間做了地圖顯示的自訂 icon，以及 infoWindow 的客製化內容。

做好做滿~再來就是等新車來啦!!!期待ing~~
作品網址: <https://kakadodo.github.io/theF2EChallange/filter.html>


以上內容如有勘誤，還請不吝告知🙇
