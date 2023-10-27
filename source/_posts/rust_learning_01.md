---
toc: true
title: Rust 學習紀錄[1] = 日誌中的教學
date: 2023-10-27 18:00
tags: [Rust]
categories:
  - [程式簡記, 程式相關, Rust]
---

工欲善其事，必先利其器  
想學一門語言，要從一篇教學文檔找起

[官方文檔](https://doc.rust-lang.org/book/)

恩，官方文檔看起來挺不錯的，就這個吧

這篇文撰寫當下，文檔對應 Rust 版本為 `Rust 1.67.1 (released 2023-02-09) or later`  
如果因為版本不同造成閱讀的困擾的話，可以在學會安裝 Rust 後自行降版學習。

<!-- more -->

<br>

# 安裝

<br>

說是 Rust，其實第一個遇到的是 `rustup`

[Window 安裝 rustup](https://www.rust-lang.org/tools/install)

安裝過程一直 Enter 就好，之後在 cmd 下 `rustc --version`

得到版本號 `rustc 1.73.0 (cc66ad468 2023-10-03)`，表示安裝成功

其他比較常用的指令還有

更新 Rust 版本 - `rustup update`

卸載 Rust 跟 rustup - `rustup self uninstall`

查看 Rust Doc 本機離線版 - `rustup doc`

<br>

根據 Rust 自己的說明，約莫每兩周會有一次小版更新  
也因此，除非目標是維護專案，理論上更新版本 & 追蹤文檔改動會很頻繁。

<br>

# HELLO RUST！

<br>

首先讓我們創建一個資料夾

`rust_project`

往後任何的 Rust 程式都會放在這個資料夾下  
現在在專案資料夾下新增我們要製作的第一個 Rust 程式

`rust_project\_01_hello_rust\main.rs`

```
fn main() {
    println!("Hello, Rust!");
}
```

之後打開 cmd ，輸入以下

```
rustc main.rs
.\main.exe // 印出 Hello, Rust!
```

如此，我們完成了第一隻 Rust 程式。  
~~超快！！~~  
~~嘛、畢竟是 Hello World 嘛~~

<br>

# 感想

<br>

首先注意到的，是執行的指令拆成了兩個  
分別是 **編譯** 的行為與 **執行** 的行為

編譯出來的檔案是 `.exe`，意味著寫好的程式不需要借助 Rust 就能運行  
這在筆者之前的經驗中是比較少見的

同樣被編譯出來的還有一個 `main.pdb`  
暫時不知道是做甚麼用的，之後學到再回來更新

<br>

`println!();`  
在這段酷似 JAVASCRIPT 風格的 JAVA 式命名輸出語法上，突兀的出現了個 `!`

這是 Rust 的 `macro`  
比起 Rust 的 `function`，`macro` 更接近 JAVASCRIPT 的 `function`

Rust 中，存在 `fn(function)` 跟 `macro_rules(macro)`  
他們的差別主要在於 `function(函式)` 的參數數量是固定的  
而 `macro(巨集)` 則可以動態傳入參數

`println` 預期要能夠傳入多個參數，當他要做格式化傳輸時

```
println!("Hello, Macro! My name is {}!", "Smilin")
```

比起 `fn`，`macro_rules` 顯然更符合需求。

<br>

# 今日小結

<br>

`rustc --version` 驗證版本

`rustup update` 更新 Rust

`rustup self uninstall` 反安裝 Rust

`rustup doc` 運行 Rust Local Doc

`rustc main.rs` 編譯 rs 檔

`.pdb` ???

`macro` 巨集 / 宏，可以傳入動態參數

`function` 函式 / 方法，宣告時就要規範好參數數量與型別

<br>

# 資料參考

<br>

[Rust 官方文檔](https://doc.rust-lang.org/book/)

[Window 安裝 rustup](https://www.rust-lang.org/tools/install)
