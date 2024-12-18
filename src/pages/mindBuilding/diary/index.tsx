import Table from "#/components/Table";
import TableExtensionHeader from "#/components/TableExtensionHeader";
import { TableStateTypes } from "#/data/types/components";
import api from "#/library/axios/api";
import { loadingState } from "#/library/recoil/atoms/loadingState";
import useCollegeState from "#/library/recoil/hook/useCollegeState";
import useLoadingState from "#/library/recoil/hook/useLoadingState";
import { makeExcel } from "#/utils/useExcelJs";
import { filter, find, includes, map, remove } from "lodash";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

function index() {
  const [perPage, setPerPage] = useState({
    page: 1,
    perPage: 20,
    pageLength: 1,
  });
  const [search, setSearch] = useState<{
    [key: string]: string | number | string[];
  }>({
    together: [],
  });
  const [diaryData, setDiaryData] = useState<TableStateTypes>();
  const { setLoading } = useLoadingState();
  const addedMap = [
    ["id", "일기 고유 id"],
    ["userId", "UID"],
    ["userName", "이름"],
    ["collegeName", "대학교"],
    ["diaryDate", "일기 일자"],
    ["feeling", "감정"],
    ["together", "함께"],
    ["createdAt", "작성일시"],
    ["updatedAt", "수정일시"],
  ];

  const feelingList = [
    "행복해",
    "기뻐",
    "설레",
    "편안해",
    "그저 그래",
    "힘들어",
    "우울해",
    "슬퍼",
    "지루해",
    "짜증나",
    "화나",
    "외로워",
    "무서워",
    "당황스러워",
  ];

  const togetherList = ["가족", "친구", "연인", "지인", "혼자", "반려동물"];
  const { state, setColleges } = useCollegeState();
  const [collegeData, setCollegeData] =
    useState<{ [key: string]: string | number | boolean | null }[]>();
  useEffect(() => {
    // if (state.colleges.length === 0) {
    //   setLoading(true);
    //   api
    //     .get("/admin/college")
    //     .then((result) => {
    //       setCollegeData(result.data);
    //       setColleges(result.data);
    //       setLoading(false);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //       setLoading(false);
    //     });
    // } else {
    //   setCollegeData(state.colleges);
    //   setLoading(false);
    // }
    setCollegeData(state.colleges);
  }, [perPage.perPage, perPage.page, state]);

  const submitSearchDiary = (isSubmit: boolean) => {
    // setLoading(true);

    // api
    //   .get(`/admin/diary`, {
    //     params: {
    //       searchWord: search.word,
    //       page: isSubmit ? 1 : perPage.page,
    //       pageSize: perPage.perPage,
    //       searchStartDate: search.startDate,
    //       searchEndDate: search.endDate,
    //       gender: search.gender,
    //       together: search.together,
    //       feeling: search.feeling,
    //       collegeId: search.collegeId,
    //     },
    //   })
    //   .then((result) => {
    //     const { totalCount } = result.data;

    //     setDiaryData((prev) => {
    //       return {
    //         ...prev,
    //         totalCount: totalCount,
    //         diaries: result.data.diaries,
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
      totalCount: 213,
      diaries: [
        {
          id: 340,
          userId: 29,
          userName: "카고임",
          collegeName: "경희대학교(본교)",
          diaryDate: "2024-12-01",
          feeling: "행복해",
          together: null,
          createdAt: "2024-12-09 17:34:52",
          updatedAt: "2024-12-09 17:35:23",
        },
        {
          id: 339,
          userId: 29,
          userName: "카고임",
          collegeName: "경희대학교(본교)",
          diaryDate: "2024-12-08",
          feeling: "슬퍼",
          together: null,
          createdAt: "2024-12-09 16:25:12",
          updatedAt: "2024-12-09 16:25:12",
        },
        {
          id: 338,
          userId: 29,
          userName: "카고임",
          collegeName: "경희대학교(본교)",
          diaryDate: "2024-12-09",
          feeling: "지루해",
          together: ["지인", "연인"],
          createdAt: "2024-12-09 16:24:36",
          updatedAt: "2024-12-09 16:24:50",
        },
        {
          id: 331,
          userId: 29,
          userName: "카고임",
          collegeName: "경희대학교(본교)",
          diaryDate: "2024-12-08",
          feeling: "설레",
          together: null,
          createdAt: "2024-12-09 14:57:52",
          updatedAt: "2024-12-09 14:57:52",
        },
        {
          id: 325,
          userId: 29,
          userName: "카고임",
          collegeName: "경희대학교(본교)",
          diaryDate: "2024-12-09",
          feeling: "행복해",
          together: ["가족"],
          createdAt: "2024-12-09 14:17:32",
          updatedAt: "2024-12-09 15:15:42",
        },
        {
          id: 323,
          userId: 29,
          userName: "카고임",
          collegeName: "경희대학교(본교)",
          diaryDate: "2024-11-20",
          feeling: "지루해",
          together: ["반려동물"],
          createdAt: "2024-11-15 09:36:44",
          updatedAt: "2024-12-09 17:23:18",
        },
        {
          id: 321,
          userId: 29,
          userName: "카고임",
          collegeName: "경희대학교(본교)",
          diaryDate: "2024-10-01",
          feeling: "우울해",
          together: null,
          createdAt: "2024-10-22 14:02:42",
          updatedAt: "2024-10-22 14:02:42",
        },
        {
          id: 320,
          userId: 29,
          userName: "카고임",
          collegeName: "경희대학교(본교)",
          diaryDate: "2024-10-06",
          feeling: "설레",
          together: null,
          createdAt: "2024-10-22 13:59:54",
          updatedAt: "2024-10-22 13:59:54",
        },
        {
          id: 319,
          userId: 29,
          userName: "카고임",
          collegeName: "경희대학교(본교)",
          diaryDate: "2024-10-12",
          feeling: "슬퍼",
          together: null,
          createdAt: "2024-10-22 13:58:00",
          updatedAt: "2024-10-22 13:58:00",
        },
        {
          id: 318,
          userId: 29,
          userName: "카고임",
          collegeName: "경희대학교(본교)",
          diaryDate: "2024-10-21",
          feeling: "설레",
          together: null,
          createdAt: "2024-10-22 13:53:11",
          updatedAt: "2024-10-22 13:53:11",
        },
        {
          id: 317,
          userId: 29,
          userName: "카고임",
          collegeName: "경희대학교(본교)",
          diaryDate: "2024-10-16",
          feeling: "편안해",
          together: null,
          createdAt: "2024-10-22 13:47:57",
          updatedAt: "2024-10-22 13:47:57",
        },
        {
          id: 316,
          userId: 29,
          userName: "카고임",
          collegeName: "경희대학교(본교)",
          diaryDate: "2024-10-10",
          feeling: "설레",
          together: null,
          createdAt: "2024-10-22 13:43:18",
          updatedAt: "2024-10-22 13:43:18",
        },
        {
          id: 315,
          userId: 29,
          userName: "카고임",
          collegeName: "경희대학교(본교)",
          diaryDate: "2024-10-14",
          feeling: "설레",
          together: null,
          createdAt: "2024-10-16 18:07:24",
          updatedAt: "2024-10-16 18:07:24",
        },
        {
          id: 314,
          userId: 29,
          userName: "카고임",
          collegeName: "경희대학교(본교)",
          diaryDate: "2024-10-08",
          feeling: "설레",
          together: ["가족"],
          createdAt: "2024-10-16 17:46:52",
          updatedAt: "2024-10-16 17:46:52",
        },
        {
          id: 313,
          userId: 29,
          userName: "카고임",
          collegeName: "경희대학교(본교)",
          diaryDate: "2024-10-09",
          feeling: "지루해",
          together: null,
          createdAt: "2024-10-16 10:43:41",
          updatedAt: "2024-10-16 10:43:41",
        },
        {
          id: 312,
          userId: 29,
          userName: "카고임",
          collegeName: "경희대학교(본교)",
          diaryDate: "2024-10-09",
          feeling: "설레",
          together: ["연인"],
          createdAt: "2024-10-16 10:43:02",
          updatedAt: "2024-10-16 10:43:02",
        },
        {
          id: 310,
          userId: 29,
          userName: "카고임",
          collegeName: "경희대학교(본교)",
          diaryDate: "2024-09-10",
          feeling: "설레",
          together: null,
          createdAt: "2024-10-10 18:44:25",
          updatedAt: "2024-10-10 18:44:25",
        },
        {
          id: 309,
          userId: 29,
          userName: "카고임",
          collegeName: "경희대학교(본교)",
          diaryDate: "2024-09-22",
          feeling: "행복해",
          together: null,
          createdAt: "2024-09-24 14:53:37",
          updatedAt: "2024-09-24 14:53:37",
        },
        {
          id: 306,
          userId: 29,
          userName: "카고임",
          collegeName: "경희대학교(본교)",
          diaryDate: "2024-09-23",
          feeling: "편안해",
          together: null,
          createdAt: "2024-09-23 20:23:02",
          updatedAt: "2024-09-23 20:23:02",
        },
        {
          id: 304,
          userId: 18,
          userName: "버거왕",
          collegeName: "서울대학교(본교)",
          diaryDate: "2024-09-19",
          feeling: "힘들어",
          together: null,
          createdAt: "2024-09-19 22:56:48",
          updatedAt: "2024-09-19 22:56:48",
        },
      ],
    };
    const { totalCount } = dummyResult;

    setDiaryData((prev) => {
      return {
        ...prev,
        totalCount: totalCount,
        diaries: dummyResult.diaries,
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
    submitSearchDiary(false);
  }, [perPage.page, perPage.perPage]);

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
          active: true,

          reset: () =>
            setSearch({
              together: [],
            }),
          submit: () => {
            submitSearchDiary(true);
            setPerPage((prev) => {
              return { ...prev, page: 1 };
            });
          },
        }}
        additionalArea={
          <div className="flex flex-wrap items-center w-full gap-6">
            <div className="flex flex-auto gap-4">
              <div className="mr-4 text-xl font-bold min-w-24 max-xl:text-sm">
                감정
              </div>
              <select
                className="rounded-none join-item select-sm select select-bordered max-xl:select-xs"
                onChange={(e) => {
                  setSearch((prev) => {
                    return { ...prev, feeling: e.target.value };
                  });
                }}
              >
                <option value="">전체</option>
                {map(feelingList, (item, index) => {
                  return (
                    <option value={item} key={`${item}-${index}`}>
                      {item}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="flex flex-auto gap-4">
              <div className="mr-4 text-xl font-bold min-w-24 max-xl:text-sm">
                학교
              </div>
              <select
                className="rounded-none select-bordered select select-sm max-xl:select-xs"
                onChange={(e) =>
                  setSearch((prev) => {
                    return { ...prev, collegeId: e.target.value };
                  })
                }
                value={String(
                  find(collegeData, { id: Number(search.collegeId) })?.id
                )}
              >
                <option value="">전체</option>
                {map(
                  collegeData,
                  (item: { [key: string]: string | number }, index: number) => {
                    return (
                      <option
                        key={`${item.collegeName}-${index}`}
                        value={item.id}
                      >
                        {item.collegeName}
                        {`(${item.campus})`}
                      </option>
                    );
                  }
                )}
              </select>
            </div>
            <div>
              <div className="flex flex-wrap items-center flex-auto gap-4">
                <div className="mr-4 text-xl font-bold min-w-24 max-xl:text-sm">
                  함께
                </div>

                <div className="flex flex-wrap flex-auto gap-4">
                  {map(togetherList, (item, index) => {
                    return (
                      <label
                        className="flex gap-2 cursor-pointer label"
                        key={`${item}-${index}`}
                      >
                        <input
                          type="checkbox"
                          name="with"
                          className="checkbox max-sm:checkbox-sm"
                          checked={includes(search.together as string[], item)}
                          onChange={() => {
                            const copy = [...(search.together as string[])];
                            includes(search.together as string[], item)
                              ? remove(copy, (copyItem) => {
                                  return copyItem === item;
                                })
                              : copy.push(item);

                            setSearch((prev) => {
                              return { ...prev, together: copy };
                            });
                          }}
                        />
                        <span className="label-text max-sm:text-xs">
                          {item}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        }
      />
      <Table
        tableTitle={`조회 ${diaryData?.totalCount || "0"} 건`}
        checkable={{ active: false, multi: false, setter: () => {} }}
        data={diaryData?.diaries || []}
        addedMap={addedMap}
        buttons={
          <button
            className="rounded-none btn btn-sm btn-primary max-sm:btn-xs"
            onClick={() =>
              makeExcel({
                sheetName: "diary",
                data: diaryData?.diaries || [],
                addedMap: addedMap,
              })
            }
          >
            다운로드
          </button>
        }
        tdOptions={{
          together: {
            el: (item: string[]) => {
              return <>{item ? String(item) : "-"}</>;
            },
          },
          gender: {
            el: (item: string) => {
              return <>{item === "Male" ? "남성" : "여성"}</>;
            },
          },
        }}
        trOptions={{
          tbody: {
            className: () => "hover:bg-gray-300",
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
