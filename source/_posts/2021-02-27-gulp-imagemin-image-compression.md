---
title: Gulp 4 x Imagemin 自動化圖片壓縮
keywords:
  - Gulp 4, Imagemin, image compression, image optimization, compress image
categories:
  - Web Others
thumbnailImagePosition: left
date: 2021-02-27 15:00:00
thumbnailImage: https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/2021-02-27-gulp-imagemin-image-compression.jpg?alt=media&token=f976fcf8-4c94-4200-aa95-c35cb929fedc
---

最近一直在搞官網的 lighthouse 調適調到懷疑人生...舉例來說圖片檔雖然沒有轉換成 webp 格式，好歹也用各種工具把尺寸壓到小到不能再小了，一跑測試還是建議你圖片尺寸可以更小😑 是機器就可以不 care 畫質的嘛!!

<!-- excerpt -->

![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/2021-02-27-gulp-imagemin-image-compression.jpg?alt=media&token=f976fcf8-4c94-4200-aa95-c35cb929fedc 'Gulp 4 x Imagemin 自動化圖片壓縮')

## web.dev 對圖片優化的建議:

圖片的檔案大小主要會影響 lighthouse 的 performance 評分，假設你的網站頁面是第一屏佔有**巨大** banner ，該 banner 又被視為是最大內容的話就要更注意會不會影響 [LCP(Largest Contentful Paint)][LCP] 分數，LCP 是目前 [Web Vitals][webVitas] 的評斷標準之一，而且權重還特大(比重 25%)，非常容易造成 performace 分數降低。(當然也有其他因素會影響到 LCP，但圖片本身載入速度佔了一大部分)

![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/2021-02-27-gulp-imagemin-image-compression1.jpg?alt=media&token=90156609-3a2c-4e33-8b09-30796a621de6 'Gulp 4 x Imagemin 自動化圖片壓縮')

跟圖片有關的評分內容如下:
- Properly size images
- Defer offscreen images
- Efficiently encode images
- Serve images in next-gen formats

其中第三項跟第四項讓我困擾到不行，Efficiently encode images 官方說會將網站上所有圖片作 85% 壓縮品質後與原圖比較，如果潛在節省量超過 4KiB，就會建議你要作壓縮，但畢竟還是要考慮產品讓人看到的畫面...壓到會失真那種叫我怎麼接受😂，next-gen formats 則是要你轉換圖片格式成 JPEG 2000, JPEG XR, WebP，雖然 webp 支援度已經越來越好了，但還是有主力的瀏覽器沒完全支援(我沒說是 Safari 喔)，加上其他執行因素影響，還是決定先維持一般圖片格式。如果專案單純好改的話，用 webp 作主要格式之一是很推的~ kb 數跟 jpg png 差~很~大!


## Gulp 4 x Imagemin:

廢話了一堆該來寫主題了，imagemin 是 web.dev 推薦的圖片壓縮工具之一，不過他跟其他線上壓縮工具不同，沒有 GUI 介面，而是用來搭配專案或是自己另外建 CLI 來執行圖片壓縮的工具。

![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/2021-02-27-gulp-imagemin-image-compression2.jpg?alt=media&token=b4bed53f-9573-4d99-b9e5-dcd1d11a6b3b 'Gulp 4 x Imagemin 自動化圖片壓縮')

[Imagemin][Imagemin] 提供了多種圖片格式的壓縮，webp 也有支援轉換喔!壓縮方式也有分成有損跟無損格式，當然也可以設定很多細部的參數去作壓縮調整。
安裝方式可以用官方出的 CLI 或是寫 Node script 運行，也可以搭配 Webpack, Gulp 等打包、自動化工具去處理，這篇就是要來寫跟 [Gulp][Gulp] 搭配的方式啦!

以下是我有用到的 npm 套件:
```console
  <!-- 讓電腦可以直接呼叫 gulp 指令 -->
  npm install --global gulp-cli

  npm install --save-dev gulp gulp-imagemin gulp-webp gulp-clean gulp-load-plugins
```

![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/2021-02-27-gulp-imagemin-image-compression3.jpg?alt=media&token=ad05d280-a0ba-4d92-83a6-d9ba04379ad8 'Gulp 4 x Imagemin 自動化圖片壓縮')

- gulp-cli、gulp: 核心跟 cli 工具
- gulp-imagemin: gulp 用的 imagemin 版本
- gulp-webp: 裝不裝看個人~因為 gulp-imagemin 沒有含蓋 webp，所以是別的套件，不過該套件在 options 設定上是同 imagemin 的。
- gulp-clean: 可選，用途是可以在每次 run 指令時先幫你清空資料夾
- gulp-load-plugins: 也是可選，用途是前綴有 `gulp-` 的套件，在寫 `gulpfile.js` 時可以省略 require (懶人專用 😂)

安裝完後建立 gulpfile.js，這隻檔案是 gulp 運行的入口點，要跑自動化的設定都會寫在裡面，另外文章裡會特別註明 Gulp 4 是因為跟以前版本的寫法有點不同，所以這邊的程式碼是用 4 版的寫法:
```js
  const { src, dest, series } = require('gulp');
  //有 gulp 前綴的插件不用宣告的功能
  const $ = require('gulp-load-plugins')();

  // clean 輸出資料夾
  function clean() {
    return src(['./imagemin/dist'], {
      allowEmpty: true,
      read: false,
    }).pipe($.clean());
  }

  // 圖片一般格式壓縮
  function imageMin() {
    return src('./imagemin/src/*')
      .pipe(
        $.imagemin([
          $.imagemin.gifsicle({ interlaced: true }),
          $.imagemin.mozjpeg({ quality: 85, progressive: true }),
          $.imagemin.optipng({ optimizationLevel: 5 }),
          $.imagemin.svgo({
            plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
          }),
        ])
      )
      .pipe(dest('./imagemin/dist'));
  }

  // 圖片轉換 webp + 壓縮，webp 我選擇另外有需要再獨立執行
  exports.webp =  function webp() {
    return src('./imagemin/src/*')
      .pipe($.webp({quality: 50}))
      .pipe(dest('./imagemin/dist/webp'));
  }

  // 導出任務，series 表示任務會依照給定順序一步一步執行
  exports.default = series(clean, imageMin);
```
imagemin options 的相關設定可以直接參考官方 API，再來只要準備要壓縮的圖檔到指定資料夾跟呼叫指令就完成啦!上面寫了兩個執行任務，實際呼叫會用以下寫法:
```console
<!-- 執行 default 任務，也就是先 clean 再作 imageMin -->
$ gulp

<!-- 執行 webp 任務 -->
$ gulp webp
```
執行完後就可以看到 dist 資料夾中出現所有壓縮後的圖片了~~是不是 hen 方便?
還是要記得多測幾次畫質的設定，不一定每張圖片都適合同樣的畫質壓縮，難免需要人工檢查一下啦

反正都要寫這篇文章了乾脆拿部落格圖片來優化一下，發現之前真的是沒在 care 大小 😂

![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/2021-02-27-gulp-imagemin-image-compression4.jpg?alt=media&token=7138ae9c-e14d-43ac-816c-3a7cf45a91fa 'Gulp 4 x Imagemin 自動化圖片壓縮')
![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/2021-02-27-gulp-imagemin-image-compression5.jpg?alt=media&token=d6b38467-e5b5-4b46-a3e2-040ea5b4acd7 'Gulp 4 x Imagemin 自動化圖片壓縮')
這張真的太扯..我到底怎麼會讓它原本是 566 kb 的

[LCP]: https://web.dev/lighthouse-largest-contentful-paint/
[webVitas]: https://web.dev/vitals/
[Imagemin]: https://github.com/imagemin/imagemin
[Gulp]: https://gulpjs.com/

以上內容如有勘誤，還請不吝告知 🙇
