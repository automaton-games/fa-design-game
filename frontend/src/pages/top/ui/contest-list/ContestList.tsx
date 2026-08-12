import Section from "../section/Section"
import "./ContestList.css"

type Contest = {slug: string, title: string, level: string}

const contestsData: Contest[] = [ // 実データが無いため仮置き
  {slug: "fdg003", title: "FDG 003", level: "初級"},
  {slug: "fdg002", title: "FDG 002", level: "中級"},
  {slug: "fdg001", title: "FDG 001", level: "入門"},
  {slug: "practice002", title: "Practice 002", level: "入門"},
  {slug: "practice001", title: "Practice 001", level: "入門"},
]

const levelClassMap: Record<string, string> = {
  "入門": "contest__level--intro",
  "初級": "contest__level--beginner",
  "中級": "contest__level--intermediate",
  "上級": "contest__level--advanced",
}

export default function ContestList() {
  return (
    <Section title="コンテスト">
      {contestsData.map((contest) => (
        <div className="contest__item" key={contest.slug}>
          <a href="#">{contest.title}</a>
          <div className={`contest__level ${levelClassMap[contest.level] ?? ""}`}>
            {contest.level}
          </div>
        </div>
      ))}
    </Section>
  )
}
