# 공개 미리보기

접속 주소: **https://soreng2.github.io/otherthanworks-pages/preview/**

2026-10-19 GitHub Pages에 정적 미리보기를 게시했습니다. PC·모바일 브라우저에서 링크와 메뉴를 직접 사용할 수 있습니다. 문의 전송과 결제는 비활성입니다. `otherthanworks.com` / 가비아 DNS는 변경하지 않았으며, Vercel 정식 배포와 도메인 연결은 별도 후속 단계입니다.

- Next.js 원본 소스: `preview/website-mvp` 브랜치.
- Pages 게시 커밋: `9f6c3ed030d0ab4f9c2ff0072b07ad818217dd1a` (main).
- main에는 별도 `preview/` 정적 산출물, `.nojekyll`, 공개 HTTPS 검사 워크플로만 추가했습니다. 기존 루트 설문 파일은 보존했습니다.
- 미리보기는 `output: export`, `basePath: /otherthanworks-pages/preview`, `trailingSlash: true`로 별도 빌드했습니다. API는 포함하지 않고 문의 유형은 클라이언트에서 읽으며, 문의 양식은 항상 비활성입니다. Next.js 원본의 서버 API는 소스 브랜치에 유지합니다.
- 정적 산출물 브라우저 검사: 1440px·390px의 26개 화면 및 클래스 → 상세 → 문의 이동 통과.
- [GitHub Pages 배포 성공](https://github.com/soreng2/otherthanworks-pages/actions/runs/39217557123).
- [공개 HTTPS 접속 검사 성공](https://github.com/soreng2/otherthanworks-pages/actions/runs/39217558319): 배포 버전, 13개 페이지 및 홈페이지의 이미지·CSS·JavaScript 자원 응답을 외부 러너에서 확인했습니다.

이 주소는 화면 검토용 사이트입니다. 확정되지 않은 운영 정보·실제 수신·결제·추적은 활성화하지 않습니다.
# 2026-10-20 업데이트

확정된 5개 수업·기수·커리큘럼, 정규반 가격, 수업/후기 관리자 및 스마트스토어 홈 링크를 공개 미리보기에 반영했다.
소스 `e446066` (`preview/website-mvp`), 정적 공개 커밋 `37144e1bc03de4815b0eec669778c951d9ff9788` (`main`).
17개 경로 × PC/모바일 = 34개 로컬 화면 검사 통과. 공통 스토어 URL을 5개 수업에서 확인했다. 실제 원격 스마트스토어 결제 및 Supabase 저장소는 미연결/미검증이다.

- Pages 배포 성공: https://github.com/soreng2/otherthanworks-pages/actions/runs/39346009262
- 공개 HTTPS 17개 페이지와 연결 자원 검사 성공: https://github.com/soreng2/otherthanworks-pages/actions/runs/39346009912
- 관리자 주소: https://soreng2.github.io/otherthanworks-pages/preview/admin/ (계정 연결 전 안내 상태)
- 수업 목록: https://soreng2.github.io/otherthanworks-pages/preview/classes/

아래는 최초 배포 기록이다.

# 2026-10-23 업데이트

소스 `c37593c`, 정적 공개 커밋 `77bdb54e1d7f8bf8ef1acd0a1e74a4ed3df07e8f`. 후기·작업 예시 분류 관리, Instagram 공유 링크 관리와 클릭 후 embed, 홈페이지 공개 영역, 관리자 미연결 미리보기, 브랜드 색상·모션을 추가했다.

- Pages 배포 성공: https://github.com/soreng2/otherthanworks-pages/actions/runs/39936781158
- 공개 HTTPS 17개 페이지 및 연결 자원 검사 성공: https://github.com/soreng2/otherthanworks-pages/actions/runs/39936783380
- 로컬 단위 테스트36개, 주요 PC/모바일8화면·axe 자동 검사 및 모의 등록/공개/Instagram 연결 흐름 통과.
- 원격 Supabase 계정·SQL·로그인·실제 업로드 및 실제 Instagram 재생은 미연결/미검증. 관리 화면에서 미리보기임을 명시한다.

# 수업 공고·후기 중심 시안 배포

소스 `f57a4dd`, 정적 공개 커밋 `81fff4492d5376accb63b466cfa80d853002bcad`. 큰 한글 타이포/포스터 공고/분야 필터/사진과 인용문 후기 중심으로 재구성. ilovecreatives.com은 접근 차단으로 실제 확인하지 못했고, 원본을 복제한 결과가 아니다.

- Pages 배포 성공: https://github.com/soreng2/otherthanworks-pages/actions/runs/39958444554
- 공개 HTTPS17개 페이지·연결 자원 검증 성공: https://github.com/soreng2/otherthanworks-pages/actions/runs/39958445958
- 단위 테스트36개 및 PC/모바일10화면·axe 자동 검사 통과. 모의 데이터로 후기 이름/수강 과정/인용문과 수업 대표 사진 로딩 검증.
- 실제 관리자 계정·업로드는 미연결. `review-profiles.sql` 추가 적용 필요. 상세 범위는 `CREATIVE_BOARD.md`.

