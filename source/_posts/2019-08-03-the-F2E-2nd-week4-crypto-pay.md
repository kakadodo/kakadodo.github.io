---
title: The F2E - 前端修練精神時光屋挑戰系列 - 2nd Week 4. Crypto Pay
keywords:
  - 線上支付, Vue.js, VeeValidate
categories:
  - the F2E challenge
thumbnailImagePosition: left
date: 2019-08-03 20:00:00
thumbnailImage: https://kakadodo.github.io/theF2EChallange/img/2nd-week4.jpg
---

對表單驗證始終有著懼怕感...🙄
<!-- excerpt -->
![blog image](https://kakadodo.github.io/theF2EChallange/img/2nd-week4.jpg "Week 4. Crypto Pay")

## 使用者故事:
1. 動線設計：結帳時選擇支付方式 > 進入支付流程表單填寫 > 支付成功
2. 單欄位驗證：當使用者資訊輸入錯誤時，會顯示錯誤訊息
3. 響應式設計：需確保 PC / Mobile 皆有良好支付體驗

來自 Jesshsu 的[設計稿](https://challenge.thef2e.com/user/1861?schedule=3440)，介面乾淨感覺跟 Bootstrap 很搭，有段時間沒用 Bootstrap 了，趁這機會來回溫一下。🤭

## 運用技術:
- Pug (html模板語言)
- SCSS (css預處理語言)
- Vue.js
- [VeeValidate](https://baianat.github.io/vee-validate/)

## 挑戰心得:

上一屆也有表單驗證的挑戰，所以流程還算滿熟悉的，花比較多時間在切版及表單驗證的設定，JS 的功能反而寫不多(感謝 Vue 及 VeeValidate)。
因為用 Vue 來寫，就找了 Vue 的表單驗證插件 **VeeValidate** 來用用看，表單驗證的插件幾乎都會包裝成 Vue 的 Directive 使用，所以搞清楚驗證的指令怎麼下就不會有太大的問題。

設計稿有幾個地方一度讓我卡住，像是參加人數有分成人及小孩兩個輸入框，理論上應該是確保有選擇一人以上即可(不管是大人或小孩)，不過表單驗證通常是一個 input 對應一個 directive，這個情況就變成要想辦法客製化驗證方式了😱
好加在 VeeValidate 有提供 extend 插件的使用方式，雖然 API 說明幾乎都是 CLI base，但只要有辦法 extend 一定就會有其他開發者跟我有相同的疑問，也就一定會有厲害的大神提供解法 🤗🤗🤗
以下為使用 Vue 實例為基礎來 extend 插件的方式:
```js
// 要使用 vue 插件記得在 new Vue 之前先讓 Vue 本體繼承功能
Vue.use(VeeValidate, {
  classes: true,
  classNames: {  // 這部分是讓驗證結果可以回饋為 bootstrap 的驗證樣式
    valid: 'is-valid',
    invalid: 'is-invalid'
  }
});

new Vue({
  ...,
  created() {
    // 繼承 VeeValidate 後的 Vue 會有 $validator 屬性可存取
    // 這樣就可以擴充本來沒有的驗證規則啦
    // 新增一個名為 nop 的驗證規則，validate fn 就是驗證的方式!
    this.$validator.extend('nop', {
      validate: () => {
        return this.formProfile.nop.adult + this.formProfile.nop.child > 0;
      }
    });
  }
})
```
最後在 html template 中加上驗證指令即可!
```html
<!-- v-validate 是指令名稱，值就塞入驗證規則(可以多個，用 | 區別) -->
<input class="form-control" type="number"
  v-model="formProfile.nop.adult" v-validate="'required|nop'">
<input class="form-control" type="number"
  v-model="formProfile.nop.child" v-validate="'required|nop'">
```

另外還有一塊是信用卡輸入的欄位，VeeValidate 本身有信用卡的驗證功能，但一樣是針對單一輸入框，介面則是作成每輸入四碼就要跳到下一個輸入框作輸入，因此...我就直接對每個 input 作數字長度的驗證了。
為了彌補自己驗證能力的不足，稍微優化一點點使用體驗讓使用者每輸入完四碼後就會 tab 到下一個輸入框來自我安慰一下 🤭

小螢幕裝置模式時，信用卡卡號如果保持四個 input 呈現會太擁擠而且無法正確輸入，所以再改為一欄輸入框顯示，這時又突然想到可以試著作出線上金流在輸入卡號時會每四個數字自動新增分隔線的功能，所以靠著腦殘的思考模式，跌跌撞撞自我折磨一番後，完成了想要的功能呈現，下方也分享自己的寫法:

1. 首先 html template 改為一欄輸入框，驗證模式也要更改，因為硬要加上分隔線的關係，還是不能用原本 VeeValidate 的信用卡驗證功能 😂
  只好用了終極大法 **Regex** 來完成這欄的驗證(正規式會逼死人...)。這裡也知道了 VeeValidate 除了可以用一般字串加上 | 來分隔驗證項目外，也可以使用物件的形式來撰寫。
  (知道的原因是 Regex 用一般字串撰寫會因為符號的關係影響驗證結果...叫我採雷達人)
```html
<input :value="formPayment.cardNumberInput"
  v-validate="{ required: true,	regex: /^([0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4})$/}"
  @input="formatCreditNumber($event)">
```

2. JavaScript 的部分則是處理 input 輸入後作字元轉換，這邊寫的超卡，只要一寫錯整欄文字就會產生一堆奇怪的符號(ex.111,,,-,-,--) 😂
```js
formatCreditNumber(e) {
  let val = e.target.value.replace(/-/g, '');
  let valArr = val.split('');
  let temp = [];
  valArr.map((val, i) => {
    temp.push(val);
    if((i + 1) % 4 === 0 && temp.length < 19) {
      temp.push('-');
    }
  });
  this.formPayment.cardNumberInput = temp.join('');
}
```

這回終於有好好地完成 RWD 版面，有 Bootstrap 4 幫忙加上較格式化的版型果然好處理很多，切版過程中感觸最多的應該是 Bootstrap 的 form 元件樣式組合彈性真的很強大...官網本身已經有不少排列的範例，但難免還是會碰到不一樣的排列方式，本來以為要自己另外刻樣式去覆蓋，但其實只要替換掉某個 class 變成另一個排列方式的 class，想要的格式就排好了~開發團隊的 OOCSS 設計模式跟格線系統真的厲害。

作品網址: <https://kakadodo.github.io/theF2EChallange/crypto-pay.html>

以上內容如有勘誤，還請不吝告知🙇
