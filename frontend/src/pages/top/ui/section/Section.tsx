import type { ReactNode } from "react";
import { Button } from "@/shared/ui"
import "./Section.css"

type SectionProps = {
  title: string,
  children: ReactNode,
}

// トップページの「コンテスト」「ランキング」「お知らせ」で共通の外枠
export default function Section({title, children}: SectionProps) {
  return (
    <div className="section">
      <h2 className="section__title">{title}</h2>
      <div className="section__list">{children}</div>
      <div className="section__more">
        <Button href="#" variant="sub" icon="arrow_forward">もっと見る</Button>
      </div>
    </div>
  )
}
