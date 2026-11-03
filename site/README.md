# Other Than Works — `/site`

This is a from-scratch, hand-coded static site for the Other Than Works
homepage. It replaces the *need* for the Next.js build dumped in
`../preview/`, but does **not** touch that folder — `preview/` is still
being auto-published by an external site builder and will be overwritten
on its next publish regardless.

## Why this exists

`preview/` is generated output (no source, no git-friendly diffs) from an
external AI site builder. This `/site` folder is a small, dependency-free
static site (plain HTML/CSS + ~40 lines of JS) that can be edited directly
and reviewed in pull requests like normal code.

## Structure

```
site/
  index.html              home
  classes/
    index.html             class directory
    drawing-routine/        정규반 · 드로잉 루틴
    content-makers/         콘텐츠반
    portfolio/               포트폴리오반
    pictureforge/            픽처포지 (그림책·에세이)
    emoticon/                이모티콘반
  work/                    작업
  studio/                  디자인 스튜디오
  about/                   소개
  apply/                   문의 안내
  reviews/                 수강생 후기
  css/style.css            shared stylesheet
  js/main.js               mobile nav, class filter (no build step, no framework)
```

Every page is a plain `.html` file with relative links — open `index.html`
directly in a browser, or serve the folder with any static file server
(`python3 -m http.server`, `npx serve`, etc.) and it works identically.

## Content sources

Copy and pricing were pulled from the Obsidian vault
(`30-knowledge/02-brand/*`, `30-knowledge/04-classes/*`), cross-checked
against the already-confirmed copy in `../preview/`. Visual layout
patterns (large outline-type hero, toned editorial sections, status-badge
class cards, Creative-Profiles-style grid, founder quote block) are
inspired by ilovecreatives.com's structure — no copy, images, or course
content was copied from that site.

## Palette

The cream/vermillion/near-black/lime palette in `css/style.css`'s `:root`
is a deliberate redesign, not a holdover from the old chatgpt.site /
`preview/` build — 소랭 asked for it to be bolder and more original rather
than preserved for its own sake. Only the light neutral base (cream) was
kept, since that's guided by `30-knowledge/02-brand/WEBSITE_DIRECTION.md`
("밝은 회색·아이보리 기반 우선"), not by what the old site happened to use.
Feel free to push this further — nothing about the current colors is
meant to be final.

## Photo-ready hero (activate once real photos land)

소랭 is providing real photos/video directly — drop zones are set up at
`site/images/intake/` (see that folder's own README for what goes where)
and `site/videos/intake/`. Right now every hero uses flat CSS shapes
(circle + diagonal plane) as a transitional stand-in since no photos
exist yet.

`css/style.css` already has a `.hero--photo` variant built and tested
(full-bleed photo, dark scrim for legibility, white outline/solid type —
the same type-over-photo trick ilovecreatives uses, but with a real OTW
photo instead of a stock/AI image). The **hero is the top priority** to
convert once a usable photo exists — it's the single biggest remaining
gap between this site and feeling as strong as the ilovecreatives
reference. To activate it on any page:

1. Move the chosen photo from `images/intake/...` into `site/images/`
   (e.g. `site/images/hero.jpg`) and resize/crop to roughly 16:9–3:2,
   at least 1600px wide.
2. On that page's `<section class="hero tone-...">`, add `hero--photo`
   to the class list.
3. Right after that opening `<section>` tag (before `<div class="wrap">`),
   add:
   ```html
   <div class="hero-photo-layer"><img src="../images/hero.jpg" alt=""></div>
   ```
   (adjust the relative path depth to match the page, same as every other
   asset link on that page).
4. That's it — the shapes hide automatically, and the CSS handles the
   scrim/contrast. No other markup or CSS changes needed.

This applies page-by-page: the homepage hero is the obvious first swap,
but the same two edits work for any class/about/studio hero once that
page has its own photo (the intake folder already has per-class
subfolders for exactly this).

## Known placeholders (intentional — do not fill with fake content)

- **Reviews** (`reviews/`, home "FROM THE CLASSROOM") — empty-state cards
  until real, consent-cleared student testimonials exist.
- **Work samples** (`work/`, `studio/`) — empty-state blocks until
  consent-cleared project photos exist.
- **Student directory** (home "MADE BY US", `reviews/` Creative Profiles
  grid) — placeholder avatar cards until students consent to be featured.
- **Cohort numbers** (기수) were deliberately left out — the live preview
  site and the vault disagreed on the current cohort count for 픽처포지
  (8기 vs 9기), so no specific number is shown anywhere on this site until
  confirmed.
- No business email is listed — none was confirmed in the vault. Contact
  routes to Instagram DM (@other.than.works) and the 스마트스토어 link only.

## Deploying

GitHub Pages currently serves from wherever the external builder publishes
`preview/` — this `/site` folder is **not** wired into that deployment.
To go live with it:
1. In the repo's Settings → Pages, point the Pages source at this `/site`
   folder (or move its contents to a new branch/root), **or**
2. Keep iterating here and swap it in once photos/reviews are ready.

Either way, pushing changes under `preview/**` will continue to trigger
`.github/workflows/verify-website-preview.yml` as before — this folder is
outside that path and does not affect it.
