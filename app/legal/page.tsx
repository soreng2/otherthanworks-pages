import { SiteText } from "@/components/site-copy";
import { site } from "@/content/site";
export const metadata = {
    title: "이용 안내 · 개인정보 처리방침 초안",
    robots: { index: false, follow: true },
};
export default function LegalPage() {
    return (<main id="main" tabIndex={-1} className="wrap page-content">
      <header className="page-heading">
        <span className="eyebrow"><SiteText>{"LEGAL / DRAFT \u2014 NOT FINAL"}</SiteText></span>
        <h1><SiteText>{"이용 안내 및"}</SiteText><br /><SiteText>{"개인정보 처리방침 초안."}</SiteText></h1>
        <p><SiteText>{"운영 정보 확정 전의 검토용 문서입니다. 실제 운영 정책으로 사용하지 않습니다."}</SiteText></p>
      </header>
      <article className="legal-content">
        <div className="notice">
          <strong><SiteText>{"아직 확정된 약관\u00B7개인정보 처리방침이 아닙니다."}</SiteText></strong><SiteText>{"사업자 정보, 수집 항목과 보유 기간, 수신\u00B7처리 담당자, 위탁\u00B7국외 이전 여부 등을 확정하고 검토한 후 정식 정책을 공개합니다. 현재 온라인 문의\u00B7결제\u00B7추적 기능은 비활성 상태입니다."}</SiteText></div>
        <h2><SiteText>{"1. 사이트 운영 정보"}</SiteText></h2>
        <p><SiteText>{"브랜드명: "}</SiteText><SiteText>{site.name}</SiteText><SiteText>{" ("}</SiteText><SiteText>{site.koreanName}</SiteText><SiteText>{"). 사업자명, 대표자, 사업자등록번호, 통신판매업 신고 정보, 사업장 주소와 개인정보 보호 담당자 연락처는 확정 후 기재합니다."}</SiteText></p>
        <h2><SiteText>{"2. 문의 접수"}</SiteText></h2>
        <p><SiteText>{"온라인 문의는 아직 받지 않습니다. 개인정보 수집\u00B7이용 목적, 필수\u00B7선택 항목, 보유 기간, 동의 거부 권리와 문의 수신처를 확정한 이후에만 접수 기능을 활성화합니다. 현재 양식에 작성한 내용은 제출되지 않습니다."}</SiteText></p>
        <h2><SiteText>{"3. 수강\u00B7결제\u00B7환불"}</SiteText></h2>
        <p><SiteText>{"현재 온라인 결제와 수강 등록을 받지 않습니다. 상품별 가격, 제공 일정, 취소\u00B7환불 조건, 결제 제공자 및 소비자 안내 사항은 실제 판매를 시작하기 전에 확정하여 공개합니다."}</SiteText></p>
        <h2><SiteText>{"4. 외부 링크"}</SiteText></h2>
        <p><SiteText>{"공식 Instagram 링크는 외부 서비스로 이동합니다. 외부 서비스의 이용약관과 개인정보 처리방침이 적용될 수 있습니다. YouTube 링크는 공식 주소 확인 전까지 제공하지 않습니다."}</SiteText></p>
        <h2><SiteText>{"5. 쿠키와 방문 분석"}</SiteText></h2>
        <p><SiteText>{"GA4와 Meta Pixel을 설치하거나 활성화하지 않았습니다. 추후 도입 시 목적과 수집 항목을 고지하고 필요한 동의 절차를 먼저 마련합니다."}</SiteText></p>
        <h2><SiteText>{"6. 문서 상태"}</SiteText></h2>
        <p><SiteText>{"이 페이지는 운영 검토용 초안입니다. 시행일과 정식 정책 버전은 운영 정보 및 법적 검토가 완료된 후 공개합니다."}</SiteText></p>
      </article>
    </main>);
}
