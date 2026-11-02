"use client";
import { useEffect, useRef, useState } from "react";
import { MEDIA_ACCEPT, prepareCourseVideo } from "@/lib/course-media";
import { prepareReviewPhoto } from "@/lib/review-client";
import { CourseMediaView, type DisplayMedia } from "./course-media-view";
import styles from "./reviews.module.css";

export function MediaSandbox() {
  const [items, setItems] = useState<DisplayMedia[]>([]);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const urls = useRef(new Set<string>());
  useEffect(() => { const allocated = urls.current; return () => { allocated.forEach(url => URL.revokeObjectURL(url)); allocated.clear(); }; }, []);
  async function add(files: FileList | null) {
    if (!files?.length) return;
    if (items.length + files.length > 20) { setMessage("사진·영상은 합계 20개까지 선택해 주세요."); return; }
    setBusy(true); setMessage("");
    const added: DisplayMedia[] = [];
    try {
      for (const file of Array.from(files)) {
        const video = file.type.startsWith("video/");
        const extension = video ? await prepareCourseVideo(file) : "jpg";
        const blob = video ? file : await prepareReviewPhoto(file, true);
        const url = URL.createObjectURL(blob); urls.current.add(url);
        added.push({ path: `${crypto.randomUUID()}.${extension}`, url, alt: file.name, caption: "" });
      }
    } catch (error) { setMessage(error instanceof Error ? error.message : "파일을 읽지 못했습니다."); }
    finally { setItems(current => [...current, ...added]); setBusy(false); }
  }
  function move(index: number, offset: number) {
    setItems(current => { const next = [...current]; [next[index], next[index + offset]] = [next[index + offset], next[index]]; return next; });
  }
  return <section className={styles.manager} id="media-preview">
    <h2>내 사진·영상으로 상세페이지 미리보기</h2>
    <p>이 체험은 파일을 서버에 보내지 않습니다. 선택한 파일은 이 브라우저에서만 보이며 새로고침하면 사라집니다. 고객 사이트에 저장·공개하려면 관리자 계정과 저장소 연결이 필요합니다.</p>
    <fieldset disabled={busy} className={styles.editor}><legend>파일 선택 및 순서 편집</legend>
      <label>미리볼 사진·영상 선택<input type="file" multiple accept={MEDIA_ACCEPT} onChange={event => { void add(event.target.files); event.target.value = ""; }} /></label>
      <p>JPG·PNG·WebP 10MB 이하 / MP4·WebM 50MB 이하 / 합계 20개</p>
      <p role="status">{busy ? "파일을 준비하고 있습니다…" : message}</p>
      {items.map((item, index) => <div className={styles.form} key={item.path}>
        <label>자료 {index + 1} 설명<input maxLength={300} value={item.alt} onChange={event => setItems(current => current.map(row => row.path === item.path ? { ...row, alt: event.target.value } : row))} /></label>
        <label>자료 {index + 1} 본문·영상 대본<textarea maxLength={5000} value={item.caption} onChange={event => setItems(current => current.map(row => row.path === item.path ? { ...row, caption: event.target.value } : row))} /></label>
        <div className={styles.actions}><button disabled={index === 0} onClick={() => move(index, -1)}>자료 {index + 1} 위로</button><button disabled={index === items.length - 1} onClick={() => move(index, 1)}>자료 {index + 1} 아래로</button><button onClick={() => { URL.revokeObjectURL(item.url); urls.current.delete(item.url); setItems(current => current.filter(row => row.path !== item.path)); }}>자료 {index + 1} 제거</button></div>
      </div>)}
    </fieldset>
    {items.length > 0 && <section aria-label="첨부한 자료 상세페이지 미리보기"><h3>상세페이지 미리보기 · 미공개</h3><CourseMediaView items={items} /></section>}
  </section>;
}
