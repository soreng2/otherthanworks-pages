import { Asterisk, Arrow } from "@/components/icons";
import { site } from "@/content/site";

export const metadata = {
  title: "아더댄웍스 소개",
  description:
    "배우고 만들고 나누는 곳. 클래스와 디자인 작업을 연결하는 아더댄웍스의 이야기.",
  alternates: { canonical: "/about" },
};
export default function AboutPage() {
  return (
    <main id="main" tabIndex={-1} className="wrap page-content">
      <header className="page-heading">
        <span className="eyebrow">ABOUT / OTHER THAN WORKS</span>
        <h1>
          다른 일에서 만나는,
          <br />
          다음의 나.
        </h1>
        <p>배우고, 만들고, 나누는 아더댄웍스.</p>
      </header>
      <div className="about-hero">
        <section>
          <h2>
            꼭 하던 방식대로
            <br />할 필요는 없으니까.
          </h2>
          <p>
            관심은 있지만 미뤄둔 일, 혼자서는 시작하기 어려웠던 작업.
            <br />
            아더댄웍스는 그런 작은 호기심에서 출발합니다.
          </p>
          <p>
            클래스에서는 나만의 작업을 탐색하고,
            <br />
            스튜디오에서는 생각을 시각적인 형태로 만듭니다.
            <br />
            배움과 작업이 자연스럽게 이어지는 공간을 지향합니다.
          </p>
          <a
            href={site.instagram}
            className="back-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram에서 만나기 <Arrow diagonal />
            <span className="sr-only">(새 탭)</span>
          </a>
        </section>
        <div className="about-motif" aria-hidden="true">
          <Asterisk />
          <strong>
            OTHER WAYS.
            <br />
            NEW POSSIBILITIES.
          </strong>
          <span>LEARN. MAKE. GO YOUR OWN WAY.</span>
        </div>
      </div>
      <section className="section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">FROM THE ARCHIVE</span>
            <h2>작은 시작을 위한 자료.</h2>
            <p>기존 AI 파일럿 수업의 준비 자료도 읽어볼 수 있어요.</p>
          </div>
        </div>
        <div className="resource-links">
          <a className="resource-link" href="/legacy/session0/index.html">
            AI 캐릭터 시트 만들기 <Arrow diagonal />
          </a>
          <a
            className="resource-link"
            href="/legacy/ai-workflow/session0/index.html"
          >
            AI 워크플로우 만들기 <Arrow diagonal />
          </a>
        </div>
      </section>
    </main>
  );
}
