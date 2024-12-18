import Table from "#/components/Table";
import { TdObjTypes } from "#/data/types/components";
import api from "#/library/axios/api";
import useLoadingState from "#/library/recoil/hook/useLoadingState";
import useMakeFreeze from "#/utils/useMakeFreeze";
import { isEqual, map, some } from "lodash";
import { useEffect, useState } from "react";

function index({ id }: { id: number }) {
  const { setModalLoading } = useLoadingState();

  const [isEdit, setIsEdit] = useState(false);
  const [isGoalChievementEdit, setIsGoalAcievementEdit] = useState(false);
  const [GoalAchievementData, setGoalAchievementData] = useState<{
    id: number;
    comments: string[];
  }>({
    id: 0,
    comments: [],
  });

  const [freezeGoalAchievement, setFreezeGoalAchievement] = useState<string[]>(
    []
  );
  const getGoalAchievement = () => {
    // setModalLoading(true);
    // api
    //   .get(`/admin/program/content/goal-achievement`, {
    //     params: { programSequenceId: id },
    //   })
    //   .then((result) => {
    //     if (Object.keys(result.data).length === 0) {
    //       setIsEdit(false);
    //       setGoalAchievementData((prev) => {
    //         return { ...prev, id: 0, comments: ["", "", "", "", ""] };
    //       });
    //     } else {
    //       setIsEdit(true);

    //       const freeze = useMakeFreeze(result.data);

    //       setGoalAchievementData(result.data);
    //       setFreezeGoalAchievement(freeze.comments);
    //     }

    //     setModalLoading(false);
    //   })
    //   .catch((error) => {
    //     setModalLoading(false);
    //   });

    const dummyResult: any = {
      id: 2,
      comments: [
        "aeraj",
        "jwaera",
        "oijrewiorjio",
        "eiwjriowejrio",
        "weiorjaiowjra",
      ],
    };

    if (Object.keys(dummyResult).length === 0) {
      setIsEdit(false);
      setGoalAchievementData((prev) => {
        return { ...prev, id: 0, comments: ["", "", "", "", ""] };
      });
    } else {
      setIsEdit(true);

      const freeze = useMakeFreeze(dummyResult);

      setGoalAchievementData(dummyResult);
      setFreezeGoalAchievement(freeze.comments);
    }
  };

  useEffect(() => {
    getGoalAchievement();
  }, [id]);

  const submitAddGoalAchievement = () => {
    setModalLoading(true);

    api
      .post(`/admin/program/content/goal-achievement`, {
        programSequenceId: id,
        comments: GoalAchievementData.comments,
      })
      .then((result) => {
        getGoalAchievement();

        setModalLoading(false);
      })
      .catch((error) => {
        setModalLoading(false);
      });
  };
  console.log("GoalAchievementData", GoalAchievementData);
  console.log("freezeGoalAchievement", freezeGoalAchievement);

  const submitPutEditGoalAchievement = () => {
    setModalLoading(true);

    api
      .put(`/admin/program/content/goal-achievement`, {
        goalAchievementId: GoalAchievementData.id,
        comments: GoalAchievementData.comments,
      })
      .then((result) => {
        getGoalAchievement();
        setIsEdit(true);
        setIsGoalAcievementEdit(false);
        setModalLoading(false);
        setGoalAchievementData((prev) => {
          return { ...prev, id: 0, comments: [] };
        });
      })
      .catch((error) => {
        setModalLoading(false);
      });
  };

  const submitDeleteGoalAchievement = () => {
    setModalLoading(true);

    api
      .delete(`/admin/program/content/goal-achievement`, {
        params: {
          goalAchievementId: GoalAchievementData.id,
        },
      })
      .then((result) => {
        getGoalAchievement();
        setIsEdit(true);
        setIsGoalAcievementEdit(false);
        setModalLoading(false);
      })
      .catch((error) => {
        setModalLoading(false);
      });
  };
  return (
    <div className="grid grid-cols-2 gap-4 mt-10">
      <div className="col-span-2 px-2 py-1 my-1 text-lg text-white bg-primary">
        목표확인 코멘트
      </div>
      <div className="col-span-2">
        {/* <Table
          data={GoalAchievementData.comments || []}
          addedMap={[
            ["level", "척도"],
            ["comment", "코멘트"],
          ]}
          tdOptions={{
            comment: {
              el: (item: string, index: number, obj: TdObjTypes) => {
                return (
                  <textarea
                    disabled={isEdit && !isGoalChievementEdit}
                    className="w-full resize-none textarea textarea-bordered textarea-sm"
                    value={GoalAchievementData?.comments[index]?.comment}
                    onChange={(e) => {
                      const copy = [...GoalAchievementData.comments];
                      copy[index].comment = e.target.value;
                      setGoalAchievementData((prev) => {
                        return { ...prev, comments: copy };
                      });
                    }}
                  ></textarea>
                );
              },
            },
          }}
        /> */}
        <table
          className="table table-s max-sm:table-xs !border-separate !border-spacing-0"
          align="center"
        >
          <thead className="">
            <tr className="border-zinc-400">
              <th className="text-base text-center border border-zinc-300">
                <div className="flex items-center justify-center">척도</div>
              </th>

              <th className="text-base text-center border border-zinc-300">
                <div className="flex items-center justify-center">코멘트</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {map(GoalAchievementData.comments, (item, index) => {
              return (
                <tr key={index}>
                  <td>
                    <div className="flex items-center justify-center">
                      {index}
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center justify-center">
                      <textarea
                        disabled={isEdit && !isGoalChievementEdit}
                        className="w-full resize-none textarea textarea-bordered textarea-sm"
                        value={GoalAchievementData?.comments[index]}
                        onChange={(e) => {
                          const copy = [...GoalAchievementData.comments];
                          copy[index] = e.target.value;
                          setGoalAchievementData((prev) => {
                            return { ...prev, comments: copy };
                          });
                        }}
                      ></textarea>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end col-span-3 gap-2">
        {!isEdit ? (
          <button
            className="btn btn-primary btn-sm"
            disabled={some(GoalAchievementData.comments, (item) => item === "")}
            // onClick={() => submitAddGoalAchievement()}
          >
            등록
          </button>
        ) : isGoalChievementEdit ? (
          <>
            <button
              className="btn btn-primary btn-outline btn-sm"
              onClick={() => {
                setIsGoalAcievementEdit(false);
                setGoalAchievementData((prev) => {
                  return { ...prev, comments: freezeGoalAchievement };
                });
              }}
            >
              취소
            </button>
            <button
              disabled={isEqual(
                GoalAchievementData.comments,
                freezeGoalAchievement
              )}
              className="btn btn-primary btn-sm"
              // onClick={() => submitPutEditGoalAchievement()}
            >
              저장
            </button>
          </>
        ) : (
          <>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => setIsGoalAcievementEdit(true)}
            >
              수정
            </button>
            <button
              className="btn btn-error btn-sm"
              // onClick={() => submitDeleteGoalAchievement()}
            >
              삭제
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default index;
