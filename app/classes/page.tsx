import type { Metadata } from "next";
import { CourseList } from "@/components/course-list";

export const metadata: Metadata = {
  title: "클래스",
  description:
    "아이패드 드로잉 정규반, 콘텐츠, 포트폴리오, 그림책, 이모티콘. 아더댄웍스의 클래스를 만나보세요.",
  alternates: { canonical: "/classes" },
};
export default function ClassesPage() {
  return (
    <main id="main" tabIndex={-1} className="wrap page-content">
      <header className="page-heading">
        <span className="eyebrow">CLASS / LEARN & MAKE</span>
        <h1>
          작은 호기심이,
          <br />
          나의 작업이 될 때.
        </h1>
        <p>
          배우는 데서 그치지 않고, 나만의 것을 만드는 시간.
          <br />
          지금의 나에게 필요한 다음 작업을 찾아보세요.
        </p>
      </header>
      <CourseList />
      <div className="notice">
        수업마다 커리큘럼과 운영 안내를 확인할 수 있습니다. 시작일과 잔여석은 등록 전에 상담으로 확인해 주세요.
      </div>
    </main>
  );
}
