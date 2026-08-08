import "@/shared/ui/section/Section.css"
import "./NewsList.css"
import { Button } from "@/shared/ui/button"
import { newsData } from "@/entities/news"

export default function NewsList() {
  return (
    <div className="section">
      <h2 className="section__title">お知らせ</h2>
      <div className="section__list">
        {newsData.map((news) => (
          <div className="news__item" key={news.id}>
            <a href="#" className="news__title">{news.title}</a>
            <div className="news__text">{news.text}</div>
          </div>
        ))}
      </div>
      <div className="section__more">
        <Button variant="sub" icon="arrow_forward">もっと見る</Button>
      </div>
    </div>
  )
}
