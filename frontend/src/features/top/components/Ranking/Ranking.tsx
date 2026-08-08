import "../Section.css"
import "./Ranking.css"
import Button from "../../../../components/Button/Button"

type User = {id: number, name: string, rate: number}
const topPlayersData: User[] = [ // レート上位のUserを高い順で並べたリスト(実データが無いため仮置き)
  {id: 12, name: "SoraByte", rate: 2184}, // ここでのidはuserの識別子を表している。今後どのような運用にするかは要議論。一時的にこのようにしておく。
  {id: 204, name: "NovaQuartz", rate: 2051},
  {id: 235, name: "PixelRonin", rate: 1987},
  {id: 435, name: "KaeruHex", rate: 1863},
  {id: 51, name: "YumeCircuit", rate: 1742},
  {id: 49, name: "TsukiVector", rate: 1605},
  {id: 57, name: "GhostAmber", rate: 1489},
  {id: 8, name: "RyuFrame", rate: 1320}
]

export default function Ranking() {
  return (
      <div className="section">
        <h2 className="section__title">ランキング</h2>
        <div className="section__list">
          {topPlayersData.map((user, rank) => (
            <div className="ranking__item" key={user.id}>
              <p>{rank+1}.  {user.name}</p>
              <div className="ranking__rate">{user.rate}</div>
            </div>
          ))}
        </div>
        <div className="section__more">
          <Button variant="sub" icon="arrow_forward">もっと見る</Button>
        </div>
      </div>
  )
}
