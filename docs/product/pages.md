# ページ構成

## 概要

MVPでは、以下のページを実装します。

- トップページ
- チュートリアルページ
- コンテスト一覧ページ
- Practiceコンテストページ
- 問題一覧ページ
- 問題詳細・提出ページ

ルーティングでは、コンテストの公開識別子を `:contestSlug`、コンテスト内の問題コードを `:taskCode` として表します。
MVPでは `:contestSlug` に `practice` を指定します。

## ページ一覧

### トップページ `/`

#### 目的

初めて訪れたユーザーに、FA Design Gameがどのようなサイトかを伝えます。

#### 表示内容

- サイト概要
- チュートリアルページへのリンク
- コンテスト一覧ページへのリンク
- Practiceコンテストページへのリンク
- GitHubリポジトリへのリンク

---

### チュートリアルページ `/tutorial`

#### 目的

ユーザーに、DFAと提出形式の基本を説明します。

#### 表示内容

- このサイトでやること
- DFAの簡単な説明
- DFA JSON形式の例
- 判定結果の見方
- Practiceコンテストへのリンク

---

### コンテスト一覧ページ `/contests`

#### 目的

ユーザーに、コンテストの一覧を表示します。

MVPでは、Practiceコンテストのみを表示します。

#### 表示内容

- 常設コンテスト一覧
  - Practice Contest

#### MVP後の検討事項

- 開催予定のコンテスト一覧
- 開催中のコンテスト一覧
- 終了済みのコンテスト一覧

#### 参考

- [AtCoderのコンテスト一覧](https://atcoder.jp/contests/)

---

### Practiceコンテストページ `/contests/:contestSlug`

#### 目的

Practiceコンテストの概要を表示します。

MVPでは、Practiceコンテストを時間制限のない練習用問題セットとして扱います。

#### 表示内容

- Practiceコンテストの説明
- 問題一覧ページへのリンク
- チュートリアルページへのリンク

#### MVP後の検討事項

- コンテスト開始時刻
- コンテスト終了時刻
- 順位表へのリンク
- 提出結果一覧へのリンク
- 質問ページへのリンク
- 解説ページへのリンク

#### 参考

- [AtCoderの練習用コンテスト](https://atcoder.jp/contests/practice)

---

### 問題一覧ページ `/contests/:contestSlug/tasks`

#### 目的

Practiceコンテストに含まれる問題の一覧を表示します。

#### 表示内容

- 問題コード
- 問題タイトル
- 各問題詳細ページへのリンク

#### 表示例

| 問題コード | 問題タイトル |
|---|---|
| A | 文字列長が偶数 |
| B | 1の個数が3の倍数 |
| C | 末尾が01 |

#### 参考

- [AtCoderの練習用コンテストの問題一覧](https://atcoder.jp/contests/practice/tasks)

---

### 問題詳細・提出ページ `/contests/:contestSlug/tasks/:taskCode`

#### 目的

問題文を表示し、DFAをJSON形式で提出できるようにします。

MVPでは、問題文表示・提出・判定結果表示を同じページで行います。

#### 表示内容

- 問題コード
- 問題タイトル
- 問題文
- 入力アルファベット
- DFA JSON入力欄
- 提出ボタン
- 判定結果
- 不正解時の反例

#### MVP後の検討事項

- 提出結果一覧へのリンク
- 解説へのリンク
- DFA動作テストへのリンク
- DFAの図表示

#### 参考

- [AtCoderの練習問題](https://atcoder.jp/contests/practice/tasks/practice_1)

## 画面遷移

```text
/
├── /tutorial
│   └── /contests/:contestSlug
└── /contests
    └── /contests/:contestSlug
        └── /contests/:contestSlug/tasks
            └── /contests/:contestSlug/tasks/:taskCode
```
