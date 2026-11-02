import { SiteText } from "@/components/site-copy";
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
      <div className={styles.kicker}><span><SiteText>{"OTHER THAN WORKS"}</SiteText></span><span><SiteText>{"배우고, 만들고, 나누는 곳."}</SiteText></span><span><SiteText>{"CLASS + DESIGN STUDIO"}</SiteText></span></div>
      <div className={styles.heroGrid}>
        <div><span className={styles.smallLabel}><SiteText>{"좋아하는 딴짓이 나의 일이 되는 곳."}</SiteText></span>
          <h1><SiteText>{"딴짓에도"}</SiteText><br /><span className={styles.underlined}><SiteText>{"다음"}</SiteText></span><SiteText>{"이 있다"}</SiteText><span className={styles.period}><SiteText>{"."}</SiteText></span></h1>
          <p className={styles.heroText}><SiteText>{"아이패드 드로잉부터 콘텐츠\u00B7포트폴리오\u00B7그림책 제작까지."}</SiteText><br /><SiteText>{"좋아하는 일을 이어가는 창작 클래스와 디자인 스튜디오."}</SiteText></p>
          <div className={styles.actions}><Link className={styles.darkButton} href="#class-board"><SiteText>{"나의 클래스 찾기 \u2197"}</SiteText></Link><Link className={styles.plainLink} href="#find-your-class"><SiteText>{"어떤 수업이 맞을까요? \u2193"}</SiteText></Link></div>
        </div>
        <div className={styles.heroBoard}>
          <div className={styles.note}><span className={styles.smallLabel}><SiteText>{"A NOTE FOR YOUR NEXT CHAPTER"}</SiteText></span><strong><SiteText>{"잘하는 일도,"}</SiteText><br /><SiteText>{"처음 하는 일도."}</SiteText></strong><p><SiteText>{"일단, 한 장부터 시작해 볼까요?"}</SiteText></p><span className={styles.noteMark} aria-hidden="true"><Asterisk /></span></div>
          <Link className={styles.heroNotice} href="/classes/drawing-routine"><span><SiteText>{"REGULAR CLASS \u2197"}</SiteText></span><strong><SiteText>{"드로잉 루틴"}</SiteText></strong><p><SiteText>{"매주 완성하는 아이패드 드로잉"}</SiteText></p><span><SiteText>{"커리큘럼과 수업 안내 보기 \u2197"}</SiteText></span></Link>
          <span className={styles.sticker}><SiteText>{"LESS"}</SiteText><br /><SiteText>{"ORDINARY."}</SiteText></span>
        </div>
      </div>
      <div className={styles.ribbon} aria-hidden="true"><span><SiteText>{"LEARN SOMETHING."}</SiteText></span><span><SiteText>{"\u2733\uFE0E"}</SiteText></span><span><SiteText>{"MAKE SOMETHING."}</SiteText></span><span><SiteText>{"\u2733\uFE0E"}</SiteText></span><span><SiteText>{"GO YOUR OWN WAY."}</SiteText></span><span><SiteText>{"\u2197"}</SiteText></span></div>
    </section>
    <section id="find-your-class" className={styles.guide} aria-labelledby="guide-title">
      <div><span className={styles.smallLabel}><SiteText>{"START WITH WHAT YOU LOVE"}</SiteText></span><h2 id="guide-title"><SiteText>{"지금 만들고 싶은 것부터."}</SiteText></h2><p><SiteText>{"관심 있는 방향을 골라 커리큘럼을 살펴보세요."}</SiteText></p></div>
      <div className={styles.paths}>
        <Link href="/classes/drawing-routine"><span><SiteText>{"01 / DRAW"}</SiteText></span><strong><SiteText>{"꾸준히 그리는 시간"}</SiteText></strong><span><SiteText>{"아이패드 드로잉 루틴 \u2197"}</SiteText></span></Link>
        <Link href="/classes/content-studio"><span><SiteText>{"02 / SHARE"}</SiteText></span><strong><SiteText>{"나를 보여주는 콘텐츠"}</SiteText></strong><span><SiteText>{"콘텐츠 기획\u00B7제작 \u2197"}</SiteText></span></Link>
        <Link href="/classes/portfolio-ready"><span><SiteText>{"03 / COLLECT"}</SiteText></span><strong><SiteText>{"작업을 모은 포트폴리오"}</SiteText></strong><span><SiteText>{"포트폴리오 구성 \u2197"}</SiteText></span></Link>
        <Link href="/classes/pictureforge"><span><SiteText>{"04 / TELL"}</SiteText></span><strong><SiteText>{"그림으로 전하는 이야기"}</SiteText></strong><span><SiteText>{"그림책 기획\u00B7제작 \u2197"}</SiteText></span></Link>
        <Link href="/classes/emoticon"><span><SiteText>{"05 / EXPRESS"}</SiteText></span><strong><SiteText>{"감정을 담은 캐릭터"}</SiteText></strong><span><SiteText>{"이모티콘 기획\u00B7제작 \u2197"}</SiteText></span></Link>
      </div>
    </section>
    <section id="class-board" className={styles.classSection}><Reveal>
      <div className={styles.sectionTop}><span className={styles.smallLabel}><SiteText>{"01 / THE CLASS BOARD"}</SiteText></span><p><SiteText>{"목표는 달라도,"}</SiteText><br /><SiteText>{"시작은 여기에서."}</SiteText></p></div>
      <div className={styles.sectionTitle}><h2><SiteText>{"무엇을"}</SiteText><br /><em><SiteText>{"만들고 싶나요?"}</SiteText></em></h2><Link className={styles.plainLink} href="/classes"><SiteText>{"모든 수업 보기 \u2197"}</SiteText></Link></div>
      <CourseList />
      <p className={styles.footnote}><SiteText>{"커리큘럼을 먼저 살펴보세요. 시작일\u00B7잔여석은 상담 후 확정됩니다."}</SiteText></p>
    </Reveal></section>
    <section id="student-stories" className={styles.stories}><Reveal>
      <div className={styles.sectionTop}><span className={styles.smallLabel}><SiteText>{"02 / FROM THE CLASSROOM"}</SiteText></span><span className={styles.roundMark} aria-hidden="true"><SiteText>{"\u201C"}</SiteText></span></div>
      <div className={styles.sectionTitle}><h2><SiteText>{"수업이 끝나도,"}</SiteText><br /><em><SiteText>{"이야기는 계속."}</SiteText></em></h2><Link className={styles.plainLink} href="/reviews"><SiteText>{"수강생 후기 보기 \u2197"}</SiteText></Link></div>
      <ReviewGallery limit={6}/>
    </Reveal></section>
    <section className={styles.workSection}><Reveal>
      <div className={styles.sectionTop}><span className={styles.smallLabel}><SiteText>{"03 / MADE BY US"}</SiteText></span><span><SiteText>{"그리는 과정부터 완성한 한 장까지."}</SiteText></span></div>
      <div className={styles.sectionTitle}><h2><SiteText>{"이렇게"}</SiteText><br /><em><SiteText>{"만들어 갑니다."}</SiteText></em></h2><Link className={styles.plainLink} href="/work"><SiteText>{"작업 예시 보기 \u2197"}</SiteText></Link></div>
      <ReviewGallery kind="example" limit={3}/>
    </Reveal></section>
    <section id="instagram" className={styles.social}><Reveal>
      <div className={styles.sectionTop}><span className={styles.smallLabel}><SiteText>{"04 / IN THE STUDIO"}</SiteText></span><span><SiteText>{"@OTHER.THAN.WORKS"}</SiteText></span></div>
      <div className={styles.sectionTitle}><h2><SiteText>{"만드는 날들의"}</SiteText><br /><em><SiteText>{"작은 기록."}</SiteText></em></h2><span className={styles.playMark} aria-hidden="true"><SiteText>{"\u2197"}</SiteText></span></div>
      <InstagramFeed />
    </Reveal></section>
    <section className={styles.join} aria-labelledby="join-title"><Reveal>
      <span className={styles.smallLabel}><SiteText>{"YOUR NEXT STEP"}</SiteText></span>
      <div className={styles.sectionTitle}><h2 id="join-title"><SiteText>{"시작은 가볍게,"}</SiteText><br /><em><SiteText>{"선택은 차근차근."}</SiteText></em></h2><a className={styles.plainLink} href={site.instagram} target="_blank" rel="noopener noreferrer"><SiteText>{"수업 선택이 고민이라면 문의하기 \u2197"}</SiteText><span className="sr-only"><SiteText>{" (새 탭)"}</SiteText></span></a></div>
      <ol className={styles.steps}>
        <li><span><SiteText>{"01"}</SiteText></span><h3><SiteText>{"커리큘럼 살펴보기"}</SiteText></h3><p><SiteText>{"만들고 싶은 작업과 관심 있는 수업의 내용을 비교해 보세요."}</SiteText></p></li>
        <li><span><SiteText>{"02"}</SiteText></span><h3><SiteText>{"일정과 잔여석 확인하기"}</SiteText></h3><p><SiteText>{"수업 상세 안내를 읽고, 확정되지 않은 내용은 Instagram으로 문의해 주세요."}</SiteText></p></li>
        <li><span><SiteText>{"03"}</SiteText></span><h3><SiteText>{"스마트스토어에서 신청하기"}</SiteText></h3><p><SiteText>{"해당 수업\u00B7기수\u00B7옵션과 가격\u00B7환불 기준을 확인한 뒤 결제해 주세요."}</SiteText></p></li>
      </ol>
      <div className={styles.faq}><h3><SiteText>{"신청 전에 궁금한 점"}</SiteText></h3>
        <details><summary><SiteText>{"어떤 수업부터 시작하면 좋을까요?"}</SiteText></summary><p><SiteText>{"꾸준히 그림을 그리고 싶다면 드로잉 루틴, 작업을 정리하고 싶다면 포트폴리오반의 커리큘럼을 먼저 살펴보세요. 콘텐츠\u00B7그림책\u00B7이모티콘처럼 만들고 싶은 결과물이 있다면 해당 수업을 확인해 주세요. 필요한 경험과 준비물은 신청 전에 문의할 수 있습니다."}</SiteText></p></details>
        <details><summary><SiteText>{"수강료와 수업 일정은 어디서 확인하나요?"}</SiteText></summary><p><SiteText>{"각 수업 상세페이지에서 확인할 수 있습니다. \u2018상담 후 안내\u2019로 표시된 항목과 시작일\u00B7잔여석은 문의 후 확인해 주세요. 과거 모집 안내를 현재 일정으로 사용하지 않습니다."}</SiteText></p></details>
        <details><summary><SiteText>{"결제와 취소는 어디서 하나요?"}</SiteText></summary><p><SiteText>{"결제와 주문 확인은 monmut 스마트스토어에서 진행합니다. 결제 전 상품별 취소\u00B7환불 안내를 확인해 주세요. 홈페이지에서 버튼을 누르는 것만으로 수강 신청이나 결제가 완료되지는 않습니다."}</SiteText></p><a href={site.smartstore} target="_blank" rel="noopener noreferrer"><SiteText>{"스마트스토어 방문하기 \u2197"}</SiteText><span className="sr-only"><SiteText>{" (새 탭)"}</SiteText></span></a></details>
      </div>
    </Reveal></section>
    <section className={styles.studio}><span className={styles.smallLabel}><SiteText>{"AND, WE DESIGN."}</SiteText></span><h2><SiteText>{"당신의 브랜드에도"}</SiteText><br /><SiteText>{"조금 다른 시선이 필요하다면."}</SiteText></h2><div className={styles.actions}><Link className={styles.darkButton} href="/studio"><SiteText>{"디자인 스튜디오 \u2197"}</SiteText></Link><Link className={styles.plainLink} href="/about"><SiteText>{"아더댄웍스 이야기 \u2197"}</SiteText></Link></div></section>
  </main>;
}
