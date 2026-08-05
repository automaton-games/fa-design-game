import Button from "../../../../components/Button/button"

type News = {id: number, title: string, text: string}
const newsData: News[] = [ // レート上位のUserを高い順で並べたリスト(実データが無いため仮置き)
  {id: 4, title: "FDG 003について", text: "FDG 003を開催いたします。今回のテーマは「初級者でも挑戦しやすいオートマトン」で、これまでのコンテストよりも参加のハードルを下げた内容となっています。開催期間は開催告知日から2週間を予定しており、期間中はいつでもエントリー・提出が可能です。評価は他の参加者による相互レビューと、運営による審査を組み合わせた形式を採用します。上位入賞者には特典を用意しています。ルールや提出方法の詳細は、コンテストページの概要欄をご確認ください。過去のコンテスト(FDG 001・FDG 002)にご参加いただいた方も、初めての方も、奮ってご参加ください。"}, // ここでのidはuserの識別子を表している。今後どのような運用にするかは要議論。一時的にこのようにしておく。
  {id: 3, title: "サービスメンテナンスのお知らせ", text: "2026年8月10日 2:00〜4:00の間、システムメンテナンスを実施します。"},
  {id: 2, title: "新機能リリースのお知らせ", text: "新しいランキング機能を追加しました。ぜひご利用ください。"},
]

export default function News() {
  return (
    <div>
      <p>お知らせ</p> 
      <div className="news__list">
        {newsData.map((news) => (
          <div className="news__detail" key={news.id}>
            <p>{news.title}</p>
            <div className="news__text">{news.text}</div>
          </div> 
        ))}
      </div>
      <Button>もっと見る</Button>
    </div>
  ) 
}
