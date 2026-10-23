-- Run after showcase.sql. Keep the identities of existing reviews unspecified.
begin;
alter table public.reviews add column author_name text not null default '' check (length(author_name) <= 80);
alter table public.reviews add column course_label text not null default '' check (length(course_label) <= 120);
commit;
