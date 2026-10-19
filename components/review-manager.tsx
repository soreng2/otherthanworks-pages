"use client";

import { useState, type FormEvent } from "react";
import { createReviewClient, prepareReviewPhoto, type Review } from "@/lib/review-client";
import styles from "./reviews.module.css";
import { CourseManager } from "./course-manager";

export function ReviewManager() {
  const [client] = useState(createReviewClient);
  const [authorized, setAuthorized] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [reviews, setReviews] = useState<(Review & { imageUrl?: string })[]>([]);

  async function reload() {
    if (!client) return;
    const { data, error } = await client.from("reviews").select("*").order("created_at", { ascending: false });
    if (error) throw new Error("목록을 불러오지 못했습니다. 다시 시도해 주세요.");
    const rows = await Promise.all((data as Review[]).map(async row => {
      const { data } = await client.storage.from("review-photos").createSignedUrl(row.image_path, 300);
      return { ...row, imageUrl: data?.signedUrl };
    }));
    setReviews(rows);
  }

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!client) return;
    const form = new FormData(event.currentTarget);
    setBusy(true); setMessage("");
    try {
      const result = await client.auth.signInWithPassword({ email: String(form.get("email")), password: String(form.get("password")) });
      if (result.error) throw new Error("로그인 정보를 확인해 주세요.");
      const admin = await client.rpc("is_review_admin");
      if (admin.error || admin.data !== true) {
        await client.auth.signOut();
        throw new Error("후기 관리 권한이 없는 계정입니다.");
      }
      setAuthorized(true);
      await reload();
    } catch (error) { setMessage(error instanceof Error ? error.message : "로그인에 실패했습니다."); }
    finally { setBusy(false); }
  }

  async function upload(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!client) return;
    const element = event.currentTarget;
    const form = new FormData(element);
    const photo = form.get("photo");
    if (!(photo instanceof File) || !photo.size) return;
    setBusy(true); setMessage("");
    try {
      const image = await prepareReviewPhoto(photo);
      const path = `${crypto.randomUUID()}.jpg`;
      const uploaded = await client.storage.from("review-photos").upload(path, image, { contentType: "image/jpeg", upsert: false });
      if (uploaded.error) throw new Error("사진 저장에 실패했습니다. 로그인 상태와 연결을 확인해 주세요.");
      const inserted = await client.from("reviews").insert({
        title: String(form.get("title")).trim(), body: String(form.get("body")).trim(),
        alt: String(form.get("alt")).trim(), image_path: path,
        consent: form.get("consent") === "on", published: false,
      });
      if (inserted.error) {
        const cleanup = await client.storage.from("review-photos").remove([path]);
        throw new Error(cleanup.error ? "후기 저장에 실패했습니다. 미연결 사진이 남아 있어 저장소 확인이 필요합니다." : "후기 저장에 실패했습니다. 다시 시도해 주세요.");
      }
      element.reset();
      setMessage("비공개로 저장했습니다. 내용을 확인한 뒤 공개해 주세요.");
      await reload();
    } catch (error) { setMessage(error instanceof Error ? error.message : "저장하지 못했습니다."); }
    finally { setBusy(false); }
  }

  async function toggle(review: Review) {
    if (!client) return;
    setBusy(true); setMessage("");
    try {
      const { data, error } = await client.from("reviews").update({ published: !review.published }).eq("id", review.id).select("id");
      if (error || data?.length !== 1) throw new Error("공개 상태를 변경하지 못했습니다.");
      setMessage(review.published ? "비공개로 변경했습니다. 이미 열린 사진 링크는 최대 5분 뒤 만료됩니다." : "후기를 공개했습니다.");
      await reload();
    } catch (error) { setMessage(error instanceof Error ? error.message : "변경하지 못했습니다."); }
    finally { setBusy(false); }
  }

  if (!client) return <p className={styles.notice}>사진 저장소와 운영자 계정을 연결하는 중입니다. 연결이 완료되면 이곳에서 로그인해 후기를 올릴 수 있습니다.</p>;

  return <div className={styles.manager}>
    <p role="status" aria-live="polite">{message}</p>
    {!authorized ? <form onSubmit={login} className={styles.form}>
      <p>운영자 계정으로 로그인해 주세요.</p>
      <label>이메일<input name="email" type="email" autoComplete="username" required /></label>
      <label>비밀번호<input name="password" type="password" autoComplete="current-password" required /></label>
      <button className="button" disabled={busy}>{busy ? "확인 중…" : "로그인"}</button>
    </form> : <>
      <button className="text-link" disabled={busy} onClick={async () => {
        await client.auth.signOut({ scope: "local" }); setAuthorized(false); setReviews([]); setMessage("");
      }}>로그아웃</button>
      <CourseManager client={client} />
      <form onSubmit={upload} className={styles.form}>
        <h2>새 후기 올리기</h2>
        <label>제목<input name="title" maxLength={120} required /></label>
        <label>후기 내용<textarea name="body" rows={5} maxLength={3000} required /></label>
        <label>사진<input name="photo" type="file" accept="image/jpeg,image/png,image/webp" required /></label>
        <p>JPG·PNG·WebP, 최대 10MB. 업로드할 때 사진 크기를 줄이고 위치 정보를 제거합니다.</p>
        <label>사진 설명<input name="alt" maxLength={300} required placeholder="사진을 보지 못하는 분에게 전달할 설명" /></label>
        <label className={styles.check}><input name="consent" type="checkbox" required />사진과 후기의 공개 동의를 확인했습니다.</label>
        <button className="button" disabled={busy}>{busy ? "처리 중…" : "비공개로 저장"}</button>
      </form>
      <h2>등록한 후기</h2>
      {!reviews.length && <p>아직 등록한 후기가 없습니다.</p>}
      <div className={styles.grid}>{reviews.map(review => <article className={styles.card} key={review.id}>
        {/* Signed private storage URLs are short-lived and are not optimized/cached. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {review.imageUrl && <img src={review.imageUrl} alt={review.alt} />}
        <h3>{review.title}</h3><p>{review.body}</p>
        <p>{review.published ? "공개" : "비공개"}</p>
        <button className="button" disabled={busy} onClick={() => toggle(review)}>{review.published ? "비공개로 전환" : "공개하기"}</button>
      </article>)}</div>
    </>}
  </div>;
}
