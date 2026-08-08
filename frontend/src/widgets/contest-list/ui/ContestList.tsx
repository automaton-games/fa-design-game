import "@/shared/ui/section/Section.css"
import "./ContestList.css"
import { Button } from "@/shared/ui/button"
import { contestsData } from "@/entities/contest"

const levelClassMap: Record<string, string> = {
  "入門": "contest__level--intro",
  "初級": "contest__level--beginner",
  "中級": "contest__level--intermediate",
  "上級": "contest__level--advanced",
}

export default function ContestList() {
  return (
      <div className="section">
        <h2 className="section__title">コンテスト</h2>
        <div className="section__list">
          {contestsData.map((contest) => (
            <div className="contest__item" key={contest.slug}>
              <a href="#">{contest.title}</a>
              <div className={`contest__level ${levelClassMap[contest.level] ?? ""}`}>
                {contest.level}
              </div>
            </div>
          ))}
        </div>
        <div className="section__more">
          <Button variant="sub" icon="arrow_forward">もっと見る</Button>
        </div>
      </div>
  )
}
