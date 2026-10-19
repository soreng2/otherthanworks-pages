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
