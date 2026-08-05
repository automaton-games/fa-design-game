import type { ReactNode } from "react";
import "./Card.css"

type CardProps = {
  title: string,
  children: ReactNode,
}

export default function Card({title, children}: CardProps) {
  return (
    <div className="card">
      <p className="card__title">{title}</p> 
      <p className="card__text">{children}</p> 
    </div>
  );
}