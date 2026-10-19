import Link from "next/link";
import { site } from "@/content/site";
import { Arrow, Asterisk } from "./icons";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-top">
          <div>
            <span className="eyebrow">
              A LITTLE DIFFERENT. A LITTLE MORE YOU.
            </span>
            <h2>
              우리, 다른 일을
              <br />
              만들어볼까요?
              <Asterisk />
            </h2>
          </div>
          <Link href="/apply?type=studio" className="button button-light">
            함께할 이야기 남기기 <Arrow diagonal />
          </Link>
        </div>
        <div className="footer-bottom">
          <Link href="/" className="wordmark">
            OTHER<span>THAN WORKS</span>
          </Link>
          <p>배우고, 만들고, 나누는 아더댄웍스.</p>
          <div>
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="공식 Instagram, 새 탭에서 열기"
            >
              INSTAGRAM <Arrow diagonal />
            </a>
            <Link href="/legal">이용 안내 · 개인정보 처리방침 초안</Link>
            <Link href="/reviews">수강생 후기</Link>
            <Link href="/admin">운영자 관리</Link>
          </div>
          <span className="copyright">
            © {new Date().getFullYear()} OTHER THAN WORKS
          </span>
        </div>
      </div>
    </footer>
  );
}
