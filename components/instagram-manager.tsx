"use client";

import { useEffect, useState, type FormEvent } from "react";
import type { SupabaseClient } from "@supabase/supabase-js";
import { normalizeInstagramUrl, type InstagramPost } from "@/lib/instagram";
import styles from "./reviews.module.css";

export function InstagramManager({ client }: { client: SupabaseClient }) {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [editing, setEditing] = useState<InstagramPost | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  async function reload() {
    const result = await client.from("instagram_posts").select("*").order("created_at", { ascending: false });
    if (result.error) throw new Error("인스타그램 목록을 불러오지 못했습니다.");
    setPosts(result.data as InstagramPost[]);
  }
  useEffect(() => {
    let active = true;
    void client.from("instagram_posts").select("*").order("created_at", { ascending: false }).then(({ data, error }) => {
      if (active) { if (error) setMessage("인스타그램 저장소 연결을 확인해 주세요."); else setPosts(data as InstagramPost[]); }
    });
    return () => { active = false; };
  }, [client]);
  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = new FormData(form);
    const url = normalizeInstagramUrl(String(values.get("url")));
    if (!url) { setMessage("Instagram 게시물 또는 릴스의 공유 링크를 입력해 주세요. 프로필 주소는 사용할 수 없습니다."); return; }
    setBusy(true); setMessage("");
    try {
      const payload = { title: String(values.get("title")).trim(), caption: String(values.get("caption")).trim(), url, published: false };
      const result = editing
        ? await client.from("instagram_posts").update(payload).eq("id", editing.id).select("id")
        : await client.from("instagram_posts").insert(payload).select("id");
      if (result.error || result.data?.length !== 1) throw new Error("저장하지 못했습니다.");
      form.reset(); setEditing(null); setMessage("비공개로 저장했습니다. 확인 후 공개하기를 눌러 주세요."); await reload();
    } catch (error) { setMessage(error instanceof Error ? error.message : "저장하지 못했습니다."); }
    finally { setBusy(false); }
  }
  async function toggle(post: InstagramPost) {
    setBusy(true);
    try {
      const result = await client.from("instagram_posts").update({ published: !post.published }).eq("id", post.id).select("id");
      if (result.error || result.data?.length !== 1) throw new Error("공개 상태를 변경하지 못했습니다.");
      await reload(); setMessage(post.published ? "비공개로 변경했습니다." : "홈페이지에 공개했습니다.");
    } catch (error) { setMessage(error instanceof Error ? error.message : "변경하지 못했습니다."); }
    finally { setBusy(false); }
  }
  return <section id="manage-instagram" className={styles.manager}>
    <h2>인스타그램 릴스·게시물</h2>
    <p>공식 계정의 공개 게시물에서 ‘링크 복사’를 눌러 붙여 주세요. 공개한 항목은 홈페이지에 나타납니다.</p>
    <p role="status">{message}</p>
    <form key={editing?.id ?? "new"} onSubmit={save} className={styles.form}>
      <label>게시물 제목<input name="title" required maxLength={120} defaultValue={editing?.title} /></label>
      <label>인스타그램 링크<input name="url" type="url" required defaultValue={editing?.url} placeholder="https://www.instagram.com/reel/…/" /></label>
      <label>짧은 소개<textarea name="caption" maxLength={2000} defaultValue={editing?.caption} /></label>
      <p>수정한 게시물도 비공개로 저장됩니다. 본인 계정의 공개 가능한 게시물만 등록해 주세요.</p>
      <div className={styles.actions}><button className="button" disabled={busy}>비공개로 저장</button>{editing && <button type="button" disabled={busy} onClick={() => setEditing(null)}>수정 취소</button>}</div>
    </form>
    <div className={styles.grid}>{posts.map(post => <article key={post.id} className={styles.card}>
      <h3>{post.title}</h3><p>{post.caption}</p><p>{post.published ? "공개" : "비공개"}</p>
      <a href={normalizeInstagramUrl(post.url) ?? "#"} target="_blank" rel="noopener noreferrer">원본 확인 ↗<span className="sr-only"> (새 탭)</span></a>
      <div className={styles.actions}>
        <button disabled={busy} onClick={() => { setEditing(post); document.getElementById("manage-instagram")?.scrollIntoView(); }}>수정</button>
        <button disabled={busy} onClick={() => { void toggle(post); }}>{post.published ? "비공개로 전환" : "공개하기"}</button>
      </div>
    </article>)}</div>
  </section>;
}
