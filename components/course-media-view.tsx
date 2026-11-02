"use client";

import { isCourseVideo } from "@/lib/course-media";
import styles from "./reviews.module.css";

export type DisplayMedia = { path: string; url: string; alt: string; caption?: string };
export function CourseMediaView({ items }: { items: DisplayMedia[] }) {
  return <div className={styles.detailPhotos}>{items.map(item => <figure key={item.path}>
    {isCourseVideo(item.path) ? <video src={item.url} controls playsInline preload="none" aria-label={item.alt || "상세 영상"} onError={event => { event.currentTarget.nextElementSibling?.removeAttribute("hidden"); }} /> :
      /* eslint-disable-next-line @next/next/no-img-element */
      <img src={item.url} alt={item.alt} loading="lazy" />}
    {isCourseVideo(item.path) && <p hidden role="status">영상을 재생하지 못했습니다. 페이지를 새로 열거나 다른 브라우저에서 확인해 주세요.</p>}
    {(item.caption || isCourseVideo(item.path)) && <figcaption style={{ whiteSpace: "pre-wrap", padding: "1rem 0", lineHeight: 1.8 }}>{item.caption || item.alt}</figcaption>}
  </figure>)}</div>;
}
