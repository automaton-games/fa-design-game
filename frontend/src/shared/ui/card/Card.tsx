import type { ReactNode } from "react";
import "./Card.css"

type CardProps = {
  title: string,
  icon?: string,
  children: ReactNode,
}

export default function Card({title, icon, children}: CardProps) {
  return (
    <div className="card">
      <h3 className="card__title">
        {icon && <span className="material-symbols-outlined">{icon}</span>}
        {title}
      </h3>
      <p className="card__text">{children}</p>
    </div>
  );
}