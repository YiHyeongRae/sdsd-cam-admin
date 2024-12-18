import { useRecoilState } from "recoil";
import { TdObjTypes } from "#/data/types/components";
import { collegeState } from "../atoms/collegeState";

const useCollegeState = () => {
  const [state, setState] = useRecoilState(collegeState);

  const setColleges = (colleges: []) => {
    setState((prev) => ({
      ...prev,
      colleges,
    }));
  };

  return { state, setColleges };
};

export default useCollegeState;
