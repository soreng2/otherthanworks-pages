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
