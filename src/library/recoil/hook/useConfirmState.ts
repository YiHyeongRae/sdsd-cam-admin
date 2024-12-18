import { useRecoilState } from "recoil";
import { loadingState } from "#/library/recoil/atoms/loadingState";
import { confirmState } from "#/library/recoil/atoms/confirmFuncState";

const useConfirmState = () => {
  const [state, setState] = useRecoilState(confirmState);

  const setConfirmFunc = (confirmFunc: Function) => {
    setState((prev) => ({
      ...prev,
      confirmFunc,
    }));
  };

  const setCancleFunc = (cancleFunc: Function) => {
    setState((prev) => ({
      ...prev,
      cancleFunc,
    }));
  };

  return { state, setConfirmFunc, setCancleFunc };
};

export default useConfirmState;
