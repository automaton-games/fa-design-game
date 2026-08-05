import type { ReactNode } from "react";
import "./Button.css";

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
};

export default function Button({ children, onClick }: ButtonProps) {
  return (
    <button
      type="button"
      className="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
}