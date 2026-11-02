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
