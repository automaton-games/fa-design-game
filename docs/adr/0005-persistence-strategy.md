---
status: draft
---

# 永続化層と起動時読み込み

問題データの読み込みを、ドメイン層（`problem.Store`）と切り離した永続化層（loader）が担う。loader は `[]ContestInput` を返す関数で、MVP では JSON ファイル、DB 移行後は SQL/GORM から読む。`problem.NewStore` は loader を受け取って起動時に全件を読み込み、各問題を検証して不変ストアを構築する。DB 移行後もこの構造と、起動時一括読み込み・不変ストア（ADR 0004）を維持する。

理由: 永続化の詳細（ファイル、SQL、ORM）をドメイン層へ持ち込むと、問題データの検証・構築・不変性という本質的な責務が永続化手法に絡め取られ、テストと差し替えが困難になる。loader seam によって、ドメイン層は「検証済みの Problem を保持する不変ストア」だけを担い、永続化層は「`[]ContestInput` を作る」だけを担う。MVP の loader を DB 行のプロトタイプとして機能させれば、DB 移行は loader の差し替えだけで済む。

## 考慮した選択肢

- **ドメイン層に直接 GORM を持ち込む（`NewStore` が `*gorm.DB` を受け取る）。**
  却下: ドメインが ORM に結合し、ファイルベースの MVP と DB で共通化できない。loader seam が検証されない。
- **リクエストごとに DB から問題を読む。**
  却下: ADR 0004（起動時1回検証・不変保持）と矛盾し、正解DFAを毎回検証するかキャッシュする複雑さを招く。
- **正解DFAを JSON 列1つで格納する。**
  却下: `alphabet`/`answer_dfa` が非原子値になり第1正規形に違反する。DFA は Problem に従属する値オブジェクトだが、正規化テーブルで参照整合性を保証し、完全性・重複・空文字は loader → `Validate`（ADR 0003）で検証する方が筋が通る。
- **コンテストと問題を多対多にする。**
  却下: MVP は Practice 1つで過剰。task code をコンテスト内の表示コードとし、問題に不変の問題IDを持たせる設計で、後から結合テーブル追加で移行可能。
- **`code`/`slug` を DB 主キーにする。**
  却下: 自然キーは変更が困難で、FK の連鎖更新を招く。数値PK を内部主キーとし、`code`/`slug` は公開識別子として別に持つ（ADR 0001）。

## 帰結

- `NewStore` は loader（`func() ([]ContestInput, error)`）を受け取る（関数 DI）。
- 永続化層の差し替えは loader 実装の差し替えのみ。ドメイン層・API・正解DFA検証・ストア不変性は MVP/DB で変わらない。
- MVP は `backend/internal/problem/data/*.json` を読む loader。DB 移行は SQL/GORM から同じ `[]ContestInput` を組み立てる loader を追加する。
- DBスキーマは contests と problems の1対多に加え、DFA と alphabet を正規化テーブルへ分割し第1正規形を満たす。テーブル構成・制約の詳細は [システム詳細設計書 第3.4/3.5節](../reference/system-design.md) を参照（本ADRでは重複しない）。
- DFA の完全性（全 state×symbol 組に遷移があるか）・重複・空文字は DB 制約で表現できないため、loader → `Validate`（ADR 0003）が検証する。DB 制約は遷移の参照整合性（from/to/symbol が定義済み state/alphabet に存在）のみ保証する。
- 数値PK は永続化層の内部詳細。ドメイン層・API は `code`/`slug` のみを使い、数値PK を露出しない（ADR 0001）。
- 起動時一括読み込みを維持するため、問題の即時追加・公開切替が必要になった段階で本ADRを見直す。
