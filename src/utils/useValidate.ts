import { some } from "lodash";
type DisabledConditionTypes = {
  condition: Function;
  keys: string[];
};

const useValidate = (
  target: {
    [key: string]: string | number | null | undefined | boolean | File | Object;
  },
  disabled: DisabledConditionTypes[]
) => {
  const validationChecks: boolean[] = [];
  const needValidation: string[] = [];
  disabled.map((item) => {
    item.keys.map((key) => {
      const check = item.condition(target[key]);

      validationChecks.push(check);

      if (item.condition(target[key])) {
        needValidation.push(key);
      }
    });
  });

  const isValied = some(validationChecks, (item) => item === true);

  return {
    isValied,
    needValidation,
  };
};

export default useValidate;
