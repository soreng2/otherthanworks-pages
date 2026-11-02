"use client";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { createReviewClient } from "@/lib/review-client";
const CopyContext = createContext<Record<string,string>>({});
export function SiteCopyProvider({ children }: { children: ReactNode }) {
 const [copy,setCopy]=useState<Record<string,string>>({});
 useEffect(()=>{let active=true;async function load(){const client=createReviewClient();if(!client)return;const {data,error}=await client.from("site_copy").select("original,value").eq("stage","published");if(active&&!error&&data)setCopy(Object.fromEntries(data.map(row=>[row.original,row.value])));}void load();const timer=setInterval(()=>{void load();},240000);return()=>{active=false;clearInterval(timer);};},[]);
 return <CopyContext.Provider value={copy}>{children}</CopyContext.Provider>;
}
// Render text through React, never mutate DOM or interpret stored HTML.
export function SiteText({ children }: { children: ReactNode }) {
 const copy=useContext(CopyContext);
 return typeof children === 'string' ? (copy[children] ?? children) : <>{children}</>;
}
