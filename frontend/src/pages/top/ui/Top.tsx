import Hero from "./hero/Hero";
import Contests from "./contests/Contests";
import Ranking from "./ranking/Ranking";
import News from "./news/News";
import "./Top.css";

export default function Top() {
  return (
    <>
      <Hero />
      <div className="top__container">
        <Contests />
        <Ranking />
        <News />
      </div>
    </>
  );
}
