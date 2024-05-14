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
