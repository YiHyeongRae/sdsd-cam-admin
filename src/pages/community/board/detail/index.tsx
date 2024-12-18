import CommentsList from "#/components/CommentsList";
import { Modal } from "#/components/Modal";
import ReportModal from "#/components/ReportModal";
import { ReportDetailTypes } from "#/data/types/components";
import api from "#/library/axios/api";
import useLoadingState from "#/library/recoil/hook/useLoadingState";
import { closeModal, openModal } from "#/utils/useModalHandler";
import addComma from "#/utils/useNumComma";
import { chunk, map } from "lodash";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function index() {
  const params = new URLSearchParams(location.search);

  const [boardDetailData, setBoardDetailData] = useState<{
    board: { [key: string]: string | number | string[] | null };
    comments: {
      [key: string]:
        | string
        | number
        | boolean
        | { [key: string]: string | number | boolean }[];
    }[];
  }>();
  const { setLoading } = useLoadingState();
  const [modalImage, setModalImage] = useState("");
  const [perPage, setPerPage] = useState({
    page: 1,
    perPage: 20,
    pageLength: 1,
  });

  const [commentPerPage, setCommentPerPage] = useState({
    page: 1,
    perPage: 100,
    pageLength: 1,
  });
  const [searchComment, setSearchComment] = useState("");
  const getBoardDetailData = (id: string) => {
    // setLoading(true);
    // api
    //   .get(`/admin/community/board/${id}`)
    //   .then((result) => {
    //     setBoardDetailData(result.data);
    //     setLoading(false);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     setLoading(false);
    //   });

    const dummyResult: any = {
      board: {
        id: 117,
        userName: "aetbnaetbn",
        userId: 57,
        category: "일상",
        title: "최종 댓글 테스트",
        content: "테",
        images: [
          "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/community/57/1733800397916_20240524_114231.jpg",
          "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/community/57/1733800397951_20240523_173009.jpg",
          "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/community/57/1733800398041_20240429_115954.jpg",
          "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/community/57/1733800398062_20240312_183236.jpg",
          "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/community/57/1733800398076_20240306_120703.jpg",
        ],
        views: 11,
        like: 0,
        createdAt: "2024-12-10 12:13:18",
        updatedAt: "2024-12-18 12:43:21",
        commentNum: 8,
        reportNum: 0,
      },
      comments: [
        {
          id: 291,
          commentType: "Community",
          userName: "이형래",
          userId: 50,
          createdAt: "2024-12-18 12:44:08",
          updatedAt: "2024-12-18 12:44:08",
          comment: "ㅊㅎ초",
          like: 0,
          isDeleted: false,
          boardCommentId: null,
          reportNum: 0,
        },
        {
          id: 290,
          commentType: "Community",
          userName: "이형래",
          userId: 50,
          createdAt: "2024-12-18 12:43:27",
          updatedAt: "2024-12-18 12:43:27",
          comment: "오유투터",
          like: 0,
          isDeleted: false,
          boardCommentId: null,
          reportNum: 0,
        },
        {
          id: 286,
          commentType: "Community",
          userName: "agbna",
          userId: 57,
          createdAt: "2024-12-10 12:13:40",
          updatedAt: "2024-12-10 12:13:40",
          comment: "세번째",
          like: 0,
          isDeleted: false,
          boardCommentId: null,
          reportNum: 0,
        },
        {
          id: 285,
          commentType: "Community",
          userName: "awerawr",
          userId: 57,
          createdAt: "2024-12-10 12:13:36",
          updatedAt: "2024-12-10 12:13:36",
          comment: "두번째",
          like: 0,
          isDeleted: false,
          boardCommentId: null,
          reportNum: 0,
        },
        {
          id: 284,
          commentType: "Community",
          userName: "fgsnsfb",
          userId: 57,
          createdAt: "2024-12-10 12:13:33",
          updatedAt: "2024-12-10 12:13:33",
          comment: "첫번째",
          like: 0,
          isDeleted: false,
          boardCommentId: null,
          reportNum: 0,
        },
      ],
    };

    setBoardDetailData(dummyResult);
  };
  useEffect(() => {
    getBoardDetailData(params.get("id") as string);
  }, []);

  const [reportDetail, setReprotDetail] = useState<ReportDetailTypes>({
    type: "board",
    reports: [{}],
    board: {},
    comment: {},
  });

  const route = useNavigate();

  const submitDeleteComment = (id: string, type: string) => {
    api
      .delete(`/admin/community/comment/${id}?commentType=${type}`)
      .then((result) => {
        console.log("success delete", result);

        setLoading(false);
        getBoardDetailData(params.get("id") as string);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const [comments, setComments] = useState<
    Array<{ [key: string]: string | number | boolean }[]>
  >([[]]);

  const getBoardComments = (id: string, searchWord?: string) => {
    // setLoading(true);
    // api
    //   .get(`/admin/community/board/${id}/comment`, {
    //     params: {
    //       page: commentPerPage.page,
    //       searchWord: searchWord,
    //     },
    //   })
    //   .then((result) => {
    //     const chunked = chunk(result.data.comments, commentPerPage.perPage);
    //     setComments(chunked as []);
    //     setCommentPerPage((prev) => {
    //       return {
    //         ...prev,
    //         pageLength: Math.ceil(100 / prev.perPage),
    //       };
    //     });

    //     setLoading(false);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     setLoading(false);
    //   });

    const dummyResult: any = {
      comments: [
        {
          id: 291,
          commentType: "Community",
          userName: "이형래",
          userId: 50,
          createdAt: "2024-12-18 12:44:08",
          updatedAt: "2024-12-18 12:44:08",
          comment: "ㅊㅎ초",
          like: 0,
          isDeleted: false,
          boardCommentId: null,
          reportNum: 0,
        },
        {
          id: 290,
          commentType: "Community",
          userName: "이형래",
          userId: 50,
          createdAt: "2024-12-18 12:43:27",
          updatedAt: "2024-12-18 12:43:27",
          comment: "오유투터",
          like: 0,
          isDeleted: false,
          boardCommentId: null,
          reportNum: 0,
        },
        {
          id: 286,
          commentType: "Community",
          userName: "abeaqbae",
          userId: 57,
          createdAt: "2024-12-10 12:13:40",
          updatedAt: "2024-12-10 12:13:40",
          comment: "세번째",
          like: 0,
          isDeleted: false,
          boardCommentId: null,
          reportNum: 0,
        },
        {
          id: 285,
          commentType: "Community",
          userName: "sfgbsfb",
          userId: 57,
          createdAt: "2024-12-10 12:13:36",
          updatedAt: "2024-12-10 12:13:36",
          comment: "두번째",
          like: 0,
          isDeleted: false,
          boardCommentId: null,
          reportNum: 0,
        },
        {
          id: 284,
          commentType: "Community",
          userName: "sfgbsfb",
          userId: 57,
          createdAt: "2024-12-10 12:13:33",
          updatedAt: "2024-12-10 12:13:33",
          comment: "첫번째",
          like: 0,
          isDeleted: false,
          boardCommentId: null,
          reportNum: 0,
        },
      ],
    };
    const chunked = chunk(dummyResult.comments, commentPerPage.perPage);
    setComments(chunked as []);
    setCommentPerPage((prev) => {
      return {
        ...prev,
        pageLength: Math.ceil(100 / prev.perPage),
      };
    });
  };

  return (
    <div>
      <div className="flex flex-wrap gap-4 max-2xl:gap-10">
        <div className="flex flex-col flex-auto gap-4">
          <div className="text-2xl font-bold max-lg:text-lg">커뮤니티 상세</div>
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
                      {boardDetailData?.board.createdAt || ""}
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className=" min-w-16 whitespace-nowrap max-lg:text-sm">
                      UID
                    </div>
                    <div
                      className="font-bold text-blue-500 underline cursor-pointer whitespace-nowrap max-lg:text-sm"
                      onClick={() =>
                        route(
                          `/user/detail?id=${boardDetailData?.board.userId}`
                        )
                      }
                    >
                      {boardDetailData?.board.userId || ""}
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
                      {boardDetailData?.board?.updatedAt || ""}
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className=" min-w-16 whitespace-nowrap max-lg:text-sm">
                      이름
                    </div>
                    <div className="font-bold whitespace-nowrap max-lg:text-sm">
                      {boardDetailData?.board?.userName || ""}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex justify-end col-span-2 gap-4">
              <div>
                조회수 {addComma(String(boardDetailData?.board.views || 0))}
              </div>
              <div>
                좋아요 {addComma(String(boardDetailData?.board.like || 0))}
              </div>
              <div
                className={`underline cursor-pointer text-error ${
                  boardDetailData?.board.reportNum === 0
                    ? "pointer-events-none"
                    : ""
                }`}
                onClick={() => {
                  api
                    .get(
                      `/admin/report/board/${params.get("id")}?page=${
                        perPage.page
                      }&pageSize=${perPage.perPage}`
                    )
                    .then((result) => {
                      setReprotDetail((prev) => {
                        return {
                          ...prev,
                          type: "board",
                          board: result?.data?.board,
                          reports: result?.data?.reports,
                        };
                      });
                    });
                  openModal("post-detail-report");
                }}
              >
                신고 {addComma(String(boardDetailData?.board.reportNum || 0))}
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
                  value={String(boardDetailData?.board?.category || "")}
                  disabled
                />
              </div>
              <div className="grid items-center grid-cols-3 col-span-2 gap-2">
                <span className="col-span-1">제목</span>
                <input
                  type="text"
                  className="col-span-2 rounded-none grow bg-base-100 input input-bordered input-sm max-sm:input-xs"
                  value={String(boardDetailData?.board?.title || "")}
                  disabled
                />
              </div>
              <div className="grid items-start grid-cols-3 col-span-2 gap-2">
                <span className="col-span-1">내용</span>

                <textarea
                  className="col-span-2 rounded-none resize-none min-h-60 textarea textarea-sm textarea-bordered"
                  value={String(boardDetailData?.board?.content || "")}
                  disabled
                ></textarea>
              </div>
              <div className="grid items-start grid-cols-3 col-span-2 gap-2">
                <span className="col-span-1">첨부 이미지</span>

                <div className="flex col-span-2 gap-2 overflow-auto h-[189px]">
                  {Array.isArray(boardDetailData?.board.images) ? (
                    map(boardDetailData?.board.images, (item, index) => {
                      return (
                        <img
                          key={item + "-image-" + index}
                          className="object-cover w-[189px]"
                          src={String(item)}
                          onClick={() => {
                            setModalImage(item);
                            openModal("post-detail-image");
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
          {/* <div className="grid grid-cols-2 gap-4"> */}
          {/* <div className="col-span-2 px-2 py-1 my-1 text-lg text-white bg-primary">
              댓글
            </div>
            <div className="grid items-center grid-cols-3 col-span-2 gap-2">
              <span className="col-span-1">검색</span>

              <div className="flex col-span-2 gap-4">
                <input
                  type="text"
                  className="flex-auto rounded-none bg-base-100 input input-bordered input-sm max-sm:input-xs"
                  placeholder="UID, 이름, 내용을 검색해 주세요."
                  value={searchComment}
                  onChange={(e) => {
                    setSearchComment(e.target.value);
                  }}
                />
                <button
                  className="rounded-none btn btn-primary btn-sm max-sm:btn-xs"
                  onClick={() => {
                    setSearchComment("");
                    setComments(freezeComments);
                  }}
                >
                  초기화
                </button>
                <button
                  className="rounded-none btn btn-primary btn-sm max-sm:btn-xs"
                  disabled={searchComment === ""}
                  onClick={() => {
                    const copy = [...comments].flat();

                    const filtered = filter(
                      copy,
                      (item: {
                        userId: number;
                        userName: string;
                        comment: string;
                      }) =>
                        String(item.userId)?.includes(searchComment) ||
                        item.userName?.includes(searchComment) ||
                        item.comment?.includes(searchComment)
                    );

                    const chunked = chunk(filtered, commentPerPage.perPage);

                    console.log(chunked);

                    setComments(chunked as [][]);
                    setCommentPerPage((prev) => {
                      return {
                        ...prev,
                        pageLength: Math.ceil(filtered.length / prev.perPage),
                      };
                    });
                  }}
                >
                  검색
                </button>
              </div>
            </div> */}
          <CommentsList
            commentsList={(comments as []) || []}
            // deleteComment={submitDeleteComment}
            reloadComment={getBoardComments}
            deleteComment={() => {}}
            targetId={params.get("id") as string}
            type="Board"
            perPageOptions={{
              page: commentPerPage.page,
              perPage: commentPerPage.perPage,
              pageLength: commentPerPage.pageLength,
              setPerPage: setCommentPerPage,
            }}
            search={{ text: searchComment, setText: setSearchComment }}
          />
          {/* <ul className="flex flex-col col-span-2">
              {comments[commentPerPage.page]?.length === 0 && (
                <div className="text-right">댓글이 존재하지 않습니다.</div>
              )}

              {map(
                comments[commentPerPage.page - 1],
                (
                  comment: {
                    id: number;
                    userId: number;
                    userName: string;
                    createdAt: string;
                    comment: string;
                    like: number;
                    reportNum: number;
                    isDeleted: boolean;
                    commentType: string;
                    isSub: boolean;
                  },
                  index: number
                ) => {
                  return (
                    <li
                      key={`${comment.userName}-${comment.createdAt}-${index}`}
                      className={`${comment.isSub ? "ml-16" : ""}`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 border-b border-primary">
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
                                    setReprotDetail((prev) => {
                                      return {
                                        ...prev,
                                        type: "comment",
                                        comment: result?.data?.comment,
                                        reports: result?.data?.reports,
                                      };
                                    });
                                  });
                                openModal("post-detail-report");
                              }}
                            >
                              신고 {comment.reportNum}
                            </div>
                          </div>
                        </div>
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
                      </div>
                    </li>
                  );
                }
              )} */}
          {/* {_.map(
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
                      <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 border-b border-primary">
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
                                    setReprotDetail((prev) => {
                                      return {
                                        ...prev,
                                        type: "comment",
                                        comment: result?.data?.comment,
                                        reports: result?.data?.reports,
                                      };
                                    });
                                  });
                                openModal("post-detail-report");
                              }}
                            >
                              신고 {comment.reportNum}
                            </div>
                          </div>
                        </div>
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
                      </div>

                      <ul className="flex flex-col col-span-2">
                        {_.map(comment.subComments, (subComment, index) => {
                          return (
                            <li
                              className="ml-16"
                              key={`${subComment.createdAt}-${index}`}
                            >
                              <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 border-b border-primary">
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
                                        setReprotDetail((prev) => {
                                          return { ...prev, type: "board" };
                                        });
                                        openModal("post-detail-report");
                                      }}
                                    >
                                      신고 {subComment.reportNum}
                                    </div>
                                  </div>
                                </div>
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
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </li>
                  );
                }
              )} */}
          {/* </ul> */}
          {/* {commentPerPage.pageLength > 1 && (
              <div className="flex justify-center col-span-2">
                <div className="join">
                  <button
                    className="join-item btn btn-ghost btn-outline border-base-200 btn-sm max-sm:btn-xs"
                    disabled={commentPerPage.page === 1}
                    onClick={() =>
                      setCommentPerPage((prev) => {
                        return { ...prev, page: prev.page - 1 };
                      })
                    }
                  >
                    &lt;
                  </button>

                  {times(commentPerPage.pageLength, (item) => {
                    const startRange =
                      Math.floor((commentPerPage.page - 1) / 10) * 10 + 1;
                    const endRange = startRange + 9;

                    return (
                      <button
                        key={`page-${item}`}
                        className={`
        ${startRange <= item + 1 && item < endRange ? "" : "hidden"}
        ${
          commentPerPage.page === item + 1
            ? "bg-black text-white border-black"
            : ""
        } join-item btn  btn-outline border-base-200 btn-sm max-sm:btn-xs`}
                        onClick={() =>
                          setCommentPerPage((prev) => {
                            return { ...prev, page: item + 1 };
                          })
                        }
                      >
                        {item + 1}
                      </button>
                    );
                  })}
                  <button
                    className="join-item btn btn-ghost btn-outline border-base-200 btn-sm max-sm:btn-xs"
                    disabled={commentPerPage.pageLength === commentPerPage.page}
                    onClick={() =>
                      setCommentPerPage((prev) => {
                        return { ...prev, page: prev.page + 1 };
                      })
                    }
                  >
                    &gt;
                  </button>
                </div>
              </div>
            )} */}
          {/* </div> */}
        </div>
      </div>

      <Modal id="post-detail-image" className="max-w-screen-sm">
        <div className="flex items-center justify-center py-10">
          <img src={modalImage} alt={`게시물`} />
        </div>
      </Modal>

      <ReportModal
        closeFunc={() => closeModal("post-detail-report")}
        id="post-detail-report"
        type={reportDetail.type}
        data={reportDetail}
        perPage={{
          page: perPage.page,
          perPage: perPage.perPage,
          pageLength: perPage.pageLength,
          setPerPage: setPerPage,
        }}
      />

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
