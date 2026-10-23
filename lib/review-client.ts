import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let browserClient: SupabaseClient | null = null;

export function createReviewClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return null;
  if (typeof window !== "undefined" && browserClient) return browserClient;
  const client = createClient(url, key, {
    auth: { persistSession: false, detectSessionInUrl: false },
  });
  if (typeof window !== "undefined") browserClient = client;
  return client;
}

export type Review = {
  kind: "review" | "example";
  id: string;
  title: string;
  body: string;
  alt: string;
  image_path: string;
  published: boolean;
  consent: boolean;
};

// Re-encode to strip EXIF/location metadata; never upload SVG or original bytes.
export async function prepareReviewPhoto(file: File, detailPage = false): Promise<Blob> {
  if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
    throw new Error("JPG, PNG, WebP 사진을 선택해 주세요.");
  }
  if (file.size > 10 * 1024 * 1024) throw new Error("10MB 이하 사진을 선택해 주세요.");
  const bitmap = await createImageBitmap(file);
  try {
    if (bitmap.width * bitmap.height > 40_000_000) throw new Error("사진 크기를 줄여 다시 선택해 주세요.");
    const scale = detailPage
      ? Math.min(1, 1600 / bitmap.width, 12000 / bitmap.height)
      : Math.min(1, 2000 / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(bitmap.width * scale));
    canvas.height = Math.max(1, Math.round(bitmap.height * scale));
    const context = canvas.getContext("2d");
    if (!context) throw new Error("사진을 처리할 수 없습니다.");
    context.fillStyle = "#fff";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    return await new Promise((resolve, reject) => canvas.toBlob(
      blob => blob ? resolve(blob) : reject(new Error("사진 변환에 실패했습니다.")),
      "image/jpeg", 0.85,
    ));
  } finally { bitmap.close(); }
}
