import { SiteText } from "@/components/site-copy";
import Link from "next/link";
import { Arrow } from "@/components/icons";
import { CalendarArt } from "@/components/calendar-art";
export const metadata = {
    title: "디자인 스튜디오",
    description: "브랜드, 그래픽·편집, 콘텐츠 디자인. 생각에 형태를 만드는 아더댄웍스 스튜디오.",
    alternates: { canonical: "/studio" },
};
export default function StudioPage() {
    return (<main id="main" tabIndex={-1} className="wrap page-content">
      <header className="page-heading">
        <span className="eyebrow"><SiteText>{"STUDIO / ANOTHER PERSPECTIVE"}</SiteText></span>
        <h1><SiteText>{"생각에 형태를,"}</SiteText><br /><SiteText>{"브랜드에 다름을."}</SiteText></h1>
        <p><SiteText>{"하고 싶은 이야기를 먼저 듣습니다."}</SiteText><br /><SiteText>{"그 이야기에 어울리는 시각 언어를 함께 찾아갑니다."}</SiteText></p>
      </header>
      <div className="studio-grid">
        <div className="detail-copy">
          <span className="eyebrow"><SiteText>{"DESIGN, WITH A DIFFERENT POINT OF VIEW."}</SiteText></span>
          <h2><SiteText>{"무엇을 만들지보다,"}</SiteText><br /><SiteText>{"무엇을 전할지부터."}</SiteText></h2>
          <p><SiteText>{"브랜드의 작은 단서부터 한 권의 책, 하나의 콘텐츠까지. 필요한 매체와 표현을 함께 고민하는 디자인 스튜디오입니다."}</SiteText></p>
          <Link href="/apply?type=studio" className="back-link"><SiteText>{"프로젝트 문의 안내 "}</SiteText><Arrow diagonal/>
          </Link>
        </div>
        <CalendarArt />
      </div>
      <div className="service-grid">
        {[
            {
                n: "01",
                title: "브랜드 디자인",
                text: "브랜드가 전하고 싶은 이야기와 시각적인 방향을 함께 정리합니다.",
            },
            {
                n: "02",
                title: "그래픽 · 편집",
                text: "정보와 이야기가 자연스럽게 읽히도록 지면과 시각 요소를 고민합니다.",
            },
            {
                n: "03",
                title: "콘텐츠 디자인",
                text: "브랜드의 시선이 다양한 콘텐츠 안에서도 이어지도록 디자인합니다.",
            },
        ].map((s) => (<section className="service-card" key={s.n}>
            <span className="eyebrow"><SiteText>{"SERVICE "}</SiteText><SiteText>{s.n}</SiteText></span>
            <h2><SiteText>{s.title}</SiteText></h2>
            <p><SiteText>{s.text}</SiteText></p>
          </section>))}
      </div>
      <div className="page-cta">
        <div>
          <h2><SiteText>{"아직 아이디어뿐이어도 좋아요."}</SiteText></h2>
          <p><SiteText>{"프로젝트 범위와 일정\u00B7견적은 개별 확인이 필요합니다."}</SiteText></p>
        </div>
        <Link className="button" href="/apply?type=studio"><SiteText>{"함께할 이야기 남기기 "}</SiteText><Arrow diagonal/>
        </Link>
      </div>
    </main>);
}
