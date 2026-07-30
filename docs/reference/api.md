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

APIでは、URLから参照する公開識別子として、コンテストに `slug`、問題に `code` を使用します。

```text
/api/contests/practice/tasks/A
              └──────┘       └┘
                slug        code
```

### コンテストのslug

`slug` は、コンテストを識別する、URLで使用可能な安定した文字列です。
すべてのコンテスト間で一意とします。
MVPでは、Practiceコンテストの `slug` に `practice` を使用します。

### 問題のcode

`code` は、コンテスト内で問題を識別する文字列です。
同じコンテスト内で一意とし、異なるコンテストでは同じ値を使用できます。
たとえば、`practice` と `abc001` のどちらにも、`A` という問題コードを定義できます。

```text
practice / A
abc001   / A
```

将来データベースを導入する場合は、コンテストの内部主キーと問題コードの組み合わせに一意制約を設定します。

```sql
UNIQUE (contest_id, code)
```

### 内部主キーとの区別

`id` は、データベース内部で使用する主キーを表す名前として予約します。
公開識別子と内部主キーを区別することで、APIの値がデータベースの主キーであるという誤解を防ぎます。

この命名変更によって、MVPで使用するURLは変わりません。
フィールド名とルートパラメータ名だけが変わります。

```text
/api/contests/practice
/api/contests/practice/tasks/A
```

この命名を採用した理由と影響は、[公開識別子にslugとcodeを使用する](../adr/0001-public-identifiers.md)を参照してください。

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
