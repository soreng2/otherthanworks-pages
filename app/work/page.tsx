import Link from "next/link";
import { CalendarArt } from "@/components/calendar-art";
import { Arrow } from "@/components/icons";
import { work } from "@/content/site";

export const metadata = {
  title: "작업",
  description:
    "아더댄웍스의 작업과 프로젝트 노트. 실제 프로젝트 자료는 준비 중입니다.",
  alternates: { canonical: "/work" },
};
export default function WorkPage() {
  return (
    <main id="main" tabIndex={-1} className="wrap page-content">
      <header className="page-heading">
        <span className="eyebrow">WORK / THINGS WE MAKE</span>
        <h1>
          다른 시선으로
          <br />
          만드는 것들.
        </h1>
        <p>생각이 형태가 되는 과정과, 작업에 담긴 이야기를 모읍니다.</p>
      </header>
      <div className="work-list">
        <Link href="/work/calendar-making" className="featured-work">
          <CalendarArt />
          <div className="featured-work-caption">
            <div>
              <span className="eyebrow">{work.category}</span>
              <h3>
                {work.title} <span>Calendar making</span>
              </h3>
            </div>
            <Arrow diagonal />
          </div>
        </Link>
        <div className="notice">
          실제 프로젝트 이미지와 크레딧을 준비 중입니다. 현재 이미지는 화면
          구성을 위한 그래픽 시안이며, 고객·강사·수강생 작업물로 소개하지
          않습니다.
        </div>
      </div>
    </main>
  );
}
