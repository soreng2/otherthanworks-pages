import { SiteText } from "@/components/site-copy";
import { ReviewGallery } from "@/components/review-gallery";
export const metadata = { title: "수강생 후기", alternates: { canonical: "/reviews" } };
export default function ReviewsPage() {
    return <main id="main" tabIndex={-1} className="section wrap">
    <span className="eyebrow"><SiteText>{"CLASS STORIES"}</SiteText></span><h1><SiteText>{"함께 만든 작업과 이야기"}</SiteText></h1>
    <ReviewGallery />
  </main>;
}
