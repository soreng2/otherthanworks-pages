import { ReviewManager } from "@/components/review-manager";

export const metadata = {
  title: "수업·사진·후기 관리",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return <main id="main" tabIndex={-1} className="section wrap">
    <span className="eyebrow">OTHER THAN WORKS</span>
    <h1>수업·사진·후기 관리</h1>
    <ReviewManager />
  </main>;
}
