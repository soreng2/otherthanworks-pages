export const site = {
  name: "OTHER THAN WORKS",
  koreanName: "아더댄웍스",
  url: "https://www.otherthanworks.com",
  description:
    "좋아하는 딴짓이 나의 일이 되는 곳. 클래스와 디자인 스튜디오를 연결하는 아더댄웍스입니다.",
  instagram: "https://www.instagram.com/other.than.works/",
  smartstore: "https://smartstore.naver.com/monmut",
  youtube: null,
  inquiriesEnabled: false,
  legalApproved: false,
  analyticsEnabled: false,
  requiresConfirmation: [
    {
      id: "notion-class-reconciliation",
      detail:
        "정규반 명칭·월19만원·월4회/2시간, 포트폴리오3기, 그림책 픽처포지8기, 이모티콘3개월/10기, 콘텐츠3기 확정 반영. 나머지 수강료·개강일·정원 및 세부 주차별 커리큘럼은 추가 확인.",
    },
    {
      id: "review-management",
      detail:
        "수업·후기·작업 예시·Instagram 링크 관리 및 공개 목록 구현. Supabase 프로젝트/관리자 연결과 reviews→courses→showcase SQL 적용 및 실제 권한·업로드 E2E 필요. Instagram 실제 공개 게시물 재생 미검증.",
    },
    {
      id: "original-mvp",
      detail:
        "인계 문서의 기존 Next.js MVP가 현재 저장소에 없음. 새로 구성한 초안의 방향 확인.",
    },
    {
      id: "brand-images",
      detail:
        "folder-stack.webp 및 원본 브랜드·강사·작업 이미지 미제공. 현재 그래픽은 새로 만든 시안이며 실제 작업물이 아님.",
    },
    {
      id: "classes",
      detail:
        "프로그램별 소개·커리큘럼·강사·정원·날짜·등록 상태·가격·환불 기준 확정.",
    },
    {
      id: "work",
      detail:
        "calendar-making 프로젝트의 공개 가능한 실제 이미지·설명·크레딧·공개 권한 확인.",
    },
    {
      id: "legal",
      detail:
        "사업자·대표자·주소·연락처·개인정보 처리·보유 기간·위탁처·약관 확정 및 검토.",
    },
    {
      id: "inquiries",
      detail:
        "실수신 이메일 및 webhook 제공자·목적지·인증·개인정보 위탁 확인 후 실제 수신 E2E 검증.",
    },
    {
      id: "payments",
      detail:
        "사용자가 스마트스토어 외부 결제로 확정. monmut의 수업별 상품 URL·가격·판매 및 환불 안내 확인 후 관리자에서 활성화. 홈페이지는 결제 완료·수강 확정을 표시하지 않음.",
    },
    {
      id: "social",
      detail: "딴짓 실험실 YouTube 공식 URL 확인. Instagram만 연결.",
    },
    {
      id: "tracking",
      detail:
        "GA4·Meta Pixel 사용 목적, 쿠키 동의 및 개인정보 고지 확정 전 추적 비활성화.",
    },
    {
      id: "deployment",
      detail:
        "Vercel 계정·프로젝트와 도메인 소유권·DNS·SSL 검증. 목표 도메인의 운영 여부 미검증.",
    },
  ],
} as const;

export type ClassDefinition = {
  slug: string; name: string; title: string; category: string;
  description: string; color: string; number: string; graphic: string;
  status: string; price: number | null; date: string | null; capacity: number | null;
  paymentUrl: string | null; cohort: string; duration: string; curriculum: string[];
};

export const classes: ClassDefinition[] = [
  {
    slug: "drawing-routine", name: "DRAWING ROUTINE",
    title: "드로잉 루틴", category: "REGULAR · IPAD DRAWING",
    description: "매주 완성하는 아이패드 드로잉. 한 달에 하나의 프로젝트를 통해 나만의 그림을 쌓습니다.",
    color: "butter", number: "01", graphic: "DRAW",
    status: "시작일·잔여석 문의", price: 190000, date: null, capacity: null, paymentUrl: null,
    cohort: "정규반", duration: "월 4회 · 회당 2시간",
    curriculum: ["레퍼런스를 관찰하고 프로젝트에 필요한 기능 익히기", "색·형태·질감 표현 연습", "배운 표현을 내 그림에 응용", "개인작 완성과 피드백·활용 점검"],
  },
  {
    slug: "content-studio",
    name: "CONTENT STUDIO",
    title: "콘텐츠반",
    category: "CONTENT MAKING",
    description: "SNS 브랜딩부터 콘텐츠 기획과 운영까지, 나의 이야기를 콘텐츠로 연결합니다.",
    color: "butter",
    number: "02",
    graphic: "MAKE",
    status: "프로그램 준비 중",
    price: null,
    date: null,
    capacity: null,
    paymentUrl: null,
    cohort: "3기", duration: "일정 확정 후 안내",
    curriculum: ["SNS 브랜딩과 콘텐츠 방향 설정", "콘텐츠 기획", "영상·웹툰·인스타그램 피드 콘텐츠 실습", "콘텐츠 운영"],
  },
  {
    slug: "portfolio-ready",
    name: "PORTFOLIO",
    title: "포트폴리오반",
    category: "PORTFOLIO",
    description:
      "흩어진 작업을 모으고, 내가 하고 싶은 이야기의 방향을 찾습니다.",
    color: "blue",
    number: "03",
    graphic: "FIND",
    status: "프로그램 준비 중",
    price: null,
    date: null,
    capacity: null,
    paymentUrl: null,
    cohort: "3기", duration: "일정 확정 후 안내",
    curriculum: ["대표작 정리와 작가 소개·포지셔닝", "PDF·공개형 노션 포트폴리오 구성", "포트폴리오형 인스타그램 정리", "제안서·견적서·문의 응답 템플릿과 외주 관리"],
  },
  {
    slug: "pictureforge",
    name: "PICTUREFORGE",
    title: "픽처포지 (그림책 기획/제작)",
    category: "PICTURE BOOK",
    description:
      "스토리 있는 그림책을 기획하고 제작하는 프로젝트 클래스.",
    color: "mist",
    number: "04",
    graphic: "PLAY",
    status: "프로그램 준비 중",
    price: null,
    date: null,
    capacity: null,
    paymentUrl: null,
    cohort: "8기", duration: "일정 확정 후 안내",
    curriculum: ["그림책 기획", "스토리와 그림을 담은 그림책 제작", "출간을 목표로 완성하기"],
  },
  {
    slug: "emoticon", name: "EMOTICON", title: "이모티콘반", category: "CHARACTER · EMOTICON",
    description: "캐릭터 하나를 아이디어에서 제안 가능한 이모티콘 세트까지 완성합니다.",
    color: "peach", number: "05", graphic: "HELLO",
    status: "일정·잔여석 문의", price: null, date: null, capacity: null, paymentUrl: null,
    cohort: "10기", duration: "3개월",
    curriculum: ["캐릭터 콘셉트와 감정·상황 정리", "이모티콘 세트 구성", "캐릭터 드로잉", "움직임·등록 포맷 준비와 제안"],
  },
];

export const work = {
  slug: "calendar-making",
  title: "달력 만들기",
  category: "EDITORIAL / PROJECT NOTE",
  description: "일상의 시간을 새로운 시선으로 바라보는 프로젝트.",
  status: "프로젝트 자료 준비 중",
} as const;
