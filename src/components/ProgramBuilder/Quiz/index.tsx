import { Modal } from "#/components/Modal";
import Table from "#/components/Table";
import api from "#/library/axios/api";
import useLoadingState from "#/library/recoil/hook/useLoadingState";
import useMakeFreeze from "#/utils/useMakeFreeze";
import { closeModal, openModal } from "#/utils/useModalHandler";
import { filter, isEqual, times } from "lodash";
import { useEffect, useState } from "react";

function index({ id }: { id: number }) {
  const [quizData, setQuizData] = useState<{
    isRandom: boolean;
    displayedNum: number;
    quiz: { [key: string]: string | number }[];
  }>({
    isRandom: false,
    displayedNum: 0,
    quiz: [],
  });
  const [isEdit, setIsEdit] = useState(false);

  const [quizEdit, setQuizEdit] = useState(false);
  const [quizDetailEdit, setQuizDetailEdit] = useState(false);
  const [quizDetail, setQuizDetail] = useState<{
    questionType: string;
    question: string;
    answer: number;
    questionNumber: number;
    description: string;
    id: number;
    choices: string[] | null;
  }>({
    id: 0,
    questionType: "TrueFalse",
    question: "",
    answer: 0,
    questionNumber: 3,
    description: "",
    choices: null,
  });
  const [freezeQuiz, setFreezeQuiz] =
    useState<{ [key: string]: string | number }[]>();
  const addedMap = [
    ["id", "퀴즈 ID"],
    // ["sequence", "우선순위"],
    ["questionType", "분류"],
    ["question", "질문"],

    // ["playTime", "플레이타임"],
  ];

  const { setModalLoading } = useLoadingState();
  const getQuiz = () => {
    // setModalLoading(true);
    // api
    //   .get(`/admin/program/content/quiz`, {
    //     params: { programSequenceId: id },
    //   })
    //   .then((result) => {
    //     setQuizData(result.data);

    //     const freeze = useMakeFreeze(result.data.quiz);
    //     setFreezeQuiz(freeze);

    //     setModalLoading(false);
    //   })
    //   .catch((error) => {
    //     setModalLoading(false);
    //   });
    const dummyResult: any = {
      programId: 4,
      contentId: 43,
      title: "퀴퀴퀴",
      displayedNum: 3,
      isRandom: null,
      quiz: [
        {
          id: 3,
          question: "aaaaaaaa",
          questionType: "TrueFalse",
          answer: 0,
          description: "aweawaewrawe",
          choices: null,
        },
      ],
    };
    setQuizData(dummyResult);

    const freeze = useMakeFreeze(dummyResult.quiz);
    setFreezeQuiz(freeze);
  };
  useEffect(() => {
    getQuiz();
  }, [id]);

  const submitPostAddQuiz = () => {
    setModalLoading(true);

    api
      .post("/admin/program/content/quiz", {
        programSequenceId: id,
        question: quizDetail?.question,
        questionType: quizDetail?.questionType,
        answer: quizDetail?.answer,
        description: quizDetail.description,
      })
      .then((result) => {
        setModalLoading(false);
        getQuiz();
        closeModal("quiz-detail");
      })
      .catch((error) => {
        setModalLoading(false);
      });
  };

  const submitPutEditQuiz = () => {
    setModalLoading(true);

    api
      .put("/admin/program/content/quiz", {
        quizId: quizDetail.id,
        question: quizDetail?.question,
        questionType: quizDetail?.questionType,
        answer: quizDetail?.answer,
        description: quizDetail.description,
      })
      .then((result) => {
        setModalLoading(false);
        getQuiz();
        closeModal("quiz-detail");
      })
      .catch((error) => {
        setModalLoading(false);
      });
  };

  const submitDeleteQuiz = () => {
    setModalLoading(true);

    api
      .delete("/admin/program/content/quiz", {
        params: { quizId: quizDetail.id },
      })
      .then((result) => {
        setModalLoading(false);
        getQuiz();
        closeModal("quiz-detail");
      })
      .catch((error) => {
        setModalLoading(false);
      });
  };

  console.log("freezeQuiz", freezeQuiz);
  console.log("quizDetail", quizDetail);
  const handleEditDisable = () => {
    const targetQuiz = filter(
      freezeQuiz,
      (item) => item.id === quizDetail.id
    )[0];

    const { questionNumber, ...rest } = quizDetail;

    console.log("??????", targetQuiz, rest);
    const disable = isEqual(targetQuiz, rest);
    return disable;
  };

  const submitEditContent = () => {
    setModalLoading(true);
    api
      .put(
        `/admin/program/content`,

        {
          programSequenceId: id,
          isRandom: quizData.isRandom,
          displayedNum: quizData.displayedNum,
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
          value={String(quizData?.isRandom) || ""}
          onChange={(e) =>
            setQuizData((prev) => {
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
          value={quizData?.displayedNum}
          onChange={(e) => {
            setQuizData((prev) => {
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

      <div className="col-span-2 mt-2">
        <Table
          divider={false}
          data={quizData.quiz || []}
          addedMap={addedMap}
          // draggable
          trOptions={{
            tbody: {
              // isDraggable: () => mindChatDraggable,
              // draggableStatus: mindChatDraggable,
              dbClickFunc: (_: undefined, index: number) => {
                setQuizEdit(true);
                setQuizDetailEdit(false);
                setQuizDetail((prev) => {
                  return {
                    ...prev,
                    id: Number(quizData.quiz[index].id),
                    question: String(quizData.quiz[index].question),
                    questionType: String(quizData.quiz[index].questionType),
                    answer: Number(quizData.quiz[index].answer),
                    description: String(quizData.quiz[index].description),
                  };
                });

                openModal("quiz-detail");
              },
            },
          }}
          tdOptions={
            {
              // playTime: {
              //   el: (item: number) => {
              //     const minute = Math.floor(item / 60);
              //     const second = item % 60;
              //     const minuteStr = minute < 10 ? `0${minute}` : minute;
              //     const secondStr = second < 10 ? `0${second}` : second;
              //     return <span>{`${minuteStr}:${secondStr}`}</span>;
              //   },
              // },
            }
          }
          buttons={
            <>
              <button
                className="rounded-none btn btn-primary btn-sm max-xl:btn-xs"
                onClick={() => {
                  setQuizEdit(false);
                  setQuizDetail({
                    id: 0,
                    questionType: "TrueFalse",
                    question: "",
                    answer: 0,
                    questionNumber: 3,
                    description: "",
                    choices: null,
                  });
                  openModal("quiz-detail");
                }}
              >
                퀴즈 추가
              </button>
            </>
          }
          // buttons={
          //   <>
          //     {mindChatDraggable ? (
          //       <>
          //         <button
          //           className="rounded-none btn btn-outline btn-sm max-xl:btn-xs"
          //           onClick={() => {
          //             const copy = [...freezeMindChat];
          //             setMindChatsData((prev) => {
          //               return { ...prev, chat: copy };
          //             });

          //             setMindChatDraggable(false);
          //           }}
          //         >
          //           취소
          //         </button>
          //         <button
          //           disabled={isEqual(mindChatsData.chat, freezeMindChat)}
          //           className="rounded-none btn btn-primary btn-sm max-xl:btn-xs"
          //           onClick={() => {
          //             setMindChatDraggable(false);
          //             // submitPutMindfulnessSequence();
          //           }}
          //         >
          //           저장
          //         </button>
          //       </>
          //     ) : (
          //       <>
          //         <button
          //           className="rounded-none btn btn-primary btn-sm max-xl:btn-xs"
          //           onClick={() => setMindChatDraggable(true)}
          //         >
          //           우선순위 변경
          //         </button>
          //         <button
          //           className="rounded-none btn btn-primary btn-sm max-xl:btn-xs"
          //           onClick={() => {
          //             openModal("mindChat-detail");
          //           }}
          //         >
          //           질문 추가
          //         </button>
          //       </>
          //     )}
          //   </>
          // }
        />

        <Modal id="quiz-detail">
          <div className="flex flex-col justify-between h-full">
            <div>
              <div className="mb-6 text-xl font-bold max-sm:text-base">
                {quizEdit ? "질문 수정" : "질문 추가"}
              </div>
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 px-2 py-1 my-1 text-lg text-white bg-primary">
                    구분
                  </div>
                  <div className="grid items-center grid-cols-3 col-span-2 gap-x-2 gap-y-4">
                    <span className="col-span-1">분류</span>

                    <select
                      disabled={quizEdit && !quizDetailEdit}
                      className="col-span-1 rounded-none join-item select-sm select select-bordered max-xl:select-xs"
                      value={(quizDetail?.questionType as string) || ""}
                      // disabled={isContentEdit}
                      onChange={(e) => {
                        setQuizDetail((prev) => {
                          return {
                            ...prev,
                            questionType: e.target.value,
                          };
                        });
                      }}
                    >
                      <option value="TrueFalse">O/X</option>
                      <option value="MultipleChoice">객관식</option>
                    </select>

                    {quizDetail.questionType === "MultipleChoice" && (
                      <div className="grid items-center grid-cols-3 col-span-3 gap-x-2 gap-y-4">
                        <span className="col-span-1">후보수</span>

                        <select
                          disabled={quizEdit && !quizDetailEdit}
                          className="col-span-1 rounded-none join-item select-sm select select-bordered max-xl:select-xs"
                          value={quizDetail?.questionNumber || ""}
                          // disabled={isContentEdit}
                          onChange={(e) => {
                            setQuizDetail((prev) => {
                              return {
                                ...prev,
                                questionNumber: Number(e.target.value),
                              };
                            });
                          }}
                        >
                          <option value={3}>3</option>
                          <option value={4}>4</option>
                          <option value={5}>5</option>
                        </select>
                        <span className="invisible col-span-1"></span>
                        <span className="col-span-1">선택제한</span>

                        <select
                          className="col-span-1 rounded-none join-item select-sm select select-bordered max-xl:select-xs"
                          // value={(mindChatDetail?.questionType as string) || ""}
                          // disabled={isContentEdit}
                          // onChange={(e) => {
                          //   setMindChatDetail((prev) => {
                          //     return {
                          //       ...prev,
                          //       questionType: e.target.value,
                          //     };
                          //   });
                          // }}
                        >
                          {times(3, (item) => {
                            return <option value={item + 1}>{item + 1}</option>;
                          })}
                        </select>
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid items-center grid-cols-3 col-span-2 gap-2">
                  <span className="col-span-1">퀴즈</span>
                  <input
                    type="text"
                    disabled={quizEdit && !quizDetailEdit}
                    className="col-span-2 rounded-none grow bg-base-100 input input-bordered input-sm max-sm:input-xs"
                    placeholder="퀴즈를 입력해주세요."
                    value={quizDetail?.question}
                    onChange={(e) => {
                      setQuizDetail((prev) => {
                        return {
                          ...prev,
                          question: e.target.value,
                        };
                      });
                    }}
                    autoFocus={false}
                  />

                  {quizDetail.questionType === "TrueFalse" && (
                    <>
                      <span className="col-span-1">답</span>

                      <select
                        disabled={quizEdit && !quizDetailEdit}
                        className="col-span-1 rounded-none join-item select-sm select select-bordered max-xl:select-xs"
                        value={quizDetail?.answer}
                        // disabled={isContentEdit}
                        onChange={(e) => {
                          setQuizDetail((prev) => {
                            return {
                              ...prev,
                              answer: Number(e.target.value),
                            };
                          });
                        }}
                      >
                        <option value={1}>O</option>
                        <option value={0}>X</option>
                      </select>
                    </>
                  )}
                </div>

                {quizDetail?.questionType === "MultipleChoice" && (
                  <div className="grid items-center grid-cols-3 col-span-2 gap-2">
                    {times(quizDetail.questionNumber, (item) => {
                      return (
                        <>
                          <span
                            className={`col-span-1 ${
                              item !== 0 && "invisible"
                            }`}
                          >
                            선택후보
                          </span>
                          <div className="relative flex items-center col-span-2 gap-2 ">
                            <span className="absolute left-[-20px]">
                              {item + 1}.
                            </span>
                            <input
                              disabled={quizEdit && !quizDetailEdit}
                              type="text"
                              className="rounded-none grow bg-base-100 input input-bordered input-sm max-sm:input-xs"
                              autoFocus={false}
                            />
                            <span>정답</span>
                            <input type="checkbox" className="checkbox" />
                          </div>
                        </>
                      );
                    })}
                  </div>
                )}

                <div className="grid grid-cols-3 col-span-2 gap-2">
                  <span className="col-span-1">해설</span>
                  <textarea
                    // type="text"
                    disabled={quizEdit && !quizDetailEdit}
                    className="col-span-2 rounded-none resize-none bg-base-100 textarea textarea-bordered textarea-sm max-sm:textarea-xs"
                    placeholder=""
                    value={quizDetail?.description as string}
                    onChange={(e) => {
                      setQuizDetail((prev) => {
                        return { ...prev, description: e.target.value };
                      });
                    }}
                    autoFocus={false}
                  />
                </div>
                <div className="flex justify-end col-span-3">
                  {quizEdit ? (
                    quizDetailEdit ? (
                      <div className="flex gap-2">
                        <button
                          className="btn btn-primary btn-outline btn-sm"
                          onClick={() => {
                            setQuizDetailEdit(false);
                          }}
                        >
                          취소
                        </button>
                        <button
                          disabled={handleEditDisable()}
                          className="btn btn-primary btn-sm"
                          onClick={() => {
                            setQuizDetailEdit(false);
                            // submitPutEditQuiz();
                          }}
                        >
                          저장
                        </button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => {
                            setQuizDetailEdit(true);
                          }}
                        >
                          수정
                        </button>
                        <button
                          className="btn btn-error btn-sm"
                          onClick={() => {
                            // submitDeleteQuiz();
                          }}
                        >
                          삭제
                        </button>
                      </div>
                    )
                  ) : (
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => {
                        // submitPostAddQuiz();
                      }}
                    >
                      퀴즈 추가
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default index;
