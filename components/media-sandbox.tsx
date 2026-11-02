"use client";
import { useEffect, useRef, useState } from "react";
import { saveLocalDraft, loadLocalDraft } from "@/lib/local-post-draft";
import { MEDIA_ACCEPT, prepareCourseVideo } from "@/lib/course-media";
import { prepareReviewPhoto } from "@/lib/review-client";
import { CourseMediaView, type DisplayMedia } from "./course-media-view";
import styles from "./reviews.module.css";

export function MediaSandbox() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("수업 상세페이지");
  const [preview, setPreview] = useState(false);
  const blobs = useRef(new Map<string, Blob>());
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
        const url = URL.createObjectURL(blob); urls.current.add(url); blobs.current.set(url, blob);
        added.push({ path: `${crypto.randomUUID()}.${extension}`, url, alt: file.name, caption: "" });
      }
    } catch (error) { setMessage(error instanceof Error ? error.message : "파일을 읽지 못했습니다."); }
    finally { setItems(current => [...current, ...added]); setBusy(false); }
  }
  function move(index: number, offset: number) {
    setItems(current => { const next = [...current]; [next[index], next[index + offset]] = [next[index + offset], next[index]]; return next; });
  }
  async function save() {
    setBusy(true);
    try {
      await saveLocalDraft({ title, body, category, files: items.map(item => ({ path: item.path, alt: item.alt, caption: item.caption, blob: blobs.current.get(item.url)! })) });
      setMessage("이 브라우저에 글과 첨부파일을 임시저장했습니다. 고객에게 공개되지는 않았습니다.");
    } catch (error) { setMessage(error instanceof Error ? error.message : "저장하지 못했습니다."); }
    finally { setBusy(false); }
  }
  async function restore() {
    if ((title || body || items.length) && !window.confirm("지금 작성 중인 내용을 임시저장한 글로 바꿀까요?")) return;
    setBusy(true);
    try {
      const draft = await loadLocalDraft();
      if (!draft) { setMessage("임시저장한 글이 없습니다."); return; }
      const next = draft.files.map(file => { const url = URL.createObjectURL(file.blob); urls.current.add(url); blobs.current.set(url, file.blob); return { path: file.path, alt: file.alt, caption: file.caption, url }; });
      items.forEach(item => { URL.revokeObjectURL(item.url); urls.current.delete(item.url); blobs.current.delete(item.url); });
      setItems(next); setTitle(draft.title); setBody(draft.body); setCategory(draft.category);
      setMessage("임시저장한 글과 첨부파일을 불러왔습니다.");
    } catch (error) { setMessage(error instanceof Error ? error.message : "불러오지 못했습니다."); }
    finally { setBusy(false); }
  }
  return <section className={styles.manager} id="media-preview">
    <h2>새 글 쓰기</h2>
    <p>제목과 내용을 쓰고 사진·영상을 첨부해 주세요. ‘내 브라우저에 임시저장’을 누르면 나중에 이어 쓸 수 있습니다. 임시저장은 이 기기·브라우저에만 보관되며 고객에게 공개되지 않습니다. 브라우저 데이터를 삭제하면 함께 지워집니다.</p>
    <fieldset disabled={busy} className={styles.editor}><legend>글 작성</legend>
      <div className={styles.form}>
        <label>글 종류<select value={category} onChange={event => setCategory(event.target.value)}><option>수업 상세페이지</option><option>수강생 후기</option><option>작업 예시</option></select></label>
        <label>제목<input placeholder="제목을 입력하세요" maxLength={120} value={title} onChange={event => setTitle(event.target.value)} /></label>
        <label htmlFor="post-body">본문</label><textarea id="post-body" rows={10} placeholder="블로그처럼 내용을 자유롭게 작성하세요" maxLength={10000} value={body} onChange={event => setBody(event.target.value)} />
      </div>
      <label>사진·영상 파일 첨부<input type="file" multiple accept={MEDIA_ACCEPT} onChange={event => { void add(event.target.files); event.target.value = ""; }} /></label>
      <p>JPG·PNG·WebP 10MB 이하 / MP4·WebM 50MB 이하 / 합계 20개</p>
      <p role="status">{busy ? "파일을 준비하고 있습니다…" : message}</p>
      {items.map((item, index) => <div className={styles.form} key={item.path}>
        <label>자료 {index + 1} 설명<input maxLength={300} value={item.alt} onChange={event => setItems(current => current.map(row => row.path === item.path ? { ...row, alt: event.target.value } : row))} /></label>
        <label>자료 {index + 1} 본문·영상 대본<textarea maxLength={5000} value={item.caption} onChange={event => setItems(current => current.map(row => row.path === item.path ? { ...row, caption: event.target.value } : row))} /></label>
        <div className={styles.actions}><button disabled={index === 0} onClick={() => move(index, -1)}>자료 {index + 1} 위로</button><button disabled={index === items.length - 1} onClick={() => move(index, 1)}>자료 {index + 1} 아래로</button><button onClick={() => { URL.revokeObjectURL(item.url); urls.current.delete(item.url); blobs.current.delete(item.url); setItems(current => current.filter(row => row.path !== item.path)); }}>자료 {index + 1} 제거</button></div>
      </div>)}
      <div className={styles.actions}>
        <button className="button" onClick={() => setPreview(!preview)} aria-expanded={preview}>미리보기 {preview ? "닫기" : "열기"}</button>
        <button onClick={() => { void save(); }}>내 브라우저에 임시저장</button>
        <button onClick={() => { void restore(); }}>임시저장 불러오기</button>
      </div>
      <p>임시저장은 글 1개를 보관하며 다시 저장하면 이전 글을 대체합니다. 사이트에 공개하는 기능은 계정·저장소 연결 후 사용할 수 있습니다.</p>
    </fieldset>
    {preview && <section aria-label="첨부한 자료 상세페이지 미리보기"><p>{category} · 미공개 미리보기</p><h3>{title || "제목 없는 글"}</h3><p style={{ whiteSpace: "pre-wrap", lineHeight: 1.9 }}>{body}</p><CourseMediaView items={items} /></section>}
  </section>;
}
