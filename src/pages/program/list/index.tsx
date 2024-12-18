import Table from "#/components/Table";
import TableExtensionHeader from "#/components/TableExtensionHeader";
import { TdObjTypes } from "#/data/types/components";
import api from "#/library/axios/api";
import useCollegeState from "#/library/recoil/hook/useCollegeState";
import useLoadingState from "#/library/recoil/hook/useLoadingState";
import { find, forEach, map } from "lodash";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function index() {
  const route = useNavigate();
  const { setLoading } = useLoadingState();
  const [search, setSearch] = useState({
    word: "",
    startDate: "",
    endDate: "",
    collegeId: "",
    activityStatus: "",
    programId: "",
    // isAllowedPush: "",
    // isAllowedEmail: "",
  });
  const [perPage, setPerPage] = useState({
    page: 1,
    perPage: 20,
    pageLength: 1,
  });

  const addedMap = [
    ["id", "내역 ID"],
    ["userId", "유저 ID"],
    ["userName", "이름"],
    ["collegeName", "학교"],
    ["programId", "프로그램 ID"],
    ["title", "프로그램명"],
    ["userSequence", "회차"],
    ["activityStatus", "진행상태"],
    ["createdAt", "참여일시"],
    ["completedAt", "완료일시"],
  ];
  const additionalTrOptions = {
    colSpanStarter: {
      userId: {
        title: "참여자 정보",
        colSpan: 3,
      },
      programId: {
        title: "프로그램 정보",
        colSpan: 2,
      },
    },
    colSpanTarget: ["userId", "userName", "collegeName", "programId", "title"],
  };

  const [programData, setProgramData] = useState([]);

  const submitSearchProgram = (isSubmit: boolean) => {
    // setLoading(true);

    // api
    //   .get(`/admin/program-user`, {
    //     params: {
    //       page: isSubmit ? 1 : perPage.page,
    //       pageSize: perPage.perPage,
    //       searchWord: search.word,
    //       // memberStatus: search.memberStatus,
    //       searchStartDate: search.startDate,
    //       searchEndDate: search.endDate,
    //       collegeId: search.collegeId,
    //       programId: search.programId,
    //       activityStatus: search.activityStatus,
    //       // isAllowedPush: allowedAllCase ? "" : allowedPushRef.current?.checked,
    //       // isAllowedEmail: allowedAllCase
    //       // ? ""
    //       // : allowedEmailRef.current?.checked,
    //     },
    //   })
    //   .then((result) => {
    //     const { totalCount } = result.data;

    //     const copy = forEach(result.data.programs, (item) => {
    //       if (item.completedAt === null) {
    //         item.activityStatus = "inProgress";
    //       } else {
    //         item.activityStatus = "completed";
    //       }
    //     });
    //     setProgramData(result.data.programs);
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
      totalCount: 3,
      programs: [
        {
          id: 3,
          userId: 30,
          userName: "배찬희",
          collegeName: "서울대학교(본교)",
          programId: 1,
          title: "마음운동",
          userSequence: 1,
          createdAt: "2024-12-05 15:32:40",
          completedAt: null,
        },
        {
          id: 2,
          userId: 31,
          userName: "tester",
          collegeName: "한신대학교(본교)",
          programId: 1,
          title: "마음운동",
          userSequence: 1,
          createdAt: "2024-11-19 12:18:58",
          completedAt: null,
        },
        {
          id: 1,
          userId: 53,
          userName: "이형래래",
          collegeName: "서울대학교(본교)",
          programId: 1,
          title: "마음운동",
          userSequence: 1,
          createdAt: "2024-11-19 12:08:46",
          completedAt: null,
        },
      ],
    };
    const { totalCount } = dummyResult;

    setProgramData(dummyResult.programs);
    setPerPage((prev) => {
      return {
        ...prev,
        pageLength: Math.ceil(totalCount / prev.perPage),
      };
    });
  };
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

  useEffect(() => {
    submitSearchProgram(false);
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
          reset: () => {
            setSearch({
              word: "",
              startDate: "",
              endDate: "",
              // memberStatus: "",
              collegeId: "",
              activityStatus: "",
              programId: "",
              // isAllowedPush: "",
              // isAllowedEmail: "",
            });
          },
          submit: () => {
            submitSearchProgram(true);
            setPerPage((prev) => {
              return { ...prev, page: 1 };
            });
          },
        }}
        additionalArea={
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center w-full gap-4 ">
              <div className="flex flex-wrap items-center gap-4">
                <div className="mr-4 text-xl font-bold min-w-24 max-xl:text-sm">
                  프로그램
                </div>
                <select
                  className="rounded-none select-bordered select select-sm max-xl:select-xs"
                  onChange={(e) =>
                    setSearch((prev) => {
                      return { ...prev, programId: e.target.value };
                    })
                  }
                  // value={String(
                  //   find(collegeData, { id: Number(search.collegeId) })?.id
                  // )}
                >
                  <option value="">전체</option>
                  <option value="">마음운동</option>

                  {/* {map(
                    collegeData,
                    (
                      item: { [key: string]: string | number },
                      index: number
                    ) => {
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
                  )} */}
                </select>
              </div>

              <div className="flex flex-wrap items-center gap-4 ml-auto">
                <div className="mr-4 text-xl font-bold max-xl:text-sm">
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
                    (
                      item: { [key: string]: string | number },
                      index: number
                    ) => {
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
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <div className="mr-4 text-xl font-bold min-w-24 max-xl:text-sm">
                진행상태
              </div>
              <select
                className="rounded-none select-bordered select select-sm max-xl:select-xs"
                onChange={(e) =>
                  setSearch((prev) => {
                    return { ...prev, activityStatus: e.target.value };
                  })
                }
                // value={String(
                //   find(collegeData, { id: Number(search.collegeId) })?.id
                // )}
              >
                <option value="">전체</option>
                <option value="InProgress">진행중</option>
                <option value="Completed">완료</option>

                {/* {map(
                    collegeData,
                    (
                      item: { [key: string]: string | number },
                      index: number
                    ) => {
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
                  )} */}
              </select>
            </div>
          </div>
        }
      />

      <Table
        checkable={{ active: false, multi: false, setter: () => {} }}
        data={programData || []}
        perPageOptions={{
          page: perPage.page,
          perPage: perPage.perPage,
          pageLength: perPage.pageLength,
          setPerPage: setPerPage,
        }}
        addedMap={addedMap}
        additionalTrOptions={additionalTrOptions}
        trOptions={{
          tbody: {
            className: () => "hover:bg-gray-300",
            dbClickFunc: (item: TdObjTypes) => {
              console.log("dbClicked", item);

              route(`/program/list/detail?id=${item.id}`);
            },
          },
        }}
        tdOptions={{
          completedAt: {
            el: (item: null | string) => {
              return <span>{item === null ? "-" : item}</span>;
            },
          },
          activityStatus: {
            el: (item: string) => {
              return <span>{item === "inProgress" ? "진행중" : "완료"}</span>;
            },
          },
        }}
        buttons={
          <button
            className="rounded-none btn btn-sm btn-primary max-sm:btn-xs"
            // onClick={() =>
            //   makeExcel({
            //     sheetName: "members",
            //     data: userData?.members || [],
            //     addedMap: addedMap,
            //   })
            // }
          >
            다운로드
          </button>
        }
      />
    </div>
  );
}

export default index;
