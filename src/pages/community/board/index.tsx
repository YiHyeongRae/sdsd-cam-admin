import { useEffect, useState } from "react";
import Table from "#/components/Table";
import { Modal } from "#/components/Modal";
import TableExtensionHeader from "#/components/TableExtensionHeader";
import { Alert } from "#/components/Alert";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { loadingState } from "#/library/recoil/atoms/loadingState";
import useLoadingState from "#/library/recoil/hook/useLoadingState";
import api from "#/library/axios/api";
import { TableStateTypes } from "#/data/types/components";
import { isEqual, map } from "lodash";

function index() {
  const params = new URLSearchParams(location.search);

  const fromUserDetailSearchId = params.get("fromUserDetailSearchId");

  const [boardData, setBoardData] = useState<TableStateTypes>();
  const { setLoading } = useLoadingState();

  const [search, setSearch] = useState({
    word: "",
    startDate: "",
    endDate: "",
    category: "",
  });
  const [perPage, setPerPage] = useState({
    page: 1,
    perPage: 20,
    pageLength: 1,
  });

  const [category, setCategory] = useState<
    { [key: string]: string | number }[]
  >([]);
  const [freezeCategory, setFreezeCategory] = useState<
    { [key: string]: string | number }[]
  >([]);

  const addedMap = [
    ["id", "게시글 ID"],
    ["userName", "작성자"],
    ["category", "카테고리"],
    ["title", "게시글 제목"],
    ["views", "조회수"],
    ["like", "좋아요"],
    ["commentNum", "댓글"],
    ["reportNum", "신고"],
    ["createdAt", "작성일시"],
    ["updatedAt", "수정일시"],
  ];

  const [categoryDrag, setCategoryDrag] = useState({
    start: 0,
    end: 0,
    beforeChanged: 0,
  });

  const [openCategory, setOpenCategory] = useState(false);
  const [editCategory, setEditCategory] = useState({
    categoryName: "",
    editName: "",
    id: "",
  });
  const [addCategory, setAddCategory] = useState({
    active: false,
    categoryName: "",
  });
  const [deleteCategory, setDeleteCategory] = useState("");

  const route = useNavigate();
  const getCategory = () => {
    // setLoading(true);
    // api
    //   .get(`/admin/community/category`)
    //   .then((result) => {
    //     setCategory(result.data);

    //     const freeze = JSON.parse(JSON.stringify(result.data));
    //     setFreezeCategory(freeze);

    //     setLoading(false);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     setLoading(false);
    //   });

    const dummyResult: any = [
      {
        id: 1,
        sequence: 1,
        categoryName: "일상",
      },
      {
        id: 7,
        sequence: 2,
        categoryName: "연애",
      },
      {
        id: 37,
        sequence: 3,
        categoryName: "33333",
      },
      {
        id: 8,
        sequence: 4,
        categoryName: "대인관계",
      },
      {
        id: 2,
        sequence: 5,
        categoryName: "취업/학업",
      },
      {
        id: 3,
        sequence: 6,
        categoryName: "덕질",
      },
      {
        id: 4,
        sequence: 7,
        categoryName: "거래팟",
      },
      {
        id: 6,
        sequence: 8,
        categoryName: "스트레스",
      },
      {
        id: 5,
        sequence: 9,
        categoryName: "운동",
      },
    ];

    setCategory(dummyResult);

    const freeze = JSON.parse(JSON.stringify(dummyResult));
    setFreezeCategory(freeze);
  };

  const submitAddCategory = () => {
    setLoading(true);
    api
      .post("/admin/community/category", {
        categoryName: addCategory.categoryName,
      })
      .then((result) => {
        setCategory(result.data);

        const freeze = JSON.parse(JSON.stringify(result.data));
        setFreezeCategory(freeze);
        setAddCategory((prev) => {
          return { ...prev, active: false, categoryName: "" };
        });

        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const submitDeleteCategory = () => {
    setLoading(true);
    api
      .delete(`/admin/community/category/${deleteCategory}`)
      .then((result) => {
        setCategory(result.data);

        const freeze = JSON.parse(JSON.stringify(result.data));
        setFreezeCategory(freeze);
        setDeleteCategory("");

        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const submitSearchBoard = (isSubmit: boolean) => {
    // setLoading(true);

    // api
    //   .get(`/admin/community/board`, {
    //     params: {
    //       page: isSubmit ? 1 : perPage.page,
    //       pageSize: perPage.perPage,
    //       searchWord: fromUserDetailSearchId || search.word,
    //       category: search.category,
    //       searchStartDate: search.startDate,
    //       searchEndDate: search.endDate,
    //     },
    //   })
    //   .then((result) => {
    //     const { totalCount } = result.data;

    //     setBoardData((prev) => {
    //       return {
    //         ...prev,
    //         boards: result.data.boards,
    //         totalCount: totalCount,
    //       };
    //     });
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
      totalCount: 84,
      boards: [
        {
          id: 117,
          userName: "정주",
          userId: 57,
          category: "일상",
          title: "최종 댓글 테스트",
          views: 11,
          like: 0,
          createdAt: "2024-12-10 12:13:18",
          updatedAt: "2024-12-18 12:43:21",
          commentNum: 8,
          reportNum: 0,
        },
        {
          id: 115,
          userName: "김훈직",
          userId: 55,
          category: "일상",
          title: "KHJ 댓글 테스트입니다.",
          views: 66,
          like: 0,
          createdAt: "2024-12-10 08:16:37",
          updatedAt: "2024-12-18 13:29:55",
          commentNum: 38,
          reportNum: 0,
        },
        {
          id: 114,
          userName: "버거왕",
          userId: 18,
          category: "일상",
          title: "사혼무",
          views: 82,
          like: 0,
          createdAt: "2024-12-03 12:25:38",
          updatedAt: "2024-12-16 13:15:28",
          commentNum: 51,
          reportNum: 0,
        },
        {
          id: 112,
          userName: "카고임",
          userId: 29,
          category: "일상",
          title: "ㅌㅅㅌ",
          views: 26,
          like: 0,
          createdAt: "2024-10-15 15:14:28",
          updatedAt: "2024-12-11 16:07:42",
          commentNum: 3,
          reportNum: 0,
        },
        {
          id: 109,
          userName: "김훈직",
          userId: 28,
          category: "연애",
          title: "연애란 무엇일까",
          views: 22,
          like: 0,
          createdAt: "2024-09-27 06:16:10",
          updatedAt: "2024-12-10 08:14:34",
          commentNum: 6,
          reportNum: 0,
        },
        {
          id: 108,
          userName: "버거왕",
          userId: 18,
          category: "일상",
          title:
            "힘들죠 힘들죠 잔인한 세상은 나를 비웃고 거울앞에서도 기죽고 또 홀로 술",
          views: 7,
          like: 1,
          createdAt: "2024-09-23 08:03:02",
          updatedAt: "2024-11-07 16:09:10",
          commentNum: 2,
          reportNum: 0,
        },
        {
          id: 107,
          userName: "금태종태종태종",
          userId: 43,
          category: "운동",
          title: "ㅇ퓽ㄴㄴㅇㅇ",
          views: 12,
          like: 0,
          createdAt: "2024-09-22 04:36:39",
          updatedAt: "2024-11-07 16:09:11",
          commentNum: 0,
          reportNum: 0,
        },
        {
          id: 106,
          userName: "금태종태종태종",
          userId: 43,
          category: "덕질",
          title: "1133555554ㄷㅈㅈㅈ일이삼사오육칠팔구십일이삼사오육칠팔구십",
          views: 45,
          like: 0,
          createdAt: "2024-09-20 17:02:05",
          updatedAt: "2024-12-11 12:47:44",
          commentNum: 1,
          reportNum: 0,
        },
        {
          id: 105,
          userName: "카고임",
          userId: 29,
          category: "덕질",
          title: "덕ㅁㄴㅇㅋㅋㅋ",
          views: 34,
          like: 1,
          createdAt: "2024-09-13 09:41:26",
          updatedAt: "2024-12-11 12:47:42",
          commentNum: 4,
          reportNum: 0,
        },
        {
          id: 104,
          userName: "버거왕",
          userId: 18,
          category: "연애",
          title: "연애",
          views: 4,
          like: 0,
          createdAt: "2024-09-13 08:59:48",
          updatedAt: "2024-12-11 12:47:40",
          commentNum: 0,
          reportNum: 0,
        },
        {
          id: 103,
          userName: "버거왕",
          userId: 18,
          category: "일상",
          title: "일상",
          views: 2,
          like: 0,
          createdAt: "2024-09-13 08:59:32",
          updatedAt: "2024-09-21 19:28:51",
          commentNum: 0,
          reportNum: 0,
        },
        {
          id: 102,
          userName: "카고임",
          userId: 29,
          category: "취업/학업",
          title: "ㅎ",
          views: 6,
          like: 1,
          createdAt: "2024-09-12 19:19:42",
          updatedAt: "2024-09-13 12:33:23",
          commentNum: 1,
          reportNum: 0,
        },
        {
          id: 100,
          userName: "버거왕",
          userId: 18,
          category: "일상",
          title: null,
          views: 45,
          like: 1,
          createdAt: "2024-09-11 10:05:10",
          updatedAt: "2024-09-26 16:41:53",
          commentNum: 3,
          reportNum: 4,
        },
        {
          id: 99,
          userName: "버거왕",
          userId: 18,
          category: "취업/학업",
          title: "페드로",
          views: 11,
          like: 0,
          createdAt: "2024-09-11 09:38:02",
          updatedAt: "2024-11-12 07:30:05",
          commentNum: 0,
          reportNum: 0,
        },
        {
          id: 98,
          userName: "버거왕",
          userId: 18,
          category: "대인관계",
          title: "사진1개 테스트그",
          views: 10,
          like: 0,
          createdAt: "2024-09-11 09:12:50",
          updatedAt: "2024-11-07 16:09:45",
          commentNum: 0,
          reportNum: 0,
        },
        {
          id: 97,
          userName: "버거왕",
          userId: 18,
          category: "취업/학업",
          title: "햄버거",
          views: 79,
          like: 1,
          createdAt: "2024-09-06 16:40:16",
          updatedAt: "2024-12-11 12:41:13",
          commentNum: 7,
          reportNum: 0,
        },
        {
          id: 88,
          userName: "버거왕",
          userId: 18,
          category: "대인관계",
          title: "테스트당",
          views: 6,
          like: 0,
          createdAt: "2024-09-05 13:09:11",
          updatedAt: "2024-09-10 14:27:32",
          commentNum: 0,
          reportNum: 0,
        },
        {
          id: 80,
          userName: "김훈직",
          userId: 28,
          category: "대인관계",
          title: "test11",
          views: 54,
          like: 0,
          createdAt: "2024-09-03 13:35:30",
          updatedAt: "2024-12-10 10:25:13",
          commentNum: 29,
          reportNum: 0,
        },
        {
          id: 79,
          userName: "버거왕",
          userId: 18,
          category: "취업/학업",
          title: "eudh",
          views: 11,
          like: 0,
          createdAt: "2024-09-02 06:51:57",
          updatedAt: "2024-09-05 10:19:22",
          commentNum: 0,
          reportNum: 0,
        },
        {
          id: 78,
          userName: "버거왕",
          userId: 18,
          category: "일상",
          title: "dhn",
          views: 21,
          like: 0,
          createdAt: "2024-09-02 06:41:59",
          updatedAt: "2024-10-15 09:36:40",
          commentNum: 1,
          reportNum: 0,
        },
      ],
    };

    const { totalCount } = dummyResult;

    setBoardData((prev) => {
      return {
        ...prev,
        boards: dummyResult.boards,
        totalCount: totalCount,
      };
    });
    setPerPage((prev) => {
      return {
        ...prev,
        pageLength: Math.ceil(totalCount / prev.perPage),
      };
    });
  };

  useEffect(() => {
    getCategory();
  }, []);

  const submitEditCategorySeq = () => {
    setLoading(true);
    const copy = [...category];

    const emptyArr: {}[] = [];

    map(copy, (item, index) => {
      item.sequence = index + 1;

      emptyArr.push(item);
    });
    api
      .put(`admin/community/category/sequence`, { category: emptyArr })
      .then((result) => {
        console.log(result, "put category success");
        setLoading(false);
        getCategory();
      })
      .catch((error) => {
        console.log(error);

        setLoading(false);
      });
  };

  const submitEditCategoryName = () => {
    setLoading(true);
    const edit = {
      id: Number(editCategory.id),
      categoryName: editCategory.editName,
    };
    api
      .put(`admin/community/category`, { ...edit })
      .then((result) => {
        console.log(result, "put categoryname success");

        api
          .get(`/admin/community/category`)
          .then((result) => {
            setCategory(result.data);

            const freeze = JSON.parse(JSON.stringify(result.data));
            setFreezeCategory(freeze);

            setLoading(false);
          })
          .catch((error) => {
            console.log(error);
            setLoading(false);
          });

        setEditCategory({ id: "", editName: "", categoryName: "" });
      })
      .catch((error) => {
        console.log(error);

        setLoading(false);
      });
  };

  useEffect(() => {
    submitSearchBoard(false);
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
          reset: () =>
            setSearch({
              word: "",
              startDate: "",
              endDate: "",
              category: "",
            }),
          submit: () => {
            submitSearchBoard(true);
            setPerPage((prev) => {
              return { ...prev, page: 1 };
            });
          },
          // disabled: search.word === "",
        }}
        additionalArea={
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center w-full gap-4 ">
              <div className="mr-4 text-xl font-bold min-w-24 max-xl:text-sm">
                카테고리
              </div>
              <select
                className="rounded-none select-bordered select select-sm max-xl:select-xs"
                onChange={(e) =>
                  setSearch((prev) => {
                    return {
                      ...prev,
                      category: e.target.value === "전체" ? "" : e.target.value,
                    };
                  })
                }
              >
                <option>전체</option>
                {category?.map((item) => {
                  return (
                    <option key={`${item.id}-${item.categoryName}`}>
                      {item.categoryName}
                    </option>
                  );
                })}
              </select>
              <div
                className="underline link max-xl:text-sm"
                onClick={() => setOpenCategory(true)}
              >
                카테고리 관리
              </div>
            </div>
          </div>
        }
      />
      <Table
        tableTitle={`조회 ${boardData?.totalCount || "0"} 건`}
        data={boardData?.boards || []}
        addedMap={addedMap}
        checkable={{ active: false, multi: false, setter: () => {} }}
        trOptions={{
          tbody: {
            className: () => "hover:bg-gray-300",

            dbClickFunc: (board: { id: string }) => {
              route(`/community/board/detail?id=${board.id}`);
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
        id="post-detail-category"
        open={openCategory}
        closeFunc={() => {
          if (deleteCategory === "") {
            setOpenCategory(false);
            setDeleteCategory("");
          } else {
            setDeleteCategory("");
          }
        }}
      >
        <div className="mb-6 text-xl font-bold max-sm:text-base">
          카테고리 관리
        </div>
        <ul className="grid grid-cols-1 gap-2">
          {category.map((item, index) => {
            return (
              <li
                key={`${item}-${index}`}
                className="flex items-center justify-between col-span-1 gap-2 p-2 border rounded cursor-pointer border-primary"
                // draggable={
                //   editCategory.categoryName === "" && !addCategory.active
                // }
                draggable
                onDragStart={() => {
                  setEditCategory((prev) => {
                    return { ...prev, categoryName: "", id: "", editName: "" };
                  });
                  setCategoryDrag((prev) => {
                    return {
                      ...prev,
                      start: index,
                    };
                  });
                }}
                onDragEnter={() => {
                  setCategoryDrag((prev) => {
                    return {
                      ...prev,
                      beforeChanged: index,
                    };
                  });

                  if (categoryDrag.beforeChanged !== index) {
                    const copy = [...category];

                    copy[index] = category[categoryDrag.start];
                    copy[index].sequence =
                      category[categoryDrag.start].sequence;

                    copy[categoryDrag.start] = category[index];
                    copy[categoryDrag.start].sequence =
                      category[index].sequence;

                    setCategory(copy);
                    setCategoryDrag((prev) => {
                      return {
                        ...prev,
                        start: index,
                      };
                    });
                  }
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                }}
              >
                <div className="flex items-center flex-auto gap-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className={`size-5 ${
                      editCategory.categoryName === item.categoryName
                        ? "hidden"
                        : ""
                    }`}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
                    />
                  </svg>
                  <input
                    type="text"
                    className={`min-w-56 ${
                      editCategory.categoryName === item.categoryName
                        ? ""
                        : "hidden"
                    } input input-sm input-ghost w-full max-sm:input-xs`}
                    placeholder="카테고리 이름을 입력해주세요."
                    value={editCategory.editName}
                    onChange={(e) => {
                      setEditCategory((prev) => {
                        return {
                          ...prev,
                          editName: e.target.value,
                          id: String(item.id),
                        };
                      });
                    }}
                  />
                  <div
                    className={`${
                      editCategory.categoryName === item.categoryName
                        ? "hidden"
                        : ""
                    } `}
                  >
                    {item.categoryName}&nbsp;
                    {index === 0 ? "default" : ""}
                  </div>
                </div>

                {editCategory.categoryName === item.categoryName ? (
                  <div className="flex gap-2">
                    <button
                      className="rounded-none btn-outline btn btn-sm btn-primary max-sm:btn-xs"
                      onClick={() =>
                        setEditCategory((prev) => {
                          return {
                            ...prev,
                            categoryName: "",
                            editName: "",
                            id: "",
                          };
                        })
                      }
                    >
                      취소
                    </button>
                    <button
                      className="rounded-none btn btn-sm btn-primary max-sm:btn-xs"
                      onClick={() => submitEditCategoryName()}
                    >
                      저장
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <button
                      className="rounded-none btn-outline btn btn-sm btn-primary max-sm:btn-xs"
                      onClick={() =>
                        setEditCategory((prev) => {
                          return {
                            ...prev,
                            categoryName: String(item.categoryName),
                            id: String(item.id),
                          };
                        })
                      }
                    >
                      수정
                    </button>
                    <button
                      className="rounded-none btn btn-sm btn-primary max-sm:btn-xs"
                      onClick={() => {
                        setDeleteCategory(String(item.id));
                      }}
                    >
                      삭제
                    </button>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
        {addCategory.active && (
          <div className="flex items-center justify-between col-span-1 gap-2 p-2 mt-2 border rounded border-primary">
            <div className="flex items-center flex-auto gap-4">
              <input
                type="text"
                className={`min-w-56  input input-sm input-ghost w-full max-sm:input-xs`}
                placeholder="카테고리 이름을 입력해주세요."
                onChange={(e) => {
                  setAddCategory((prev) => {
                    return { ...prev, categoryName: e.target.value };
                  });
                }}
              />
            </div>
            <div className="flex gap-2">
              <button
                className="rounded-none btn btn-sm btn-outline btn-primary max-sm:btn-xs"
                onClick={() =>
                  setAddCategory((prev) => {
                    return { ...prev, active: false, categoryName: "" };
                  })
                }
              >
                취소
              </button>
              <button
                className="rounded-none btn btn-sm btn-primary max-sm:btn-xs"
                onClick={() => submitAddCategory()}
              >
                저장
              </button>
            </div>
          </div>
        )}

        {!addCategory.active && (
          <div
            className="inline-flex mt-4 font-bold cursor-pointer"
            onClick={() =>
              setAddCategory((prev) => {
                return { ...prev, active: true };
              })
            }
          >
            + 카테고리 추가
          </div>
        )}

        <div className="flex justify-center gap-2 mt-10">
          <button
            className="rounded-none btn btn-outline btn-primary btn-sm"
            disabled={isEqual(category, freezeCategory)}
            onClick={() => setCategory(freezeCategory)}
          >
            초기화
          </button>
          <button
            className="rounded-none btn btn-primary btn-sm"
            disabled={isEqual(category, freezeCategory)}
            onClick={() => {
              submitEditCategorySeq();
            }}
          >
            저장
          </button>
        </div>
      </Modal>

      <Alert
        id="post-detail-alert"
        title="카테고리 삭제"
        open={deleteCategory !== ""}
        text={`${
          category.filter((item) => String(item.id) === deleteCategory)[0]
            ?.categoryName
        } 카테고리를 삭제하시겠습니까? 삭제 시 복구 할 수 없으며\n해당 카테고리 내 포함한 모든 게시글은 일상 카테고리로 이동합니다.`}
        buttons={[
          {
            style: "rounded-none",
            func: () => setDeleteCategory(""),
            disabled: false,
            text: "취소",
          },
          {
            style: "rounded-none btn-error",
            func: () => {
              submitDeleteCategory();
            },
            disabled: false,
            text: "삭제",
          },
        ]}
      />
    </div>
  );
}

export default index;
