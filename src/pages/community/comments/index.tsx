import { useEffect, useState } from "react";
import Table from "#/components/Table";
import TableExtensionHeader from "#/components/TableExtensionHeader";
import { useNavigate } from "react-router-dom";
import { TableStateTypes, TdObjTypes } from "#/data/types/components";
import { useRecoilState } from "recoil";
import { loadingState } from "#/library/recoil/atoms/loadingState";
import useLoadingState from "#/library/recoil/hook/useLoadingState";
import api from "#/library/axios/api";

function index() {
  const [commentData, setCommentData] = useState<TableStateTypes>();
  const { setLoading } = useLoadingState();

  const params = new URLSearchParams(location.search);
  const fromUserDetailSearchId = params.get("fromUserDetailSearchId");
  const [search, setSearch] = useState({
    word: "",
    startDate: "",
    endDate: "",
    commentType: "Community",
  });
  const [perPage, setPerPage] = useState({
    page: 1,
    perPage: 20,
    pageLength: 1,
  });

  const addedMap = [
    ["id", "댓글 ID"],
    ["boardId", "게시글 ID"],
    ["userId", "UID"],
    ["userName", "이름"],
    ["commentType", "구분"],
    ["comment", "댓글 내용"],
    ["like", "좋아요"],
    ["reportNum", "신고"],
    ["createdAt", "작성일시"],
    ["updatedAt", "수정일시"],
  ];
  const mindfulnessAddedMap = [
    ["id", "댓글 ID"],
    ["mindfulnessCommentId", "명상 ID"],
    ["userId", "UID"],
    ["userName", "이름"],
    ["comment", "댓글 내용"],
    ["like", "좋아요"],
    ["reportNum", "신고"],
    ["createdAt", "작성일시"],
    ["updatedAt", "수정일시"],
  ];

  const route = useNavigate();

  const sumbitSearchComments = (isSubmit: boolean) => {
    // setLoading(true);
    // api
    //   .get(`/admin/community/comment`, {
    //     params: {
    //       page: perPage.page,
    //       pageSize: perPage.perPage,
    //       searchWord: fromUserDetailSearchId || search.word,
    //       commentType: search.commentType,
    //       searchStartDate: search.startDate,
    //       searchEndDate: search.endDate,
    //     },
    //   })
    //   .then((result) => {
    //     const { totalCount } = result.data;
    //     setCommentData(result.data);
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
      totalCount: 243,
      comments: [
        {
          id: 291,
          commentType: "Community",
          userName: "이형래",
          userId: 50,
          boardId: 117,
          createdAt: "2024-12-18 12:44:08",
          updatedAt: "2024-12-18 12:44:08",
          comment: "ㅊㅎ초",
          like: 0,
          isDeleted: false,
          reportNum: 0,
        },
        {
          id: 290,
          commentType: "Community",
          userName: "이형래",
          userId: 50,
          boardId: 117,
          createdAt: "2024-12-18 12:43:27",
          updatedAt: "2024-12-18 12:43:27",
          comment: "오유투터",
          like: 0,
          isDeleted: false,
          reportNum: 0,
        },
        {
          id: 289,
          commentType: "Community",
          userName: "정주",
          userId: 57,
          boardId: 117,
          createdAt: "2024-12-10 12:14:03",
          updatedAt: "2024-12-10 12:14:03",
          comment: "2-3",
          like: 0,
          isDeleted: false,
          reportNum: 0,
        },
        {
          id: 288,
          commentType: "Community",
          userName: "정주",
          userId: 57,
          boardId: 117,
          createdAt: "2024-12-10 12:13:58",
          updatedAt: "2024-12-10 12:13:58",
          comment: "2-2",
          like: 0,
          isDeleted: false,
          reportNum: 0,
        },
        {
          id: 287,
          commentType: "Community",
          userName: "정주",
          userId: 57,
          boardId: 117,
          createdAt: "2024-12-10 12:13:46",
          updatedAt: "2024-12-10 12:13:46",
          comment: "2-1",
          like: 0,
          isDeleted: false,
          reportNum: 0,
        },
        {
          id: 286,
          commentType: "Community",
          userName: "정주",
          userId: 57,
          boardId: 117,
          createdAt: "2024-12-10 12:13:40",
          updatedAt: "2024-12-10 12:13:40",
          comment: "세번째",
          like: 0,
          isDeleted: false,
          reportNum: 0,
        },
        {
          id: 285,
          commentType: "Community",
          userName: "정주",
          userId: 57,
          boardId: 117,
          createdAt: "2024-12-10 12:13:36",
          updatedAt: "2024-12-10 12:13:36",
          comment: "두번째",
          like: 0,
          isDeleted: false,
          reportNum: 0,
        },
        {
          id: 284,
          commentType: "Community",
          userName: "정주",
          userId: 57,
          boardId: 117,
          createdAt: "2024-12-10 12:13:33",
          updatedAt: "2024-12-10 12:13:33",
          comment: "첫번째",
          like: 0,
          isDeleted: false,
          reportNum: 0,
        },
        {
          id: 283,
          commentType: "Community",
          userName: "정주",
          userId: 57,
          boardId: 115,
          createdAt: "2024-12-10 12:10:58",
          updatedAt: "2024-12-10 12:10:58",
          comment: "222222시작",
          like: 0,
          isDeleted: false,
          reportNum: 0,
        },
        {
          id: 282,
          commentType: "Community",
          userName: "정주",
          userId: 57,
          boardId: 115,
          createdAt: "2024-12-10 12:10:51",
          updatedAt: "2024-12-10 12:10:51",
          comment: "123",
          like: 0,
          isDeleted: false,
          reportNum: 0,
        },
        {
          id: 281,
          commentType: "Community",
          userName: "정주",
          userId: 57,
          boardId: 115,
          createdAt: "2024-12-10 12:05:38",
          updatedAt: "2024-12-10 12:05:38",
          comment: "1313",
          like: 0,
          isDeleted: false,
          reportNum: 0,
        },
        {
          id: 280,
          commentType: "Community",
          userName: "김훈직",
          userId: 55,
          boardId: 114,
          createdAt: "2024-12-10 12:04:24",
          updatedAt: "2024-12-10 12:04:24",
          comment: "3333",
          like: 0,
          isDeleted: false,
          reportNum: 0,
        },
        {
          id: 279,
          commentType: "Community",
          userName: "정주",
          userId: 57,
          boardId: 115,
          createdAt: "2024-12-10 12:04:21",
          updatedAt: "2024-12-10 12:04:21",
          comment: "시작해볼까",
          like: 0,
          isDeleted: false,
          reportNum: 0,
        },
        {
          id: 278,
          commentType: "Community",
          userName: "김훈직",
          userId: 55,
          boardId: 114,
          createdAt: "2024-12-10 12:04:21",
          updatedAt: "2024-12-10 12:04:21",
          comment: "1111",
          like: 0,
          isDeleted: false,
          reportNum: 0,
        },
        {
          id: 277,
          commentType: "Community",
          userName: "김훈직",
          userId: 55,
          boardId: 115,
          createdAt: "2024-12-10 12:04:08",
          updatedAt: "2024-12-10 12:04:08",
          comment: "111111",
          like: 0,
          isDeleted: false,
          reportNum: 0,
        },
        {
          id: 276,
          commentType: "Community",
          userName: "김훈직",
          userId: 55,
          boardId: 115,
          createdAt: "2024-12-10 12:03:59",
          updatedAt: "2024-12-10 12:03:59",
          comment: "111",
          like: 0,
          isDeleted: false,
          reportNum: 0,
        },
        {
          id: 275,
          commentType: "Community",
          userName: "김훈직",
          userId: 55,
          boardId: 115,
          createdAt: "2024-12-10 12:03:54",
          updatedAt: "2024-12-10 12:03:54",
          comment: "222",
          like: 0,
          isDeleted: false,
          reportNum: 0,
        },
        {
          id: 274,
          commentType: "Community",
          userName: "김훈직",
          userId: 55,
          boardId: 115,
          createdAt: "2024-12-10 12:00:36",
          updatedAt: "2024-12-10 12:00:36",
          comment: "익명2에게",
          like: 0,
          isDeleted: false,
          reportNum: 0,
        },
        {
          id: 273,
          commentType: "Community",
          userName: "김훈직",
          userId: 55,
          boardId: 115,
          createdAt: "2024-12-10 10:58:49",
          updatedAt: "2024-12-10 10:58:49",
          comment: "익명2에 테스트",
          like: 0,
          isDeleted: false,
          reportNum: 0,
        },
        {
          id: 272,
          commentType: "Community",
          userName: "정주",
          userId: 57,
          boardId: 115,
          createdAt: "2024-12-10 10:58:26",
          updatedAt: "2024-12-10 10:58:26",
          comment: "3333지옥이작",
          like: 0,
          isDeleted: false,
          reportNum: 0,
        },
      ],
    };

    const { totalCount } = dummyResult;
    setCommentData(dummyResult);
    setPerPage((prev) => {
      return {
        ...prev,
        pageLength: Math.ceil(totalCount / prev.perPage),
      };
    });
  };

  useEffect(() => {
    sumbitSearchComments(false);
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
        additionalArea={
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center w-full gap-4 ">
              <div className="mr-4 text-xl font-bold min-w-24 max-xl:text-sm">
                구분
              </div>
              <select
                className="rounded-none select-bordered select select-sm max-xl:select-xs"
                onChange={(e) =>
                  setSearch((prev) => {
                    return { ...prev, commentType: e.target.value };
                  })
                }
              >
                {/* <option value="">전체</option> */}
                <option value="Community">커뮤니티</option>
                <option value="Mindfulness">명상</option>
                <option value="ASMR">ASMR</option>
              </select>
            </div>
          </div>
        }
        query={{
          reset: () =>
            setSearch({
              word: "",
              startDate: "",
              endDate: "",
              commentType: "Community",
            }),
          submit: () => {
            sumbitSearchComments(true);

            setPerPage((prev) => {
              return { ...prev, page: 1 };
            });
          },
        }}
      />
      <Table
        tableTitle={`조회 ${commentData?.totalCount || "0"} 건`}
        data={commentData?.comments || []}
        addedMap={
          search.commentType === "Community" ? addedMap : mindfulnessAddedMap
        }
        checkable={{ active: false, multi: false, setter: () => {} }}
        tdOptions={{
          comment: {
            el: (item: string | null) => {
              return (
                <span
                  className={` whitespace-normal ${
                    item === null ? "line-through" : ""
                  }`}
                >
                  {item === null ? "삭제된 코멘트" : item}
                </span>
              );
            },
          },
        }}
        trOptions={{
          tbody: {
            className: () => "hover:bg-gray-300",

            dbClickFunc: (item: TdObjTypes) => {
              if (search.commentType === "Community") {
                route(
                  `/community/comments/detail?targetId=${item.boardId}&commentId=${item.id}&commentType=${search.commentType}`
                );
              }
              if (search.commentType === "Mindfulness") {
                route(
                  `/community/comments/detail?targetId=${item.mindfulnessCommentId}&commentId=${item.id}&commentType=${search.commentType}`
                );
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
    </div>
  );
}

export default index;
