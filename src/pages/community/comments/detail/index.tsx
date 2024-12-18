import CommentsList from "#/components/CommentsList";
import api from "#/library/axios/api";
import { loadingState } from "#/library/recoil/atoms/loadingState";
import useLoadingState from "#/library/recoil/hook/useLoadingState";
import { chunk } from "lodash";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

function index() {
  const params = new URLSearchParams(location.search);

  const { setLoading } = useLoadingState();

  const [comments, setComments] = useState<
    Array<{ [key: string]: string | number | boolean }[]>
  >([[]]);

  const getComments = (id: string, searchWord?: string) => {
    // setLoading(true);
    // api
    //   .get(`/admin/community/comment/${id}`, {
    //     params: {
    //       commentType: params.get("commentType"),
    //     },
    //   })
    //   .then((result) => {
    //     if (
    //       result.data.length === 1 &&
    //       ((result.data[0].boardCommentId &&
    //         result.data[0].boardCommentId !== null) ||
    //         (result.data[0].mindfulnessCommentId &&
    //           result.data[0].mindfulnessCommentId !== null))
    //     ) {
    //       api
    //         .get(
    //           `/admin/community/comment/${
    //             params.get("commentType") === "Community"
    //               ? result.data[0].boardCommentId
    //               : result.data[0].mindfulnessCommentId
    //           }`,
    //           {
    //             params: {
    //               commentType: params.get("commentType"),
    //             },
    //           }
    //         )
    //         .then((result2) => {
    //           const chunked = chunk(result2.data, commentPerPage.perPage);
    //           const detail = result2.data.filter(
    //             (item: { id: number }) =>
    //               String(item.id) === params.get("commentId")
    //           );

    //           setCommentDetail(detail[0]);
    //           setComments(chunked as []);
    //           setCommentPerPage((prev) => {
    //             return {
    //               ...prev,
    //               pageLength: Math.ceil(100 / prev.perPage),
    //             };
    //           });
    //         });
    //     } else {
    //       const chunked = chunk(result.data, commentPerPage.perPage);
    //       const detail = result.data.filter(
    //         (item: { id: number }) =>
    //           String(item.id) === params.get("commentId")
    //       );

    //       setCommentDetail(detail[0]);
    //       setComments(chunked as []);
    //       setCommentPerPage((prev) => {
    //         return {
    //           ...prev,
    //           pageLength: Math.ceil(100 / prev.perPage),
    //         };
    //       });
    //     }
    //     setLoading(false);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     setLoading(false);
    //   });

    const dummyResult: any = [
      {
        id: 285,
        userName: "정주",
        userId: 57,
        boardId: 117,
        createdAt: "2024-12-10 12:13:36",
        updatedAt: "2024-12-10 12:13:36",
        comment: "두번째",
        like: 0,
        isDeleted: false,
        boardCommentId: null,
        reportNum: 0,
        category: "일상",
      },
      {
        id: 287,
        userName: "정주",
        userId: 57,
        boardId: 117,
        createdAt: "2024-12-10 12:13:46",
        updatedAt: "2024-12-10 12:13:46",
        comment: "2-1",
        like: 0,
        isDeleted: false,
        boardCommentId: 285,
        reportNum: 0,
        category: "일상",
      },
      {
        id: 288,
        userName: "정주",
        userId: 57,
        boardId: 117,
        createdAt: "2024-12-10 12:13:58",
        updatedAt: "2024-12-10 12:13:58",
        comment: "2-2",
        like: 0,
        isDeleted: false,
        boardCommentId: 285,
        reportNum: 0,
        category: "일상",
      },
      {
        id: 289,
        userName: "정주",
        userId: 57,
        boardId: 117,
        createdAt: "2024-12-10 12:14:03",
        updatedAt: "2024-12-10 12:14:03",
        comment: "2-3",
        like: 0,
        isDeleted: false,
        boardCommentId: 285,
        reportNum: 0,
        category: "일상",
      },
    ];

    const chunked = chunk(dummyResult, commentPerPage.perPage);
    const detail = dummyResult.filter(
      (item: { id: number }) => String(item.id) === params.get("commentId")
    );

    setCommentDetail(detail[0]);
    setComments(chunked as []);
    setCommentPerPage((prev) => {
      return {
        ...prev,
        pageLength: Math.ceil(100 / prev.perPage),
      };
    });
  };

  const route = useNavigate();

  const submitDeleteComment = (id: string, commentType: string) => {
    api
      .delete(`/admin/community/comment/${id}?commentType=${commentType}`)
      .then((result) => {
        console.log("success delete", result);

        setLoading(false);
        getComments(params.get("commentId") as string);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const [commentDetail, setCommentDetail] = useState<{
    [key: string]: string | number | boolean;
  }>({});

  const [commentPerPage, setCommentPerPage] = useState({
    page: 1,
    perPage: 100,
    pageLength: 1,
  });

  useEffect(() => {
    getComments(params.get("commentId") as string);
  }, []);

  return (
    <div>
      <div className="flex flex-wrap gap-4 max-2xl:gap-10">
        <div className="flex flex-col flex-auto gap-4">
          <div className="text-2xl font-bold max-lg:text-lg">댓글 상세</div>
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
                      {commentDetail?.createdAt || ""}
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className=" min-w-16 whitespace-nowrap max-lg:text-sm">
                      UID
                    </div>
                    <div
                      className="font-bold text-blue-500 underline cursor-pointer whitespace-nowrap max-lg:text-sm"
                      onClick={() =>
                        route(`/user/detail?id=${commentDetail?.userId}`)
                      }
                    >
                      {commentDetail?.userId || ""}
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
                      {commentDetail?.updatedAt || ""}
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className=" min-w-16 whitespace-nowrap max-lg:text-sm">
                      이름
                    </div>
                    <div className="font-bold whitespace-nowrap max-lg:text-sm">
                      {commentDetail?.userName || ""}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 px-2 py-1 my-1 text-lg text-white bg-primary">
              댓글
            </div>

            <div className="grid grid-cols-3 col-span-2 gap-2 max-lg:grid-cols-1">
              <div className="grid items-center grid-cols-3 col-span-1 gap-2">
                <span className="col-span-1">구분</span>
                <div className="font-bold whitespace-nowrap max-lg:text-sm">
                  커뮤니티
                </div>
              </div>
              <div className="grid items-center grid-cols-3 col-span-1 gap-2">
                <span className="col-span-1">카테고리</span>
                <div className="font-bold whitespace-nowrap max-lg:text-sm">
                  일상
                </div>
              </div>
              <div className="grid items-center grid-cols-3 col-span-1 gap-2">
                <span className="col-span-1">본문No.</span>
                <div className="inline-flex font-bold text-blue-500 underline whitespace-nowrap max-lg:text-sm">
                  <span
                    className="cursor-pointer"
                    onClick={() => {
                      if (params.get("commentType") === "Community") {
                        route(
                          `/community/board/detail?id=${params.get("targetId")}`
                        );
                      }

                      if (params.get("commentType") === "Mindfulness") {
                        route(`/contents/media`);
                      }
                    }}
                  >
                    {params.get("targetId") || ""}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <CommentsList
            commentsList={(comments as []) || []}
            // deleteComment={submitDeleteComment}
            reloadComment={getComments}
            deleteComment={() => {}}
            targetId={params.get("commentId") as string}
            type="Comments"
            perPageOptions={{
              page: commentPerPage.page,
              perPage: commentPerPage.perPage,
              pageLength: commentPerPage.pageLength,
              setPerPage: setCommentPerPage,
            }}
          />
          {/* <ul className="flex flex-col col-span-2">
            {boardDetailData?.comments.length === 0 && (
              <div className="text-right">댓글이 존재하지 않습니다.</div>
            )}

            {map(
              boardDetailData?.comments,
              (comment: {
                id: number;
                userId: number;
                userName: string;
                createdAt: string;
                comment: string;
                like: number;
                reportNum: number;
                isDeleted: boolean;
                commentType: string;
                subComments: {
                  id: number;
                  isDeleted: boolean;
                  userName: string;
                  userId: number;
                  createdAt: string;
                  comment: string;
                  like: number;
                  reportNum: number;
                  commentType: string;
                }[];
              }) => {
                return (
                  <li key={`${comment.userName}-${comment.createdAt}`}>
                    <div
                      className={`${
                        params.get("commentId") === String(comment.id)
                          ? "bg-base-300"
                          : ""
                      } flex flex-wrap items-center justify-between gap-4 px-6 py-4 border-b border-primary`}
                    >
                      <div className="flex flex-col gap-2 ">
                        <div className="flex flex-wrap items-baseline gap-2">
                          <div className="text-xl font-bold max-sm:text-xs">
                            {comment.userName}
                          </div>
                          <div className="max-sm:text-xs">
                            UID{" "}
                            <span
                              className="text-blue-500 underline cursor-pointer"
                              onClick={() =>
                                route(`/user/detail?id=${comment.userId}`)
                              }
                            >
                              {comment.userId}
                            </span>
                          </div>
                          <div className="max-sm:text-xs">
                            작성 {comment.createdAt}
                          </div>
                        </div>
                        <div
                          className={`${
                            comment.isDeleted ? "line-through" : ""
                          } max-sm:text-xs`}
                        >
                          {comment.isDeleted
                            ? "삭제된 코멘트"
                            : comment.comment}
                        </div>
                        <div className="flex gap-2">
                          <div className="max-sm:text-xs">
                            좋아요 {comment.like}
                          </div>
                          <div
                            className={`underline cursor-pointer text-error max-sm:text-xs ${
                              comment.reportNum === 0
                                ? "pointer-events-none"
                                : ""
                            }`}
                            onClick={() => {
                              api
                                .get(
                                  `/admin/report/comment/${comment.id}?page=${perPage.page}&pageSize=${perPage.perPage}`
                                )
                                .then((result) => {
                                  setReportDetail((prev) => {
                                    return {
                                      ...prev,
                                      type: "comment",
                                      comment: result?.data?.comment,
                                      reports: result?.data?.reports,
                                    };
                                  });
                                });
                              openModal("report");
                            }}
                          >
                            신고 {comment.reportNum}
                          </div>
                        </div>
                      </div>
                      {params.get("commentId") === String(comment.id) && (
                        <button
                          className="rounded-none btn btn-sm max-sm:btn-xs btn-error"
                          type="button"
                          disabled={comment.isDeleted}
                          onClick={() => {
                            setDeleteCommnet((prev) => {
                              return {
                                ...prev,
                                commentId: String(comment.id),
                                commentType: comment.commentType,
                              };
                            });
                            openModal("comment-delete");
                          }}
                        >
                          {comment.isDeleted ? "삭제됨" : "삭제"}
                        </button>
                      )}
                    </div>

                    <ul className="flex flex-col col-span-2">
                      {map(comment.subComments, (subComment, index) => {
                        return (
                          <li
                            className="ml-16"
                            key={`${subComment.createdAt}-${index}`}
                          >
                            <div
                              className={`${
                                params.get("commentId") ===
                                String(subComment.id)
                                  ? "bg-base-300"
                                  : ""
                              } flex flex-wrap items-center justify-between gap-4 px-6 py-4 border-b border-primary`}
                            >
                              <div className="flex flex-col gap-2 ">
                                <div className="flex flex-wrap items-baseline gap-2">
                                  <div className="text-xl font-bold max-sm:text-xs">
                                    {subComment.userName}
                                  </div>
                                  <div className="max-sm:text-xs">
                                    UID{" "}
                                    <span
                                      className="text-blue-500 underline cursor-pointer"
                                      onClick={() =>
                                        route(
                                          `/user/detail?id=${subComment.userId}`
                                        )
                                      }
                                    >
                                      {subComment.userId}
                                    </span>
                                  </div>
                                  <div className="max-sm:text-xs">
                                    작성 {subComment.createdAt}
                                  </div>
                                </div>
                                <div
                                  className={`${
                                    subComment.isDeleted ? "line-through" : ""
                                  } max-sm:text-xs`}
                                >
                                  {subComment.isDeleted
                                    ? "삭제된 코멘트"
                                    : subComment.comment}
                                </div>
                                <div className="flex gap-2">
                                  <div className="max-sm:text-xs">
                                    좋아요 {subComment.like}
                                  </div>
                                  <div
                                    className={`
                                      ${
                                        subComment.reportNum === 0
                                          ? "pointer-events-none"
                                          : ""
                                      }
                                    
                                      underline cursor-pointer text-error max-sm:text-xs`}
                                    onClick={() => {
                                      setReportDetail((prev) => {
                                        return { ...prev, type: "board" };
                                      });
                                      openModal("post-detail-report");
                                    }}
                                  >
                                    신고 {subComment.reportNum}
                                  </div>
                                </div>
                              </div>
                              {params.get("commentId") ===
                                String(subComment.id) && (
                                <button
                                  className="rounded-none btn btn-sm max-sm:btn-xs btn-error"
                                  type="button"
                                  disabled={subComment.isDeleted}
                                  onClick={() => {
                                    setDeleteCommnet((prev) => {
                                      return {
                                        ...prev,
                                        commentId: String(subComment.id),
                                        commentType: subComment.commentType,
                                      };
                                    });
                                    openModal("comment-delete");
                                  }}
                                >
                                  {subComment.isDeleted ? "삭제됨" : "삭제"}
                                </button>
                              )}
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                );
              }
            )}
          </ul> */}
        </div>
      </div>
      {/* 
      <ReportModal
        closeFunc={() => closeModal("report")}
        id="report"
        type="comment"
        data={reportDetail}
        perPage={{
          page: perPage.page,
          perPage: perPage.perPage,
          pageLength: perPage.pageLength,
          setPerPage: setPerPage,
        }}
      /> */}

      {/* <Alert
        id="comment-delete"
        title="댓글 삭제"
        text={`삭제할 경우 복구할 수 없습니다.\n정말 삭제하시겠습니까?`}
        buttons={[
          {
            style: "",
            text: "취소",
            disabled: false,
            func: () => setDeleteCommnet({ commentId: "", commentType: "" }),
          },

          {
            style: "btn-error",
            text: "삭제",
            disabled: false,
            func: () => submitDeleteComment(),
          },
        ]}
      /> */}
    </div>
  );
}

export default index;
