import "./Footer.css"

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer__column">
        <p className="footer__heading">サイト</p>
        <a>Top</a>
        <a>遊び方</a>
        <a>コンテスト</a>
      </div>
      <div className="footer__column">
        <p className="footer__heading">アカウント</p>
        <a>ログイン</a>
        <a>新規登録</a>
        <a>マイページ</a>
      </div>
      <div className="footer__column">
        <p className="footer__heading">サポート</p>
        <a>お問い合わせ</a>
        <a>利用規約</a>
        <a>プライバシーポリシー</a>
      </div>
    </div>
  )
}
