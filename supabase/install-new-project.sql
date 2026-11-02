-- NEW EMPTY PROJECT ONLY. Do not run after the individual migrations.
-- Creates private storage and admin-only writes. Admin user must be provisioned separately.

-- Source: reviews.sql
-- Run once in a new Supabase project. No service-role key is used by the site.
begin;
create table public.review_admins (
  user_id uuid primary key references auth.users(id) on delete cascade
);
alter table public.review_admins enable row level security;
revoke all on public.review_admins from anon, authenticated;

create function public.is_review_admin() returns boolean
language sql stable security definer set search_path = ''
as $$ select exists(select 1 from public.review_admins where user_id = (select auth.uid())); $$;
revoke all on function public.is_review_admin() from public;
grant execute on function public.is_review_admin() to anon, authenticated;

create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  title text not null check (length(trim(title)) between 1 and 120),
  body text not null check (length(trim(body)) between 1 and 3000),
  alt text not null check (length(trim(alt)) between 1 and 300),
  image_path text not null unique check (image_path ~ '^[0-9a-f-]{36}\.jpg$'),
  consent boolean not null default false,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  check (not published or consent)
);
alter table public.reviews enable row level security;
grant select on public.reviews to anon, authenticated;
grant insert, update, delete on public.reviews to authenticated;
create policy "Published reviews only" on public.reviews for select to anon, authenticated
  using ((published and consent) or public.is_review_admin());
create policy "Admins insert reviews" on public.reviews for insert to authenticated
  with check (public.is_review_admin());
create policy "Admins update reviews" on public.reviews for update to authenticated
  using (public.is_review_admin()) with check (public.is_review_admin());
create policy "Admins delete reviews" on public.reviews for delete to authenticated
  using (public.is_review_admin());

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('review-photos', 'review-photos', false, 10485760, array['image/jpeg']);
create policy "Read published review photos or admin drafts" on storage.objects
  for select to anon, authenticated using (
    bucket_id = 'review-photos' and (
      public.is_review_admin() or exists (
        select 1 from public.reviews where image_path = name and published and consent
      )
    )
  );
create policy "Admins upload review photos" on storage.objects for insert to authenticated
  with check (bucket_id = 'review-photos' and public.is_review_admin());
create policy "Admins remove review photos" on storage.objects for delete to authenticated
  using (bucket_id = 'review-photos' and public.is_review_admin());
commit;


-- Source: courses.sql
-- Run after reviews.sql. Draft and published rows are separate snapshots.
begin;
create function public.valid_course_photos(photos jsonb) returns boolean
language plpgsql immutable set search_path = '' as $$
declare photo jsonb;
begin
  if jsonb_typeof(photos) <> 'array' or jsonb_array_length(photos) > 20 then return false; end if;
  for photo in select value from jsonb_array_elements(photos) loop
    if jsonb_typeof(photo->'path') is distinct from 'string'
      or jsonb_typeof(photo->'alt') is distinct from 'string'
      or (photo->>'path') !~ '^[0-9a-f-]{36}\.jpg$'
      or length(trim(photo->>'alt')) not between 1 and 300 then return false; end if;
  end loop;
  return true;
end; $$;

create table public.course_content (
  slug text not null check (slug in ('drawing-routine','content-studio','portfolio-ready','pictureforge','emoticon')),
  stage text not null check (stage in ('draft','published')),
  title text not null check (length(trim(title)) between 1 and 120),
  description text not null check (length(trim(description)) between 1 and 1500),
  cohort text not null check (length(trim(cohort)) between 1 and 50),
  duration text not null check (length(trim(duration)) between 1 and 200),
  price_label text not null check (length(trim(price_label)) between 1 and 200),
  schedule text not null check (length(trim(schedule)) between 1 and 500),
  curriculum text not null check (length(trim(curriculum)) between 1 and 10000),
  photos jsonb not null default '[]' check (public.valid_course_photos(photos)),
  payment_url text not null default '' check (payment_url = '' or payment_url ~ '^https://smartstore\.naver\.com/monmut/products/[0-9]+$'),
  payment_verified boolean not null default false,
  primary key (slug, stage),
  check (not payment_verified or payment_url <> '')
);
alter table public.course_content enable row level security;
grant select on public.course_content to anon, authenticated;
grant insert, update, delete on public.course_content to authenticated;
create policy "Read published courses or admin drafts" on public.course_content for select to anon, authenticated
  using (stage = 'published' or public.is_review_admin());
create policy "Admins write course content" on public.course_content for all to authenticated
  using (public.is_review_admin()) with check (public.is_review_admin());

insert into storage.buckets(id, name, public, file_size_limit, allowed_mime_types)
values ('course-photos', 'course-photos', false, 10485760, array['image/jpeg']);
create policy "Read published course photos or admin drafts" on storage.objects for select to anon, authenticated
  using (bucket_id = 'course-photos' and (public.is_review_admin() or exists (
    select 1 from public.course_content c where c.stage = 'published'
      and c.photos @> jsonb_build_array(jsonb_build_object('path', name))
  )));
create policy "Admins upload course photos" on storage.objects for insert to authenticated
  with check (bucket_id = 'course-photos' and public.is_review_admin());
create policy "Admins delete course photos" on storage.objects for delete to authenticated
  using (bucket_id = 'course-photos' and public.is_review_admin());
commit;


-- Source: showcase.sql
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


-- Source: review-profiles.sql
-- Run after showcase.sql. Keep the identities of existing reviews unspecified.
begin;
alter table public.reviews add column author_name text not null default '' check (length(author_name) <= 80);
alter table public.reviews add column course_label text not null default '' check (length(course_label) <= 120);
commit;


-- Source: course-enrollment.sql
-- Apply after courses.sql. Existing courses remain unconfirmed, never automatically open.
begin;
alter table public.course_content
  add column if not exists enrollment_status text not null default 'inquiry'
    check (enrollment_status in ('inquiry', 'open', 'upcoming', 'closed')),
  add column if not exists display_order integer not null default 50
    check (display_order between 0 and 999);
-- Existing stage isolation, admin-only writes and published-only reads remain in force.
commit;


-- Source: course-media.sql
-- Apply after courses.sql. Preserves existing image paths and RLS.
begin;
create or replace function public.valid_course_photos(photos jsonb) returns boolean
language plpgsql immutable set search_path = '' as $$
declare photo jsonb;
begin
  if jsonb_typeof(photos) is distinct from 'array' then return false; end if;
  if jsonb_array_length(photos) > 20 then return false; end if;
  for photo in select value from jsonb_array_elements(photos) loop
    if jsonb_typeof(photo->'path') is distinct from 'string'
      or jsonb_typeof(photo->'alt') is distinct from 'string'
      or (photo->>'path') !~ '^[0-9a-f-]{36}\.(jpg|mp4|webm)$'
      or length(trim(photo->>'alt')) not between 1 and 300 then return false; end if;
    if photo ? 'caption' and (jsonb_typeof(photo->'caption') is distinct from 'string' or length(photo->>'caption') > 5000) then return false; end if;
  end loop;
  return true;
end; $$;
insert into storage.buckets(id, name, public, file_size_limit, allowed_mime_types)
values ('course-videos', 'course-videos', false, 52428800, array['video/mp4', 'video/webm'])
on conflict (id) do update set public = false, file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;
create policy "Read published course videos or admin drafts" on storage.objects for select to anon, authenticated
  using (bucket_id = 'course-videos' and (public.is_review_admin() or exists (
    select 1 from public.course_content c where c.stage = 'published'
      and c.photos @> jsonb_build_array(jsonb_build_object('path', name))
  )));
create policy "Admins upload course videos" on storage.objects for insert to authenticated
  with check (bucket_id = 'course-videos' and public.is_review_admin() and name ~ '^[0-9a-f-]{36}\.(mp4|webm)$');
create policy "Admins delete course videos" on storage.objects for delete to authenticated
  using (bucket_id = 'course-videos' and public.is_review_admin());
commit;


-- Source: inbox-and-copy.sql
-- Run after reviews.sql. Private inbox + published page copy.
begin;
create table public.inquiries (
 id uuid primary key default gen_random_uuid(),
 created_at timestamptz not null default now(),
 type text not null check (type in ('class','studio')),
 program text not null,
 name text not null check(length(name) between 1 and 80),
 email text not null check(length(email) between 3 and 254),
 message text not null check(length(message) between 10 and 4000),
 privacy_version text not null,
 consented_at timestamptz not null,
 status text not null default 'new' check(status in ('new','in_progress','done')),
 note text not null default '' check(length(note) <= 2000)
);
alter table public.inquiries enable row level security;
revoke all on public.inquiries from anon, authenticated;
grant select on public.inquiries to authenticated;
grant update(status,note) on public.inquiries to authenticated;
grant insert, select on public.inquiries to service_role;
create policy "Only admins read inbox" on public.inquiries for select to authenticated using(public.is_review_admin());
create policy "Only admins update inbox" on public.inquiries for update to authenticated using(public.is_review_admin()) with check(public.is_review_admin());

create table public.site_copy (
 original text not null check(length(original) between 1 and 10000),
 stage text not null check(stage in ('draft','published')),
 value text not null check(length(value) between 1 and 10000),
 primary key(original,stage)
);
alter table public.site_copy enable row level security;
grant select on public.site_copy to anon, authenticated;
grant insert,update,delete on public.site_copy to authenticated;
create policy "Read published copy or admin drafts" on public.site_copy for select to anon,authenticated using(stage='published' or public.is_review_admin());
create policy "Admins edit site copy" on public.site_copy for all to authenticated using(public.is_review_admin()) with check(public.is_review_admin());
commit;
