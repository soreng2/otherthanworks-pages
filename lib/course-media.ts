export const MEDIA_ACCEPT = "image/jpeg,image/png,image/webp,video/mp4,video/webm";
export function isCourseVideo(path: string) { return /\.(mp4|webm)$/.test(path); }
export function courseMediaBucket(path: string) { return isCourseVideo(path) ? "course-videos" : "course-photos"; }
export function videoExtension(file: { type: string; size: number }): "mp4" | "webm" {
  if (!["video/mp4", "video/webm"].includes(file.type)) throw new Error("영상은 MP4 또는 WebM으로 변환해 주세요.");
  if (file.size === 0 || file.size > 50 * 1024 * 1024) throw new Error("영상은 0MB 초과 50MB 이하로 선택해 주세요.");
  return file.type === "video/mp4" ? "mp4" : "webm";
}
// Verify that the browser can decode the video before uploading original bytes.
export async function prepareCourseVideo(file: File): Promise<string> {
  const extension = videoExtension(file);
  const url = URL.createObjectURL(file);
  try {
    await new Promise<void>((resolve, reject) => {
      const video = document.createElement("video");
      const timer = setTimeout(() => done(new Error("영상을 읽는 시간이 초과되었습니다.")), 15000);
      function done(error?: Error) {
        clearTimeout(timer); video.onloadeddata = null; video.onerror = null;
        video.removeAttribute("src"); video.load();
        if (error) reject(error); else resolve();
      }
      video.muted = true; video.preload = "auto";
      video.onloadeddata = () => done(video.videoWidth && Number.isFinite(video.duration) ? undefined : new Error("재생 가능한 영상 파일을 선택해 주세요."));
      video.onerror = () => done(new Error("이 브라우저에서 재생할 수 없습니다. MP4(H.264)로 변환해 주세요."));
      video.src = url;
    });
    return extension;
  } finally { URL.revokeObjectURL(url); }
}
