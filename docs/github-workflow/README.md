# GitHubを使った開発手順

この手順書は、GitHubでのチーム開発が初めての人が、Issueを選ぶところからPull Requestのマージ、Projectのステータス更新までを一人で進められるようにするためのものです。

> 初めて読む方は、[01 はじめに](01-introduction.md) から順にお読みください。

## 目次（読む順）

1. [はじめに](01-introduction.md)：この手順書の目的、読み方、必要な準備
2. [GitとGitHubの基礎](02-concepts.md)：開発の全体像と基礎
3. [Issueを選ぶ](03-choose-issue.md)：作業の単位であるIssueを探し、読む
4. [自分をAssignする](04-assign-yourself.md)：担当者として名乗りを上げる
5. [作業ブランチを作る](05-create-branch.md)：mainから分岐して作業場所を確保する
6. [コミットする](06-commit.md)：変更を記録する
7. [pushする](07-push.md)：変更をリモートに送る
8. [Pull Requestを作る](08-create-pull-request.md)：変更をレビューに出す
9. [レビューを受けてマージする](09-review-and-merge.md)：指摘に対応し、mainに取り込む
10. [Projectのステータスを動かす](10-update-project-status.md)：進捗をボードに反映する

## 関連

- [CONTRIBUTING.md](../CONTRIBUTING.md)：開発運用の規則をまとめた参照用ドキュメント。
  各ページから規則の詳細へリンクしています。
- [開発環境ガイド](../dev-setup.md)：ローカル環境のセットアップ
- [Ginの使い方](../use-gin.md)：バックエンドの実装を始めるときの参考

## つまずいたとき

手順どおりに進まないときは、該当するIssueかPull Requestにコメントしてください。
仕様や方針が曖昧なまま大きな作業を進めず、早めに相談します。
