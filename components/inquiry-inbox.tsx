"use client";
import { useEffect, useState } from "react";
import type { SupabaseClient } from "@supabase/supabase-js";
import styles from "./reviews.module.css";
type InquiryRow = { id: string; created_at: string; type: string; program: string; name: string; email: string; message: string; status: string; note: string };
const statuses = { new: "새 문의", in_progress: "확인 중", done: "처리 완료" };
export function InquiryInbox({ client }: { client: SupabaseClient }) {
 const [rows,setRows]=useState<InquiryRow[]>([]),[message,setMessage]=useState(""),[busy,setBusy]=useState(false),[filter,setFilter]=useState("all");
 const [edits,setEdits]=useState<Record<string,{status:string;note:string}>>({});
 const [page,setPage]=useState(0),[refresh,setRefresh]=useState(0);
 useEffect(()=>{let active=true;async function load(){const {data,error}=await client.from("inquiries").select("*").order("created_at",{ascending:false}).range(page*50,page*50+49);if(active){if(error){setRows([]);setMessage("문의함을 불러오지 못했습니다. 저장소 설정과 권한을 확인해 주세요.");}else{setRows(data as InquiryRow[]);setMessage("");}}}void load();return()=>{active=false;};},[client,page,refresh]);
 async function save(row:InquiryRow){setBusy(true);setMessage("");try{const {data,error}=await client.from("inquiries").update({status:row.status,note:row.note}).eq("id",row.id).select("id");if(error||data?.length!==1)throw new Error();setRows(current=>current.map(x=>x.id===row.id?row:x));setEdits(current=>{const next={...current};delete next[row.id];return next;});setMessage("처리 상태와 내부 메모를 저장했습니다. 고객에게 메시지는 발송하지 않습니다.");}catch{setMessage("저장하지 못했습니다. 다시 시도해 주세요.");}finally{setBusy(false);}}
 return <section id="manage-inbox" className={styles.manager}><h2>문의함</h2><p>고객 문의는 관리자에게만 보입니다. 상태 변경은 고객에게 알림을 보내지 않습니다.</p><p role="status">{message}</p>
 <button disabled={busy} onClick={()=>setRefresh(refresh+1)}>문의 새로고침</button><label>현재 목록 필터 <select value={filter} onChange={e=>setFilter(e.target.value)}><option value="all">전체</option>{Object.entries(statuses).map(([key,label])=><option key={key} value={key}>{label}</option>)}</select></label>
 <div className={styles.grid}>{rows.filter(row=>filter==='all'||row.status===filter).map(row=><article key={row.id} className={styles.card}>
 <h3>{row.name} · {row.type==='class'?'클래스':'스튜디오'} 문의</h3><p>{new Date(row.created_at).toLocaleString('ko-KR',{timeZone:'Asia/Seoul'})} (한국 시간)</p><p>{row.program}</p><p>{row.email}</p><p>{row.message}</p>
 <label htmlFor={`inquiry-status-${row.id}`}>처리 상태</label><select id={`inquiry-status-${row.id}`} disabled={busy} value={edits[row.id]?.status??row.status} onChange={e=>setEdits(current=>({...current,[row.id]:{status:e.target.value,note:current[row.id]?.note??row.note}}))}>{Object.entries(statuses).map(([key,label])=><option key={key} value={key}>{label}</option>)}</select>
 <label htmlFor={`inquiry-note-${row.id}`}>내부 메모</label><textarea id={`inquiry-note-${row.id}`} disabled={busy} value={edits[row.id]?.note??row.note} maxLength={2000} onChange={e=>setEdits(current=>({...current,[row.id]:{note:e.target.value,status:current[row.id]?.status??row.status}}))}/><button disabled={busy} onClick={()=>{void save({...row,...edits[row.id]});}}>상태·메모 저장</button>
 </article>)}</div>{!rows.length&&!message&&<p>표시할 문의가 없습니다.</p>}
 <div className={styles.actions}><button disabled={busy||page===0} onClick={()=>setPage(page-1)}>이전 50건</button><span>{page+1}페이지</span><button disabled={busy||rows.length<50} onClick={()=>setPage(page+1)}>다음 50건</button></div>
 </section>;
}
