<script setup lang="ts">
import Giscus from "@giscus/vue";
import { useData } from "vitepress";
const { isDark, page } = useData();
</script>
<template>
  <Giscus
    :key="page.filePath"
    id="comments"
    repo="kakadodo/blog_giscus"
    repoId="R_kgDOL7xKzg"
    category="Announcements"
    categoryId="DIC_kwDOL7xKzs4CfXx3"
    mapping="pathname"
    reactionsEnabled="1"
    emitMetadata="0"
    inputPosition="top"
    :theme="isDark? 'noborder_gray' : 'noborder_light'"
    lang="zh-TW"
    loading="lazy"
  />
</template>
