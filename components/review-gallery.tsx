"use client";

import { useEffect, useState } from "react";
import { createReviewClient, type Review } from "@/lib/review-client";
import styles from "./reviews.module.css";

export function ReviewGallery({ kind = "review", limit = 60 }: { kind?: "review" | "example"; limit?: number }) {
  const [reviews, setReviews] = useState<(Review & { imageUrl: string })[]>([]);
  const [status, setStatus] = useState("후기를 불러오는 중입니다.");
  useEffect(() => {
    let active = true;
    async function load() {
      const client = createReviewClient();
      if (!client) { if (active) setStatus("공개할 수강생 후기와 작업을 준비하고 있습니다."); return; }
      try {
        const { data, error } = await client.from("reviews").select("*").eq("published", true).eq("kind", kind).order("created_at", { ascending: false }).limit(limit);
        if (error) throw error;
        const rows = await Promise.all((data as Review[]).map(async review => {
          const result = await client.storage.from("review-photos").createSignedUrl(review.image_path, 300);
          if (result.error || !result.data) throw new Error("Photo unavailable");
          return { ...review, imageUrl: result.data.signedUrl };
        }));
        if (active) { setReviews(rows); setStatus(rows.length ? "" : "공개할 수강생 후기와 작업을 준비하고 있습니다."); }
      } catch { if (active) { setReviews([]); setStatus("사진을 불러오지 못했습니다. 잠시 후 다시 방문해 주세요."); } }
    }
    void load();
    const timer = setInterval(() => { void load(); }, 240_000);
    return () => { active = false; clearInterval(timer); };
  }, [kind, limit]);
  return <><p role="status" className={styles.notice}>{status}</p><div className={styles.grid}>
    {reviews.map(review => <article key={review.id} className={styles.card}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={review.imageUrl} alt={review.alt} loading="lazy" />
      <span className="eyebrow">{kind === "example" ? "WORK / 작업 예시" : "CLASS STORY / 수강 후기"}</span>
      <h3>{review.title}</h3><p>{review.body}</p>
    </article>)}
  </div></>;
}
