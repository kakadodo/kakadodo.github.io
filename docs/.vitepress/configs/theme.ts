import { DefaultTheme } from "vitepress/theme";
import { generateSidebar } from 'vitepress-sidebar';

const vitepressSidebarOptions = {
  documentRootPath: '/docs',
  collapsed: true,
  useTitleFromFrontmatter: true,
  sortMenusByName: true,
  sortMenusByFrontmatterDate: true,
  excludeFilesByFrontmatterFieldName: 'exclude',
};

export const themeConfig: DefaultTheme.Config = {
  // https://vitepress.dev/reference/default-theme-config
  nav: [{ text: "筆記總覽", link: "/posts-map" }],
  logo: "/logo.png",
  sidebar: generateSidebar(vitepressSidebarOptions),
  socialLinks: [{ icon: "github", link: "https://github.com/kakadodo" }],
  footer: {
    copyright: "Copyright © 2024-present Chelsea",
  },
  outline: {
    level: "deep",
    label: "頁面導航",
  },
  docFooter: {
    prev: "上一篇",
    next: "下一篇",
  },
  search: {
    provider: "local",
  },
};
