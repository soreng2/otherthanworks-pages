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
