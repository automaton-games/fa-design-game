# API仕様

## 概要

MVPで使用するAPIを定義します。

## エンドポイント一覧

| Method | Path | 説明 |
|---|---|---|
| GET | `/health` | ヘルスチェック |
| GET | `/api/contests` | コンテスト一覧取得 |
| GET | `/api/contests/practice` | Practiceコンテスト取得 |
| GET | `/api/contests/practice/tasks` | Practiceコンテストの問題一覧取得 |
| GET | `/api/contests/practice/tasks/:taskID` | 問題詳細取得 |
| POST | `/api/contests/practice/tasks/:taskID/submit` | DFA提出 |

## GET /health

バックエンドが起動しているか確認するためのAPIです。

```json
{
  "status": "ok"
}
```


## GET /api/contests

コンテスト一覧を取得します。

MVPではPracticeだけなので、例えばこうです。

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

## GET /api/contests/practice/tasks

Practiceコンテストの問題一覧を取得します。

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

## GET /api/contests/practice/tasks/:taskID

問題詳細を取得します。

例えば：

```http
GET /api/contests/practice/tasks/A
```

レスポンス例：

```json
{
  "id": "A",
  "title": "文字列長が偶数",
  "statement": "0と1からなる文字列Sについて、Sの長さが偶数であるとき受理するDFAを構成してください。",
  "alphabet": ["0", "1"]
}
```

正解DFAはフロントエンドに返さない方がよいです。
バックエンド側だけで持っておきます。

## POST /api/contests/practice/tasks/:taskID/submit

DFAを提出します。

例えば：

```http
POST /api/contests/practice/tasks/A/submit
```

リクエスト：

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

レスポンス例：

```json
{
  "accepted": true,
  "message": "Accepted"
}
```