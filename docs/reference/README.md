# 技術仕様

実装時にフロントエンドとバックエンドの双方から参照する技術仕様をまとめます。

## API契約（フロントエンドとバックエンドの継ぎ目）

- [openapi.yaml](openapi.yaml)：API契約（OpenAPI 3.0.3、SSOT）
- [API仕様](api.md)：API仕様への入口と見かた
- [DFA JSON形式](dfa-json-format.md)：DFAの提出データ形式

## 設計

- [システム詳細設計書](system-design.md)：バックエンド全体の内部設計（処理フロー、型、関数仕様、層構成）
- [フロントエンド](frontend.md)：フロントエンドのAPI消費側の視点（バックエンドAPI設計の検証用）

## アーキテクチャ決定記録（ADR）

設計判断は [ADR](../adr/) を参照してください。

- [0001 公開識別子にslugとcodeを使用する](../adr/0001-public-identifiers.md)
- [0002 alphabetの情報源](../adr/0002-alphabet-source.md)
- [0003 構造検証と提出検証の責務境界](../adr/0003-validation-boundary.md)
- [0004 正解DFAのライフサイクル](../adr/0004-answer-dfa-lifecycle.md)
- [0005 永続化層と起動時読み込み](../adr/0005-persistence-strategy.md)
