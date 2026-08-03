# API仕様

## 文書情報

| 項目 | 値 |
|---|---|
| 対象 | MVPで使用するAPI |
| API契約（正） | [openapi.yaml](openapi.yaml)（OpenAPI 3.0.3） |
| 関連 | [バックエンド システム詳細設計書](system-design.md)、[DFA JSON形式](dfa-json-format.md) |
| 用語集 | [CONTEXT.md](../../CONTEXT.md) |
| バージョン | 1.0 |
| ステータス | Draft |
| 作成日 | 2026-08-03 |

---

## API契約の正

APIの契約（エンドポイント・パラメータ・ステータスコード・スキーマ・エラー形式）は [openapi.yaml](openapi.yaml) が唯一の正である（SSOT）。各エンドポイントの詳細はそちらを参照すること。本ページはAPI仕様への入口として概要と見かたを示す。

## openapi.yaml の見かた

リポジトリルートの [redocly.yaml](../../redocly.yaml) が Redocly プロジェクト設定（最新 `@redocly/cli` 対応）。API名は `fadg-api`。

- **ライブプレビュー（推奨）**: `npx @redocly/cli preview --product redoc` → http://localhost:4000 （`openapi.yaml` 編集で再読込）
- **HTML生成**: `npx @redocly/cli build-docs fadg-api`
- **検証**: `npx @redocly/cli lint fadg-api`
- **Swagger Editor**: https://editor.swagger.io/ に `openapi.yaml` を貼り付ける。
- **VS Code**: OpenAPI 拡張機能でプレビュー。

> フロントエンド・バックエンドのクライアント/スタブコード生成も `openapi.yaml` から行う。GitHub Pages でのホスティングは今後追加を想定する。
