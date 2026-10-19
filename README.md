# OTHER THAN WORKS

아더댄웍스 클래스 + 디자인 스튜디오 통합 홈페이지. Next.js App Router, TypeScript와 로컬 정적 콘텐츠를 사용합니다.

**브라우저에서 보는 공개 미리보기: https://soreng2.github.io/otherthanworks-pages/preview/** ([배포·검증 기록](docs/PREVIEW_DEPLOYMENT.md)).

## 먼저 읽기

[운영 검토 항목](docs/REVIEW_REQUIRED.md)을 먼저 확인하세요. 인계 문서가 전제한 Next.js MVP와 `folder-stack.webp` 원본은 제공된 저장소에 없었습니다. 이 구현은 지정 팔레트를 사용해 새로 만든 초안입니다. 기존 HTML 설문 원본은 수정하지 않았고, 실행 가능한 복사본은 `public/legacy/`에 보존했습니다.

## 개발

Node.js 24 LTS, npm 11에서 확인했습니다. 작업 디렉터리는 `/workspace/otherthanworks-pages`입니다.

```sh
npm install
npm run lint
npm test
npm run build
npm start
```

일상 개발은 `npm run dev`를 사용합니다. 기본 포트는 3000이며, 충돌 시 `npm run dev -- --port 3001` 또는 `npm start -- --port 3001`로 지정합니다. 재현 가능한 설치는 `npm ci`를 사용합니다. `.npmrc`는 쓰기 가능한 체크아웃 내부 `.npm-cache/`를 사용합니다. 별도 DB는 화면 개발에 필요하지 않습니다. 글꼴은 npm 패키지로 설치되어 빌드·실행 시 Google Fonts에 의존하지 않습니다.

## 콘텐츠와 경로

- `content/site.ts`: 브랜드, 공식 SNS, 클래스 정보, 기능 활성화 상태, `requiresConfirmation`.
- `app/`: 홈, 클래스 목록·4개 상세, WORK·달력 프로젝트 노트, 스튜디오, 소개, 문의, 법적 안내 초안.
- `app/globals.css`: 원본 지정 팔레트, 반응형 및 키보드 포커스 스타일.
- `public/images/folder-stack.svg`: 새로 만든 브랜드 그래픽 시안. 미제공 원본 `folder-stack.webp`를 복제하거나 원본이라고 표시하지 않습니다.
- `components/calendar-art.tsx`: 실제 고객 작업물이 아닌 레이아웃 시안. 원본 확보 후 교체합니다.
- `/legacy/index.html`: 기존 캐릭터·영상 사전 설문. 기존 `/ai-workflow/*`, `/session0/*`, `/mogakil/*`는 보존된 경로로 리디렉션됩니다.

가격·정원·날짜·결제 URL은 `null`로 유지합니다. 모집 중, 성공 사례, 고객 후기, 수강생 수를 만들지 않았습니다. YouTube URL이 확인되지 않아 링크를 제공하지 않습니다.

## 문의 보안과 활성화

현재 문의 입력과 API 전달은 **비활성**입니다. `content/site.ts`의 `inquiriesEnabled`, `legalApproved` 및 서버 설정이 모두 충족되어야 활성화됩니다. `.env.example`에는 변수 이름만 들어 있습니다. 실제 값은 `.env.local` 또는 배포 플랫폼의 비밀 설정으로 관리하고 Git에 넣지 마세요.

준비된 전송 경로는 HTTPS webhook + Upstash Redis입니다. webhook 수신처는 JSON을 처리하고 `Authorization: Bearer`를 검증해야 합니다. 개인정보를 HTML로 삽입하거나 메일 헤더로 직접 조합하지 마세요. Redis 원자적 카운터로 10분 동안 5건을 제한합니다. Redis 장애 시 문의를 전송하지 않습니다. IP는 salt 기반 HMAC 키로 변환하고 원문을 저장하지 않습니다. Vercel에서는 플랫폼이 덮어쓰는 `x-vercel-forwarded-for`만 신뢰하며, 다른 호스트는 공용 버킷을 사용합니다. 다른 플랫폼의 프록시를 사용할 때는 별도 신뢰 설정이 필요합니다.

동일 출처, JSON 형식, 16KiB 본문 제한, 필드·프로그램 allowlist, 명시적 동의, honeypot, 길이 제한을 서버에서도 검사합니다. webhook 리디렉션을 따라가지 않으며, timeout·비정상 응답은 성공으로 표시하지 않습니다. 개인정보나 원격 오류 응답을 로그에 출력하지 않습니다.

공개 전에 법적 고지 확정 → 테스트용 배포에서 수신함까지 실제 E2E → 실패·요청 제한 확인 → `INQUIRY_DELIVERY_VERIFIED=true` → 운영 활성화 순으로 진행해야 합니다. 로컬 mock이나 HTTP 2xx만으로 실제 이메일 수신이 확인됐다고 간주하지 마세요. 결제는 아직 구현·연결하지 않았습니다.

## SEO와 배포

한글 문서 언어, 페이지별 title·description·canonical, 동적 OG 이미지, favicon, sitemap, robots를 제공합니다. 문의·법적 초안은 `noindex`입니다. 추적 스크립트는 설치하지 않았습니다. `site.url`은 **목표 도메인**이며 실제 연결을 증명하지 않습니다.

Vercel 프로젝트의 프레임워크를 Next.js로 선택하고, 저장소 루트를 프로젝트 루트로 사용합니다. 운영 검토 전에는 공개 배포를 진행하지 않습니다. Preview Deployment를 먼저 검수하고, 운영 도메인 연결 후 실제 DNS·SSL·OG·sitemap·문의 수신을 다시 확인합니다. 실제 배포·결제·실수신 검증 상태는 [검토 문서](docs/REVIEW_REQUIRED.md)에 기록합니다.

## 검증

`npm run lint`, `npm run typecheck`, `npm test`, `npm run build`를 사용합니다. 브라우저에서는 1440×1000 및 390×844로 지정 경로, 한글 줄바꿈, 폴더 종이 영역, 가로 넘침, 메뉴·키보드·링크를 확인합니다. 테스트는 실제 Apps Script에 설문 데이터를 쓰지 않습니다. 외부 문의·결제·분석 계정과 수신 데이터는 제공되지 않아 실제 서비스 전송은 검증 대상에서 제외되어 있습니다.
