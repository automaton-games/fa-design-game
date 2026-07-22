# Contributing

このドキュメントでは、FA Design Game の開発に参加するときの基本的な進め方をまとめます。

GitHubでの開発が初めての人は、先に [GitHubを使った開発手順](github-workflow/README.md) を読んでください。
Issueの選び方からPull Requestのマージまでを、順を追って説明しています。
このドキュメントは運用の規則をまとめた参照用で、手順の詳細は上記の手順書にあります。

## 開発の流れ

1. 作業するIssueを決める
2. Issueに自分をAssignする
3. `main` ブランチを最新にする
4. 作業用ブランチを作成する
5. 変更をコミットする
6. Pull Requestを作成する
7. レビュー後に `main` へマージする

## Issueの運用

- 作業を始める前にIssueを作成する
- 1 Issue = 1 Pull Requestで完了できる大きさを目安にする
- Issueには「概要」「やること」「完了条件」を書く。
- 作業を始める人は、自分をAssigneeに設定する
- 大きすぎるIssueは、途中で分割してよい
- 詰まった場合はIssueにコメントし、必要に応じて `blocked` ラベルを付ける

## ラベル

Issueは必要に応じて、以下のラベルを設定する。

* `bug`: 不具合や意図しない動作の修正
* `feature`: 新機能の追加や既存機能の改善
* `documentation`: ドキュメントの追加と修正
* `refactor`: 外部の動作を変えないコードの整理や内部構造の改善
* `test`: テストの追加と修正
* `chore`: 開発環境、設定、依存関係、CIなどの保守作業
* `blocked`: 他のIssueや外部要因により、現在作業を進められない状態

## ブランチ運用

`main` ブランチへ直接pushしない。

作業するときは、`main` から作業用ブランチを作成する。

```bash
git switch main
git pull
git switch -c <type>/<issue-number>-<summary>
```

ブランチ名は以下の形式にする。

```text
<type>/<issue-number>-<summary>
```

ブランチ名の例。
以下は例なので、実際のIssue番号と作業内容に合わせて変更する。

```text
docs/2-add-issue-template
feature/6-init-go-module
feature/14-health-endpoint
fix/15-submit-validation
chore/23-docker-compose
```

`type` は主に以下を使う。

```text
fix
feature
docs
refactor
test
chore
```

ブランチ名の `type` は、Issueラベルとおおよそ対応させる。

| ブランチ名のtype | Issueラベル | 使う場面 |
|---|---|---|
| `fix` | `bug` | 不具合や意図しない動作の修正 |
| `feature` | `feature` | 新機能の追加や既存機能の改善 |
| `docs` | `documentation` | ドキュメントの追加と修正 |
| `refactor` | `refactor` | 外部の動作を変えないコード整理 |
| `test` | `test` | テストの追加と修正 |
| `chore` | `chore` | 開発環境、設定、依存関係、CIなどの保守作業 |

## Pull Requestの運用

- Pull Requestは対応するIssueと紐づける
- PR本文に `Closes #Issue番号` または `Refs #Issue番号` を書く
- マージされたらIssueを閉じてよい場合は `Closes`
- マージ後に追加確認が必要な場合は `Refs`
- PRには「概要」「変更内容」「動作確認」を書く
- レビューを受けてから `main` にマージする

PR本文の例:

````md
## 概要

Goバックエンドの初期構成を追加しました。

## 関連Issue

Closes #4

## 変更内容

* `backend/` ディレクトリを追加
* `backend/go.mod` を追加
* 最小限のGoファイルを追加

## 動作確認

* [x] ローカル環境で動作を確認した
* [x] 既存機能に影響がないことを確認した
* [x] 必要なテストを追加し、実行した

具体的には、`cd backend` して `go test ./...` が成功することを確認しました。

## 補足

`/health` などのAPIエンドポイントは別Issueで実装します。
````

## コミットメッセージ

コミットメッセージは、変更内容が分かる短い文にする。
英語じゃなくて、日本語

例:

```text
Issueテンプレートを追加
コンテスト一覧取得のAPIの実装
MVPのドキュメントを更新
```


## 迷ったとき

IssueやPull Requestにコメントして相談する。
もしくは、開発用Discordサーバーで相談する。
仕様や方針が曖昧なまま、大きな実装を進めない。
