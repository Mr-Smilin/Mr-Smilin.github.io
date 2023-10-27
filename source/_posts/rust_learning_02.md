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
使用 `cargo --version` 來確認是否正確安裝

```
cargo --version // cargo 1.73.0 (9c4383fb5 2023-08-26)
```

沒問題的話，接著使用 `Cargo` 創建跟昨天相似的專案。

<br>

# 創建專案

<br>

在專案目錄(rust_project)下輸入創建專案的指令

`cargo new _02_hello_cargo`

現在我們有名為 `_02_hello_cargo` 的資料夾，裡面結構如下

```
src
  main.rs
.gitignore
Cargo.toml
```

`src` - 常見程式開發檔案目錄，看就知道

`src\main.rs` - 主程式

`.gitignore` - git 的描述文件，主要功能是防止裡面提到的檔案在 git 傳輸時被包進去(Ex:log/target)

`Cargo.toml` - 打開來看了下，應該是專案描述文件，對應 node 的 `package.json`

<br>

## 編譯(build)

<br>

試著 build 起這個專案看看  
`cargo build`

執行後，專案內多出了幾個檔案

```
target
  debug
    _02_hello_cargo.exe
    more debug files...
  .rustc_info.json
  CACHEDIR.TAG
Cargo.lock
```

`Cargo.lock` - 對應 node 的 `package-lock.json`

`target\debug\_02_hello_cargo.exe` - 我們產出的執行檔，debug 大概是 building 的默認方式，之後應該會有相對嚴謹的方法

```
.\target\debug\_02_hello_cargo // Hello, world!
```

<br>

## 編譯並運行(run)

<br>

Cargo 有提供一種命令，可以將編譯與運行合併成一個指令

```
cargo run // Hello, world!
```

如果開發檔案沒有修改，`cargo run` 不會重建 target  
加上合併兩個步驟，比 `cargo build` 方便許多。

<br>

## 檢查(check)

<br>

除了編譯與運行，Cargo 當然也提供了檢查命令

```
cargo check
  /**
    Checking _02_hello_cargo v0.1.0(C:\my\01\git\rust\_02_hello_cargo)
    Finished dev [unoptimized + debuginfo] target(s) in 0.07s
  **/
```

單純的 `check` 比 `build` 快上許多  
在自動化部屬等一類場景中廣泛運用。

<br>

## 正式編譯(release)

<br>

```
cargo build --release
  /**
    Compiling _02_hello_cargo v0.1.0 (C:\my\01\git\rust\_02_hello_cargo)
        Finished release [optimized] target(s) in 0.36s
  **/
```

使用 `--release` building 的檔案會放在 `target\release`  
與 debug 版本不同，release 的編譯過程比較久，但會最佳化產出的結果

因此，使用 debug 開發可以有效降低等待編譯的時間  
需要發佈檔案時，再使用 release。

<br>

# 今日小結

<br>

`cargo --version` 驗證版本

`cargo new {project_name}` 創建專案

`cargo build` 編譯專案

`cargo run` 編譯&運行專案

`cargo check` 驗證專案

`cargo build --release` 正式版本的編譯
