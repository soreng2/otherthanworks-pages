import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { classes, site } from "@/content/site";
import { ClassArtwork } from "@/components/class-card";
import { Arrow } from "@/components/icons";

export function generateStaticParams() {
  return classes.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = classes.find((item) => item.slug === slug);
  return {
    title: item?.title ?? "클래스를 찾을 수 없습니다",
    description: item?.description,
    alternates: { canonical: `/classes/${slug}` },
  };
}
export default async function ClassDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = classes.find((item) => item.slug === slug);
  if (!item) notFound();
  return (
    <main id="main" tabIndex={-1} className="wrap page-content">
      <header className="page-heading">
        <nav className="breadcrumb" aria-label="현재 위치">
          <Link href="/">HOME</Link>
          <span>/</span>
          <Link href="/classes">CLASS</Link>
          <span>/</span>
          <span>{item.name}</span>
        </nav>
        <span className="eyebrow">{item.category}</span>
        <h1>{item.title}</h1>
        <p>{item.description}</p>
      </header>
      <div className="detail-grid">
        <div className="detail-art">
          <ClassArtwork item={item} />
        </div>
        <section className="detail-copy">
          <span className="eyebrow">{item.name}</span>
          <h2>
            나의 다음 작업을
            <br />
            준비하는 시간.
          </h2>
          <p>
            관심 있는 프로그램의 방향을 먼저 살펴보세요. 강사와 구체적인 수업
            구성, 참여 방법은 확인을 거쳐 안내할 예정입니다.
          </p>
          <dl className="detail-facts">
            <div>
              <dt>등록 상태</dt>
              <dd>{item.status}</dd>
            </div>
            <div>
              <dt>일정 · 정원</dt>
              <dd>확정 후 안내</dd>
            </div>
            <div>
              <dt>수강료 · 결제</dt>
              <dd>확정 후 안내</dd>
            </div>
          </dl>
          <div className="notice">
            프로그램 소개 초안입니다. 현재 신청이나 결제를 받지 않으며, 문의
            페이지에서도 접수 준비 상태를 확인할 수 있습니다.
          </div>
          <div className="detail-links">
            <Link
              className="button"
              href={`/apply?type=class&program=${item.slug}`}
            >
              문의 안내 보기 <Arrow diagonal />
            </Link>
            <a
              href={site.instagram}
              className="text-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              공식 Instagram <Arrow diagonal />
              <span className="sr-only">(새 탭)</span>
            </a>
          </div>
        </section>
      </div>
      <Link className="back-link" href="/classes">
        ← 모든 클래스로 돌아가기
      </Link>
    </main>
  );
}
