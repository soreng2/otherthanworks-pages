import { SiteText } from "@/components/site-copy";
import { site, classes } from "@/content/site";
import { inquiryConfiguration } from "@/lib/inquiries";
import { InquiryForm } from "@/components/inquiry-form";
import { Arrow } from "@/components/icons";
export const metadata = {
    title: "문의 안내",
    robots: { index: false, follow: true },
};
export default async function ApplyPage({ searchParams, }: {
    searchParams: Promise<{
        type?: string;
        program?: string;
    }>;
}) {
    const query = await searchParams;
    const type = query.type === "class" ? "class" : "studio";
    const program = classes.some((item) => item.slug === query.program)
        ? query.program!
        : "";
    const enabled = site.inquiriesEnabled &&
        site.legalApproved &&
        inquiryConfiguration() !== null;
    return (<main id="main" tabIndex={-1} className="wrap page-content">
      <header className="page-heading">
        <span className="eyebrow"><SiteText>{"LET\u2019S TALK / YOUR NEXT CHAPTER"}</SiteText></span>
        <h1>
          <SiteText>{type === "class" ? (<><SiteText>{"배움의 다음을,"}</SiteText><br /><SiteText>{"함께 이야기해요."}</SiteText></>) : (<><SiteText>{"함께 만들고 싶은"}</SiteText><br /><SiteText>{"이야기가 있나요?"}</SiteText></>)}</SiteText>
        </h1>
        <p><SiteText>{"클래스와 스튜디오에 관한 궁금한 점을 나누는 곳입니다."}</SiteText></p>
      </header>
      <div className="form-layout">
        <aside className="contact-info">
          <h2><SiteText>{"작은 이야기부터"}</SiteText><br /><SiteText>{"시작해도 좋아요."}</SiteText></h2>
          <p><SiteText>{"온라인 접수는 준비 중입니다."}</SiteText><br /><SiteText>{"공식 채널에서 아더댄웍스를 만나보세요."}</SiteText></p>
          <a href={site.instagram} className="text-link" target="_blank" rel="noopener noreferrer"><SiteText>{"공식 Instagram "}</SiteText><Arrow diagonal/>
            <span className="sr-only"><SiteText>{"(새 탭)"}</SiteText></span>
          </a>
        </aside>
        <InquiryForm key={`${type}-${program}`} type={type} program={program} enabled={enabled}/>
      </div>
    </main>);
}
