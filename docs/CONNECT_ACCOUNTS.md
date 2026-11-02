# 운영 계정 연결 — 최신 방식

문의는 사이트 양식에서 **관리자 문의함**으로 저장합니다. 이메일 자동 발송은 사용하지 않으며 Resend 연결도 필요하지 않습니다. 현재 GitHub Pages는 정적 미리보기로 실제 문의 API를 실행할 수 없습니다.

## 1. Supabase: 관리자 로그인·문의함·사진과 영상·문구

1. https://supabase.com/dashboard 에서 운영자 소유 프로젝트를 만듭니다. DB 비밀번호는 개인 비밀번호 관리자에 보관합니다.
2. 새 빈 프로젝트라면 `supabase/install-new-project.sql` 전체를 SQL Editor에서 한 번 실행합니다. 이미 기존 설치를 마쳤다면 추가 파일 `supabase/inbox-and-copy.sql`만 실행합니다. 중복 실행하지 않습니다.
3. Authentication → Users에서 운영자 사용자를 만들고 이메일을 확인 처리합니다. 공개 회원가입은 끕니다.
4. 해당 사용자의 UUID로 아래 SQL을 실행합니다.

```sql
insert into public.review_admins(user_id)
values ('여기에-관리자-사용자-UUID')
on conflict do nothing;
```

5. Project URL과 공개 publishable key를 Vercel 환경 변수에 입력합니다. 서버 문의 저장에는 별도의 서버 전용 service_role 키가 필요합니다. service_role/DB 비밀번호/로그인 비밀번호는 채팅·Git·브라우저 공개 환경 변수에 넣지 않습니다.

## 2. Vercel: 실제 사이트와 접수 API

https://vercel.com/new → GitHub → `soreng2/otherthanworks-pages` 가져오기.
프레임워크 Next.js, 루트 `.`. 운영 브랜치는 **preview/website-mvp**입니다. main은 기존 설문 + 정적 미리보기이므로 사용하지 않습니다.

환경 변수:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`: 공개 키
- `SUPABASE_SERVICE_ROLE_KEY`: 서버 전용 비밀 키
- `INQUIRY_PROVIDER=database`
- `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`: https://console.upstash.com 의 Redis REST 설정. 문의 요청 제한에 사용
- `INQUIRY_RATE_SALT`: 충분히 긴 랜덤 비밀 값
- `PRIVACY_NOTICE_VERSION`: 확정된 개인정보 안내 버전
- `INQUIRY_DELIVERY_VERIFIED=false`: 실제 저장 확인 전 유지

저장 후 재배포합니다. `/admin` 로그인→사진·영상 저장/공개, 페이지 문구 초안/공개/복원을 확인합니다. 실제 문의를 비공개 테스트 환경에서 저장하고 관리자 조회, 익명·비관리자 조회/직접 쓰기 거부, 실패·요청 제한을 검증합니다. 실제 문의 저장과 개인정보 고지 확인 후 `INQUIRY_DELIVERY_VERIFIED=true`, `content/site.ts`의 `inquiriesEnabled`·`legalApproved`를 활성화합니다. 문구 변경만으로 이 플래그가 켜지지는 않습니다.

## 3. 정식 도메인

Vercel에 otherthanworks.com 및 www.otherthanworks.com을 추가하고 가비아 DNS 관리에서 **Vercel이 실제 제시하는 값**을 적용합니다. 기존 메일 MX/TXT 등은 보존합니다. 실제 HTTPS 확인 후 정식 주소를 안내합니다. 현재 DNS는 변경하지 않았습니다.

관리 사용법과 문구 편집 범위는 [INBOX_AND_COPY.md](INBOX_AND_COPY.md)를 참고하세요. 브라우저 임시저장 글은 서버로 자동 이전되지 않습니다.
