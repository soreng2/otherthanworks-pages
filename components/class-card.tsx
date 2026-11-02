import { SiteText } from "@/components/site-copy";
import Link from "next/link";
import { classes } from "@/content/site";
import { Arrow } from "./icons";
import styles from "./course-board.module.css";
import { defaultCourse, enrollmentLabel, type EnrollmentStatus } from "@/lib/course-content";
export type ClassListing = (typeof classes)[number] & {
    enrollmentStatus?: EnrollmentStatus;
    displayOrder?: number;
    coverUrl?: string;
    coverAlt?: string;
    priceLabel?: string;
    scheduleLabel?: string;
};
export function ClassArtwork({ item }: {
    item: (typeof classes)[number];
}) {
    return (<div className={`class-art ${item.color}`} aria-hidden="true">
      <span className="art-code"><SiteText>{"OTW \u2014 CLASS "}</SiteText><SiteText>{item.number}</SiteText></span>
      <div className="mini-folder">
        <div className="mini-paper">
          <span><SiteText>{"OTHER THAN WORKS"}</SiteText></span>
          <strong>
            <SiteText>{item.graphic}</SiteText>
            <span><SiteText>{"something"}</SiteText><br /><SiteText>{"of your own."}</SiteText></span>
          </strong>
          <i><SiteText>{"LET\u2019S GET STARTED \u2197"}</SiteText></i>
        </div>
        <div className="mini-front">
          <span><SiteText>{item.name}</SiteText></span>
          <span><SiteText>{"\u2197"}</SiteText></span>
        </div>
      </div>
      <span className="art-bottom"><SiteText>{"ANOTHER WAY TO CREATE."}</SiteText></span>
    </div>);
}
export function ClassCard({ item }: {
    item: ClassListing;
}) {
    const defaults = defaultCourse(item);
    return (<Link href={`/classes/${item.slug}`} className={styles.card}>
      <div className={styles.poster} data-color={item.color} data-subject={item.slug}>
        <SiteText>{item.coverUrl ? <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={item.coverUrl} alt={item.coverAlt ?? ""} loading="lazy"/>
          <span className={styles.imageTag}><SiteText>{"CLASS "}</SiteText><SiteText>{item.number}</SiteText><SiteText>{" / "}</SiteText><SiteText>{item.cohort}</SiteText></span>
        </> : <><span><SiteText>{"OTHER THAN WORKS / CLASS "}</SiteText><SiteText>{item.number}</SiteText></span><strong><SiteText>{item.graphic}</SiteText><br /><SiteText>{"YOUR WAY."}</SiteText></strong><i className={styles.shape} aria-hidden="true"/><span><SiteText>{item.cohort}</SiteText><SiteText>{" \u2197"}</SiteText></span></>}</SiteText>
      </div>
      <div className={styles.body}>
      <div className={styles.meta}>
        <span className="eyebrow"><SiteText>{item.category}</SiteText></span>
        <span>{enrollmentLabel(item.enrollmentStatus)}</span>
      </div>
      <h3>
        <SiteText>{item.title}</SiteText> <Arrow diagonal/>
      </h3>
      <p><SiteText>{item.description}</SiteText></p>
      <div className={styles.facts}><span><SiteText>{item.duration}</SiteText></span><span>{item.priceLabel ?? defaults.price_label}</span></div>
      <p className={styles.schedule}>{item.scheduleLabel ?? defaults.schedule}</p>
      <span className={styles.more}><SiteText>{"커리큘럼 \u00B7 수업 안내 "}</SiteText><Arrow />
      </span>
      </div>
    </Link>);
}
