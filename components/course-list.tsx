"use client";

import { useEffect, useState } from "react";
import { classes } from "@/content/site";
import { createReviewClient } from "@/lib/review-client";
import type { CourseContent } from "@/lib/course-content";
import { ClassCard } from "./class-card";

export function CourseList() {
  const [items, setItems] = useState(classes);
  useEffect(() => {
    let active = true;
    async function load() {
      const client = createReviewClient();
      if (!client) return;
      const { data, error } = await client.from("course_content").select("slug,title,description,cohort").eq("stage", "published");
      if (!active || error || !data) return;
      const rows = data as Pick<CourseContent, "slug" | "title" | "description" | "cohort">[];
      setItems(classes.map(item => ({ ...item, ...rows.find(row => row.slug === item.slug) })));
    }
    void load();
    return () => { active = false; };
  }, []);
  return <div className="class-grid">{items.map(item => <ClassCard key={item.slug} item={item} />)}</div>;
}
