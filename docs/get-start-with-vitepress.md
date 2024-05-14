---
title: 使用 VitePress 快速建立部落格
date: 2024-05-12
categories: OTHERS
tags:
  - VitePress
---

# {{ $frontmatter.title }}

## 前言
這陣子在複習 Nuxt3 運用時，無意間一直掃到 VitePress 的關鍵字，好奇 google 一下原來是 Vue 官方出的一款靜態站點生成器，特別之處在於頁面除了可用 Markdown + HTML 編寫外，也能直接在 Markdown 檔中使用 Vue 語法，編譯後是靜態 HTML 頁面，部屬到伺服器上能作為 Vue SPA 運行。官方說明:

::: tip 快速的初始加載
對任何頁面的初次存取都會是靜態的、預先呈現的 HTML，以實現極快的載入速度和最佳的 SEO。然後頁面載入一個 JavaScript bundle，將頁面變成 Vue SPA。
:::

建立專案的方式[官方文件](https://vitepress.dev/zh/guide/getting-started)寫的滿清楚的，過程中反而是爬文件比較花時間，需要了解整體架構的安排跟一些細部設定方式。
比較需要關注的地方是 `vitepress.config.ts` 設定檔，這裡可以設定網站的全局配置，像是文件目錄配置、網站 Head 配置、多語系配置、插件配置及主題配置等等。

## 主題配置 themeConfig
我是使用官方的預設主題來微調，預設主題有提供三種 layout: **doc** (預設值，文檔排版)、**home** (首頁排版，可參考 vue 官網) 及 **page** (單頁排版)。其中 page 官方是說不會應用任何樣式，但自己測試下來，會涵蓋 header、footer，如果有設定 sidebar 也會一併顯示，比較適合拿來當作部落格主體下的延伸頁面。

而在頁面的 frontmatter 設定 `layout: false` 才會是完全的空白頁面，可用這個方式在同個專案裡做一些 demo 頁，不用擔心會受到主題樣式影響。

```md
<!-- frontmatter 位置需要在文件的最上方 -->
---
layout: doc | home | page | false
---
```

### 側邊欄 sidebar
文檔排版模式下，可以設定側邊欄作為文章的快捷索引，側邊欄最多接受六個層級，預設用陣列的格式配置會只有一組側邊欄，如果今天想依據頁面路徑不同而有不同的側邊欄，最外層格式要以物件的方式設定，key 要對應資料夾名稱(資料夾名稱會轉換為路徑名)。另外側邊欄如果有設定 `collapsed` 屬性，會啟用收合功能，false 是預設展開，true 是預設收合。

```js
sidebar: [
  {
    text: '筆記總覽',
    collapsed: false,
    items: [
      { text: '使用 VitePress 快速建立部落格', link: '/posts/get-start-with-vitepress' }
    ]
  }
],
```

其他設定基本上就是替換為網站要呈現的內容，其中 search 的部分，官方提供開箱即用的本地搜索功能(MiniSearch)，如果習慣使用 algolia 搜尋引擎，也有相對應的配置可用。

## GA4、GTM 設定
config 檔中沒有提供可以直接設定 ID 的位置，但可以透過 `head` 屬性來增加 `<script>` 標籤，像是 GA4 的設定如下:

```js
head: [
  ['script', { src: 'https://www.googletagmanager.com/gtag/js?id={GA4_ID}' }],
  ['script', {}, `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '{GA4_ID}');
  `]
],
```

運行後就可以在頁面中的 `<head>` 看到 GA4 的 `<script>` 標籤。

GTM 的設定也類似，但有一塊 `<noscript>` 代碼需要加在 `<body>` 開頭標記後方的位置，爬文沒看到有相關的設定可以參考，後來想到的解法是把這段代碼塞到 layout 提供的 slot 裡，由於 VitePress 可以直接使用 vue component，可以建立一個含有 GTM 代碼的 component，再用插槽的方式掛載到 layout 上面，官方的預設 layout 提供很多位置的[插槽](https://vitepress.dev/zh/guide/extending-default-theme#layout-slots)可用。使用插槽的方式如下:
1. 建立一個含有 GTM 代碼的 component，例如 `GtmScript.vue`:

<<< @/.vitepress/theme/GtmScript.vue

2. 在 `.vitepress/theme/index.ts` 主題設定檔中，把 GTMScript 加入到 layout 插槽:

<<< @/.vitepress/theme/index.ts

運行環境就可以在 devtool 面板看到這段設定囉! 唯一問題是頁面如果設定 layout: false 會吃不到設定，不過還是能直接在頁面中自己引入這個 component 來使用。

## 創建 Sitemap
VitePress 提供了自動生成 sitemap 的功能，只要在 `vitepress.config.ts` 設定即可，建置後會在專案根目錄下產生 `sitemap.xml` 檔案。如果專案本身有啟用 `lastUpdated` (最後更新時間)選項，也會將更新時間同步到 sitemap 的 `<lastmod>` 標籤。
```js
import { defineConfig } from 'vitepress'

export default defineConfig({
  sitemap: {
    hostname: 'https://example.com'
  }
})
```

## 環境變數設定
測試了 VitePress 設定環境變數的方式，狂踩坑後得出的做法如下:
1. 根目錄建立 `.env` 檔，變數名稱帶上 VITE_ 前綴，例如 `VITE_GTM_TRACKING_ID=GTM-XXXXXXX`
2. config 檔中可透過官方提供的 `loadEnv` 函數來載入當前環境的變數檔，因為 config 檔只會在建構階段執行，這個階段是無法使用 import.meta.env 來載入的。
```js
import { loadEnv } from 'vitepress'
// 第一個參數是 mode，第二個參數是環境檔的目錄位置
const env = loadEnv("", process.cwd());
console.log(env.VITE_GTM_TRACKING_ID);
```
3. 照理說運行環境下要抓取環境變數可以使用 import.meta.env 來取得，但不知道為何我都只能抓到官方預設的環境變數資料，最後是繞了個彎換個方式來寫，由於在 config 中已用第二點的方式拿到當前環境變數，所以透過設定 vite -> define 來定義全局常數，這樣就可以在運行環境下取得這些變數了。
::: code-group
```js [vitepress.config.ts] {5-9}
import { defineConfig, loadEnv } from 'vitepress'
const env = loadEnv("", process.cwd());

export default defineConfig({
  vite: {
    define: {
      'process.env': env
    }
  }
})
```
```vue [GtmScript.vue] {5,15}
<template>
  <!-- Google Tag Manager (noscript) -->
  <noscript
    ><iframe
      :src="`https://www.googletagmanager.com/ns.html?id=${VITE_GTM_TRACKING_ID}`"
      height="0"
      width="0"
      style="display: none; visibility: hidden"
    ></iframe
  ></noscript>
  <!-- End Google Tag Manager (noscript) -->
</template>

<script setup lang="ts">
const VITE_GTM_TRACKING_ID = process.env.VITE_GTM_TRACKING_ID;
</script>
```
:::

## 部署
由於建這個站目的是要汰換掉之前在用的 hexo blog (絕對不是因為我忘記怎麼用了)，會使用 GitHub Page 來部署。部署這塊[官方文件](https://vitepress.dev/zh/guide/deploy)也很佛心的列了目前常見部署站點的使用方式。
我是使用 GitHub Actions 來自動化部署，大致流程如下:
1. 專案中建立 `.github/workflows/deploy.yml` 檔，內容可以拿官方提供的範例來套用
2. 在 GitHub repository -> Settings -> Pages 選單下，選擇 Build and deployment > Source > GitHub Actions 表示專案要使用 GitHub Actions 的方式來部署
3. 專案 commit 並推送到 main 分支，就會觸發 Actions 進行自動部署的流程。分支預設是用 main，如果要建立在其他分支上，記得要更改 yml 檔中的 push 設定。

### Github Pages 設定環境變數
GitHub Pages 有提供 Actions secrets and variables 的設定，使用 Actions 方式部署的話，就可以在部署過程植入環境變數。
1. 專案 repository -> Settings -> Secrets and Variables -> Manage environment secrets，選擇需要建立 secret 的環境，於最下方點擊 Add environment secret 來新增，名稱建議跟 `.env` 檔中定義的一樣，於 yml 檔中可以這樣引用 <span v-pre>`${{ secrets.VITE_GTM_TRACKING_ID }}`</span>。
2. `.github/workflows/deploy.yml` 中，需要在 job build 設定 Github repository 的 `environment` 名稱(對應 secret 建立的環境)，並且在 build 指令下方加上 `env` 設定。
```yml {5-6,11-12}
jobs:
  # 构建工作
  build:
    runs-on: ubuntu-latest
    environment:
      name: github-pages
    steps:
      # 省略前面步驟..
      - name: Build with VitePress
        run: npm run docs:build
        env:
          VITE_GTM_TRACKING_ID: ${{ secrets.VITE_GTM_TRACKING_ID }}
```

## 總結
如果單純拿來寫寫筆記用，建置時間真的超快，專案初始化其實就會幫你把基本檔案建好了，要做的只是設定的微調，麻煩的反而是筆記的內容XD，寫一寫都會想說官方文件比我寫的還清楚...這 part 跳過好了。

自己比較驚奇的部分是可以在 md 檔裡面直接寫 vue，等於把 md 檔當成單文件組件來寫，差別只在不會有 `<template>` 標籤，可以導入組件、註冊全局組件、使用 CSS 預處理器等，真的很像在寫一般的 vue 檔，只是使用上要注意 SSR 的問題，避免在組件 mounted 之前有針對瀏覽器或 DOM 元素的操作，這塊官方也有提到可以使用 `onMounted`、`!import.meta.env.SSR`、`<ClientOnly>` 等方式確保代碼只在客戶端環境下執行。