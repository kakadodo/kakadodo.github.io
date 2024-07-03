---
title: CSS - 你可能不知道的 Border Radius
categories: CSS
tags:
  - CSS
date: 2019-01-22
thumbnail: https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20190108-css-about-css.jpg?alt=media&token=e3c7ccc9-7207-4705-a791-c9ab07627e9b
---

# {{ $frontmatter.title }}

border-radius 是 CSS 中很常使用到的屬性之一，除了可以讓矩形的外觀具有圓角外，更可以改變成圓形，但其實它可以讓矩形"不只是"變成圓型喔!!這篇會記錄比較不一樣的用法~

![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20190108-css-about-css.jpg?alt=media&token=e3c7ccc9-7207-4705-a791-c9ab07627e9b "好加在有 CSS")

border-radius 到底是怎麼產生的呢?為何設定一個值就可以讓直角變成有弧度的角?弧度又是依據甚麼方式計算來的?

我們可以想像在設定 radius 時會在矩形的四個角分別畫出一個圓，這個圓會因為半徑不同而形成正圓或是橢圓，最貼近邊角的弧形就是最後會得到的邊角弧度。

以 `border-radius: 15px;` 為例:
![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20190122-css-about-css-border-radius-1.jpg?alt=media&token=4b959606-922f-462a-8306-27753373bc3c "好加在有 CSS - boder-radius")
當 radius 只設定一個值時表示四個角的 x, y 半徑是一樣的，因此產生出來的圓角是相同且對稱。這樣看的話其實設定四個角的數值會產生的圖型就不難想像了吧!

![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20190122-css-about-css-border-radius-2.jpg?alt=media&token=bbcd5c19-a094-4c83-a77d-9758f030b8cc "好加在有 CSS - boder-radius")

設定兩個數值的話彼此是對角的為同一組，左上對右下、右上對左下的概念，以 `border-radius: 30% 50%` 為例:
![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20190122-css-about-css-border-radius-3.jpg?alt=media&token=5a5ddac3-03a0-47ee-a077-e8fe6d431e4e "好加在有 CSS - boder-radius")

這幾種用法已經能產生不規則且形狀較特別的圖型了，上面的設定方式可以觀察的出來畫出來的圓都是正圓，因為 x、y 其實是取相同的 radius。border-radius 其實有提供另外一種設定方式，可以分別指定每個角的 x 跟 y 半徑值喔!
```css
border-radius: x1 x2 x3 x4 / y1 y2 y3 y4;
```

![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20190122-css-about-css-border-radius-4.jpg?alt=media&token=475a19b7-b449-48a8-842c-bf6874550064 "好加在有 CSS - boder-radius")
要分別設定 x、y 半徑中間會使用 `/` 符號區隔，前方寫四個角的水平半徑，後方則是四個角的垂直半徑，指定順序都是順時針方向。當然這種設定一樣可以簡寫:
- `border-radius: x / y;`: 四個角的 x 跟四個角的 y 都相同。
- `border-radius: x1 x2 / y1 y2;`: x1、y1 為左上及右下角，x2、y2 為右上及左下角。
- `border-radius: x1 x2 x3 / y1 y2 y3;`: x1、y1 為左上角，x2、y2 為右上及左下角，x3、y3 為右下角。
- `border-radius: x1 x2 x3 x4 / y1 y2 y3 y4;`: 四個角 x、y 都各自設定。

由於 x 半徑及 y 半徑都能各別設定，產生出來的圓就不會只侷限在正圓了，這種設定方式非常適合搭配 `%` 單位，只要知道每個半徑在自己的邊長上佔的比例為多少，就可以輕鬆寫出想要的圖型喔!矩形一邊的邊長全長為 100 %，所以只要屬於同一邊長的兩個值加總起來等於 100%，就會是弧度漂亮沒有直線的圓。
![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20190122-css-about-css-border-radius-5.jpg?alt=media&token=d6b79754-2415-4700-8f07-a58f2e2f1d6f "好加在有 CSS - boder-radius")

蛋型就能靠這種方式達成啦~不過矩形本體最好是長方型會比較像喔~正方型會變成像徽章的感覺。
![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20190122-css-about-css-border-radius-6.jpg?alt=media&token=7e0f3a6d-605c-497f-b749-686ccf7d3166 "好加在有 CSS - boder-radius")
