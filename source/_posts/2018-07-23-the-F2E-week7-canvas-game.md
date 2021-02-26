---
title: The F2E - 前端修練精神時光屋挑戰系列 - Week 7. Canvas Game
keywords:
  - canvas
categories:
  - the F2E challenge
thumbnailImagePosition: left
date: 2018-07-23 08:49:11
thumbnailImage: https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/2018-07-23-the-F2E-week7-canvas-game-4.jpg?alt=media&token=4b2fb2c5-136b-4a3a-be1a-1a272119d1cd
---

我被擊敗惹~~~你是擊敗人!!!(黃明志歌播放中---)
這次敵人太強大了，居然是 canvas 的遊戲........
<!-- excerpt -->

平常根本沒在碰 canvas..只能說~這次真的被擊敗了 XDDD
勉強生出個靜態頁面可以當作切版過關，但心中已認定這次挑戰失敗惹 QQ
只能期待未來的自己把遊戲真正做出來...

設計稿: <https://bit.ly/2xDwA4W>

## 使用者故事:
給我生出個 canvas 射擊遊戲!!!

## 運用技術:
- JavaScript canvas
- ai2canvas plugin

## 挑戰心得:
既然沒做出來~乾脆來介紹這次用的神奇插件 😆😆😆
要在 canvas 上作畫，需要將繪製的物件利用數學的點、線、面三種方式來完成。也就是說我們需要用 JavaScript 一行一行把物件畫出來!對於數學邏輯有障礙的人如果碰到複雜的圖形一定會想哭的啊..

而這次用到的 Illustrator 插件 [ai2canvas][ai2canvas]，它可以將 ai 轉檔成 canvas 格式的 html 文件。轉出後的 html 檔，插件已經幫你把畫面用 canvas 畫出來。對於習慣靠雙手直接在畫布畫圖的人來說就可以輕鬆的畫自己想要畫的圖，再讓插件幫你自動生出 canvas 的程式碼。

但在繪製時要注意每個物件需要用不同的圖層來建立，插件會依據圖層給的參數去生成 function 來繪製圖形，如果不小心把物件A的局部畫到物件B 的圖層上，那 code 在產生時會變成繪製物件B時才補上物件A的那個局部素材喔...靜態看起來是沒差，但如果要動的話就會出現無法預期的錯誤。

圖層怎麼設定參數可以參考作者提供的教學影片。生成出來的 canvas 圖型會用一個個 function 作包裝。作者其實也有提供寫參數的方式來做出簡單的動畫..但基於對 canvas 還不甚了解且參數也要詳細看作者的 api 怎麼寫..我就略過這塊了 XD 
光靠 ai 就可以生出 canvas 這點覺得超厲害耶，越來越多自動化工具了...工程師以後還能生存嗎QQ

轉出的 html 原始碼，還是要 double check 一下，雖然畫面上顯示正常，但 code 由於是自動產生的關係，難免會出現一些簡單圖形卻用複雜的寫法去完成的 code，所以我還是自己整理了一下，把物件都放好好在 function 中，再批次去呼叫這些物件的函數來繪製他們。

下方為簡單的示範步驟:

1. 安裝好插件後，開啟 Illustrator 建立一個新文件，尺寸會是你實際要呈現的 canvas 畫布尺寸。
![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/2018-07-23-the-F2E-week7-canvas-game-1.jpg?alt=media&token=8d381d35-a26c-46f9-b0dd-f8847380b84a "step 1")

1. 依據物件來產生圖層，並將圖層命名成 function `name();`。以下圖為例總共建立了三個圖層: `background();`、`ship();`、`enemy();`。每個物件都繪製在自己的圖層中。
![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/2018-07-23-the-F2E-week7-canvas-game-2.jpg?alt=media&token=9e93b6c8-c402-4797-bb02-d07b5674476c "step 2")

1. 轉存時，選擇 檔案 -> 轉存 -> 轉存為 -> 存檔類型選擇 `<canvas>`，之後就會在指定的資料夾產生 html 文件。(可能產生繪製不出來的 png 圖)
![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/2018-07-23-the-F2E-week7-canvas-game-3.jpg?alt=media&token=16889cef-7e07-48e7-b90e-baa2ec107fe1 "step 3")

1. html 檔打開就會看到生成好的 canvas 啦!!!整個無違和~
![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/2018-07-23-the-F2E-week7-canvas-game-4.jpg?alt=media&token=4b2fb2c5-136b-4a3a-be1a-1a272119d1cd "step 4")

1. 檢查原始碼可以發現，插件會依照命名產生相對應的 function，並在 function 中描繪 canvas 圖形，再於 `init()` 調用這些 function 把圖形繪製出來。
![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/2018-07-23-the-F2E-week7-canvas-game-5.jpg?alt=media&token=4d8c2d2c-5a6f-4876-891d-960a0e92938e "step 5")

1. 如果轉出時有產生 png 圖檔，插件會以載入的形式把圖檔放到 html 中，再用 canvas 去抓圖檔作繪製。
![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/2018-07-23-the-F2E-week7-canvas-game-6.jpg?alt=media&token=909ac729-d058-42d7-9462-03a0facbb7af "step 6")

單純的 canvas 繪圖，用這套插件一下就可以做出來了~超方便!不過如果是要作遊戲或者比較複雜的動畫，感覺還是用遊戲框架或是自己手寫比較好...之前在嘗試時就發現即使是簡單的圓形，插件可能會選擇以 curve 繪製的方式來取代 arc。看到時還困惑我到底是畫了甚麼複雜的圖XDD

[ai2canvas]: http://blog.mikeswanson.com/ai2canvas
作品網址(不負責的純開始畫面): <https://codepen.io/chelseac/pen/WKrKwa>

以上內容如有勘誤，還請不吝告知🙇
