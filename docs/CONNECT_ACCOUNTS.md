# 운영 계정 연결 순서

문의 수신 주소: **mon.mut.friends@gmail.com** (운영자 확정).
현재 GitHub Pages는 화면 미리보기이며 서버 메일 발송을 실행하지 못합니다. 고객 직접 이메일 문의는 mailto 버튼으로 가능합니다. 자동 접수/발송, 관리자 로그인/원격 업로드는 아직 연결되지 않았습니다.

## 1. Supabase — 관리자 로그인과 사진·영상 보관

1. https://supabase.com/dashboard 에 로그인하고 New project로 운영자 소유 프로젝트를 만듭니다. 이름은 `otherthanworks`처럼 정하고 지역은 가능한 가까운 지역을 선택합니다. DB 비밀번호는 개인 비밀번호 관리자에 보관합니다.
2. **새 빈 프로젝트라면 `supabase/install-new-project.sql` 전체를 SQL Editor에 붙여넣어 한 번 실행**하면 됩니다. 아래 개별 파일을 추가 실행하지 마세요. 개별 설치를 선택한다면 순서는 다음과 같습니다: `supabase/reviews.sql` → `supabase/courses.sql` → `supabase/showcase.sql` → `supabase/review-profiles.sql` → `supabase/course-enrollment.sql` → `supabase/course-media.sql`. 기존 테이블이 있는 프로젝트에서는 먼저 충돌 검토가 필요합니다.
3. Authentication → Users에서 관리자 사용자를 만들고 이메일을 확인 처리합니다. 사용할 이메일/비밀번호는 사이트 `/admin` 로그인용입니다. 공개 회원가입은 끕니다.
4. 해당 사용자 UUID를 복사하여 SQL Editor에서 아래를 실행합니다. 다른 사람의 UUID를 넣으면 그 사람이 관리자 권한을 얻으므로 운영자 사용자임을 확인하세요.

```sql
insert into public.review_admins(user_id)
values ('여기에-관리자-사용자-UUID')
on conflict do nothing;
```

5. Project URL과 공개 **publishable key**를 Vercel 환경 변수에 넣습니다. `service_role`, secret key, DB 비밀번호는 쓰지 않습니다. 실제 비밀번호/API 비밀키는 채팅으로 보내지 마세요.

## 2. Vercel — 운영 사이트 실행

https://vercel.com/new → GitHub 연결 → `soreng2/otherthanworks-pages` 가져오기.
프레임워크 Next.js, 프로젝트 루트 `.`. 운영 브랜치는 **preview/website-mvp**입니다. main은 기존 설문과 정적 미리보기이므로 Next.js 배포 소스로 사용하면 안 됩니다. 브랜치 선택 메뉴는 프로젝트 설정의 Git 또는 Environments에서 확인합니다.

환경 변수:
- `NEXT_PUBLIC_SUPABASE_URL`: 프로젝트 URL
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`: 공개 publishable key

저장한 다음 다시 배포합니다. 실제 Vercel 주소의 `/admin`에서 로그인하고 사진/영상 업로드→초안 저장→공개→다른 브라우저에서 확인합니다. 비관리자 업로드와 비공개 파일 익명 접근이 거부되는지도 점검해야 합니다. 기기 임시저장한 글은 자동으로 서버에 옮겨지지 않습니다.

## 3. Resend — 문의 자동 이메일 발송

https://resend.com 에서 운영자 계정을 만들고 발신 도메인을 등록·검증합니다. Resend가 제시하는 DNS 레코드를 가비아에 추가하며 기존 메일 레코드를 임의 삭제하지 않습니다. 발신 주소는 검증된 도메인의 주소를 사용합니다. 받는 주소는 Gmail이지만 Gmail 주소를 검증된 발신 주소처럼 사용할 수는 없습니다.

Vercel 서버 환경 변수:
- `INQUIRY_PROVIDER=resend`
- `RESEND_API_KEY`: 발송 권한 API 키 (비밀)
- `INQUIRY_FROM_EMAIL`: 검증한 도메인의 발신 메일 주소
- `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`: https://console.upstash.com 에 만든 Redis의 REST 설정 (문의 스팸/요청 제한)
- `INQUIRY_RATE_SALT`: 충분히 긴 랜덤 비밀 값
- `PRIVACY_NOTICE_VERSION`: 확정된 개인정보 안내 버전
- `INQUIRY_DELIVERY_VERIFIED=false`: 실제 수신 확인 전 유지

기존 개인정보 안내와 서버 설정을 확정하고 비공개 테스트 환경에서 임시 테스트 설정으로 메일 수신함·스팸함 도착/회신 주소/실패 응답/요청 제한을 확인합니다. 확인 뒤 `INQUIRY_DELIVERY_VERIFIED=true`, `content/site.ts`의 `legalApproved` 및 `inquiriesEnabled`를 켜고 운영 배포합니다. API의 성공 응답은 발송 서비스 접수이며 수신함 도착을 증명하지 않습니다.

## 4. 휴대폰 알림과 도메인

휴대폰 Gmail 앱에서 mon.mut.friends@gmail.com 계정을 선택하고 해당 계정 알림을 켭니다. 휴대폰 설정에서도 Gmail 알림을 허용합니다. 실제 테스트 메일을 받아 잠금 화면 알림을 확인합니다. 웹사이트가 휴대폰 알림 설정을 대신 변경할 수는 없습니다.

Vercel에 otherthanworks.com과 www.otherthanworks.com을 등록한 뒤 가비아 DNS 관리에서 Vercel이 제공하는 레코드를 적용하고 HTTPS를 확인합니다. 현재 DNS는 변경하지 않았습니다.
