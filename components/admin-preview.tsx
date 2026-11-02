import { MediaSandbox } from "./media-sandbox";
import Link from "next/link";
import styles from "./reviews.module.css";

export function AdminPreview() {
  return <div className={styles.manager}>
    <p className={styles.notice}><strong>관리 화면 미리보기</strong><br />아래에서 글을 쓰고 파일을 첨부할 수 있습니다. 현재는 내 브라우저 임시저장까지 가능하며, 고객 사이트 공개에는 계정·저장소 연결이 필요합니다.</p>
    <MediaSandbox />
    <div className={styles.grid}>
      <section className={styles.card}><span className="eyebrow">01 / CLASS</span><h2>수업 상세페이지</h2><p>수업 선택 → 모집 상태·노출 순서·커리큘럼·가격 수정 → 상세 사진 추가·순서 변경 → 공개 반영</p><Link href="/classes">고객이 보는 클래스 ↗</Link></section>
      <section className={styles.card}><span className="eyebrow">02 / STORIES & WORK</span><h2>후기·작업 예시</h2><p>사진 선택 → 제목·설명 작성 → 후기 또는 작업 예시 분류 → 공개</p><Link href="/work">고객이 보는 작업 예시 ↗</Link></section>
      <section className={styles.card}><span className="eyebrow">03 / INSTAGRAM</span><h2>릴스·게시물</h2><p>인스타그램 링크 붙여넣기 → 소개 작성 → 홈페이지 공개</p><Link href="/#instagram">홈페이지 인스타그램 영역 ↗</Link></section>
    </div>
  </div>;
}
