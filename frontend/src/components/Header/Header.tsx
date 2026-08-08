import "./Header.css"
import Button from "../Button/Button";

export default function Header() {
  return (
    <header className="header">
      <a className="header__title" href="#">FA Design Game</a>
      <nav className="header__nav">
        <a href="#">Top</a>
        <a href="#">遊び方</a>
        <a href="#">コンテスト</a>
        <Button icon="login">ログイン</Button>
        <Button variant="sub">新規登録</Button>
      </nav>
    </header>
  )
}
