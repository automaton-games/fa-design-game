# ドキュメント

FA Design Gameのドキュメントを目的別にまとめています。

## プロダクト仕様

実装するプロダクトの範囲や画面を確認するときに参照します。
詳しくは[プロダクト仕様の一覧](product/README.md)を参照してください。

- [MVP仕様](product/mvp.md)：MVPの目的、対象機能、完了条件
- [ページ構成](product/pages.md)：各ページの目的、表示内容、画面遷移

## 技術仕様

APIやデータ形式など、実装時に参照する仕様です。
詳しくは[技術仕様の一覧](reference/README.md)を参照してください。

- [API仕様](reference/api.md)：MVPで使用するエンドポイント
- [DFA JSON形式](reference/dfa-json-format.md)：DFAの提出データ形式
- [システム詳細設計書](reference/system-design.md)：バックエンド全体の内部設計（処理フロー、型、関数仕様、層構成）

## 開発ガイド

開発環境の準備や作業手順を確認するときに参照します。
詳しくは[開発ガイドの一覧](guides/README.md)を参照してください。

- [開発環境ガイド](guides/development.md)：Docker Composeを使ったセットアップと依存関係の管理
- [GitHubを使った開発手順](guides/github-workflow/README.md)：Issueの選択からPull Requestのマージまでの手順

### フロントエンド

- [フロントエンド開発ガイド](guides/frontend/README.md)：使用技術、起動方法、主なディレクトリ

### バックエンド

- [バックエンド開発ガイド](guides/backend/README.md)：使用技術、起動方法、関連ドキュメント
- [Ginの使い方](guides/backend/gin.md)：バックエンドで使用するGinの基本

開発運用の規則は、リポジトリ直下の[CONTRIBUTING.md](../CONTRIBUTING.md)を参照してください。

## ドメインドキュメント

- [`CONTEXT.md`](../CONTEXT.md)：プロジェクトで使用するドメイン用語

## アーキテクチャ決定記録（ADR）

重要な設計判断は `docs/adr/` に判断内容と理由を記録します。

- [0001 公開識別子にslugとcodeを使用する](adr/0001-public-identifiers.md)
- [0002 alphabetの情報源](adr/0002-alphabet-source.md)
- [0003 構造検証と提出検証の責務境界](adr/0003-validation-boundary.md)
- [0004 正解DFAのライフサイクル](adr/0004-answer-dfa-lifecycle.md)
