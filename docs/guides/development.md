# 開発環境ガイド

## 初回セットアップ

開発環境の起動にはDockerを使用します。
作業するPCにDockerをインストールしてください。
macOSでは、[Docker Desktopのインストール手順](https://docs.docker.com/desktop/setup/install/mac-install/)を参照できます。

リポジトリのルートで、次のコマンドを実行します。

```bash
docker compose up -d
```

コンテナが起動したら、次のURLにアクセスできます。

- フロントエンド：<http://localhost:5173/>
- バックエンド：<http://localhost:8080>

バックエンドの稼働状態は、次のコマンドで確認できます。

```bash
curl http://localhost:8080/health
```

## コンテナの停止と再ビルド

コンテナを停止するには、次のコマンドを実行します。

```bash
docker compose down
```

Dockerfileを変更した場合や、Dockerfileの変更をpullで取り込んだ場合は、イメージを再ビルドして起動します。

```bash
docker compose up -d --build
```

## 依存パッケージの管理

開発環境はDocker Composeで統一しています。
依存パッケージの追加と削除は、コンテナ内で実行してください。

コンテナ内で操作する理由は次のとおりです。

1. フロントエンドの`node_modules`はDockerボリュームに保存されるため、ホスト側の`node_modules`への変更はコンテナに反映されない
2. コンテナ内のGo、Node.js、pnpmを使うことで、メンバー間のバージョン差を避けられる
3. ホストにGoやpnpmをインストールせずに開発できる

### Goの依存パッケージ

コンテナが起動している場合は、次のコマンドを実行します。

```bash
docker compose exec backend go get github.com/some/package
```

コンテナが停止している場合は、使い捨てコンテナを使用します。

```bash
docker compose run --rm backend go get github.com/some/package
```

開発ツールを追加する場合は、次のコマンドを実行します。

```bash
docker compose exec backend go get -tool github.com/some/tool
```

不要な依存関係を削除し、`go.mod`と`go.sum`を整理するには、次のコマンドを実行します。

```bash
docker compose exec backend go mod tidy
```

`go.mod`と`go.sum`への変更は、バインドマウントを通じてホストにも反映されます。
変更されたファイルはコミットしてください。

### TypeScriptの依存パッケージ

コンテナが起動している場合は、次のコマンドを実行します。

```bash
docker compose exec frontend pnpm add package-name
```

開発時だけ使用するパッケージは、`-D`オプションを付けます。

```bash
docker compose exec frontend pnpm add -D @types/package-name
```

コンテナが停止している場合は、使い捨てコンテナを使用します。

```bash
docker compose run --rm frontend pnpm add package-name
```

パッケージを削除する場合も、`pnpm remove package-name`を`exec`または`run --rm`で実行します。

`package.json`と`pnpm-lock.yaml`への変更はホストにも反映されます。
パッケージ本体は`node_modules`ボリュームに保存されます。

## pull後の依存パッケージの同期

フロントエンドの依存パッケージが更新されていた場合は、lockfileに合わせて`node_modules`を同期します。

```bash
docker compose exec frontend pnpm install --frozen-lockfile
```

`--frozen-lockfile`を付けると、`pnpm-lock.yaml`を書き換えず、内容に不整合があれば処理を停止します。
依存パッケージを追加する`pnpm add`では、このオプションは不要です。

Goの依存パッケージは、次回のビルド時に自動でダウンロードされるため、pull後の同期操作は不要です。
