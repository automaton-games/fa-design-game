import "./Header.css"
import Button from "../Button/button";

export default function Header() {
  return (
    <div className="header">
      <a className="header__title" href="#">FA Design Game</a>
      <div className="header__nav">
        <a href="#">Top</a>
        <a href="#">遊び方</a>
        <a href="#">コンテスト</a>
        <Button className="tmp">ログイン</Button>
        <Button className="tmp" variant="sub">新規登録</Button>
      </div>
    </div>
  )
  
}