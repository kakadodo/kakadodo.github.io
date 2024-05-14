import { defineConfig, loadEnv } from "vitepress";
const env = loadEnv("", process.cwd());

import { head } from "./configs/head";
import { themeConfig } from "./configs/theme";
import markdownItMark from 'markdown-it-mark';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  cleanUrls: true,
  lastUpdated: true,
  title: "雀爾西's Blog 🐣",
  description: "前端學習筆記 🐣",
  head,
  lang: "zh-TW",
  themeConfig,
  markdown: {
    image: {
      lazyLoading: true,
    },
    config: (md) => {
      md.use(markdownItMark)
    }
  },
  vite: {
    define: {
      "process.env": env,
    },
  },
  sitemap: {
    hostname: 'https://kakadodo.github.io'
  }
});
