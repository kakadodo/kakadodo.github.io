import { loadEnv, type HeadConfig } from "vitepress";
const env = loadEnv("", process.cwd());

export const head: HeadConfig[] = [
  ["link", { rel: "icon", href: "/logo.png" }],
  // OG meta tags
  [
    "meta",
    {
      property: "og:type",
      content: "website",
    },
  ],
  [
    "meta",
    {
      property: "og:title",
      content: "雀爾西's Blog 🐣",
    },
  ],
  [
    "meta",
    {
      property: "og:description",
      content: "前端學習筆記 🐣",
    },
  ],
  [
    "meta",
    {
      property: "og:image",
      content: "https://kakadodo.github.io/logo.png",
    },
  ],
  [
    "meta",
    {
      property: "og:url",
      content: "https://kakadodo.github.io",
    },
  ],
  // GA4
  [
    "script",
    {
      async: "",
      src: `https://www.googletagmanager.com/gtag/js?id=${env.VITE_GA_TRACKING_ID}`,
    },
  ],
  // GA4
  [
    "script",
    {},
    `window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${env.VITE_GA_TRACKING_ID}');`,
  ],
  // GTM
  [
    "script",
    {},
    `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','${env.VITE_GTM_TRACKING_ID}');`,
  ],
];
