# 開発環境ガイド
# 初回セットアップ
dockerを作業PCにインストールしてください。
Macの場合は[こちら](https://docs.docker.com/desktop/setup/install/mac-install/)からDocker Desktopをダウンロードしてください。

以下のコマンドを実行するとコンテナが立ち上がります。
```bash
docker compose up -d
```
コンテナ起動後、`http://localhost:5173/`でブラウザからfrontendにアクセスできます。
backendは`http://localhost:8080`で起動しています。ターミナルから動作確認したい場合は、例えば以下のように実行できます。
```bash
curl http://localhost:8080/health
```

コンテナを停止する際は以下のコマンドを実行してください。
```bash
docker compose down
```

Dockerfileに変更があった場合(pullで取り込んだ場合を含む)は、再ビルド付きで起動してください。
```bash
docker compose up -d --build
```

# 開発の際に新たなパッケージを追加する場合
開発環境はDocker Composeで統一しています。パッケージの追加・削除は**必ずコンテナ内で実行**してください。

## なぜコンテナ内で実行するのか

1. **frontendは必須**: `node_modules` はDockerボリュームにあるため、ホストで `pnpm add` してもコンテナ内には反映されません。また、ホスト(macOS)とコンテナ(Linux)ではネイティブモジュールのバイナリが非互換です。
2. **バージョン統一**: コンテナ内のGo / Node / pnpmのバージョンで依存解決されるため、メンバー間の手元のバージョン違いでlockfileが変わる事故が起きません。
3. **ホストにツール不要**: GoやpnpmをホストにインストールしていないメンバーでもDockerだけで作業できます。

## パッケージの追加方法

### Go(backend)

```bash
# コンテナ起動中
docker compose exec backend go get github.com/some/package

# コンテナ停止中(使い捨てコンテナで実行)
docker compose run --rm backend go get github.com/some/package
```

関連コマンド:

```bash
# 開発ツール(CLI)を追加する場合(airと同じ方式)
docker compose exec backend go get -tool github.com/some/tool

# 使われていない依存の掃除(go.mod / go.sum の整理)
docker compose exec backend go mod tidy
```

`go.mod` / `go.sum` はバインドマウント経由でホスト側にも反映されるので、そのままコミットしてください。

### TypeScript(frontend)

```bash
# コンテナ起動中
docker compose exec frontend pnpm add package-name

# 開発時のみ使うもの(型定義、ビルドツールなど)は -D
docker compose exec frontend pnpm add -D @types/package-name

# コンテナ停止中
docker compose run --rm frontend pnpm add package-name
```

削除は `pnpm remove package-name`(同じく `exec` / `run --rm` 経由)。

`package.json` / `pnpm-lock.yaml` はバインドマウントでホストに反映され、パッケージの実体は `node_modules` ボリュームに入ります。

## pull後の同期(パッケージを取り込む側)

他のメンバーが追加したパッケージを取り込むときの手順です。

```bash
# frontend: lockfileに合わせてボリューム内のnode_modulesを同期(必須)
docker compose exec frontend pnpm install --frozen-lockfile

# backend: 何もしなくてよい(次回起動時にビルドが自動でダウンロードする)
```

> **注意**: Goは足りない依存をビルド時に自動取得しますが、frontendは `pnpm install` を明示的に実行しないとボリューム内が古いままです。pull後にfrontendが起動しなくなったら、まずこれを疑ってください。

`--frozen-lockfile` は「lockfileに書かれている通りにインストールし、不整合があればエラーで止める」オプションです。同期目的ではこれを付けることで、lockfileが意図せず書き換わるのを防げます(パッケージ追加時の `pnpm add` には不要です)。
