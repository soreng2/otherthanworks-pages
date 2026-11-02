import { SiteText } from "@/components/site-copy";
import Link from "next/link";
import { site } from "@/content/site";
import { Arrow, Asterisk } from "./icons";
export function Footer() {
    return (<footer className="site-footer">
      <div className="wrap">
        <div className="footer-top">
          <div>
            <span className="eyebrow"><SiteText>{"A LITTLE DIFFERENT. A LITTLE MORE YOU."}</SiteText></span>
            <h2><SiteText>{"우리, 다른 일을"}</SiteText><br /><SiteText>{"만들어볼까요?"}</SiteText><Asterisk />
            </h2>
          </div>
          <Link href="/apply?type=studio" className="button button-light"><SiteText>{"함께할 이야기 남기기 "}</SiteText><Arrow diagonal/>
          </Link>
        </div>
        <div className="footer-bottom">
          <Link href="/" className="wordmark"><SiteText>{"OTHER"}</SiteText><span><SiteText>{"THAN WORKS"}</SiteText></span>
          </Link>
          <p><SiteText>{"배우고, 만들고, 나누는 아더댄웍스."}</SiteText></p>
          <div>
            <a href={site.instagram} target="_blank" rel="noopener noreferrer" aria-label="공식 Instagram, 새 탭에서 열기"><SiteText>{"INSTAGRAM "}</SiteText><Arrow diagonal/>
            </a>
            <Link href="/legal"><SiteText>{"이용 안내 \u00B7 개인정보 처리방침 초안"}</SiteText></Link>
            <Link href="/reviews"><SiteText>{"수강생 후기"}</SiteText></Link>
            <a href={site.smartstore} target="_blank" rel="noopener noreferrer"><SiteText>{"스마트스토어 "}</SiteText><span className="sr-only"><SiteText>{"(새 탭)"}</SiteText></span><SiteText>{"\u2197"}</SiteText></a>
            <Link href="/admin"><SiteText>{"운영자 관리"}</SiteText></Link>
          </div>
          <span className="copyright"><SiteText>{"\u00A9 "}</SiteText>{new Date().getFullYear()}<SiteText>{" OTHER THAN WORKS"}</SiteText></span>
        </div>
      </div>
    </footer>);
}
