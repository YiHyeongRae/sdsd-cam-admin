import { Alert } from "#/components/Alert";
import { Modal } from "#/components/Modal";
import Challenge from "#/components/ProgramBuilder/Challenge";
import GoalAchievement from "#/components/ProgramBuilder/GoalAchievement";
import GoalSetting from "#/components/ProgramBuilder/GoalSetting";
import Intro from "#/components/ProgramBuilder/Intro";
import MindChat from "#/components/ProgramBuilder/MindChat";
import Mindfulness from "#/components/ProgramBuilder/Mindfulness";
import Outro from "#/components/ProgramBuilder/Outro";
import Quiz from "#/components/ProgramBuilder/Quiz";
import Video from "#/components/ProgramBuilder/Video";
import Table from "#/components/Table";
import { TdObjTypes } from "#/data/types/components";
import api from "#/library/axios/api";
import useConfirmState from "#/library/recoil/hook/useConfirmState";
import useLoadingState from "#/library/recoil/hook/useLoadingState";
import useMakeFreeze from "#/utils/useMakeFreeze";
import { closeModal, openModal } from "#/utils/useModalHandler";
import { filter, isEqual, map } from "lodash";
import { useEffect, useState } from "react";

function index() {
  const [programData, setProgramData] = useState<
    { [key: string]: number | string | boolean }[]
  >([]);
  const [isEdit, setIsEdit] = useState(false);
  const [programDetail, setProgramDetail] = useState({
    program: {
      title: "",
      description: "",
      totalSession: 0,
      isActive: "",
      id: 0,
    },
    sessions: [],
  });

  const { state, setConfirmFunc } = useConfirmState();
  const [sessionDetail, setSessionDetail] = useState({
    programId: 0,
    duration: 0,
    sequences: [{ id: 0, sequence: 0, title: "", programContentType: "" }],
    session: 0,
  });

  const [currentEdit, setCurrentEdit] = useState("");
  const { setLoading, setModalLoading } = useLoadingState();
  const [perPage, setPerPage] = useState({
    page: 1,
    perPage: 20,
    pageLength: 1,
  });
  const submitGetProgram = () => {
    // setLoading(true);
    // api
    //   .get("/admin/program", {
    //     params: {
    //       page: perPage.page,
    //       pageSize: perPage.perPage,
    //     },
    //   })
    //   .then((result) => {
    //     setProgramData(result.data);

    //     setPerPage((prev) => {
    //       return {
    //         ...prev,
    //         pageLength: Math.ceil(result.data.length / prev.perPage),
    //       };
    //     });
    //     setLoading(false);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     setLoading(false);
    //   });

    const dummyResult: any = [
      {
        id: 1,
        title: "마음운동",
        isActive: true,
        totalSession: 8,
      },
      {
        id: 4,
        title: "새로운 프로그램",
        isActive: true,
        totalSession: 4,
      },
    ];
    setProgramData(dummyResult);

    setPerPage((prev) => {
      return {
        ...prev,
        pageLength: Math.ceil(dummyResult.length / prev.perPage),
      };
    });
  };

  const submitPutActiveProgram = (programId: number, active: boolean) => {
    setLoading(true);
    api
      .put(`/admin/program/${programId}/active?isActive=${active}`)
      .then((result) => {
        submitGetProgram();
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };
  const searchProgramDetail = (id: number) => {
    // setModalLoading(true);
    // api
    //   .get(`/admin/program/${id}`)
    //   .then((result) => {
    //     setProgramDetail(result.data);

    //     setModalLoading(false);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     setModalLoading(false);
    //   });

    const dummyResult: any = {
      program: {
        id: 4,
        title: "새로운 프로그램",
        description: "테스트를 위한 새로운 프로그램",
        isActive: true,
        totalSession: 4,
      },
      sessions: [
        {
          title: "1회기",
          session: 1,
          sequenceNum: "8",
        },
        {
          title: "2회기",
          session: 2,
          sequenceNum: 0,
        },
        {
          title: "3회기",
          session: 3,
          sequenceNum: 0,
        },
        {
          title: "4회기",
          session: 4,
          sequenceNum: 0,
        },
      ],
    };
    setProgramDetail(dummyResult);
  };

  const [freezeSession, setFreezeSession] = useState<any>();
  const searchSessionDetail = (programId: number, sessionId: number) => {
    // setModalLoading(true);
    // api
    //   .get(`/admin/program/${programId}/session/${sessionId}`)
    //   .then((result) => {
    //     setSessionDetail(result.data);

    //     const copy = useMakeFreeze(result.data);
    //     setFreezeSession(copy);
    //     setModalLoading(false);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     setModalLoading(false);
    //   });

    const dummyResult: any = {
      programId: 4,
      session: 1,
      duration: 240,
      sequences: [
        {
          id: 78,
          sequence: 1,
          title: "인트로입니다",
          programContentType: "Introduction",
        },
        {
          id: 1,
          sequence: 2,
          title: "목표설쩡",
          programContentType: "GoalSetting",
        },
        {
          id: 61,
          sequence: 3,
          title: "명상도 추가",
          programContentType: "Mindfulness",
        },
        {
          id: 62,
          sequence: 4,
          title: "비디오",
          programContentType: "Video",
        },
        {
          id: 73,
          sequence: 5,
          title: "퀴퀴퀴",
          programContentType: "Quiz",
        },
        {
          id: 63,
          sequence: 6,
          title: "챌린",
          programContentType: "Challenge",
        },
        {
          id: 74,
          sequence: 7,
          title: "목표확인추가",
          programContentType: "GoalAchievement",
        },
        {
          id: 67,
          sequence: 8,
          title: "마인드챗",
          programContentType: "MindChat",
        },
      ],
    };
    setSessionDetail(dummyResult);

    const copy = useMakeFreeze(dummyResult);
    setFreezeSession(copy);
  };

  const addedMap = [
    ["id", "프로그램ID"],
    ["title", "프로그램명"],
    ["totalSession", "구성회기"],
    ["isActive", "사용"],
  ];

  useEffect(() => {
    submitGetProgram();
  }, [perPage.page, perPage.perPage]);

  const submitAddProgram = () => {
    setLoading(true);
    api
      .post("/admin/program", {
        title: programDetail.program.title,
        description: programDetail.program.description,
        isActive: Boolean(programDetail.program.isActive),
        totalSession: Number(programDetail.program.totalSession),
      })
      .then((result) => {
        console.log("add college success", result);
        setLoading(false);
        submitGetProgram();
        closeModal("program-detail");
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  const [contentDraggble, setContentDraggable] = useState(false);

  const submitPutSessionDuration = () => {
    setModalLoading(true);
    api
      .put(`/admin/program/session`, {
        programId: programDetail.program.id,
        session: sessionDetail.session,
        duration: sessionDetail.duration,
      })
      .then((result) => {
        setCurrentEdit("");
        setModalLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setModalLoading(false);
      });
  };
  const submitPutSessionSequence = () => {
    const copy = [...sessionDetail?.sequences];

    const emptyArr: {}[] = [];

    map(copy, (item, index) => {
      const session = {
        id: item.id,
        sequence: index + 1,
      };

      emptyArr.push(session);
    });

    setModalLoading(true);
    api
      .put(`/admin/program/session/sequence`, {
        programId: Number(programDetail.program.id),
        session: Number(sessionDetail.session),
        sequences: emptyArr,
      })
      .then(() => {
        searchSessionDetail(programDetail.program.id, sessionDetail.session);
        setModalLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setModalLoading(false);
      });
  };

  const [contentDetail, setContentDetail] = useState<{
    programSequenceId: number;
    currentContent: string;
    title: string;
    chatTitle: string;
  }>({
    programSequenceId: 0,
    currentContent: "",
    title: "",
    chatTitle: "",
  });

  const [isContentEdit, setIsContentEdit] = useState(false);

  const submitEditContent = () => {
    setModalLoading(true);

    const programSequenceId = filter(
      sessionDetail.sequences,
      (item) => item.programContentType === contentDetail.currentContent
    )[0].id;
    api
      .put(
        `/admin/program/content`,

        {
          programSequenceId: programSequenceId,
          title: contentDetail.title,
          chatTitle: contentDetail.chatTitle,
        }
      )
      .then((result) => {
        searchSessionDetail(programDetail.program.id, sessionDetail.session);

        setModalLoading(false);
        setCurrentEdit("");
      })
      .catch((error) => {
        console.log(error);
        setModalLoading(false);
        setCurrentEdit("");
      });
  };

  const submitAddContent = () => {
    setModalLoading(true);
    api
      .post(`/admin/program/content`, {
        title: contentDetail.title,
        programContentType: contentDetail.currentContent,
        programId: programDetail.program.id,
        session: sessionDetail.session,
        sequence: Number(sessionDetail.sequences.length + 1),
        chatTitle: contentDetail.chatTitle,
      })
      .then((result) => {
        setModalLoading(false);
        searchProgramDetail(programDetail.program.id);
        searchSessionDetail(programDetail.program.id, sessionDetail.session);
        closeModal("contents-detail");
      })
      .catch((error) => {
        setModalLoading(false);
      });
  };

  const submitDeleteContent = () => {
    setModalLoading(true);

    api
      .delete(`/admin/program/content`, {
        params: {
          programSequenceId: contentDetail.programSequenceId,
        },
      })
      .then((result) => {
        setIsContentEdit(false);
        searchProgramDetail(programDetail.program.id);

        searchSessionDetail(programDetail.program.id, sessionDetail.session);
        setModalLoading(false);
        closeModal("contents-detail");
      })
      .catch((error) => {
        setModalLoading(false);
        setIsContentEdit(false);

        closeModal("contents-detail");
      });
  };

  return (
    <div>
      <Table
        data={programData || []}
        addedMap={addedMap}
        trOptions={{
          tbody: {
            dbClickFunc: (item: TdObjTypes) => {
              setIsEdit(true);
              searchProgramDetail(Number(item.id));
              openModal("program-detail");
            },
          },
        }}
        tdOptions={{
          isActive: {
            el: (item: boolean, index: number, obj: TdObjTypes) => {
              return (
                <div className="flex justify-center">
                  <input
                    type="checkbox"
                    className="toggle toggle-primary max-xl:toggle-sm"
                    checked={item}
                    onChange={(e) => {
                      // submitPutActiveProgram(Number(obj.id), !item);
                    }}
                  />
                </div>
              );
            },
          },
        }}
        buttons={
          <button
            className="rounded-none btn btn-primary btn-sm max-xl:btn-xs"
            onClick={() => {
              setIsEdit(false);

              setProgramDetail((prev) => {
                return {
                  ...prev,
                  program: {
                    title: "",
                    description: "",
                    isActive: "",
                    totalSession: 0,
                    id: 0,
                  },
                  sessions: [],
                };
              });
              openModal("program-detail");
            }}
          >
            추가
          </button>
        }
        perPageOptions={{
          page: perPage.page,
          perPage: perPage.perPage,
          pageLength: perPage.pageLength,
          setPerPage: setPerPage,
        }}
      />
      <Modal id="program-detail">
        <div className="flex flex-col justify-between h-full">
          <div>
            <div className="mb-6 text-xl font-bold max-sm:text-base">
              {isEdit ? "프로그램 수정" : "프로그램 등록"}
            </div>

            <div className="flex flex-col gap-10">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 px-2 py-1 my-1 text-lg text-white bg-primary">
                  구분
                </div>

                <div className="grid items-center grid-cols-3 col-span-2 gap-2">
                  <span className="col-span-1">프로그램 명*</span>
                  <input
                    disabled={isEdit}
                    type="text"
                    className="col-span-2 rounded-none grow bg-base-100 input input-bordered input-sm max-sm:input-xs"
                    placeholder="프로그램 명"
                    value={programDetail.program.title || ""}
                    onChange={(e) => {
                      setProgramDetail((prev) => {
                        return {
                          ...prev,
                          program: { ...prev.program, title: e.target.value },
                        };
                      });
                    }}
                    autoFocus={false}
                  />
                </div>
                <div className="grid items-center grid-cols-3 col-span-2 gap-2">
                  <span className="col-span-1">서브텍스트</span>
                  <input
                    disabled={isEdit}
                    type="text"
                    className="col-span-2 rounded-none grow bg-base-100 input input-bordered input-sm max-sm:input-xs"
                    placeholder="서브텍스트"
                    value={programDetail.program.description || ""}
                    onChange={(e) => {
                      setProgramDetail((prev) => {
                        return {
                          ...prev,
                          program: {
                            ...prev.program,
                            description: e.target.value,
                          },
                        };
                      });
                    }}
                    autoFocus={false}
                  />
                </div>
                <div className="grid items-center grid-cols-3 col-span-2 gap-2 ">
                  <span className="col-span-1">구성회기</span>
                  <input
                    disabled={isEdit}
                    type="text"
                    className="col-span-2 rounded-none grow bg-base-100 input input-bordered input-sm max-sm:input-xs"
                    placeholder="구성회기를 입력해 주세요. (숫자만 입력)"
                    value={programDetail.program.totalSession || ""}
                    onChange={(e) => {
                      setProgramDetail((prev) => {
                        return {
                          ...prev,
                          program: {
                            ...prev.program,
                            totalSession: Number(e.target.value),
                          },
                        };
                      });
                    }}
                    autoFocus={false}
                  />
                </div>

                {!isEdit && (
                  <div className="grid items-center grid-cols-3 col-span-2 gap-2">
                    <span className="col-span-1">사용</span>

                    <select
                      className="rounded-none join-item select-sm select select-bordered max-xl:select-xs"
                      value={String(programDetail.program.isActive)}
                      onChange={(e) =>
                        setProgramDetail((prev) => {
                          return {
                            ...prev,
                            program: {
                              ...prev.program,
                              isActive: e.target.value,
                            },
                          };
                        })
                      }
                    >
                      <option value="false">중지</option>
                      <option value="true">사용</option>
                    </select>
                  </div>
                )}
              </div>
            </div>

            {isEdit && (
              <div className="grid grid-cols-2 gap-4 mt-10">
                <div className="col-span-2 px-2 py-1 my-1 text-lg text-white bg-primary">
                  구성 회기
                </div>

                <ul className="flex flex-col col-span-2 gap-4">
                  {map(programDetail.sessions, (item: any, index) => {
                    return (
                      <li
                        key={index}
                        className="border border-solid border-[#c0c0c0] rounded-[20px] p-3 text-base font-bold relative"
                        onDoubleClick={() => {
                          openModal("session-detail");
                          setCurrentEdit("");
                          searchSessionDetail(
                            programDetail.program.id,
                            item.session
                          );
                        }}
                      >
                        <span>{item.title || ""}</span>
                        <span className="ml-4 btn btn-xs btn-primary">
                          {item.sequenceNum}개
                        </span>
                        <span className="absolute right-5 top-4">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={3}
                            stroke="currentColor"
                            className="size-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m8.25 4.5 7.5 7.5-7.5 7.5"
                            />
                          </svg>
                        </span>
                      </li>
                    );
                  })}
                </ul>

                <div className="col-span-2 px-2 py-1 my-1 text-lg text-white bg-primary">
                  아웃트로 관리
                </div>
                <ul className="flex flex-col col-span-2 gap-4">
                  <li
                    className="border border-solid border-[#c0c0c0] rounded-[20px] p-3 text-base font-bold relative"
                    onDoubleClick={() => {
                      openModal("Outro");
                    }}
                  >
                    <span>아웃트로</span>

                    <span className="absolute right-5 top-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={3}
                        stroke="currentColor"
                        className="size-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m8.25 4.5 7.5 7.5-7.5 7.5"
                        />
                      </svg>
                    </span>
                  </li>
                </ul>
              </div>
            )}
          </div>
          <div>
            <div className="grid justify-end col-span-2">
              {!isEdit ? (
                <div className="flex gap-2 mt-4">
                  <label className="flex-auto">
                    <button
                      className="rounded-none btn-block btn btn-error btn-sm max-sm:btn-xs btn-primary"
                      onClick={() => {
                        setProgramDetail((prev) => {
                          return {
                            ...prev,
                            program: {
                              title: "",
                              description: "",
                              totalSession: 0,
                              isActive: "",
                              id: 0,
                            },
                          };
                        });

                        closeModal("program-detail");
                        setIsEdit(false);
                      }}
                    >
                      취소
                    </button>
                  </label>
                  <label className="flex-auto">
                    <button
                      className="rounded-none btn-block btn btn-sm max-sm:btn-xs btn-primary"
                      // onClick={() => submitAddProgram()}
                      disabled={
                        programDetail.program.title === "" ||
                        programDetail.program.description === "" ||
                        programDetail.program.totalSession === 0
                      }
                    >
                      등록
                    </button>
                  </label>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </Modal>
      <Modal id="session-detail" closeFunc={() => setContentDraggable(false)}>
        <div className="flex flex-col justify-between h-full">
          <div>
            <div className="mb-6 text-xl font-bold max-sm:text-base">
              회기 상세
            </div>

            <div className="flex flex-col gap-10">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 px-2 py-1 my-1 text-lg text-white bg-primary">
                  구분
                </div>

                <div className="grid items-center grid-cols-3 col-span-1 gap-2">
                  <span className="col-span-1">회기</span>
                  <input
                    disabled
                    type="text"
                    className="col-span-2 rounded-none grow bg-base-100 input input-bordered input-sm max-sm:input-xs"
                    value={sessionDetail?.session || ""}
                    autoFocus={false}
                  />
                </div>
                <div className="grid items-center grid-cols-3 col-span-1 gap-2">
                  <span className="col-span-1">예상 소요시간(초)</span>
                  <input
                    disabled={currentEdit !== "session"}
                    type="text"
                    className="col-span-2 rounded-none grow bg-base-100 input input-bordered input-sm max-sm:input-xs"
                    value={sessionDetail.duration || 0}
                    onChange={(e) => {
                      setSessionDetail((prev) => {
                        return { ...prev, duration: Number(e.target.value) };
                      });
                    }}
                    autoFocus={false}
                  />
                </div>
                <div className="flex justify-end col-span-2 ">
                  {currentEdit === "session" ? (
                    <div className="flex gap-2">
                      <button
                        type="button"
                        className=" btn btn-outline btn-primary btn-sm"
                        onClick={() => {
                          setSessionDetail((prev) => {
                            return {
                              ...prev,
                              duration:
                                sessionDetail.duration === 0
                                  ? 0
                                  : freezeSession.duration,
                            };
                          });
                          setCurrentEdit("");
                        }}
                      >
                        취소
                      </button>
                      <button
                        type="button"
                        className=" btn btn-primary btn-sm"
                        // onClick={() => submitPutSessionDuration()}
                      >
                        저장
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      className=" btn btn-primary btn-sm"
                      onClick={() => setCurrentEdit("session")}
                    >
                      수정
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-2 col-span-2 gap-4 mt-10">
                  <div className="col-span-2 px-2 py-1 my-1 text-lg text-white bg-primary">
                    콘텐츠 리스트
                  </div>
                  <div className="col-span-2">
                    <Table
                      divider={false}
                      draggable
                      trOptions={{
                        tbody: {
                          isDraggable: () => contentDraggble,
                          dragEndFunc: (e: TdObjTypes) => {
                            setSessionDetail((prev: any) => {
                              return { ...prev, sequences: e };
                            });
                          },
                          dbClickFunc: (e: TdObjTypes) => {
                            setCurrentEdit("");
                            setIsContentEdit(true);
                            const programSequenceId = filter(
                              sessionDetail?.sequences,
                              (item) =>
                                item.programContentType ===
                                  e.programContentType &&
                                item.sequence === e.sequence
                            )[0]?.id;

                            const title = filter(
                              sessionDetail?.sequences,
                              (item) =>
                                item.programContentType === e.programContentType
                            )[0]?.title;
                            setContentDetail((prev) => {
                              return {
                                ...prev,
                                currentContent: e.programContentType as string,
                                programSequenceId: programSequenceId,
                                title: title,
                              };
                            });
                            openModal("contents-detail");
                          },
                        },
                      }}
                      data={sessionDetail?.sequences || []}
                      addedMap={[
                        ["id", "콘텐츠ID"],
                        ["sequence", "우선순위"],
                        ["programContentType", "구분"],
                        ["title", "콘텐츠명"],
                      ]}
                      buttons={
                        <>
                          {contentDraggble ? (
                            <>
                              <button
                                className="rounded-none btn btn-outline btn-sm max-xl:btn-xs"
                                onClick={() => {
                                  const copy = [...freezeSession.sequences];
                                  setSessionDetail((prev: any) => {
                                    return { ...prev, sequences: copy };
                                  });

                                  setContentDraggable(false);
                                }}
                              >
                                취소
                              </button>
                              <button
                                disabled={isEqual(
                                  freezeSession.sequences,
                                  sessionDetail?.sequences
                                )}
                                className="rounded-none btn btn-primary btn-sm max-xl:btn-xs"
                                onClick={() => {
                                  // submitPutSessionSequence();
                                  setContentDraggable(false);
                                }}
                              >
                                저장
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                disabled={sessionDetail.sequences.length === 0}
                                className="rounded-none btn btn-primary btn-sm max-xl:btn-xs"
                                onClick={() => setContentDraggable(true)}
                              >
                                우선순위 변경
                              </button>
                              <button
                                className="rounded-none btn btn-primary btn-sm max-xl:btn-xs"
                                onClick={() => {
                                  setIsContentEdit(false);

                                  setContentDetail({
                                    programSequenceId: 0,
                                    title: "",
                                    chatTitle: "",
                                    currentContent: "",
                                  });

                                  openModal("contents-detail");
                                }}
                              >
                                추가
                              </button>
                            </>
                          )}
                        </>
                      }
                    />
                  </div>
                </div>

                {!isEdit && (
                  <div className="grid items-center grid-cols-3 col-span-2 gap-2">
                    <span className="col-span-1">사용</span>

                    <select
                      className="rounded-none join-item select-sm select select-bordered max-xl:select-xs"
                      value={String(programDetail.program.isActive)}
                      onChange={(e) =>
                        setProgramDetail((prev) => {
                          return { ...prev, isActive: e.target.value };
                        })
                      }
                    >
                      <option value="false">중지</option>
                      <option value="true">사용</option>
                    </select>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        id="contents-detail"
        closeFunc={() => {
          setContentDetail((prev) => {
            return {
              ...prev,
              currentContent: "",
              title: "",
              chatTitle: "",
            };
          });
        }}
      >
        <div className="flex flex-col justify-between h-full">
          <div>
            <div className="mb-6 text-xl font-bold max-sm:text-base">
              {isContentEdit ? "콘텐츠 수정" : "콘텐츠 추가"}
            </div>

            <div className="flex flex-col gap-10">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 px-2 py-1 my-1 text-lg text-white bg-primary">
                  구분
                </div>
                <div className="grid items-center grid-cols-3 col-span-2 gap-2">
                  <span className="col-span-1">구분</span>

                  <select
                    className="col-span-2 rounded-none join-item select-sm select select-bordered max-xl:select-xs"
                    value={(contentDetail.currentContent as string) || ""}
                    disabled={isContentEdit}
                    onChange={(e) => {
                      setContentDetail((prev) => {
                        return {
                          ...prev,
                          currentContent: e.target.value,
                        };
                      });
                    }}
                  >
                    <option value="Introduction">인트로</option>
                    <option value="GoalSetting">목표설정</option>
                    <option value="Quiz">퀴즈</option>
                    <option value="Challenge">챌린지</option>
                    <option value="MindChat">구조화질문</option>
                    <option value="Video">미디어</option>
                    <option value="Mindfulness">명상</option>
                    <option value="GoalAchievement">목표확인</option>
                  </select>
                </div>
                <div className="grid items-center grid-cols-3 col-span-2 gap-2">
                  <span className="col-span-1">콘텐츠명</span>
                  <input
                    disabled={isContentEdit && currentEdit !== "contents"}
                    type="text"
                    className="col-span-2 rounded-none grow bg-base-100 input input-bordered input-sm max-sm:input-xs"
                    placeholder=""
                    value={contentDetail.title as string}
                    onChange={(e) => {
                      setContentDetail((prev) => {
                        return { ...prev, title: e.target.value };
                      });
                    }}
                    autoFocus={false}
                  />
                </div>

                {contentDetail.currentContent === "MindChat" && (
                  <div className="grid items-center grid-cols-3 col-span-2 gap-2">
                    <span className="col-span-1">대화주제</span>
                    <input
                      disabled={isContentEdit && currentEdit !== "contents"}
                      type="text"
                      className="col-span-2 rounded-none grow bg-base-100 input input-bordered input-sm max-sm:input-xs"
                      placeholder=""
                      value={contentDetail.chatTitle as string}
                      onChange={(e) => {
                        setContentDetail((prev) => {
                          return { ...prev, chatTitle: e.target.value };
                        });
                      }}
                      autoFocus={false}
                    />
                  </div>
                )}

                <div className="flex justify-end col-span-2 gap-2">
                  {isContentEdit ? (
                    currentEdit !== "contents" ? (
                      <>
                        <button
                          className="btn btn-primary btn-sm"
                          type="button"
                          onClick={() => setCurrentEdit("contents")}
                        >
                          수정
                        </button>
                        <button
                          className="btn btn-error btn-sm"
                          onClick={() => {
                            // setConfirmFunc(submitDeleteContent);
                            openModal("confirm-delete");
                          }}
                        >
                          삭제
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="btn btn-primary btn-outline btn-sm"
                          onClick={() => {
                            setCurrentEdit("");
                          }}
                        >
                          취소
                        </button>
                        <button
                          className="btn btn-primary btn-sm"
                          type="button"
                          // onClick={() => submitEditContent()}
                        >
                          저장
                        </button>
                      </>
                    )
                  ) : (
                    <button
                      className="btn btn-primary btn-sm"
                      type="button"
                      onClick={() => {
                        // submitAddContent();
                      }}
                    >
                      추가
                    </button>
                  )}
                </div>
              </div>

              {contentDetail.currentContent === "GoalSetting" &&
                isContentEdit && (
                  <GoalSetting
                    id={contentDetail.programSequenceId}
                    currentContent={contentDetail.currentContent}
                  />
                )}

              {contentDetail.currentContent === "Video" && isContentEdit && (
                <Video id={contentDetail.programSequenceId} />
              )}

              {contentDetail.currentContent === "Mindfulness" &&
                isContentEdit && (
                  <Mindfulness
                    id={contentDetail.programSequenceId}
                    session={sessionDetail.session}
                  />
                )}

              {contentDetail.currentContent === "Challenge" &&
                isContentEdit && (
                  <Challenge id={contentDetail.programSequenceId} />
                )}

              {contentDetail.currentContent === "MindChat" && isContentEdit && (
                <MindChat
                  setter={setContentDetail}
                  id={contentDetail.programSequenceId}
                />
              )}

              {contentDetail.currentContent === "Quiz" && isContentEdit && (
                <Quiz id={contentDetail.programSequenceId} />
              )}

              {contentDetail.currentContent === "GoalAchievement" &&
                isContentEdit && (
                  <GoalAchievement id={contentDetail.programSequenceId} />
                )}

              {contentDetail.currentContent === "Introduction" &&
                isContentEdit && <Intro id={programDetail.program.id} />}
            </div>
          </div>
        </div>
      </Modal>
      {programDetail.program.id !== 0 && (
        <Modal id="Outro">
          <Outro id={programDetail.program.id} />
        </Modal>
      )}

      <Alert
        id="confirm-delete"
        title="삭제"
        text={`삭제할 경우 복구할 수 없습니다.\n정말 삭제하시겠습니까?`}
        buttons={[
          {
            style: "",
            text: "취소",
            disabled: false,
            func: () => {
              setConfirmFunc(() => {});
            },
          },

          {
            style: "btn-error",
            text: "삭제",
            disabled: false,
            func: () => {
              state.confirmFunc();
            },
          },
        ]}
      />
    </div>
  );
}

export default index;
