import Link from "next/link";
import styles from "./reviews.module.css";

export function AdminPreview() {
  return <div className={styles.manager}>
    <p className={styles.notice}><strong>관리 화면 미리보기</strong><br />계정과 저장소를 연결하면 아래 항목을 직접 관리할 수 있습니다. 현재는 미연결 상태여서 저장과 업로드를 할 수 없습니다.</p>
    <div className={styles.grid}>
      <section className={styles.card}><span className="eyebrow">01 / CLASS</span><h2>수업 상세페이지</h2><p>수업 선택 → 커리큘럼·가격 수정 → 상세 사진 추가·순서 변경 → 공개 반영</p><Link href="/classes">고객이 보는 클래스 ↗</Link></section>
      <section className={styles.card}><span className="eyebrow">02 / STORIES & WORK</span><h2>후기·작업 예시</h2><p>사진 선택 → 제목·설명 작성 → 후기 또는 작업 예시 분류 → 공개</p><Link href="/work">고객이 보는 작업 예시 ↗</Link></section>
      <section className={styles.card}><span className="eyebrow">03 / INSTAGRAM</span><h2>릴스·게시물</h2><p>인스타그램 링크 붙여넣기 → 소개 작성 → 홈페이지 공개</p><Link href="/#instagram">홈페이지 인스타그램 영역 ↗</Link></section>
    </div>
    <fieldset disabled className={styles.editor}>
      <legend>등록 화면 예시 · 연결 후 사용 가능</legend>
      <div className={styles.form}>
        <label>공개할 곳<select><option>수강생 후기</option><option>작업 예시</option></select></label>
        <label>사진 선택<input type="file" accept="image/jpeg,image/png,image/webp" /></label>
        <label>제목<input placeholder="공개할 사진의 제목" /></label>
        <label>공개할 이름<input placeholder="동의받은 이름 또는 닉네임" /></label>
        <label>수강한 수업·기수<input placeholder="관련 수업 또는 기수" /></label>
        <label>설명<textarea placeholder="고객에게 보여줄 이야기" /></label>
        <button className="button">연결 후 저장 가능</button>
      </div>
    </fieldset>
  </div>;
}
