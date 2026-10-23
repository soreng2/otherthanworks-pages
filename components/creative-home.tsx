import Link from "next/link";
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
          <p className={styles.heroText}>그림 한 장에서, 나만의 다음 작업까지.<br />배우는 사람과 만드는 사람이 만나는 아더댄웍스.</p>
          <div className={styles.actions}><Link className={styles.darkButton} href="#class-board">나의 클래스 찾기 ↗</Link><Link className={styles.plainLink} href="#student-stories">수업에서 시작된 이야기 ↓</Link></div>
        </div>
        <div className={styles.heroBoard}>
          <div className={styles.note}><span className={styles.smallLabel}>A NOTE FOR YOUR NEXT CHAPTER</span><strong>잘하는 일도,<br />처음 하는 일도.</strong><p>일단, 한 장부터 시작해 볼까요?</p><span className={styles.noteMark} aria-hidden="true"><Asterisk /></span></div>
          <Link className={styles.heroNotice} href="/classes/drawing-routine"><span>REGULAR CLASS ↗</span><strong>드로잉 루틴</strong><p>매주 완성하는 아이패드 드로잉</p><span>커리큘럼과 수업 안내 보기 ↗</span></Link>
          <span className={styles.sticker}>LESS<br />ORDINARY.</span>
        </div>
      </div>
      <div className={styles.ribbon} aria-hidden="true"><span>LEARN SOMETHING.</span><span>✳︎</span><span>MAKE SOMETHING.</span><span>✳︎</span><span>GO YOUR OWN WAY.</span><span>↗</span></div>
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
    <section className={styles.studio}><span className={styles.smallLabel}>AND, WE DESIGN.</span><h2>당신의 브랜드에도<br />조금 다른 시선이 필요하다면.</h2><div className={styles.actions}><Link className={styles.darkButton} href="/studio">디자인 스튜디오 ↗</Link><Link className={styles.plainLink} href="/about">아더댄웍스 이야기 ↗</Link></div></section>
  </main>;
}
