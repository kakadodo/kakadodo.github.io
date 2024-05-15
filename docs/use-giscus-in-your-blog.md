---
title: 使用 Giscus 建立部落格留言系統
description: 介紹如何使用 Giscus 建立部落格留言系統，並且整合到 VitePress 專案中
date: 2024-05-15
categories: OTHERS
tags:
  - Giscus
  - VitePress
---

# {{ $frontmatter.title }}

## 前言
這幾天陸陸續續的在做部落格搬遷，搬一搬又默默加了一些小功能 😂

Giscus 是一個由 GitHub Discussions 驅動的留言系統，訪客可透過 GitHub 帳號授權連動在網站上留言和留下反應，等同於在 GitHub Discussion 發表留言，我們也就可以直接在 Github 中管理留言，不得不說 Github 真的很佛...

## 使用方式
[Giscus](https://giscus.app/zh-TW) 官方文檔很貼心，在設定那塊只要逐一選擇完對應的選項配置，下方就會生成一段嵌入代碼，把這段代碼貼到部落格要顯示留言系統的地方就可以啟用 Giscus 留言功能。

不過有幾項前置條件要先完成:
1. GitHub 帳號要先安裝 [Giscus app](https://github.com/apps/giscus)，安裝過程會詢問授權範圍，可以選擇特定的 repo 或是帳戶下的 repo 都啟用。當然這之後也可以從帳號的 `settings -> Applications` 中去更改。
2. 建立一個 `Public` repository 並且開啟 GitHub Discussions 功能，可從 repository 的 `settings -> Features -> Discussions` 打勾來開啟。

前置條件完成後，照著官網選項配置，就可抓取配置好的代碼來用了。

## 整合到 VitePress 專案中
由於 VitePress 本身是 vue 專案，所以我使用了 Giscus 提供的 vue 版本 [giscus-component](https://github.com/giscus/giscus-component) 來做整合:

1. 安裝 giscus-component
```bash
npm i @giscus/vue
```

2. 建立一個掛載 Giscus 的 vue 檔，屬性名稱省略了 `data-` 前綴，只要依據名稱放上對應的值即可。
```vue
<script setup lang="ts">
import Giscus from "@giscus/vue";
import { useData } from "vitepress";
const { isDark, page } = useData();
</script>
<template>
  <Giscus
    :key="page.filePath"
    id="comments"
    repo=""
    repoId=""
    category=""
    categoryId=""
    mapping=""
    reactionsEnabled=""
    emitMetadata=""
    inputPosition=""
    :theme="isDark? 'noborder_gray' : 'noborder_light'"
    lang=""
    loading=""
  />
</template>
```
其中有兩個自己調整過的設定，一個是 key，一個是 theme。

設定 key 是因為我會將這個 vue 作為 layout 的插值來掛載，所以 component 實際上只會 mounted 一次，這樣會造成文章切換的情況下留言系統還維持一開始初始化的狀態。透過 key 綁定 `page.filepath` 的方式，當頁面切換後 filepath 改變來重新加載 component。

theme 也是設定了動態綁定，根據 VitePress 當前的主題模式(日間/夜間) `isDark` 來判斷要套用的留言系統樣式。

最後只要將這個 vue 檔加到 layout 裡就完成囉!
```js {1,8}
import Giscus from "./Giscus.vue";

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // ...
      "doc-footer-before": () => h(Giscus),
    });
  },
  enhanceApp({ app, router, siteData }) {
    // ...
  },
} satisfies Theme;
```