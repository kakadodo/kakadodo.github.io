---
title: The F2E - 前端修練精神時光屋挑戰系列 - Week 1. todolist
keywords:
  - todolist, jQuery, localStorage
categories:
  - the F2E challenge
thumbnailImagePosition: left
date: 2018-06-11 10:39:39
thumbnailImage: https://kakadodo.github.io/theF2EChallange/img/week1.jpg
---

最近參加了[六角學院](http://www.hexschool.com/)主辦的 **the F2E 前端修練精神時光屋** 活動，共 9 週的前端主題挑戰..
真心感謝洧杰老師的無敵挖坑大法~才能有機會挑戰自己 XD
<!-- excerpt -->
簡單介紹一下活動，活動宗旨就是讓大家能夠運用所學的技能把主題做出來，每周主題都不同，也可以運用不同的技術來完成。
會提供的內容有 主題、使用者故事及 UI 畫面，其他的就是各自發揮啦~
雖然挑戰成功的界線在有完成 CSS 切版即可..總覺得踏入前端後，強迫症的行為更嚴重了 =..= 忍不住就想把功能也做出來哈哈

![blog image](https://kakadodo.github.io/theF2EChallange/img/week1.jpg "Week 1. todolist")

第一週的主題是 todolist，雖然這題目真的做好多次了 XD 但是做完還是花了不少時間...

## 使用者故事:
1. 能夠紀錄每天的待辦事項
2. 可標示每個待辦優先重要級別，預設為無。
3. 可拖拉待辦事項，調整排序。
4. 每筆待辦可新增時間提醒 (yyyy/mm/dd hh:mm)
5. 每筆待辦可再填寫評論與附加檔案
6. 待辦狀態：全部顯示(預設)、待處理、已處理
7. 待辦事項過多時，需考量內容是否需要折疊

這次時間比較不夠，沒有自己想 UI，盡可能重現原本[設計稿](https://bit.ly/2HfaR2M)的樣子。
使用者故事也盡量做到都有..只差在 file 的檔案上傳是個空殼 XDD 實際不會有任何存檔的功能。

## 運用技術:
- Pug (html模板語言)
- SCSS (css預處理語言)
- jQuery (主要的 js 應用)
- HTML5 localStorage (資料庫儲存)

## 挑戰心得:
切版方面搭配 flexbox 其實咻咻咻一下就可以完成了!比較特別的使用方式應該是列表的一些小功能顯示吧!因為要讓每筆清單都可以有自己的操作(編輯、設為重要、已完成等..)，所以會有幾個按鈕的操作顯示切換，這塊我是使用 checkbox 來達成，但後期有衍生一些小問題出來..

首先 checkbox 要以自訂樣式來呈現，所以使用了 `-webkit-appearance: none;` 來取消瀏覽器預設的 checkbox 樣式，CSS 有針對 checkbox 的 :checked 狀態來做外觀上的顯示切換，本想說到時再搭配 jQuery 判斷當下的狀態是不是 checked ，再決定要執行哪一部指令就好。結果在撰寫時才發現， cehckbox 的 checked 狀態改變需要透過實際操作觸發才會真的有效果....因此我用 jQuery 來動態改變屬性值時，checked 的值確實有改變，但 CSS 外觀不會變....囧rz

最後只好改寫用 class 來改變這個 checkbox 的狀態了，整個沒事找事做啊我! (;´༎ຶД༎ຶ`)
看了志誠老師的直播，他是用 label 去呈現樣式，input 則設為隱藏僅做為功能上的判斷...這招學起來下次再試試看!

功能撰寫則是使用 jQuery 來達成，前陣子都在學 Vue 的關係..思維上稍微有點改變，回歸 jQuery 時一度卡到陰 XD
不同於 Vue 的宣告法，jQuery 是命令式的指令...要給他一步一腳印地去實行，寫到一度想棄 code..
資料是存放在瀏覽器的 localStorage，setItem 跟 getItem 就很夠用了~
規劃下來總共存放三種資料: 代辦清單陣列、排序陣列及一個用來累計清單筆數的資料。
會需要紀錄累計筆數是為了追加的 **刪除清單** 功能，因抓取清單的依據是它產生時的 id 索引，如果沒紀錄實際新建筆數的話，某筆清單被刪除要再增加一筆的話，可能就會有 id 重複的現象發生。

除此之外，這次也套用了 jQuery UI 的 sortable 套件來排序跟拖曳，之前沒做過拖曳排序的功能..剛開始還想說會不會做不出來，沒想到實際用了之後還滿簡單的 XD 人真的很愛自己嚇自己~

於是乎，完成品就這樣誕生啦!!!時間內交件鳩甘心 Q_Q

作品網址: <https://kakadodo.github.io/theF2EChallange/todolist>


以上內容如有勘誤，還請不吝告知🙇
