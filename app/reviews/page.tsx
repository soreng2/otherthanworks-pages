import { ReviewGallery } from "@/components/review-gallery";

export const metadata = { title: "수강생 후기", alternates: { canonical: "/reviews" } };

export default function ReviewsPage() {
  return <main id="main" tabIndex={-1} className="section wrap">
    <span className="eyebrow">CLASS STORIES</span><h1>함께 만든 작업과 이야기</h1>
    <ReviewGallery />
  </main>;
}
