-- Run after reviews.sql and courses.sql. Preserve existing reviews.
begin;
alter table public.reviews add column kind text not null default 'review'
  check (kind in ('review', 'example'));
create table public.instagram_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null check (length(trim(title)) between 1 and 120),
  caption text not null default '' check (length(caption) <= 2000),
  url text not null check (url ~ '^https://www\.instagram\.com/(p|reel|tv)/[A-Za-z0-9_-]{1,100}/$'),
  published boolean not null default false,
  created_at timestamptz not null default now()
);
alter table public.instagram_posts enable row level security;
grant select on public.instagram_posts to anon, authenticated;
grant insert, update, delete on public.instagram_posts to authenticated;
create policy "Read published Instagram posts or admin drafts" on public.instagram_posts for select to anon, authenticated
  using (published or public.is_review_admin());
create policy "Admins manage Instagram posts" on public.instagram_posts for all to authenticated
  using (public.is_review_admin()) with check (public.is_review_admin());
commit;
