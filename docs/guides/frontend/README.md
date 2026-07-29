# フロントエンド開発ガイド

FA Design Gameのフロントエンド開発に関する情報をまとめます。

## 使用技術

- React
- TypeScript
- Vite
- pnpm

## 起動方法

リポジトリのルートで、Docker Composeを使って起動します。

```bash
docker compose up -d frontend
```

起動後、<http://localhost:5173/>にアクセスします。

初回セットアップやコンテナの停止方法は、[開発環境ガイド](../development.md)を参照してください。

## 主なディレクトリ

```text
frontend/
├── public/       # 静的ファイル
├── src/          # Reactアプリケーション
├── package.json  # スクリプトと依存パッケージ
└── vite.config.ts
```

## 依存パッケージの管理

依存パッケージの追加や削除は、開発環境を統一するためコンテナ内で実行します。具体的なコマンドは[開発環境ガイドの「TypeScript(frontend)」](../development.md#typescriptfrontend)を参照してください。

画面実装、状態管理、テストなどのガイドは、方針が決まった時点でこのディレクトリに追加します。
