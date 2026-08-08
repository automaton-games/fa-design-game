# 技術仕様

実装時にフロントエンドとバックエンドの双方から参照する技術仕様をまとめます。

## システムアーキテクチャ（全体像）

- [アーキテクチャ](architecture.md)：C4モデル（Context / Container）によるシステム全体像

## API契約（フロントエンドとバックエンドの継ぎ目）

- [openapi.yaml](openapi.yaml)：API契約（OpenAPI 3.0.3、SSOT）
- [DFA JSON形式](dfa-json-format.md)：DFAの提出データ形式

> API仕様のプレビュー・検証コマンドは [開発環境ガイド](../guides/development.md#api仕様のプレビューと検証) を参照。

## 設計

- [システム詳細設計書](system-design.md)：バックエンド全体の内部設計（処理フロー、型、関数仕様、層構成）
- [フロントエンド](frontend.md)：フロントエンドのAPI消費側の視点（バックエンドAPI設計の検証用）
