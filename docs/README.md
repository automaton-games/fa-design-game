# ドキュメント

FA Design Gameのドキュメントを目的別にまとめています。

## プロダクト仕様

実装するプロダクトの範囲や画面を確認するときに参照します。

- [MVP仕様](product/mvp.md)：MVPの目的、対象機能、完了条件
- [ページ構成](product/pages.md)：各ページの目的、表示内容、画面遷移

## 技術仕様

APIやデータ形式など、実装時に参照する仕様です。

- [API仕様](reference/api.md)：MVPで使用するエンドポイント
- [DFA JSON形式](reference/dfa-json-format.md)：DFAの提出データ形式

## 開発ガイド

開発環境の準備や作業手順を確認するときに参照します。

- [開発環境ガイド](guides/development.md)：Docker Composeを使ったセットアップと依存関係の管理
- [Ginの使い方](guides/gin.md)：バックエンドで使用するGinの基本
- [GitHubを使った開発手順](guides/github-workflow/README.md)：Issueの選択からPull Requestのマージまでの手順

開発運用の規則は、リポジトリ直下の[CONTRIBUTING.md](../CONTRIBUTING.md)を参照してください。

## 今後追加するドキュメント

必要な内容が発生した時点で、次のドキュメントを追加します。

- `CONTEXT.md`：プロジェクトで使用するドメイン用語
- `docs/adr/`：重要な設計判断とその理由
