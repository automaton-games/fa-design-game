# コーディングスタイルガイド

## 対象・基本方針

変数・関数・型・ファイルの **命名規則**、ディレクトリ構成、フォーマット・import順といった、コードレベルの表面的な規則をまとめます。

- **対象外:** アーキテクチャ・設計判断、Git運用（ブランチ名・コミットメッセージ・PR運用は [CONTRIBUTING.md](./CONTRIBUTING.md) を参照）
- **基本方針:** 既存コードの慣習をベースに明文化したものです。一貫性を優先し、運用しながら更新します。迷ったら周囲のコードに合わせてください。命名は「何を表しているか」がすぐ分かるようにし、略語は広く知られたもの（`url`, `id`, `http` など）だけ使います。

---

## Go（バックエンド）

### 命名規則

| 対象 | 規則 | 例 |
|---|---|---|
| パッケージ名 | 全小文字・1単語・キャメルケース不可 | `main`, `http` |
| エクスポートする型・関数・変数・定数 | `PascalCase`（先頭大文字） | `HealthResponse` |
| 非エクスポートの関数・変数 | `camelCase`（先頭小文字） | `healthHandler` |
| 構造体フィールド | `PascalCase`。JSON出力はタグで `snake_case` | `Status string \`json:"status"\`` |
| ハンドラの引数（`*gin.Context`） | `c` を使う（gin の慣習） | `func healthHandler(c *gin.Context)` |

現在のベース実装: `backend/main.go`（`HealthResponse` 型・`healthHandler` 関数・`json:"status"` タグ）。API の JSON 形式の詳細は [api.md](./api.md) を参照。

> 参考: [Effective Go](https://go.dev/doc/effective_go)、[Go Code Review Comments](https://github.com/golang/go/wiki/CodeReviewComments)

### フォーマット

- `gofmt` を適用する
- 検証コマンド（**コンテナ内で**実行）:
  - フォーマット: `cd backend && gofmt -l .`
  - 静的解析: `cd backend && go vet ./...`

---

## TypeScript・React（フロントエンド）

### 命名規則

| 対象 | 規則 | 例 |
|---|---|---|
| コンポーネント | `PascalCase` | `App`, `TaskList` |
| 変数・関数 | `camelCase` | `handleSubmit`, `contestId` |
| 型・インターフェース・型エイリアス | `PascalCase` | `Dfa`, `Task`, `Contest` |

現在のベース実装: `frontend/src/App.tsx`（`App` コンポーネント）

### ファイル名・import

- コンポーネントを含むファイル: `PascalCase`（`App.tsx`）
- それ以外: 小文字（`main.tsx`, `index.css`, `api-client.ts`）
- 外部ライブラリは名前付きimportを基本とする（`import { StrictMode } from 'react'`）

### フォーマット

- ESLint（`frontend/eslint.config.js` の recommended 系）を適用する
- 検証コマンド（**コンテナ内で**実行）:
  - リント: `cd frontend && pnpm lint`
  - 型チェック: `cd frontend && pnpm exec tsc -b`

---

## ディレクトリ構成

- `backend/`: 現状 `main.go` のみ
- `frontend/src/`: 現状 `App.tsx`, `main.tsx`, `index.css`

---

## 今後の改善（別Issue）

現在は現状コードから読み取れる最小限の規則のみ。以下は必要に応じて別Issueで導入・検討する:

- import順の厳密化（`eslint-plugin-import` 等）
- TSDoc コメントの導入（`export` する関数・型・コンポーネントに説明を必須化）
- ディレクトリ分割（`backend/` は `cmd/`・`internal/`、`frontend/src/` は `pages/`・`components/`・`api/` など、[pages.md](./pages.md) 参照）
- リント設定の強化（`backend/.golangci.yml` 追加、`frontend/eslint.config.js` のルール追加）
