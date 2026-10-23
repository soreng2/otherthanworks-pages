"use client";

import { useEffect, useState } from "react";
import type { SupabaseClient } from "@supabase/supabase-js";
import { classes } from "@/content/site";
import { defaultCourse, validateCourse, type CourseContent } from "@/lib/course-content";
import { prepareReviewPhoto } from "@/lib/review-client";
import styles from "./reviews.module.css";

export function CourseManager({ client }: { client: SupabaseClient }) {
  const [slug, setSlug] = useState(classes[0].slug);
  const [course, setCourse] = useState(defaultCourse(classes[0]));
  const [busy, setBusy] = useState(true);
  const [dirty, setDirty] = useState(false);
  const [ready, setReady] = useState(false);
  const [message, setMessage] = useState("");
  const [imageUrls, setImageUrls] = useState<Record<string, string>>({});

  useEffect(() => {
    let active = true;
    async function load() {
      const { data, error } = await client.from("course_content").select("*").eq("slug", slug);
      if (!active) return;
      if (error) { setMessage("수업을 불러오지 못했습니다. 연결을 확인해 주세요."); setBusy(false); return; }
      const rows = data as CourseContent[];
      const next = rows.find(row => row.stage === "draft") ?? rows.find(row => row.stage === "published") ?? defaultCourse(classes.find(item => item.slug === slug)!);
      const urls: Record<string, string> = {};
      for (const photo of next.photos) {
        const result = await client.storage.from("course-photos").createSignedUrl(photo.path, 300);
        if (result.data) urls[photo.path] = result.data.signedUrl;
      }
      if (active) { setCourse(next); setImageUrls(urls); setDirty(false); setReady(true); setBusy(false); }
    }
    void load();
    return () => { active = false; };
  }, [client, slug]);

  useEffect(() => {
    const warn = (event: BeforeUnloadEvent) => { if (dirty) event.preventDefault(); };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  function edit<K extends keyof CourseContent>(key: K, value: CourseContent[K]) {
    setCourse(current => ({ ...current, [key]: value })); setDirty(true);
  }

  async function save(publish: boolean) {
    const invalid = validateCourse(course);
    if (invalid) { setMessage(invalid); return; }
    setBusy(true); setMessage("");
    try {
      const draft = await client.from("course_content").upsert({ ...course, stage: "draft" }).select("slug");
      if (draft.error || draft.data?.length !== 1) throw new Error("초안을 저장하지 못했습니다.");
      if (publish) {
        const live = await client.from("course_content").upsert({ ...course, stage: "published" }).select("slug");
        if (live.error || live.data?.length !== 1) throw new Error("초안은 저장했지만 공개하지 못했습니다. 다시 시도해 주세요.");
      }
      setDirty(false);
      setMessage(publish ? "수업 상세페이지에 반영했습니다. 새로 열어서 확인해 주세요." : "초안을 저장했습니다. 공개된 페이지는 변경되지 않습니다.");
    } catch (error) { setMessage(error instanceof Error ? error.message : "저장하지 못했습니다."); }
    finally { setBusy(false); }
  }

  async function upload(files: FileList | null) {
    if (!files?.length) return;
    if (course.photos.length + files.length > 20) { setMessage("사진은 수업당 20장까지 등록할 수 있습니다."); return; }
    setBusy(true); setMessage("");
    const added: { path: string; alt: string }[] = [];
    const urls: Record<string, string> = {};
    try {
      for (const file of Array.from(files)) {
        const blob = await prepareReviewPhoto(file, true);
        const path = `${crypto.randomUUID()}.jpg`;
        const result = await client.storage.from("course-photos").upload(path, blob, { contentType: "image/jpeg", upsert: false });
        if (result.error) throw new Error("사진 업로드에 실패했습니다.");
        added.push({ path, alt: "" });
        const url = await client.storage.from("course-photos").createSignedUrl(path, 300);
        if (url.data) urls[path] = url.data.signedUrl;
      }
      setMessage("사진 설명을 입력한 뒤 초안 저장 또는 공개 반영을 눌러 주세요.");
    } catch (error) { setMessage(`${error instanceof Error ? error.message : "사진을 처리하지 못했습니다."} 성공한 사진은 편집 화면에 남겨두었습니다.`); }
    finally {
      if (added.length) { edit("photos", [...course.photos, ...added]); setImageUrls(current => ({ ...current, ...urls })); }
      setBusy(false);
    }
  }

  function move(index: number, direction: number) {
    const photos = [...course.photos];
    [photos[index], photos[index + direction]] = [photos[index + direction], photos[index]];
    edit("photos", photos);
  }

  return <section className={styles.manager}>
    <h2>수업 상세페이지 관리</h2>
    <p>커리큘럼·사진·가격·일정·결제 상품을 수정한 뒤 ‘공개 페이지에 반영’을 눌러 주세요.</p>
    <p role="status">{message}</p>
    <label className={styles.form}>수업 선택<select value={slug} disabled={busy} onChange={event => {
      if (dirty && !window.confirm("저장하지 않은 수정 내용을 버리고 다른 수업으로 이동할까요?")) return;
      setBusy(true); setReady(false); setMessage(""); setSlug(event.target.value);
    }}>{classes.map(item => <option value={item.slug} key={item.slug}>{item.title}</option>)}</select></label>
    <fieldset disabled={busy || !ready} className={styles.editor}>
      <legend className="sr-only">수업 내용</legend>
      <div className={styles.form}>
        <label>수업명<input value={course.title} maxLength={120} onChange={event => edit("title", event.target.value)} /></label>
        <label>소개<textarea value={course.description} maxLength={1500} onChange={event => edit("description", event.target.value)} /></label>
        <label>기수<input value={course.cohort} maxLength={50} onChange={event => edit("cohort", event.target.value)} /></label>
        <label>기간·횟수<input value={course.duration} maxLength={200} onChange={event => edit("duration", event.target.value)} /></label>
        <label>수강료<input value={course.price_label} maxLength={200} onChange={event => edit("price_label", event.target.value)} /></label>
        <label>요일·시간·모집 안내<textarea value={course.schedule} maxLength={500} onChange={event => edit("schedule", event.target.value)} /></label>
        <label>커리큘럼 — 항목마다 줄바꿈<textarea rows={8} value={course.curriculum} maxLength={10000} onChange={event => edit("curriculum", event.target.value)} /></label>
        <label>스마트스토어 상품 주소<input type="url" value={course.payment_url} placeholder="https://smartstore.naver.com/monmut/products/상품번호" onChange={event => { edit("payment_url", event.target.value.trim()); edit("payment_verified", false); }} /></label>
        <label className={styles.check}><input type="checkbox" checked={course.payment_verified} onChange={event => edit("payment_verified", event.target.checked)} />상품의 수업·기수·가격·판매 상태·환불 안내를 확인했으며 결제 버튼을 공개합니다.</label>
        <p>결제와 주문 확인은 스마트스토어에서 처리합니다. 홈페이지에서는 결제 완료나 수강 확정을 표시하지 않습니다.</p>
        <label>상세페이지 사진 추가<input type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={event => { void upload(event.target.files); event.target.value = ""; }} /></label>
        <p>첫 번째 사진은 홈과 클래스 공고의 대표 이미지로도 사용됩니다. 사진당 10MB, 최대 20장. 긴 상세페이지는 여러 장으로 나눠 올려 주세요. 공개 가능한 사진만 등록해 주세요.</p>
      </div>
      <div className={styles.grid}>{course.photos.map((photo, index) => <article className={styles.card} key={photo.path}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {imageUrls[photo.path] && <img src={imageUrls[photo.path]} alt={photo.alt || "등록한 상세 사진 미리보기"} />}
        <label>사진 {index + 1} 설명<input value={photo.alt} maxLength={300} onChange={event => edit("photos", course.photos.map((item, i) => i === index ? { ...item, alt: event.target.value } : item))} /></label>
        <div className={styles.actions}>
          <button disabled={index === 0} onClick={() => move(index, -1)}>위로</button>
          <button disabled={index === course.photos.length - 1} onClick={() => move(index, 1)}>아래로</button>
          <button onClick={() => edit("photos", course.photos.filter((_, i) => i !== index))}>상세페이지에서 제외</button>
        </div>
      </article>)}</div>
      <div className={styles.actions}>
        <button className="button" onClick={() => { void save(false); }}>초안 저장</button>
        <button className="button" onClick={() => { void save(true); }}>공개 페이지에 반영</button>
      </div>
    </fieldset>
  </section>;
}
