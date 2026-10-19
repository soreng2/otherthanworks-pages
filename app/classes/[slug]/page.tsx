import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { classes } from "@/content/site";
import { CourseDetails } from "@/components/course-details";

function resolveClass(slug: string) {
  return classes.find(item => item.slug === (slug === "portfolio-build" ? "portfolio-ready" : slug));
}
export function generateStaticParams() {
  return [...classes.map(({ slug }) => ({ slug })), { slug: "portfolio-build" }];
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = resolveClass(slug);
  return { title: item ? `${item.title} · ${item.cohort}` : "클래스를 찾을 수 없습니다", description: item?.description, alternates: { canonical: `/classes/${item?.slug ?? slug}` } };
}
export default async function ClassDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = resolveClass(slug);
  if (!item) notFound();
  return <main id="main" tabIndex={-1} className="wrap page-content"><CourseDetails key={item.slug} item={item} /></main>;
}
