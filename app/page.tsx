import Image from "next/image";
import Link from "next/link";
import { Arrow, Asterisk } from "@/components/icons";
import { CourseList } from "@/components/course-list";
import { CalendarArt } from "@/components/calendar-art";

export const metadata = { alternates: { canonical: "/" } };

export default function Home() {
  return (
    <main id="main" tabIndex={-1}>
      <section className="hero wrap">
        <div className="hero-copy">
          <span className="eyebrow hero-eyebrow">
            <Asterisk className="tiny-asterisk" /> CLASS, DESIGN & SOMETHING
            ELSE
          </span>
          <h1>
            좋아하는 딴짓이
            <br />
            나의 <span className="underlined">일이 되는 곳.</span>
          </h1>
          <p>
            배움에서 시작해, 나만의 작업으로.
            <br />
            아더댄웍스는 당신의 다음 가능성을 함께 만듭니다.
          </p>
          <div className="hero-actions">
            <Link className="button" href="/classes">
              클래스 살펴보기 <Arrow diagonal />
            </Link>
            <Link className="text-link" href="/studio">
              스튜디오 알아보기 <Arrow diagonal />
            </Link>
          </div>
          <div className="hero-small">
            <Arrow className="small-spark" /> 생각만 했던 것들, 여기서 하나씩
            꺼내봐요.
          </div>
        </div>
        <div className="hero-visual">
          <Image
            src="/images/folder-stack.svg"
            alt="파란 폴더와 버터색 종이가 겹쳐진 아더댄웍스 브랜드 그래픽 시안"
            width={700}
            height={600}
            priority
          />
          <div className="hero-paper-copy">
            <span>YOUR NEXT CHAPTER</span>
            <strong>
              Less ordinary.
              <br />
              More <em>you.</em>
            </strong>
            <p>
              조금 다른 시선으로,
              <br />
              나만의 다음을 펼쳐보세요.
            </p>
            <span className="paper-bottom">OTHER THAN WORKS ↗</span>
          </div>
          <div className="round-sticker">
            GOOD
            <br />
            THINGS
            <br />
            <span>TAKE PLAY.</span>
            <Asterisk />
          </div>
          <span className="visual-note">A FOLDER FULL OF POSSIBILITIES.</span>
        </div>
      </section>
      <div className="hero-baseline wrap">
        <span>LEARN. MAKE. GO YOUR OWN WAY.</span>
        <a href="#classes">
          아래로 펼쳐보기 <span>↓</span>
        </a>
      </div>
      <section className="intro-band">
        <div className="wrap">
          <Asterisk />
          <p>
            꼭 하던 방식대로 할 필요는 없으니까.
            <br />
            <strong>배우는 일도, 만드는 일도 조금 다르게.</strong>
          </p>
          <span>
            OTHER WAYS,
            <br />
            NEW POSSIBILITIES.
          </span>
        </div>
      </section>
      <section id="classes" className="section wrap">
        <div className="section-heading">
          <div>
            <span className="eyebrow">01 / LEARN & MAKE</span>
            <h2>다음 작업의 시작, 클래스.</h2>
            <p>작은 호기심을 나만의 작업으로 이어가는 시간.</p>
          </div>
          <Link className="text-link" href="/classes">
            모든 클래스 보기 <Arrow diagonal />
          </Link>
        </div>
        <CourseList />
        <p className="section-note">
          수업별 커리큘럼을 살펴보고, 시작일과 잔여석은 상담으로 확인해 주세요.
        </p>
      </section>
      <section className="studio-section">
        <div className="wrap studio-grid">
          <div className="studio-copy">
            <span className="eyebrow">02 / DESIGN STUDIO</span>
            <h2>
              생각에 형태를,
              <br />
              브랜드에 <span className="serif-word">다름을.</span>
            </h2>
            <p>
              전하고 싶은 이야기를 듣고,
              <br />그 이야기에 어울리는 시각 언어를 함께 찾습니다.
            </p>
            <div className="service-tags">
              <span>브랜드 디자인</span>
              <span>그래픽 · 편집</span>
              <span>콘텐츠 디자인</span>
            </div>
            <Link href="/studio" className="button">
              스튜디오 만나보기 <Arrow diagonal />
            </Link>
          </div>
          <Link href="/work/calendar-making" className="featured-work">
            <CalendarArt />
            <div className="featured-work-caption">
              <div>
                <span className="eyebrow">PROJECT NOTE</span>
                <h3>
                  달력 만들기 <span>Calendar making</span>
                </h3>
              </div>
              <Arrow diagonal />
            </div>
          </Link>
        </div>
      </section>
      <section className="section wrap about-strip">
        <span className="eyebrow">03 / THE WAY WE THINK</span>
        <div>
          <h2>
            다른 일을 하다 보면,
            <br />
            다음의 나를 만나기도 하니까.
          </h2>
          <p>
            아더댄웍스는 배움과 작업 사이의 경계를 가볍게 넘나듭니다.
            <br />
            잘하는 일도, 처음 해보는 일도. 함께 시도할 수 있는 곳을 만듭니다.
          </p>
          <Link className="text-link" href="/about">
            아더댄웍스 이야기 <Arrow diagonal />
          </Link>
        </div>
        <Asterisk className="about-spark" />
      </section>
    </main>
  );
}
