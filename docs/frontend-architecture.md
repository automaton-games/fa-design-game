# フロントエンドのアーキテクチャ

`frontend/src` のディレクトリ構成は [Feature-Sliced Design](https://feature-sliced.design/)（以下 FSD）に従っています。このドキュメントでは、新しくコードを追加するときに**どこに置けばよいか**を判断できるようにすることを目的とします。

デザイントークンやコンポーネントの見た目のルールは [デザインシステム](design-system.md) を参照してください。

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
| `app/` | アプリ全体の設定。グローバルCSS、今後はルーティングやProvider | `App.tsx`, `styles/index.css` |
| `pages/` | 1つの画面。widgets を並べて組み立てる | `top/` |
| `widgets/` | 画面の中の独立した一区画 | `header/`, `footer/`, `contest-list/`, `ranking-board/`, `news-list/` |
| `features/` | ユーザーの操作単位の機能（ログインする、DFAを提出する など） | **まだ無し** |
| `entities/` | ビジネス上の対象物の型とデータ | `contest/`, `user/`, `news/` |
| `shared/` | どこからでも使う汎用部品。特定の業務知識を持たない | `ui/button/`, `ui/card/`, `ui/section/` |

`features/` は該当するものがまだ無いため作っていません。ログイン機能やDFA提出機能を実装するときに追加してください。

### 依存の向き

**上のレイヤーは下のレイヤーだけを import できます。逆向きと、同じレイヤー内での相互 import は禁止です。**

```
app  →  pages  →  widgets  →  features  →  entities  →  shared
```

例えば `widgets/news-list` が `widgets/contest-list` を import するのは違反です。共通部分が出てきたら `shared` か `entities` に下ろしてください。

## スライスとセグメント

`shared` 以外のレイヤーは、まず**スライス**（対象ごとのディレクトリ）に分かれ、その中が**セグメント**（役割ごとのディレクトリ）に分かれます。

```
widgets/contest-list/     ← スライス
├── index.ts              ← 公開API
└── ui/                   ← セグメント
    ├── ContestList.tsx
    └── ContestList.css

entities/contest/         ← スライス
├── index.ts
└── model/                ← セグメント
    ├── types.ts
    └── mock.ts
```

セグメントは役割で決まります。

| セグメント | 中身 |
| --- | --- |
| `ui/` | 見た目。コンポーネントとCSS |
| `model/` | 型、状態、ビジネスロジック |
| `api/` | バックエンドとの通信 |
| `lib/` | そのスライス専用のユーティリティ |
| `config/` | 定数、設定値 |

`shared/` だけはスライスを持たず、いきなりセグメントから始まります（`shared/ui/button/`）。

## 公開API（index.ts）

各スライスは `index.ts` で「外から使ってよいもの」だけを公開します。**スライスの中のファイルを直接 import しないでください。**

```ts
// ✅ 公開APIを経由する
import { Button } from "@/shared/ui/button";
import { ContestList } from "@/widgets/contest-list";
import type { Contest } from "@/entities/contest";

// ❌ 中のファイルを直接指す
import Button from "@/shared/ui/button/Button";
```

こうしておくと、スライスの内部構造を変えても外側を直す必要がなくなります。

`index.ts` の書き方は再エクスポートです。コンポーネント側は `export default` のままで構いません。

```ts
// widgets/contest-list/index.ts
export { default as ContestList } from "./ui/ContestList";
```

> ⚠️ `tsconfig.app.json` で **`verbatimModuleSyntax`** が有効なので、型を再エクスポートするときは必ず `export type` を使ってください。通常の `export` だと実行時に存在しない値を re-export しようとしてビルドが落ちます。
>
> ```ts
> // entities/contest/index.ts
> export type { Contest } from "./model/types";   // 型は export type
> export { contestsData } from "./model/mock";    // 値は export
> ```

### 例外

- CSS だけのモジュール（`shared/ui/section/Section.css`）は `index.ts` を持たず直接 import します
- 同じスライス内のファイル同士は相対パスで直接 import します（`pages/top/ui/TopPage.tsx` から `./Hero/Hero`）

## パスエイリアス `@/`

`@/` が `frontend/src/` を指します。レイヤーをまたぐ import では常にこちらを使ってください。深い相対パスは書かない方針です。

設定は2箇所にあり、**両方を揃える必要があります**。

- [frontend/vite.config.ts](../frontend/vite.config.ts) の `resolve.alias`（実行時の解決）
- [frontend/tsconfig.app.json](../frontend/tsconfig.app.json) の `paths`（型チェックとエディタ補完）

## どこに置くか迷ったら

上から順に当てはめてください。

1. **ボタンや入力欄のように、業務知識を持たない汎用部品か？** → `shared/ui/`
2. **「コンテスト」「ユーザー」のような対象物の型やデータか？** → `entities/<対象>/`
3. **「提出する」「ログインする」のようなユーザーの操作単位の機能か？** → `features/<機能>/`
4. **複数の要素をまとめた画面の一区画で、他のページでも使いそうか？** → `widgets/<区画>/`
5. **そのページでしか使わないか？** → `pages/<ページ>/ui/`

判断に迷う場合は、まず `pages/<ページ>/ui/` に置いておき、2ページ目から使いたくなった時点で `widgets/` に引き上げるのが安全です。先回りして widgets に置くと、結局そのページでしか使わないまま抽象化だけが残ります。

## 今後の課題

- **ルーティング** — react-router は未導入で、`app/App.tsx` が `TopPage` を直接描画しています。導入時は `app/` にルート定義を置きます
- **API接続** — 現在 `entities/*/model/mock.ts` にモックデータを置いています。バックエンド接続時は `entities/*/api/` を追加し、モックを差し替えます
- **レイヤー違反の自動検出** — FSD公式のリンター [steiger](https://github.com/feature-sliced/steiger) がありますが、まず構造を定着させることを優先して未導入です
