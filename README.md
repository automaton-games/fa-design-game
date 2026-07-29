# FA Design Game

有限オートマトン版の競技プログラミングを目指すWebアプリケーションです。
ユーザーは問題文を読み、条件を満たす有限オートマトンを提出します。サーバーは提出されたオートマトンを自動判定し、結果を返します。

- 日本語仮名称：有限オートマトン設計ゲーム
- 英語仮名称：Finite Automaton Design Game
- 略称：FADG

## 概要

ユーザーは問題文を読み、条件を満たすDFAをJSON形式で提出します。
サーバーは提出DFAと正解DFAの等価性を判定し、正解または不正解を返します。不正解の場合は、受理結果が異なる反例文字列も表示します。

## MVP（Minimum Viable Product）

最初の実装ではDFA（決定性有限オートマトン）のみを対象とし、問題の閲覧、DFAの提出、等価性判定、不正解時の反例表示までの一連の体験を実現します。

### 実装する機能

- Practiceコンテストの表示
- 問題一覧の表示
- 問題詳細の表示
- DFAのJSON形式での提出
- DFA形式の検証
- 正解DFAとの等価性判定
- 提出直後の判定結果表示
- 不正解時の反例表示
- サンプル問題の用意

### MVPでは実装しない機能

- ログインとユーザー管理
- 提出履歴の記録
- ランキングとレーティング
- 管理者機能
  - 問題作成
  - 問題編集
  - 問題削除
- NFA対応
- ε-NFA対応
- 正規表現対応
- DFAの図による表示
- 状態遷移図によるオートマトン編集
- 本番環境へのデプロイ

詳しい対象機能、対象外とする理由、完了条件は[MVP仕様](docs/product/mvp.md)を参照してください。

## DFAについて

DFAは、決定性有限オートマトン（Deterministic Finite Automaton）の略称です。
DFAは次の5つ組 $`(Q, \Sigma, \delta, q_0, F)`$ で定義されます。

- 状態集合：$`Q`$（有限集合）
- 入力アルファベット：$`\Sigma`$（有限集合）
- 遷移関数：$`\delta \colon Q \times \Sigma \to Q`$
- 開始状態：$`q_0 \in Q`$
- 受理状態の集合：$`F \subseteq Q`$

FA Design Gameで使用する具体的なデータ形式は[DFA JSON形式](docs/reference/dfa-json-format.md)を参照してください。

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

現在の技術スタックです。MySQLやGORMは、MVP後または必要になった時点で導入を検討します。

- フロントエンド：React / TypeScript / Vite
- バックエンド：Go / Gin
- コンテナ：Docker / Docker Compose
- プロジェクト管理：GitHub Issues / GitHub Projects / Pull Request
- ブランチ戦略：GitHub Flow

## 開発履歴・当初予定

- 2026-04-24：[@lovemeasure](https://github.com/lovemeasure)が開発を発案
- 2026-04-26：有限オートマトン版の競技プログラミングとして企画決定
- 2026-04-27：開発メンバーの募集開始
- 2026-04-28：リポジトリを作成
- 2026-05-10：当初のMVP完成目標
- 2026-05-17：延長した場合のMVP完成目標

## 開発メンバー

- [@lovemeasure](https://github.com/lovemeasure)：フロントエンド・バックエンドを担当
- [@ymn2525](https://github.com/ymn2525)：バックエンドを担当しながら学習
- [@kwryusei](https://github.com/kwryusei)：チーム開発におけるGitの使い方を学習
- [@kosuke215135](https://github.com/kosuke215135)：TypeScriptとGoを中心に担当
- [@Mekann2904](https://github.com/Mekann2904)：チーム開発を実践
