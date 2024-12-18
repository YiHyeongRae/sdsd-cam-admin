import Table from "#/components/Table";
import { TdObjTypes } from "#/data/types/components";
import api from "#/library/axios/api";
import useConfirmState from "#/library/recoil/hook/useConfirmState";
import useLoadingState from "#/library/recoil/hook/useLoadingState";
import useMakeFreeze from "#/utils/useMakeFreeze";
import { openModal } from "#/utils/useModalHandler";
import { useEffect, useState } from "react";

function index({ id }: { id: number }) {
  type ChallengesType = {
    programId: number;
    programSequenceId: number;
    title: string;
    displayedNum: number;
    isRandom: boolean;
    challenges: TdObjTypes[];
  };
  const [challengesData, setChallengesData] = useState<ChallengesType>({
    programId: 0,
    programSequenceId: 0,
    title: "",
    displayedNum: 0,
    isRandom: false,
    challenges: [],
  });
  const { setModalLoading } = useLoadingState();
  const [freezeChallenges, setFreezeChallenges] = useState<
    { id: number; goal: string }[]
  >([]);

  // const [goalsDraggable, setGoalsDraggable] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const getChallenges = () => {
    // setModalLoading(true);
    // api
    //   .get(`/admin/program/content/challenge`, {
    //     params: { programSequenceId: id },
    //   })
    //   .then((result) => {
    //     setChallengesData(result.data);

    //     const freeze = useMakeFreeze(result.data.challenges);
    //     setFreezeChallenges(freeze);

    //     setModalLoading(false);
    //   })
    //   .catch((error) => {
    //     setModalLoading(false);
    //   });

    const dummyResult: any = {
      programId: 4,
      contentId: 33,
      title: "챌린",
      displayedNum: 1,
      isRandom: null,
      challenges: [
        {
          id: 111,
          challenge: "챌린지",
          required: false,
          tag: "자율성",
        },
        {
          id: 113,
          challenge: "삭제하고 추가함",
          required: true,
          tag: "삭제성",
        },
      ],
    };

    setChallengesData(dummyResult);

    const freeze = useMakeFreeze(dummyResult.challenges);
    setFreezeChallenges(freeze);
  };
  useEffect(() => {
    getChallenges();
  }, [id]);

  const [editTarget, setEditTarget] = useState<number | null>(null);

  const submitPutChallenge = (index: number) => {
    api
      .put(`/admin/program/content/challenge`, {
        challengeId: challengesData.challenges[index].id,
        challenge: challengesData.challenges[index].challenge,
        required: challengesData.challenges[index].required,
        tag: challengesData.challenges[index].tag,
      })
      .then((result) => {
        getChallenges();
        setEditTarget(null);
      })
      .catch(() => {});
  };
  const submitDeleteChallenge = (targetId: number) => {
    api
      .delete(`/admin/program/content/challenge`, {
        params: {
          challengeId: targetId,
        },
      })
      .then((result) => {
        console.log("success", result);
        getChallenges();
        // setEditTarget(null);
      })
      .catch(() => {});
  };

  const [addChallenge, setAddChallenge] = useState({
    active: false,
    challenge: "",
    tag: "",
    required: false,
  });

  const submitAddChallenge = () => {
    api
      .post(`/admin/program/content/challenge`, {
        programSequenceId: id,
        challenge: addChallenge.challenge,
        required: addChallenge.required,
        tag: addChallenge.tag,
      })
      .then((result) => {
        console.log("success", result);
        getChallenges();
        setEditTarget(null);
        setAddChallenge((prev) => {
          return {
            ...prev,
            active: false,
            challenge: "",
            tag: "",
            required: false,
          };
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const submitEditContent = () => {
    setModalLoading(true);
    api
      .put(
        `/admin/program/content`,

        {
          programSequenceId: id,
          isRandom: challengesData.isRandom,
          displayedNum: challengesData.displayedNum,
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
  const { setConfirmFunc } = useConfirmState();

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
          value={String(challengesData?.isRandom) || ""}
          onChange={(e) =>
            setChallengesData((prev) => {
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
          value={challengesData?.displayedNum}
          onChange={(e) => {
            setChallengesData((prev) => {
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
                }}
              >
                수정
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
          // tableTitle={`목표설정 - ${goalsData.goals.length}건`}
          divider={false}
          // draggable
          // trOptions={{
          //   tbody: {
          //     isDraggable: () => goalsDraggable,
          //     draggableStatus: goalsDraggable,
          //   },
          // }}
          // data={goalsData.goals || []}
          data={challengesData.challenges || []}
          addedMap={[
            ["id", "챌린지 ID"],
            ["required", "필수"],
            ["challenge", "챌린지"],
            ["tag", "태그"],
            ["edit", "수정/삭제"],
          ]}
          tdOptions={{
            required: {
              el: (item: TdObjTypes, index: number) => {
                return (
                  <input
                    disabled={editTarget !== index}
                    className="checkbox"
                    type="checkbox"
                    checked={
                      challengesData.challenges[index]?.required as boolean
                    }
                    onChange={(e) => {
                      setChallengesData((prev) => {
                        const copy = [...prev.challenges];

                        copy[index] = {
                          ...copy[index],
                          required: e.target.checked,
                        };

                        return { ...prev, challenges: copy };
                      });
                    }}
                  />
                );
              },
            },

            challenge: {
              el: (item: TdObjTypes, index: number) => {
                if (editTarget === index) {
                  return (
                    <input
                      className="w-full input input-sm input-bordered input-primary"
                      type="text"
                      value={
                        challengesData.challenges[index]?.challenge as string
                      }
                      onChange={(e) => {
                        setChallengesData((prev) => {
                          const copy = [...prev.challenges];

                          copy[index] = {
                            ...copy[index],
                            challenge: String(e.target.value),
                          };

                          return { ...prev, challenges: copy };
                        });
                      }}
                    />
                  );
                }

                return <span>{String(item)}</span>;
              },
            },

            tag: {
              el: (item: TdObjTypes, index: number) => {
                if (editTarget === index) {
                  return (
                    <input
                      className="w-full input input-sm input-bordered input-primary"
                      type="text"
                      value={challengesData.challenges[index]?.tag as string}
                      onChange={(e) => {
                        setChallengesData((prev) => {
                          const copy = [...prev.challenges];

                          copy[index] = {
                            ...copy[index],
                            tag: String(e.target.value),
                          };

                          return { ...prev, challenges: copy };
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
                            setChallengesData((prev) => {
                              return {
                                ...prev,
                                challenges: freezeChallenges,
                              };
                            });
                          }}
                        >
                          취소
                        </button>
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={() => {
                            // submitPutChallenge(index);
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
                            setChallengesData((prev) => {
                              return {
                                ...prev,
                                challenges: freezeChallenges,
                              };
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
                            //   submitDeleteChallenge(Number(item.id))
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

        {addChallenge.active && (
          <table
            className="table table-s max-sm:table-xs !border-separate !border-spacing-0"
            align="center"
          >
            <thead className="">
              <tr className="border-zinc-400">
                <th
                  className="text-base text-center border border-zinc-300"
                  colSpan={2}
                >
                  <div className="flex items-center justify-center">필수</div>
                </th>
                <th
                  className="text-base text-center border border-zinc-300"
                  colSpan={4}
                >
                  <div className="flex items-center justify-center">챌린지</div>
                </th>
                <th className="text-base text-center border border-zinc-300">
                  <div className="flex items-center justify-center">태그</div>
                </th>
                <th className="text-base text-center border border-zinc-300">
                  <div className="flex items-center justify-center">
                    취소/저장{" "}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={3}>
                  <div className="flex items-center justify-center">
                    <input
                      type="checkbox"
                      className="checkbox"
                      checked={addChallenge.required}
                      onChange={(e) =>
                        setAddChallenge((prev) => {
                          return { ...prev, required: e.target.checked };
                        })
                      }
                    />
                  </div>
                </td>
                <td colSpan={3}>
                  <div className="flex items-center justify-center">
                    <input
                      className="w-full rounded-none grow bg-base-100 input input-bordered input-sm max-sm:input-xs"
                      type="text"
                      value={addChallenge.challenge || ""}
                      onChange={(e) =>
                        setAddChallenge((prev) => {
                          return { ...prev, challenge: e.target.value };
                        })
                      }
                    />
                  </div>
                </td>
                <td colSpan={0}>
                  <div className="flex items-center justify-center">
                    <input
                      className="rounded-none bg-base-100 input input-bordered input-sm max-sm:input-xs"
                      type="text"
                      value={addChallenge.tag || ""}
                      onChange={(e) =>
                        setAddChallenge((prev) => {
                          return { ...prev, tag: e.target.value };
                        })
                      }
                    />
                  </div>
                </td>
                <td>
                  {/* <button>1</button>
               <button>2</button> */}
                  <div className=" w-full flex justify-center flex-auto gap-2 min-w-[108px] max-w-[249px]">
                    <button
                      className="btn btn-sm btn-primary btn-outline"
                      onClick={() =>
                        setAddChallenge((prev) => {
                          return {
                            ...prev,
                            active: false,
                            challenge: "",
                            tag: "",
                            required: false,
                          };
                        })
                      }
                    >
                      취소
                    </button>
                    <button
                      className="btn btn-sm btn-primary"
                      // onClick={() => submitAddChallenge()}
                    >
                      저장
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        )}

        <div
          className="mt-10 text-xl font-bold cursor-pointer"
          onClick={() =>
            setAddChallenge((prev) => {
              return { ...prev, active: true };
            })
          }
        >
          챌린지 추가 +
        </div>
      </div>
    </div>
  );
}

export default index;
