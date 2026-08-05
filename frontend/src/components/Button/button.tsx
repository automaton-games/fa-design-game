import type { ReactNode } from "react";
import "./Button.css";

type ButtonProps = {
  children: ReactNode;
  className: string;
  variant?: "primary" | "sub";
  onClick?: () => void;
};

export default function Button({ children, className ,variant = "primary" ,onClick }: ButtonProps) {
  return (
    <button
      type="button"
      className={`button button--${variant} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}