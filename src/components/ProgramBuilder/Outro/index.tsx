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
  const [outroDraggable, setOutroDraggable] = useState(false);

  const [isEdit, setIsEdit] = useState(false);
  const [isOutroEdit, setIsOutroEdit] = useState(false);
  const addedMap = [
    ["id", "아웃트로 ID"],
    ["sequence", "우선순위"],
    ["content", "내용"],
  ];

  const [outroDetail, setOutroDetail] = useState<{
    content?: string;
    id?: number;
    sequence?: number;
  }>();

  const [outroData, setOutroData] = useState<
    {
      id: number;
      content: string;
      sequence: number;
      title: string;
    }[]
  >([]);
  const [freezeOutro, setFreezeOutro] = useState<
    {
      id: number;
      content: string;
      sequence: number;
      title: string;
    }[]
  >([]);

  const { setModalLoading } = useLoadingState();
  const { setConfirmFunc } = useConfirmState();

  const getOutro = () => {
    // setModalLoading(true);
    // api
    //   .get(`/admin/program/content/transition`, {
    //     params: { programId: id, transitionType: "outro" },
    //   })
    //   .then((result) => {
    //     setOutroData(result.data);
    //     const freeze = useMakeFreeze(result.data);
    //     setFreezeOutro(freeze);
    //     setModalLoading(false);
    //   })
    //   .catch(() => {
    //     setModalLoading(false);
    //   });

    const dummyResult: any = [
      {
        id: 8,
        sequence: 1,
        title: null,
        content: "아웃트로2",
      },
      {
        id: 9,
        sequence: 2,
        title: null,
        content: "아웃트로3",
      },
      {
        id: 7,
        sequence: 3,
        title: null,
        content: "아웃트로 11",
      },
    ];

    setOutroData(dummyResult);
    const freeze = useMakeFreeze(dummyResult);
    setFreezeOutro(freeze);
  };
  useEffect(() => {
    getOutro();
  }, [id]);

  const submitAddTransitionOutro = () => {
    setModalLoading(true);
    api
      .post(`/admin/program/content/transition`, {
        content: outroDetail?.content,
        programId: id,
        transitionType: "outro",
      })
      .then((result) => {
        setModalLoading(false);

        getOutro();
        setOutroDetail({ content: "", id: 0, sequence: 0 });
        closeModal("outro-detail");
      })
      .catch((error) => {
        setModalLoading(false);
      });
  };
  const submitPutEditTransitionOutro = () => {
    setModalLoading(true);
    api
      .put(`/admin/program/content/transition`, {
        content: outroDetail?.content,
        programId: id,
        transitionType: "outro",
        transitionId: outroDetail?.id,
      })
      .then((result) => {
        setModalLoading(false);

        getOutro();

        closeModal("intro-detail");
      })
      .catch((error) => {
        setModalLoading(false);
      });
  };

  const submitDeleteTransitionOutro = () => {
    setModalLoading(true);
    api
      .delete(`/admin/program/content/transition`, {
        params: {
          transitionId: outroDetail?.id,
        },
      })
      .then((result) => {
        setModalLoading(false);

        getOutro();

        closeModal("outro-detail");
      })
      .catch((error) => {
        setModalLoading(false);
      });
  };

  const submitPutOutroSequence = () => {
    setModalLoading(true);
    const copy = [...outroData];

    const emptyArr: {}[] = [];

    map(copy, (item, index) => {
      const outroObj = {
        id: item.id,
        sequence: index + 1,
      };

      emptyArr.push(outroObj);
    });

    api
      .put(`/admin/program/content/transition/sequence`, {
        programId: id,
        transitionType: "outro",
        sequences: emptyArr,
      })
      .then((result) => {
        getOutro();
        setModalLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setModalLoading(false);
      });
  };
  return (
    <div>
      <div className="grid grid-cols-2 mt-10">
        <div className="col-span-2 px-2 py-1 my-1 text-lg text-white bg-primary">
          아웃트로
        </div>
        <div className="col-span-2 mt-2">
          <Table
            divider={false}
            data={outroData || []}
            addedMap={addedMap}
            trOptions={{
              tbody: {
                isDraggable: () => outroDraggable,
                dragEndFunc: (
                  e: {
                    no: number;
                    id: number;
                    content: number;
                  }[]
                ) => {
                  const ids = map(e, (item) => item.id);
                  const copy = [...outroData];
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

                  setOutroData(result);
                },
                dbClickFunc: (obj: TdObjTypes) => {
                  const targetSequence = obj.sequence;
                  const target = filter(
                    outroData,
                    (item) =>
                      item.sequence === targetSequence &&
                      item.title == obj.title
                  )[0];
                  setIsEdit(true);
                  setOutroDetail(target);
                  openModal("outro-detail");
                },
              },
            }}
            buttons={
              <>
                {outroDraggable ? (
                  <>
                    <button
                      className="rounded-none btn btn-outline btn-sm max-xl:btn-xs"
                      onClick={() => {
                        setOutroData(freezeOutro);
                        setOutroDraggable(false);
                      }}
                    >
                      취소
                    </button>
                    <button
                      disabled={isEqual(outroData, freezeOutro)}
                      className="rounded-none btn btn-primary btn-sm max-xl:btn-xs"
                      onClick={() => {
                        setOutroDraggable(false);
                        // submitPutOutroSequence();
                      }}
                    >
                      저장
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      disabled={outroData.length === 0}
                      className="rounded-none btn btn-primary btn-sm max-xl:btn-xs"
                      onClick={() => setOutroDraggable(true)}
                    >
                      우선순위 변경
                    </button>
                    <button
                      className="rounded-none btn btn-primary btn-sm max-xl:btn-xs"
                      onClick={() => {
                        openModal("outro-detail");
                      }}
                    >
                      아웃트로 추가
                    </button>
                  </>
                )}
              </>
            }
          />
        </div>
      </div>

      <Modal
        id="outro-detail"
        closeFunc={() =>
          setOutroDetail((prev) => {
            return { ...prev, content: "" };
          })
        }
      >
        <div className="flex flex-col justify-between h-full">
          <div>
            <div className="mb-6 text-xl font-bold max-sm:text-base">
              아웃트로 추가
            </div>
            <div className="flex flex-col gap-10">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 px-2 py-1 my-1 text-lg text-white bg-primary">
                  구분
                </div>

                <div className="grid items-center grid-cols-3 col-span-2 gap-2">
                  <span className="col-span-1">내용</span>
                  <textarea
                    disabled={isEdit && !isOutroEdit}
                    className="col-span-2 rounded-none resize-none bg-base-100 textarea textarea-bordered textarea-sm max-sm:textarea-xs"
                    value={outroDetail?.content as string}
                    onChange={(e) => {
                      setOutroDetail((prev) => {
                        return { ...prev, content: e.target.value };
                      });
                    }}
                    autoFocus={false}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                {isEdit ? (
                  isOutroEdit ? (
                    <>
                      <button
                        className="btn btn-outline btn-sm"
                        type="button"
                        onClick={() => {
                          const targetId = outroDetail?.id;
                          const target = filter(
                            freezeOutro,
                            (item) => item.id === targetId
                          )[0];
                          setIsOutroEdit(false);
                          setOutroDetail(target);
                        }}
                      >
                        취소
                      </button>
                      <button
                        className="btn btn-primary btn-sm"
                        type="button"
                        onClick={() => {
                          setIsOutroEdit(false);
                          // submitPutEditTransitionOutro();
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
                        onClick={() => setIsOutroEdit(true)}
                      >
                        수정
                      </button>
                      <button
                        className="btn btn-error btn-sm"
                        type="button"
                        onClick={() => {
                          // setConfirmFunc(() => submitDeleteTransitionOutro());
                          openModal("confirm-delete");
                        }}
                      >
                        삭제
                      </button>
                    </>
                  )
                ) : (
                  <button
                    disabled={
                      !outroDetail?.content || outroDetail?.content === ""
                    }
                    className="btn btn-primary btn-sm"
                    type="button"
                    // onClick={() => submitAddTransitionOutro()}
                  >
                    아웃트로 추가
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
