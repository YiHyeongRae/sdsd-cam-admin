import Table from "#/components/Table";
import { useEffect, useState } from "react";
import { Modal } from "#/components/Modal";
import { closeModal, openModal } from "#/utils/useModalHandler";
import TableExtensionHeader from "#/components/TableExtensionHeader";
import { Alert } from "#/components/Alert";
import { TableStateTypes, TdObjTypes } from "#/data/types/components";
import useLoadingState from "#/library/recoil/hook/useLoadingState";
import api from "#/library/axios/api";
import { map } from "lodash";

function index() {
  const [inquiry, setInquiryData] = useState<TableStateTypes>();
  const { setLoading } = useLoadingState();
  const [perPage, setPerPage] = useState({
    page: 1,
    perPage: 20,
    pageLength: 1,
  });

  const [search, setSearch] = useState({
    word: "",
    startDate: "",
    endDate: "",
    inquiryStatus: "",
  });

  const [inquiryDetail, setInquiryDetailData] = useState<TdObjTypes>({});
  const [modalImage, setModalImage] = useState("");
  const addedMap = [
    ["createdAt", "접수일시"],
    ["id", "문의건 ID"],
    ["userId", "UID"],
    ["userName", "이름"],
    ["title", "제목"],
    ["inquiryStatus", "답변 여부"],
  ];

  const submitSearchInquiry = (isSubmit: boolean) => {
    // setLoading(true);
    // api
    //   .get(`/admin/inquiry`, {
    //     params: {
    //       page: isSubmit ? 1 : perPage.page,
    //       pageSize: perPage.perPage,
    //       searchWord: search.word,
    //       searchStartDate: search.startDate,
    //       searchEndDate: search.endDate,
    //       inquiryStatus: search.inquiryStatus,
    //     },
    //   })
    //   .then((result) => {
    //     const { totalCount } = result.data;

    //     setInquiryData(result.data);
    //     setPerPage((prev) => {
    //       return {
    //         ...prev,
    //         pageLength: Math.ceil(totalCount / prev.perPage),
    //       };
    //     });
    //     setLoading(false);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     setLoading(false);
    //   });

    const dummyResult: any = {
      totalCount: 82,
      inquiries: [
        {
          id: 82,
          createdAt: "2024-12-18 10:27:42",
          userName: "ㄴㅎㅂ",
          userId: 18,
          title: "버거",
          inquiryStatus: "Pending",
        },
        {
          id: 81,
          createdAt: "2024-12-17 08:22:14",
          userName: "ㅁㄷㄱㄱㄷ",
          userId: 55,
          title: "ㅌㅌㅌ",
          inquiryStatus: "Answered",
        },
        {
          id: 80,
          createdAt: "2024-12-16 13:41:22",
          userName: "trnfsgn",
          userId: 57,
          title: "방해금지 off",
          inquiryStatus: "Answered",
        },
        {
          id: 79,
          createdAt: "2024-12-16 13:40:41",
          userName: "trnfsgn",
          userId: 57,
          title: "ㄴㄷㄴㄷㄴ",
          inquiryStatus: "Answered",
        },
        {
          id: 78,
          createdAt: "2024-12-16 13:26:14",
          userName: "trnfsgn",
          userId: 57,
          title: "테스트",
          inquiryStatus: "Answered",
        },
        {
          id: 77,
          createdAt: "2024-12-16 13:13:46",
          userName: "trnfsgn",
          userId: 57,
          title: "ㄱㅈㄱㅈ",
          inquiryStatus: "Answered",
        },
        {
          id: 76,
          createdAt: "2024-12-16 12:19:49",
          userName: "trnfsgn",
          userId: 57,
          title: "가자",
          inquiryStatus: "Answered",
        },
        {
          id: 75,
          createdAt: "2024-12-16 12:08:12",
          userName: "trnfsgn",
          userId: 57,
          title: "괴밀행사도",
          inquiryStatus: "Answered",
        },
        {
          id: 74,
          createdAt: "2024-12-16 10:53:11",
          userName: "trnfsgn",
          userId: 57,
          title: "테스트2",
          inquiryStatus: "Answered",
        },
        {
          id: 73,
          createdAt: "2024-12-16 10:52:58",
          userName: "trnfsgn",
          userId: 57,
          title: "테스뜨3",
          inquiryStatus: "Answered",
        },
        {
          id: 72,
          createdAt: "2024-12-16 10:40:17",
          userName: "trnfsgn",
          userId: 57,
          title: "테스트5",
          inquiryStatus: "Answered",
        },
        {
          id: 71,
          createdAt: "2024-12-16 10:38:57",
          userName: "trnfsgn",
          userId: 57,
          title: "문의하자",
          inquiryStatus: "Answered",
        },
        {
          id: 70,
          createdAt: "2024-12-16 09:32:49",
          userName: "ㅁㄷㄱㄱㄷ",
          userId: 55,
          title: "3434",
          inquiryStatus: "Answered",
        },
        {
          id: 69,
          createdAt: "2024-12-16 09:00:23",
          userName: "ㅁㄷㄱㄱㄷ",
          userId: 55,
          title: "55555",
          inquiryStatus: "Answered",
        },
        {
          id: 68,
          createdAt: "2024-12-16 08:58:41",
          userName: "ㅁㄷㄱㄱㄷ",
          userId: 55,
          title: "2222",
          inquiryStatus: "Answered",
        },
        {
          id: 67,
          createdAt: "2024-12-16 07:38:51",
          userName: "ㅁㄷㄱㄱㄷ",
          userId: 55,
          title: "333",
          inquiryStatus: "Answered",
        },
        {
          id: 66,
          createdAt: "2024-12-16 07:37:42",
          userName: "ㅁㄷㄱㄱㄷ",
          userId: 55,
          title: "33333",
          inquiryStatus: "Answered",
        },
        {
          id: 65,
          createdAt: "2024-12-16 07:36:05",
          userName: "ㅁㄷㄱㄱㄷ",
          userId: 55,
          title: "dw",
          inquiryStatus: "Answered",
        },
        {
          id: 64,
          createdAt: "2024-12-16 07:32:14",
          userName: "ㅁㄷㄱㄱㄷ",
          userId: 55,
          title: "444",
          inquiryStatus: "Answered",
        },
        {
          id: 63,
          createdAt: "2024-12-16 07:31:10",
          userName: "ㅁㄷㄱㄱㄷ",
          userId: 55,
          title: "3333",
          inquiryStatus: "Answered",
        },
      ],
    };

    const { totalCount } = dummyResult;

    setInquiryData(dummyResult);
    setPerPage((prev) => {
      return {
        ...prev,
        pageLength: Math.ceil(totalCount / prev.perPage),
      };
    });
  };

  useEffect(() => {
    submitSearchInquiry(false);
  }, [perPage.page, perPage.perPage]);

  const [answer, setAnswer] = useState({ inquiryId: 0, answer: "" });
  return (
    <div>
      <TableExtensionHeader
        search={{
          active: true,
          setter: (value: string) =>
            setSearch((prev) => {
              return { ...prev, word: value };
            }),
        }}
        period={{
          active: true,
          setter: (dateObj: { startDate: string; endDate: string }) => {
            setSearch((prev) => {
              return {
                ...prev,
                startDate: dateObj.startDate,
                endDate: dateObj.endDate,
              };
            });
          },
        }}
        query={{
          reset: () =>
            setSearch({
              word: "",
              startDate: "",
              endDate: "",
              inquiryStatus: "",
            }),
          submit: () => {
            submitSearchInquiry(true);

            setPerPage((prev) => {
              return { ...prev, page: 1 };
            });
          },
        }}
        additionalArea={
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center w-full gap-4 ">
              <div className="mr-4 text-xl font-bold min-w-24 max-xl:text-sm">
                답변여부
              </div>
              <div className="flex flex-wrap flex-auto gap-4">
                <label className="flex gap-2 cursor-pointer label">
                  <input
                    type="radio"
                    name="radio-answer"
                    className="radio radio-primary max-xl:radio-sm"
                    checked={search.inquiryStatus === ""}
                    onChange={() =>
                      setSearch((prev) => {
                        return { ...prev, inquiryStatus: "" };
                      })
                    }
                  />
                  <span className="label-text">전체</span>
                </label>
                <label className="flex gap-2 cursor-pointer label">
                  <input
                    type="radio"
                    name="radio-answer"
                    className="radio radio-primary max-xl:radio-sm"
                    checked={search.inquiryStatus === "Answered"}
                    onChange={() =>
                      setSearch((prev) => {
                        return { ...prev, inquiryStatus: "Answered" };
                      })
                    }
                  />
                  <span className="label-text">Y</span>
                </label>
                <label className="flex gap-2 cursor-pointer label">
                  <input
                    type="radio"
                    name="radio-answer"
                    className="radio radio-primary max-xl:radio-sm"
                    checked={search.inquiryStatus === "Pending"}
                    onChange={() =>
                      setSearch((prev) => {
                        return { ...prev, inquiryStatus: "Pending" };
                      })
                    }
                  />
                  <span className="label-text">N</span>
                </label>
              </div>
            </div>
          </div>
        }
      />
      <Table
        tableTitle={`조회 ${inquiry?.totalCount || "0"} 건`}
        checkable={{
          active: false,
          multi: false,
          setter: () => {},
        }}
        data={inquiry?.inquiries || []}
        addedMap={addedMap}
        tdOptions={{
          inquiryStatus: {
            el: (item: string) => {
              return <span>{item !== "Pending" ? "Y" : "N"}</span>;
            },
            func: () => {},
          },
        }}
        trOptions={{
          tbody: {
            className: () => "hover:bg-gray-300",

            dbClickFunc: (e: TdObjTypes) => {
              // setInquiryDetailData(e);

              // setAnswer((prev) => {
              //   return { ...prev, inquiryId: e.id as number };
              // });
              // api
              //   .get(`/admin/inquiry/${e.id}`)
              //   .then((result) => {
              //     setInquiryDetailData(result.data);

              //     setLoading(false);
              //   })
              //   .catch((error) => {
              //     console.log(error);
              //     setLoading(false);
              //   });

              const dummyResult: any = {
                id: 76,
                createdAt: "2024-12-16 12:19:49",
                title: "가자",
                content: "ㄱㄷㄱ",
                inquiryStatus: "Answered",
                userName: "trnfsgn",
                email: "sahonmu@naver.com",
                answer: "미안합니다.",
                answeredAt: "2024-12-16 12:34:33",
                adminName: "trnfsgn현",
                images: [
                  "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/inquiry/57/1734319189371_full.jpeg",
                  "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/inquiry/57/1734319189378_20240312_183236.jpg",
                ],
              };
              setInquiryDetailData(dummyResult);

              openModal("inquiry-detail");
            },
          },
        }}
        perPageOptions={{
          page: perPage.page,
          perPage: perPage.perPage,
          pageLength: perPage.pageLength,
          setPerPage: setPerPage,
        }}
      />
      <Modal
        id="inquiry-detail"
        className="h-full"
        closeFunc={() => setAnswer({ inquiryId: 0, answer: "" })}
      >
        <div className="flex flex-wrap gap-4 max-2xl:gap-10">
          <div className="flex flex-col flex-auto gap-4">
            <div className="text-2xl font-bold max-lg:text-lg">
              문의답변 등록
            </div>
            <div className="flex flex-col gap-2">
              <div className="col-span-2 px-2 py-1 my-1 text-lg text-white bg-primary">
                문의 정보
              </div>
              <div className="grid grid-cols-3 gap-2 max-lg:grid-cols-1">
                <div className="col-span-1">
                  <div className="flex flex-col flex-wrap gap-4">
                    <div className="flex flex-wrap gap-4">
                      <div className=" min-w-16 max-lg:text-sm">접수일시</div>
                      <div className="font-bold whitespace-nowrap max-lg:text-sm">
                        {inquiryDetail?.createdAt as string}
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className=" min-w-16 whitespace-nowrap max-lg:text-sm">
                        UID
                      </div>
                      <div className="font-bold whitespace-nowrap max-lg:text-sm">
                        {inquiryDetail.id as string}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-span-1">
                  <div className="flex flex-col flex-wrap gap-4">
                    <div className="flex gap-4">
                      <div className=" min-w-16 whitespace-nowrap max-lg:text-sm">
                        답변여부
                      </div>
                      <div className="font-bold whitespace-nowrap max-lg:text-sm">
                        {(inquiryDetail.inquiryStatus as string) !== "Pending"
                          ? "Y"
                          : "N"}
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className=" min-w-16 whitespace-nowrap max-lg:text-sm">
                        이름
                      </div>
                      <div className="font-bold whitespace-nowrap max-lg:text-sm">
                        {inquiryDetail.userName as string}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-span-1">
                  <div className="flex flex-col flex-wrap gap-4">
                    <div className="flex gap-4">
                      <div className=" min-w-16 whitespace-nowrap max-lg:text-sm">
                        답변자
                      </div>
                      <div className="font-bold whitespace-nowrap max-lg:text-sm">
                        {(inquiryDetail.adminName as string) || "-"}
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className=" min-w-16 whitespace-nowrap max-lg:text-sm">
                        이메일
                      </div>
                      <div className="font-bold whitespace-nowrap max-lg:text-sm">
                        {inquiryDetail.email as string}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 px-2 py-1 my-1 text-lg text-white bg-primary">
                게시글
              </div>

              <div className="grid col-span-2 gap-2">
                <div className="grid items-center grid-cols-3 col-span-2 gap-2">
                  <span className="col-span-1">제목</span>
                  <input
                    type="text"
                    className="col-span-2 rounded-none grow bg-base-100 input input-bordered input-sm max-sm:input-xs"
                    value={(inquiryDetail.title as string) || ""}
                    disabled
                  />
                </div>
                <div className="grid items-start grid-cols-3 col-span-2 gap-2">
                  <span className="col-span-1">내용</span>

                  <textarea
                    className="col-span-2 rounded-none resize-none min-h-60 textarea textarea-bordered"
                    value={(inquiryDetail.content as string) || ""}
                    disabled
                  ></textarea>
                </div>
                <div className="grid items-start grid-cols-3 col-span-2 gap-2">
                  <span className="col-span-1">첨부 이미지</span>

                  <div className="flex col-span-2 gap-2 overflow-auto max-h-[189px]">
                    {Array.isArray(inquiryDetail?.images) ? (
                      map(inquiryDetail?.images, (item, index) => {
                        return (
                          <img
                            key={item + "-image-" + index}
                            className="object-cover w-[189px]"
                            src={String(item)}
                            onClick={() => {
                              setModalImage(item);
                              openModal("inquiry-detail-image");
                            }}
                          />
                        );
                      })
                    ) : (
                      <div className="flex justify-end w-full text-right">
                        이미지가 없습니다.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 px-2 py-1 my-1 text-lg text-white bg-primary">
                답변 내용
              </div>

              <div className="grid col-span-2 gap-2">
                <textarea
                  className="col-span-2 rounded-none resize-none min-h-60 textarea textarea-bordered"
                  disabled={inquiryDetail.answer !== null}
                  value={(inquiryDetail.answer as string) || answer.answer}
                  onChange={(e) =>
                    setAnswer((prev) => {
                      return { ...prev, answer: e.target.value };
                    })
                  }
                ></textarea>
              </div>
            </div>
          </div>
          <div className="flex justify-end w-full">
            <button
              className="rounded-none btn btn-primary btn-sm"
              disabled={inquiryDetail.answer !== null || answer.answer === ""}
              onClick={() => openModal("ask-answer")}
            >
              답변 등록
            </button>
          </div>
        </div>
      </Modal>
      <Modal id="inquiry-detail-image" className="max-w-screen-sm">
        <div className="flex items-center justify-center py-10">
          <img
            className="pointer-events-none select-none"
            src={modalImage}
            alt={`게시물`}
          />
        </div>
      </Modal>
      <Alert
        id="ask-answer"
        title="답변 등록"
        text={`답변을 등록하시겠습니까?\n등록 후에는 수정 및 삭제가 불가능합니다.`}
        buttons={[
          {
            style: "btn-sm btn btn-outline",
            func: () => {},
            disabled: false,
            text: "취소",
          },
          {
            style: "btn-sm btn btn-primary",
            func: () => {
              // api
              //   .put(`/admin/inquiry`, { ...answer })
              //   .then((result) => {
              //     setLoading(false);
              //     closeModal("inquiry-detail");
              //     submitSearchInquiry(false);
              //   })
              //   .catch((error) => {
              //     console.log(error);
              //     setLoading(false);
              //   });
            },

            disabled: false,
            text: "저장",
          },
        ]}
      />
    </div>
  );
}

export default index;
