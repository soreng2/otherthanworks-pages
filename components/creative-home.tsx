import Link from "next/link";
import { site } from "@/content/site";
import { CourseList } from "./course-list";
import { ReviewGallery } from "./review-gallery";
import { InstagramFeed } from "./instagram-feed";
import { Reveal } from "./reveal";
import { Asterisk } from "./icons";
import styles from "./creative-home.module.css";

export function CreativeHome() {
  return <main id="main" tabIndex={-1} className={styles.home}>
    <section className={styles.hero}>
      <div className={styles.kicker}><span>OTHER THAN WORKS</span><span>배우고, 만들고, 나누는 곳.</span><span>CLASS + DESIGN STUDIO</span></div>
      <div className={styles.heroGrid}>
        <div><span className={styles.smallLabel}>좋아하는 딴짓이 나의 일이 되는 곳.</span>
          <h1>딴짓에도<br /><span className={styles.underlined}>다음</span>이 있다<span className={styles.period}>.</span></h1>
          <p className={styles.heroText}>아이패드 드로잉부터 콘텐츠·포트폴리오·그림책 제작까지.<br />좋아하는 일을 이어가는 창작 클래스와 디자인 스튜디오.</p>
          <div className={styles.actions}><Link className={styles.darkButton} href="#class-board">나의 클래스 찾기 ↗</Link><Link className={styles.plainLink} href="#find-your-class">어떤 수업이 맞을까요? ↓</Link></div>
        </div>
        <div className={styles.heroBoard}>
          <div className={styles.note}><span className={styles.smallLabel}>A NOTE FOR YOUR NEXT CHAPTER</span><strong>잘하는 일도,<br />처음 하는 일도.</strong><p>일단, 한 장부터 시작해 볼까요?</p><span className={styles.noteMark} aria-hidden="true"><Asterisk /></span></div>
          <Link className={styles.heroNotice} href="/classes/drawing-routine"><span>REGULAR CLASS ↗</span><strong>드로잉 루틴</strong><p>매주 완성하는 아이패드 드로잉</p><span>커리큘럼과 수업 안내 보기 ↗</span></Link>
          <span className={styles.sticker}>LESS<br />ORDINARY.</span>
        </div>
      </div>
      <div className={styles.ribbon} aria-hidden="true"><span>LEARN SOMETHING.</span><span>✳︎</span><span>MAKE SOMETHING.</span><span>✳︎</span><span>GO YOUR OWN WAY.</span><span>↗</span></div>
    </section>
    <section id="find-your-class" className={styles.guide} aria-labelledby="guide-title">
      <div><span className={styles.smallLabel}>START WITH WHAT YOU LOVE</span><h2 id="guide-title">지금 만들고 싶은 것부터.</h2><p>관심 있는 방향을 골라 커리큘럼을 살펴보세요.</p></div>
      <div className={styles.paths}>
        <Link href="/classes/drawing-routine"><span>01 / DRAW</span><strong>꾸준히 그리는 시간</strong><span>아이패드 드로잉 루틴 ↗</span></Link>
        <Link href="/classes/content-studio"><span>02 / SHARE</span><strong>나를 보여주는 콘텐츠</strong><span>콘텐츠 기획·제작 ↗</span></Link>
        <Link href="/classes/portfolio-ready"><span>03 / COLLECT</span><strong>작업을 모은 포트폴리오</strong><span>포트폴리오 구성 ↗</span></Link>
        <Link href="/classes/pictureforge"><span>04 / TELL</span><strong>그림으로 전하는 이야기</strong><span>그림책 기획·제작 ↗</span></Link>
        <Link href="/classes/emoticon"><span>05 / EXPRESS</span><strong>감정을 담은 캐릭터</strong><span>이모티콘 기획·제작 ↗</span></Link>
      </div>
    </section>
    <section id="class-board" className={styles.classSection}><Reveal>
      <div className={styles.sectionTop}><span className={styles.smallLabel}>01 / THE CLASS BOARD</span><p>목표는 달라도,<br />시작은 여기에서.</p></div>
      <div className={styles.sectionTitle}><h2>무엇을<br /><em>만들고 싶나요?</em></h2><Link className={styles.plainLink} href="/classes">모든 수업 보기 ↗</Link></div>
      <CourseList />
      <p className={styles.footnote}>커리큘럼을 먼저 살펴보세요. 시작일·잔여석은 상담 후 확정됩니다.</p>
    </Reveal></section>
    <section id="student-stories" className={styles.stories}><Reveal>
      <div className={styles.sectionTop}><span className={styles.smallLabel}>02 / FROM THE CLASSROOM</span><span className={styles.roundMark} aria-hidden="true">“</span></div>
      <div className={styles.sectionTitle}><h2>수업이 끝나도,<br /><em>이야기는 계속.</em></h2><Link className={styles.plainLink} href="/reviews">수강생 후기 보기 ↗</Link></div>
      <ReviewGallery limit={6} />
    </Reveal></section>
    <section className={styles.workSection}><Reveal>
      <div className={styles.sectionTop}><span className={styles.smallLabel}>03 / MADE BY US</span><span>그리는 과정부터 완성한 한 장까지.</span></div>
      <div className={styles.sectionTitle}><h2>이렇게<br /><em>만들어 갑니다.</em></h2><Link className={styles.plainLink} href="/work">작업 예시 보기 ↗</Link></div>
      <ReviewGallery kind="example" limit={3} />
    </Reveal></section>
    <section id="instagram" className={styles.social}><Reveal>
      <div className={styles.sectionTop}><span className={styles.smallLabel}>04 / IN THE STUDIO</span><span>@OTHER.THAN.WORKS</span></div>
      <div className={styles.sectionTitle}><h2>만드는 날들의<br /><em>작은 기록.</em></h2><span className={styles.playMark} aria-hidden="true">↗</span></div>
      <InstagramFeed />
    </Reveal></section>
    <section className={styles.join} aria-labelledby="join-title"><Reveal>
      <span className={styles.smallLabel}>YOUR NEXT STEP</span>
      <div className={styles.sectionTitle}><h2 id="join-title">시작은 가볍게,<br /><em>선택은 차근차근.</em></h2><a className={styles.plainLink} href={site.instagram} target="_blank" rel="noopener noreferrer">수업 선택이 고민이라면 문의하기 ↗<span className="sr-only"> (새 탭)</span></a></div>
      <ol className={styles.steps}>
        <li><span>01</span><h3>커리큘럼 살펴보기</h3><p>만들고 싶은 작업과 관심 있는 수업의 내용을 비교해 보세요.</p></li>
        <li><span>02</span><h3>일정과 잔여석 확인하기</h3><p>수업 상세 안내를 읽고, 확정되지 않은 내용은 Instagram으로 문의해 주세요.</p></li>
        <li><span>03</span><h3>스마트스토어에서 신청하기</h3><p>해당 수업·기수·옵션과 가격·환불 기준을 확인한 뒤 결제해 주세요.</p></li>
      </ol>
      <div className={styles.faq}><h3>신청 전에 궁금한 점</h3>
        <details><summary>어떤 수업부터 시작하면 좋을까요?</summary><p>꾸준히 그림을 그리고 싶다면 드로잉 루틴, 작업을 정리하고 싶다면 포트폴리오반의 커리큘럼을 먼저 살펴보세요. 콘텐츠·그림책·이모티콘처럼 만들고 싶은 결과물이 있다면 해당 수업을 확인해 주세요. 필요한 경험과 준비물은 신청 전에 문의할 수 있습니다.</p></details>
        <details><summary>수강료와 수업 일정은 어디서 확인하나요?</summary><p>각 수업 상세페이지에서 확인할 수 있습니다. ‘상담 후 안내’로 표시된 항목과 시작일·잔여석은 문의 후 확인해 주세요. 과거 모집 안내를 현재 일정으로 사용하지 않습니다.</p></details>
        <details><summary>결제와 취소는 어디서 하나요?</summary><p>결제와 주문 확인은 monmut 스마트스토어에서 진행합니다. 결제 전 상품별 취소·환불 안내를 확인해 주세요. 홈페이지에서 버튼을 누르는 것만으로 수강 신청이나 결제가 완료되지는 않습니다.</p><a href={site.smartstore} target="_blank" rel="noopener noreferrer">스마트스토어 방문하기 ↗<span className="sr-only"> (새 탭)</span></a></details>
      </div>
    </Reveal></section>
    <section className={styles.studio}><span className={styles.smallLabel}>AND, WE DESIGN.</span><h2>당신의 브랜드에도<br />조금 다른 시선이 필요하다면.</h2><div className={styles.actions}><Link className={styles.darkButton} href="/studio">디자인 스튜디오 ↗</Link><Link className={styles.plainLink} href="/about">아더댄웍스 이야기 ↗</Link></div></section>
  </main>;
}
