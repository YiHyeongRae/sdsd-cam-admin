import { atom } from "recoil";

const initialState: {
  cancleFunc: Function;
  confirmFunc: Function;
} = {
  cancleFunc: () => {},
  confirmFunc: () => {},
};

export const confirmState = atom({
  key: "confrim",
  default: initialState,
});
