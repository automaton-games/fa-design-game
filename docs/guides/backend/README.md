# バックエンド開発ガイド

FA Design Gameのバックエンド開発に関する情報をまとめます。

## 使用技術

- Go
- Gin

## 起動方法

リポジトリのルートで、Docker Composeを使って起動します。

```bash
docker compose up -d backend
```

起動後、<http://localhost:8080/health>で動作を確認できます。

初回セットアップやコンテナの停止方法は、[開発環境ガイド](../development.md)を参照してください。

## 関連ドキュメント

- [Ginの使い方](gin.md)
- [バックエンド システム詳細設計書](../../reference/system-design.md)
- [API仕様](../../reference/openapi.yaml)
- [DFA JSON形式](../../reference/dfa-json-format.md)
