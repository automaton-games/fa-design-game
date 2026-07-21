# 変更をコミットしてpushする

> [← 目次に戻る](README.md) | [前: 05 作業ブランチを作る](05-create-branch.md) | [次: 07 Pull Requestを作る](07-create-pull-request.md)

## このページで扱うこと

**コミット** は変更を1つのまとまりとして記録する操作、**push** はそのコミットを共有のリモートへ送る操作です。
このページでは、変更をコミットし、リモートへpushする手順を説明します。

## なぜコミットとpushをするのか

コミットは、変更を単位ごとに記録し、あとで見直したり元に戻したりできるようにするためのものです。
ファイルを保存しただけでは履歴が残らないため、記録にはコミットを使います。

pushは、手元のコミットをGitHubへ送り、チームに共有するためのものです。
pushしないと、変更は自分のパソコンにしかなく、ほかのメンバーやPull Requestからは見えません。

## 変更する

ブランチ上でファイルを編集します。
編集する内容はIssueの「やること」に沿います。

## コミットする

変更をステージに追加し、コミットします。

```bash
git add <ファイル名>
git commit
```

`git add` には、変更したファイルを指定します。
まとめて追加するときは `git add .` も使えますが、意図しないファイルを混入しやすいため、ファイルを指定する方が安全です。

コミットメッセージは、変更内容が分かる短い文を日本語で書きます。
例をいくつか示します。

```text
Issueテンプレートを追加
コンテスト一覧取得のAPIを実装
MVPのドキュメントを更新
```

メッセージの書き方は [CONTRIBUTING.md の「コミットメッセージ」](../CONTRIBUTING.md#コミットメッセージ) を参照してください。

コミットの前に、変更を小さく保つことを意識します。
1つのコミットに詰め込みすぎると、あとのレビューが難しくなります。

## pushする

コミットを **リモート**（GitHub上のリポジトリ）へ送ります。手元のパソコンにあるものはローカルです。
pushの操作に出てくる2つの言葉を、先に押さえます。

- **origin**：このプロジェクトのリモートについた名前。cloneすると自動で付きます。`origin` は「このプロジェクトのGitHub上のリポジトリ」を指します。
- **アップストリーム**：ローカルのブランチとoriginのブランチの対応づけ。「このブランチはoriginのどのブランチに送るか」を決める設定です。新しいブランチには最初この対応づけがありません。

ブランチを初めてpushするときは、`-u` を付けて実行します。

```bash
git push -u origin HEAD
```

各部分の意味は次のとおりです。

- `origin`：送り先のリモート
- `HEAD`：いまいるブランチ
- `-u`：アップストリームを設定する

`-u` で対応づけを一度設定すれば、次からは `git push` だけで送れます。

実際の様子を、このドキュメントを作っているブランチ `docs/13-add-github-workflow` で見ます。

まず `git remote -v` で、origin が指す先を確認します。

```text
origin	git@github.com:automaton-games/fa-design-game.git (fetch)
origin	git@github.com:automaton-games/fa-design-game.git (push)
```

一方、新しいブランチにはまだアップストリームがありません。
`git branch -vv` で確認すると、いまのブランチ（`*` 印）に `[origin/...]` が付いていないことが分かります。

```text
* docs/13-add-github-workflow 868f42c ブランチのtype一覧表を追加
  main 651cb46 [origin/main] Merge pull request #51 ...
```

`main` には `[origin/main]` が付いているのに対し、新しいブランチには何も付いていません。

この状態でpushします。

```bash
git push -u origin HEAD
```

pushしたあと、もう一度 `git branch -vv` を見ます。

```text
* docs/13-add-github-workflow 868f42c [origin/docs/13-add-github-workflow] ブランチのtype一覧表を追加
  main 651cb46 [origin/main] Merge pull request #51 ...
```

`docs/13-add-github-workflow` に `[origin/docs/13-add-github-workflow]` が付きました。
この `[origin/...]` が付いたことが、アップストリームが設定されたことの証拠です。

> [!TIP]
> 毎回 `-u` を付けるのが面倒なら、次の設定を一度だけ行っておくと、新しいブランチでのpushが自動で対応づけまで行うようになります（Git 2.37 以降）。
> ```bash
> git config --global push.autoSetupRemote true
> ```
> この設定をしておけば、最初のpushでも `git push` だけで済みます。

## 次のステップ

pushすると、GitHubにPull Requestを作る案内が出ます。
[07 Pull Requestを作る](07-create-pull-request.md) へ進んでください。

## 関連

- [CONTRIBUTING.md - コミットメッセージ](../CONTRIBUTING.md#コミットメッセージ)
- [CONTRIBUTING.md - ブランチ運用](../CONTRIBUTING.md#ブランチ運用)
