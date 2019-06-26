---
title: 好加在有 CSS - 你可能不知道的 Border Radius
keywords:
  - CSS, border-radius
categories:
  - CSS
tags:
  - CSS
thumbnailImagePosition: left
date: 2019-01-22 09:00:00
thumbnailImage: https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20190108-css-about-css.jpg?alt=media&token=4f09cf23-48dd-4727-8006-9fdbd4f1b638
---

標題取這樣應該會有人想說誰不知道 border-radius 吧! XD
border-radius 是 CSS 中很常使用到的屬性之一，除了可以讓矩形的外觀具有圓角外，更可以改變成圓形，但其實它可以讓矩形"不只是"變成圓型喔!!這篇會記錄比較不一樣的用法~
<!-- excerpt -->
![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20190108-css-about-css.jpg?alt=media&token=4f09cf23-48dd-4727-8006-9fdbd4f1b638 "好加在有 CSS")

網路上雖然有很多關於 border-radius 的說明文章，但大多只點到怎麼改變矩形四個角的弧度數值而以，自己當初在學 CSS 時，有實體課程的老師教到可以利用 border-radius 做出"蛋型"外觀，整個神奇到不行啊!!!要產生出這種形狀，屬性上的設定方式會跟原本的寫法不太一樣，那時覺得有點深奧因此學完過一陣子就還給老師了 XDDD 這陣子回來摸 CSS 想到有這招可以用，乾脆來重新研究一番。

border-radius 到底是怎麼產生的呢?為何設定一個值就可以讓直角變成有弧度的角?弧度又是依據甚麼方式計算來的?

我們可以想像在設定 radius 時會在矩形的四個角分別畫出一個圓，這個圓會因為半徑不同而形成正圓或是橢圓，最貼近邊角的弧形就是最後會得到的邊角弧度。

以 `border-radius: 15px;` 為例:
![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20190122-css-about-css-border-radius-1.jpg?alt=media&token=2f6cb6e4-167e-42d1-bd64-186855048544 "好加在有 CSS - boder-radius")
當 radius 只設定一個值時表示四個角的 x, y 半徑是一樣的，因此產生出來的圓角是相同且對稱。這樣看的話其實設定四個角的數值會產生的圖型就不難想像了吧!

![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20190122-css-about-css-border-radius-2.jpg?alt=media&token=dbc17ab4-aefa-4e43-acfd-68ed33cad97a "好加在有 CSS - boder-radius")

設定兩個數值的話彼此是對角的為同一組，左上對右下、右上對左下的概念，以 `border-radius: 30% 50%` 為例:
![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20190122-css-about-css-border-radius-3.jpg?alt=media&token=4ba1806b-32a6-4a99-bf38-ec65d00330d2 "好加在有 CSS - boder-radius")

這幾種用法已經能產生不規則且形狀較特別的圖型了(多少能拿出來嚇唬老闆)，不過 border-radius 真正厲害的地方不只這樣而已啊!!!上面的設定方式可以觀察的出來畫出來的圓都是正圓，因為 x、y 其實是取相同的 radius。border-radius 其實有提供另外一種設定方式，可以分別指定每個角的 x 跟 y 半徑值喔!
```css
border-radius: x1 x2 x3 x4 / y1 y2 y3 y4;
```

![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20190122-css-about-css-border-radius-4.jpg?alt=media&token=0acdb7f0-58aa-4fa9-a1ed-828f8fac41f1 "好加在有 CSS - boder-radius")
要分別設定 x、y 半徑中間會使用 `/` 符號區隔，前方寫四個角的水平半徑，後方則是四個角的垂直半徑，指定順序都是順時針方向。當然這種設定一樣可以簡寫:
- `border-radius: x / y;`: 四個角的 x 跟四個角的 y 都相同。
- `border-radius: x1 x2 / y1 y2;`: x1、y1 為左上及右下角，x2、y2 為右上及左下角。
- `border-radius: x1 x2 x3 / y1 y2 y3;`: x1、y1 為左上角，x2、y2 為右上及左下角，x3、y3 為右下角。
- `border-radius: x1 x2 x3 x4 / y1 y2 y3 y4;`: 四個角 x、y 都各自設定。

由於 x 半徑及 y 半徑都能各別設定，產生出來的圓就不會只侷限在正圓了，這種設定方式非常適合搭配 `%` 單位，只要知道每個半徑在自己的邊長上佔的比例為多少，就可以輕鬆寫出想要的圖型喔!矩形一邊的邊長全長為 100 %，所以只要屬於同一邊長的兩個值加總起來等於 100%，就會是弧度漂亮沒有直線的圓。
![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20190122-css-about-css-border-radius-5.jpg?alt=media&token=a23e016a-bcf0-4a74-b57b-becb744285a2 "好加在有 CSS - boder-radius")

蛋型就是靠這種方式達成的啦~~不過矩形本體最好是長方型會比較像喔~正方型會變成像徽章的感覺。
![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20190122-css-about-css-border-radius-6.jpg?alt=media&token=873d9880-3d63-4e99-96c6-bbc8ace3c8e2 "好加在有 CSS - boder-radius")


以上內容如有勘誤，還請不吝告知🙇