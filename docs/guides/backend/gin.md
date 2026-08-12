# Ginの使い方

## Ginについて

Ginは、GoでWebアプリケーションを構築するためのフレームワークです。
このプロジェクトでは、バックエンドのHTTPサーバーとAPIルーティングに使用します。

### 主な特徴

- 高速なHTTPルーティング
- ミドルウェアのサポート
- クラッシュリカバリー
- JSONのバリデーション
- ルートのグループ化
- エラー管理
- 組み込みレンダリング
- 機能の拡張

## 使用バージョン

使用しているバージョンは、`github.com/gin-gonic/gin v1.12.0`です。

## 起動方法

通常の開発では、リポジトリのルートからDocker Composeでバックエンドを起動します。

```bash
docker compose up -d backend
```

バックエンドだけをGoで直接起動する場合は、`backend`ディレクトリで次のコマンドを実行します。
この方法では、ホストに対象バージョンのGoが必要です。

```bash
go run main.go
```

## 動作確認

ヘルスチェックAPIを呼び出します。

```bash
curl http://127.0.0.1:8080/health
```

ほかの`GET`エンドポイントを確認する場合は、URLのパスを変更します。

```bash
curl http://127.0.0.1:8080/path
```

JSONを受け取る`POST`エンドポイントは、次のように確認できます。

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"name":"太郎","age":30}' \
  http://127.0.0.1:8080/path
```

各オプションの役割は次のとおりです。

- `-X`：HTTPメソッドを指定する
- `-H`：リクエストヘッダーを指定する
- `-d`：リクエストボディを指定する

## 関連ドキュメント

- [バックエンド開発ガイド](README.md)
- [API仕様](../../reference/api.md)
- [Gin公式ドキュメント](https://gin-gonic.com/ja/docs/)
