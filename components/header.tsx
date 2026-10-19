"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { Arrow } from "./icons";

const links = [
  { href: "/classes", label: "CLASS" },
  { href: "/work", label: "WORK" },
  { href: "/studio", label: "STUDIO" },
  { href: "/about", label: "ABOUT" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  return (
    <header
      className="site-header"
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          setOpen(false);
          menuButton.current?.focus();
        }
      }}
    >
      <div className="header-inner wrap">
        <Link href="/" className="wordmark" onClick={() => setOpen(false)}>
          OTHER <span>THAN WORKS</span>
          <span className="sr-only"> 홈</span>
        </Link>
        <button
          type="button"
          ref={menuButton}
          className="menu-toggle"
          aria-controls="site-nav"
          aria-expanded={open}
          aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
          onClick={() => setOpen(!open)}
        >
          <span /> <span />
        </button>
        <nav
          id="site-nav"
          className={`site-nav${open ? " is-open" : ""}`}
          aria-label="주 메뉴"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname.startsWith(link.href) ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/apply?type=studio"
            className="nav-contact"
            onClick={() => setOpen(false)}
          >
            LET’S TALK <Arrow diagonal />
          </Link>
        </nav>
      </div>
    </header>
  );
}
