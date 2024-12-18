import { chunk, map, times } from "lodash";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReportModal from "../ReportModal";
import { closeModal, openModal } from "#/utils/useModalHandler";
import { Alert } from "../Alert";
import api from "#/library/axios/api";
import { Modal } from "../Modal";
import { CommentsListTypes } from "#/data/types/components";

function index({
  targetId,
  type,
  reloadComment,
  deleteComment,
  commentsList,
  perPageOptions,
  search,
}: CommentsListTypes) {
  const route = useNavigate();

  const [reportData, setReportData] = useState({});
  const [reportPerPage, setReportPerPage] = useState({
    page: 1,
    perPage: 20,
    pageLength: 1,
  });

  const [deleteCommentId, setDeleteCommnetId] = useState({
    commentId: "",
    commentType: "",
  });

  useEffect(() => {
    if (reloadComment && targetId) {
      reloadComment(targetId, search?.text);
    }
  }, [targetId, perPageOptions?.page]);

  const [subComments, setSubComments] = useState({
    detail: {
      comment: "",
    },
    sub: [],
  });
  const [subCommentsPerPage, setSubCommentsPerPage] = useState({
    page: 1,
    perPage: 100,
    pageLength: 1,
  });
  const getSubComments = (id: string, commentType: string) => {
    // api
    //   .get(`/admin/community/comment/${id}`, {
    //     params: {
    //       commentType: commentType,
    //     },
    //   })
    //   .then((result) => {
    //     const [, ...rest] = result.data;
    //     const chunked = chunk(rest, subCommentsPerPage.perPage);

    //     setSubComments((prev) => {
    //       return { ...prev, detail: result.data[0], sub: chunked as [] };
    //     });
    //     setSubCommentsPerPage((prev) => {
    //       return {
    //         ...prev,
    //         pageLength: Math.ceil(100 / prev.perPage),
    //       };
    //     });
    //   })
    //   .catch((error) => {
    //     console.log(error);
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

    const [, ...rest] = dummyResult;
    const chunked = chunk(rest, subCommentsPerPage.perPage);

    setSubComments((prev) => {
      return { ...prev, detail: dummyResult[0], sub: chunked as [] };
    });
    setSubCommentsPerPage((prev) => {
      return {
        ...prev,
        pageLength: Math.ceil(100 / prev.perPage),
      };
    });
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="col-span-2 px-2 py-1 my-1 text-lg text-white bg-primary">
        댓글
      </div>
      {search && (
        <div className="grid items-center grid-cols-3 col-span-2 gap-2">
          <span className="col-span-1">검색</span>

          <div className="flex col-span-2 gap-4">
            <input
              type="text"
              className="flex-auto rounded-none bg-base-100 input input-bordered input-sm max-sm:input-xs"
              placeholder="UID, 이름, 내용을 검색해 주세요."
              value={search.text}
              onChange={(e) => {
                search.setText(e.target.value);
              }}
            />
            <button
              className="rounded-none btn btn-primary btn-sm max-sm:btn-xs"
              onClick={() => {
                search.setText("");
                reloadComment(targetId);
              }}
            >
              초기화
            </button>
            <button
              className="rounded-none btn btn-primary btn-sm max-sm:btn-xs"
              disabled={search.text === ""}
              onClick={() => reloadComment(targetId, search.text)}
            >
              검색
            </button>
          </div>
        </div>
      )}

      <ul className="flex flex-col col-span-2">
        {commentsList[perPageOptions?.page || 0]?.length === 0 && (
          <div className="text-right">댓글이 존재하지 않습니다.</div>
        )}

        {map(
          commentsList[(perPageOptions?.page || 0) - 1],
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
            boardCommentId?: number | null;
            mindfulnessCommentId?: number | null;
          }) => {
            return (
              <li
                className={`${
                  comment.boardCommentId || comment.mindfulnessCommentId
                    ? "ml-16"
                    : ""
                }
                ${String(comment.id) === targetId ? "bg-base-200" : ""}
                `}
                key={`${comment.userName}-${comment.createdAt}`}
              >
                <div
                  className={`flex flex-wrap items-center justify-between gap-4 px-6 py-4 border-b border-primary`}
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
                      {comment.isDeleted ? "삭제된 코멘트" : comment.comment}
                    </div>
                    <div className="flex gap-2">
                      <div className="max-sm:text-xs">
                        좋아요 {comment.like}
                      </div>

                      {type === "Board" && (
                        <div
                          className={`underline cursor-pointer text-error max-sm:text-xs ${
                            comment.reportNum === 0 ? "pointer-events-none" : ""
                          }`}
                          onClick={() => {
                            api
                              .get(
                                `/admin/report/comment/${comment.id}?page=${reportPerPage.page}&pageSize=${reportPerPage.perPage}`
                              )
                              .then((result) => {
                                setReportData((prev) => {
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
                      )}

                      {(type === "Board" ||
                        type === "Mindfulness" ||
                        type === "ASMR") && (
                        <div
                          className={`underline cursor-pointer  max-sm:text-xs`}
                          onClick={() => {
                            console.log("why?", comment);
                            getSubComments(
                              String(comment.id),
                              comment.commentType || type
                            );

                            openModal("subComment-modal");
                          }}
                        >
                          대댓글보기
                        </div>
                      )}
                    </div>
                  </div>

                  <button
                    className="rounded-none btn btn-sm max-sm:btn-xs btn-error"
                    type="button"
                    disabled={comment.isDeleted}
                    onClick={() => {
                      setDeleteCommnetId((prev) => {
                        return {
                          ...prev,
                          commentId: String(comment.id),
                          commentType:
                            type === "Board" || type === "Comments"
                              ? comment.commentType
                              : "",
                        };
                      });
                      openModal("comment-delete");
                    }}
                  >
                    {comment.isDeleted ? "삭제됨" : "삭제"}
                  </button>
                </div>
              </li>
            );
          }
        )}

        {/* <li>
          <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-primary">
            <div className="flex flex-col gap-2 ">
              <div className="flex flex-wrap items-baseline gap-2">
                <div className="text-xl font-bold max-sm:text-xs">조세호</div>
                <div className="max-sm:text-xs">
                  UID <span className="underline">0384</span>
                </div>
                <div className="max-sm:text-xs">작성 2024.07.01 16:48</div>
              </div>
              <div className="max-sm:text-xs">
                한 기업에 최종 합격해서 처우협의 할 단계인데, 인사 담당자 분이
                메일을 주셨네요.
              </div>
              <div className="flex gap-2">
                <div className="max-sm:text-xs">좋아요 123,456</div>
                <div
                  className="underline cursor-pointer text-error max-sm:text-xs"
                  // onClick={() => openModal("report")}
                >
                  신고 123
                </div>
              </div>
            </div>
            <button
              className="btn btn-sm max-sm:btn-xs btn-error"
              type="button"
            >
              삭제
            </button>
          </div>

          <ul className="flex flex-col col-span-2">
            <li className="ml-16">
              <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-primary">
                <div className="flex flex-col gap-2 ">
                  <div className="flex flex-wrap items-baseline gap-2">
                    <div className="text-xl font-bold max-sm:text-xs">
                      조세호
                    </div>
                    <div className="max-sm:text-xs">
                      UID <span className="underline">0384</span>
                    </div>
                    <div className="max-sm:text-xs">작성 2024.07.01 16:48</div>
                  </div>
                  <div className="max-sm:text-xs">
                    한 기업에 최종 합격해서 처우협의 할 단계인데, 인사 담당자
                    분이 메일을 주셨네요.
                  </div>
                  <div className="flex gap-2">
                    <div className="max-sm:text-xs">좋아요 123,456</div>
                    <div
                      className="underline cursor-pointer text-error max-sm:text-xs"
                      // onClick={() => openModal("report")}
                    >
                      신고 123
                    </div>
                  </div>
                </div>
                <button
                  className="btn btn-sm max-sm:btn-xs btn-error"
                  type="button"
                >
                  삭제
                </button>
              </div>
            </li>
          </ul>
        </li>

        <li>
          <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-primary">
            <div className="flex flex-col gap-2 ">
              <div className="flex flex-wrap items-baseline gap-2">
                <div className="text-xl font-bold max-sm:text-xs">조세호</div>
                <div className="max-sm:text-xs">
                  UID <span className="underline">0384</span>
                </div>
                <div className="max-sm:text-xs">작성 2024.07.01 16:48</div>
              </div>
              <div className="max-sm:text-xs">
                한 기업에 최종 합격해서 처우협의 할 단계인데, 인사 담당자 분이
                메일을 주셨네요.
              </div>
              <div className="flex gap-2">
                <div className="max-sm:text-xs">좋아요 123,456</div>
                <div
                  className="underline cursor-pointer text-error max-sm:text-xs"
                  // onClick={() => openModal("report")}
                >
                  신고 123
                </div>
              </div>
            </div>
            <button
              className="btn btn-sm max-sm:btn-xs btn-error"
              type="button"
            >
              삭제
            </button>
          </div>
        </li> */}
      </ul>

      {(perPageOptions?.pageLength || 0) > 1 && (
        <div className="flex justify-center col-span-2">
          <div className="join">
            <button
              className="join-item btn btn-ghost btn-outline border-base-200 btn-sm max-sm:btn-xs"
              disabled={perPageOptions?.page === 1}
              onClick={() =>
                perPageOptions?.setPerPage((prev: any) => {
                  return { ...prev, page: prev.page - 1 };
                })
              }
            >
              &lt;
            </button>

            {times(perPageOptions?.pageLength || 0, (item) => {
              const startRange =
                Math.floor(((perPageOptions?.page || 0) - 1) / 10) * 10 + 1;
              const endRange = startRange + 9;

              return (
                <button
                  key={`page-${item}`}
                  className={`${
                    startRange <= item + 1 && item < endRange ? "" : "hidden"
                  } ${
                    perPageOptions?.page === item + 1
                      ? "bg-black text-white border-black"
                      : ""
                  } join-item btn  btn-outline border-base-200 btn-sm max-sm:btn-xs`}
                  onClick={() =>
                    perPageOptions?.setPerPage(
                      (prev: { page: number; perPage: number }) => {
                        return { ...prev, page: item + 1 };
                      }
                    )
                  }
                >
                  {item + 1}
                </button>
              );
            })}
            <button
              className="join-item btn btn-ghost btn-outline border-base-200 btn-sm max-sm:btn-xs"
              disabled={perPageOptions?.pageLength === perPageOptions?.page}
              onClick={() =>
                perPageOptions?.setPerPage(
                  (prev: { page: number; perPage: number }) => {
                    return { ...prev, page: prev.page + 1 };
                  }
                )
              }
            >
              &gt;
            </button>
          </div>
        </div>
      )}
      <ReportModal
        closeFunc={() => closeModal("report")}
        id="report"
        type="comment"
        data={reportData as any}
        perPage={{
          page: reportPerPage.page,
          perPage: reportPerPage.perPage,
          pageLength: reportPerPage.pageLength,
          setPerPage: setReportPerPage,
        }}
      />
      <Alert
        id="comment-delete"
        title="댓글 삭제"
        text={`삭제할 경우 복구할 수 없습니다.\n정말 삭제하시겠습니까?`}
        buttons={[
          {
            style: "",
            text: "취소",
            disabled: false,
            func: () => setDeleteCommnetId({ commentId: "", commentType: "" }),
          },

          {
            style: "btn-error",
            text: "삭제",
            disabled: false,
            func: () =>
              type === "Mindfulness" || type === "ASMR"
                ? deleteComment(deleteCommentId.commentId)
                : deleteComment(
                    deleteCommentId.commentId,
                    deleteCommentId.commentType
                  ),
          },
        ]}
      />

      <Modal id="subComment-modal">
        <div className="flex flex-col flex-auto gap-4">
          <div className="text-2xl font-bold max-lg:text-lg">대댓글 보기</div>
          <div className="flex flex-col gap-2">
            <div className="col-span-2 px-2 py-1 my-1 text-lg text-white bg-primary">
              댓글
            </div>
            <div className="grid items-start grid-cols-3 col-span-2 gap-2">
              <span className="col-span-1">내용</span>

              <textarea
                className="col-span-2 rounded-none resize-none textarea textarea-sm textarea-bordered"
                value={subComments?.detail?.comment || ""}
                disabled
              ></textarea>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 px-2 py-1 my-1 text-lg text-white bg-primary">
              대댓글
            </div>
            <ul className="flex flex-col col-span-2">
              {subComments?.sub.length === 0 && (
                <li className="px-1">대댓글이 없습니다.</li>
              )}
              {map(
                subComments?.sub[(perPageOptions?.page || 0) - 1],
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
                  boardCommentId?: number | null;
                  mindfulnessCommentId?: number | null;
                }) => {
                  return (
                    <li
                      className={`${
                        String(comment.id) === targetId ? "bg-base-200" : ""
                      }
                `}
                      key={`${comment.userName}-${comment.createdAt}`}
                    >
                      <div
                        className={`flex flex-wrap items-center justify-between gap-4 px-6 py-4 border-b border-primary`}
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

                            {type === "Board" ||
                              (type === "Comments" && (
                                <div
                                  className={`underline cursor-pointer text-error max-sm:text-xs ${
                                    comment.reportNum === 0
                                      ? "pointer-events-none"
                                      : ""
                                  }`}
                                  onClick={() => {
                                    api
                                      .get(
                                        `/admin/report/comment/${comment.id}?page=${reportPerPage.page}&pageSize=${reportPerPage.perPage}`
                                      )
                                      .then((result) => {
                                        setReportData((prev) => {
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
                              ))}

                            {/* {(type === "board" || type === "content") && (
                              <div
                                className={`underline cursor-pointer  max-sm:text-xs`}
                                onClick={() => {
                                  getSubComments(
                                    String(comment.id),
                                    comment.commentType
                                  );
                                }}
                              >
                                대댓글보기
                              </div>
                            )} */}
                          </div>
                        </div>

                        <button
                          className="rounded-none btn btn-sm max-sm:btn-xs btn-error"
                          type="button"
                          disabled={comment.isDeleted}
                          onClick={() => {
                            setDeleteCommnetId((prev) => {
                              return {
                                ...prev,
                                commentId: String(comment.id),
                                commentType:
                                  type === "Board" || type === "Comments"
                                    ? comment.commentType
                                    : "",
                              };
                            });
                            openModal("comment-delete");
                          }}
                        >
                          {comment.isDeleted ? "삭제됨" : "삭제"}
                        </button>
                      </div>
                    </li>
                  );
                }
              )}
            </ul>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default index;
