---
toc: true
title: 淺談 js 深拷貝與淺拷貝的差異
date: 2023-09-15 12:00
tags: [javascript]
categories:
  - [程式簡記, 程式相關, javascript]
---

# Deep copy 和 Shallow copy

<br>

先來個考題：

```
a = { foo: "bar" };
b = a;
b.foo = "baz";

console.log(a.foo); // 印出?
```

<!-- more -->

<details>
<summary>答案</summary>
<br>
baz
</details>

<br><br>

下一題：

```
a = { foo: "bar" };
b = structuredClone(a); // 深拷貝
b.foo = "baz";

console.log(a.foo); // 印出?
```

<details>
<summary>答案</summary>
<br>
bar  
<br><br>
深拷貝(Deep Copy) 可以將內層對象一併拷貝  
</details>

<br><br>

---

<br>

## Shallow copy

<br>

淺拷貝(Shallow Copy) 與深拷貝同樣是用來拷貝物件層級，避免指向同一記憶體位置

與深拷貝不同的是，淺拷貝只會複製第一層的對象，如果是 `Object.Object` 的結構就沒轍。

<br>

### Object.assign

<br>

`Object.assign` 屬於淺拷貝(Shallow Copy)  
在上述案例中，可以得到跟深拷貝一樣的結果

```
a = { foo: { fpp: "bar" } };
b = Object.assign({}, a);
b.foo.fpp = "baz";

console.log(a.foo.fpp); // 印出baz
```

<br>

### 解構賦值

<br>

解構賦值是 `ES6` 以後的語法糖，同樣屬於淺拷貝

```
const a = { b: 1 };
const c = { ...a }; // 解構賦值
c.b = 2;
console.log(a); // { b: 1 }
```

得益於其精簡的代碼，實務上很常使用。

<br><br>

---

<br>

## Deep copy

<br>

與前面提到的淺拷貝不同，深拷貝對於深層結構也能一併複製

<br>

### 早期的深拷貝

```
JSON.parse(JSON.stringify());
```

這個寫法大致上有以下缺點：

- 忽略 `function`
- 忽略原形鏈
- 忽略 `undefined`
- 子層太多會導致 `stack overflow`

儘管如此，由於已經可以處理大多狀況  
如果不是為了性能或是特殊邏輯，此寫法已經夠用，是常見的深拷貝實現。

<br>

### structuredClone

`structuredClone` 是 `node.js` 17 版以後支援的官方深拷貝實現

目前各大瀏覽器默認支援此語法

![1](https://i.imgur.com/tPXjO1o.png)

<br>

`structuredClone` 存在一些限制

不允許結構中存在 `Error` 、 `Function` 以及 `DOM` 對象

不保留 `RegExp` 對象的 `lastIndex`

不保留 `read-only` 等描述符，即無法限制 `setters` `getters`

不保留原形鏈
