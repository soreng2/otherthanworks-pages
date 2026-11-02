import type { ClassDefinition } from "@/content/site";

export const enrollmentLabels = { inquiry: "일정 문의", open: "모집 중", upcoming: "모집 예정", closed: "모집 마감" } as const;
export type EnrollmentStatus = keyof typeof enrollmentLabels;
export function enrollmentLabel(value?: EnrollmentStatus): string { return enrollmentLabels[value ?? "inquiry"] ?? enrollmentLabels.inquiry; }
export function canApply(value?: EnrollmentStatus): boolean { return value !== "closed" && value !== "upcoming"; }

export type CoursePhoto = { path: string; alt: string };
export type CourseContent = {
  enrollment_status?: EnrollmentStatus; display_order?: number;
  slug: string; stage: "draft" | "published"; title: string; description: string;
  cohort: string; duration: string; price_label: string; schedule: string;
  curriculum: string; photos: CoursePhoto[]; payment_url: string; payment_verified: boolean;
};

export function defaultCourse(item: ClassDefinition): CourseContent {
  return {
    enrollment_status: "inquiry", display_order: 50,
    slug: item.slug, stage: "draft", title: item.title, description: item.description,
    cohort: item.cohort, duration: item.duration,
    price_label: item.price === null ? "상담 후 안내" : `월 ${item.price.toLocaleString("ko-KR")}원`,
    schedule: item.slug === "drawing-routine" ? "월 19:30 / 목 10:00 / 토 10:00 · 시작일과 잔여석은 상담 후 확정" : "일정·잔여석 상담 후 확정",
    curriculum: item.curriculum.join("\n"), photos: [], payment_url: "", payment_verified: false,
  };
}

export function validPaymentUrl(value: string): boolean {
  return /^https:\/\/smartstore\.naver\.com\/monmut\/products\/[0-9]+$/.test(value);
}

export function validateCourse(course: CourseContent): string | null {
  if (course.enrollment_status !== undefined && !Object.hasOwn(enrollmentLabels, course.enrollment_status)) return "모집 상태를 확인해 주세요.";
  if (course.display_order !== undefined && (!Number.isInteger(course.display_order) || course.display_order < 0 || course.display_order > 999)) return "노출 순서는 0~999 사이의 정수로 입력해 주세요.";
  for (const [value, maximum] of [[course.title, 120], [course.description, 1500], [course.cohort, 50], [course.duration, 200], [course.price_label, 200], [course.schedule, 500], [course.curriculum, 10000]] as const) {
    if (!value.trim() || value.length > maximum) return "빈 항목과 입력 길이를 확인해 주세요.";
  }
  if (course.payment_url && !validPaymentUrl(course.payment_url)) return "monmut 스마트스토어의 개별 상품 주소를 입력해 주세요. 예: https://smartstore.naver.com/monmut/products/상품번호";
  if (course.payment_verified && !validPaymentUrl(course.payment_url)) return "결제를 활성화하려면 개별 상품 주소가 필요합니다.";
  if (course.photos.length > 20 || course.photos.some(photo => !/^[0-9a-f-]{36}\.jpg$/.test(photo.path) || !photo.alt.trim() || photo.alt.length > 300)) return "상세 사진은 20장까지 등록할 수 있으며 각 사진의 설명이 필요합니다.";
  return null;
}
