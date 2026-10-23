"use client";

import { useEffect, useState } from "react";
import { classes } from "@/content/site";
import { createReviewClient } from "@/lib/review-client";
import type { CourseContent } from "@/lib/course-content";
import { ClassCard, type ClassListing } from "./class-card";
import styles from "./course-board.module.css";

export function CourseList() {
  const [items, setItems] = useState<ClassListing[]>(classes);
  const [filter, setFilter] = useState("all");
  useEffect(() => {
    let active = true;
    async function load() {
      const client = createReviewClient();
      if (!client) return;
      const { data, error } = await client.from("course_content").select("*").eq("stage", "published");
      if (!active || error || !data) return;
      const rows = data as CourseContent[];
      const next = await Promise.all(classes.map(async item => {
        const row = rows.find(row => row.slug === item.slug);
        if (!row) return item;
        const photo = row.photos[0];
        const signed = photo ? await client.storage.from("course-photos").createSignedUrl(photo.path, 300) : null;
        return { ...item, title: row.title, description: row.description, cohort: row.cohort, duration: row.duration, priceLabel: row.price_label, scheduleLabel: row.schedule, coverUrl: signed?.data?.signedUrl, coverAlt: photo?.alt };
      }));
      if (active) setItems(next);
    }
    void load();
    const timer = setInterval(() => { void load(); }, 240000);
    return () => { active = false; clearInterval(timer); };
  }, []);
  const filters = [{ id: "all", label: "전체" }, { id: "drawing-routine", label: "정규반" }, { id: "content-studio", label: "콘텐츠" }, { id: "portfolio-ready", label: "포트폴리오" }, { id: "pictureforge", label: "그림책" }, { id: "emoticon", label: "이모티콘" }];
  const visible = items.filter(item => filter === "all" || item.slug === filter);
  return <><div className={styles.filters} role="group" aria-label="수업 분야 선택">{filters.map(item => <button key={item.id} aria-pressed={filter === item.id} onClick={() => setFilter(item.id)}>{item.label}</button>)}</div>
    <p className={styles.count} role="status">{visible.length}개의 수업 안내</p>
    <div className={styles.grid}>{visible.map(item => <ClassCard key={item.slug} item={item} />)}</div>
  </>;
}
