---
title: The F2E - 前端修練精神時光屋挑戰系列 - 2nd Week 3. MP3 Player
keywords:
  - 音樂播放器, Vue.js, Youtube IFrame Player API
categories:
  - the F2E challenge
thumbnailImagePosition: left
date: 2019-07-29 15:00:00
thumbnailImage: https://kakadodo.github.io/theF2EChallange/img/2nd-week3.jpg
---

好喜歡這關呀~~做出來很有成就感! XD
<!-- excerpt -->
![blog image](https://kakadodo.github.io/theF2EChallange/img/2nd-week3.jpg "Week 3. MP3 Player")

## 使用者故事:
1. 我可以透過介面看到專輯裡的音樂列表
2. 我可以點擊音樂列表裡面的任一首音樂，進行播放
3. 音樂控制: 切換下一首 / 切換上一首 / 拖動音樂時間軸 / 暫停.開始切換 / 音量控制 / 單曲重複播放 / 隨機播放 / 重複播放
4. 廣告機制: 隨機在音樂結束切換時，顯示佔板廣告，引導訂閱

來自 Miss_Y 的[設計稿](https://challenge.thef2e.com/user/3115?schedule=3149)，自己意外的充滿少女心喜歡可愛的漫畫元素 🥰

## 運用技術:
- Pug (html模板語言)
- SCSS (css預處理語言)
- Vue.js
- Youtube IFrame Player API

## 挑戰心得:

這次主要分享的是首次接觸的 Youtube IFrame Player API，也就是我的音樂播放來源啦!事前搜尋了可以用的線上音樂檔，突然想到 Youtube 應該有 API 可以使用，果不其然找到了一個不需要依賴 API KEY 就能使用的 IFrame Player API。

以往要播放 Youtube 影片都是單純的在網頁上置入 iframe 連結，讓使用者自己點擊觀看，這次比較不一樣，需要在背後控制 Youtube 播放器，使用者看到的是另外設計出來的 MP3 播放器。

Youtube 本身提供兩種 API，一是這次使用的 [IFrame Player API][IFrame]，二是 [Youtube Data API][YotubeData]，比較偏向於讓開發者可以在自己的應用程式中直接上傳影片、編輯清單等功能。

IFrame Player API 可以做到的是讓開發者用 JavaScript 操控 Youtube 播放器，也就是自己建立按鈕來操控撥放器要播放或暫停等 Youtube 播放器本身有的功能。

使用方式也不難，API 文件把語法都寫出來了，以下為基本建立一個可控制的 Youtube IFrame 播放器:
```html
<body>
  <!-- 創建一個可辨識 id 的 div
  瀏覽器載入 IFrame Player API 後
  會將 div 替換為 iframe 標籤 -->
  <div id="player"></div>
</body>
```
```js
// 需於網頁載入後，動態產生 IFrame Player API 的 script tag
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 當網頁載入 script tag 後，會於完成時自動呼叫 onYouTubeIframeAPIReady 這個 callback
// callback 中建立 Youtube Player，並設定播放屬性
var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: 'M7lc1UVf-VE',
    events: {
      'onStateChange': onPlayerStateChange
    }
  });
}
```
利用 Web Server 打開網頁後，就會看到一個 Youtube 播放器囉!
播放屬性當中的 `videoId` 非常重要，需要先知道要播放的影片 id 為何，這塊我是使用密技 - 土法煉鋼，自己整理了幾個想要使用的影片 id 😂
Youtube 影片的 id 也很好找，就在影片所在的網址連結中
![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20190729-the-F2E-2nd-week3-mp3player-1.png?alt=media&token=8f191f9a-da72-42e0-911d-6a386c23970d "Week 3. MP3 Player")

接下來其實就是對這個 player 做後續操控啦!像是播放、暫停、換影片來源等，API 文件寫得很清楚，下方列出這個專案我有用到的功能:
```js
// 載入影片資源: 分成 load 跟 cue，差別在於載入後要不要自動播放
// 除了 videoId 外其餘為可選填內容
player.loadVideoById({
  videoId:String,
  startSeconds:Number,
  endSeconds:Number,
  suggestedQuality:String});

player.cueVideoById(
  videoId:String,
  startSeconds:Number,
  endSeconds:Number,
  suggestedQuality:String});

// 播放器開始播放、暫停
player.playVideo();
player.pauseVideo();

// 播放器從指定秒數開始播放，以秒為單位
// allowSeekAhead 意思是要不要允許指定到還未載入的秒數時另外向服務器請求資源
player.seekTo(seconds:Number, allowSeekAhead:Boolean);

// 設定播放器音量、取得播放器音量，範圍 0~100
player.setVolume(volume:Number);
player.getVolume();

// 取得播放當下秒數
player.getCurrentTime();
```

初始化產生播放器時我有設定 event 監聽 `onStateChange`，會在播放器狀態改變時(ex.載入資源、開始播放、暫停等) 觸發，可取得參數 `e.data`，data 有幾種數字分別代表當前的狀態:
- -1 (unstarted)
- 0 (ended) === YT.PlayerState.ENDED
- 1 (playing) === YT.PlayerState.PLAYING
- 2 (paused) === YT.PlayerState.PAUSED
- 3 (buffering) === YT.PlayerState.BUFFERING
- 5 (video cued) === YT.PlayerState.CUED

可以藉由上述這幾個數值來比對是否等於 YT(Youtube Player 的全域變數) 設定的狀態值，進而做後續的判斷操控。

額外一提，除了單影片資源載入外，其實也可以載入 Youtube 的 **播放清單**，API 有提供針對播放清單的操作功能，但這次 UI 素材需求的關係，我還是自己整理一份播放清單 json 檔來使用。

總結下來，Youtube IFrame Player API 非常好用~唯一的缺點就是哪天影片資源被砍掉就 GG 了，哈哈!

作品網址: <https://kakadodo.github.io/theF2EChallange/mp3player.html>

[IFrame]: https://developers.google.com/youtube/iframe_api_reference
[YotubeData]: https://developers.google.com/youtube/v3/getting-started

以上內容如有勘誤，還請不吝告知🙇
