import { Modal } from "#/components/Modal";
import Table from "#/components/Table";
import { TdObjTypes } from "#/data/types/components";
import api from "#/library/axios/api";
import useLoadingState from "#/library/recoil/hook/useLoadingState";
import useMakeFreeze from "#/utils/useMakeFreeze";
import { closeModal, openModal } from "#/utils/useModalHandler";
import { filter, isEqual, map, omit, times } from "lodash";
import { useEffect, useState } from "react";

function index({ id, setter }: { id: number; setter: Function }) {
  type MindChatTypes = {
    title: string;
    sessionTitle: string;
    chat: {
      id: number;
      sequence: number;
      questionType: string;
      question: string;
      choices: string[];
    }[];
  };
  const [mindChatsData, setMindChatsData] = useState<MindChatTypes>({
    title: "",
    sessionTitle: "",
    chat: [],
  });

  const [isEdit, setIsEdit] = useState(false);
  const [isMindChatEdit, setIsMindChatEdit] = useState(false);
  const [mindChatDraggable, setMindChatDraggable] = useState(false);

  const { setModalLoading } = useLoadingState();
  const [freezeMindChat, setFreezeMindChat] = useState<
    {
      id: number;
      sequence: number;
      questionType: string;
      question: string;
      choices: string[];
    }[]
  >([]);

  // const [goalsDraggable, setGoalsDraggable] = useState(false);

  const getMindChats = () => {
    // setModalLoading(true);
    // api
    //   .get(`/admin/program/content/mind-chat`, {
    //     params: { programSequenceId: id },
    //   })
    //   .then((result) => {
    //     setMindChatsData(result.data);

    //     const freeze = useMakeFreeze(result.data.chat);
    //     setFreezeMindChat(freeze);

    //     setter((prev: { chatTitle: string }) => {
    //       return { ...prev, chatTitle: result.data.sessionTitle };
    //     });
    //     setModalLoading(false);
    //   })
    //   .catch(() => {
    //     setModalLoading(false);
    //   });

    const dummyResult: any = {
      title: "마인드챗",
      sessionTitle: "대화주",
      chat: [
        {
          id: 58,
          sequence: 1,
          question: "객관식입니다",
          questionType: "MultipleChoice",
          choices: ["선택1", "선택2", "선택3"],
        },
      ],
    };

    setMindChatsData(dummyResult);

    const freeze = useMakeFreeze(dummyResult.chat);
    setFreezeMindChat(freeze);

    setter((prev: { chatTitle: string }) => {
      return { ...prev, chatTitle: dummyResult.sessionTitle };
    });
  };
  useEffect(() => {
    getMindChats();
  }, [id]);

  const addedMap = [
    ["id", "질문 ID"],
    ["sequence", "우선순위"],
    ["questionType", "분류"],
    ["question", "질문"],
  ];

  const [mindChatDetail, setMindChatDetail] = useState<{
    id: number;
    question: string;
    questionType: string;
    questionNumber: number;
    choices: string[];
  }>({
    id: 0,
    question: "",
    questionType: "OpeningMessage",
    questionNumber: 3,
    choices: [],
  });

  const submitPostAddQuestion = () => {
    setModalLoading(true);
    api
      .post(
        "/admin/program/content/mind-chat",
        mindChatDetail.questionType === "MultipleChoice"
          ? {
              programSequenceId: id,
              question: mindChatDetail?.question,
              questionType: mindChatDetail?.questionType,
              choices: mindChatDetail?.choices,
            }
          : {
              programSequenceId: id,
              question: mindChatDetail?.question,
              questionType: mindChatDetail?.questionType,
            }
      )
      .then(() => {
        setModalLoading(false);
        getMindChats();
        setMindChatDetail({
          question: "",
          questionType: "OpeningMessage",
          questionNumber: 3,
          choices: [],
          id: 0,
        });
        closeModal("mindChat-detail");
      })
      .catch((error) => {
        console.log("error");
      });
  };

  const [level, setLevel] = useState(0);
  const [measure, setMeasure] = useState({
    level: 0,
    active: false,
  });

  const submitPutMindChatSequence = () => {
    setModalLoading(true);

    const sequences = map(mindChatsData.chat, (item, index) => {
      return { id: item.id, sequence: index + 1 };
    });

    api
      .put(`/admin/program/content/mind-chat/sequence`, {
        programSequenceId: id,
        sequences: sequences,
      })
      .then((result) => {
        getMindChats();

        setModalLoading(false);
      })
      .catch((error) => {
        setModalLoading(false);
      });
  };

  const submitPutEditMindChat = () => {
    setModalLoading(true);

    api
      .put(
        `/admin/program/content/mind-chat`,
        mindChatDetail.questionType === "MultipleChoice"
          ? {
              chatId: mindChatDetail.id,
              question: mindChatDetail?.question,
              questionType: mindChatDetail?.questionType,
              choices: mindChatDetail?.choices,
            }
          : {
              chatId: mindChatDetail.id,
              question: mindChatDetail?.question,
              questionType: mindChatDetail?.questionType,
            }
      )
      .then(() => {
        getMindChats();
        setModalLoading(false);
      })
      .catch((error) => {
        setModalLoading(false);
      });
  };

  const submitDeleteMindChat = () => {
    setModalLoading(true);
    api
      .delete(`/admin/program/content/mind-chat`, {
        params: { chatId: mindChatDetail.id },
      })
      .then(() => {
        getMindChats();
        closeModal("mindChat-detail");

        setModalLoading(false);
      })
      .catch((error) => {
        setModalLoading(false);
      });
  };
  return (
    <div className="grid grid-cols-2 mt-10">
      <div className="col-span-2 px-2 py-1 my-1 text-lg text-white bg-primary">
        구조화 질문
      </div>
      <div className="col-span-2 mt-2">
        <Table
          divider={false}
          data={mindChatsData.chat || []}
          addedMap={addedMap}
          draggable
          trOptions={{
            tbody: {
              isDraggable: () => mindChatDraggable,

              dragEndFunc: (
                e: {
                  no: number;
                  id: number;
                  sequence: number;
                  questionType: string;
                  question: string;
                  choices: string[];
                }[]
              ) => {
                const result = map(e, (obj) => omit(obj, ["no"]));

                setMindChatsData((prev) => {
                  return { ...prev, chat: result };
                });
              },
              dbClickFunc: (e: TdObjTypes) => {
                const targetSequence = e.sequence;

                const target = filter(
                  mindChatsData.chat,
                  (item) => item.sequence === targetSequence
                )[0];

                if (target.questionType === "MultipleChoice") {
                  setMindChatDetail({
                    question: target.question,
                    questionType: target.questionType,
                    questionNumber: target.choices.length,
                    choices: target.choices,
                    id: target.id,
                  });
                } else {
                  setMindChatDetail({
                    question: target.question,
                    questionType: target.questionType,
                    questionNumber: 3,
                    choices: [],
                    id: target.id,
                  });
                }

                setIsEdit(true);
                openModal("mindChat-detail");
              },
            },
          }}
          tdOptions={{
            playTime: {
              el: (item: number) => {
                const minute = Math.floor(item / 60);
                const second = item % 60;

                const minuteStr = minute < 10 ? `0${minute}` : minute;
                const secondStr = second < 10 ? `0${second}` : second;

                return <span>{`${minuteStr}:${secondStr}`}</span>;
              },
            },
          }}
          buttons={
            <>
              {mindChatDraggable ? (
                <>
                  <button
                    className="rounded-none btn btn-outline btn-sm max-xl:btn-xs"
                    onClick={() => {
                      const copy = [...freezeMindChat];
                      setMindChatsData((prev) => {
                        return { ...prev, chat: copy };
                      });

                      setMindChatDraggable(false);
                    }}
                  >
                    취소
                  </button>
                  <button
                    disabled={isEqual(mindChatsData.chat, freezeMindChat)}
                    className="rounded-none btn btn-primary btn-sm max-xl:btn-xs"
                    onClick={() => {
                      setMindChatDraggable(false);
                      // submitPutMindChatSequence();
                    }}
                  >
                    저장
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="rounded-none btn btn-primary btn-sm max-xl:btn-xs"
                    onClick={() => setMindChatDraggable(true)}
                  >
                    우선순위 변경
                  </button>
                  <button
                    className="rounded-none btn btn-primary btn-sm max-xl:btn-xs"
                    onClick={() => {
                      setIsEdit(false);
                      setIsMindChatEdit(false);
                      setMindChatDetail({
                        question: "",
                        questionType: "OpeningMessage",
                        questionNumber: 3,
                        choices: [],
                        id: 0,
                      });
                      openModal("mindChat-detail");
                    }}
                  >
                    질문 추가
                  </button>
                </>
              )}
            </>
          }
        />
      </div>

      <Modal id="mindChat-detail">
        <div className="flex flex-col justify-between h-full">
          <div>
            <div className="mb-6 text-xl font-bold max-sm:text-base">
              {isEdit ? "질문 수정" : "질문 추가"}
            </div>
            <div className="flex flex-col gap-10">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 px-2 py-1 my-1 text-lg text-white bg-primary">
                  구분
                </div>
                <div className="grid items-center grid-cols-3 col-span-2 gap-2">
                  <span className="col-span-1">분류</span>

                  <select
                    disabled={isEdit}
                    className="col-span-1 rounded-none join-item select-sm select select-bordered max-xl:select-xs"
                    value={(mindChatDetail?.questionType as string) || ""}
                    // disabled={isContentEdit}
                    onChange={(e) => {
                      if (e.target.value !== "MultipleChoice") {
                        setMindChatDetail((prev) => {
                          return {
                            ...prev,
                            questionType: e.target.value,
                            choices: [],
                          };
                        });
                      } else {
                        setMindChatDetail((prev) => {
                          return {
                            ...prev,
                            questionType: e.target.value,
                          };
                        });
                      }
                    }}
                  >
                    <option value="OpeningMessage">오프닝 멘트</option>
                    <option value="ClosingMessage">클로징 멘트</option>

                    {/* <option value="PsychologicalTest">심리검사</option> */}
                    <option value="MultipleChoice">객관식</option>
                    <option value="OpenEnded">주관식</option>
                    {/* <option value="Slide">척도</option> */}
                    {/* <option value="MultipleChoiceSlide">척도+세부질문</option> */}
                  </select>
                </div>

                {mindChatDetail?.questionType === "MultipleChoice" && (
                  <div className="grid items-center grid-cols-3 col-span-2 gap-x-2 gap-y-4">
                    <span className="col-span-1">후보수</span>

                    <select
                      className="col-span-1 rounded-none join-item select-sm select select-bordered max-xl:select-xs"
                      value={mindChatDetail?.questionNumber || ""}
                      disabled={isEdit && !isMindChatEdit}
                      onChange={(e) => {
                        setMindChatDetail((prev) => {
                          const copy = [...prev.choices];

                          if (prev.questionNumber > Number(e.target.value)) {
                            copy.splice(copy.length - 1, 1);
                          }
                          return {
                            ...prev,
                            questionNumber: Number(e.target.value),
                            choices: copy,
                          };
                        });
                      }}
                    >
                      <option value={3}>3</option>
                      <option value={4}>4</option>
                      <option value={5}>5</option>
                    </select>
                    <span className="col-span-1 inivisible"></span>

                    {/* <span className="col-span-1">선택제한</span>
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
                      {times(mindChatDetail.questionNumber, (item) => {
                        return <option value={item + 1}>{item + 1}</option>;
                      })}
               
                    </select> */}
                  </div>
                )}

                <div className="grid items-center grid-cols-3 col-span-2 gap-2">
                  <span className="col-span-1">내용</span>
                  <textarea
                    disabled={isEdit && !isMindChatEdit}
                    className="col-span-2 rounded-none resize-none bg-base-100 textarea textarea-bordered textarea-sm max-sm:textarea-xs"
                    placeholder=""
                    value={mindChatDetail?.question as string}
                    onChange={(e) => {
                      setMindChatDetail((prev) => {
                        return { ...prev, question: e.target.value };
                      });
                    }}
                    autoFocus={false}
                  />
                </div>

                {mindChatDetail?.questionType === "MultipleChoice" && (
                  <div className="grid items-center grid-cols-3 col-span-2 gap-2">
                    {times(mindChatDetail.questionNumber, (item) => {
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
                              value={mindChatDetail.choices[item]}
                              disabled={isEdit && !isMindChatEdit}
                              type="text"
                              className="rounded-none grow bg-base-100 input input-bordered input-sm max-sm:input-xs"
                              autoFocus={false}
                              onChange={(e) => {
                                setMindChatDetail((prev) => {
                                  const copy = [...prev.choices];

                                  copy[item] = e.target.value;
                                  return { ...prev, choices: copy };
                                });
                              }}
                            />
                          </div>
                        </>
                      );
                    })}
                  </div>
                )}

                {(mindChatDetail?.questionType === "Slide" ||
                  mindChatDetail?.questionType === "MultipleChoiceSlide") && (
                  <>
                    <div className="grid items-center grid-cols-3 col-span-2 gap-2">
                      <span className="col-span-1">척도레벨</span>
                      <input
                        type="text"
                        className="col-span-1 rounded-none grow bg-base-100 input input-bordered input-sm max-sm:input-xs"
                        placeholder=""
                        value={level || 0}
                        onChange={(e) => {
                          if (Number(e.target.value) < 11) {
                            setLevel(Number(e.target.value));
                          }
                        }}
                        maxLength={2}
                        autoFocus={false}
                      />
                      <div className="col-span-1">
                        <button
                          className="btn btn-primary btn-sm"
                          type="button"
                          onClick={() => {
                            if (level !== 0) {
                              setMeasure((prev) => {
                                return {
                                  ...prev,
                                  active: true,
                                  level: level,
                                };
                              });
                            }
                          }}
                        >
                          불러오기
                        </button>
                      </div>
                    </div>

                    {measure.active && (
                      <div className="grid items-center grid-cols-9 col-span-2 gap-2">
                        <span className="col-span-1">척도표시</span>
                        <div
                          className="col-span-8 gap-2"
                          style={{
                            display: "grid",
                            gridTemplateColumns: `repeat(${measure.level}, minmax(0, 1fr))`,
                          }}
                        >
                          {times(measure.level, (item) => {
                            return (
                              <input
                                type="text"
                                className={`col-span-1 rounded-none bg-base-100 input input-bordered input-sm max-sm:input-xs`}
                                // style={{
                                //   maxWidth: `${(
                                //     (measure.level / 100) *
                                //     100
                                //   ).toFixed()}%`,
                                // }}
                                placeholder={`레벨 ${item + 1}`}
                                // onChange={(e) => {
                                //   if (Number(e.target.value) < 11) {
                                //     setMeasure((prev) => {
                                //       return {
                                //         ...prev,
                                //         level: Number(e.target.value),
                                //       };
                                //     });
                                //   }
                                // }}
                                autoFocus={false}
                              />
                            );
                          })}
                          <div className="col-span-8">
                            ※ 슬라이더에 노출할 텍스트를 입력합니다.
                          </div>
                        </div>
                      </div>
                    )}

                    {measure.active && (
                      <div className="grid items-center grid-cols-9 col-span-2 gap-2">
                        <span className="col-span-1">척도색상</span>
                        <div
                          className="col-span-8 gap-2"
                          style={{
                            display: "grid",
                            gridTemplateColumns: `repeat(${measure.level}, minmax(0, 1fr))`,
                          }}
                        >
                          {times(measure.level, (item) => {
                            return (
                              <input
                                type="text"
                                className={`col-span-1 rounded-none bg-base-100 input input-bordered input-sm max-sm:input-xs`}
                                // style={{
                                //   maxWidth: `${(
                                //     (measure.level / 100) *
                                //     100
                                //   ).toFixed()}%`,
                                // }}
                                placeholder={`HEX ${item + 1}`}
                                // onChange={(e) => {
                                //   if (Number(e.target.value) < 11) {
                                //     setMeasure((prev) => {
                                //       return {
                                //         ...prev,
                                //         level: Number(e.target.value),
                                //       };
                                //     });
                                //   }
                                // }}
                                autoFocus={false}
                              />
                            );
                          })}

                          <div className="col-span-8">
                            ※ 슬라이더에 노출할 색상(헥사코드)을 입력합니다.
                          </div>
                        </div>
                      </div>
                    )}
                    {measure.active &&
                      mindChatDetail.questionType === "MultipleChoiceSlide" && (
                        <>
                          <div className="grid items-center grid-cols-3 col-span-2 gap-2">
                            <span className="col-span-1">추가질문</span>
                            <textarea
                              // type="text"
                              className="col-span-2 rounded-none resize-none bg-base-100 textarea textarea-bordered textarea-sm max-sm:textarea-xs"
                              placeholder=""
                              // value={mindChatDetail?.question as string}
                              // onChange={(e) => {
                              //   setMindChatDetail((prev) => {
                              //     return { ...prev, question: e.target.value };
                              //   });
                              // }}
                              autoFocus={false}
                            />
                          </div>
                          <div className="grid items-center grid-cols-3 col-span-2 gap-2">
                            <span className="col-span-1">선택제한</span>
                            <input
                              type="text"
                              className={`col-span-1 rounded-none bg-base-100 input input-bordered input-sm max-sm:input-xs`}
                              // style={{
                              //   maxWidth: `${(
                              //     (measure.level / 100) *
                              //     100
                              //   ).toFixed()}%`,
                              // }}

                              // onChange={(e) => {
                              //   if (Number(e.target.value) < 11) {
                              //     setMeasure((prev) => {
                              //       return {
                              //         ...prev,
                              //         level: Number(e.target.value),
                              //       };
                              //     });
                              //   }
                              // }}
                              autoFocus={false}
                            />
                          </div>
                        </>
                      )}

                    {measure.active &&
                      mindChatDetail.questionType === "MultipleChoiceSlide" && (
                        <div className="grid items-center grid-cols-9 col-span-2 gap-2">
                          {times(measure.level, (level) => {
                            return (
                              <>
                                <span className="col-span-1">
                                  척도 {level + 1} 선택
                                </span>
                                <div className="grid grid-cols-8 col-span-8 gap-2">
                                  {times(8, (item) => {
                                    return (
                                      <input
                                        type="text"
                                        className={`col-span-1 rounded-none bg-base-100 input input-bordered input-sm max-sm:input-xs`}
                                        // style={{
                                        //   maxWidth: `${(
                                        //     (measure.level / 100) *
                                        //     100
                                        //   ).toFixed()}%`,
                                        // }}
                                        placeholder={`선택지 ${item + 1}`}
                                        // onChange={(e) => {
                                        //   if (Number(e.target.value) < 11) {
                                        //     setMeasure((prev) => {
                                        //       return {
                                        //         ...prev,
                                        //         level: Number(e.target.value),
                                        //       };
                                        //     });
                                        //   }
                                        // }}
                                        autoFocus={false}
                                      />
                                    );
                                  })}
                                </div>
                              </>
                            );
                          })}
                        </div>
                      )}
                  </>
                )}
              </div>
              <div className="flex justify-end gap-2">
                {isEdit ? (
                  isMindChatEdit ? (
                    <>
                      <button
                        className="btn btn-outline btn-sm"
                        type="button"
                        onClick={() => {
                          const targetId = mindChatDetail.id;

                          const target = filter(
                            freezeMindChat,
                            (item) => item.id === targetId
                          )[0];

                          setIsMindChatEdit(false);
                          setMindChatDetail((prev) => {
                            return {
                              ...prev,
                              id: target.id,
                              question: target.question,
                              questionType: target.questionType,
                              choices: target.choices,
                              questionNumber: target.choices.length,
                            };
                          });
                        }}
                      >
                        취소
                      </button>
                      <button
                        className="btn btn-primary btn-sm"
                        type="button"
                        onClick={() => {
                          setIsMindChatEdit(false);
                          // submitPutEditMindChat();
                        }}
                      >
                        저장
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="btn btn-primary btn-sm"
                        type="button"
                        onClick={() => setIsMindChatEdit(true)}
                      >
                        수정
                      </button>
                      <button
                        className="btn btn-error btn-sm"
                        type="button"
                        // onClick={() => submitDeleteMindChat()}
                      >
                        삭제
                      </button>
                    </>
                  )
                ) : (
                  <button
                    disabled={mindChatDetail.question === ""}
                    className="btn btn-primary btn-sm"
                    type="button"
                    // onClick={() => submitPostAddQuestion()}
                  >
                    칠문 추가
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default index;
