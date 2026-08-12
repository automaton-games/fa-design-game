import type { ReactNode } from "react";
import "./Button.css";

type ButtonProps = {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "sub";
  icon?: string;
  /* 指定するとページ遷移用の <a> として描画される。遷移ならhref、その場で処理を実行するならonClick */
  href?: string;
  onClick?: () => void;
};

export default function Button({ children, className, variant = "primary", icon, href, onClick }: ButtonProps) {
  const classNames = `button button--${variant}${className ? ` ${className}` : ""}`;
  const content = (
    <>
      {children}
      {icon && (
        <span className="button__arrow">
          <span className="material-symbols-outlined">{icon}</span>
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <a className={classNames} href={href} onClick={onClick}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" className={classNames} onClick={onClick}>
      {content}
    </button>
  );
}
