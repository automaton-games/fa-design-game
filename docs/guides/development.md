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

> **注意：`--build`だけでは足りない変更もあります。** `node_modules`などのボリュームは、`docker compose down`では削除されません。pnpmストアの保存場所など、ボリューム内の構成に関わる変更を取り込んだ場合は、ボリュームを作り直す必要があります。詳しくは[pnpmストアの保存場所](#pnpmストアの保存場所)を参照してください。

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

> **注意：** フロントエンドは`pnpm install`を明示的に実行しないと、ボリューム内の`node_modules`が古いままになることがあります。pull後にフロントエンドが起動しない場合は、最初に依存パッケージの同期を確認してください。

## pnpmストアの保存場所

pnpmは、パッケージの実体をストアに一度だけ保存し、`node_modules`からストアへのハードリンクを作成します。同じパッケージを複数回インストールしても実体を共有できるため、ディスク使用量を抑えられます。

このリポジトリでは、pnpmストアを`node_modules`内の`/frontend/node_modules/.pnpm-store`に保存します。この設定は[`frontend/Dockerfile`](../../frontend/Dockerfile)に記述されています。

```dockerfile
RUN pnpm config set store-dir /frontend/node_modules/.pnpm-store --global
```

`node_modules`はDockerボリュームに保存されるため、pnpmストアも同じボリューム内に永続化されます。pnpmストア専用のボリュームは使用しません。

### `node_modules`を削除した場合

`node_modules`のボリュームを削除すると、pnpmストアも一緒に削除されます。次回の`pnpm install`ではパッケージの再ダウンロードが必要です。

ボリューム内の構成に関わる変更を取り込んだ場合は、次のコマンドでボリュームを作り直してからコンテナを起動してください。

```bash
docker compose down --volumes
docker compose up -d --build
```

> **注意：** `docker compose down --volumes`は、このComposeプロジェクトが使用するほかの名前付きボリュームも削除します。保持したいデータがないことを確認してから実行してください。

### `.npmrc`ではなくコンテナのグローバル設定を使う理由

`frontend/.npmrc`はホスト側のpnpmからも読み込まれます。そこにコンテナ内の絶対パスを指定すると、ホストでpnpmを実行したときにもその設定が適用されます。

そのため、`pnpm config set --global`を使い、コンテナ内の設定ファイル`/root/.config/pnpm/rc`に保存しています。この設定はイメージに含まれ、`docker compose exec`と`docker compose run --rm`のどちらでも使用できますが、ホスト側には影響しません。

現在の保存場所は、次のコマンドで確認できます。

```bash
docker compose exec frontend pnpm store path
# /frontend/node_modules/.pnpm-store/v10
```

## API仕様のプレビューと検証

API契約は [openapi.yaml](../reference/openapi.yaml)（OpenAPI 3.0.3）で、Redocly でプレビュー・検証できる。プロジェクト設定はリポジトリルートの [redocly.yaml](../../redocly.yaml)（API名 `fadg-api`）。

- **ライブプレビュー（推奨）**: `npx @redocly/cli preview --product redoc` → http://localhost:4000 （`openapi.yaml` 編集で再読込）
- **HTML生成**: `npx @redocly/cli build-docs fadg-api`
- **検証**: `npx @redocly/cli lint fadg-api`
- **Swagger Editor**: https://editor.swagger.io/ に `openapi.yaml` を貼り付ける。
- **VS Code**: OpenAPI 拡張機能でプレビュー。

> フロントエンド・バックエンドのクライアント/スタブコード生成も `openapi.yaml` から行う。GitHub Pages でのホスティングは今後追加を想定する。
