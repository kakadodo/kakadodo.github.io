---
title: The F2E - 前端修練精神時光屋挑戰系列 - Week 9. Skill Tree
keywords:
  - javascript
categories:
  - the F2E challenge
thumbnailImagePosition: left
date: 2018-08-06 11:11:52
thumbnailImage: https://kakadodo.github.io/theF2EChallange/img/week9.jpg
---

最後一週最後一週最後一週了!!!!(灑花~~~
<!-- excerpt -->

![blog image](https://kakadodo.github.io/theF2EChallange/img/week9.jpg "Week 9. Skill Tree")

最後一週的主題，看到不知道該怎麼反應...應該說完全沒料到會有這種主題啊XD
技能樹只會聯想到玩遊戲要點技能點而已..居然會在前端碰到
但會有動力想把它做完多虧於那熟悉的介面感~~~欺騙自己可以邊玩遊戲邊寫 code

設計稿: <https://xd.adobe.com/spec/912f916f-0b05-49ae-66e8-b42b299c19b7-e71e/>

### 運用技術:
- Pug
- Flexbox
- Vue.js

### 挑戰心得:
這次的設計稿是 Adobe XD 的版本，雖然使用上滿不習慣的..但畢竟支援多平台!所以我要用支持鼓勵的心態去面對它!!
愛用 Adobe 的產品~希望 XD 功能可以越來越強大!

看完 workflow 後，大概有兩個方向去做，一個是版面雖然看起來整齊但層次有點給他豐富..這塊決定靠 flexbox 來解決!另一個就是這樣的主題如果要完成功能面勢必需要有資料呀呀呀~~~~所以在開始切版前花了一點時間在寫假資料..
![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/2018-08-06-the-F2E-week9-skill-tree-1.jpg?alt=media&token=03408c70-a995-40fd-b62e-3acf8e1214a9 "技能樹資料結構")
因為技能樹是有關卡限制的，需要先滿足前一關的所有推薦項目，下一個關卡才會開放，因此結構上面會先以各個大關卡做區分，之後再針對每一個項目設定"是否完成"的屬性，之後用 Vue 載入資料時，就可以跑迴圈去判斷當前這關是不是所有推薦項目都完成了!

版面使用 flexbox 雖可以快速達成設計稿的樣子，但在做的過程中有發現到一個問題，應該是我資料設定不佳XD，本來打算用 flex-wrap 屬性來排列每個技能格，但資料結構在設計時是以大關卡區分，關卡中的技能格就沒再另外做分支...如果用 flex-wrap 就無法達成設計稿要的排列順序(畫面上看起來技能格是每三個排成一排來顯示，但 javascript 區的第一排技能格卻只有兩個= =)。最後只好用途法煉鋼的方式來寫 Vue 的 html 模板，這件事告訴了我們資料結構規劃好，之後寫 code 沒煩惱。(?)

另外分享一個不怎麼厲害的小招數，有大概看了其他參賽者的完成品，但幾乎都略過對話框的圖示，自己在做這塊是用偷吃步的方式靠 illustrator 生成 SVG 圖後，再抓裡面的 code 貼到 html 中!此方式讓像我一樣無法通靈靠 code 畫出 SVG 的人也能輕鬆產出向量圖喔喔喔~~~雖然也可以直接貼 SVG 圖檔來用，但用成 code 的好處是可以在 CSS 中另外去設定他的樣式。

終於挺過這煎熬的 9 週啦!!!真心感謝六角學院提供這樣的機會來磨練自己~雖然寫的方式可能不是最佳的做法，但隨著每週而來的主題一一去攻破它~確實是滿有成就感的!!我可以很肯定地說現在比 9 週前的自己更有錢途了XDD

作品網址: <https://kakadodo.github.io/theF2EChallange/skill-tree.html>

以上內容如有勘誤，還請不吝告知🙇

2018-08-08 更新:
拿到完賽的獎狀啦!!!連獎狀都用前端做也太妙XDDD
完賽獎狀: <https://www.thef2e.com/Certificate/-LDy0zAZD6uNPBRo--X->
