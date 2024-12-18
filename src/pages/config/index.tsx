import api from "#/library/axios/api";
import { loadingState } from "#/library/recoil/atoms/loadingState";
import useLoadingState from "#/library/recoil/hook/useLoadingState";
import { forEach, isEqual, map } from "lodash";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

function index() {
  const [configData, setConfigData] = useState<{
    [key: string]: { [key: string]: string | number };
  }>();

  const [freezeConfigData, setFreezeConfigData] = useState<{
    readonly [key: string]: { [key: string]: string | number };
  }>();

  const [edit, setIsEdit] = useState<"IOS" | "ANDROID" | "">("");
  const { setLoading } = useLoadingState();

  const getConfigurationData = () => {
    // setLoading(true);
    // api
    //   .get("/admin/configuration")
    //   .then((result) => {
    //     const obj: { [key: string]: { [key: string]: string | number } } = {};
    //     map(result.data, (dataItem) => {
    //       obj[dataItem.key] = {};
    //       map(Object.keys(dataItem), (key) => {
    //         obj[dataItem.key][key] = dataItem[key];
    //       });

    //       const { value, ...rest } = obj[dataItem.key];

    //       obj[dataItem.key] = rest;
    //       forEach(value as {}, (value, key) => {
    //         obj[dataItem.key][key] = value;
    //       });
    //     });

    //     setConfigData(obj);
    //     setFreezeConfigData(obj);

    //     setLoading(false);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     setLoading(false);
    //   });

    const dummyResult: any = [
      {
        id: 2,
        key: "iOSVersion",
        value: {
          minVersionCode: "1.0.0",
          minVersionName: "1.0.0",
          latestVersionCode: "1.0.0",
          latestVersionName: "1.0.0",
        },
        category: "",
      },
      {
        id: 1,
        key: "androidVersion",
        value: {
          minVersionCode: "1.0.0",
          minVersionName: "1.0.0",
          latestVersionCode: "1.0.0",
          latestVersionName: "1.0.0",
        },
        category: "",
      },
    ];

    const obj: { [key: string]: { [key: string]: string | number } } = {};
    map(dummyResult, (dataItem) => {
      obj[dataItem.key] = {};
      map(Object.keys(dataItem), (key) => {
        obj[dataItem.key][key] = dataItem[key];
      });

      const { value, ...rest } = obj[dataItem.key];

      obj[dataItem.key] = rest;
      forEach(value as {}, (value, key) => {
        obj[dataItem.key][key] = value;
      });
    });

    setConfigData(obj);
    setFreezeConfigData(obj);
  };
  useEffect(() => {
    getConfigurationData();
  }, []);

  const submitPutConfig = (value: {}) => {
    setLoading(true);

    api
      .put(
        `/admin/configuration`,
        edit === "IOS"
          ? {
              key: "iOSVersion",
              value,
              category: "",
            }
          : { key: "androidVersion", value, category: "" },
        {}
      )
      .then((result) => {
        console.log("put success", result);
        setLoading(false);
        getConfigurationData();
        setIsEdit("");
      })
      .catch((error) => {
        console.log("catch", error.response.data.message);

        setLoading(false);
      });
  };

  return (
    <div>
      <div className="flex flex-col justify-between h-full">
        <div className="mb-6 text-xl font-bold max-sm:text-base">
          앱 버전 관리
        </div>

        <div className="px-2 py-1 my-4 text-lg text-white bg-primary">IOS</div>
        <div className="grid items-center grid-cols-3 gap-4 max-xl:grid-cols-1">
          <div className="grid items-center grid-cols-3 col-span-1 gap-2 max-xl:grid-cols-1">
            <span className="col-span-1">최소버전</span>
            <input
              type="text"
              className="col-span-2 rounded-none bg-base-100 input input-bordered input-sm max-sm:input-xs max-xl:col-span-1"
              autoFocus={false}
              disabled={edit !== "IOS"}
              value={configData?.iOSVersion?.minVersionCode || ""}
              onChange={(e) =>
                setConfigData((prev) => {
                  return {
                    ...prev,
                    iOSVersion: {
                      ...prev?.iOSVersion,
                      minVersionCode: e.target.value,
                      minVersionName: e.target.value,
                    },
                  };
                })
              }
            />
          </div>

          <div className="grid items-center grid-cols-3 col-span-1 gap-2 max-xl:grid-cols-1">
            <span className="col-span-1">최신버전</span>
            <input
              type="text"
              className="col-span-2 rounded-none bg-base-100 input input-bordered input-sm max-sm:input-xs max-xl:col-span-1"
              autoFocus={false}
              disabled={edit !== "IOS"}
              value={configData?.iOSVersion?.latestVersionCode || ""}
              onChange={(e) =>
                setConfigData((prev) => {
                  return {
                    ...prev,
                    iOSVersion: {
                      ...prev?.iOSVersion,
                      latestVersionCode: e.target.value,
                      latestVersionName: e.target.value,
                    },
                  };
                })
              }
            />
          </div>

          <div className="grid items-center grid-cols-3 col-span-1 gap-2 max-xl:grid-cols-1">
            {edit === "IOS" && (
              <button
                className="col-span-1 rounded-none btn btn-outline btn-primary btn-sm max-sm:btn-xs"
                onClick={() => {
                  setIsEdit("");
                  setConfigData(freezeConfigData);
                }}
              >
                취소
              </button>
            )}
            <button
              className="col-span-1 rounded-none btn btn-primary btn-sm max-sm:btn-xs"
              onClick={
                edit === "IOS"
                  ? () => {
                      const value = {
                        minVersionCode: configData?.iOSVersion.minVersionCode,
                        minVersionName: configData?.iOSVersion.minVersionName,
                        latestVersionCode:
                          configData?.iOSVersion.latestVersionCode,
                        latestVersionName:
                          configData?.iOSVersion.latestVersionName,
                      };

                      // submitPutConfig(value);
                    }
                  : () => {
                      setConfigData(freezeConfigData);
                      setIsEdit("IOS");
                    }
              }
              disabled={
                edit === "IOS" ? isEqual(freezeConfigData, configData) : false
              }
            >
              {edit === "IOS" ? "저장" : "수정"}
            </button>
          </div>
        </div>
        <div className="w-full py-6"></div>
        <div className="px-2 py-1 my-4 text-lg text-white bg-primary">
          Android
        </div>
        <div className="grid items-center grid-cols-3 gap-4 max-xl:grid-cols-1">
          <div className="grid items-center grid-cols-3 col-span-1 gap-2 max-xl:grid-cols-1">
            <span className="col-span-1">최소버전</span>
            <input
              type="text"
              className="col-span-2 rounded-none bg-base-100 input input-bordered input-sm max-sm:input-xs max-xl:col-span-1"
              autoFocus={false}
              disabled={edit !== "ANDROID"}
              value={configData?.androidVersion?.minVersionCode || ""}
              onChange={(e) =>
                setConfigData((prev) => {
                  return {
                    ...prev,
                    androidVersion: {
                      ...prev?.androidVersion,
                      minVersionCode: e.target.value,
                      minVersionName: e.target.value,
                    },
                  };
                })
              }
            />
          </div>

          <div className="grid items-center grid-cols-3 col-span-1 gap-2 max-xl:grid-cols-1">
            <span className="col-span-1">최신버전</span>
            <input
              type="text"
              className="col-span-2 rounded-none bg-base-100 input input-bordered input-sm max-sm:input-xs max-xl:col-span-1"
              autoFocus={false}
              disabled={edit !== "ANDROID"}
              value={configData?.androidVersion?.latestVersionCode || ""}
              onChange={(e) =>
                setConfigData((prev) => {
                  return {
                    ...prev,
                    androidVersion: {
                      ...prev?.androidVersion,
                      latestVersionCode: e.target.value,
                      latestVersionName: e.target.value,
                    },
                  };
                })
              }
            />
          </div>

          <div className="grid items-center grid-cols-3 col-span-1 gap-2 max-xl:grid-cols-1">
            {edit === "ANDROID" && (
              <button
                className="col-span-1 rounded-none btn btn-outline btn-primary btn-sm max-sm:btn-xs"
                onClick={() => {
                  setIsEdit("");
                  setConfigData(freezeConfigData);
                }}
              >
                취소
              </button>
            )}

            <button
              className="col-span-1 rounded-none btn btn-primary btn-sm max-sm:btn-xs"
              disabled={
                edit === "ANDROID"
                  ? isEqual(freezeConfigData, configData)
                  : false
              }
              onClick={
                edit === "ANDROID"
                  ? () => {
                      const value = {
                        minVersionCode:
                          configData?.androidVersion.minVersionCode,
                        minVersionName:
                          configData?.androidVersion.minVersionName,
                        latestVersionCode:
                          configData?.androidVersion.latestVersionCode,
                        latestVersionName:
                          configData?.androidVersion.latestVersionName,
                      };

                      // submitPutConfig(value);
                    }
                  : () => {
                      setConfigData(freezeConfigData);
                      setIsEdit("ANDROID");
                    }
              }
            >
              {edit === "ANDROID" ? "저장" : "수정"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default index;
