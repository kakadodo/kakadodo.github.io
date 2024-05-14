<script setup lang="ts">
import { computed } from "vue";
import { uniq } from "lodash-es";
import { data as posts } from "../docs/posts.data";
import PostCard from "./PostCard.vue";

const categories = computed(() => uniq(posts.map((post) => post.categories)).sort((a, b) => a.localeCompare(b)));

const filteredPosts = (category: string) => {
  return posts.filter((post) => post.categories.includes(category));
}
</script>

<template>
  <div class="postsMap">
    <h2 class="postsMap-title">筆記總覽:</h2>
    <div class="postsMap-categories">
      <a class="postsMap-categories-item" v-for ="category in categories" :key="category" :href="`#category-${category}`">📔{{ category }}</a>
    </div>
    <div class="postsMap-item" v-for ="category in categories" :key="category">
      <h2 :id="`category-${category}`" class="postsMap-item-title">{{ category }}</h2>
      <PostCard v-for="post in filteredPosts(category)" :key="post.url" :post="post" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.postsMap {
  margin: 0 auto;
  padding: 12px;
  max-width: 600px;
  &-title {
    font-size: 24px;
    font-weight: bold;
  }
  &-categories {
    margin-bottom: 32px;
    padding: 12px 0;
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    &-item {
      display: flex;
      align-items: center;
      font-size: 18px;
      color: var(--vp-c-brand-1);
    }
  }
  &-item {
    margin-bottom: 32px;
    &-title {
      margin-bottom: 16px;
      position: relative;
      display: flex;
      align-items: center;
      font-size: 24px;
      font-weight: bold;
      &::before {
        content: '';
        margin-right: 8px;
        display: block;
        width: 5px;
        height: 24px;
        background: var(--vp-c-text-1);
      }
    }
  }
}
</style>
