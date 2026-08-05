import "./Header.css"
import Button from "../Button/button";

export default function Header() {
  return (
    <div className="header">
      <a className="header__title">FA Design Game</a>
      <div className="header__nav">
        <a>Top</a>
        <a>遊び方</a>
        <a>コンテスト</a>
        <a>ログイン</a>
        <Button className="tmp">新規登録</Button>
      </div>
    </div>
  )
  
}