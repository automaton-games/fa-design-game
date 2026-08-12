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

## 開発ガイド

開発環境の準備や作業手順を確認するときに参照します。
詳しくは[開発ガイドの一覧](guides/README.md)を参照してください。

- [開発環境ガイド](guides/development.md)：Docker Composeを使ったセットアップと依存関係の管理
- [GitHubを使った開発手順](guides/github-workflow/README.md)：Issueの選択からPull Requestのマージまでの手順

### フロントエンド

- [フロントエンド開発ガイド](guides/frontend/README.md)：使用技術、起動方法、ディレクトリ構成、アーキテクチャ

### バックエンド

- [バックエンド開発ガイド](guides/backend/README.md)：使用技術、起動方法、関連ドキュメント
- [Ginの使い方](guides/backend/gin.md)：バックエンドで使用するGinの基本

開発運用の規則は、リポジトリ直下の[CONTRIBUTING.md](../CONTRIBUTING.md)を参照してください。

## ドメインドキュメント

- [`CONTEXT.md`](../CONTEXT.md)：プロジェクトで使用するドメイン用語

## エージェント向け

コーディングエージェントが参照する規則は、リポジトリ直下の [`AGENTS.md`](../AGENTS.md) を起点にします。Issue管理、トリアージラベル、ドメインドキュメントの運用規則は [`agents/`](agents/) 配下にあります。

## 今後追加するドキュメント

重要な設計判断が発生した時点で、`docs/adr/` に判断内容と理由を記録します。
