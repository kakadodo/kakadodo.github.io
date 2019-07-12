---
title: Vue-meta 讓 Vue SPA 也能享有分頁式的 meta 管理
keywords:
  - Vue Plugins, Vue, meta
categories:
  - Vue Plugins
tags:
  - Vue Plugins
  - Vue
thumbnailImagePosition: left
date: 2019-05-20 15:00:00
thumbnailImage: https://vue-meta.nuxtjs.org/vue-meta.png
---

單頁式應用的網站雖然可以做出像分頁般的畫面效果、執行上更加快速流暢，但其本質就是一頁的 index.html，如果沒有搭配 router 的工具作路由管理，使用者一重新整理就會回到應用程序的最初畫面了。
有了路由的搭配後，如果能讓每個頁面都有自己專屬的 head meta，不就更像一般後端產生的動態網頁了嗎?
於是乎，Vue-meta 就是為了這個目的而誕生的超好用套件 XD (怎麼可以介紹的這麼不精簡..)
<!-- excerpt -->
![Vue-meta](https://vue-meta.nuxtjs.org/vue-meta.png "Vue-meta 官網主圖")
<small style="display: block;text-align:center;">(圖片來源: Vue-meta 官網)</small>

官方文件在此: [Vue-meta](https://vue-meta.nuxtjs.org/)

介紹套件功能前，簡單介紹一下 meta:
HTML 中的 `<meta>` 的標籤，主要用來放不能被其它 HTML 元素儲存的元數據，(其他元素有它自己的用途在呀~)，有在接觸 SEO 的話一定不陌生，像 FB 的 Social Plugins 就會用這個標籤來儲存媒體訊息，這樣當網頁連結在 FB 上被引用時，就能順利被 FB 解析訊息並顯示額外的資訊。

不過 `Vue-meta` 套件可不是單純只用在 `<meta>` 標籤呀，而是 `<head>` 內會放的子標籤都可以藉由它來動態產生喔。


## 如何安裝?
其實官網有介紹使用方式，但為了~~文章篇幅~~(欸)往後可能會失憶的自己，還是列一下自己可能會用到的方式。

首先，由於它是 Vue 的套件，理所當然框架要用 Vue 呀!而 Vue 本身有好幾種運行模式，像是最簡單的 Vue instance、進階的 CLI 版本，更甚至用 SSR 渲染(官網有提到套件已內建在 Nuxt 框架下) 等，不同運行模式下載入套件的方式會不同。本篇主要是以 SPA 的角度來寫，因此 Nuxt 的使用方式就不講囉..

1. 載入 Vue-meta CDN (Vue instance 及 CLI 都適用)
  ```html
  <!-- 使用 CDN 時 Vue-meta 會被自動安裝 -->
  <!-- 開發階段先別用 .min 的版本才會有除錯功能 -->
  <script src="https://unpkg.com/vue-meta/lib/vue-meta.min.js"></script>
  ```
2. npm 套件管理安裝 (CLI 適用)
  ```shell
  $ npm i vue-meta --save
  ```
  然後記得載入並且告訴 Vue 要使用這個套件
  ```js
  // main.js
  import Vue from 'vue';
  import VueMeta from 'vue-meta';

  // options 可以作額外設定
  Vue.use(VueMeta, options);
  ```


## 如何使用?
官網的介紹有提到，Vue-meta 會以組件中的 metaInfo 屬性作為辨別的依據(屬性名稱可再自行更改)，如果該組件有使用到這個屬性，就會套用這個 meta，而組件跟組件之間有層級的深淺關係，子組件的 meta 權限設定會比父組件高，因此可以更彈性的改變當下要顯示的 meta 資訊。

舉例來說，今天有兩個子頁面組件 member_info.vue 及 member_order.vue，一個父 layout 組件 member.vue:
```html
<!-- member.vue -->
<template>
  <div class="member">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'member',
    metaInfo: {
      title: '',
      titleTemplate: '會員管理 - %s',
    },
  }
</script>
```

```html
<!-- member_info.vue -->
<!-- 對應路由: /member-info -->
<template>
  <div class="member_info">
    ...
  </div>
</template>

<script>
  export default {
    name: 'member_info',
    metaInfo: {
      title: '資料維護',
    },
  }
</script>
```

```html
<!-- member_order.vue -->
<!-- 對應路由: /member-order -->
<template>
  <div class="member_order">
    ...
  </div>
</template>

<script>
  export default {
    name: 'member_order',
    metaInfo: {
      title: '訂單列表',
    },
  }
</script>
```

member_info 及 member_order 都掛在 member 之下，因此都會套用到 member 中設定的 `titleTemplate` 模板，但因為各自都有另外設定 title 屬性的值，所以模板預設的佔位內容會被子組件的 title 給覆蓋。

產生的路由頁面及 title 標籤就會有如下效果:
```html
<!-- 路由: /member-info -->
<title>會員管理 - 資料維護</title>

<!-- 路由: /member-order -->
<title>會員管理 - 訂單列表</title>
```

以此類推~是不是馬上就能想到每個頁面都可以產生自己特有的 meta 內容啦?!
不過有個重點要了解，因為本身還是 SPA 的關係，設定 SEO 相關的標籤其實沒甚麼意義(講這麼多結論給我這個?)
自己會用到這個套件的初衷只是覺得多少提供友善的資訊給使用者也不錯啦 XD 至少可以清楚知道現在在瀏覽哪個頁面..
如果本來就是要作成 SSR 渲染的話，這個功能就真得真得真得非常重要了~ SEO 的大功臣之一。

另外有個小重點是，假設 metaInfo 要使用的內容需要異步加載(非事先寫死)，則該屬性要轉換成 method 的寫法才能正確運作。
```js
{
  data () {
    return {
      title: this.getTitle(),
    }
  },
  methods: {
    async getTitle() {
      const result = await axios.get('/getTitle');
      this.title = result.data.title;
    },
  },
  metaInfo () {
    return {
      title: this.title,
    }
  }
}
```

進一步詳細的配置直接看[官網 API][vue-meta] 比較快喔~~~(逃

[vue-meta]: https://vue-meta.nuxtjs.org/api/ "vue-meta"

以上內容如有勘誤，還請不吝告知🙇