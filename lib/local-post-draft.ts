export type LocalPostDraft = {
  title: string; body: string; category: string;
  files: { path: string; alt: string; caption?: string; blob: Blob }[];
};
function openDraftDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("otw-local-post", 1);
    request.onupgradeneeded = () => request.result.createObjectStore("drafts");
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(new Error("이 브라우저에서 임시저장 공간을 열지 못했습니다."));
  });
}
export async function saveLocalDraft(draft: LocalPostDraft) {
  const db = await openDraftDB();
  try { await new Promise<void>((resolve, reject) => {
    const tx = db.transaction("drafts", "readwrite");
    tx.objectStore("drafts").put(draft, "post");
    tx.oncomplete = () => resolve();
    tx.onabort = tx.onerror = () => reject(new Error("임시저장에 실패했습니다. 브라우저 저장 공간을 확인해 주세요."));
  }); } finally { db.close(); }
}
export async function loadLocalDraft(): Promise<LocalPostDraft | undefined> {
  const db = await openDraftDB();
  try { return await new Promise((resolve, reject) => {
    const request = db.transaction("drafts", "readonly").objectStore("drafts").get("post");
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(new Error("임시저장한 글을 읽지 못했습니다."));
  }); } finally { db.close(); }
}
