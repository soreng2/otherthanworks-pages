"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { site, type ClassDefinition } from "@/content/site";
import { defaultCourse, validPaymentUrl, type CourseContent } from "@/lib/course-content";
import { createReviewClient } from "@/lib/review-client";
import { ClassArtwork } from "./class-card";
import styles from "./reviews.module.css";

export function CourseDetails({ item }: { item: ClassDefinition }) {
  const [course, setCourse] = useState(defaultCourse(item));
  const [photos, setPhotos] = useState<{ url: string; alt: string }[]>([]);
  const [error, setError] = useState("");
  useEffect(() => {
    let active = true;
    async function load() {
      const client = createReviewClient();
      if (!client) return;
      try {
        const result = await client.from("course_content").select("*").eq("slug", item.slug).eq("stage", "published").maybeSingle();
        if (result.error) throw result.error;
        if (!result.data) {
          if (active) { setCourse(defaultCourse(item)); setPhotos([]); setError(""); }
          return;
        }
        const next = result.data as CourseContent;
        const images = await Promise.all(next.photos.map(async photo => {
          const signed = await client.storage.from("course-photos").createSignedUrl(photo.path, 300);
          if (!signed.data || signed.error) throw new Error("Photo unavailable");
          return { url: signed.data.signedUrl, alt: photo.alt };
        }));
        if (active) { setCourse(next); setPhotos(images); setError(""); }
      } catch {
        if (active) { setError("최신 안내를 불러오지 못했습니다. 일정과 결제는 문의 후 확인해 주세요."); setCourse(current => ({ ...current, payment_verified: false })); }
      }
    }
    void load();
    const interval = setInterval(() => { void load(); }, 240000);
    return () => { active = false; clearInterval(interval); };
  }, [item]);
  return <>
    <header className="page-heading">
      <nav className="breadcrumb" aria-label="현재 위치"><Link href="/">HOME</Link><span>/</span><Link href="/classes">CLASS</Link><span>/</span><span>{course.title}</span></nav>
      <span className="eyebrow">{item.category} · {course.cohort}</span>
      <h1>{course.title}</h1><p>{course.description}</p>
    </header>
    <div className="detail-grid">
      <div className="detail-art"><ClassArtwork item={item} /></div>
      <section className="detail-copy">
        <h2>수업 안내</h2>
        <dl className="detail-facts">
          <div><dt>기수</dt><dd>{course.cohort}</dd></div>
          <div><dt>기간·횟수</dt><dd>{course.duration}</dd></div>
          <div><dt>수강료</dt><dd>{course.price_label}</dd></div>
          <div><dt>일정·모집</dt><dd>{course.schedule}</dd></div>
        </dl>
        {error && <p role="status">{error}</p>}
        <div className="detail-links">
          <a className="button" href="#curriculum">커리큘럼 보기 ↓</a>
          <a className="text-link" href={site.instagram} target="_blank" rel="noopener noreferrer">Instagram으로 문의 <span className="sr-only">(새 탭)</span>↗</a>
        </div>
        {course.payment_verified && validPaymentUrl(course.payment_url) ? <div className={styles.summary}>
          <p>시작일과 잔여석을 먼저 확인해 주세요. 상품의 가격·일정·환불 기준을 확인한 뒤 스마트스토어에서 결제할 수 있습니다.</p>
          <a className="button" href={course.payment_url} target="_blank" rel="noopener noreferrer">스마트스토어에서 결제 <span className="sr-only">(새 탭)</span>↗</a>
        </div> : <div className={styles.summary}>
          <p>시작일과 잔여석을 먼저 문의해 주세요. 스마트스토어에서 원하는 수업과 기수·옵션을 선택하고 가격·환불 안내를 확인한 뒤 결제할 수 있습니다.</p>
          <a className="button" href={site.smartstore} target="_blank" rel="noopener noreferrer">스마트스토어에서 수업 선택하기 <span className="sr-only">(새 탭)</span>↗</a>
        </div>}
      </section>
    </div>
    <section id="curriculum" className="section">
      <span className="eyebrow">CURRICULUM</span><h2>이 수업에서 함께 할 내용</h2>
      <ul className={styles.curriculum}>{course.curriculum.split("\n").filter(line => line.trim()).map((line, index) => <li key={index}>{line}</li>)}</ul>
      <p>주제와 참여자의 진행 상황에 따라 세부 구성은 달라질 수 있습니다.</p>
    </section>
    {photos.length > 0 && <section aria-label="수업 상세 이미지" className={styles.detailPhotos}>
      {photos.map(photo => <figure key={photo.url}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={photo.url} alt={photo.alt} loading="lazy" />
      </figure>)}
    </section>}
    <Link className="back-link" href="/classes">← 모든 클래스로 돌아가기</Link>
  </>;
}
