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
