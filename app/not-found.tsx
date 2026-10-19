import Link from "next/link";
import { Arrow } from "@/components/icons";
export default function NotFound() {
  return (
    <main id="main" tabIndex={-1} className="wrap not-found">
      <span className="eyebrow">404 / A DIFFERENT WAY</span>
      <h1>여긴 아직 빈 폴더예요.</h1>
      <p>페이지 주소를 확인하거나 홈페이지에서 다시 시작해 주세요.</p>
      <Link href="/" className="button">
        홈으로 돌아가기 <Arrow />
      </Link>
    </main>
  );
}
