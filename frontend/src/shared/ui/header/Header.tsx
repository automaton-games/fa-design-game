import { useEffect, useState } from "react";
import "./Header.css"
import Button from "../button/Button";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 開いているメニューはEscapeで閉じられるようにする
  useEffect(() => {
    if (!isMenuOpen) return;
    const closeOnEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isMenuOpen]);

  return (
    <header className="header">
      <a className="header__title" href="#">FA Design Game</a>
      <button
        type="button"
        className="header__menu-button"
        aria-label={isMenuOpen ? "メニューを閉じる" : "メニューを開く"}
        aria-expanded={isMenuOpen}
        aria-controls="header-nav"
        onClick={() => setIsMenuOpen((open) => !open)}
      >
        <span className="material-symbols-outlined">{isMenuOpen ? "close" : "menu"}</span>
      </button>
      <nav
        id="header-nav"
        className={`header__nav${isMenuOpen ? " header__nav--open" : ""}`}
      >
        <a className="header__nav-link" href="#" onClick={() => setIsMenuOpen(false)}>Top</a>
        <a className="header__nav-link" href="#" onClick={() => setIsMenuOpen(false)}>遊び方</a>
        <a className="header__nav-link" href="#" onClick={() => setIsMenuOpen(false)}>コンテスト</a>
        <Button href="#" icon="login" onClick={() => setIsMenuOpen(false)}>ログイン</Button>
        <Button href="#" variant="sub" onClick={() => setIsMenuOpen(false)}>新規登録</Button>
      </nav>
    </header>
  )
}
