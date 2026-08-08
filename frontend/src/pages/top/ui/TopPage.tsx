import { Header } from "@/widgets/header";
import { Footer } from "@/widgets/footer";
import { ContestList } from "@/widgets/contest-list";
import { RankingBoard } from "@/widgets/ranking-board";
import { NewsList } from "@/widgets/news-list";
import Hero from "./Hero/Hero";

import "./TopPage.css"


export default function TopPage() {
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
