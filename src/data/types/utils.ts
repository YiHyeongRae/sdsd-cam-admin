import { TdObjTypes } from "./components";

type MakeExcelFunctionTypes = {
  sheetName: string;
  data: TdObjTypes[];
  addedMap: string[][];
  colSpanStarter?: { [key: string]: { title: string; colSpan: number } };
};

type UseToastFunctionTypes = {
  list: { [key: string]: string | boolean }[];
  setter: Function;
  info: {
    message: string;
    type: "alert-warning" | "alert-info" | "alert-error" | "alert-success";
    life: boolean;
  };
};
export type { MakeExcelFunctionTypes, UseToastFunctionTypes };
