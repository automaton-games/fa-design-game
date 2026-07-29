# API仕様

## 概要

MVPで使用するAPIのエンドポイントを定義します。

## エンドポイント一覧

| メソッド | パス | 説明 |
|---|---|---|
| `GET` | `/health` | ヘルスチェック |
| `GET` | `/api/contests` | コンテスト一覧の取得 |
| `GET` | `/api/contests/practice` | Practiceコンテストの取得 |
| `GET` | `/api/contests/practice/tasks` | Practiceコンテストの問題一覧の取得 |
| `GET` | `/api/contests/practice/tasks/:taskID` | 問題詳細の取得 |
| `POST` | `/api/contests/practice/tasks/:taskID/submit` | DFAの提出 |

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
      "id": "practice",
      "title": "Practice Contest",
      "description": "練習用の常設コンテストです。"
    }
  ]
}
```

## `GET /api/contests/practice`

Practiceコンテストの情報を取得します。
レスポンス形式は未定義です。
実装前に、返却するフィールドとデータ形式を決める必要があります。

## `GET /api/contests/practice/tasks`

Practiceコンテストの問題一覧を取得します。

### レスポンス例

```json
{
  "tasks": [
    {
      "id": "A",
      "title": "文字列長が偶数"
    },
    {
      "id": "B",
      "title": "1の個数が3の倍数"
    }
  ]
}
```

## `GET /api/contests/practice/tasks/:taskID`

指定した問題の詳細を取得します。

### リクエスト例

```http
GET /api/contests/practice/tasks/A
```

### レスポンス例

```json
{
  "id": "A",
  "title": "文字列長が偶数",
  "statement": "0と1からなる文字列Sについて、Sの長さが偶数であるとき受理するDFAを構成してください。",
  "alphabet": ["0", "1"]
}
```

正解DFAは判定に使用する内部データです。
フロントエンドには返さず、バックエンドで保持する設計を推奨します。

## `POST /api/contests/practice/tasks/:taskID/submit`

指定した問題にDFAを提出します。
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
