import Link from "next/link";
import { classes } from "@/content/site";
import { Arrow } from "./icons";
import styles from "./course-board.module.css";
import { defaultCourse } from "@/lib/course-content";

export type ClassListing = (typeof classes)[number] & { coverUrl?: string; coverAlt?: string; priceLabel?: string; scheduleLabel?: string };

export function ClassArtwork({ item }: { item: (typeof classes)[number] }) {
  return (
    <div className={`class-art ${item.color}`} aria-hidden="true">
      <span className="art-code">OTW — CLASS {item.number}</span>
      <div className="mini-folder">
        <div className="mini-paper">
          <span>OTHER THAN WORKS</span>
          <strong>
            {item.graphic}
            <span>
              something
              <br />
              of your own.
            </span>
          </strong>
          <i>LET’S GET STARTED ↗</i>
        </div>
        <div className="mini-front">
          <span>{item.name}</span>
          <span>↗</span>
        </div>
      </div>
      <span className="art-bottom">ANOTHER WAY TO CREATE.</span>
    </div>
  );
}

export function ClassCard({ item }: { item: ClassListing }) {
  const defaults = defaultCourse(item);
  return (
    <Link href={`/classes/${item.slug}`} className={styles.card}>
      <div className={styles.poster} data-color={item.color} data-subject={item.slug}>
        {item.coverUrl ? <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={item.coverUrl} alt={item.coverAlt ?? ""} loading="lazy" />
          <span className={styles.imageTag}>CLASS {item.number} / {item.cohort}</span>
        </> : <><span>OTHER THAN WORKS / CLASS {item.number}</span><strong>{item.graphic}<br />YOUR WAY.</strong><i className={styles.shape} aria-hidden="true" /><span>{item.cohort} ↗</span></>}
      </div>
      <div className={styles.body}>
      <div className={styles.meta}>
        <span className="eyebrow">{item.category}</span>
        <span>{item.cohort}</span>
      </div>
      <h3>
        {item.title} <Arrow diagonal />
      </h3>
      <p>{item.description}</p>
      <div className={styles.facts}><span>{item.duration}</span><span>{item.priceLabel ?? defaults.price_label}</span></div>
      <p className={styles.schedule}>{item.scheduleLabel ?? defaults.schedule}</p>
      <span className={styles.more}>
        커리큘럼 · 수업 안내 <Arrow />
      </span>
      </div>
    </Link>
  );
}
