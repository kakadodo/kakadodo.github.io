---
title: The F2E - 前端修練精神時光屋挑戰系列 - 2nd Week 7. Chat Room
keywords:
  - Vue.js, vue-emoji-picker, 聊天室
categories:
  - the F2E challenge
thumbnailImagePosition: left
date: 2019-08-25 15:00:00
thumbnailImage: https://kakadodo.github.io/theF2EChallange/img/2nd-week7.jpg
---

每週主題都在創新難是怎麼回事 😰，雖然剩兩週了還是擔心自己完成不了挑戰賽..
<!-- excerpt -->
![blog image](https://kakadodo.github.io/theF2EChallange/img/2nd-week7.jpg "Week 7. Chat Room")

## 使用者故事:
1. 我可以填寫暱稱或匿名形式，不需進行註冊，便可進入聊天室
1. 聊天方式不限，可用大廳模式、一對一模式，或者是系統配對皆可，或者是自創聊天模式皆可
1. 我可以上傳附件檔案、圖片
1. 我可以使用內建的表情符號


來自 Yuri 的[設計稿](https://challenge.thef2e.com/user/2943?schedule=3997)，不得不跟設計師說聲抱歉~有些圖片無法存取的情況下幾乎被我改了一大部分 UI 🙏

## 運用技術:
- Pug
- Vue.js
- [vue-emoji-picker](https://github.com/DCzajkowski/vue-emoji-picker) (Vue 的 emoji 表情包組件庫)
- Firebase Database API

## 挑戰心得:
主題雖然是匿名聊天室，但自己把它做成比較偏向即時留言版的感覺，實在是沒有開發後端程式的天分啦!!
也因此..一開始雖然有把設計師稿件的 UI 元素一一刻出來，隨著接上 database 的功能後，還是決定把沒有做出的功能 UI 移掉了😔
最後只有完成**"可以創建新的聊天室"**、**"可以多人匿名聊天"**、**"可以使用表情符號"**、**"可以上傳圖片(但是 by 貼網址 XDDD)"**這些功能實現。
自己寫完最滿意的應該是在詢問使用者身分並且創建身分的那個系統機器人介面，根本在耍 user 啊 XD

以下就來分享這次挑戰賽有用到的工具:

### vue-emoji-picker
還沒開始寫之前有先找一下如何用 JavaScript 產生 Emoji 表情，但看了覺得短時間會超出自己腦容量可以承受的範圍，所以放棄自幹這條路 😱
有興趣研究的可以參考保哥寫的[用 JavaScript 玩轉 Emoji 表情圖示原來這麼簡單][willEmoji]這篇文章，非常清楚的告訴你要如何解析 Emoji 字元，及 UTF 的字元轉換，其實 Emoji 有固定的邏輯，例如基本的人物 Emoji 加上菲茨派屈克修飾符後可以產生不同膚色的相同人物，又或是一個學士帽的 Emoji 加上一個女生的 Emoji 就會變成一個畢業女學生圖案 ，根本就是檸檬加冬瓜迸出新滋味的概念啊!
最後是找了一款包成 Vue 組件的 emoji-picker，基本上就是直接在想要呈現的位置中塞入組件即可，開發者也有提供 CSS 樣式，不用自己慢慢排版了，更貼心的是還有搜尋功能，可以輸入表情的關鍵字來過濾出想要使用的 Emoji!
因為我是偷懶派的直接用 new Vue 來寫，所以組件的安裝就要搭配 cdn:
```html
<body>
<!-- 掛載組件 cdn -->
<script src="https://unpkg.com/vue-emoji-picker/dist/vue-emoji-picker.js"></script>

<!-- 創建 Vue 之前記得先使用組件 -->
<script>
  Vue.use(EmojiPicker)

  new Vue({
    // ...
  })
</script>
</body>
```

組件本身的內容就像上面說的一樣，其實把整段程式碼貼上就會產生了，基本上不太需要去修改裡面的屬性，但記得要在 Vue 中寫上對應的 data 及 methods 及另外刻 CSS 樣式或是使用作者提供的 CSS 樣式，不然會變成一盤散沙呈現 XD
```html
<!-- 這是實際要做文字輸入、插入 Emoji 的 input 欄位 -->
<textarea v-model="input"></textarea>

<!-- emoji-picker 組件本身，@emoji 事件可以將選定的表情插入到 input 中，search 是搜尋的資料綁定，會過濾符合的 Emoji -->
<emoji-picker @emoji="insert" :search="search">
  <!-- invoker 是切換 emoji picker 顯示/關閉的介面，可以自行改成其他 btn 或放一個笑臉代替 -->
  <div slot="emoji-invoker" slot-scope="{ events: { click: clickEvent } }" @click.stop="clickEvent">
    <button type="button">open</button>
  </div>
  <!-- emoji picker 的彈出介面，裡面就會顯示所有的 emoji 表情、搜尋框等 -->
  <div slot="emoji-picker" slot-scope="{ emojis, insert, display }">
    <div>
      <div>
        <input type="text" v-model="search">
      </div>
      <div>
        <div v-for="(emojiGroup, category) in emojis" :key="category">
          <h5>{{ category }}</h5>
          <div>
            <span
              v-for="(emoji, emojiName) in emojiGroup"
              :key="emojiName"
              @click="insert(emoji)"
              :title="emojiName"
            >{{ emoji }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</emoji-picker>
```
```js
new Vue({
  data() {
    return {
      input: '', // 文字輸入框的 data 綁定
      search: '', // 搜尋框的 data 綁定
    }
  },
  methods: {
    // @emoji 監聽的回調函式，其實就是在 input 內容後加上 emoji 字元
    insert(emoji) {
      this.input += emoji
    },
  },
});
```
是不是很簡單~~~感恩作者、讚嘆作者!!如果想進階一點修改 emoji-picker 顯示的表情圖案，可以複寫組件的 default object，實際位置會在組件庫中的 emojis.js 檔中，但因為我是用 cdn 直接載入就沒去修改它了。

### firebase Database API
這塊之所以有接觸也要感謝六角學院之前直播過 Vue 教學，搭配 firebase 的即時資料庫可以立即顯示更新的 data 內容，因此這次就拿來當複習使用。
不過 firebase 似乎改寫了一些規則，現在不再是單純載入 firebase.js 的檔案，而是做為各功能拆分檔，除了基本核心 app.js 要載入外，再來就是看你要使用它的哪些功能，分別載入那個功能的 js 檔。
```html
<body>
  <!-- 我只有用到 database，所以就載入這兩支 -->
  <script src="https://www.gstatic.com/firebasejs/6.4.2/firebase-app.js"></script>
  <script src="https://www.gstatic.com/firebasejs/6.4.2/firebase-database.js"></script>
</body>
```

之後其實就差不多，需要先在 firebase 的 console 建立自己的 app 專案，然後開通 database 功能，最後再將 firebaseConfig 寫入自己的 js 中並 initializeApp 即可。
```html
<body>
  <script>
    // config 可以視情況寫入，以下是完整的內容，但如果沒用到 message 或 storage 功能其實可以不用寫
    const firebaseConfig = {
      apiKey: "api-key",
      authDomain: "project-id.firebaseapp.com",
      databaseURL: "https://project-id.firebaseio.com",
      projectId: "project-id",
      storageBucket: "project-id.appspot.com",
      messagingSenderId: "sender-id",
      appID: "app-id",
    };
    // 初始化 Firebase
    firebase.initializeApp(firebaseConfig);
    // database 就是你專案的 database啦!
    const database = firebase.database();
  </script>
</body>
```
接下來就是處理 database 的讀取跟寫入等功能而已，firebase 的官方 Docs 其實都有滿完整的範例程式碼，有興趣可以直接前往[官網](https://firebase.google.com/docs/database/web/start)查看。

最後的額外小插曲是，當使用 firebase API 並上傳到 Github 這類公開的資料庫，等同於公開你的 config 設定檔，大家都可以知道你的 api key 是甚麼，如果無聊一點可能就抓你的 config 檔來讀取/寫入 database 的內容。謹慎一點會在 database 的規則中寫入身分驗證來阻擋讀取與寫入，但像這次是以匿名形式的聊天室，不太可能去建立 auth 規則，所以至少要確保你的 api key 只能在固定的網域下才能被請求。可以參考這篇文章說明: [How to secure your Firebase project even when your API key is publicly available][firebaseAPIKEY]

其實我自己也是發布之後收到 github 的 gitguardian 不斷咆嘯我暴露的 google 的 api key 才想到要做這件事 XDDD
firebase 畢竟是 google 自家產品，因此很貼心地會在建立 app 專案的同時，將你的 api key 憑證傳送到 google 的 APIs console，我們就可以到那邊去設定憑證的使用限制。
上面那篇文章都有附上詳細的使用教學及圖片截圖，這邊就不自己亂講了。接下來只需祈禱 api 的使用次數不會超過 firebase 提供的免費流量，不然就要進行國外匯款了...請大家手下留情 QQ


[willEmoji]: https://blog.miniasp.com/post/2019/01/08/Understanding-Emoji-Unicode-and-JavaScript
[firebaseAPIKEY]: https://medium.com/@impaachu/how-to-secure-your-firebase-project-even-when-your-api-key-is-publicly-available-a462a2a58843

作品網址: <https://kakadodo.github.io/theF2EChallange/chatroom.html>

以上內容如有勘誤，還請不吝告知🙇
