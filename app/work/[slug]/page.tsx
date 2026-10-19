import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarArt } from "@/components/calendar-art";
import { work } from "@/content/site";

export const metadata = {
  title: "달력 만들기 — 프로젝트 노트",
  description:
    "달력 만들기 프로젝트 노트. 실제 작업 이미지와 설명을 준비하고 있습니다.",
  alternates: { canonical: "/work/calendar-making" },
};
export function generateStaticParams() {
  return [{ slug: work.slug }];
}
export default async function WorkDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (slug !== work.slug) notFound();
  return (
    <main id="main" tabIndex={-1} className="wrap page-content">
      <header className="page-heading">
        <nav className="breadcrumb" aria-label="현재 위치">
          <Link href="/work">WORK</Link>
          <span>/</span>
          <span>CALENDAR MAKING</span>
        </nav>
        <span className="eyebrow">{work.category}</span>
        <h1>{work.title}</h1>
        <p>{work.description}</p>
      </header>
      <div className="work-list">
        <CalendarArt />
        <div className="notice">
          <strong>{work.status}</strong>현재 그래픽은 레이아웃 시안입니다. 실제
          작업 이미지·진행 과정·참여자·제작 연도·크레딧은 공개 범위가 확정된 후
          추가합니다.
        </div>
      </div>
      <Link className="back-link" href="/work">
        ← 작업 목록으로 돌아가기
      </Link>
    </main>
  );
}
