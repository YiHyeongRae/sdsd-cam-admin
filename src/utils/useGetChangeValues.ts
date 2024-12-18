import { isEqual, reduce } from "lodash";

type Value = string | boolean | number | File | null;

interface ValueObject {
  [key: string]: Value;
}

export const getChangedFileValues = (obj1: ValueObject, obj2: ValueObject) => {
  return reduce(
    obj1,
    (result: ValueObject, value, key) => {
      const isNullOrFileInObj2 = (val: Value) =>
        val === null || val instanceof File;

      // obj2의 값이 null 또는 File일 때만 비교
      if (isNullOrFileInObj2(obj2[key]) && !isEqual(value, obj2[key])) {
        result[key] = obj2[key];
      }
      return result;
    },
    {} as ValueObject
  );
};

export const getChangedAllValues = (obj1: ValueObject, obj2: ValueObject) => {
  return reduce(
    obj1,
    (result: ValueObject, value, key) => {
      if (!isEqual(value, obj2[key])) {
        result[key] = obj2[key];
      }
      return result;
    },
    {} as ValueObject
  );
};
