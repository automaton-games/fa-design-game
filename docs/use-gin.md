# Ginの使い方

## Ginについて
GinはGo言語（Golang）で書かれたWebフレームワークです。
### 特徴
- 高速
- ミドルウェアサポート
- クラッシュサポート
- JSONバリデーション
- ルートグルーピング
- エラー管理
- 組み込みレンダリング
- 拡張可能

## 使用バージョン
github.com/gin-gonic/gin v1.12.0

## 実行方法
`$ go run main.go`

`$ curl http://127.0.0.1:8080/health`

これでhealthAPIを呼び出せます。


## テストコマンド

新たなAPIやルーティングを追加した場合

`curl http://127.0.0.1:8080/path`

POSTメソッドを利用するAPIを追加した場合は以下のように記述すればテストできます。

`curl -X POST -H "Content-Type: application/json" -d '{"name": "太郎", "age": 30}' http://127.0.0.1:8080/path`

- `-X` : メソッドを指定できます。
- `-H` : ヘッダーを編集/追加できます。この例では`Content-Type`を`application/json`と指定し、送信するデータがJSON形式であることを指定しています。
- `-d` : 実際のデータです。


## 公式ドキュメント
[Gin Web Framework](https://gin-gonic.com/ja/docs/)
