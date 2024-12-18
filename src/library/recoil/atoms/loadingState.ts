import { atom } from "recoil";

const initialState = {
  isLoading: false,
  isModal: false,
};

export const loadingState = atom({
  key: "loading",
  default: initialState,
});
