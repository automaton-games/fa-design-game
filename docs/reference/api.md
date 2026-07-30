# API仕様

## 概要

MVPで使用するAPIのエンドポイントを定義します。

## エンドポイント一覧

| メソッド | パス | 説明 |
|---|---|---|
| `GET` | `/health` | ヘルスチェック |
| `GET` | `/api/contests` | コンテスト一覧の取得 |
| `GET` | `/api/contests/:contestSlug` | コンテストの取得 |
| `GET` | `/api/contests/:contestSlug/tasks` | コンテストの問題一覧の取得 |
| `GET` | `/api/contests/:contestSlug/tasks/:taskCode` | 問題詳細の取得 |
| `POST` | `/api/contests/:contestSlug/tasks/:taskCode/submit` | DFAの提出 |

## 公開識別子

コンテストの公開識別子には `slug`、問題の公開識別子には `code` を使用します。
`slug` はURLでコンテストを指定する安定した値です。
`code` はコンテスト内で問題を識別する値であり、異なるコンテストでは同じ値を使用できます。

`id` は、将来データベースを導入した際の内部主キーを表す名前として予約します。

## `GET /health`

バックエンドの稼働状態を確認します。

### レスポンス例

```json
{
  "status": "ok"
}
```

## `GET /api/contests`

コンテスト一覧を取得します。
MVPでは、Practiceコンテストのみを返します。

### レスポンス例

```json
{
  "contests": [
    {
      "slug": "practice",
      "title": "Practice Contest",
      "description": "練習用の常設コンテストです。"
    }
  ]
}
```

## `GET /api/contests/:contestSlug`

指定したコンテストの情報を取得します。
MVPでは、`contestSlug` に `practice` を指定します。

### リクエスト例

```http
GET /api/contests/practice
```

### レスポンス例

```json
{
  "slug": "practice",
  "title": "Practice Contest",
  "description": "練習用の常設コンテストです。"
}
```

## `GET /api/contests/:contestSlug/tasks`

指定したコンテストの問題一覧を取得します。
MVPでは、`contestSlug` に `practice` を指定します。

### レスポンス例

```json
{
  "tasks": [
    {
      "code": "A",
      "title": "文字列長が偶数"
    },
    {
      "code": "B",
      "title": "1の個数が3の倍数"
    }
  ]
}
```

## `GET /api/contests/:contestSlug/tasks/:taskCode`

指定したコンテスト内の問題の詳細を取得します。

### リクエスト例

```http
GET /api/contests/practice/tasks/A
```

### レスポンス例

```json
{
  "code": "A",
  "title": "文字列長が偶数",
  "statement": "0と1からなる文字列Sについて、Sの長さが偶数であるとき受理するDFAを構成してください。",
  "alphabet": ["0", "1"]
}
```

正解DFAは判定に使用する内部データです。
フロントエンドには返さず、バックエンドで保持する設計を推奨します。

## `POST /api/contests/:contestSlug/tasks/:taskCode/submit`

指定したコンテスト内の問題にDFAを提出します。
DFAのデータ形式は、[DFA JSON形式](dfa-json-format.md)を参照してください。

### リクエスト例

```http
POST /api/contests/practice/tasks/A/submit
```

```json
{
  "dfa": {
    "states": ["q0", "q1"],
    "alphabet": ["0", "1"],
    "start": "q0",
    "accept": ["q0"],
    "transitions": {
      "q0": { "0": "q1", "1": "q1" },
      "q1": { "0": "q0", "1": "q0" }
    }
  }
}
```

### レスポンス例

```json
{
  "accepted": true,
  "message": "Accepted"
}
```
