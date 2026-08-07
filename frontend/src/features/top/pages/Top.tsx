import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import Hero from "../components/Hero/Hero";
import Contests from "../components/Contests/Contests";
import Ranking from "../components/Ranking/Ranking";
import News from "../components/News/News";

import "./Top.css"


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
      <Footer></Footer>
    </>
  )
}