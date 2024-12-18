import { Modal } from "#/components/Modal";
import Table from "#/components/Table";
import { TdObjTypes } from "#/data/types/components";
import api from "#/library/axios/api";
import useLoadingState from "#/library/recoil/hook/useLoadingState";
import useMakeFreeze from "#/utils/useMakeFreeze";
import { closeModal, openModal } from "#/utils/useModalHandler";
import { filter, groupBy, isEqual, map, omit, sortBy } from "lodash";
import { useEffect, useState } from "react";

function index({ id, session }: { id: number; session: number }) {
  const addedMap = [
    ["mindfulnessSequence", "우선순위"],
    ["mindfulnessGroupId", "명상 그룹 ID"],
    ["mindfulnessId", "명상 ID"],
    ["title", "명상 제목"],
    ["playTime", "플레이타임"],
  ];

  const listAddedMap = [
    // ["mindfulnessGroupId", "명상 그룹 ID"],
    // ["groupName", "그룹명"],
    ["id", "명상 ID"],
    ["title", "명상 제목"],
    ["playTime", "플레이타임"],
  ];
  const [mindfulnessDraggable, setMindfulnessDraggable] = useState(false);

  const [selectMindfulness, setSelectMindfulness] = useState([]);

  const [mindfulnessData, setMindfulnessData] = useState<
    {
      [key: string]: string | number;
    }[]
  >();

  const [mindfulnessListData, setMindfulnessListData] = useState<
    {
      [key: string]: { [key: string]: string | number }[];
    }[]
  >();
  const { setModalLoading } = useLoadingState();
  const [freezeMindfulness, setFreezeMindfulness] = useState([]);
  const getMindfulness = () => {
    // setModalLoading(true);
    // api
    //   .get(`/admin/program/content/mindfulness`, {
    //     params: { programSequenceId: id },
    //   })
    //   .then((result) => {
    //     setMindfulnessData(result.data);

    //     const freeze = useMakeFreeze(result.data);
    //     setFreezeMindfulness(freeze);

    //     setModalLoading(false);
    //   })
    //   .catch((error) => {
    //     setModalLoading(false);
    //   });

    const dummyMindfulness = [
      {
        mindfulnessId: 11,
        mindfulnessSequence: 1,
        mindfulnessGroupId: 2,
        title: "나를 사랑하는 마음챙김",
        playTime: 390,
      },
      {
        mindfulnessId: 12,
        mindfulnessSequence: 2,
        mindfulnessGroupId: 2,
        title: "타인을 위한 마음챙김 명상",
        playTime: 423,
      },
      {
        mindfulnessId: 13,
        mindfulnessSequence: 3,
        mindfulnessGroupId: 2,
        title: "행복한 하루 시작 명상",
        playTime: 349,
      },
    ];

    setMindfulnessData(dummyMindfulness);

    const freeze = useMakeFreeze(dummyMindfulness);
    setFreezeMindfulness(freeze);
  };

  const getMindfulnessList = () => {
    // setModalLoading(true);
    // api
    //   .get(`/admin/program/content/mindfulness/list`)
    //   .then((result) => {
    //     const grouped = groupBy(result.data, "groupName");

    //     setMindfulnessListData([grouped] as {}[]);

    //     setModalLoading(false);
    //   })
    //   .catch((error) => {
    //     setModalLoading(false);
    //   });

    const dummyMindfulnessList: any = [
      {
        id: 1,
        title: "처음 시작하는 마음챙김",
        mindfulnessGroupId: 2,
        playTime: 398,
        groupName: "처음 시작하는 마음챙김",
      },
      {
        id: 2,
        title: "호흡으로 편안해지는 마음챙김",
        mindfulnessGroupId: 2,
        playTime: 365,
        groupName: "처음 시작하는 마음챙김",
      },
      {
        id: 3,
        title: "하루 마무리하는 마음챙김",
        mindfulnessGroupId: 2,
        playTime: 326,
        groupName: "처음 시작하는 마음챙김",
      },
      {
        id: 4,
        title: "누워서 마음챙김 연습하기",
        mindfulnessGroupId: 2,
        playTime: 375,
        groupName: "처음 시작하는 마음챙김",
      },
      {
        id: 5,
        title: "저녁에 누워서 하는 마음챙김",
        mindfulnessGroupId: 2,
        playTime: 412,
        groupName: "처음 시작하는 마음챙김",
      },
      {
        id: 6,
        title: "부정적 감정 내보내기",
        mindfulnessGroupId: 2,
        playTime: 378,
        groupName: "처음 시작하는 마음챙김",
      },
      {
        id: 7,
        title: "나뭇잎에 근심 걱정 보내기",
        mindfulnessGroupId: 2,
        playTime: 335,
        groupName: "처음 시작하는 마음챙김",
      },
      {
        id: 8,
        title: "구름위에 생각, 감정 보내기",
        mindfulnessGroupId: 2,
        playTime: 375,
        groupName: "처음 시작하는 마음챙김",
      },
      {
        id: 9,
        title: "음식과 함께하는 마음챙김",
        mindfulnessGroupId: 2,
        playTime: 368,
        groupName: "처음 시작하는 마음챙김",
      },
      {
        id: 10,
        title: "산책하며 마음을 챙기기",
        mindfulnessGroupId: 2,
        playTime: 395,
        groupName: "처음 시작하는 마음챙김",
      },
      {
        id: 11,
        title: "나를 사랑하는 마음챙김",
        mindfulnessGroupId: 2,
        playTime: 390,
        groupName: "처음 시작하는 마음챙김",
      },
      {
        id: 12,
        title: "타인을 위한 마음챙김 명상",
        mindfulnessGroupId: 2,
        playTime: 423,
        groupName: "처음 시작하는 마음챙김",
      },
      {
        id: 13,
        title: "행복한 하루 시작 명상",
        mindfulnessGroupId: 2,
        playTime: 349,
        groupName: "처음 시작하는 마음챙김",
      },
      {
        id: 14,
        title: "나에게 힘이 되는 명상",
        mindfulnessGroupId: 2,
        playTime: 462,
        groupName: "처음 시작하는 마음챙김",
      },
      {
        id: 15,
        title: "음식과 함께하는 마음챙김",
        mindfulnessGroupId: 2,
        playTime: 365,
        groupName: "처음 시작하는 마음챙김",
      },
    ];

    const grouped = groupBy(dummyMindfulnessList, "groupName");

    setMindfulnessListData([grouped] as {}[]);
  };

  useEffect(() => {
    getMindfulness();
    getMindfulnessList();
  }, [id]);

  const submitPostMindfulness = () => {
    setModalLoading(true);

    const selectedResult = map(selectMindfulness, (value) => value).flat();

    api
      .post(`/admin/program/content/mindfulness`, {
        programSequenceId: id,
        mindfulnessIds: selectedResult,
      })
      .then((result) => {
        console.log("post success", result);
        getMindfulness();
        setModalLoading(false);

        closeModal("mindfulness-list");
      })
      .catch((error) => {
        setModalLoading(false);
      });
  };

  const submitPutMindfulnessSequence = () => {
    setModalLoading(true);
    api
      .put(`/admin/program/content/mindfulness/sequence`, {
        programSequenceId: id,
        mindfulnessIds: map(mindfulnessData, (item) => item.mindfulnessId),
      })
      .then(() => {
        setModalLoading(false);
      })
      .catch(() => {
        setModalLoading(false);
      });
  };
  return (
    <div className="grid grid-cols-2 gap-4 mt-10">
      <div className="col-span-2 px-2 py-1 my-1 text-lg text-white bg-primary">
        명상
      </div>
      <div className="grid items-center grid-cols-3 col-span-2 gap-2">
        <div className="col-span-3">
          <Table
            className=""
            data={mindfulnessData || []}
            addedMap={addedMap}
            draggable
            trOptions={{
              tbody: {
                isDraggable: () => mindfulnessDraggable,

                dragEndFunc: (
                  e: {
                    [key: string]: string | number;
                  }[]
                ) => {
                  const result = map(e, (obj) => omit(obj, ["no"]));
                  console.log("rest result", result);

                  setMindfulnessData(result);
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
                {mindfulnessDraggable ? (
                  <>
                    <button
                      className="rounded-none btn btn-outline btn-sm max-xl:btn-xs"
                      onClick={() => {
                        const copy = [...freezeMindfulness];
                        setMindfulnessData(copy);

                        setMindfulnessDraggable(false);
                      }}
                    >
                      취소
                    </button>
                    <button
                      disabled={isEqual(mindfulnessData, freezeMindfulness)}
                      className="rounded-none btn btn-primary btn-sm max-xl:btn-xs"
                      onClick={() => {
                        setMindfulnessDraggable(false);
                        // submitPutMindfulnessSequence();
                      }}
                    >
                      저장
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="rounded-none btn btn-primary btn-sm max-xl:btn-xs"
                      onClick={() => setMindfulnessDraggable(true)}
                    >
                      우선순위 변경
                    </button>
                    <button
                      className="rounded-none btn btn-primary btn-sm max-xl:btn-xs"
                      onClick={() => {
                        openModal("mindfulness-list");
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

        {/* <div className="flex justify-end col-span-3">
          <button className="btn btn-primary btn-sm">수정</button>
        </div> */}
      </div>

      <Modal
        id="mindfulness-list"
        closeFunc={() => {
          setSelectMindfulness([]);
        }}
      >
        {map(mindfulnessListData, (lists, index) => {
          return map(lists, (value, key) => {
            return (
              <Table
                key={index}
                divider={false}
                tableTitle={`그룹ID ${value[0].mindfulnessGroupId} : ${key}`}
                overflowY={{ active: true, maxHeight: "300px" }}
                checkable={{
                  active: true,
                  setter: (arr: number[]) => {
                    // 테이블 인덱스 받게해놔서 -1 해줘야 배열이랑 매핑됨
                    const changeToIndex = map(arr, (item) => item - 1);

                    const result = sortBy(
                      map(
                        changeToIndex,
                        (targetIndex) => value?.[targetIndex].id
                      )
                    );
                    // const copySelected = [...selectMindfulness];
                    setSelectMindfulness((prev) => {
                      return { ...prev, [key]: result };
                    });
                  },
                  multi: true,
                }}
                data={value || []}
                addedMap={listAddedMap}
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
              />
            );
          });
        })}
        {/* <Table
          divider={false}
          overflowY={{ active: true, maxHeight: "300px" }}
          checkable={{
            active: true,
            setter: (arr: number[]) => {
              console.log("selected item?", arr);

              // 테이블 인덱스 받게해놔서 -1 해줘야 배열이랑 매핑됨

              const changeToIndex = map(arr, (item) => item - 1);

              const result = sortBy(
                map(
                  changeToIndex,
                  (targetIndex) => mindfulnessListData?.[targetIndex].id
                )
              );
              const copySelected = [...selectMindfulness];
              // setSelectMindfulness(())
              console.log("ids", result);
            },
            multi: true,
          }}
          data={mindfulnessListData || []}
          addedMap={listAddedMap}
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
        /> */}
        <div className="flex items-center justify-end gap-5 mt-10">
          <span>{`${
            map(selectMindfulness, (value, key) => value).flat().length
          } 선택됨`}</span>
          <button
            className="btn btn-primary btn-sm"
            // onClick={() => submitPostMindfulness()}
          >
            영상선택
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default index;
