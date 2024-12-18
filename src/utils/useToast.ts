import { UseToastFunctionTypes } from "../data/types/utils";

export function useToast({ list, setter, info }: UseToastFunctionTypes) {
  const copy = [...list];

  copy.push(info);
  setter(copy);
}
