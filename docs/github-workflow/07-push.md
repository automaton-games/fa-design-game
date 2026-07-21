# pushする

> [← 目次に戻る](README.md) | [前: 06 コミットする](06-commit.md) | [次: 08 Pull Requestを作る](08-create-pull-request.md)

## このページで扱うこと

**push** は、コミットした変更をリモート（GitHub）へ送る操作です。
このページでは、コミットをpushする手順と、そのために必要な設定を説明します。

## なぜpushをするのか

pushは、手元のコミットをGitHubへ送り、チームに共有するためのものです。
pushしないと、変更は自分のパソコンにしかなく、ほかのメンバーやPull Requestからは見えません。

## pushする

コミットを **リモート**（GitHub上のリポジトリ）へ送ります。
手元のパソコンにあるものはローカルです。
pushの操作に出てくる2つの言葉を、先に押さえます。

- **origin**：このプロジェクトのリモートについた名前。
  cloneすると自動で付きます。
  `origin` は「このプロジェクトのGitHub上のリポジトリ」を指します。
- **アップストリーム**：ローカルのブランチとoriginのブランチの対応づけ。
  「このブランチはoriginのどのブランチに送るか」を決める設定です。
  新しいブランチには最初この対応づけがありません。

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

まず `git remote -v` で、originが指す先を確認します。

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
[08 Pull Requestを作る](08-create-pull-request.md) へ進んでください。

## 関連

- [06 コミットする](06-commit.md)：pushの前に変更をコミットする
- [CONTRIBUTING.md - ブランチ運用](../CONTRIBUTING.md#ブランチ運用)
