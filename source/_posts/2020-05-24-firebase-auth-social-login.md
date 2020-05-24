---
title: 用 Firebase Authentication SDK 整合多種社群帳號登入(Google, Facebook, Twitter)
keywords:
  - Firebase, Auth, Social Login, Google Sign-In, Facebook Login, Twitter
categories:
  - Web Others
thumbnailImagePosition: left
date: 2020-05-24 15:00:00
thumbnailImage: https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20200524-firebase-auth-social-login-1.jpg?alt=media&token=f98071b9-cf1c-4704-840e-5d4778081c2d
---

過去沒有碰到需要整合其他社群平台帳號來做登入的專案過，對這方面有著未知的迷惑在，趁著好久沒寫文章的勢頭，來嘗試做做看多種社群平台的帳號登入功能。有先看過各家提供的 API 說明文件，呼叫方式及資料格式沒有完全相同，記得之前在碰 Firebase 的 auth 功能時有看過可以整合其他社群平台帳號的設定，既然 Firebase 都提供這種管道了，想必有做一定程度的整合XDD，不如就來依靠巨人肩膀實現登入功能吧!

<!-- excerpt -->

![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20200524-firebase-auth-social-login-1.jpg?alt=media&token=f98071b9-cf1c-4704-840e-5d4778081c2d '用 Firebase Authentication SDK 整合多種社群帳號登入(Google, Facebook, Twitter)')

## 專案準備:

1. 基本的登入畫面前端專案，我是使用 Vue CLI 搭配 Firebase 的託管功能。
1. 需要有以下平台帳號: Google、Facebook、Twitter。
1. 建立 Firebase 專案，並且指定 Authentication 的 Sign in methods。
1. [Facebook](https://developers.facebook.com/) 和 [Twitter](https://developer.twitter.com/en) 需要擁有開發人員帳號，可以點擊連結前往開通並建立專案應用程式。
1. 連接 Firebase 與各平台的 App 應用程式之間的關聯設定，像是 App Id 、 產品密鑰及 OAuth 重新導向的 URI。


## Firebase Sign in methods:

![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20200524-firebase-auth-social-login-2.jpg?alt=media&token=ee343daa-81a7-48e4-b736-0d39de7e2767 '用 Firebase Authentication SDK 整合多種社群帳號登入(Google, Facebook, Twitter)')

Firebase 整合了很多社群平台的登入功能!如上圖可以看出我激活了四種方式:

- 電子郵件: 算是最簡單的一種了~基本上就是點個啟用再儲存即可，這樣就可以透過 Firebase 的 `firebase.auth().signInWithEmailAndPassword(email, password)` 來登入，當然前提是你有提供信箱註冊的功能或是有在 firebase 裡面手動新增使用者的信箱密碼。

- Google: 由於 Firebase 是 Google 自家產品，所以在設定上非常輕鬆，會自動幫你建立 Google 的登入機制，因此也是按個啟用再儲存即可(也是可以另外設定專案名稱及專案管理者的信箱)。

- Facebook: 需要建立開發人員帳號及應用程式，應用程式建立後，可以在裡面找到新增 **Facebook 登入** 這個功能，然後做一些與網站之間的關聯設定，例如要使用這個功能的網站網址，有效的 OAuth 重新導向 URI 等等，而 Firebase 這邊則是需要如下圖的兩個資訊，App Id 和產品密鑰，這兩個都可以在 Facebook 應用程式的設定頁面找到。

![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20200524-firebase-auth-social-login-3.jpg?alt=media&token=38d3e487-38ff-4b37-9549-acb79456fb2c '用 Firebase Authentication SDK 整合多種社群帳號登入(Google, Facebook, Twitter)')

- Twitter: 大致上跟 Facebook 差不多，也是要建立開發人員帳號及應用程式，但 Twitter 比較謹慎(囉嗦)一點，申請開發人員帳號之前要通過一連串的問卷調查...而且有規定描述要用英文且字數大於 200，當時在申請時還想說會不會卡在這就失敗了 XDD，好險有讓我申請成功，不確定 Twitter 小組之後是不是真的會來審查一番?總之就是盡可能描述你為什麼會想要使用 Twitter 的 API，以及大概會用到那些功能等等。

個人覺得光是設定這塊就很方便了!基本該建的設定建一建，一些比較麻煩的 Firebase 也幫你做好了!(例如 OAuth 重新導向 URI，要自己做還真是不知道從何下手)，接下來就是實際在專案實現登入的功能啦!

## 專案載入 Firebase
[官方文件](https://firebase.google.com/docs/web/setup?authuser=0)有提供多種情境的載入方式，CDN、ES6 模組、Node.js，甚至如果用 Firebase 做託管的話，可以載入特定 script，Firebase 會自動幫你做初始化(不會在外部顯露 firebase config)，我本來就打算用託管功能，所以試著用他提供的方式，但發現這個功能必須要在 run firebase server 的前提下才讀的到 API，且上線之後速度奇葩的慢(?)，只好改成模組化載入了。😢
Firebase 的 config 設定可以從下圖的位置取得:
![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20200524-firebase-auth-social-login-4.jpg?alt=media&token=75f3b10b-f666-4878-8a3e-ace500e79546 '用 Firebase Authentication SDK 整合多種社群帳號登入(Google, Facebook, Twitter)')

下面介紹一下我的載入方式:
1. `npm install --save firebase`
1. 建立一個 **firebase.js**，做初始化設定，新版的 firebase 有改變 import 的方式，除了載入必要的 app 核心模組之外，再依照實際會用到的產品模組做引入即可。我這次只使用 auth 功能，所以就 `import 'firebase/auth';` 而已，config 設定也可以依據實際用到的產品功能寫入，不用全部設定都加上去。
```js
// firebase.js---
import firebase from 'firebase/app';
import 'firebase/auth';

// firebase config
const firebaseConfig = {
  apiKey: 'xxxxxxxxxx',
  authDomain: 'xxxxxx.com',
};

export default firebase.initializeApp(firebaseConfig);
```
1. 於 Vue CLI 的 main.js 引入 firebase.js
```js
// main.js---
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import firebase from './firebase';

// ....
```
這樣 firebase 就算載入成功囉!再來就是專案中使用 firebase 的 auth API。

## Firebase auth API
UI 畫面會有 3 個社群登入 icon，以及信箱密碼的輸入框和一個登入按鈕，點擊 icon 就會觸發社群平台的登入功能，輸入框 + 登入按鈕則是一般電子信箱的登入方式。
稍微看過使用方法，除了 email/password 之外，透過第三方登入的 API 格式幾乎一樣，主要是帶入的 provider 不同而已。
方法開頭都是 `firebase.auth()`，可以用 firebase 初始化後的對象來呼叫，也可以直接拿 firebase 本身來使用。差異如下:
```js
// firebase initial instance
const firebase = firebase.initializeApp(firebaseConfig);

// firebase
import firebase from 'firebase/app';
```
不過兩者包含的功能還是有差喔!像是產生 provider 實例的功能只有 firebase 本身才有，初始化對象是沒有 new provider 的方法。

- `firebase.auth().signInWithEmailAndPassword(email, password)`:
  email 登入的方法，是個 promise，可用 `.then(res => {})` 及 `.catch(err => {})` 來執行成功或失敗的後續內容。

- `firebase.auth().signInWithPopup(provider)`:
  我是使用 popup 的功能做登入，如果要選擇 *signInWithRedirect* 方法可以參考 firebase 提供的[範例檔](https://github.com/firebase/quickstart-js/blob/master/auth/google-redirect.html)
  一樣是個 promise，所以同上會有 `.then(res => {})` 及 `.catch(err => {})` 可用，firebase 把第三方登入功能做了包裝，只要載入不同的 provider，就可以用相同的方法來登入，成功或失敗的 response 都有格式化過，不太需要擔心例外處理。以下是自己在撰寫登入不同 provider 的範例:
  ```js
  methods: {
    loginWithGoogle() {
      this.loginError = '';
      this.triggerFirebaseLogin(new firebase.auth.GoogleAuthProvider());
    },
    loginWithFacebook() {
      this.loginError = '';
      this.triggerFirebaseLogin(new firebase.auth.FacebookAuthProvider());
    },
    triggerFirebaseLogin(method) {
      firebase
        .auth()
        .signInWithPopup(method)
        .then((result) => {
          this.successLogin(result.user);
        })
        .catch((error) => {
          if (error.code === 'auth/account-exists-with-different-credential') {
            const pendingCred = error.credential;
            const { email } = error;
            firebase
              .auth()
              .fetchSignInMethodsForEmail(email)
              .then((methods) => {
                if (methods[0] === 'password') {
                  this.loginError = 'Your email has been used, please enter email/password to login';
                  return;
                }
                const provider = this.getProviderForProviderId(methods[0]);
                firebase
                  .auth()
                  .signInWithPopup(provider)
                  .then((result) => {
                    result.user
                      .linkAndRetrieveDataWithCredential(pendingCred)
                      .then((usercred) => {
                        this.successLogin(usercred.user);
                      });
                  });
              });
            return;
          }
          this.failLogin(error);
        });
    },
  },
  ```
  既然方法都相同，就把方法額外拉出來寫，在綁定不同的 login 按鈕帶入對應的 provider 來呼叫，但在使用第三方登入時要注意 firebase 會用 email 作為 user 的判斷依據，如果有社群平台 email 是一樣的話，會導致 user 如果已經有一個登入方式了，又用另一個登入會失敗，error 訊息是 `auth/account-exists-with-different-credential`，因此需要特別處理這個狀況。 firebase 有提供 `linkAndRetrieveDataWithCredential` 的功能可以直接幫你整合一個信箱具有多種登入方式，但如果有做過一般信箱密碼登入的話就會比較麻煩一點，等於 user 需要額外輸入一般信箱登入的密碼後才能進行整合，這塊我還沒想法要怎麼實現，所以先跳 error 叫 user 改成用信箱密碼登入 XDD，有興趣的可以看看官方文件怎麼寫 [Handling account-exists-with-different-credential Errors](https://firebase.google.com/docs/auth/web/google-signin?authuser=0#expandable-1-label)。

- `firebase.auth().signOut()`: 登出的方法也整合好了，簡單一句幫你登出!一樣可以作成功或失敗的後續處理。

- `firebase.auth().onAuthStateChanged((user) => {})`: 網站中總是要持續確認 user 的登入狀況，因此 firebase 有提供這個 observer 功能，幫你持續監聽 user 的狀態，會在狀態改變時觸發回呼函式，user 如果存在可以取得登入後的資料，沒有則是 `null`。我有用這個來判斷 user 當前應該進入的畫面為何，搭配 vue router 作導向。

關於上述方法的 catch error 可以到[官方文件](https://firebase.google.com/docs/reference/js/firebase.auth.Auth?authuser=0)查看，自己只有拿部分測試到的狀況來加錯誤訊息而已。

這個週末就在 firebase 的擁抱下度過了~好久沒寫 side project，hexo 也差點忘記要怎麼用，好慘!

我的實作範例: https://social-login-9640e.firebaseapp.com/
(只有登入畫面稍微能看點...登入後就放過自己吧😭)

以上內容如有勘誤，還請不吝告知 🙇
