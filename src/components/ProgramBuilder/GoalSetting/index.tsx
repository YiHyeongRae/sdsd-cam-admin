import Table from "#/components/Table";
import { TdObjTypes } from "#/data/types/components";
import api from "#/library/axios/api";
import useConfirmState from "#/library/recoil/hook/useConfirmState";
import useLoadingState from "#/library/recoil/hook/useLoadingState";
import useMakeFreeze from "#/utils/useMakeFreeze";
import { openModal } from "#/utils/useModalHandler";
import { useEffect, useState } from "react";

function index({ id, currentContent }: { id: number; currentContent: string }) {
  type GoalsTyeps = {
    programId: number;
    programSequenceId: number;
    title: string;
    displayedNum: number;
    isRandom: boolean;
    goals: { id: number; goal: string }[];
  };
  const [goalsData, setGoalsData] = useState<GoalsTyeps>({
    programId: 0,
    programSequenceId: 0,
    title: "",
    displayedNum: 0,
    isRandom: false,
    goals: [],
  });
  const { setModalLoading } = useLoadingState();
  const [freezeGoals, setFreezeGoals] = useState<
    { id: number; goal: string }[]
  >([]);

  // const [goalsDraggable, setGoalsDraggable] = useState(false);

  const getGoals = () => {
    // setModalLoading(true);
    // api
    //   .get(`/admin/program/content/goal-setting`, {
    //     params: { programSequenceId: id },
    //   })
    //   .then((result) => {

    //     setGoalsData(result.data);

    //     const freeze = useMakeFreeze(result.data.goals);
    //     setFreezeGoals(freeze);

    //     setModalLoading(false);
    //   })
    //   .catch((error) => {
    //     setModalLoading(false);
    //   });

    const dummyResult: any = {
      programId: 4,
      contentId: 1,
      title: "목표설쩡",
      displayedNum: 3,
      isRandom: false,
      goals: [
        {
          id: 23,
          goal: "목표하나더",
        },
      ],
    };
    setGoalsData(dummyResult);

    const freeze = useMakeFreeze(dummyResult.goals);
    setFreezeGoals(freeze);
  };
  useEffect(() => {
    getGoals();
  }, [id]);

  const [editTarget, setEditTarget] = useState<number | null>(null);

  const { setConfirmFunc } = useConfirmState();

  const submitPutGoal = (index: number) => {
    api
      .put(`/admin/program/content/goal-setting`, {
        goalId: goalsData.goals[index].id,
        goal: goalsData.goals[index].goal,
      })
      .then((result) => {
        console.log("success", result);
        getGoals();
        setEditTarget(null);
      })
      .catch(() => {});
  };
  const submitDeleteGoal = (targetId: number) => {
    api
      .delete(`/admin/program/content/goal-setting`, {
        params: {
          goalId: targetId,
        },
      })
      .then((result) => {
        console.log("success", result);
        getGoals();
        // setEditTarget(null);
      })
      .catch(() => {});
  };

  const [addGoal, setAddGoal] = useState({
    active: false,
    goal: "",
  });

  const submitAddGoal = () => {
    api
      .post(`/admin/program/content/goal-setting`, {
        programSequenceId: id,
        goal: addGoal.goal,
      })
      .then((result) => {
        console.log("success", result);
        getGoals();
        setEditTarget(null);
        setAddGoal((prev) => {
          return { ...prev, active: false, goal: "" };
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [isEdit, setIsEdit] = useState(false);
  const submitEditContent = () => {
    setModalLoading(true);
    api
      .put(
        `/admin/program/content`,

        {
          programSequenceId: id,
          isRandom: goalsData.isRandom,
          displayedNum: goalsData.displayedNum,
        }
      )
      .then((result) => {
        setModalLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setModalLoading(false);
      });
  };

  return (
    <div className="grid grid-cols-2 gap-4 mt-10">
      <div className="col-span-2 px-2 py-1 my-1 text-lg text-white bg-primary">
        목표설정
      </div>
      <div className="grid items-center grid-cols-3 col-span-2 gap-2">
        <span className="col-span-1">노출방식</span>

        <select
          disabled={!isEdit}
          className="col-span-2 rounded-none join-item select-sm select select-bordered max-xl:select-xs"
          value={String(goalsData.isRandom) || ""}
          onChange={(e) =>
            setGoalsData((prev) => {
              return {
                ...prev,
                isRandom: e.target.value === "true" ? true : false,
              };
            })
          }
        >
          <option value="true">무작위</option>
          <option value="false">선별</option>
        </select>
      </div>
      <div className="grid items-center grid-cols-3 col-span-2 gap-2">
        <span className="col-span-1">노출수</span>
        <input
          disabled={!isEdit}
          type="text"
          className="col-span-2 rounded-none grow bg-base-100 input input-bordered input-sm max-sm:input-xs"
          placeholder=""
          value={goalsData?.displayedNum}
          onChange={(e) => {
            setGoalsData((prev) => {
              return { ...prev, displayedNum: Number(e.target.value) };
            });
          }}
          autoFocus={false}
        />
        <div className="flex justify-end col-span-3 gap-2">
          {isEdit ? (
            <>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => {
                  setIsEdit(false);
                }}
              >
                취소
              </button>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => {
                  // submitEditContent();
                  setIsEdit(false);
                }}
              >
                저장
              </button>
            </>
          ) : (
            <button
              className="btn btn-primary btn-sm"
              onClick={() => {
                setIsEdit(true);
              }}
            >
              수정
            </button>
          )}
        </div>
      </div>
      <div className="grid items-center col-span-2 gap-2">
        <Table
          tableTitle={`목표설정 - ${goalsData.goals.length}건`}
          divider={false}
          // draggable
          // trOptions={{
          //   tbody: {
          //     isDraggable: () => goalsDraggable,
          //     draggableStatus: goalsDraggable,
          //   },
          // }}
          data={goalsData.goals || []}
          addedMap={[
            ["id", "목표 ID"],
            ["goal", "목표"],
            ["edit", "수정/삭제"],
          ]}
          tdOptions={{
            goal: {
              el: (item: TdObjTypes, index: number) => {
                if (editTarget === index) {
                  return (
                    <input
                      className="w-full input input-sm input-bordered input-primary"
                      type="text"
                      value={goalsData.goals[index]?.goal}
                      onChange={(e) => {
                        setGoalsData((prev) => {
                          const copy = [...prev.goals];

                          copy[index] = {
                            ...copy[index],
                            goal: String(e.target.value),
                          };

                          return { ...prev, goals: copy };
                        });
                      }}
                    />
                  );
                }

                return <span>{String(item)}</span>;
              },
            },
            edit: {
              el: (_: undefined, index: number, item: TdObjTypes) => {
                return (
                  <div className={`flex gap-2`}>
                    {editTarget !== null && editTarget === index ? (
                      <>
                        <button
                          className="btn btn-sm btn-primary btn-outline"
                          onClick={() => {
                            setEditTarget(null);
                            setGoalsData((prev) => {
                              return { ...prev, goals: freezeGoals };
                            });
                          }}
                        >
                          취소
                        </button>
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={() => {
                            // submitPutGoal(index);
                          }}
                        >
                          저장
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={() => {
                            setGoalsData((prev) => {
                              return { ...prev, goals: freezeGoals };
                            });
                            setEditTarget(index);
                          }}
                        >
                          수정
                        </button>
                        <button
                          className="btn btn-sm btn-error"
                          onClick={() => {
                            // setConfirmFunc(() =>
                            //   submitDeleteGoal(Number(item.id))
                            // );
                            openModal("confirm-delete");
                          }}
                        >
                          삭제
                        </button>
                      </>
                    )}
                  </div>
                );
              },
            },
          }}
          // buttons={
          //   <>
          //     {goalsDraggable ? (
          //       <>
          //         <button
          //           className="rounded-none btn btn-outline btn-sm max-xl:btn-xs"
          //           onClick={() => {
          //             const copy = [...freezeGoals];
          //             setGoalsData((prev: any) => {
          //               return { ...prev, goals: copy };
          //             });

          //             setGoalsDraggable(false);
          //           }}
          //         >
          //           취소
          //         </button>
          //         <button
          //           className="rounded-none btn btn-primary btn-sm max-xl:btn-xs"
          //           onClick={() => {
          //             // submitPutSessionSequence();
          //             setGoalsDraggable(false);
          //           }}
          //         >
          //           저장
          //         </button>
          //       </>
          //     ) : (
          //       <>
          //         <button
          //           className="rounded-none btn btn-primary btn-sm max-xl:btn-xs"
          //           onClick={() => setGoalsDraggable(true)}
          //         >
          //           우선순위 변경
          //         </button>
          //       </>
          //     )}
          //   </>
          // }
        />

        {addGoal.active && (
          <table
            className="table table-s max-sm:table-xs !border-separate !border-spacing-0"
            align="center"
          >
            <thead className="">
              <tr className="border-zinc-400">
                <th
                  className="text-base text-center border border-zinc-300"
                  colSpan={6}
                >
                  <div className="flex items-center justify-center">목표</div>
                </th>

                <th
                  colSpan={1}
                  className="text-base text-center border border-zinc-300"
                >
                  <div className="flex items-center justify-center">
                    취소/저장
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={6}>
                  <div className="flex items-center justify-center">
                    <input
                      className="min-w-[74.5%] flex-auto input input-sm input-bordered input-primary max-sm:min-w-[72%]"
                      type="text"
                      onChange={(e) => {
                        setAddGoal((prev) => {
                          return { ...prev, goal: e.target.value };
                        });
                      }}
                    />
                  </div>
                </td>

                <td colSpan={1}>
                  <div className="flex justify-center flex-auto w-full gap-2 ">
                    <button
                      className="btn btn-sm btn-primary btn-outline"
                      onClick={() =>
                        setAddGoal((prev) => {
                          return { ...prev, active: false };
                        })
                      }
                    >
                      취소
                    </button>
                    <button
                      disabled={addGoal.goal.length === 0}
                      className="btn btn-sm btn-primary"
                      // onClick={() => submitAddGoal()}
                    >
                      저장
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        )}
        {/* {addGoal.active && (
          <div className="flex">
            <input
              className="min-w-[74.5%] flex-auto input input-sm input-bordered input-primary max-sm:min-w-[72%]"
              type="text"
              onChange={(e) => {
                setAddGoal((prev) => {
                  return { ...prev, goal: e.target.value };
                });
              }}
            />
            <div className=" w-full flex justify-center flex-auto gap-2 min-w-[108px] max-w-[249px]">
              <button
                className="btn btn-sm btn-primary btn-outline"
                onClick={() =>
                  setAddGoal((prev) => {
                    return { ...prev, active: false };
                  })
                }
              >
                취소
              </button>
              <button
                className="btn btn-sm btn-primary"
                onClick={() => submitAddGoal()}
              >
                저장
              </button>
            </div>
          </div>
        )} */}

        <div
          className="mt-10 text-xl font-bold cursor-pointer"
          onClick={() =>
            setAddGoal((prev) => {
              return { ...prev, active: true };
            })
          }
        >
          목표추가 +
        </div>
      </div>
    </div>
  );
}

export default index;
