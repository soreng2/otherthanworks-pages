import { SiteText } from "@/components/site-copy";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarArt } from "@/components/calendar-art";
import { work } from "@/content/site";
export const metadata = {
    title: "달력 만들기 — 프로젝트 노트",
    description: "달력 만들기 프로젝트 노트. 실제 작업 이미지와 설명을 준비하고 있습니다.",
    alternates: { canonical: "/work/calendar-making" },
};
export function generateStaticParams() {
    return [{ slug: work.slug }];
}
export default async function WorkDetail({ params, }: {
    params: Promise<{
        slug: string;
    }>;
}) {
    const { slug } = await params;
    if (slug !== work.slug)
        notFound();
    return (<main id="main" tabIndex={-1} className="wrap page-content">
      <header className="page-heading">
        <nav className="breadcrumb" aria-label="현재 위치">
          <Link href="/work"><SiteText>{"WORK"}</SiteText></Link>
          <span><SiteText>{"/"}</SiteText></span>
          <span><SiteText>{"CALENDAR MAKING"}</SiteText></span>
        </nav>
        <span className="eyebrow"><SiteText>{work.category}</SiteText></span>
        <h1><SiteText>{work.title}</SiteText></h1>
        <p><SiteText>{work.description}</SiteText></p>
      </header>
      <div className="work-list">
        <CalendarArt />
        <div className="notice">
          <strong><SiteText>{work.status}</SiteText></strong><SiteText>{"현재 그래픽은 레이아웃 시안입니다. 실제 작업 이미지\u00B7진행 과정\u00B7참여자\u00B7제작 연도\u00B7크레딧은 공개 범위가 확정된 후 추가합니다."}</SiteText></div>
      </div>
      <Link className="back-link" href="/work"><SiteText>{"\u2190 작업 목록으로 돌아가기"}</SiteText></Link>
    </main>);
}
