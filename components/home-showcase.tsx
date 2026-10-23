import Link from "next/link";
import { ReviewGallery } from "./review-gallery";
import { InstagramFeed } from "./instagram-feed";
import { Reveal } from "./reveal";

export function HomeShowcase() {
  return <>
    <section className="showcase-section section"><div className="wrap"><Reveal>
      <div className="section-heading"><div><span className="eyebrow">MADE HERE / WORK & STORIES</span><h2>좋아하는 마음이<br />작업으로 남는 순간.</h2><p>함께 만든 결과물과 수업에서 시작된 이야기를 모읍니다.</p></div><Link className="text-link" href="/work">작업 예시 더 보기 ↗</Link></div>
      <ReviewGallery kind="example" limit={3} />
      <div className="story-heading"><h3>수업을 함께한 이야기</h3><Link href="/reviews" className="text-link">후기 더 보기 ↗</Link></div>
      <ReviewGallery limit={3} />
    </Reveal></div></section>
    <section id="instagram" className="instagram-section section"><div className="wrap"><Reveal>
      <div className="section-heading"><div><span className="eyebrow">IN THE STUDIO / @OTHER.THAN.WORKS</span><h2>완성된 그림 너머,<br />만드는 날들의 기록.</h2><p>그리는 손, 쌓이는 아이디어, 작업실의 작은 장면들.</p></div><span className="social-stamp" aria-hidden="true">PLAY<br />& MAKE ↗</span></div>
      <InstagramFeed />
    </Reveal></div></section>
  </>;
}
