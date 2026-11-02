-- Apply after courses.sql. Existing courses remain unconfirmed, never automatically open.
begin;
alter table public.course_content
  add column if not exists enrollment_status text not null default 'inquiry'
    check (enrollment_status in ('inquiry', 'open', 'upcoming', 'closed')),
  add column if not exists display_order integer not null default 50
    check (display_order between 0 and 999);
-- Existing stage isolation, admin-only writes and published-only reads remain in force.
commit;
