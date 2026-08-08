import "./Footer.css"

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__column">
        <h3 className="footer__heading">サイト</h3>
        <a href="#">Top</a>
        <a href="#">遊び方</a>
        <a href="#">コンテスト</a>
      </div>
      <div className="footer__column">
        <h3 className="footer__heading">アカウント</h3>
        <a href="#">ログイン</a>
        <a href="#">新規登録</a>
        <a href="#">マイページ</a>
      </div>
      <div className="footer__column">
        <h3 className="footer__heading">サポート</h3>
        <a href="#">お問い合わせ</a>
        <a href="#">利用規約</a>
        <a href="#">プライバシーポリシー</a>
      </div>
    </footer>
  )
}
