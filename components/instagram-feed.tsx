"use client";

import { useEffect, useState } from "react";
import { createReviewClient } from "@/lib/review-client";
import { normalizeInstagramUrl, type InstagramPost } from "@/lib/instagram";
import { site } from "@/content/site";
import styles from "./showcase.module.css";

export function InstagramCard({ post }: { post: InstagramPost }) {
  const [loaded, setLoaded] = useState(false);
  const url = normalizeInstagramUrl(post.url);
  if (!url) return null;
  return <article className={styles.socialCard}>
    <span className="eyebrow">{url.includes("/reel/") ? "REEL / 움직이는 작업 노트" : "POST / 작업실의 기록"}</span>
    <h3>{post.title}</h3>
    {post.caption && <p>{post.caption}</p>}
    {loaded ? <>
      <iframe src={`${url}embed/`} title={`${post.title} — Instagram`} loading="lazy" allow="autoplay; encrypted-media; fullscreen; picture-in-picture" referrerPolicy="strict-origin-when-cross-origin" sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox" />
      <button className="text-link" onClick={() => setLoaded(false)}>콘텐츠 닫기</button>
    </> : <div className={styles.socialCover}>
      <span aria-hidden="true" className={styles.play}>↗</span>
      <button className="button" onClick={() => setLoaded(true)}>여기서 {url.includes("/reel/") ? "릴스" : "게시물"} 보기</button>
      <p>누르면 Instagram에 연결되어 쿠키 등 해당 서비스의 정책이 적용됩니다.</p>
    </div>}
    <a className="text-link" href={url} target="_blank" rel="noopener noreferrer">Instagram에서 원본 보기 ↗<span className="sr-only"> (새 탭)</span></a>
    {loaded && <p className={styles.small}>표시되지 않거나 로그인이 필요하면 원본 링크에서 확인해 주세요.</p>}
  </article>;
}

export function InstagramFeed() {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [status, setStatus] = useState("작업실의 기록을 불러오는 중입니다.");
  useEffect(() => {
    let active = true;
    async function load() {
      const client = createReviewClient();
      if (!client) { if (active) setStatus("새로운 기록은 공식 Instagram에서 먼저 만나보세요."); return; }
      const { data, error } = await client.from("instagram_posts").select("*").eq("published", true).order("created_at", { ascending: false }).limit(12);
      if (active) {
        setPosts(error ? [] : (data as InstagramPost[]));
        setStatus(error ? "기록을 불러오지 못했습니다. 공식 Instagram에서 확인해 주세요." : data.length ? "" : "새로운 기록은 공식 Instagram에서 먼저 만나보세요.");
      }
    }
    void load();
    return () => { active = false; };
  }, []);
  return <>
    {status && <p role="status">{status}</p>}
    <div className={styles.socialGrid}>{posts.map(post => <InstagramCard key={post.id} post={post} />)}</div>
    <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="text-link">@other.than.works 방문하기 ↗<span className="sr-only"> (새 탭)</span></a>
  </>;
}
