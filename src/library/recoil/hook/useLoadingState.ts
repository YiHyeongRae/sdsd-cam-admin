import { useRecoilState } from "recoil";
import { loadingState } from "#/library/recoil/atoms/loadingState";

const useLoadingState = () => {
  const [state, setState] = useRecoilState(loadingState);

  const toggleLoading = () => {
    setState((prev) => ({
      ...prev,
      isLoading: !prev.isLoading,
      isModal: !prev.isModal,
    }));
  };

  const setLoading = (isLoading: boolean) => {
    setState((prev) => ({
      ...prev,
      isLoading,
    }));
  };

  const setModalLoading = (isActive: boolean) => {
    setState((prev) => ({
      ...prev,
      isLoading: isActive,
      isModal: isActive,
    }));
  };

  return { state, toggleLoading, setLoading, setModalLoading };
};

export default useLoadingState;
