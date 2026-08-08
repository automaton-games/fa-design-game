# フロントエンド（API消費側の視点）

## 文書情報

| 項目 | 値 |
|---|---|
| 対象 | フロントエンドがAPIをどう消費するか（バックエンドAPI設計の検証用） |
| 関連 | [openapi.yaml](openapi.yaml)、[ページ構成](../product/pages.md)、[バックエンド システム詳細設計書](system-design.md) |
| ステータス | Draft |
| 作成日 | 2026-08-07 |

## 目的

本書は、**バックエンドのAPI設計（[openapi.yaml](openapi.yaml)）がフロントエンドの要件を満たすかを確認するため**、フロントエンド側の視点を最小限にまとめたものである。バックエンドを設計する上で「消費側が何を必要とするか」を明確にするために作成した。

フロントエンドの実装詳細（アーキテクチャ・ディレクトリ構造・ツール選定・命名）は実装者の権限であり、本書では扱わない。

## 1. 前提

スタックは React / TypeScript / Vite / pnpm（既存・確定）。それ以外の技術選定は実装者が行う。

## 2. ページとAPIの対応

[ページ構成](../product/pages.md) の各ページがどのAPIを消費し、何を表示するか。この対応が [openapi.yaml](openapi.yaml) で過不足なく定義されていることが、バックエンド設計の完了条件である。

| ページ（ルート） | API | 表示 |
|---|---|---|
| トップ `/` | なし（静的） | サイト概要・各種リンク |
| チュートリアル `/tutorial` | なし（静的） | DFAと提出形式の説明 |
| コンテスト一覧 `/contests` | `GET /api/contests` | コンテスト一覧 |
| コンテスト `/contests/:contestSlug` | `GET /api/contests/{contestSlug}` | コンテスト情報・問題一覧へのリンク |
| 問題一覧 `/contests/:contestSlug/tasks` | `GET /api/contests/{contestSlug}/tasks` | 問題コード・タイトル一覧 |
| 問題詳細・提出 `/contests/:contestSlug/tasks/:taskCode` | `GET /api/contests/{contestSlug}/tasks/{taskCode}`・`POST .../submit` | 問題文・入力アルファベット・DFA入力・判定結果 |

## 3. 提出と判定結果の表示

提出（`POST .../submit`）の結果は [openapi.yaml](openapi.yaml) の `SubmitResponse`・`ErrorResponse` で表現され、フロントエンドは次のように表示する。この表示要件を満たすために必要なフィールドが契約に含まれていることが重要である。

- **Accepted**: `accepted=true` → 正解として表示
- **Wrong Answer**: `accepted=false` + `counterexample`（空配列は ε）→ 不正解と反例を表示
- **エラー**（`ErrorResponse.code`）: `JSON_INVALID` / `PROBLEM_NOT_FOUND` / `DFA_STRUCTURAL` / `SUBMISSION_CONDITION` / `INTERNAL` をそれぞれ適切に表示。`field` がある場合は該当箇所を示す
