"use client";
import { SiteText } from "@/components/site-copy";
import { useEffect, useState } from "react";
import Link from "next/link";
import { site, type ClassDefinition } from "@/content/site";
import { defaultCourse, validPaymentUrl, enrollmentLabel, canApply, type CourseContent } from "@/lib/course-content";
import { createReviewClient } from "@/lib/review-client";
import { courseMediaBucket } from "@/lib/course-media";
import { CourseMediaView, type DisplayMedia } from "./course-media-view";
import { ClassArtwork } from "./class-card";
import styles from "./reviews.module.css";
export function CourseDetails({ item }: {
    item: ClassDefinition;
}) {
    const [course, setCourse] = useState(defaultCourse(item));
    const [photos, setPhotos] = useState<DisplayMedia[]>([]);
    const [error, setError] = useState("");
    useEffect(() => {
        let active = true;
        const mediaCache = new Map<string, {
            url: string;
            until: number;
        }>();
        async function load() {
            const client = createReviewClient();
            if (!client)
                return;
            try {
                const result = await client.from("course_content").select("*").eq("slug", item.slug).eq("stage", "published").maybeSingle();
                if (result.error)
                    throw result.error;
                if (!result.data) {
                    if (active) {
                        setCourse(defaultCourse(item));
                        setPhotos([]);
                        setError("");
                    }
                    return;
                }
                const next = result.data as CourseContent;
                const images = await Promise.all(next.photos.map(async (photo) => {
                    const cached = mediaCache.get(photo.path);
                    if (cached && cached.until > Date.now())
                        return { ...photo, url: cached.url };
                    const signed = await client.storage.from(courseMediaBucket(photo.path)).createSignedUrl(photo.path, 3600);
                    if (!signed.data || signed.error)
                        throw new Error("Photo unavailable");
                    mediaCache.set(photo.path, { url: signed.data.signedUrl, until: Date.now() + 3300000 });
                    return { ...photo, url: signed.data.signedUrl };
                }));
                if (active) {
                    setCourse(next);
                    setPhotos(images);
                    setError("");
                }
            }
            catch {
                if (active) {
                    setError("최신 안내를 불러오지 못했습니다. 일정과 결제는 문의 후 확인해 주세요.");
                    setCourse(current => ({ ...current, payment_verified: false }));
                }
            }
        }
        void load();
        const interval = setInterval(() => { void load(); }, 240000);
        return () => { active = false; clearInterval(interval); };
    }, [item]);
    return <>
    <header className="page-heading">
      <nav className="breadcrumb" aria-label="현재 위치"><Link href="/"><SiteText>{"HOME"}</SiteText></Link><span><SiteText>{"/"}</SiteText></span><Link href="/classes"><SiteText>{"CLASS"}</SiteText></Link><span><SiteText>{"/"}</SiteText></span><span><SiteText>{course.title}</SiteText></span></nav>
      <span className="eyebrow"><SiteText>{item.category}</SiteText><SiteText>{" \u00B7 "}</SiteText><SiteText>{course.cohort}</SiteText></span>
      <h1><SiteText>{course.title}</SiteText></h1><p><SiteText>{course.description}</SiteText></p>
    </header>
    <div className="detail-grid">
      <div className="detail-art"><ClassArtwork item={item}/></div>
      <section className="detail-copy">
        <h2><SiteText>{"수업 안내"}</SiteText></h2>
        <dl className="detail-facts">
          <div><dt><SiteText>{"모집 상태"}</SiteText></dt><dd>{enrollmentLabel(course.enrollment_status)}</dd></div>
          <div><dt><SiteText>{"기수"}</SiteText></dt><dd><SiteText>{course.cohort}</SiteText></dd></div>
          <div><dt><SiteText>{"기간\u00B7횟수"}</SiteText></dt><dd><SiteText>{course.duration}</SiteText></dd></div>
          <div><dt><SiteText>{"수강료"}</SiteText></dt><dd><SiteText>{course.price_label}</SiteText></dd></div>
          <div><dt><SiteText>{"일정\u00B7모집"}</SiteText></dt><dd><SiteText>{course.schedule}</SiteText></dd></div>
        </dl>
        {error && <p role="status">{error}</p>}
        <div className="detail-links">
          <a className="button" href="#curriculum"><SiteText>{"커리큘럼 보기 \u2193"}</SiteText></a>
          <a className="text-link" href={site.instagram} target="_blank" rel="noopener noreferrer"><SiteText>{"Instagram으로 문의 "}</SiteText><span className="sr-only"><SiteText>{"(새 탭)"}</SiteText></span><SiteText>{"\u2197"}</SiteText></a>
        </div>
        <SiteText>{!canApply(course.enrollment_status) ? <div className={styles.summary}><p><SiteText>{course.enrollment_status === "closed" ? "이번 모집은 마감되었습니다. 다음 수업 안내는 Instagram으로 문의해 주세요." : "모집을 준비하고 있습니다. 일정은 Instagram으로 문의해 주세요."}</SiteText></p></div> : course.payment_verified && validPaymentUrl(course.payment_url) ? <div className={styles.summary}>
          <p><SiteText>{"시작일과 잔여석을 먼저 확인해 주세요. 상품의 가격\u00B7일정\u00B7환불 기준을 확인한 뒤 스마트스토어에서 결제할 수 있습니다."}</SiteText></p>
          <a className="button" href={course.payment_url} target="_blank" rel="noopener noreferrer"><SiteText>{"스마트스토어에서 결제 "}</SiteText><span className="sr-only"><SiteText>{"(새 탭)"}</SiteText></span><SiteText>{"\u2197"}</SiteText></a>
        </div> : <div className={styles.summary}>
          <p><SiteText>{"시작일과 잔여석을 먼저 문의해 주세요. 스마트스토어에서 원하는 수업과 기수\u00B7옵션을 선택하고 가격\u00B7환불 안내를 확인한 뒤 결제할 수 있습니다."}</SiteText></p>
          <a className="button" href={site.smartstore} target="_blank" rel="noopener noreferrer"><SiteText>{"스마트스토어에서 수업 선택하기 "}</SiteText><span className="sr-only"><SiteText>{"(새 탭)"}</SiteText></span><SiteText>{"\u2197"}</SiteText></a>
        </div>}</SiteText>
      </section>
    </div>
    <section id="curriculum" className="section">
      <span className="eyebrow"><SiteText>{"CURRICULUM"}</SiteText></span><h2><SiteText>{"이 수업에서 함께 할 내용"}</SiteText></h2>
      <ul className={styles.curriculum}>{course.curriculum.split("\n").filter(line => line.trim()).map((line, index) => <li key={index}><SiteText>{line}</SiteText></li>)}</ul>
      <p><SiteText>{"주제와 참여자의 진행 상황에 따라 세부 구성은 달라질 수 있습니다."}</SiteText></p>
    </section>
    {photos.length > 0 && <section aria-label="수업 상세 사진과 영상"><h2><SiteText>{"수업을 더 자세히 만나보세요"}</SiteText></h2><CourseMediaView items={photos}/></section>}
    <Link className="back-link" href="/classes"><SiteText>{"\u2190 모든 클래스로 돌아가기"}</SiteText></Link>
  </>;
}
