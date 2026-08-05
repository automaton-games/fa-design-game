import Button from "../../../../components/Button/button"
import Card from "../../../../components/Card/card"
import "./Hero.css"

export default function Hero() {
  return (
    <>
      <div className="hero__upside">
        <div className="hero__main">
          <p className="hero__headline">有限オートマトンを設計して、すべての問題をクリアしよう</p> 
          <p className="hero__subtext">FA Design Gameは、有限オートマトン(DFA)を設計して様々な課題を解く、新しい形式の競技プログラミングです。</p> 
          <div className="hero__tutorials">
            <Button className="button__automaton">有限オートマトンとは？</Button>
            <Button variant="sub" className="button__tutorial">チュートリアル</Button>
          </div>
        </div>
        <div className="hero__picture">
         <img src="/automaton-image.svg" alt="オートマトンのイメージ図" /> 
        </div>
      </div>
      <div className="hero__explanation">
        <Card title="FAを設計する">状態と遷移を自由に設計して、与えられた仕事を満たすオートマトンを作ろう</Card> 
        <Card title="JSONで提出">オートマトンをJSON形式で記述して提出します。サイト内エディタでの記述かファイルの提出が可能です。</Card> 
        <Card title="自動判定">提出すると、テストケースに基づいて自動で判定。判例も表示されるので改善を繰り返せます。</Card> 
        <Card title="実力を競おう">コンテスト形式の課題に挑戦して、クリア数や回答時間を競おう</Card> 
      </div>
    </>
  )
}