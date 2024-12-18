import { ReactNode } from "react";

type CarouselInfinite = {
  initialIndexValue?: number;
  getCurrentIndex?: Function;
  children: ReactNode;
  infinite?: boolean;
  interval?: never;
};
type CarouselInterval = {
  initialIndexValue?: number;
  getCurrentIndex?: Function;
  children: ReactNode;
  infinite?: never;
  interval?: number;
};
type CarouselTypes = CarouselInterval | CarouselInfinite;

type ColSpanStarterTypes = {
  [key: string]: {
    title: string;
    colSpan: number;
  };
};

type additionalTrOptionsTypes = {
  colSpanStarter: ColSpanStarterTypes;
  colSpanTarget: string[];
};

type TableTypes = {
  overflowY?: { active: boolean; maxHeight: string };
  className?: string;
  data: TdObjTypes[];
  addedMap: string[][];
  divider?: boolean;
  checkable?: { active: boolean; multi: boolean; setter: Function };
  draggable?: boolean;
  tableTitle?: string;
  trOptions?: {
    thead?: {
      className?: Function;
      func?: Function;
      isDraggable?: Function;
    };
    tbody?: {
      className?: Function;
      func?: Function;
      isDraggable?: Function;
      dragEndFunc?: Function;
      dbClickFunc?: Function;
    };
  };
  additionalTrOptions?: additionalTrOptionsTypes;
  tdOptions?: {
    [key: string]: {
      className?: string;
      func?: Function;
      tooltip?: { active: boolean; text: string };
      el?: Function;
    };
  };
  searchText?: string;
  buttons?: ReactNode;
  perPageList?: number[];
  perPageOptions?: {
    page: number;
    perPage: number;
    pageLength: number;
    setPerPage: Function;
  };
};

type TableTdFunctionTypes = {
  array: TdObjTypes[];
  setter: Function;
  perPage: number;
  page: number;
  thMap: Map<string, string>;
};
type TableThFunctionTypes = {
  addedMap: string[][];
  thMap: Map<string, string>;
  setter: Function;
};

type TableExtensionHeaderTypes = {
  period?: { active?: boolean; setter?: Function; placeholder?: string };
  search?: { active?: boolean; setter?: Function; placeholder?: string };
  additionalArea?: ReactNode;
  query?: {
    active?: boolean;
    setter?: Function;
    submit?: Function;
    reset?: Function;
    disabled?: boolean;
    placeholder?: string;
  };
  etc?: {
    className: string;
    text: string;
    func: Function;
    disabled: boolean;
  }[];
  newEtc?: ReactNode;
};

type TdObjTypes = {
  [x: string]:
    | string
    | number
    | boolean
    | string[]
    | number[]
    | boolean[]
    | {}
    | File
    | null;
};

type ModalTypes = {
  id: string;
  className?: string;
  children: ReactNode;
  closeFunc?: Function;
  open?: boolean;
};

type ModalOpenerTypes = {
  className?: string;
  id: string;
  children: ReactNode;
  func?: Function;
};

type AlertTypes = {
  id: string;
  title: string;
  text: string;
  buttons: {
    style: string;
    text: string;
    func: Function;
    disabled: boolean;
  }[];
  open?: boolean;
  className?: string;
  closeFunc?: Function;
};

type AlertOpenerTypes = {
  style?: string;
  id: string;
  text?: string;
  func?: Function;
  children?: ReactNode;
};

type AccessGuardTypes = {
  data: {
    path: string;
    key: string;
    sub: {
      title: string;
      key: string;
      path: string;
    }[];
    access: string[];
  }[];
  role: string;
  children: ReactNode;
  isChangedPassword: boolean;
};
type AuthGuardTypes = {
  // isAuthenticated: boolean;
  // redirectTo: string;
  children: ReactNode;
};

type CalendarTypes = {
  select: {
    selected?: {
      year: number;
      month: number;
      date: number;
      day: number;
      dateStr: string;
    };
    setter: Function;
  };
  closeFunc?: Function;
  past?: string;
  future?: string;
  separater?: string;
};

type EditableCellTypes = {
  item: string;
  index: number;
  edit: {
    editItem: string | number;
    setEditItem: Function;
    confirmFunc?: Function;
    cancleFunc?: Function;
  };
};

type TimePickerTypes = {
  fixedHeight?: string;
  type?: "half" | "full";
  select: {
    selected?: {
      ampm: string;
      hour: string;
      minute: string;
      second: string;
      timeStr: string;
    };
    setter: Function;
  };

  use: {
    hour: boolean;
    minute: boolean;
    second: boolean;
  };

  perSecond?: 1 | 2 | 3 | 4 | 5 | 6 | 10 | 12;
  perItems?: number;
};

type ToastTypes = {
  list: { [key: string]: string | boolean }[];
  setter: Function;
  duration?: number;
  position?:
    | "toast-start"
    | "toast-end"
    | "toast-top"
    | "toast-middle"
    | "toast-bottom";
};

type TableResData = {
  [key: string]: { [key: string]: number | string | boolean }[];
};
interface TableCountTypes {
  totalCount: number;
}

type TableStateTypes = TableResData & TableCountTypes;

type BoardType = {
  board?: {
    [key: string]: string | number | string[];
  };
};

type CommentsType = {
  comment?: {
    [key: string]:
      | string
      | number
      | string[]
      | { [key: string]: string | number }[];
  };
};
interface ReportDetailTypes extends BoardType, CommentsType {
  type: "board" | "comment";
  targetId?: string;
  reports: {
    [key: string]: string | number;
  }[];
}

type CommentsList = {
  comment: string;
  createdAt: string;
  id: number;
  isDeleted: boolean;
  like: number;
  mindfulnessCommentId: number | null;
  reportNum: number;
  updatedAt: string;
  userId: number;
  userName: string;
};

type CommentsListTypes = {
  targetId: string;
  type: string;
  reloadComment: Function;
  deleteComment: Function;
  commentsList: CommentsList[][];
  perPageOptions?: {
    page: number;
    perPage: number;
    pageLength: number;
    setPerPage: Function;
  };
  search?: {
    text: string;
    setText: Function;
  };
};
type DetailTypes = {
  [key: string]: {
    detailId: number;
    title: string;
    soundType: string;
    soundLink: string;
    imageLink: {
      panel: string;
      active: string;
      inactive: string;
    } | null;
  };
};

type ContentTypes = {
  groupId: string;
  id: string;
  edit?: boolean;
  mindCategory?: string;
  title: string;
  subTitle: string;
  description: string;
  thumbnail: File | null;
  backgroundImage: File | null;
  backGroundTitle: string;
  backGround: File | null;
  soundEffect1: File | null;
  soundEffect1Title: string;
  soundEffect2: File | null;
  soundEffect2Title: string;
  soundEffect3: File | null;
  soundEffect3Title: string;
  isActive: boolean;
  isHome?: boolean;
  voice1: File | null;
  voice1Title: string;
  voice1ActiveImage: File | null;
  voice1InactiveImage: File | null;
  voice1PanelImage: File | null;
  voice2: File | null;
  voice2Title: string;
  voice2ActiveImage: File | null;
  voice2InactiveImage: File | null;
  voice2PanelImage: File | null;
  playTime: number;
  minutes?: string;
  seconds?: string;
  details?: DetailTypes;
};

type GroupTypes = {
  id: string;
  mindCategory: string;
  groupName: string;
  introductionImage: File | null;
  textImage: File | null;
  characterImage: File | null;
  introduction: string;
  isActive: string;
  mindfulness: TdObjTypes[];
};

export type {
  TableTypes,
  TableTdFunctionTypes,
  TableThFunctionTypes,
  TableExtensionHeaderTypes,
  TdObjTypes,
  CarouselTypes,
  ModalTypes,
  ModalOpenerTypes,
  AlertTypes,
  AlertOpenerTypes,
  AccessGuardTypes,
  AuthGuardTypes,
  CalendarTypes,
  EditableCellTypes,
  TimePickerTypes,
  ToastTypes,
  TableStateTypes,
  ReportDetailTypes,
  CommentsType,
  CommentsListTypes,
  ContentTypes,
  GroupTypes,
};
