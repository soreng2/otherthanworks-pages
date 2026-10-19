import type { Metadata } from "next";
import { classes } from "@/content/site";
import { ClassCard } from "@/components/class-card";

export const metadata: Metadata = {
  title: "클래스",
  description:
    "콘텐츠, 포트폴리오, AI 이미지. 나만의 작업으로 이어지는 아더댄웍스의 클래스를 만나보세요.",
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
      <div className="class-grid">
        {classes.map((item) => (
          <ClassCard key={item.slug} item={item} />
        ))}
      </div>
      <div className="notice">
        <strong>새로운 프로그램을 준비하고 있습니다.</strong>소개는 검토 중인
        초안입니다. 일정·정원·가격과 등록 안내는 운영 내용 확정 후 공개합니다.
        현재 온라인 결제나 수강 등록은 진행되지 않습니다.
      </div>
    </main>
  );
}
