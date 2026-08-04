# DFA JSON形式

## 文書情報

| 項目 | 値 |
|---|---|
| 対象 | FA Design Gameが内部で扱うDFAのJSON形式（提出DFA・正解DFA共通） |
| 関連 | [バックエンド システム詳細設計書](system-design.md)、[API仕様](api.md)、[ADR 0002](../adr/0002-alphabet-source.md) |
| 用語集 | [CONTEXT.md](../../CONTEXT.md) |
| バージョン | 1.0 |
| ステータス | Draft |
| 作成日 | 2026-08-03 |

---

## 1. 概要

この形式は、提出DFAと問題データが保持する正解DFAの両方で共通に使う。提出画面では、専用フォームの入力から本形式のデータを生成することを想定する。ただし[ページ構成](../product/pages.md)に「DFA JSON入力欄」とあるため、入力方式は実装前に確定させる必要がある。

## 2. alphabet の取り扱い

**alphabet は問題データが所有する。** 提出DFA・正解DFAいずれも`alphabet`は含めない。提出DFAには問題詳細APIが返す入力アルファベットを、正解DFAには問題データの入力アルファベットを、それぞれサーバーが適用する。提出JSONに`alphabet`が含まれていた場合は未知フィールドとして拒否する。

専用フォームを使う場合は、問題データから自動で設定し、ユーザーによる入力は求めない。

alphabet は1要素以上、重複なし、空文字・空白のみを禁止する。複数文字の入力記号を許可し、長さや使用文字に追加の制限を設けない。検証は `dfa.Validate` が DFA 本体と同時に行う（[バックエンド システム詳細設計書 第5.4.1節](system-design.md)）。

処理の詳細は [バックエンド システム詳細設計書](system-design.md)、決定の経緯は [ADR 0002](../adr/0002-alphabet-source.md) を参照する。

## 3. データ例

```json
{
  "states": ["q0", "q1"],
  "start": "q0",
  "accept": ["q0"],
  "transitions": {
    "q0": { "0": "q1", "1": "q1" },
    "q1": { "0": "q0", "1": "q0" }
  }
}
```

## 4. フィールド

各フィールドの構造（型・JSONタグ）は [openapi.yaml](openapi.yaml) の `DFAInput` を正とする。本節は制約と扱いを示す。

| フィールド | JSON | 制約（構造検証後） | 説明 |
|---|---|---|---|
| `states` | `states` | 1以上、重複なし、空文字/空白のみを除外 | 状態の集合 |
| `start` | `start` | `states` に含まれる | 開始状態 |
| `accept` | `accept` | `states` の部分集合、重複なし（空集合可） | 受理状態の集合 |
| `transitions` | `transitions` | `states × alphabet` の完全関数、遷移先は `states`、余分な定義なし | 遷移関数 δ |

専用フォームを使用する場合は、各フィールドを次のとおり扱う。

- `states`: 初期状態として空の入力欄を1つ表示し、必要に応じて追加できる。
- `start`: 開始状態の入力欄を1つ表示し、追加はできない。
- `accept`: 必要に応じて入力欄を追加できる。
- `transitions`: `states` と問題の `alphabet` の組み合わせごとに、遷移先の入力欄を自動で表示する。

## 5. 入力時の要件（構造検証）

第4節のフィールド制約に違反するDFAは `422 DFA_STRUCTURAL` になる。検査項目とエラーコードの対応は [バックエンド システム詳細設計書 第5.5節](system-design.md) を参照する。alphabet の制約は第2節に示す。反例は記号を連結した文字列ではなく、入力記号の配列として返す。

## 6. JSON decode規則

- request bodyの上限は1 MiBとする
- JSON documentはちょうど1つの値だけを許可し、後続する値を拒否する
- 未知フィールドを、top-levelを含むすべての固定objectで拒否する
- bodyサイズ超過、構文・型エラー、未知フィールド、後続するJSON値は`400 JSON_INVALID`とする
