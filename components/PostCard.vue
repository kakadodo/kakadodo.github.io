<script setup lang="ts">
import { PropType } from 'vue'
import { type Post } from '../docs/posts.data';
defineProps({
  post: {
    type: Object as PropType<Post>,
    required: true
  }
})
</script>

<template>
  <a class="postCard" :href="post.url">
    <div class="postCardLeft" v-if="post.thumbnail">
      <img class="postCard-img" :src="post.thumbnail" :alt="post.title" />
    </div>
    <div class="postCardRight">
      <h3 class="postCard-title">{{ post.title }}</h3>
      <p class="postCard-date">{{ post.date.string }}</p>
      <div class="postCard-tags">
        <span v-for="tag in post.tags" :key="tag">{{ tag }}</span>
      </div>
    </div>
  </a>
</template>

<style scoped lang="scss">
.postCard {
  margin-bottom: 16px;
  display: block;
  padding: 12px;
  display: flex;
  gap: 12px;
  align-items: center;
  border-radius: 10px;
  border: 1px solid var(--vp-c-text-2);
  line-height: normal;
  transition: background-color 0.3s;
  &:hover {
    background-color: var(--vp-c-brand-soft);
    .postCard-img {
      filter: none;
    }
  }

  &-img {
    border-radius: 8px;
    filter: grayscale(1);
    transition: filter 0.3s;
  }

  &-title {
    font-weight: bold;
  }

  &-date {
    font-size: 12px;
    color: var(--vp-c-text-3);
  }

  &-tags {
    margin-top: 2px;
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    font-size: 12px;
    color: var(--vp-c-text-2);
    > span {
      display: block;
      padding: 2px 8px;
      border-radius: 100px;
      border: 1px solid var(--vp-c-text-2);
    }
  }
}
.postCardLeft {
  flex: 0 0 30%;
}
.postCardRight {
  flex: 0 1 70%;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
</style>
