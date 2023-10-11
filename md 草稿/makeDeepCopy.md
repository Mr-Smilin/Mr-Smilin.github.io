---
toc: true
title: 實作 js 的深拷貝過程
date: 2023-09-11 18:00
tags: [javascript]
categories:
  - [程式簡記, 程式相關, javascript]
---

# 深拷貝實現

<br>

之前有提到 js 的 `structuredClone`，  
在 `structuredClone` 出世以前，最簡易的深拷貝實現是這樣的

```
JSON.parse(JSON.stringify());
```

這個寫法大致上有幾個缺點

- 忽略 `function`
- 忽略原形鏈
- 忽略 `undefined`
- 子層太多會導致 `stack overflow`

<br>

讓我們寫一個深拷貝的實現

```
function clone(target) {
  if (typeof target === "object") {
    let cloneTarget = {};
    for (const key in target) {
      cloneTarget[key] = clone(target[key]);
    }
    return cloneTarget;
  } else {
    return target;
  }
}
```

<br>
執行結果：
  
```
const target = {
    field1: 1,
    field2: undefined,
    field3: 'ConardLi',
    field4: { child: 'child', child2: { child2: 'child2' } },
};

console.log(clone(target));
/_
{ field1: 1,
field2: undefined,
field3: 'ConardLi',
field4: { child: 'child', child2: { child2: 'child2' } } }
_/

```

這是最基本的深拷貝，這段深拷貝可以讓你了解是如何用遞歸解決問題，但是這個代碼還有許多缺點；
比如，還沒有考慮數組。

<br><br>

## 考慮數組

<br>

上面的代碼我們實現了基本的深拷貝，但我們只考慮了基本的 `object`，下面我們將數組類型納入邏輯

```

function clone(target) {
if (typeof target === "object") {
let cloneTarget = Array.isArray(target) ? [] : {};
for (const key in target) {
cloneTarget[key] = clone(target[key]);
}
return cloneTarget;
} else {
return target;
}
};

```

<br>

執行結果：

```

const target = {
field1: 1,
field2: undefined,
field3: { child: 'child' },
field4: [2, 4, 8],
};

console.log(clone(target));
/_
{ field1: 1,
field2: undefined,
field3: { child: 'child' },
field4: [ 2, 4, 8 ] }  
_/

```
成功，代碼現在可以處理數組了。

<br><br>

## 循環引用

<br>

我們執行一段代碼

```

const target = {
field1: 1,
field2: undefined,
field3: { child: "child" },
field4: [2, 4, 8],
};
target.target = target;

```

可以看到下面的結果：
```

RangeError: Maximum call stack size exceeded

```

因為 `target.target`，循環引用導致 `stack overflow` 了

要解決循環引用問題，我們可以額外創建一個存儲空間，用來存放 `target` 跟 `cloneTarget` 的對應，如果 `target` 已經存在存儲空間時，就直接返回原本的 `target` ，沒有就將 `target` 放入 `cloneTarget`

```

function clone(target, map = new Map()) {
if (typeof target === "object") {
let cloneTarget = Array.isArray(target) ? [] : {};
if (map.get(target)) {
return map.get(target);
}
map.set(target, cloneTarget);
for (const key in target) {
cloneTarget[key] = clone(target[key], map);
}
return cloneTarget;
} else {
return target;
}
}

```

<br>

執行結果：

```

const target = {
field1: 1,
field2: undefined,
field3: { child: 'child' },
field4: [2, 4, 8],
};
target.target = target;

console.log(clone(target));
/_
{ field1: 1,
field2: undefined,
field3: { child: 'child' },
field4: [ 2, 4, 8 ],
target: [Circular] }
_/

```

可以看到，執行沒有報錯，且 `target` 屬性，變成了一個 `Circular` 類型，這表示 `target` 底下又引用了 `target` ，即循環引用。

<br><br>

## WeakMap

接下來，我們要將原本的 `Map` 類型改成 `WeakMap`，為什麼呢？來看看 `WeakMap` 的介紹：

> WeakMap 是一組 `key` / `value` 的集合，其中 `key` 是弱引用的。 `key` 必須是對象，而 `value` 可以是任意的。

  <br>
甚麼是弱引用？

> 在程序中，弱引用與強引用相對，是指不能確保引用對象不會被垃圾回收器回收的引用。一個對象若只有弱引用所引用，會被認為是不可訪問(或弱可訪問)，並因此可能在任何時間點被回收。

  <br>

我們手動創建一個 `let obj = {}` ，默認創建了一個強引用對象，只有我們手動將 `obj = null` ，他才會被垃圾回收機制回收；如果是弱引用對象，垃圾回收機制會自動幫我們回收。

```

let obj = { name: "mr-smilin" };
const target = new Map();
target.set(obj, "微笑工房");
obj = null;

```
雖然我們手動將 `obj = null` 進行釋放，由於 `target` 依然對 `obj` 存在強引用關係，所以 `obj` 沒有被釋放。

<br>

```

let obj = { name: "mr-smilin" };
const target = new WeakMap();
target.set(obj, "微笑工房");
obj = null;

```
如果是 `WeakMap` ， `target` 跟 `obj` 就是弱引用關係，會被垃圾回收機制回收。

<br>

# 其他數據類型

目前我們的代碼只考慮了 `object` 跟 `array` 兩種數據類型，實際上所有的類型遠遠不止這兩種。

<br>

首先，我們要先考慮 `function` 跟 `null` 兩種特殊類型

```

function isObject(target) {
const type = typeof target;
return target !== null && (type === "object" || type === "function");
}

```

```

if (!isObject(target)) {
return target;
}

```

<br><br>

# 獲取類型

<br>

我們可以使用 `toString` 來獲取準確的數據類型：

> 每一個引用類型都有 `toString` 方法，默認情況下， `toString()` 方法被每個 `Object` 對象繼承。
>
> 如果 `toString` 在自定義對象中被覆蓋， `toString()` 返回 `[object type]`,其中 `type` 是對象的類型。

需要注意的是，只有當 `toString` 未被自定義對象覆蓋時，才能獲得我們期望的效果；
事實上，大部分引用類型比如 `Array`,`Date`,`RegExp` 等都重寫了 `toString` 方法。

我們可以直接調用 `Object` 上未被覆蓋的 `toString()` ，使用 `call` 改變 `this` 指向來獲得我們預期的結果。

```

function getType(target) {
return Object.prototype.toString.call(target);
}

```

<br>

下面我們抽離一些常用的類型以便後面使用：

```

const mapTag = "[object Map]";
const setTag = "[object Set]";
const arrayTag = "[object Array]";
const objectTag = "[object Object]";
const boolTag = "[object Boolean]";
const dateTag = "[object Date]";
const errorTag = "[object Error]";
const numberTag = "[object Number]";
const regexpTag = "[object RegExp]";
const stringTag = "[object String]";
const symbolTag = "[object Symbol]";

```

我們簡單的將上面的類型分成兩種：

- 可以繼續遍歷的類型
- 不可以繼續遍歷的類型

我們分別做成兩種拷貝邏輯。

<br><br>

## 可以繼續遍歷的類型

<br>

我們已經實現了 `object` 跟 `array` 兩種可遍歷類型，另外還有 `Map` ， `Set` 等都是可以繼續遍歷的類型，這邊我們只考慮這四種。

我們首先需要獲取他們各自的初始化數據，例如原本的 `{}` 跟 `[]` ，我們可以通過拿到 `constructor` 的方式來獲取。

例如： `const target = {}` 就是 `const target = new Object()` 的語法糖，另外由於我們使用 `constructor` ，構造方法可以保留對象原形上的數據，如果使用 `{}` ，原型便會丟失。

```

function getInit(target) {
const Ctor = target.constructor;
return new Ctor();
}

```

<br>

下面，我們改寫 `clone`，對可遍歷數組做處理：

```

function clone(target, map = new WeakMap()) {
if (!isObject(target)) {
return target;
}
const type = getType(target);
let cloneTarget;
if (deepTag.includes(type)) {
cloneTarget = getInit(target, type);
}
if (map.get(target)) {
return map.get(target);
}
map.set(target, cloneTarget);
if (type === setTag) {
target.forEach((value) => {
cloneTarget.add(clone(value, map));
});
return cloneTarget;
}
if (type === mapTag) {
target.forEach((value, key) => {
cloneTarget.set(key, clone(value, map));
});
return cloneTarget;
}
const keys = type === arrayTag ? undefined : Object.keys(target);
forEach(keys || target, (value, key) => {
if (keys) {
key = value;
}
cloneTarget[key] = clone(target[key], map);
});
return cloneTarget;
}

```

<br>

執行結果：

```

```

<br>



<br>

文章參考：
[如何写出一个惊艳面试官的深拷贝?](https://juejin.cn/post/6844903929705136141)

<br>
```
