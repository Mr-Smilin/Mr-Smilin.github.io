---
toc: true
title: Rust 學習紀錄[2] = Rust 的 NPM
date: 2023-10-27 21:00
tags: [Rust]
categories:
  - [程式簡記, 程式相關, Rust]
---

讓我們接著原本的進度繼續

<!-- more -->

<br>

# Cargo

<br>

`Cargo` 是 `Rust` 的專案建置工具以及套件管理器  
恩..聽起來是個 `npm`

我們在安裝 `rustup` 時已經一併安裝了 `Cargo`  
使用 `Cargo --version` 來確認是否正確安裝

```
Cargo --version // cargo 1.73.0 (9c4383fb5 2023-08-26)
```

沒問題的話，讓我們使用 `Cargo` 創建跟昨天相似的專案。

<br>

# 創建專案

<br>

在專案目錄(rust_project)下輸入創建專案的指令

`cargo new _02_hello_cargo`

現在我們應該會有個 `_02_hello_cargo` 的資料夾，裡面結構如下

```
src
  main.rs
.gitignore
Cargo.toml
```
