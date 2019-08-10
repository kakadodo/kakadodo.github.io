---
title: The F2E - 前端修練精神時光屋挑戰系列 - 2nd Week 5. 90sec Game
keywords:
  - 線上支付, Vue.js, VeeValidate
categories:
  - the F2E challenge
thumbnailImagePosition: left
date: 2019-08-03 20:00:00
thumbnailImage: https://kakadodo.github.io/theF2EChallange/img/2nd-week5.jpg
---

這次作完整個感觸良多...一直覺得 Canvas 是一種惡夢..
上一屆的 Canvas 遊戲沒有作出來覺得遺憾，這屆該來的還是來了
經過一年耍廢成分較多的經驗累積(?)，終於試著用 Canvas 把遊戲寫出來啦~~
超想衝出家門大喊喔屋喔屋喔----
<!-- excerpt -->
![blog image](https://kakadodo.github.io/theF2EChallange/img/2nd-week5.jpg "Week 5. 90sec Game")

## 使用者故事:
1. 我可以在網頁介面，直接開始新回合遊戲
2. 我可以操控電腦鍵盤，來操控遊戲主角與遊戲介面
3. 當滿足破關條件，可以看到破關畫面，並重新開始遊戲

來自 公羽 的[設計稿](https://challenge.thef2e.com/user/1729?schedule=3661)，黃色小鴨應該是大家童年共有的回憶吧 QQ 含淚寫 code

## 運用技術:
- [Phaser 3](https://phaser.io/) (遊戲框架)

## 挑戰心得:
這一年有稍微花時間看一下 Canvas 的遊戲框架，其中主流有試著摸索的是 Create.js 及 Phaser.js。
Create.js 對於有在接觸 Animate CC 的開發者算是很便利的開發框架，可以先在 Animate CC 建構視覺畫面，之後藉由軟體輸出自動產生對應的 HTML5 Canvas 檔案包。不過學習成本就會有軟體本身的操作 + Create.js 比較核心的語法要學習。且因為一部分設定在軟體中的關係，一但要修改就要重新輸出，然後再整理輸出的檔案。當然也是可以純用 Create.js 自己一步一腳印的刻啦~

Phaser.js 則是基於另一套 Pixi.js 延伸出來"較為容易理解"的遊戲框架，官網有附一個快速建立遊戲畫面的範例說明，在看範例時真的會覺得"哇\~居然這樣就可以寫出遊戲喔!?"的讚嘆感，但實際使用後，會很想問其他開發者為什麼可以看得懂官網的 API Document...史上無敵難懂沒有之一，我在想可能要本身就是在寫遊戲的才會知道為什麼文件要那樣分類...全部都是最原始的建構式說明，是要初心者怎麼知道實際運用的語法啦~~😭因為之前有看過一些教學影片，大概知道基礎寫法，就抱著不然邊寫邊摸索吧的無奈心情開始了我的 Phaser 建構過程。

Phaser 目前是 3.x 版本，但市面上大多教學是 2.x 版本為主，中文教學甚至少到不如直接靠 Google 翻譯(雖然翻譯了也很難懂 XD)，而且兩個版本之間算是有大改，語法雖然很像，但呼叫語法的物件卻不一樣..如果之前是學 2.x 版本的語法，可能會一直不斷被瀏覽器用紅字嗆聲，我自己在寫的同時，是先搜尋 Phaser 的範例看有沒有人寫類似的功能，找不到就直接 google stackOverflow，最後才是鬼打牆的翻閱 API 文件，雖然這一系列的過程很折磨...但確實現在對它是了解了不少(我寶貴的休假時間啊~)。

雖然上面一直在抱怨 Phaser，但為何會選擇用它主要是因為它在實際撰寫語法時是真的滿簡易的，例如對遊戲開發來說很重要的資源 preload，如果是 create.js 的話，需要使用它的 preload.js 來達成，語法有點複雜...但 Phaser 就真得很直白，要 preload 的話，就寫在 preload 的 hook 中，要 load 圖，那就寫 `this.load.image()`，算是可以滿好照著直覺寫的語法。

在 Phaser 的世界中，除了建立遊戲本體外，最主要的物件就是 Scene 場景，基本上一切遊戲邏輯、資源素材都是建構在 Scene 中，Scene 有幾個常用的 hook 作為運行遊戲的重要關鍵。
- Init: 初始化設定，跟遊戲環境有關的會在這邊先設定
- Preload: 資源載入區，要用甚麼都在這 load 就對了
- Create: 場景創建，會在 preload 完成後觸發，因此會在這把要用到的物件加到場景中顯示
- Update: 場景畫面更新，更新頻率是基於 Phaser 內建的 Timer，不需要自己手動建立 timer，反正把要更新的邏輯寫在這裡就會每毫秒去執行

基本上上面這四個 hook 就很夠用了~其他比較 detail 的設定就看使用需求決定，例如 physics 物理引擎、emitter 自訂發射器、Group 群組與 Container 容器等，
- Group: 方便將相同類型的物件集合在一起，要使用時就能以 Group 去遍歷裡面的每個 children 作設定。
  (例如畫面上要出現隨機位置的敵人，這些敵人就可以包成一個 Group 一次設定)
- Container: 跟 Group 有點差異，也是將物件集合在一起，但它不會提供 children 遍歷，因為內部的元件可能是不同類型的物件，比較適合用來包裝 UI 元素用。
  (例如一個 Container 中會有一個 button 底圖及按鈕要顯示的文字，這樣可以組合成一個完整按鈕)
- emitter: 自訂監聽事件的概念，有學 Vue 的話應該不陌生(子組件往外層傳遞資料的方式 :D)
- physics: Phaser 內建的物理引擎，可以設定物件有重力、速度、碰撞檢測等功能。

動畫方面也有 Animate 跟 Tweeen 可以使用，兩者差異在於:
- Animate: SpriteSheet 才有的功能，其實就是設定一段範圍的影格，然後讓它 play 起來，視覺上就會像動畫在動。
- Tween: 物件的漸遍過程，例如 3 秒內從現在 A 位置移動到 B 位置，或是透明度從 0 到 1 之類的，其實就像 CSS 的 transition 啦!

使用者互動方面其實就是下監聽器，監聽的事件觸發後，去改變遊戲物件的屬性，event 類型跟 JavaScript 差不多，只是有些用詞會不太一樣，例如點擊事件會切分成 pointerDown 跟 pointerUp。

另外如果有其他計時需求的話，Phaser 也有提供 Timer 可以創建，這和遊戲本體的 update Timer 是區別開的，可以分別記時，計時器也可以分成單次及無限循環。

當遊戲內容慢慢變大時，就可以考慮是不是要切分場景，以這次的挑戰賽來說，我自己是分成兩個場景，一個用來 loading，一個用來跑遊戲內容，因為內容邏輯都包裝在 Scene 底下，因此可以很方便的拆分不同型態的場景來呼叫。一般來說遊戲會用到的場景有:
- loading: 專門 load 資源用，可以在此場景中顯示資源載入的進度資訊，load 好的資料在下一個場景中就能馬上使用喔!
- home: 遊戲的開始畫面，就像平常玩 app 遊戲時一打開時會顯示的畫面
- game: 遊戲進行的場景，就是放主要的遊戲內容啦!
- gameover: 遊戲結束的畫面，可用可不用啦~懶一點就直接寫在 game 裡 XD

場景之間的切換也非常簡單，只要先把有用到的場景 key name 都先提供給 Phaser.Game 本體，之後在於想要的時刻執行 `this.scene.start('sceneName')` 即可!

Phaser.Game 本體的 config 也可以設定很多重要的東西，像是要用 Canvas/WebGL 模式、畫面大小、指定 physics 系統、畫面自適應縮放等，總之就是..要甚麼功能應該都有，但就是要找 XDD

雖然自己寫的好像很容易一樣，但製作過程中狂碰雷啊~尤其是 physics 設定那邊實在很煩，有些屬性是要下在 sprite 身上才行，有些又是下在 Group 就可以用，搞得我整個在亂下指令😑
最後也只能依據瀏覽器的回饋來一個一個修正到能完全運行...哀 真的心累。


作品網址: <https://kakadodo.github.io/theF2EChallange/90sec-game.html>

以上內容如有勘誤，還請不吝告知🙇
