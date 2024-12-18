const Paths = [
  {
    path: "/banner",
    key: "banner",
    title: "배너 관리",
    sub: [],
    access: ["ADMIN", "SUPER_ADMIN"],
  },
  {
    path: "/user",
    key: "user",
    title: "회원 관리",
    sub: [],
    access: ["ADMIN", "SUPER_ADMIN"],
  },
  {
    path: "/college",
    key: "college",
    title: "대학교 관리",
    sub: [],
    access: ["ADMIN", "SUPER_ADMIN"],
  },

  {
    path: "/mindBuilding",
    key: "mindBuilding",
    title: "마인드빌딩",
    sub: [
      {
        title: "종합 심리검사",
        key: "total",
        path: "/mindBuilding/total",
      },
      {
        title: "마음일기",
        key: "diary",
        path: "/mindBuilding/diary",
      },
    ],
    access: ["ADMIN", "SUPER_ADMIN"],
  },
  {
    path: "/program",
    key: "program",
    title: "프로그램",
    sub: [
      {
        title: "프로그램 내역",
        key: "list",
        path: "/program/list",
      },
      {
        title: "프로그램 관리",
        key: "list",
        path: "/program/management",
      },
    ],
    access: ["ADMIN", "SUPER_ADMIN"],
  },

  {
    path: "/contents",
    key: "contents",
    title: "콘텐츠 관리",
    sub: [
      {
        title: "명상/ASMR",
        key: "media",
        path: "/contents/media",
      },
    ],
    access: ["ADMIN", "SUPER_ADMIN"],
  },
  {
    path: "/community",
    key: "community",
    title: "커뮤니티 관리",
    sub: [
      {
        title: "게시글 관리",
        key: "board",
        path: "/community/board",
      },

      {
        title: "댓글 관리",
        key: "comments",
        path: "/community/comments",
      },
    ],

    access: ["ADMIN", "SUPER_ADMIN"],
  },

  {
    path: "/cs",
    key: "cs",
    title: "고객센터",
    sub: [
      {
        title: "문의 관리",
        key: "inquiry",
        path: "/cs/inquiry",
      },
      {
        title: "신고글 관리",
        key: "report",
        path: "/cs/report",
      },
    ],
    access: ["ADMIN", "SUPER_ADMIN"],
  },

  {
    path: "/notice",
    key: "notice",
    title: "공지사항 관리",
    sub: [],
    access: ["ADMIN", "SUPER_ADMIN"],
  },

  {
    path: "/admin",
    key: "admin",
    title: "사용자 관리",
    sub: [],
    access: ["ADMIN", "SUPER_ADMIN"],
  },
  {
    path: "/config",
    key: "config",
    title: "앱 버전 관리",
    sub: [],
    access: ["ADMIN", "SUPER_ADMIN"],
  },
];
export default Paths;
