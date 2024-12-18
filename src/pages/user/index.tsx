import Table from "../../components/Table";
import { useEffect, useRef, useState } from "react";
import TableExtensionHeader from "#/components/TableExtensionHeader";
import { useNavigate } from "react-router-dom";
import useLoadingState from "#/library/recoil/hook/useLoadingState";
import api from "#/library/axios/api";
import { TableStateTypes } from "#/data/types/components";
import { makeExcel } from "#/utils/useExcelJs";
import { find, map } from "lodash";
import useCollegeState from "#/library/recoil/hook/useCollegeState";

function index() {
  const [userData, setUserData] = useState<TableStateTypes>();

  const allowedEmailRef = useRef<HTMLInputElement | null>(null);
  const allowedPushRef = useRef<HTMLInputElement | null>(null);

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
    memberStatus: "",
    collegeId: "",
    isAllowedPush: "",
    isAllowedEmail: "",
  });

  const [allowedAllCase, setAllowedAllCase] = useState(true);

  const addedMap = [
    ["id", "UID"],
    ["userName", "이름"],
    ["collegeName", "학교"],
    ["email", "이메일"],
    ["isAllowedPush", "앱 알림"],
    ["isAllowedEmail", "이메일"],
    ["createdAt", "가입일시"],
    ["memberStatus", "가입상태"],
  ];

  const additionalTrOptions = {
    colSpanStarter: {
      isAllowedPush: {
        title: "동의 채널",
        colSpan: 2,
      },
    },
    colSpanTarget: ["isAllowedPush", "isAllowedEmail"],
  };

  const route = useNavigate();

  const submitSearchMember = (isSubmit: boolean) => {
    // setLoading(true);

    // api
    //   .get(`/admin/member`, {
    //     params: {
    //       page: isSubmit ? 1 : perPage.page,
    //       pageSize: perPage.perPage,
    //       searchWord: search.word,
    //       memberStatus: search.memberStatus,
    //       searchStartDate: search.startDate,
    //       searchEndDate: search.endDate,
    //       collegeId: search.collegeId,
    //       isAllowedPush: allowedAllCase ? "" : allowedPushRef.current?.checked,
    //       isAllowedEmail: allowedAllCase
    //         ? ""
    //         : allowedEmailRef.current?.checked,
    //     },
    //   })
    //   .then((result) => {
    //     const { totalCount } = result.data;

    //     setUserData(result.data);
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
      totalCount: 43,
      members: [
        {
          id: 2,
          userName: null,
          collegeName: "한신대학교(본교)",
          email: "jjh@ac.kr",
          createdAt: "2024-08-05 17:22:05",
          memberStatus: "SignedUp",
          isAllowedPush: true,
          isAllowedEmail: true,
        },
        {
          id: 3,
          userName: null,
          collegeName: "한신대학교(본교)",
          email: "jjh@seoil.ac.kr",
          createdAt: "2024-08-05 17:25:08",
          memberStatus: "SignedUp",
          isAllowedPush: true,
          isAllowedEmail: true,
        },
        {
          id: 8,
          userName: null,
          collegeName: "한신대학교(본교)",
          email: "jjaah@seoil.ac.kr",
          createdAt: "2024-08-06 07:19:43",
          memberStatus: "SignedUp",
          isAllowedPush: true,
          isAllowedEmail: true,
        },
        {
          id: 14,
          userName: null,
          collegeName: "서일대학교(본교)",
          email: "jjh@andreia.kr",
          createdAt: "2024-08-06 07:31:41",
          memberStatus: "SignedUp",
          isAllowedPush: true,
          isAllowedEmail: true,
        },
        {
          id: 15,
          userName: "정주현",
          collegeName: "서일대학교(본교)",
          email: "jhjung@andreia.kr",
          createdAt: "2024-08-06 07:32:49",
          memberStatus: "Withdrawn",
          isAllowedPush: true,
          isAllowedEmail: true,
        },
        {
          id: 16,
          userName: "",
          collegeName: "서울대학교(본교)",
          email: "jhjung@andreia.kr",
          createdAt: "2024-08-07 07:28:51",
          memberStatus: "Withdrawn",
          isAllowedPush: true,
          isAllowedEmail: true,
        },
        {
          id: 17,
          userName: "",
          collegeName: "서울대학교(본교)",
          email: "jhjung@andreia.kr",
          createdAt: "2024-08-07 07:32:42",
          memberStatus: "Withdrawn",
          isAllowedPush: true,
          isAllowedEmail: true,
        },
        {
          id: 18,
          userName: "버거왕",
          collegeName: "서울대학교(본교)",
          email: "jhjung@andreia.kr",
          createdAt: "2024-08-07 07:52:35",
          memberStatus: "Member",
          isAllowedPush: true,
          isAllowedEmail: true,
        },
        {
          id: 26,
          userName: "김훈직",
          collegeName: "백제예술대학교(본교)",
          email: "mariagerabbit@naver.com",
          createdAt: "2024-08-07 13:39:23",
          memberStatus: "Withdrawn",
          isAllowedPush: false,
          isAllowedEmail: false,
        },
        {
          id: 27,
          userName: null,
          collegeName: "상명대학교(제2캠퍼)",
          email: "mariagerabbi@naver.com",
          createdAt: "2024-08-12 06:34:33",
          memberStatus: "SignedUp",
          isAllowedPush: true,
          isAllowedEmail: true,
        },
        {
          id: 28,
          userName: "김훈직",
          collegeName: "숙명여자대학교(본교)",
          email: "mariagerabbit@naver.com",
          createdAt: "2024-08-14 15:07:10",
          memberStatus: "Withdrawn",
          isAllowedPush: true,
          isAllowedEmail: true,
        },
        {
          id: 29,
          userName: "카고임",
          collegeName: "경희대학교(본교)",
          email: "hanehdgur@naver.com",
          createdAt: "2024-08-19 17:34:36",
          memberStatus: "Member",
          isAllowedPush: true,
          isAllowedEmail: true,
        },
        {
          id: 30,
          userName: "배찬희",
          collegeName: "서울대학교(본교)",
          email: "henry@andreia.kr",
          createdAt: "2024-08-22 10:05:01",
          memberStatus: "Member",
          isAllowedPush: true,
          isAllowedEmail: true,
        },
        {
          id: 31,
          userName: "tester",
          collegeName: "한신대학교(본교)",
          email: "matthew@andreia.kr",
          createdAt: "2024-08-27 07:43:40",
          memberStatus: "Member",
          isAllowedPush: true,
          isAllowedEmail: true,
        },
        {
          id: 32,
          userName: "바보",
          collegeName: "연세대학교(본교)",
          email: "sahonmu@naver.com",
          createdAt: "2024-09-10 13:58:15",
          memberStatus: "Withdrawn",
          isAllowedPush: true,
          isAllowedEmail: true,
        },
        {
          id: 33,
          userName: "Kaco",
          collegeName: "경희대학교(본교)",
          email: "dhhan@andreia.kr",
          createdAt: "2024-09-11 16:58:44",
          memberStatus: "Withdrawn",
          isAllowedPush: true,
          isAllowedEmail: true,
        },
        {
          id: 34,
          userName: "Kaco",
          collegeName: "경희대학교(본교)",
          email: "dhhan@andreia.kr",
          createdAt: "2024-09-11 17:36:02",
          memberStatus: "Withdrawn",
          isAllowedPush: true,
          isAllowedEmail: true,
        },
        {
          id: 35,
          userName: null,
          collegeName: "한림대학교(본교)",
          email: "tjkeum@ac.kr",
          createdAt: "2024-09-12 10:43:54",
          memberStatus: "SignedUp",
          isAllowedPush: true,
          isAllowedEmail: true,
        },
        {
          id: 36,
          userName: null,
          collegeName: "백석예술대학교(본교)",
          email: "tjkeum@andreia.com",
          createdAt: "2024-09-12 10:52:24",
          memberStatus: "SignedUp",
          isAllowedPush: true,
          isAllowedEmail: true,
        },
        {
          id: 37,
          userName: "금태종태종태종",
          collegeName: "백석예술대학교(본교)",
          email: "tjkeum@andreia.kr",
          createdAt: "2024-09-12 10:52:46",
          memberStatus: "Withdrawn",
          isAllowedPush: true,
          isAllowedEmail: true,
        },
      ],
    };
    const { totalCount } = dummyResult;

    setUserData(dummyResult);
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
    submitSearchMember(false);
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
          active: true,

          reset: () => {
            setSearch({
              word: "",
              startDate: "",
              endDate: "",
              memberStatus: "",
              collegeId: "",
              isAllowedPush: "",
              isAllowedEmail: "",
            });
          },
          submit: () => {
            submitSearchMember(true);
            setPerPage((prev) => {
              return { ...prev, page: 1 };
            });
          },
        }}
        additionalArea={
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center w-full gap-4 ">
              <div className="mr-4 text-xl font-bold min-w-24 max-xl:text-sm">
                가입상태
              </div>
              <label className="flex gap-2 cursor-pointer label">
                <input
                  type="radio"
                  name="memberStatus"
                  className="radio radio-primary max-xl:radio-sm"
                  defaultChecked
                  onClick={() =>
                    setSearch((prev) => {
                      return { ...prev, memberStatus: "" };
                    })
                  }
                />
                <span className="label-text">전체</span>
              </label>
              <label className="flex gap-2 cursor-pointer label">
                <input
                  type="radio"
                  name="memberStatus"
                  className="radio radio-primary max-xl:radio-sm"
                  onClick={() =>
                    setSearch((prev) => {
                      return { ...prev, memberStatus: "SignedUp" };
                    })
                  }
                />
                <span className="label-text">가입</span>
              </label>
              <label className="flex gap-2 cursor-pointer label">
                <input
                  type="radio"
                  name="memberStatus"
                  className="radio radio-primary max-xl:radio-sm"
                  onClick={() =>
                    setSearch((prev) => {
                      return { ...prev, memberStatus: "Member" };
                    })
                  }
                />
                <span className="label-text">회원</span>
              </label>
              <label className="flex gap-2 cursor-pointer label">
                <input
                  type="radio"
                  name="memberStatus"
                  className="radio radio-primary max-xl:radio-sm"
                  onClick={() =>
                    setSearch((prev) => {
                      return { ...prev, memberStatus: "Withdrawn" };
                    })
                  }
                />
                <span className="label-text">탈퇴</span>
              </label>
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
            <div className="flex flex-wrap items-center w-full gap-4">
              <div className="mr-4 text-xl font-bold min-w-24 max-xl:text-sm">
                동의채널
              </div>
              <label className="flex gap-2 cursor-pointer label">
                <input
                  type="checkbox"
                  className="rounded-none checkbox checkbox-primary max-xl:checkbox-sm"
                  checked={
                    (search.isAllowedEmail === "" &&
                      search.isAllowedPush === "") ||
                    (search.isAllowedEmail === "false" &&
                      search.isAllowedPush === "false")
                  }
                  onChange={() => {
                    setSearch((prev) => {
                      return {
                        ...prev,
                        isAllowedPush: "",
                        isAllowedEmail: "",
                      };
                    });

                    if (allowedPushRef.current && allowedEmailRef.current) {
                      allowedPushRef.current.checked = false;
                      allowedEmailRef.current.checked = false;
                    }

                    setAllowedAllCase(true);
                  }}
                />
                <span className="label-text">전체</span>
              </label>
              <label className="flex gap-2 cursor-pointer label">
                <input
                  type="checkbox"
                  className="rounded-none checkbox checkbox-primary max-xl:checkbox-sm"
                  onChange={(e) => {
                    setSearch((prev) => {
                      return {
                        ...prev,
                        isAllowedPush: String(e.currentTarget.checked),
                      };
                    });
                    setAllowedAllCase(false);
                  }}
                  ref={allowedPushRef}
                />
                <span className="label-text">앱 알림</span>
              </label>
              <label className="flex gap-2 cursor-pointer label">
                <input
                  type="checkbox"
                  className="rounded-none checkbox checkbox-primary max-xl:checkbox-sm"
                  // checked={search.isAllowedEmail === "true"}
                  onChange={(e) => {
                    setSearch((prev) => {
                      return {
                        ...prev,
                        isAllowedEmail: String(e.currentTarget.checked),
                      };
                    });
                    setAllowedAllCase(false);
                  }}
                  ref={allowedEmailRef}
                />
                <span className="label-text">이메일</span>
              </label>
            </div>
          </div>
        }
      />
      <Table
        tableTitle={`조회 ${userData?.totalCount || "0"} 건`}
        data={userData?.members || []}
        addedMap={addedMap}
        tdOptions={{
          isAllowedPush: {
            el: (item: boolean) => {
              return <span>{item ? "V" : "-"}</span>;
            },
            func: () => {},
          },
          isAllowedEmail: {
            el: (item: boolean) => {
              return <span>{item ? "V" : "-"}</span>;
            },
            func: () => {},
          },

          memberStatus: {
            el: (item: string) => {
              return <span>{item}</span>;
            },
            func: () => {},
          },
          collegeName: {
            el: (item: string | null) => {
              if (item === null) {
                return <span>-</span>;
              }
              return item;
            },
          },
        }}
        additionalTrOptions={additionalTrOptions}
        trOptions={{
          tbody: {
            className: () => "hover:bg-gray-300",

            dbClickFunc: (obj: { id: string }) => {
              route(`/user/detail?id=${obj.id}`);
            },
          },
        }}
        perPageOptions={{
          page: perPage.page,
          perPage: perPage.perPage,
          pageLength: perPage.pageLength,
          setPerPage: setPerPage,
        }}
        buttons={
          <button
            className="rounded-none btn btn-sm btn-primary max-sm:btn-xs"
            onClick={() =>
              makeExcel({
                sheetName: "members",
                data: userData?.members || [],
                addedMap: addedMap,
              })
            }
          >
            다운로드
          </button>
        }
      />
    </div>
  );
}

export default index;
