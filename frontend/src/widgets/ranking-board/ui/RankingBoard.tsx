import "@/shared/ui/section/Section.css"
import "./RankingBoard.css"
import { Button } from "@/shared/ui/button"
import { topPlayersData } from "@/entities/user"

export default function RankingBoard() {
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
