import Header from "../../../components/Header/header";
import Hero from "../components/Hero/hero";
import Contests from "../components/Contests/contests";
import Ranking from "../components/Ranking/ranking";
import News from "../components/News/news";
import "./Page.css"


export default function Top() {
  return (
    <>
      <Header ></Header>
      <Hero></Hero>
      <div className="top__container">
        <Contests></Contests>
        <Ranking></Ranking>
        <News></News>
      </div>
    </>
  ) 
}