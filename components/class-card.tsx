import Link from "next/link";
import { classes } from "@/content/site";
import { Arrow } from "./icons";

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

export function ClassCard({ item }: { item: (typeof classes)[number] }) {
  return (
    <Link href={`/classes/${item.slug}`} className="class-card">
      <ClassArtwork item={item} />
      <div className="class-card-top">
        <span className="eyebrow">{item.category}</span>
        <span className="status-dot">준비 중</span>
      </div>
      <h3>
        {item.title} <Arrow diagonal />
      </h3>
      <p>{item.description}</p>
      <span className="card-more">
        프로그램 살펴보기 <Arrow />
      </span>
    </Link>
  );
}
