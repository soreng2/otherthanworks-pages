import Link from "next/link";
import { Arrow } from "@/components/icons";
import { CalendarArt } from "@/components/calendar-art";

export const metadata = {
  title: "디자인 스튜디오",
  description:
    "브랜드, 그래픽·편집, 콘텐츠 디자인. 생각에 형태를 만드는 아더댄웍스 스튜디오.",
  alternates: { canonical: "/studio" },
};
export default function StudioPage() {
  return (
    <main id="main" tabIndex={-1} className="wrap page-content">
      <header className="page-heading">
        <span className="eyebrow">STUDIO / ANOTHER PERSPECTIVE</span>
        <h1>
          생각에 형태를,
          <br />
          브랜드에 다름을.
        </h1>
        <p>
          하고 싶은 이야기를 먼저 듣습니다.
          <br />그 이야기에 어울리는 시각 언어를 함께 찾아갑니다.
        </p>
      </header>
      <div className="studio-grid">
        <div className="detail-copy">
          <span className="eyebrow">
            DESIGN, WITH A DIFFERENT POINT OF VIEW.
          </span>
          <h2>
            무엇을 만들지보다,
            <br />
            무엇을 전할지부터.
          </h2>
          <p>
            브랜드의 작은 단서부터 한 권의 책, 하나의 콘텐츠까지. 필요한 매체와
            표현을 함께 고민하는 디자인 스튜디오입니다.
          </p>
          <Link href="/apply?type=studio" className="back-link">
            프로젝트 문의 안내 <Arrow diagonal />
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
        ].map((s) => (
          <section className="service-card" key={s.n}>
            <span className="eyebrow">SERVICE {s.n}</span>
            <h2>{s.title}</h2>
            <p>{s.text}</p>
          </section>
        ))}
      </div>
      <div className="page-cta">
        <div>
          <h2>아직 아이디어뿐이어도 좋아요.</h2>
          <p>프로젝트 범위와 일정·견적은 개별 확인이 필요합니다.</p>
        </div>
        <Link className="button" href="/apply?type=studio">
          함께할 이야기 남기기 <Arrow diagonal />
        </Link>
      </div>
    </main>
  );
}
