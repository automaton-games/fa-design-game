import "./Contests.css"
import Button from "../../../../components/Button/button"
type Contest = {slug: string, title: string, level: string}
const contestsData: Contest[] = [ // 実データが無いため仮置き
  {slug: "fdg003", title: "FDG 003", level: "初級"},
  {slug: "fdg002", title: "FDG 002", level: "中級"},
  {slug: "fdg001", title: "FDG 001", level: "入門"},
  {slug: "practice002", title: "Practice 002", level: "入門"},
  {slug: "practice001", title: "Practice 001", level: "入門"},
]


export default function Contests() {
  return (
      <div>
        <p>コンテスト</p>
        <div className="contest__list">
          {contestsData.map((contest) => (
            <div className="contest__detail" key={contest.slug}>
              <a>{contest.title}</a>
              <div className="contest__level">{contest.level}</div>
            </div> 
          ))}
        </div>
        <Button>もっと見る</Button>
      </div>
  ) 
}