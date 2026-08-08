import type { ReactNode } from "react";
import "./Button.css";

type ButtonProps = {
  children: ReactNode;
  className: string;
  variant?: "primary" | "sub";
  icon?: string;
  onClick?: () => void;
};

export default function Button({ children, className ,variant = "primary" ,icon ,onClick }: ButtonProps) {
  return (
    <button
      type="button"
      className={`button button--${variant} ${className}`}
      onClick={onClick}
    >
      {children}
      {icon && (
        <span className="button__arrow">
          <span className="material-symbols-outlined">{icon}</span>
        </span>
      )}
    </button>
  );
}