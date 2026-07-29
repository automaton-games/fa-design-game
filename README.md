# FA Design Game

有限オートマトン版の競技プログラミングを目指すWebアプリケーションです。
ユーザーは問題文を読み、条件を満たす有限オートマトンを提出します。サーバーは提出されたオートマトンを自動判定し、結果を返します。

- 日本語仮名称：有限オートマトン設計ゲーム
- 英語仮名称：Finite Automaton Design Game
- 略称：FADG

## MVP

最初の実装ではDFA（決定性有限オートマトン）のみを対象とし、問題の閲覧、DFAの提出、等価性判定、不正解時の反例表示までの一連の体験を実現します。

詳しい対象機能と完了条件は[MVP仕様](docs/product/mvp.md)を参照してください。

## ドキュメント

- [ドキュメント一覧](docs/README.md)
- [MVP仕様](docs/product/mvp.md)
- [ページ構成](docs/product/pages.md)
- [API仕様](docs/reference/api.md)
- [DFA JSON形式](docs/reference/dfa-json-format.md)
- [開発環境ガイド](docs/guides/development.md)
- [コントリビューションガイド](CONTRIBUTING.md)

## 開発環境

Docker Composeを使用して、フロントエンドとバックエンドをローカルで起動できます。

```bash
docker compose up -d
```

- フロントエンド：<http://localhost:5173/>
- バックエンド：<http://localhost:8080>
- ヘルスチェック：<http://localhost:8080/health>

セットアップ、停止方法、依存パッケージの管理については[開発環境ガイド](docs/guides/development.md)を参照してください。

## 技術スタック

- フロントエンド：React / TypeScript / Vite
- バックエンド：Go / Gin
- コンテナ：Docker / Docker Compose
- プロジェクト管理：GitHub Issues / GitHub Projects / Pull Request
- ブランチ戦略：GitHub Flow

MySQL、GORMなどの導入はMVP後、または必要になった時点で検討します。

## 開発メンバー

- [@lovemeasure](https://github.com/lovemeasure)
- [@ymn2525](https://github.com/ymn2525)
- [@kwryusei](https://github.com/kwryusei)
- [@kosuke215135](https://github.com/kosuke215135)
- [@Mekann2904](https://github.com/Mekann2904)
