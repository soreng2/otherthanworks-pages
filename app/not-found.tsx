import { SiteText } from "@/components/site-copy";
import Link from "next/link";
import { Arrow } from "@/components/icons";
export default function NotFound() {
    return (<main id="main" tabIndex={-1} className="wrap not-found">
      <span className="eyebrow"><SiteText>{"404 / A DIFFERENT WAY"}</SiteText></span>
      <h1><SiteText>{"여긴 아직 빈 폴더예요."}</SiteText></h1>
      <p><SiteText>{"페이지 주소를 확인하거나 홈페이지에서 다시 시작해 주세요."}</SiteText></p>
      <Link href="/" className="button"><SiteText>{"홈으로 돌아가기 "}</SiteText><Arrow />
      </Link>
    </main>);
}
