# 1차 화면 검수 기록

2026-10-19 로컬 프로덕션 빌드 기준입니다. 원본 `folder-stack.webp`와 기존 Next.js MVP가 미제공되어, 팔레트를 적용한 새 폴더 SVG 시안으로 구성했습니다. 실제 원본 이미지를 사용한 정렬 검수는 파일 확보 후 다시 진행해야 합니다.

| 화면 | PC 1440×1000 | 모바일 390×844 |
| --- | --- | --- |
| 홈 | [전체 화면](review/home-1440.png) | [전체 화면](review/home-390.png) |
| 클래스 목록 | [전체 화면](review/classes-1440.png) | [전체 화면](review/classes-390.png) |
| 클래스 문의 | [전체 화면](review/apply-class-1440.png) | [전체 화면](review/apply-class-390.png) |

스크린샷은 해당 뷰포트에서 전체 페이지를 캡처한 이미지입니다.

검수 경로: `/`, `/classes`, `/classes/content-studio`, `/classes/portfolio-ready`, `/classes/portfolio-build`, `/classes/pictureforge`, `/work`, `/work/calendar-making`, `/studio`, `/about`, `/apply?type=class`, `/apply?type=studio`, `/legal`.

두 화면 크기의 26개 페이지에서 가로 넘침·누락 이미지·JavaScript 실행 오류가 없었습니다. 폴더 종이의 문구는 그래픽 너비에 비례하도록 조정했습니다. 모바일 메뉴의 열기·Escape 닫기·초점 복귀·페이지 이동과 키보드 본문 바로가기도 확인했습니다.

대표 10개 경로 × 두 화면의 axe-core 자동 검사에서 WCAG 2 A/AA 및 2.1 A/AA 검출 위반은 0개였습니다. 실제 스크린리더 사용성 및 전 브라우저 수동 검수는 별도 범위입니다.

- [화면·동작 결과 JSON](review/results.json)
- [자동 접근성 검사 JSON](review/accessibility.json)
- [운영 확인 사항과 남은 질문](REVIEW_REQUIRED.md)

이 검수는 로컬 구현의 검증입니다. 원본 이미지, 실제 문의 수신, 결제, Vercel 공개 배포, DNS·SSL은 검증하지 않았으며 완료로 표시하지 않습니다.
