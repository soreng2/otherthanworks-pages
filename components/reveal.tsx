"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function Reveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = ref.current;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!node || motion.matches || !("IntersectionObserver" in window)) return;
    if (node.getBoundingClientRect().top > window.innerHeight) node.classList.add("reveal-waiting");
    const show = () => node.classList.remove("reveal-waiting");
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) { show(); observer.disconnect(); }
    }, { threshold: 0.05 });
    observer.observe(node);
    node.addEventListener("focusin", show);
    motion.addEventListener("change", show);
    return () => { show(); observer.disconnect(); node.removeEventListener("focusin", show); motion.removeEventListener("change", show); };
  }, []);
  return <div ref={ref} className="reveal-block">{children}</div>;
}
