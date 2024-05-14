---
title: 變數 (Variable) 與型別 (Type)
categories: JavaScript
tags:
  - JavaScript
date: 2018-03-19
thumbnail: https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20180319-js-about-javascript.jpg?alt=media&token=68f6351d-34bc-45bf-ae3f-9671da27b39d
---

# {{ $frontmatter.title }}

![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20180319-js-about-javascript.jpg?alt=media&token=68f6351d-34bc-45bf-ae3f-9671da27b39d "這個朋友必交! 關於 JavaScript 的眉眉角角")

### 變數 (Variable)
變數可以把他想成是一個空的容器，這個容器你可以給他取名字、放你想要放的內容，但容器本身宣告的位置很重要，如果把它放在特定的房間( local area )裡，那就只能在那房間使用它;如果放在連接每一處的走廊上( global area )，則哪裡都可以取得它。變數一般透過宣告來定義，當然也可以不宣告直接寫變數，如果你想造成不必要的麻煩..

變數可分為全域變數及區域變數兩種，全域變數的特點是大家都可以取用，且會一直存於記憶體中，區域變數則只存在 function 中，當 function 執行完後，該變數也會於記憶體中消失。(function 為變數有效範圍的最小切分單位，ES6 的 let 和 const 例外)

- 使用 var 宣告變數

  var 宣告的變數為全域或區域要看宣告的位置是否在 function 中，如果寫在 for 迴圈或 if 判斷式中，還是會被當成全域變數喔!
  ```js
  var a='我是全域變數'; //全域
  console.log(a); //我是全域變數

  // function 內宣告的變數為區域變數
  function showAB(){
    var b='我是區域變數'; //區域
    console.log('b: '+b, 'a: '+a); //區域可以取得全域的變數
  }

  showAB(); //b:我是區域變數, a:我是全域變數
  console.log(b); //b is not defined，找不到變數b

  // for迴圈及 if判斷中的變數宣告皆為全域變數
  for(var i=0; i<1; i++){
    var c='我在for迴圈中';
    console.log('迴圈內的console: '+c); //迴圈內的console: 我在for迴圈中
  }
  console.log('迴圈外的console: '+c); //迴圈外的console: 我在for迴圈中

  if(2>1){
    var d='我在if判斷中';
    console.log('if內的console: '+d); //if內的console: 我在if判斷中
  }
  console.log('if外的console: '+d);  //if外的console: 我在if判斷中
  ```

- ES6 新增兩種宣告的方式: let 與 const ( ES6 語法使用時須注意瀏覽器支援度)
  - let 可當作是改良過的 var ，區域更分明、也可避免汙染全域變數，以區塊大括號`{}`作為變數範圍的分界，因此在 for 迴圈及 if 判斷中宣告就會是區域變數。
  - const 則是常數，必須在宣告時就給定初始值，不能重新指定值，也不能重新宣告。
  至於何時要用 let 或 const，最簡單的辨別方式就是值是否會改變，像 ESlint 等程式碼檢查工具都會要求盡量用 const 來宣告，除非你的程式碼會讓這個變數的值被改變。
  ```js
  const a='我是用const定義的a';
  a='來啊來啊!改變我啊'; // TypeError，不能改變值
  const a='來啊來啊!重新宣告我啊!'; //SyntaxError，常數已被宣告
  const b; //SyntaxError，常數遺失初始值

  // for迴圈就適合用 let 來宣告變數
  for(let i=0; i<1; i++){
    console.log(i); //0
  }
  console.log(i); //i is not defined
  ```

- 除非不確定變數型別，建議都先設定變數的初始值型別如`var a=""; //字串`、`var a=0; //數字`

### 型別 (Type)
JavaScript 是一種弱型別的語言，它對型別的要求沒那麼嚴謹，可以在過程中一再的做型別轉換。
主要有六種資料型別: Boolean、Null、Undefined、Number、String 跟 Object。(ES6 有新增第七種 Symbol 型別)

- Boolean: 布林值，也就是 true / false
- Null: 空值
- Undefined: 值未定義，但不是空值喔!
- Number: 數值，整數、浮點數等
- String: 字串，用引號`""`框起來的內容，即使內容是數字也會視為字串型別
- Object: 物件，除了上述的基本型別外，其餘都是物件(Array、Function、DOM、BOM..)

其中 Null 跟 Undefined 應該是最容易讓人困惑的型別，乍看之下兩者好像差不多意思，但其實完全不一樣啊~
Null 可以當作這個變數有被指定一個值，只是這個值叫做空值，也就是沒東西。但 Undefined 則是根本沒被指定任何值，它是一個尚未被定義的狀態。很多大神及講師都會建議變數應避免設定 undefined 而是使用 null，因為 undefined 可能會造成程式發生錯誤。

要檢查型別，可使用`typeof(內容)`語法來查詢。
推薦 Kuro 大大於 iT 鐵人賽寫的 ["重新認識 JavaScript - 物件、陣列以及型別判斷"](https://ithelp.ithome.com.tw/articles/10190962) ，文章有詳細介紹型別判斷跟一些比較特殊的狀況。

像是`typeof(null)`結果是 object 確實有夠莫名其妙...