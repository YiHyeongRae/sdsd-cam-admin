import { Modal } from "#/components/Modal";
import Table from "#/components/Table";
import { TdObjTypes } from "#/data/types/components";
import api from "#/library/axios/api";
import useConfirmState from "#/library/recoil/hook/useConfirmState";
import useLoadingState from "#/library/recoil/hook/useLoadingState";
import useMakeFreeze from "#/utils/useMakeFreeze";
import { closeModal, openModal } from "#/utils/useModalHandler";
import { filter, find, isEqual, map } from "lodash";
import { useEffect, useState } from "react";

function index({ id }: { id: number }) {
  const [introData, setIntroData] = useState<
    {
      id: number;
      content: string;
      sequence: number;
      title: string;
    }[]
  >([]);
  const [freezeIntro, setFreezeIntro] = useState<
    {
      id: number;
      content: string;
      sequence: number;
      title: string;
    }[]
  >([]);
  const addedMap = [
    ["id", "인트로 ID"],
    ["sequence", "우선순위"],
    ["title", "제목"],
  ];
  const [introDraggable, setIntroDraggable] = useState(false);
  const { setModalLoading } = useLoadingState();
  const { setConfirmFunc } = useConfirmState();
  const [isEmptyTitle, setIsEmptyTitle] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isIntroEdit, setIsIntroEdit] = useState(false);

  const [introDetail, setIntroDetail] = useState<{
    title?: string;
    content?: string;
    id?: number;
    sequence?: number;
  }>();

  const getIntro = () => {
    // setModalLoading(true);
    // api
    //   .get(`/admin/program/content/transition`, {
    //     params: { programId: id, transitionType: "intro" },
    //   })
    //   .then((result) => {
    //     setIntroData(result.data);

    //     const freeze = useMakeFreeze(result.data);
    //     setFreezeIntro(freeze);

    //     setModalLoading(false);
    //   })
    //   .catch(() => {
    //     setModalLoading(false);
    //   });

    const dummyResult: any = [
      {
        id: 4,
        sequence: 1,
        title: "4번째",
        content: "4번째입니다",
      },
      {
        id: 2,
        sequence: 2,
        title: "두번째",
        content: "두번째내용",
      },
      {
        id: 1,
        sequence: 3,
        title: "인트로ㅋ",
        content: "",
      },
    ];

    setIntroData(dummyResult);

    const freeze = useMakeFreeze(dummyResult);
    setFreezeIntro(freeze);
  };
  useEffect(() => {
    getIntro();
  }, [id]);

  const submitAddTransitionIntro = () => {
    setModalLoading(true);
    api
      .post(`/admin/program/content/transition`, {
        title: isEmptyTitle ? "" : introDetail?.title,
        content: introDetail?.content,
        programId: id,
        transitionType: "intro",
      })
      .then((result) => {
        setModalLoading(false);

        getIntro();

        closeModal("intro-detail");
      })
      .catch((error) => {
        setModalLoading(false);
      });
  };

  const submitDeleteTransitionIntro = () => {
    setModalLoading(true);
    api
      .delete(`/admin/program/content/transition`, {
        params: {
          transitionId: introDetail?.id,
        },
      })
      .then((result) => {
        setModalLoading(false);

        getIntro();

        closeModal("intro-detail");
      })
      .catch((error) => {
        setModalLoading(false);
      });
  };

  const submitPutEditTransitionIntro = () => {
    setModalLoading(true);
    api
      .put(`/admin/program/content/transition`, {
        title: isEmptyTitle ? "" : introDetail?.title,
        content: introDetail?.content,
        programId: id,
        transitionType: "intro",
        transitionId: introDetail?.id,
      })
      .then((result) => {
        setModalLoading(false);

        getIntro();

        closeModal("intro-detail");
      })
      .catch((error) => {
        setModalLoading(false);
      });
  };

  const submitPutIntroSequence = () => {
    setModalLoading(true);

    const copy = [...introData];

    const emptyArr: {}[] = [];

    map(copy, (item, index) => {
      const introObj = {
        id: item.id,
        sequence: index + 1,
      };

      emptyArr.push(introObj);
    });

    api
      .put(`/admin/program/content/transition/sequence`, {
        programId: id,
        transitionType: "intro",
        sequences: emptyArr,
      })
      .then((result) => {
        getIntro();
        setModalLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setModalLoading(false);
      });
  };
  return (
    <div className="grid grid-cols-2 mt-10">
      <div className="col-span-2 px-2 py-1 my-1 text-lg text-white bg-primary">
        인트로
      </div>
      <div className="col-span-2 mt-2">
        <Table
          divider={false}
          data={introData || []}
          addedMap={addedMap}
          draggable
          trOptions={{
            tbody: {
              isDraggable: () => introDraggable,
              dragEndFunc: (
                e: {
                  no: number;
                  id: number;
                  title: string;
                }[]
              ) => {
                const ids = map(e, (item) => item.id);
                const copy = [...introData];
                const result = [] as {
                  id: number;
                  content: string;
                  sequence: number;
                  title: string;
                }[];
                map(ids, (item) => {
                  const target = find(copy, (find) => {
                    return find.id === item;
                  });
                  if (target) {
                    result.push(target);
                  }
                });

                setIntroData(result);
              },
              dbClickFunc: (obj: TdObjTypes) => {
                const targetSequence = obj.sequence;
                const target = filter(
                  introData,
                  (item) =>
                    item.sequence === targetSequence && item.title == obj.title
                )[0];
                setIsEdit(true);
                setIntroDetail(target);
                openModal("intro-detail");
              },
            },
          }}
          buttons={
            <>
              {introDraggable ? (
                <>
                  <button
                    className="rounded-none btn btn-outline btn-sm max-xl:btn-xs"
                    onClick={() => {
                      setIntroData(freezeIntro);
                      setIntroDraggable(false);
                    }}
                  >
                    취소
                  </button>
                  <button
                    disabled={isEqual(introData, freezeIntro)}
                    className="rounded-none btn btn-primary btn-sm max-xl:btn-xs"
                    onClick={() => {
                      setIntroDraggable(false);
                      // submitPutIntroSequence();
                    }}
                  >
                    저장
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="rounded-none btn btn-primary btn-sm max-xl:btn-xs"
                    onClick={() => setIntroDraggable(true)}
                  >
                    우선순위 변경
                  </button>
                  <button
                    className="rounded-none btn btn-primary btn-sm max-xl:btn-xs"
                    onClick={() => {
                      setIsEdit(false);
                      setIsIntroEdit(false);
                      setIntroDetail({
                        title: "",
                        content: "",
                        sequence: 0,
                        id: 0,
                      });
                      openModal("intro-detail");
                    }}
                  >
                    인트로 추가
                  </button>
                </>
              )}
            </>
          }
        />
      </div>

      <Modal
        id="intro-detail"
        closeFunc={() => {
          setIsIntroEdit(false);
          setIntroDetail({
            title: "",
            content: "",
            sequence: 0,
            id: 0,
          });
        }}
      >
        <div className="flex flex-col justify-between h-full">
          <div>
            <div className="mb-6 text-xl font-bold max-sm:text-base">
              {isEdit ? "인트로 수정" : "인트로 추가"}
            </div>
            <div className="flex flex-col gap-10">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 px-2 py-1 my-1 text-lg text-white bg-primary">
                  구분
                </div>
                <div className="grid items-center grid-cols-3 col-span-2 gap-2">
                  <span className="col-span-1">제목</span>
                  <textarea
                    disabled={isEmptyTitle || (isEdit && !isIntroEdit)}
                    className="col-span-2 rounded-none resize-none bg-base-100 textarea textarea-bordered textarea-sm max-sm:textarea-xs"
                    placeholder=""
                    value={introDetail?.title as string}
                    onChange={(e) => {
                      setIntroDetail((prev) => {
                        return { ...prev, title: e.target.value };
                      });
                    }}
                    autoFocus={false}
                  />
                </div>
                <div className="grid items-center grid-cols-3 col-span-2 gap-2">
                  <span className="invisible col-span-1"></span>

                  <div className="flex items-center col-span-1 gap-2">
                    <input
                      disabled={isEdit && !isIntroEdit}
                      type="checkbox"
                      className="rounded-none checkbox checkbox-primary checkbox-sm"
                      checked={isEmptyTitle}
                      onChange={(e) => {
                        setIsEmptyTitle(e.target.checked);
                      }}
                    />
                    <span>제목없음</span>
                  </div>
                </div>
                <div className="grid items-center grid-cols-3 col-span-2 gap-2">
                  <span className="col-span-1">내용</span>
                  <textarea
                    disabled={isEdit && !isIntroEdit}
                    className="col-span-2 rounded-none resize-none bg-base-100 textarea textarea-bordered textarea-sm max-sm:textarea-xs"
                    placeholder=""
                    value={introDetail?.content as string}
                    onChange={(e) => {
                      setIntroDetail((prev) => {
                        return { ...prev, content: e.target.value };
                      });
                    }}
                    autoFocus={false}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                {isEdit ? (
                  isIntroEdit ? (
                    <>
                      <button
                        className="btn btn-outline btn-sm"
                        type="button"
                        onClick={() => {
                          const targetId = introDetail?.id;
                          const target = filter(
                            freezeIntro,
                            (item) => item.id === targetId
                          )[0];
                          setIsIntroEdit(false);
                          setIntroDetail(target);

                          if (target.title === "") {
                            setIsEmptyTitle(true);
                          } else {
                            setIsEmptyTitle(false);
                          }
                        }}
                      >
                        취소
                      </button>
                      <button
                        className="btn btn-primary btn-sm"
                        type="button"
                        onClick={() => {
                          setIsIntroEdit(false);
                          // submitPutEditTransitionIntro();
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
                        onClick={() => setIsIntroEdit(true)}
                      >
                        수정
                      </button>
                      <button
                        className="btn btn-error btn-sm"
                        type="button"
                        onClick={() => {
                          // setConfirmFunc(() => submitDeleteTransitionIntro());
                          openModal("confirm-delete");
                        }}
                      >
                        삭제
                      </button>
                    </>
                  )
                ) : (
                  <button
                    // disabled={mindChatDetail.question === ""}
                    className="btn btn-primary btn-sm"
                    type="button"
                    // onClick={() => submitAddTransitionIntro()}
                  >
                    인트로 추가
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
