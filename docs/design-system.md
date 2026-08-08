# デザインシステム

> **これは下書きです。** トップページの実装時に決めた内容をまとめたものなので、他のページを作る過程で変わる可能性があります。気になる点があれば議論して更新してください。

## 概要

見た目の統一とレビューのしやすさのために、色・文字サイズ・余白を CSS 変数（デザイントークン）として一箇所にまとめています。定義は [`frontend/src/index.css`](../frontend/src/index.css) にあります。

**コンポーネントの CSS では原則としてトークンだけを使い、生の値（`#8843E1`、`16px` など）を直接書かない**というのが基本方針です。色を調整したくなったときに `index.css` だけを見れば済むようにするためです。

## トークンの構造

色は「パレット」と「セマンティックカラー」の2層に分けています。

```
--color-purple-600: #8843E1;   ← パレット（実際の色）
        ↓
--button-primary: var(--color-purple-600);   ← セマンティック（用途）
        ↓
.button--primary { background-color: var(--button-primary); }   ← 利用側
```

コンポーネントからは**セマンティックカラーだけを参照します**。「主ボタンの色を変えたい」と「紫の色味を変えたい」を別々に扱えるようにするためで、パレットを直接参照するとこの区別ができなくなります。

### カラーパレット

| グループ | トークン | 値 |
| --- | --- | --- |
| 紫 | `--color-purple-100` / `400` / `600` / `800` | `#ECDDF7` / `#BB87FF` / `#8843E1` / `#5C10BE` |
| グレー | `--color-gray-0` / `300` / `400` / `550` / `600` / `700` / `800` / `1000` | `#FFFFFF` / `#F4F4F4` / `#F0F4F6` / `#D0D2D3` / `#ADB5BD` / `#677278` / `#334261` / `#000000` |
| 緑 | `--color-green-200` / `700` / `900` | `#CCEFD2` / `#009944` / `#037938` |
| 赤 | `--color-red-200` / `700` / `900` | `#FFCECB` / `#BA1A1A` / `#93000A` |

数字は大きいほど濃い色です。中間の番号が飛んでいるのは、必要になった時点で追加していく想定だからです。

### セマンティックカラー

| 用途 | トークン | 参照先 |
| --- | --- | --- |
| 文字 | `--text-primary` | `gray-800` — 本文・見出し |
| | `--text-sub` | `gray-700` — 補足テキスト |
| | `--text-inverse` | `gray-0` — 濃い背景の上の文字 |
| | `--text-accent` | `purple-800` — 強調 |
| | `--text-success` / `--text-error` | `green-900` / `red-900` |
| 背景 | `--background-default` | `gray-0` |
| | `--background-accent` | `purple-100` |
| | `--background-success` / `--background-error` | `green-200` / `red-200` |
| 線 | `--border-primary` | `gray-1000` — カードやヘッダーの主線 |
| | `--border-sub` | `gray-550` — リストの区切り線 |
| | `--border-grid` | `gray-400` — 背景のグリッド |
| | `--border-accent` | `purple-600` |
| ボタン | `--button-primary` / `--button-primary-text` / `--button-primary-text-hover` | 下記「Button」参照 |
| | `--button-sub` / `--button-sub-text` / `--button-sub-text-hover` | |
| アイコン | `--icon-primary` | `purple-600` |

### 文字サイズ

ブラウザの文字サイズ変更設定を尊重するため、**`px` ではなく `rem` で指定しています**。`px` で書くとユーザーが文字を大きくしても反映されません。

| トークン | 値 | 用途 |
| --- | --- | --- |
| `--font-xs` | `0.75rem` | 補足、キャプション |
| `--font-sm` | `0.875rem` | サブテキスト |
| `--font-md` | `1rem` | 本文（基準） |
| `--font-lg` | `1.25rem` | 小見出し |
| `--font-xl` | `1.5rem` | 見出し |
| `--font-2xl` | `2rem` | ページタイトル |
| `--font-3xl` | `4.5rem` | ヒーロー見出しの強調 |

### 余白

`4px` の倍数で刻んでいます。トークン名の数字が `4px` の何倍かを表します（`--space-4` = `16px`）。

| トークン | 値 |
| --- | --- |
| `--space-1` | `4px` |
| `--space-2` | `8px` |
| `--space-3` | `12px` |
| `--space-4` | `16px` |
| `--space-6` | `24px` |
| `--space-8` | `32px` |
| `--space-12` | `48px` |

## フォントとアイコン

### フォント

**Noto Sans JP** を Google Fonts から読み込んでいます（[`frontend/index.html`](../frontend/index.html)）。日本語と英数字が同じファミリで揃うので、和文欧文混在でも字面が崩れません。

### アイコン

**Material Symbols Outlined** を使用しています。`<span className="material-symbols-outlined">arrow_forward</span>` のようにアイコン名をテキストとして書きます。

> ⚠️ **新しいアイコンを使うときは `index.html` の `icon_names` パラメータへの追記が必要です。**
> 読み込み量を抑えるため、使用するアイコンだけを URL で指定しています。追記を忘れるとアイコン名がそのまま文字列として表示されます。
>
> 現在指定しているもの: `arrow_forward`, `check_circle`, `close`, `code_xml`, `crossword`, `leaderboard`, `login`, `menu`

## 共通コンポーネント

`frontend/src/components/` にページをまたいで使うものを置いています。特定のページでしか使わないものは `frontend/src/features/<ページ名>/components/` に置きます。

### Button

```tsx
<Button icon="arrow_forward">有限オートマトンとは？</Button>
<Button variant="sub" onClick={handleClick}>新規登録</Button>
```

| Props | 型 | 説明 |
| --- | --- | --- |
| `children` | `ReactNode` | ラベル（必須） |
| `variant` | `"primary"` \| `"sub"` | 省略時は `primary` |
| `icon` | `string` | Material Symbols のアイコン名。指定すると丸囲みアイコンが右側に付きます |
| `className` | `string` | 外側からのレイアウト調整用 |
| `onClick` | `() => void` | |

**通常時は塗りつぶし、ホバー時に背景が透明になる**という挙動です（一般的なボタンとは逆向き）。`primary` は紫、`sub` は黒です。

### Card

```tsx
<Card icon="crossword" title="FAを設計する">状態と遷移を自由に設計して……</Card>
```

`title` と `children`（本文）、任意で `icon` を取ります。左上と右下に L 字の装飾線が入ります。

### Header / Footer

全ページ共通です。Header はサイトタイトル・ナビゲーション・ログイン/新規登録ボタン、Footer は3カラムのリンク集です。

Header は 768px 以下でナビをハンバーガーメニューに畳みます。開閉状態は Header 内の `useState` で持っており、以下の操作で閉じます。

- ハンバーガーボタンをもう一度押す
- ナビ内のリンクを押す
- `Escape` キー

支援技術向けにボタンへ `aria-expanded` / `aria-controls` / `aria-label` を付けています。**ナビの開閉を `display: none` の切り替えで行っている**ため、閉じている間はリンクがフォーカス順から外れます（`visibility` や `opacity` で隠すとキーボード操作で見えないリンクに入り込んでしまいます）。

> 現状リンク先はすべて `href="#"` です。ルーティング導入時にまとめて差し替えます。

### Section（CSS のみ）

[`frontend/src/features/top/components/Section.css`](../frontend/src/features/top/components/Section.css) に、トップページの「コンテスト」「ランキング」「お知らせ」で共通のレイアウトをまとめています。

| クラス | 役割 |
| --- | --- |
| `.section` | セクション全体の縦並び |
| `.section__title` | 見出し |
| `.section__list` | 一覧部分 |
| `.section__more` | 「もっと見る」ボタンを右寄せ |

同じ構造のセクションが他のページにも増えるようなら、CSS だけでなくコンポーネントとして切り出すことを検討してもよさそうです。

## 記述ルール

### クラス名は BEM

`ブロック__要素--修飾子` の形式です。

```css
.button            /* ブロック */
.button__arrow     /* 要素 */
.button--primary   /* 修飾子 */
```

### ファイル名は PascalCase

コンポーネントのファイルとディレクトリは PascalCase で、CSS は同じディレクトリに同名で置きます。

```
components/Button/
├── Button.tsx
└── Button.css
```

> ⚠️ **import 文の大文字小文字はファイル名と厳密に一致させてください。**
> macOS はファイル名の大文字小文字を区別しないため手元では動いてしまいますが、Docker コンテナ（Linux）や CI では解決に失敗してビルドが落ちます。`pnpm build` を実行すれば `tsc` が検出してくれます（`error TS1261`）。ただし CSS の import は検出されないので特に注意してください。

### HTML のセマンティクス

- 見出しは必ず `<h1>`〜`<h6>` を使います（`<p>` に `font-size` を当てるのは避ける）。1ページに `<h1>` は1つです
- ヘッダーは `<header>`、フッターは `<footer>`、主コンテンツは `<main>`、ナビゲーションは `<nav>`
- リンクには必ず `href` を付けます。`href` のない `<a>` はキーボードでフォーカスできず、スクリーンリーダーにもリンクとして読まれません

### 色のコントラスト

文字と背景のコントラスト比は WCAG AA（通常サイズの文字で **4.5:1** 以上）を目安にします。パレット上で隣り合う濃度の組み合わせは不足しがちなので、新しい配色を追加するときはチェックツールで確認してください。

## レスポンシブ

### 考え方

既存の CSS が PC 幅前提で書かれているため、**デスクトップファースト**（`@media (max-width: …)` で上書き）で組んでいます。

ただし可能な限りブレークポイントを使わず、**宣言側で完結する方法を優先**しています。理由は、`var()` がメディアクエリの条件部では使えないためです。

```css
@media (max-width: var(--bp-md)) { ... }   /* ✗ 効かない */
@media (max-width: 768px) { padding: var(--space-4); }   /* ✓ ブロック内なら使える */
```

CSS 変数は「要素に紐づく継承プロパティ」なので、特定の要素に属さないメディアクエリの条件部では解決できません。`@custom-media` という仕様案がありますが、まだどのブラウザも実装していません（PostCSS を入れれば使えます）。

一方 `clamp()` / `min()` / `max()` / `minmax()` は宣言側なので `var()` を使えます。ブレークポイントを増やさずに済むので、まずこちらを検討してください。

### ブレークポイント

現在使っているのは1つだけです。値は直書きなので、変更するときは以下の3ファイルを合わせて直してください。

| 幅 | 対象 |
| --- | --- |
| `768px` | [Top.css](../frontend/src/features/top/pages/Top.css)（3カラム→縦積み、区切り線を左→上へ）、[Header.css](../frontend/src/components/Header/Header.css)（ナビをハンバーガーメニューに）、[Footer.css](../frontend/src/components/Footer/Footer.css)（3カラム→縦積み）、[Hero.css](../frontend/src/features/top/components/Hero/Hero.css)（見出しと画像を縦積み） |

### ブレークポイントを使っていない箇所

- **見出し** — `--font-3xl: clamp(2.5rem, 5.5vw, 4.5rem)` で画面幅に応じて 40px〜72px に変化します。`5.5vw` は、ヒーロー見出しが全幅で1行に収まる上限を実測して決めた値です。**見出しの文言を変えると折り返し位置が変わる**ので、そのときは再調整してください
- **説明カード** — `grid-template-columns: repeat(auto-fit, minmax(var(--card-min), 1fr))` で、1枚あたり `--card-min`(240px) を確保できる範囲で自動的に列数が決まります

### 注意点

- 縦積みにするとき、`border-left` を `border-top` に付け替えるのを忘れると区切り線が消えます
- タップ領域は 44px 四方が目安です。スマホ幅ではナビとフッターのリンクに `min-height: 44px` を当てています
- 修正後は横スクロールが出ていないか（`document.documentElement.scrollWidth` が画面幅を超えていないか）を確認してください

## 背景のグリッド

`body` に CSS グラデーションで `24px` 間隔の方眼を敷いています。オートマトンの状態遷移図を手で描くイメージに寄せたものです。

## 未確定・今後の検討事項

- **説明カードの列数** — `auto-fit` のため、ビューポート幅 816〜1071px では3列になり「3枚 + 1枚」の並びになります。4→2→1 に固定したい場合はブレークポイントを明示する必要があります
- **フォーカススタイル** — キーボード操作時の `:focus-visible` の見た目を定義していません（ブラウザ既定のまま）
- **ダークモード** — 対応予定なし。やる場合はセマンティックカラーの定義を差し替える形になります
- **文字サイズトークンの間隔** — `--font-2xl`（2rem）と `--font-3xl`（4.5rem）の差が大きいので、中間が必要になるかもしれません
- **フォームコンポーネント** — 入力欄・セレクトなどは未作成。ログイン/新規登録ページの実装時に定義が必要です
