---
title: 第一次用 Hexo 就搞死我 - 建置 Hexo 及佈署到 GitHub Pages
keywords:
  - Hexo
thumbnailImagePosition: left
autoThumbnailImage: 'yes'
metaAlignment: center
date: 2018-03-08 14:06:01
categories:
  - Hexo
tags:
  - Hexo
  - GitHub
thumbnailImage: https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20180308-hello-hexo.jpg?alt=media&token=000d57fc-2758-49e4-a640-aba5c780ee0b
---

各位觀眾!!!
終於讓 blog 上線了!!! (腦內開啟無限循環灑花系統 ｡:.ﾟヽ(*´∀`)ﾉﾟ.:｡ )
<!-- excerpt -->
![hello hexo image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20180308-hello-hexo.jpg?alt=media&token=000d57fc-2758-49e4-a640-aba5c780ee0b "建置 Hexo 及佈署到 GitHub Pages")

前陣子在 Facebook 看了[卡斯柏](https://www.facebook.com/WccCasper/)老蘇的線上直播教學[使用 Hexo 打造部落格](https://www.facebook.com/WccCasper/videos/486603828402512/)後，一直想找個時間來現學現做自己的部落格，當作自己在前端路程打滾中學到碰到被雷到的心得筆記，趁最近有點小空來嘗試一下，但是 ~~~ 果然看得容易，做得要人命。🙄

先來說說我碰到甚麼問題，下面再來寫最終的建置流程。

---

## Situation

1. Hexo CLI 預設的 theme **landscape** 跟 GitHub 有衝突，推原始檔到遠端 repo 時會收到信件通知這個主題不兼容無法運作
  * 之前看教學時明明很正常，自己做就碰到這狀況，一度感到懵逼...但想想最後也會換主題所以就先隨他了
  * 後來發現用其他主題也會出現這個問題，再度爬了 Stack Overflow 查到目前的 GitHub Pages 會擋第三方的主題，如果要使用非官方支援的主題，需要將 Hexo 的靜態檔佈署到 master 上而不是 gh-pages。
2. 使用 `$ hexo d` 指令佈署到 GitHub 會報錯，內容大致是顯示 bash err or 找不到這個 repo or branch 不存在 or 無權限之類的詭異警示
  * 這段就是把我搞死的大地雷!!用 Git 推送原始檔是成功的，但用 hexo 推到 gh-pages 就是會出錯，來來回回試了好幾次，重新安裝 hexo、重新建立 GitHub repo，之後又看了半天的 Stack Overflow ，終於推送成功了 (╯‵□′)╯︵┴─┴

## Solution

要解決上述第二點的問題，首先講一下自己當下的環境配置 :
- win7 32位元的 PC(覺得公司還在用 win7 有點神奇)
- 編輯器 vscode(終端機也用它的)
- GitHub 的 repo 用 https 連接
- 還沒換掉的 landscape 主題 XDD

一開始想說會不會是有 npm 套件不支援 32位元系統(在運行 npm install 時會有警告跳出)，但如果一開始就做這樣的假設，那我也等於 GG 了，於是先跳過這念頭。

再來是 vscode 的終端機，我是設定成 bash，但之前爬文時有看別人說 vscode 打的指令可能會報錯，於是又另外開了 git bash 來推送，結果還是不行。

主題雖然維持在壞掉的 landscape 但一開始推原始檔時是成功的，所以應該不是它的問題。

最後就是 GitHub repo 的連接方式了!因為一直是用 https 連接，也沒發生錯誤過，這次被卡到陰後..上 Stack Overflow 查才看到有人說建議用 SSH 方式連接。但 SSH 於我如隔壁棚的霧霾...耗了超多時間才建好連接點。

經過一整天的折磨後，終於用 hexo 指令推成功了!!
整體的結論是: 使用 SSH 作為 repo 連接方式，git bash 來輸入指令，用第三方的主題時，部落格靜態檔要發布在 master 而不是 gh-pages。

---

## 建置及發布流程

1. 電腦需安裝 [Node.js](https://nodejs.org/en/) 來執行 npm 相關套件，[git](https://git-scm.com/) 來執行版本控制及部落格推送。

2. 安裝重點工具 Hexo CLI，建置部落格就靠它了!!詳細的操作步驟可以參考 [Hexo 的官網](https://hexo.io/zh-tw/index.html)介紹，繁體中文揪甘心! CLI 建立完成後，記得另外安裝推送到遠端儲存庫的 npm 套件，這邊我是使用 **hexo-deployer-git** 來做 GitHub 的佈署。

3. 可先運行 Hexo Server 看看網站是否正常，再針對想要調整的畫面功能來設定配置檔( Hexo CLI 產生的資料夾內的 _config.yml 檔案)，官網都有詳細介紹配置檔的設定，白癡如我也是照著官網一步一步走下去滴。

4. 如要更換部落格的主題，可至官網的[主題頁面](https://hexo.io/themes/)尋找喜歡的版面來套用，開發者們都會提供下載安裝說明及特定功能的使用方式(例如加載 Disqus 留言板、 Google Analytics 等等..)

5. 寫好部落格的文章後，就可以準備發布到網路上啦!我是使用 [GitHub](https://github.com/) 的 GitHub Pages 來架設 Hexo，因此需要有 GitHub 的帳號喔喔喔~註冊免費，功能強大，強者又多，資源又廣，好平台不用嗎?(但重點應該是它支援 Hexo 架網才對XD )
  於 GitHub 新建一個 Repository，Repository name 和部落格的網址有關，輸入 "username".github.io ，GitHub 會將這個儲存庫視為主站，主站的網址就會是 "username".github.io，網域是 Github 整個有潮到~ 但這種 name 的設定方式一個帳號只能一個，其他儲存庫的名稱則會變成這串網址後的其他路徑位置。
  repo 建好後有兩種連接方式可選擇，這邊請選 **SSH** 的方式 ( git@ 開頭的)，複製連結並打開 Hexo 的配置檔，我們需要在配置檔中將 repo 的資訊寫入。
  ```yml _config.yml
  deploy:
    type: git
    repo: git@github.com:<username>/<repo name>.git
    branch: master
  ```
  **3/10 修正 branch 需設為 master，否則 GitHub 會認為是非支援的 Jekyll 主題而報錯(很重要所以打了三遍)**

6. 下一步先來設定如何在電腦產生 SSH Key 讓我們之後可以用 SSH 連接的方式與 GitHub 溝通。打開電腦的終端機， cd 到使用者的文件夾中，執行產生 SSH Key 的指令。(<>表示要替換成自己的設定)
  ```bash
  $ cd /c/users/<your_name>
  $ ssh-keygen -t rsa -b 4096 -C <"your_email@example.com">
  ```
  ![SSH Key 產生圖例](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20180308-hello-hexo-2.jpg?alt=media&token=296513dd-b5d2-4049-b80c-d199291bd115 "SSH Key 產生畫面")

  用編輯器打開剛剛產生的 id_rsa.pub 檔案，複製裡面的代碼( Public Key )，這串落落長的代碼用來讓我們的電腦可以跟 GitHub 遠端連接，可想像成是古時候的打暗號??

  >(GitHub:今晚打老虎?)
    (電腦:賭俠2之上海灘賭聖)
    (等登~訪問通過!!)

  沒啦~我瞎掰的。
  總之，電腦或是 GitHub 其中一端沒有這組 SSH Key 來佐證彼此之間是有協定過的話，就會被拒絕訪問的概念。
  所以我們要到 GitHub 的個人設定中， **SSH and GPG keys** 這欄，點擊新增 New SSH Key ，將剛剛複製的 Public Key 貼上並儲存，這樣 GitHub 就允許有這組 Key 的電腦可以訪問它囉!
  但光設定好 GitHub 是不夠的，也要讓電腦知道有這組 Key 要使用，因此還要針對電腦這端來設定，使用的則是 Private Key。
  於終端機輸入以下指令來打開 SSH 代理並新增 Private Key 到 SSH 代理。(一樣在使用者文件夾那層操作唷)
  ```bash
  # start the ssh-agent in the background
  $ eval $(ssh-agent -s)

  # add your SSH private key to the ssh-agent
  $ ssh-add ~/.ssh/id_rsa
  # 如果有設定 passphrase 的這邊會要求輸入確認
  ```

  兩邊的 Key 設定好後，就可以來測試是否有連接成功，於終端機輸入以下指令，如過程中有詢問 Yes / No 的請選擇 Yes，連接如成功會顯示這段內容: Hi "username"! You've successfully authenticated, but GitHub does not provide shell access.
  ```bash
  $ ssh -T git@github.com
  ```

7. SSH 設定成功後，就可先做一次原始檔的推送啦!先推送原始檔(也就是 Hexo CLI 產生的檔案)到 repo 的 其他分支(我用 develop 分支)，再將 Hexo 生成後的部落格靜態檔推到 master ， master 才是真正存放部落格的內容喔。
  於終端機 cd 回 hexo 的資料夾，初始化 git 並執行一次 commit，之後增加 Github repo 的連接，推送 commit 到遠端儲存庫。
  ```bash
  # 本機的 git 初始化 + commit
  $ git init
  $ git add .
  $ git commit -m "git init"
  # 增加 repo 連結，推到遠端儲存庫
  $ git remote add origin git@github.com:<username>/<repo name>.git
  $ git push -u origin develop
  ```

8. 成功推上去後，回 GitHub 應該就會看到剛剛推送的紀錄，接下來就剩部落格的推送了，推送之前要記得先將 CLI 的檔案產生成一般網頁靜態檔，使用 Hexo 指令 `$ hexo g` 生成靜態檔(存放於 Public 資料夾)，之後便可執行 `$ hexo d` 將靜態檔佈署到 GitHub 的 master 了! 於瀏覽器輸入網址 "username".github.io 就會連到我們辛辛苦苦建好的部落格了!!我的老天鵝啊~

---

呼，就這樣我的第一篇終於完成了!原來認真的寫一篇有內容的部落格會這麼累😵
覺得更加敬佩網路上的開發者大大了~寫部落格又是一門學問吶!
BTW，這篇的標題原本設定為【第一次用 Hexo 就上手】，但果然是我想太美~ 哈哈

以上內容如有勘誤，還請不吝告知🙇