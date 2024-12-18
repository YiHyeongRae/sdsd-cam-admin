type PathTypes = {
  open: boolean;
  data: {
    path: string;
    key: string;
    title: string;
    sub: {
      title: string;
      key: string;
      path: string;
    }[];
    access: string[];
  }[];
  role: string;
};

type HeaderTypes = {
  func?: Function;
  navState: boolean;
  user: { [key: string]: string | number };
};

export type { PathTypes, HeaderTypes };
