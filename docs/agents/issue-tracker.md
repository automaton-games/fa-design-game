# Issue tracker: GitHub

このリポジトリのIssueとPRDはGitHub Issuesで管理します。すべての操作には `gh` CLIを使用してください。

リポジトリ: https://github.com/automaton-games/fa-design-game

## 操作規約

- **Issueを作成する**: `gh issue create --title "..." --body "..."`。複数行の本文にはヒアドキュメントを使用します。
- **Issueを読む**: `gh issue view <number> --comments`。コメントやラベルも取得します。
- **Issueを一覧する**: `gh issue list --state open --json number,title,body,labels,comments` に、必要な `--label` や `--state` フィルターを追加します。
- **Issueへコメントする**: `gh issue comment <number> --body "..."`
- **ラベルを付与・削除する**: `gh issue edit <number> --add-label "..."` / `--remove-label "..."`
- **Issueを閉じる**: `gh issue close <number> --comment "..."`

リポジトリは現在のcloneの `git remote` から推測します。通常、リポジトリ内で実行すれば `gh` が自動的に判定します。

## Pull Requestをトリアージ対象にするか

**PRを依頼受付として扱う: いいえ。**

外部Pull Requestは、Issueと同じトリアージキューや状態遷移の対象にしません。

## スキルが「issue trackerへ公開する」と指示した場合

GitHub Issueを作成します。

## スキルが「関連チケットを取得する」と指示した場合

`gh issue view <number> --comments` を実行します。

## Wayfinding操作

`/wayfinder` では、1つのIssueを**マップ**とし、その子Issueをチケットとして扱います。

- **マップ**: `wayfinder:map` ラベルを付けた単一のIssue。Notes、Decisions-so-far、Fogを本文に保持します。
- **子チケット**: GitHubのsub-issueとしてマップに関連付けます。sub-issueが利用できない場合は、マップ本文のタスクリストに追加し、子Issueの冒頭に `Part of #<map>` と記載します。`wayfinder:<type>`（`research`、`prototype`、`grilling`、`task`）ラベルを使用します。
- **ブロック関係**: GitHubのネイティブIssue依存関係を使用します。利用できない場合は、子Issue本文の冒頭に `Blocked by: #<n>, #<n>` と記載します。すべての依存Issueが閉じられた時点でブロック解除とみなします。
- **Frontier**: マップに属する未完了の子Issueから、未解決の依存先または担当者があるものを除き、マップ上で最初のものを選びます。
- **Claim**: `gh issue edit <n> --add-assignee @me` を実行します。これをセッション最初の書き込み操作とします。
- **Resolve**: 回答をコメントし、Issueを閉じ、マップのDecisions-so-farへコンテキストへのリンクを追記します。
