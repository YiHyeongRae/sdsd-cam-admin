import Table from "#/components/Table";
import { useEffect, useRef, useState } from "react";
import { Modal } from "#/components/Modal";
import { closeModal, openModal } from "#/utils/useModalHandler";
import TableExtensionHeader from "#/components/TableExtensionHeader";
import {
  ReportDetailTypes,
  TableStateTypes,
  TdObjTypes,
} from "#/data/types/components";
import useLoadingState from "#/library/recoil/hook/useLoadingState";
import api from "#/library/axios/api";
import { useRecoilState } from "recoil";
import { loadingState } from "#/library/recoil/atoms/loadingState";
import addComma from "#/utils/useNumComma";
import { useNavigate } from "react-router-dom";
import { map } from "lodash";

function index() {
  const [reportData, setReportData] = useState<TableStateTypes>();

  const { setLoading } = useLoadingState();
  const [perPage, setPerPage] = useState({
    page: 1,
    perPage: 20,
    pageLength: 1,
  });

  const params = new URLSearchParams(location.search);

  const fromUserDetailSearchIdTypeReporter = params.get(
    "fromUserDetailSearchIdTypeReporter"
  );
  const fromUserDetailSearchIdTypeWriter = params.get(
    "fromUserDetailSearchIdTypeWriter"
  );

  const [search, setSearch] = useState({
    word: "",
    startDate: "",
    endDate: "",
    reportStatus: "",
    searchType:
      fromUserDetailSearchIdTypeWriter === null &&
      fromUserDetailSearchIdTypeReporter === null
        ? ""
        : fromUserDetailSearchIdTypeWriter !== null
        ? "writer"
        : "reporter",
    searchWriter: fromUserDetailSearchIdTypeWriter || "",
    searchReporter: fromUserDetailSearchIdTypeReporter || "",
  });

  const [modalPerPage, setModalPerPage] = useState({
    page: 1,
    perPage: 20,
    pageLength: 1,
  });

  const addedMap = [
    ["createdAt", "신고일시"],
    ["id", "신고건 ID"],

    ["userName", "이름(신고자)"],
    ["reportType", "분류"],
    ["boardId", "게시글 ID"],
    ["boardCommentId", "댓글 ID"],

    ["reportedUserName", "이름(작성자)"],
    ["content", "내용"],
    ["reportStatus", "처리상태"],
    ["reportNum", "누적 신고 수"],
  ];

  const [reportDetail, setReprotDetail] = useState<ReportDetailTypes>({
    type: "board",
    targetId: "",
    reports: [{}],
    board: {},
    comment: {},
  });

  const [reportDetailLatestStatus, setReportDetailLatestStatus] = useState("");

  const submitSearchReport = (isSubmit: boolean) => {
    // setLoading(true);
    // api
    //   .get(`/admin/report`, {
    //     params: {
    //       page: isSubmit ? 1 : perPage.page,
    //       pageSize: perPage.perPage,
    //       searchWord: search.word,
    //       reportStatus: search.reportStatus,
    //       searchWriter: search.searchWriter,
    //       searchReporter: search.searchReporter,
    //       searchStartDate: search.startDate,
    //       searchEndDate: search.endDate,
    //     },
    //   })
    //   .then((result) => {
    //     const { totalCount } = result.data;

    //     setReportData(result.data);
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
      totalCount: 12,
      reports: [
        {
          id: 29,
          createdAt: "2024-09-13 08:52:03",
          userId: 18,
          userName: "aㅁㄷㄱㄱㄷ",
          reportStatus: "Resolved",
          reportType: "Comment",
          content: null,
          comment: null,
          boardId: 100,
          boardCommentId: 158,
          reportedUserId: 18,
          reportedUserName: "aㅁㄷㄱㄱㄷ",
          replyBoardCommentId: null,
          reportNum: 0,
        },
        {
          id: 28,
          createdAt: "2024-09-13 08:51:33",
          userId: 18,
          userName: "aㅁㄷㄱㄱㄷ",
          reportStatus: "Hold",
          reportType: "Comment",
          content: null,
          comment: "ㅠㅍㅠㅍ. ㅣㅏㅓㅜ\n",
          boardId: 100,
          boardCommentId: 161,
          reportedUserId: 18,
          reportedUserName: "aㅁㄷㄱㄱㄷ",
          replyBoardCommentId: null,
          reportNum: 0,
        },
        {
          id: 26,
          createdAt: "2024-09-12 19:21:06",
          userId: 29,
          userName: "aadf",
          reportStatus: "Pending",
          reportType: "Board",
          content: null,
          comment: null,
          boardId: 100,
          boardCommentId: null,
          reportedUserId: 18,
          reportedUserName: "aㅁㄷㄱㄱㄷ",
          replyBoardCommentId: null,
          reportNum: 4,
        },
        {
          id: 25,
          createdAt: "2024-08-29 11:30:26",
          userId: 28,
          userName: "ㅁㄷㄱㅎ",
          reportStatus: "Resolved",
          reportType: "Board",
          content: null,
          comment: null,
          boardId: 74,
          boardCommentId: null,
          reportedUserId: 18,
          reportedUserName: "aㅁㄷㄱㄱㄷ",
          replyBoardCommentId: null,
          reportNum: 4,
        },
        {
          id: 24,
          createdAt: "2024-08-28 15:53:59",
          userId: 28,
          userName: "ㅁㄷㄱㅎ",
          reportStatus: "Hold",
          reportType: "Comment",
          content: null,
          comment: "내꺼다 수정완",
          boardId: 74,
          boardCommentId: 86,
          reportedUserId: 18,
          reportedUserName: "aㅁㄷㄱㄱㄷ",
          replyBoardCommentId: null,
          reportNum: 0,
        },
        {
          id: 22,
          createdAt: "2024-08-28 15:50:59",
          userId: 28,
          userName: "ㅁㄷㄱㅎ",
          reportStatus: "Hold",
          reportType: "Board",
          content: "123123",
          comment: null,
          boardId: 75,
          boardCommentId: null,
          reportedUserId: 28,
          reportedUserName: "ㅁㄷㄱㅎ",
          replyBoardCommentId: null,
          reportNum: 1,
        },
        {
          id: 20,
          createdAt: "2024-08-22 10:17:28",
          userId: 18,
          userName: "aㅁㄷㄱㄱㄷ",
          reportStatus: "Hold",
          reportType: "Comment",
          content: "g",
          comment: "Dddddddddwdwdwdw",
          boardId: 68,
          boardCommentId: 81,
          reportedUserId: 29,
          reportedUserName: "aadf",
          replyBoardCommentId: null,
          reportNum: 0,
        },
        {
          id: 17,
          createdAt: "2024-08-22 10:15:33",
          userId: 18,
          userName: "aㅁㄷㄱㄱㄷ",
          reportStatus: "Pending",
          reportType: "Board",
          content: "g",
          comment: null,
          boardId: 68,
          boardCommentId: null,
          reportedUserId: 29,
          reportedUserName: "aadf",
          replyBoardCommentId: null,
          reportNum: 10,
        },
        {
          id: 10,
          createdAt: "2024-08-21 13:06:46",
          userId: 28,
          userName: "ㅁㄷㄱㅎ",
          reportStatus: "Pending",
          reportType: "Board",
          content: "ㅋㅋㅋㅋㅋ",
          comment: null,
          boardId: 30,
          boardCommentId: null,
          reportedUserId: 29,
          reportedUserName: "aadf",
          replyBoardCommentId: null,
          reportNum: 2,
        },
        {
          id: 8,
          createdAt: "2024-08-21 13:01:41",
          userId: 28,
          userName: "ㅁㄷㄱㅎ",
          reportStatus: "Pending",
          reportType: "Board",
          content: "햄버거는 맛있는데 햄버거는 어쩌고",
          comment: null,
          boardId: 2,
          boardCommentId: null,
          reportedUserId: 18,
          reportedUserName: "aㅁㄷㄱㄱㄷ",
          replyBoardCommentId: null,
          reportNum: 1,
        },
        {
          id: 7,
          createdAt: "2024-08-21 12:57:08",
          userId: 28,
          userName: "ㅁㄷㄱㅎ",
          reportStatus: "Pending",
          reportType: "Board",
          content: "ㅂㅂㅂㅂㅂㅂㅂ",
          comment: null,
          boardId: 28,
          boardCommentId: null,
          reportedUserId: 29,
          reportedUserName: "aadf",
          replyBoardCommentId: null,
          reportNum: 1,
        },
        {
          id: 6,
          createdAt: "2024-08-21 09:02:41",
          userId: 18,
          userName: "aㅁㄷㄱㄱㄷ",
          reportStatus: "Pending",
          reportType: "Board",
          content: "ㅌㅅㅜㅡㅌㅜㅈㅑ",
          comment: null,
          boardId: 21,
          boardCommentId: null,
          reportedUserId: 28,
          reportedUserName: "ㅁㄷㄱㅎ",
          replyBoardCommentId: null,
          reportNum: 6,
        },
      ],
    };

    const { totalCount } = dummyResult;

    setReportData(dummyResult);
    setPerPage((prev) => {
      return {
        ...prev,
        pageLength: Math.ceil(totalCount / prev.perPage),
      };
    });
  };
  const route = useNavigate();

  const boardSelectRef = useRef<HTMLSelectElement | null>(null);

  const commentSelectRef = useRef<HTMLSelectElement[] | null[]>([null]);

  const submitPutReport = (id: string, value: string, type: string) => {
    const boardObj = {
      boardId: Number(id),
      reportStatus: value,
    };
    const commentObj = {
      boardCommentId: Number(id),
      reportStatus: value,
    };

    api
      .put(
        `admin/report/board`,
        type === "board" ? { ...boardObj } : { ...commentObj },
        {}
      )
      .then((result) => {
        console.log(result, "put report success");
        submitSearchReport(false);

        closeModal(type === "board" ? "report-board" : "report-comment");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    submitSearchReport(false);
  }, [perPage.perPage, perPage.page]);

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
          reset: () => {
            setSearch({
              word: "",
              startDate: "",
              endDate: "",
              reportStatus: "",
              searchWriter: "",
              searchReporter: "",
              searchType: "",
            });

            window.location.replace("/cs/report");
          },
          submit: () => {
            submitSearchReport(true);
            setPerPage((prev) => {
              return { ...prev, page: 1 };
            });
          },
        }}
        additionalArea={
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center w-full gap-4 ">
              <div className="mr-4 text-xl font-bold min-w-24 max-xl:text-sm">
                처리상태
              </div>
              <div className="flex flex-wrap flex-auto gap-4">
                <label className="flex gap-2 cursor-pointer label">
                  <input
                    type="radio"
                    name="radio-answer"
                    className="radio radio-primary max-xl:radio-sm"
                    checked={search.reportStatus === ""}
                    onChange={() =>
                      setSearch((prev) => {
                        return { ...prev, reportStatus: "" };
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
                    checked={search.reportStatus === "Pending"}
                    onChange={() =>
                      setSearch((prev) => {
                        return { ...prev, reportStatus: "Pending" };
                      })
                    }
                  />
                  <span className="label-text">미처리</span>
                </label>
                <label className="flex gap-2 cursor-pointer label">
                  <input
                    type="radio"
                    name="radio-answer"
                    className="radio radio-primary max-xl:radio-sm"
                    checked={search.reportStatus === "Hold"}
                    onChange={() =>
                      setSearch((prev) => {
                        return { ...prev, reportStatus: "Hold" };
                      })
                    }
                  />
                  <span className="label-text">보류</span>
                </label>
                <label className="flex gap-2 cursor-pointer label">
                  <input
                    type="radio"
                    name="radio-answer"
                    className="radio radio-primary max-xl:radio-sm"
                    checked={search.reportStatus === "Resolved"}
                    onChange={() =>
                      setSearch((prev) => {
                        return { ...prev, reportStatus: "Resolved" };
                      })
                    }
                  />
                  <span className="label-text">삭제됨</span>
                </label>
              </div>
              <div className="flex flex-wrap items-center gap-4 ml-auto">
                <div className="mr-4 text-xl font-bold max-xl:text-sm">
                  사용자
                </div>
                <select
                  className="rounded-none select-bordered select select-sm max-xl:select-xs"
                  onChange={(e) =>
                    setSearch((prev) => {
                      return {
                        ...prev,
                        searchType: e.target.value,
                        searchReporter: "",
                        searchWriter: "",
                      };
                    })
                  }
                  value={search.searchType || ""}
                >
                  <option value="">전체</option>
                  <option value="reporter">신고자</option>

                  <option value="writer">작성자</option>
                </select>
                <input
                  disabled={search.searchType === ""}
                  placeholder="검색어를 입력해주세요."
                  className="rounded-none input input-bordered input-sm max-xl:input-xs"
                  value={
                    (search.searchType === "reporter"
                      ? search.searchReporter
                      : search.searchWriter) || ""
                  }
                  onChange={
                    search.searchType === "reporter"
                      ? (e) => {
                          setSearch((prev) => {
                            return { ...prev, searchReporter: e.target.value };
                          });
                        }
                      : (e) => {
                          setSearch((prev) => {
                            return { ...prev, searchWriter: e.target.value };
                          });
                        }
                  }
                />
              </div>
            </div>
          </div>
        }
      />
      <Table
        tableTitle={`조회 ${reportData?.totalCount || "0"} 건`}
        data={reportData?.reports || []}
        addedMap={addedMap}
        tdOptions={{
          boardCommentId: {
            el: (item: string) => {
              return <span>{item === null ? "-" : item}</span>;
            },
          },
        }}
        trOptions={{
          tbody: {
            className: () => "hover:bg-gray-300",

            dbClickFunc: (item: TdObjTypes) => {
              if (item.reportType === "Board") {
                // api
                //   .get(`/admin/report/board/${item.boardId}`)
                //   .then((result) => {
                //     setReprotDetail((prev) => {
                //       return {
                //         ...prev,
                //         type: "board",
                //         targetId: String(item.boardId),
                //         board: result.data.board,
                //         reports: result.data.reports,
                //       };
                //     });
                //     setReportDetailLatestStatus(
                //       result.data.reports[0].reportStatus
                //     );
                //   });

                const dummyResult: any = {
                  reports: [
                    {
                      id: 20,
                      userId: 18,
                      userName: "aㅁㄷㄱㄱㄷ",
                      reason: "욕설 및 비방",
                      createdAt: "2024-08-22 10:17:28",
                      reportType: "Comment",
                      reportStatus: "Hold",
                    },
                    {
                      id: 19,
                      userId: 18,
                      userName: "aㅁㄷㄱㄱㄷ",
                      reason: "광고, 스팸성",
                      createdAt: "2024-08-22 10:16:30",
                      reportType: "Comment",
                      reportStatus: "Hold",
                    },
                    {
                      id: 18,
                      userId: 18,
                      userName: "aㅁㄷㄱㄱㄷ",
                      reason: "중복, 도배",
                      createdAt: "2024-08-22 10:16:19",
                      reportType: "Comment",
                      reportStatus: "Hold",
                    },
                    {
                      id: 17,
                      userId: 18,
                      userName: "aㅁㄷㄱㄱㄷ",
                      reason: "광고, 스팸성",
                      createdAt: "2024-08-22 10:15:33",
                      reportType: "Board",
                      reportStatus: "Pending",
                    },
                    {
                      id: 16,
                      userId: 18,
                      userName: "aㅁㄷㄱㄱㄷ",
                      reason: "광고, 스팸성",
                      createdAt: "2024-08-22 10:15:27",
                      reportType: "Board",
                      reportStatus: "Pending",
                    },
                    {
                      id: 15,
                      userId: 18,
                      userName: "aㅁㄷㄱㄱㄷ",
                      reason: "중복, 도배",
                      createdAt: "2024-08-22 10:13:14",
                      reportType: "Board",
                      reportStatus: "Pending",
                    },
                    {
                      id: 14,
                      userId: 18,
                      userName: "aㅁㄷㄱㄱㄷ",
                      reason: "욕설 및 비방",
                      createdAt: "2024-08-22 10:13:05",
                      reportType: "Board",
                      reportStatus: "Pending",
                    },
                    {
                      id: 13,
                      userId: 18,
                      userName: "aㅁㄷㄱㄱㄷ",
                      reason: "욕설 및 비방",
                      createdAt: "2024-08-22 10:12:56",
                      reportType: "Board",
                      reportStatus: "Pending",
                    },
                    {
                      id: 12,
                      userId: 18,
                      userName: "aㅁㄷㄱㄱㄷ",
                      reason: "욕설 및 비방",
                      createdAt: "2024-08-22 10:09:37",
                      reportType: "Board",
                      reportStatus: "Pending",
                    },
                    {
                      id: 11,
                      userId: 18,
                      userName: "aㅁㄷㄱㄱㄷ",
                      reason: "욕설 및 비방",
                      createdAt: "2024-08-22 10:05:53",
                      reportType: "Board",
                      reportStatus: "Pending",
                    },
                  ],
                  board: {
                    id: 68,
                    userName: "aadf",
                    userId: 29,
                    createdAt: "2024-08-21 20:54:48",
                    updatedAt: "2024-09-19 10:43:50",
                    category: "일상",
                    title: "r",
                    content: "g",
                    images: null,
                    views: 32,
                    like: 0,
                  },
                };

                setReprotDetail((prev) => {
                  return {
                    ...prev,
                    type: "board",
                    targetId: String(item.boardId),
                    board: dummyResult.board,
                    reports: dummyResult.reports,
                  };
                });
                setReportDetailLatestStatus(
                  dummyResult.reports[0].reportStatus
                );
                openModal("report-board");
              } else {
                const targetId = reportData?.reports.filter(
                  (filterItem: TdObjTypes) => filterItem.id === item.id
                )[0].boardCommentId;

                // api.get(`/admin/report/comment/${targetId}`).then((result) => {
                //   setReprotDetail((prev) => {
                //     return {
                //       ...prev,
                //       type: "comment",
                //       targetId: String(targetId),
                //       comment: result?.data?.comment,
                //       reports: result?.data?.reports,
                //     };
                //   });
                //   setReportDetailLatestStatus(
                //     result.data.reports[0].reportStatus
                //   );
                // });

                const dummyResult: any = {
                  reports: [
                    {
                      id: 20,
                      userId: 18,
                      userName: "aㅁㄷㄱㄱㄷ",
                      reason: "욕설 및 비방",
                      createdAt: "2024-08-22 10:17:28",
                      reportType: "Comment",
                      reportStatus: "Hold",
                    },
                    {
                      id: 19,
                      userId: 18,
                      userName: "aㅁㄷㄱㄱㄷ",
                      reason: "광고, 스팸성",
                      createdAt: "2024-08-22 10:16:30",
                      reportType: "Comment",
                      reportStatus: "Hold",
                    },
                    {
                      id: 18,
                      userId: 18,
                      userName: "aㅁㄷㄱㄱㄷ",
                      reason: "중복, 도배",
                      createdAt: "2024-08-22 10:16:19",
                      reportType: "Comment",
                      reportStatus: "Hold",
                    },
                  ],
                  comment: {
                    id: 81,
                    commentType: "Community",
                    userName: "ㅁㄷㄱㅎ",
                    userId: 28,
                    comment: "Dddddddddwdwdwdw",
                    like: 0,
                    createdAt: "2024-08-22 06:34:03",
                    updatedAt: "2024-08-22 06:34:03",
                    category: "일상",
                    boardId: 68,
                    reportNum: 3,
                    subComments: [
                      {
                        id: 102,
                        commentType: "Community",
                        userName: "aㅁㄷㄱㄱㄷ",
                        userId: 18,
                        comment: "테스트",
                        like: 0,
                        createdAt: "2024-09-03 10:29:02",
                        updatedAt: "2024-09-03 10:29:02",
                        category: "일상",
                        boardId: 68,
                        reportNum: 3,
                      },
                    ],
                  },
                };

                setReprotDetail((prev) => {
                  return {
                    ...prev,
                    type: "comment",
                    targetId: String(targetId),
                    comment: dummyResult?.comment,
                    reports: dummyResult?.reports,
                  };
                });
                setReportDetailLatestStatus(
                  dummyResult.reports[0].reportStatus
                );
                openModal("report-comment");
              }
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

      <Modal id="report-board" className="h-full">
        <div className="flex flex-wrap gap-4 max-2xl:gap-10">
          <div className="flex flex-col flex-auto gap-4">
            <div className="text-2xl font-bold max-lg:text-lg">신고글 상세</div>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 px-2 py-1 my-1 text-lg text-white bg-primary">
                신고내역
              </div>
              <div className="h-full col-span-2 pb-16">
                <Table
                  divider={false}
                  data={reportDetail?.reports || []}
                  addedMap={[
                    ["userId", "UID"],
                    ["userName", "이름"],
                    ["reason", "신고사유"],
                    ["createdAt", "신고일시"],
                  ]}
                  tdOptions={{
                    userId: {
                      el: (item: string) => {
                        return (
                          <span
                            className="text-blue-500 underline cursor-pointer"
                            onClick={() => route(`/user/detail?id=${item}`)}
                          >
                            {item}
                          </span>
                        );
                      },
                    },
                  }}
                  perPageOptions={{
                    page: modalPerPage.page,
                    perPage: modalPerPage.perPage,
                    pageLength: modalPerPage.pageLength,
                    setPerPage: setModalPerPage,
                  }}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="col-span-2 px-2 py-1 my-1 text-lg text-white bg-primary">
                작성자 정보
              </div>
              <div className="flex flex-wrap gap-10 max-lg:gap-4">
                <div className="">
                  <div className="flex flex-col flex-wrap gap-4">
                    <div className="flex flex-wrap gap-4">
                      <div className=" min-w-16 max-lg:text-sm">작성일시</div>
                      <div className="font-bold whitespace-nowrap max-lg:text-sm">
                        {reportDetail?.board?.createdAt || ""}
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className=" min-w-16 whitespace-nowrap max-lg:text-sm">
                        UID
                      </div>
                      <div
                        className="font-bold text-blue-500 underline whitespace-nowrap max-lg:text-sm"
                        onClick={() =>
                          route(
                            `/user/detail?id=${reportDetail?.board?.userId}`
                          )
                        }
                      >
                        {reportDetail?.board?.userId || ""}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="">
                  <div className="flex flex-col flex-wrap gap-4">
                    <div className="flex gap-4">
                      <div className=" min-w-16 whitespace-nowrap max-lg:text-sm">
                        수정일시
                      </div>
                      <div className="font-bold whitespace-nowrap max-lg:text-sm">
                        {reportDetail?.board?.updatedAt || ""}
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className=" min-w-16 whitespace-nowrap max-lg:text-sm">
                        이름
                      </div>
                      <div className="font-bold whitespace-nowrap max-lg:text-sm">
                        {reportDetail?.board?.userName || ""}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex justify-end col-span-2 gap-4">
                <div>
                  조회수 {addComma(String(reportDetail?.board?.views || 0))}
                </div>
                <div>
                  좋아요 {addComma(String(reportDetail?.board?.like || 0))}
                </div>
              </div>
              <div className="col-span-2 px-2 py-1 my-1 text-lg text-white bg-primary">
                게시글
              </div>

              <div className="grid col-span-2 gap-2">
                <div className="grid items-center grid-cols-3 col-span-2 gap-2">
                  <span className="col-span-1">카테고리</span>
                  <input
                    type="text"
                    className="col-span-2 rounded-none grow bg-base-100 input input-bordered input-sm max-sm:input-xs"
                    value={reportDetail?.board?.category || ""}
                    disabled
                  />
                </div>
                <div className="grid items-center grid-cols-3 col-span-2 gap-2">
                  <span className="col-span-1">제목</span>
                  <input
                    type="text"
                    className={`${
                      reportDetail?.board?.title === null ? "line-through" : ""
                    }  col-span-2 rounded-none grow bg-base-100 input input-bordered input-sm max-sm:input-xs`}
                    value={
                      reportDetail?.board?.title === null
                        ? "삭제된 게시글"
                        : reportDetail?.board?.title || ""
                    }
                    disabled
                  />
                </div>
                <div className="grid items-start grid-cols-3 col-span-2 gap-2">
                  <span className="col-span-1">내용</span>

                  <textarea
                    className={`${
                      reportDetail?.board?.content === null
                        ? "line-through"
                        : ""
                    }  col-span-2 rounded-none resize-none min-h-60 textarea textarea-bordered pl-[0.75rem] pr-[0.75rem]`}
                    value={
                      reportDetail?.board?.content === null
                        ? "삭제된 게시글"
                        : reportDetail?.board?.content || ""
                    }
                    disabled
                  ></textarea>
                </div>
                <div className="grid items-start grid-cols-3 col-span-2 gap-2">
                  <span className="col-span-1">첨부 이미지</span>

                  <div className="flex col-span-2 gap-2 overflow-x-auto">
                    {Array.isArray(reportDetail?.board?.images) &&
                      map(
                        reportDetail?.board?.images,
                        (url: string, index: number) => {
                          return (
                            <img
                              key={`${url}-${index}`}
                              className="w-1/4"
                              src={url}
                              onClick={() =>
                                openModal("post-detail-image-modal")
                              }
                            />
                          );
                        }
                      )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end w-full gap-6">
            <div className="flex items-center gap-2">
              <div>처리상태</div>
              <select
                className="rounded-none select select-bordered select-sm"
                value={reportDetailLatestStatus}
                onChange={(e) => {
                  setReportDetailLatestStatus(e.target.value);
                }}
                ref={boardSelectRef}
              >
                <option value="Pending">대기</option>
                <option value="Hold">보류</option>
                <option value="Resolved">삭제</option>
              </select>
            </div>

            <button
              className="rounded-none btn btn-primary btn-sm"
              onClick={() => {
                // submitPutReport(
                //   reportDetail?.targetId || "",
                //   boardSelectRef.current?.value || "",
                //   "board"
                // );
              }}
            >
              저장
            </button>
          </div>
        </div>
      </Modal>
      <Modal id="report-comment" className="h-full">
        <div className="flex flex-wrap gap-4 max-2xl:gap-10">
          <div className="flex flex-col flex-auto gap-4">
            <div className="text-2xl font-bold max-lg:text-lg">
              신고댓글 상세
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 px-2 py-1 my-1 text-lg text-white bg-primary">
                신고내역
              </div>
              <div className="h-full col-span-2 pb-16">
                <Table
                  divider={false}
                  data={reportDetail?.reports || []}
                  addedMap={[
                    ["userId", "UID"],
                    ["userName", "이름"],
                    ["reason", "신고사유"],
                    ["createdAt", "신고일시"],
                  ]}
                  tdOptions={{
                    userId: {
                      el: (item: string) => {
                        return (
                          <span
                            className="text-blue-500 underline cursor-pointer"
                            onClick={() => route(`/user/detail?id=${item}`)}
                          >
                            {item}
                          </span>
                        );
                      },
                    },
                  }}
                  perPageOptions={{
                    page: modalPerPage.page,
                    perPage: modalPerPage.perPage,
                    pageLength: modalPerPage.pageLength,
                    setPerPage: setModalPerPage,
                  }}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="col-span-2 px-2 py-1 my-1 text-lg text-white bg-primary">
                작성자 정보
              </div>
              <div className="flex flex-wrap gap-10 max-lg:gap-4">
                <div className="">
                  <div className="flex flex-col flex-wrap gap-4">
                    <div className="flex flex-wrap gap-4">
                      <div className=" min-w-16 max-lg:text-sm">작성일시</div>
                      <div className="font-bold whitespace-nowrap max-lg:text-sm">
                        {(reportDetail?.comment?.createdAt as String) || ""}
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className=" min-w-16 whitespace-nowrap max-lg:text-sm">
                        UID
                      </div>
                      <div
                        className="font-bold text-blue-500 underline whitespace-nowrap max-lg:text-sm"
                        onClick={() =>
                          route(
                            `/user/detail?id=${reportDetail?.comment?.userId}`
                          )
                        }
                      >
                        {(reportDetail?.comment?.userId as String) || ""}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="">
                  <div className="flex flex-col flex-wrap gap-4">
                    <div className="flex gap-4">
                      <div className=" min-w-16 whitespace-nowrap max-lg:text-sm">
                        수정일시
                      </div>
                      <div className="font-bold whitespace-nowrap max-lg:text-sm">
                        {(reportDetail?.comment?.updatedAt as String) || ""}
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className=" min-w-16 whitespace-nowrap max-lg:text-sm">
                        이름
                      </div>
                      <div className="font-bold whitespace-nowrap max-lg:text-sm">
                        {(reportDetail?.comment?.userName as String) || ""}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid grid-cols-2 col-span-2 gap-4">
                <div className="grid grid-cols-2 col-span-2 gap-4">
                  <div className="col-span-2 px-2 py-1 my-1 text-lg text-white bg-primary">
                    댓글
                  </div>

                  <div className="grid grid-cols-3 col-span-2 gap-2 max-lg:grid-cols-1">
                    <div className="grid items-center grid-cols-3 col-span-1 gap-2">
                      <span className="col-span-1">구분</span>
                      <div className="font-bold whitespace-nowrap max-lg:text-sm">
                        {(reportDetail?.comment?.commentType as String) || ""}
                      </div>
                    </div>
                    <div className="grid items-center grid-cols-3 col-span-1 gap-2">
                      <span className="col-span-1">카테고리</span>
                      <div className="font-bold whitespace-nowrap max-lg:text-sm">
                        {(reportDetail?.comment?.category as String) || ""}
                      </div>
                    </div>
                    <div className="grid items-center grid-cols-3 col-span-1 gap-2">
                      <span className="col-span-1">본문No.</span>
                      <div className="inline-flex font-bold text-blue-500 underline whitespace-nowrap max-lg:text-sm">
                        <span
                          className="cursor-pointer"
                          onClick={() =>
                            route(
                              `/community/board/detail?id=${reportDetail?.comment?.boardId}`
                            )
                          }
                        >
                          {" "}
                          {(reportDetail?.comment?.boardId as String) || ""}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <ul className="flex flex-col col-span-2">
                  <li>
                    <div
                      className={`${
                        reportDetail.targetId ===
                        String(reportDetail?.comment?.id)
                          ? "bg-base-300"
                          : ""
                      } flex flex-wrap items-center justify-between gap-4 px-6 py-4 border-b border-primary`}
                    >
                      <div className="flex flex-col gap-2 ">
                        <div className="flex flex-wrap items-baseline gap-2">
                          <div className="text-xl font-bold max-sm:text-xs">
                            {(reportDetail?.comment?.userName as String) || ""}
                          </div>
                          <div className="max-sm:text-xs">
                            UID{" "}
                            <span className="underline">
                              {" "}
                              {(reportDetail?.comment?.userId as String) || ""}
                            </span>
                          </div>
                          <div className="max-sm:text-xs">
                            작성{" "}
                            {(reportDetail?.comment?.createdAt as String) || ""}
                          </div>
                        </div>
                        <div
                          className={`max-sm:text-xs ${
                            reportDetail?.comment?.comment === null
                              ? "line-through"
                              : ""
                          }`}
                        >
                          {reportDetail?.comment?.comment === null
                            ? "삭제된 코멘트"
                            : (reportDetail?.comment?.comment as String) || ""}
                        </div>
                        <div className="flex gap-2">
                          <div className="max-sm:text-xs">
                            좋아요{" "}
                            {String(
                              addComma(Number(reportDetail?.comment?.like))
                            ) || ""}
                          </div>
                          <div className=" text-error max-sm:text-xs">
                            신고{" "}
                            {String(
                              addComma(Number(reportDetail?.comment?.reportNum))
                            ) || ""}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-end w-full gap-6">
                        <div className="flex items-center gap-2">
                          <div>처리상태</div>
                          <select
                            className="rounded-none select select-bordered select-sm"
                            value={reportDetailLatestStatus}
                            onChange={(e) => {
                              setReportDetailLatestStatus(e.target.value);
                            }}
                          >
                            <option value="Pending">대기</option>
                            <option value="Hold">보류</option>
                            <option value="Resolved">삭제</option>
                          </select>
                        </div>

                        <button
                          className="rounded-none btn btn-primary btn-sm"
                          onClick={() => {
                            // submitPutReport(
                            //   String(reportDetail?.comment?.id) || "",
                            //   reportDetailLatestStatus,
                            //   "comment"
                            // );
                          }}
                        >
                          저장
                        </button>
                      </div>
                    </div>

                    <ul className="flex flex-col col-span-2">
                      {Array.isArray(reportDetail?.comment?.subComments) &&
                        map(
                          reportDetail?.comment?.subComments as [{}],
                          (
                            subComment: { [key: string]: string },
                            index: number
                          ) => {
                            return (
                              <li
                                className="ml-16"
                                key={`${subComment.id}-${index}`}
                              >
                                <div
                                  className={`
                                ${
                                  reportDetail.targetId ===
                                  String(subComment?.id)
                                    ? "bg-base-300"
                                    : ""
                                }
                                
                                flex flex-wrap items-center justify-between gap-4 px-6 py-4 border-b border-primary`}
                                >
                                  <div className="flex flex-col gap-2 ">
                                    <div className="flex flex-wrap items-baseline gap-2">
                                      <div className="text-xl font-bold max-sm:text-xs">
                                        {subComment.userName || ""}
                                      </div>
                                      <div className="max-sm:text-xs">
                                        UID{" "}
                                        <span className="underline">
                                          {subComment.uesrId || ""}
                                        </span>
                                      </div>
                                      <div className="max-sm:text-xs">
                                        작성 {subComment.createdAt || ""}
                                      </div>
                                    </div>

                                    <div
                                      className={`max-sm:text-xs ${
                                        subComment?.comment === null
                                          ? "line-through"
                                          : ""
                                      }`}
                                    >
                                      {subComment.comment === null
                                        ? "삭제된 코멘트"
                                        : subComment.comment || ""}
                                    </div>
                                    <div className="flex gap-2">
                                      <div className="max-sm:text-xs">
                                        좋아요{" "}
                                        {String(
                                          addComma(Number(subComment?.like))
                                        ) || ""}
                                      </div>
                                      <div
                                        className=" text-error max-sm:text-xs"
                                        // onClick={() => openModal("report")}
                                      >
                                        신고{" "}
                                        {String(
                                          addComma(
                                            Number(subComment?.reportNum)
                                          )
                                        ) || ""}
                                      </div>
                                    </div>
                                  </div>

                                  {reportDetail.targetId ===
                                    String(subComment?.id) && (
                                    <div className="flex items-center justify-end w-full gap-6">
                                      <div className="flex items-center gap-2">
                                        <div>처리상태</div>
                                        <select
                                          className="rounded-none select select-bordered select-sm"
                                          value={reportDetailLatestStatus}
                                          onChange={(e) => {
                                            setReportDetailLatestStatus(
                                              e.target.value
                                            );
                                          }}
                                        >
                                          <option value="Pending">대기</option>
                                          <option value="Hold">보류</option>
                                          <option value="Resolved">삭제</option>
                                        </select>
                                      </div>

                                      <button
                                        className="rounded-none btn btn-primary btn-sm"
                                        onClick={() => {
                                          // submitPutReport(
                                          //   String(subComment?.id) || "",
                                          //   reportDetailLatestStatus,
                                          //   "comment"
                                          // );
                                        }}
                                      >
                                        저장
                                      </button>
                                    </div>
                                  )}
                                </div>
                              </li>
                            );
                          }
                        )}
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default index;
