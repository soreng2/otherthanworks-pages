export const site = {
  name: "OTHER THAN WORKS",
  koreanName: "아더댄웍스",
  url: "https://www.otherthanworks.com",
  description:
    "좋아하는 딴짓이 나의 일이 되는 곳. 클래스와 디자인 스튜디오를 연결하는 아더댄웍스입니다.",
  instagram: "https://www.instagram.com/other.than.works/",
  youtube: null,
  inquiriesEnabled: false,
  legalApproved: false,
  analyticsEnabled: false,
  requiresConfirmation: [
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
        "결제 제공자·상품별 가격·결제 URL·서버 측 결제 확인·취소 및 환불 연동 확정.",
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

export const classes = [
  {
    slug: "content-studio",
    name: "CONTENT STUDIO",
    title: "콘텐츠 스튜디오",
    category: "CONTENT & AI",
    description: "머릿속 아이디어를 꺼내어, 나만의 콘텐츠로 이어가는 시간.",
    color: "butter",
    number: "01",
    graphic: "MAKE",
    status: "프로그램 준비 중",
    price: null,
    date: null,
    capacity: null,
    paymentUrl: null,
  },
  {
    slug: "portfolio-ready",
    name: "PORTFOLIO READY",
    title: "포트폴리오 레디",
    category: "PORTFOLIO · START",
    description:
      "흩어진 작업을 모으고, 내가 하고 싶은 이야기의 방향을 찾습니다.",
    color: "blue",
    number: "02",
    graphic: "FIND",
    status: "프로그램 준비 중",
    price: null,
    date: null,
    capacity: null,
    paymentUrl: null,
  },
  {
    slug: "portfolio-build",
    name: "PORTFOLIO BUILD",
    title: "포트폴리오 빌드",
    category: "PORTFOLIO · BUILD",
    description: "나의 작업을 나답게 보여주는 포트폴리오를 고민합니다.",
    color: "peach",
    number: "03",
    graphic: "BUILD",
    status: "프로그램 준비 중",
    price: null,
    date: null,
    capacity: null,
    paymentUrl: null,
  },
  {
    slug: "pictureforge",
    name: "PICTUREFORGE",
    title: "픽처포지",
    category: "IMAGE & AI",
    description:
      "상상한 장면을 이미지로. AI와 함께 시각적인 가능성을 탐색합니다.",
    color: "mist",
    number: "04",
    graphic: "PLAY",
    status: "프로그램 준비 중",
    price: null,
    date: null,
    capacity: null,
    paymentUrl: null,
  },
] as const;

export const work = {
  slug: "calendar-making",
  title: "달력 만들기",
  category: "EDITORIAL / PROJECT NOTE",
  description: "일상의 시간을 새로운 시선으로 바라보는 프로젝트.",
  status: "프로젝트 자료 준비 중",
} as const;
