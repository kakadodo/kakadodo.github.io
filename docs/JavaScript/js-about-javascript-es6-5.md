---
title: ES6 - 數據結構 Set() 與 Map()
categories: JavaScript
tags:
  - JavaScript
  - ES6
date: 2018-09-28
thumbnail: https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20180319-js-about-javascript.jpg?alt=media&token=68f6351d-34bc-45bf-ae3f-9671da27b39d
---

# {{ $frontmatter.title }}

![blog image](https://firebasestorage.googleapis.com/v0/b/for-hexo.appspot.com/o/20180319-js-about-javascript.jpg?alt=media&token=68f6351d-34bc-45bf-ae3f-9671da27b39d "這個朋友必交! 關於 JavaScript 的眉眉角角")

Set() 與 Map() 產生出來的數據結構看起來像 Array 但卻是不同的資料類型，它們都有 `Symbol.iterator` 這個原型方法，具有可迭代的特性。

## Set()
Set 最大的特點就是 "產生一組不重複值的資料"，只要資料型態本身具有 iterator 的特性 Set 就能接收並轉成過濾後的資料。
不過 Set 產生的資料無法個別訪問也不具有 index，比較像是單純的一組值，靠新增刪除等方式直接對值做處理。如果要取用這些值，就需要轉換成 array 的型態，或是使用 for...of、forEach 等迭代方法將值挖出來。
- `new Set()`  建立 Set
- `.add(val)`  新增值
- `.delete(val)`  刪除值
- `.clear()`  清除整組 Set
- `.size`  取得 Set 值的總數
- `.has(val)`  檢查是否已經有值，回傳布林值
- `.values()`  取得 Set 的 values iterator
- `.keys()`  取得 Set 的 keys iterator，但 key 與值其實相同
- `.entries()`  同時取得 Set 的 key 跟 value，格式看起來會是 [key, value] 的 iterator
- `.forEach()`  遍歷 Set 每筆資料

```js
const people = new Set(); // 建立空的 Set
people.add('Mary'); // 新增 Mary
people.add('Ben'); // 新增 Ben
console.log(people.size); // 2，裡面有2筆資料
people.delete('Ben'); // 刪除 Ben，直接帶值進去
console.log(people.size); // 1，裡面有1筆資料
console.log(people.has('Ben')); // false
people.clear(); // 清空 Set
console.log(people.size); // 0，裡面沒資料

// 使用 values()、keys()、entries() 雖然可以取得資料，
// 但無法直接取用，要真正把值抓出來需要使用迭代方法將他們遍歷出來
people.add('Mary'); // 新增 Mary
people.add('Ben'); // 新增 Ben
console.log(people.values()); // 只會顯示是個 Set iterator 物件
people.forEach((val, key)=>{
  console.log(`${key}:${val}`);
}); // "Mary:Mary", "Ben:Ben"
```
這樣寫下來好像比用 Array 更麻煩，但如果把 Set 與 Array 結合的話就會方便很多!
```js
// 直接在 new Set() 的同時帶入一筆 array 資料
const num = new Set([1,2,3,4,5,4,3,6,7]);
console.log(num.size); // 結果是 7，已刪除重複的數字
const numArray = Array.from(num); // 使用 Array.from() 來轉成 Array 型態
console.log(numArray); // [1, 2, 3, 4, 5, 6, 7] 變回乾淨的 Array 啦!

// 上例也可以簡化成一行搞定
const numFilter = Array.from(new Set([1,2,3,4,5,4,3,6,7]));

// 也可以使用 ES6 的展開語法
const numFilter = [...new Set([1,2,3,4,5,4,3,6,7])];
```

## Map()
Map 提供了一種類似 "Object" 具有 key 與 value 的資料型態，但存放方式又像 "Array"，一筆資料本身會有兩個值，第一個值是 key，第二個值是 value，因此一組 Map 會是二維陣列的形式呈現。而新增刪除 Map 資料時會是以 key 作為辨識。Map 資料在遍歷時，順序是跟最初設定值的順序一樣。
- `new Map()`  建立 Map
- `.set(key, val)`  設定屬性跟值
- `.get(key)`  取得 key 的值
- `.delete(key)`  刪除這組 key 值
- `.clear()`  清除 Map
- `.size`  取得 Map 的總數
- `.has(key)`  檢查是否已經有 key，回傳布林值
- `.keys()`  取得 Map 的 keys iterator
- `.values()`  取得 Map 的 values iterator
- `.entries()`  同時取得 Map 的 key 跟 value，格式看起來會是 [key, value] 的 iterator
- `.forEach()`  遍歷 Map 每筆資料

```js
const family = new Map(); // 建立空 Map
family.set('Mom', 70); // set 來設定 key 跟 value
family.set('Dad', 70);
console.log(family.get('Mom')); // 70, get 使用 key 來取得 value

// 一樣可以使用 forEach 遍歷
family.forEach((value, key)=>{console.log(value, key)});

// 使用 for of 的話則是抓出 [key, value] 的陣列
for (const person of family){
  console.log(person); //['Mom', 70],['Dad', 70]
}

// Map 一樣可轉為一般陣列
console.log([...family.keys()]); // ["Mom", "Dad"]
console.log([...family.values()]); // [70, 70]
console.log([...family.entries()]); // [["Mom", 70], ["Dad", 70]]

// 當然轉成 Object 也沒問題
const familyObj = {};
for (let [key, val] of family) {
  familyObj[key] = val;
}
console.log(familyObj); // { Dad: 70, Mom: 70 }
```