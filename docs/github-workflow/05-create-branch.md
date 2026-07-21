# 作業ブランチを作る

> [← 目次に戻る](README.md) | [前: 04 自分をAssignする](04-assign-yourself.md) | [次: 06 変更をコミットしてpushする](06-commit-and-push.md)

## このページで扱うこと

**ブランチ** は、自分の作業をほかの人の作業から切り離すための独立した作業場所です。
このページでは、mainから作業ブランチを作る手順を説明します。

## なぜブランチを分けるのか

このリポジトリでは、mainブランチに直接pushしません。
理由は、未完成の変更がmainに入ると、全員の作業の前提が崩れるからです。
代わりに、mainから作業ブランチを分岐させ、完成してからmainに戻します。
この進め方をGitHub Flowと呼びます。

## mainを最新にする

ブランチを作る前に、手元のmainを最新にします。
ターミナルでリポジトリのディレクトリに移動し、次を実行します。

```bash
git switch main
git pull
```

これで、ほかのメンバーの変更を取り込んだ最新のmainになります。

## 作業ブランチを作る

mainから新しいブランチを作り、同時に切り替えます。

```bash
git switch -c <type>/<issue番号>-<要約>
```

今回のIssue #13を例にすると、次のようになります。

```bash
git switch -c docs/13-add-github-workflow
```

ブランチ名の付け方は [CONTRIBUTING.md の「ブランチ運用」](../CONTRIBUTING.md#ブランチ運用) で規定しています。
`type` はIssueのラベルに合わせて選びます（`docs`、`feature`、`fix` など）。

## いまのブランチを確認する

いまどのブランチにいるか確認します。

```bash
git branch --show-current
```

先ほど作ったブランチ名が表示されれば、作業を始められます。

## 次のステップ

ブランチができたら、ファイルを編集して変更を記録します。
[06 変更をコミットしてpushする](06-commit-and-push.md) へ進んでください。

## 関連

- [CONTRIBUTING.md - ブランチ運用](../CONTRIBUTING.md#ブランチ運用)
