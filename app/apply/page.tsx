import { site, classes } from "@/content/site";
import { inquiryConfiguration } from "@/lib/inquiries";
import { InquiryForm } from "@/components/inquiry-form";
import { Arrow } from "@/components/icons";

export const metadata = {
  title: "문의 안내",
  robots: { index: false, follow: true },
};
export default async function ApplyPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; program?: string }>;
}) {
  const query = await searchParams;
  const type = query.type === "class" ? "class" : "studio";
  const program = classes.some((item) => item.slug === query.program)
    ? query.program!
    : "";
  const enabled =
    site.inquiriesEnabled &&
    site.legalApproved &&
    inquiryConfiguration() !== null;
  return (
    <main id="main" tabIndex={-1} className="wrap page-content">
      <header className="page-heading">
        <span className="eyebrow">LET’S TALK / YOUR NEXT CHAPTER</span>
        <h1>
          {type === "class" ? (
            <>
              배움의 다음을,
              <br />
              함께 이야기해요.
            </>
          ) : (
            <>
              함께 만들고 싶은
              <br />
              이야기가 있나요?
            </>
          )}
        </h1>
        <p>클래스와 스튜디오에 관한 궁금한 점을 나누는 곳입니다.</p>
      </header>
      <div className="form-layout">
        <aside className="contact-info">
          <h2>
            작은 이야기부터
            <br />
            시작해도 좋아요.
          </h2>
          <p>
            온라인 접수는 준비 중입니다.
            <br />
            공식 채널에서 아더댄웍스를 만나보세요.
          </p>
          <a
            href={site.instagram}
            className="text-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            공식 Instagram <Arrow diagonal />
            <span className="sr-only">(새 탭)</span>
          </a>
        </aside>
        <InquiryForm
          key={`${type}-${program}`}
          type={type}
          program={program}
          enabled={enabled}
        />
      </div>
    </main>
  );
}
