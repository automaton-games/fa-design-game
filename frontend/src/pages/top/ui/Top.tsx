import { Header, Footer } from "@/shared/ui";
import ContestList from "./contest-list/ContestList";
import RankingBoard from "./ranking-board/RankingBoard";
import NewsList from "./news-list/NewsList";
import Hero from "./hero/Hero";

import "./Top.css"


export default function Top() {
  return (
    <>
      <Header />
      <main className="page__content">
        <Hero />
        <div className="top__container">
          <ContestList />
          <RankingBoard />
          <NewsList />
        </div>
      </main>
      <Footer />
    </>
  )
}
