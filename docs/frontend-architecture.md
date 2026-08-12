# フロントエンドのアーキテクチャ

`frontend/src` のディレクトリ構成は Feature-Sliced Design（以下 FSD）に従っています。このドキュメントでは、新しくコードを追加するときに**どこに置けばよいか**を判断できるようにすることを目的とします。

- FSD という方法論そのものの解説は [Feature-Sliced Designとは](feature-sliced-design.md) を参照してください
- デザイントークンやコンポーネントの見た目のルールは [デザインシステム](design-system.md) を参照してください

## なぜ FSD にしたか

[ページ構成](pages.md) の通り、今後6ページを実装していきます。「共通コンポーネントは `components/`、ページ固有は `features/`」という分け方だと、ページが増えるにつれて次の問題が出ます。

- どちらに置くべきか判断がぶれる
- あるページ用に作った部品を別のページから参照し始めると、依存が双方向になって追えなくなる
- `import Button from "../../../../components/Button/Button"` のような深い相対パスが増える

FSD は**レイヤーの上下関係を決めて、依存の向きを一方向に固定する**ことでこれを防ぎます。

## レイヤー

上のレイヤーほど「具体的な画面に近い」、下のレイヤーほど「汎用的」です。

| レイヤー | 役割 | 現在の中身 |
| --- | --- | --- |
| `app/` | アプリ全体の設定。エントリポイント、グローバルCSS、今後はルーティングやProvider | `main.tsx`, `App.tsx`, `styles/index.css` |
| `pages/` | 1つの画面。その画面でしか使わないブロックも中に持つ | `top/`（配下に `hero/`, `section/`, `contest-list/`, `ranking-board/`, `news-list/`） |
| `widgets/` | **複数のページで**使い回す、画面の中の独立した一区画 | **まだ無し** |
| `features/` | ユーザーの操作単位の機能（ログインする、DFAを提出する など） | **まだ無し** |
| `entities/` | ビジネス上の対象物。型やデータだけでなくビジネスロジックを持つもの | **まだ無し** |
| `shared/` | どこからでも使う汎用部品。特定の業務知識を持たない | `ui/button/`, `ui/card/`, `ui/header/`, `ui/footer/` |

### 空のレイヤーを埋めに行かない

`widgets/` `features/` `entities/` は現時点で該当するものが無いため、ディレクトリごと作っていません。FSD は**すべてのレイヤーを使うことを求めていません**。必要になった時点で作ってください。

判断基準は次の通りです。

- `widgets/` — **2ページ目から使いたくなったら**引き上げる。1ページからしか使わないブロックは `pages/<ページ>/ui/` に置く
- `entities/` — **型やデータだけのものは作らない**。`apply-discount.ts` のような「その対象物に固有のビジネスロジック」が出てきてから作る。単なる型定義やCRUDは `shared/api/` に置く
- `features/` — ログイン機能やDFA提出機能を実装するときに追加する

先回りしてレイヤーを分けると、要件が固まっていないうちに作った抽象化だけが残り、バックエンド接続時に作り直しになります。詳しくはFSD公式の [Excessive Entities](https://feature-sliced.design/docs/guides/issues/excessive-entities) を参照してください。

現状、コンテスト・ユーザー・お知らせの型とモックデータは、それを使うコンポーネント（`ContestList.tsx` など）の中に直接書いています。バックエンド接続時に `shared/api/` へ移します。

`Header` / `Footer` は全ページ共通のレイアウト部品ですが、ページ固有の情報を持たないため `shared/ui/` に置いています。認証状態の参照など業務ロジックが入った時点で `widgets/` へ引き上げてください。

### 依存の向き

**上のレイヤーは下のレイヤーだけを import できます。逆向きと、同じレイヤー内での相互 import は禁止です。**

```
app  →  pages  →  widgets  →  features  →  entities  →  shared
```

## スライスとセグメント

`shared` 以外のレイヤーは、まず**スライス**（対象ごとのディレクトリ）に分かれ、その中が**セグメント**（役割ごとのディレクトリ）に分かれます。

```
pages/top/                ← スライス
├── index.ts              ← 公開API
└── ui/                   ← セグメント
    ├── Top.tsx
    ├── Top.css
    ├── hero/             ← このページ専用のブロック
    │   ├── Hero.tsx
    │   └── Hero.css
    ├── section/          ← ブロック同士で共通の外枠
    │   ├── Section.tsx
    │   └── Section.css
    └── contest-list/
        ├── ContestList.tsx
        └── ContestList.css
```

ページ専用のブロックはスライスではないので `index.ts` を持ちません。`Top.tsx` から相対パスで直接 import します。

ブロック同士で共通化したい部分が出てきたら、`section/` のように**同じ `ui/` の中に切り出します**。まだ他のページから使わないうちは `shared/` や `widgets/` に上げないでください。

セグメントは役割で決まります。

| セグメント | 中身 |
| --- | --- |
| `ui/` | 見た目。コンポーネントとCSS |
| `model/` | 型、状態、ビジネスロジック |
| `api/` | バックエンドとの通信 |
| `lib/` | そのスライス専用のユーティリティ |
| `config/` | 定数、設定値 |

`app/` と `shared/` はスライスを持たず、いきなりセグメントから始まります（`shared/ui/button/`）。

`app/` に置くものは公式リファレンスで次のように定められています。

| セグメント | 中身 | 現在 |
| --- | --- | --- |
| `entrypoint` | アプリケーションコードの入口 | `main.tsx`（ファイル1つなのでセグメントは切っていません） |
| `routes` | ルーター設定 | まだ無し |
| `store` | グローバルストア設定 | まだ無し |
| `styles` | グローバルCSS | `styles/index.css` |

**`main.tsx` は `app/` に置きます。** ビルドの入口なので `src/` 直下に置きたくなりますが、公式は `entrypoint` を `app` レイヤーのセグメントとして定義しています。[frontend/index.html](../frontend/index.html) の `<script src="/src/app/main.tsx">` がここを指しています。

## 公開API（index.ts）

各スライスは `index.ts` で「外から使ってよいもの」だけを公開します。**スライスの中のファイルを直接 import しないでください。**

```ts
// ✅ 公開APIを経由する
import { Button, Card } from "@/shared/ui";
import { Top } from "@/pages/top";

// ❌ 中のファイルを直接指す
import Button from "@/shared/ui/button/Button";
```

こうしておくと、内部構造を変えても外側を直す必要がなくなります。

`index.ts` の書き方は再エクスポートです。コンポーネント側は `export default` のままで構いません。


## パスエイリアス `@/`

`@/` が `frontend/src/` を指します。レイヤーをまたぐ import では常にこちらを使ってください。深い相対パスは書かない方針です。

設定は2箇所にあり、**両方を揃える必要があります**。

- [frontend/vite.config.ts](../frontend/vite.config.ts) の `resolve.alias`（実行時の解決）
- [frontend/tsconfig.app.json](../frontend/tsconfig.app.json) の `paths`（型チェックとエディタ補完）

## 命名規則

**ディレクトリは kebab-case、ファイルは PascalCase** で統一します。

```
shared/ui/button/Button.tsx          ✅
pages/top/ui/contest-list/ContestList.tsx   ✅
pages/top/ui/ContestList/ContestList.tsx    ❌ ディレクトリが PascalCase
```

これは見た目の統一だけの話ではありません。

- macOS は大文字小文字を区別しないため、`./contest-list/ContestList` と書くべきところを `./Contest-List/ContestList` と書いても手元では動いてしまいます。区別する Linux（Docker、将来のCI）で初めて壊れます。命名が混在しているとこの打ち間違いが起きやすくなります
- 後から直すのが厄介です。macOS では大文字小文字だけを変えるリネームを `git mv` が同じパスと見なすため、`git mv Hero hero-tmp && git mv hero-tmp hero` のように一時名を経由する必要があります。さらに大文字小文字だけのリネームを他のメンバーが pull すると、古いディレクトリが残って作業ツリーが壊れることがあります

`pnpm build`（`tsc -b`）は import パスの大文字小文字のズレを検出します。ローカルで通ってもDockerで確認しておくと確実です。

```bash
docker compose run --rm --no-deps frontend pnpm build
```

## どこに置くか迷ったら

上から順に当てはめてください。

1. **ボタンや入力欄のように、業務知識を持たない汎用部品か？** → `shared/ui/`
2. **そのページでしか使わないか？** → `pages/<ページ>/ui/<ブロック>/`
3. **同じものを2ページ目でも使いたくなったか？** → `widgets/<区画>/` に引き上げる
4. **「提出する」「ログインする」のようなユーザーの操作単位の機能か？** → `features/<機能>/`
5. **対象物に固有のビジネスロジックが出てきたか？** → `entities/<対象>/`

**迷ったら `pages/<ページ>/ui/` です。** 先回りして `widgets/` や `entities/` に置くと、結局そのページでしか使わないまま抽象化だけが残ります。後から引き上げるのは簡単ですが、使われていない抽象化を消すのは誰も判断できず放置されます。

型やモックデータも同じで、単独のスライスにはせず、まず使うコンポーネントの中に書いてください。

## 今後の課題

- **ルーティング** — react-router は未導入で、`app/App.tsx` が `Top` を直接描画しています。導入時は `app/` にルート定義を置きます
- **API接続** — 現在モックデータは各コンポーネント（`ContestList.tsx` など）に直接書いています。バックエンド接続時は型と通信処理を `shared/api/` にまとめ、モックを差し替えます
- **レイヤー違反の自動検出** — FSD公式のリンター [steiger](https://github.com/feature-sliced/steiger) がありますが、まず構造を定着させることを優先して未導入です
