import { Modal } from "#/components/Modal";
import Table from "#/components/Table";
import api from "#/library/axios/api";
import useLoadingState from "#/library/recoil/hook/useLoadingState";
import { openModal } from "#/utils/useModalHandler";
import { chunk, forEach, map } from "lodash";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function index() {
  const params = new URLSearchParams(location.search);

  const [blockingPerPage, setBlockingPerPage] = useState({
    page: 1,
    perPage: 20,
    pageLength: 1,
  });
  const [blockedPerPage, setBlockedPerPage] = useState({
    page: 1,
    perPage: 20,
    pageLength: 1,
  });
  const [psyPerPage, setPsyPerPage] = useState({
    page: 1,
    perPage: 5,
    pageLength: 1,
  });

  const [diaryPerPage, setDiaryPerPage] = useState({
    page: 1,
    perPage: 5,
    pageLength: 1,
  });

  const [programPerPage, setProgramPerPage] = useState({
    page: 1,
    perPage: 5,
    pageLength: 1,
  });
  const [userDetailData, setUserDetailData] = useState<{
    activity: { [key: string]: number };
    diary: { [key: string]: string | number | string[] }[];
    memberInfo: { [key: string]: string | number | boolean };
    psychologicalTest: { [key: string]: string | number | string[] }[];
    program: { [key: string]: string | number | string[] }[];
  }>();

  const [psychologicalTestData, setPsychologicalTestData] = useState<
    { [key: string]: string | number | string[] }[]
  >([]);

  const [userDiaryData, setUserDiaryData] = useState<
    { [key: string]: string | number | string[] }[]
  >([]);
  const [userProgramData, setUserProgramData] = useState<
    { [key: string]: string | number | string[] }[]
  >([]);

  const { setLoading } = useLoadingState();
  useEffect(() => {
    // setLoading(true);
    // api
    //   .get(`/admin/member/${params.get("id")}`)
    //   .then((result) => {
    //     const dummyResult = {
    //       memberInfo: {
    //         id: 18,
    //         userName: "버거왕",
    //         collegeName: "서울대학교(본교)",
    //         studentId: "sw34",
    //         major: "겆딘새",
    //         email: "jhjung@andreia.kr",
    //         createdAt: "2024-08-07 07:52:35",
    //         memberStatus: "Member",
    //         isAllowedPush: true,
    //         isAllowedEmail: true,
    //       },
    //       activity: {
    //         board: 20,
    //         boardComment: 102,
    //         blockingUser: 0,
    //         blockedUser: 0,
    //         reporting: 18,
    //         reported: 9,
    //       },
    //       diary: [
    //         {
    //           diaryDate: "2024-09-19",
    //           feeling: "힘들어",
    //           together: null,
    //           createdAt: "2024-09-19 22:56:48",
    //           updatedAt: "2024-09-19 22:56:48",
    //         },
    //         {
    //           diaryDate: "2024-09-18",
    //           feeling: "편안해",
    //           together: null,
    //           createdAt: "2024-09-19 22:51:50",
    //           updatedAt: "2024-09-19 22:51:50",
    //         },
    //         {
    //           diaryDate: "2024-09-19",
    //           feeling: "외로워",
    //           together: ["친구", "연인", "지인"],
    //           createdAt: "2024-09-19 22:42:52",
    //           updatedAt: "2024-09-19 22:42:52",
    //         },
    //         {
    //           diaryDate: "2024-08-24",
    //           feeling: "편안해",
    //           together: ["친구"],
    //           createdAt: "2024-09-13 10:03:57",
    //           updatedAt: "2024-09-13 10:03:57",
    //         },
    //         {
    //           diaryDate: "2024-09-08",
    //           feeling: "슬퍼",
    //           together: ["친구"],
    //           createdAt: "2024-09-13 10:03:30",
    //           updatedAt: "2024-09-13 10:03:42",
    //         },
    //       ],
    //       psychologicalTest: [
    //         {
    //           id: 240,
    //           session: 4,
    //           createdAt: "2024-09-11 07:10:46",
    //           gender: "Male",
    //           ageRange: 2,
    //           point: {
    //             "관계 영역": {
    //               대인민감성: 63.18,
    //               "대인관계 어려움": 52.13,
    //             },
    //             "학업 영역": {
    //               학업스트레스: 58.24,
    //               "전공적응 어려움": 52.24,
    //               "학업적응 어려움": 54.12,
    //             },
    //             "정신건강 영역": {
    //               PTSD: 54.99,
    //               강박: 75.89,
    //               불안: 65.06,
    //               우울: 58.89,
    //               신체화: 52.73,
    //               공황발작: 58.26,
    //             },
    //           },
    //           result: {
    //             "관계 영역": {
    //               overallResult: "주의",
    //               대인민감성: "주의",
    //               "대인관계 어려움": "안정",
    //             },
    //             "학업 영역": {
    //               overallResult: "주의",
    //               학업스트레스: "주의",
    //               "전공적응 어려움": "안정",
    //               "학업적응 어려움": "안정",
    //             },
    //             "정신건강 영역": {
    //               PTSD: "안정",
    //               강박: "위험",
    //               불안: "주의",
    //               우울: "안정",
    //               신체화: "안정",
    //               공황발작: "안정",
    //               overallResult: "위험",
    //             },
    //           },
    //           overallResult: "주의",
    //         },
    //         {
    //           id: 208,
    //           session: 3,
    //           createdAt: "2024-09-06 12:46:27",
    //           gender: "Male",
    //           ageRange: 2,
    //           point: {
    //             "관계 영역": {
    //               대인민감성: 66.51,
    //               "대인관계 어려움": 49.07,
    //             },
    //             "학업 영역": {
    //               학업스트레스: 55.71,
    //               "전공적응 어려움": 54.85,
    //               "학업적응 어려움": 50.98,
    //             },
    //             "정신건강 영역": {
    //               PTSD: 87.87,
    //               강박: 47.64,
    //               불안: 50.58,
    //               우울: 58.89,
    //               신체화: 57.61,
    //               공황발작: 86.7,
    //             },
    //           },
    //           result: {
    //             "관계 영역": {
    //               overallResult: "주의",
    //               대인민감성: "주의",
    //               "대인관계 어려움": "안정",
    //             },
    //             "학업 영역": {
    //               overallResult: "주의",
    //               학업스트레스: "주의",
    //               "전공적응 어려움": "안정",
    //               "학업적응 어려움": "안정",
    //             },
    //             "정신건강 영역": {
    //               PTSD: "위험",
    //               강박: "안정",
    //               불안: "안정",
    //               우울: "안정",
    //               신체화: "안정",
    //               공황발작: "위험",
    //               overallResult: "위험",
    //             },
    //           },
    //           overallResult: "주의",
    //         },
    //         {
    //           id: 207,
    //           session: 2,
    //           createdAt: "2024-09-06 12:42:11",
    //           gender: "Male",
    //           ageRange: 2,
    //           point: {
    //             "관계 영역": {
    //               대인민감성: 36.54,
    //               "대인관계 어려움": 49.07,
    //             },
    //             "학업 영역": {
    //               학업스트레스: 58.24,
    //               "전공적응 어려움": 47.02,
    //               "학업적응 어려움": 32.14,
    //             },
    //             "정신건강 영역": {
    //               PTSD: 71.43,
    //               강박: 64.59,
    //               불안: 57.82,
    //               우울: 48.81,
    //               신체화: 42.97,
    //               공황발작: 86.7,
    //             },
    //           },
    //           result: {
    //             "관계 영역": {
    //               overallResult: "안정",
    //               대인민감성: "안정",
    //               "대인관계 어려움": "안정",
    //             },
    //             "학업 영역": {
    //               overallResult: "주의",
    //               학업스트레스: "주의",
    //               "전공적응 어려움": "안정",
    //               "학업적응 어려움": "안정",
    //             },
    //             "정신건강 영역": {
    //               PTSD: "위험",
    //               강박: "주의",
    //               불안: "안정",
    //               우울: "안정",
    //               신체화: "안정",
    //               공황발작: "위험",
    //               overallResult: "위험",
    //             },
    //           },
    //           overallResult: "주의",
    //         },
    //         {
    //           id: 25,
    //           session: 1,
    //           createdAt: "2024-09-04 14:47:38",
    //           gender: "Female",
    //           ageRange: 2,
    //           point: {
    //             "관계 영역": {
    //               대인민감성: 74.92,
    //               "대인관계 어려움": 58.25,
    //             },
    //             "학업 영역": {
    //               학업스트레스: 75.95,
    //               "전공적응 어려움": 57.46,
    //               "학업적응 어려움": 44.7,
    //             },
    //             "정신건강 영역": {
    //               PTSD: 85.06,
    //               강박: 87.57,
    //               불안: 82.89,
    //               우울: 86.08,
    //               신체화: 69.2,
    //               공황발작: 116.42,
    //               대인민감성: 45.13,
    //             },
    //           },
    //           result: {
    //             "관계 영역": {
    //               overallResult: "위험",
    //               대인민감성: "위험",
    //               "대인관계 어려움": "주의",
    //             },
    //             "학업 영역": {
    //               overallResult: "위험",
    //               학업스트레스: "위험",
    //               "전공적응 어려움": "주의",
    //               "학업적응 어려움": "안정",
    //             },
    //             "정신건강 영역": {
    //               PTSD: "위험",
    //               강박: "위험",
    //               불안: "위험",
    //               우울: "위험",
    //               신체화: "주의",
    //               공황발작: "위험",
    //               overallResult: "위험",
    //               대인민감성: "안정",
    //             },
    //           },
    //           overallResult: "위험",
    //         },
    //       ],
    //       program: [],
    //     };
    //     const emptyArr: {}[] = [];
    //     map(
    //       result.data.psychologicalTest,
    //       (item: {
    //         point: { [key: string]: {} };
    //         result: { [key: string]: { [key: string]: string } };
    //       }) => {
    //         const { point, result, ...rest } = item;

    //         const copyRest = Object.assign(rest);
    //         forEach(point, (pointValue, pointKey) => {
    //           forEach(pointValue, (value, key) => {
    //             if (key.includes("-")) {
    //               const leftSide = Math.abs(value).toFixed(1);
    //               const rightSide = Math.abs(value).toFixed(1);

    //               copyRest[key] =
    //                 (Number(value) < 0
    //                   ? `${100 - Number(leftSide)}%/${leftSide}%`
    //                   : `${rightSide}%/${100 - Number(rightSide)}%`) +
    //                 `(${result[pointKey][key]})`;
    //             } else {
    //               copyRest[key] = `${
    //                 !isNaN(value) ? Number(value).toFixed() : value
    //               }(${result[pointKey][key]})`;
    //             }
    //           });
    //         });

    //         emptyArr.push(copyRest);
    //       }
    //     );

    //     result.data.psychologicalTest = emptyArr;
    //     setUserDetailData(result.data);

    //     setPsyPerPage((prev) => {
    //       return {
    //         ...prev,
    //         pageLength: Math.ceil(
    //           result.data.psychologicalTest?.length / prev.perPage
    //         ),
    //       };
    //     });
    //     setDiaryPerPage((prev) => {
    //       return {
    //         ...prev,
    //         pageLength: Math.ceil(result.data.diary?.length / prev.perPage),
    //       };
    //     });
    //     setProgramPerPage((prev) => {
    //       return {
    //         ...prev,
    //         pageLength: Math.ceil(result.data.program?.length / prev.perPage),
    //       };
    //     });
    //     setLoading(false);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     setLoading(false);
    //   });

    const dummyResult: any = {
      memberInfo: {
        id: 18,
        userName: "버거왕",
        collegeName: "서울대학교(본교)",
        studentId: "sw34",
        major: "겆딘새",
        email: "jhjung@andreia.kr",
        createdAt: "2024-08-07 07:52:35",
        memberStatus: "Member",
        isAllowedPush: true,
        isAllowedEmail: true,
      },
      activity: {
        board: 20,
        boardComment: 102,
        blockingUser: 0,
        blockedUser: 0,
        reporting: 18,
        reported: 9,
      },
      diary: [
        {
          diaryDate: "2024-09-19",
          feeling: "힘들어",
          together: null,
          createdAt: "2024-09-19 22:56:48",
          updatedAt: "2024-09-19 22:56:48",
        },
        {
          diaryDate: "2024-09-18",
          feeling: "편안해",
          together: null,
          createdAt: "2024-09-19 22:51:50",
          updatedAt: "2024-09-19 22:51:50",
        },
        {
          diaryDate: "2024-09-19",
          feeling: "외로워",
          together: ["친구", "연인", "지인"],
          createdAt: "2024-09-19 22:42:52",
          updatedAt: "2024-09-19 22:42:52",
        },
        {
          diaryDate: "2024-08-24",
          feeling: "편안해",
          together: ["친구"],
          createdAt: "2024-09-13 10:03:57",
          updatedAt: "2024-09-13 10:03:57",
        },
        {
          diaryDate: "2024-09-08",
          feeling: "슬퍼",
          together: ["친구"],
          createdAt: "2024-09-13 10:03:30",
          updatedAt: "2024-09-13 10:03:42",
        },
      ],
      psychologicalTest: [
        {
          id: 240,
          session: 4,
          createdAt: "2024-09-11 07:10:46",
          gender: "Male",
          ageRange: 2,
          point: {
            "관계 영역": {
              대인민감성: 63.18,
              "대인관계 어려움": 52.13,
            },
            "학업 영역": {
              학업스트레스: 58.24,
              "전공적응 어려움": 52.24,
              "학업적응 어려움": 54.12,
            },
            "정신건강 영역": {
              PTSD: 54.99,
              강박: 75.89,
              불안: 65.06,
              우울: 58.89,
              신체화: 52.73,
              공황발작: 58.26,
            },
          },
          result: {
            "관계 영역": {
              overallResult: "주의",
              대인민감성: "주의",
              "대인관계 어려움": "안정",
            },
            "학업 영역": {
              overallResult: "주의",
              학업스트레스: "주의",
              "전공적응 어려움": "안정",
              "학업적응 어려움": "안정",
            },
            "정신건강 영역": {
              PTSD: "안정",
              강박: "위험",
              불안: "주의",
              우울: "안정",
              신체화: "안정",
              공황발작: "안정",
              overallResult: "위험",
            },
          },
          overallResult: "주의",
        },
        {
          id: 208,
          session: 3,
          createdAt: "2024-09-06 12:46:27",
          gender: "Male",
          ageRange: 2,
          point: {
            "관계 영역": {
              대인민감성: 66.51,
              "대인관계 어려움": 49.07,
            },
            "학업 영역": {
              학업스트레스: 55.71,
              "전공적응 어려움": 54.85,
              "학업적응 어려움": 50.98,
            },
            "정신건강 영역": {
              PTSD: 87.87,
              강박: 47.64,
              불안: 50.58,
              우울: 58.89,
              신체화: 57.61,
              공황발작: 86.7,
            },
          },
          result: {
            "관계 영역": {
              overallResult: "주의",
              대인민감성: "주의",
              "대인관계 어려움": "안정",
            },
            "학업 영역": {
              overallResult: "주의",
              학업스트레스: "주의",
              "전공적응 어려움": "안정",
              "학업적응 어려움": "안정",
            },
            "정신건강 영역": {
              PTSD: "위험",
              강박: "안정",
              불안: "안정",
              우울: "안정",
              신체화: "안정",
              공황발작: "위험",
              overallResult: "위험",
            },
          },
          overallResult: "주의",
        },
        {
          id: 207,
          session: 2,
          createdAt: "2024-09-06 12:42:11",
          gender: "Male",
          ageRange: 2,
          point: {
            "관계 영역": {
              대인민감성: 36.54,
              "대인관계 어려움": 49.07,
            },
            "학업 영역": {
              학업스트레스: 58.24,
              "전공적응 어려움": 47.02,
              "학업적응 어려움": 32.14,
            },
            "정신건강 영역": {
              PTSD: 71.43,
              강박: 64.59,
              불안: 57.82,
              우울: 48.81,
              신체화: 42.97,
              공황발작: 86.7,
            },
          },
          result: {
            "관계 영역": {
              overallResult: "안정",
              대인민감성: "안정",
              "대인관계 어려움": "안정",
            },
            "학업 영역": {
              overallResult: "주의",
              학업스트레스: "주의",
              "전공적응 어려움": "안정",
              "학업적응 어려움": "안정",
            },
            "정신건강 영역": {
              PTSD: "위험",
              강박: "주의",
              불안: "안정",
              우울: "안정",
              신체화: "안정",
              공황발작: "위험",
              overallResult: "위험",
            },
          },
          overallResult: "주의",
        },
        {
          id: 25,
          session: 1,
          createdAt: "2024-09-04 14:47:38",
          gender: "Female",
          ageRange: 2,
          point: {
            "관계 영역": {
              대인민감성: 74.92,
              "대인관계 어려움": 58.25,
            },
            "학업 영역": {
              학업스트레스: 75.95,
              "전공적응 어려움": 57.46,
              "학업적응 어려움": 44.7,
            },
            "정신건강 영역": {
              PTSD: 85.06,
              강박: 87.57,
              불안: 82.89,
              우울: 86.08,
              신체화: 69.2,
              공황발작: 116.42,
              대인민감성: 45.13,
            },
          },
          result: {
            "관계 영역": {
              overallResult: "위험",
              대인민감성: "위험",
              "대인관계 어려움": "주의",
            },
            "학업 영역": {
              overallResult: "위험",
              학업스트레스: "위험",
              "전공적응 어려움": "주의",
              "학업적응 어려움": "안정",
            },
            "정신건강 영역": {
              PTSD: "위험",
              강박: "위험",
              불안: "위험",
              우울: "위험",
              신체화: "주의",
              공황발작: "위험",
              overallResult: "위험",
              대인민감성: "안정",
            },
          },
          overallResult: "위험",
        },
      ],
      program: [],
    };
    const emptyArr: {}[] = [];
    map(
      dummyResult.psychologicalTest,
      (item: {
        point: { [key: string]: {} };
        result: { [key: string]: { [key: string]: string } };
      }) => {
        const { point, result, ...rest } = item;

        const copyRest = Object.assign(rest);
        forEach(point, (pointValue, pointKey) => {
          forEach(pointValue, (value, key) => {
            if (key.includes("-")) {
              const leftSide = Math.abs(value).toFixed(1);
              const rightSide = Math.abs(value).toFixed(1);

              copyRest[key] =
                (Number(value) < 0
                  ? `${100 - Number(leftSide)}%/${leftSide}%`
                  : `${rightSide}%/${100 - Number(rightSide)}%`) +
                `(${result[pointKey][key]})`;
            } else {
              copyRest[key] = `${
                !isNaN(value) ? Number(value).toFixed() : value
              }(${result[pointKey][key]})`;
            }
          });
        });

        emptyArr.push(copyRest);
      }
    );

    dummyResult.psychologicalTest = emptyArr;
    setUserDetailData(dummyResult);

    setPsyPerPage((prev) => {
      return {
        ...prev,
        pageLength: Math.ceil(
          dummyResult.psychologicalTest?.length / prev.perPage
        ),
      };
    });
    setDiaryPerPage((prev) => {
      return {
        ...prev,
        pageLength: Math.ceil(dummyResult.diary?.length / prev.perPage),
      };
    });
    setProgramPerPage((prev) => {
      return {
        ...prev,
        pageLength: Math.ceil(dummyResult.program?.length / prev.perPage),
      };
    });
    setLoading(false);
  }, []);

  const route = useNavigate();

  const additionalTrOptions = {
    colSpanStarter: {
      우울: {
        title: "정신건강",
        colSpan: 6,
      },
      대인민감성: {
        title: "관계영역",
        colSpan: 2,
      },
      학업스트레스: {
        title: "학업영역",
        colSpan: 3,
      },
    },
    colSpanTarget: [
      "우울",
      "불안",
      "공황발작",
      "강박",
      "PTSD",
      "신체화",
      "대인민감성",
      "대인관계 어려움",
      "학업스트레스",
      "전공적응 어려움",
      "학업적응 어려움",
    ],
  };

  const [block, setBlock] = useState({
    type: "blocked",
    targetId: params.get("id") || "",
    data: [],
  });

  const getBlockData = (type: string) => {
    // setLoading(true);
    // api
    //   .get(
    //     `/admin/member/${params.get("id")}/${type}`,
    //     type === "blocked"
    //       ? {
    //           params: {
    //             page: blockedPerPage.page,
    //             pageSize: blockedPerPage.perPage,
    //           },
    //         }
    //       : {
    //           params: {
    //             page: blockingPerPage.page,
    //             pageSize: blockingPerPage.perPage,
    //           },
    //         }
    //   )
    //   .then((result) => {
    //     setBlock((prev) => {
    //       return { ...prev, data: result.data };
    //     });
    //     setLoading(false);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     setLoading(false);
    //   });
    setBlock((prev) => {
      return { ...prev, data: [] };
    });
  };

  useEffect(() => {
    const copy = userDetailData?.psychologicalTest && [
      ...userDetailData?.psychologicalTest,
    ];
    const chunked = chunk(copy, psyPerPage.perPage);

    setPsychologicalTestData(chunked[psyPerPage.page - 1]);

    setPsyPerPage((prev) => {
      return {
        ...prev,
        pageLength: chunked.length,
      };
    });
  }, [userDetailData?.psychologicalTest, psyPerPage.page, psyPerPage.perPage]);

  useEffect(() => {
    const copy = userDetailData?.diary && [...userDetailData?.diary];
    const chunked = chunk(copy, diaryPerPage.perPage);

    setUserDiaryData(chunked[diaryPerPage.page - 1]);

    setDiaryPerPage((prev) => {
      return {
        ...prev,
        pageLength: chunked.length,
      };
    });
  }, [userDetailData?.diary, diaryPerPage.page, diaryPerPage.perPage]);

  useEffect(() => {
    const copy = userDetailData?.program && [...userDetailData?.program];

    const addedCopy = forEach(copy, (item) => {
      if (item.completedAt === null) {
        item.activityStatus = "inProgress";
      } else {
        item.activityStatus = "completed";
      }
    });

    const chunked = chunk(addedCopy, programPerPage.perPage);

    setUserProgramData(chunked[programPerPage.page - 1]);

    setProgramPerPage((prev) => {
      return {
        ...prev,
        pageLength: chunked.length,
      };
    });
  }, [userDetailData?.program, programPerPage.page, programPerPage.perPage]);

  useEffect(() => {
    getBlockData(block.type);
  }, [
    blockedPerPage.page,
    blockingPerPage.page,
    blockedPerPage.perPage,
    blockingPerPage.perPage,
  ]);
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-wrap gap-4 max-2xl:gap-10">
        <div>
          <div className="mb-4 text-2xl font-bold max-lg:text-lg">회원정보</div>
          <div className="flex flex-wrap gap-10 max-lg:gap-4">
            <div className="">
              <div className="flex flex-col flex-wrap gap-4">
                <div className="flex flex-wrap gap-4">
                  <div className="text-lg min-w-16 max-lg:text-sm">
                    가입상태
                  </div>
                  <div className="text-lg font-bold whitespace-nowrap max-lg:text-sm">
                    {userDetailData?.memberInfo?.memberStatus}
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-lg min-w-16 whitespace-nowrap max-lg:text-sm">
                    UID
                  </div>
                  <div className="text-lg font-bold whitespace-nowrap max-lg:text-sm">
                    {userDetailData?.memberInfo?.id}
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-lg min-w-16 whitespace-nowrap max-lg:text-sm">
                    학교
                  </div>
                  <div className="text-lg font-bold whitespace-nowrap max-lg:text-sm">
                    {userDetailData?.memberInfo?.collegeName || "-"}
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-lg min-w-16 whitespace-nowrap max-lg:text-sm">
                    학과
                  </div>
                  <div className="text-lg font-bold whitespace-nowrap max-lg:text-sm">
                    {userDetailData?.memberInfo?.major || "-"}
                  </div>
                </div>
              </div>
            </div>
            <div className="">
              <div className="flex flex-col flex-wrap gap-4">
                <div className="flex gap-4">
                  <div className="text-lg min-w-16 whitespace-nowrap max-lg:text-sm">
                    가입일시
                  </div>
                  <div className="text-lg font-bold whitespace-nowrap max-lg:text-sm">
                    {userDetailData?.memberInfo?.createdAt}
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-lg min-w-16 whitespace-nowrap max-lg:text-sm">
                    이름
                  </div>
                  <div className="text-lg font-bold whitespace-nowrap max-lg:text-sm">
                    {userDetailData?.memberInfo?.userName}
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-lg min-w-16 whitespace-nowrap max-lg:text-sm">
                    이메일
                  </div>
                  <div className="text-lg font-bold whitespace-nowrap max-lg:text-sm">
                    {userDetailData?.memberInfo?.email}
                  </div>
                  <button
                    disabled={
                      userDetailData?.memberInfo.memberStatus === "Withdrawn"
                    }
                    className="rounded-none btn btn-error btn-sm max-lg:btn-xs"
                  >
                    비밀번호 재설정
                  </button>
                </div>
                <div className="flex gap-4">
                  <div className="text-lg min-w-16 whitespace-nowrap max-lg:text-sm">
                    학번
                  </div>
                  <div className="text-lg font-bold whitespace-nowrap max-lg:text-sm">
                    {userDetailData?.memberInfo?.studentId || "-"}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 mt-[1rem]">
            <div className="text-lg min-w-16 max-lg:text-sm">
              마케팅 정보 수신 동의
            </div>
            <div className="text-lg font-bold whitespace-nowrap max-lg:text-sm">
              동의함
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                className="rounded-full checkbox checkbox-primary checkbox-xs"
                checked={
                  (userDetailData?.memberInfo?.isAllowedPush as boolean) || true
                }
                readOnly
                disabled={
                  userDetailData?.memberInfo.memberStatus === "Withdrawn"
                }
              />
              <label className="label-text">앱 알림</label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                className="rounded-full checkbox checkbox-primary checkbox-xs"
                checked={
                  (userDetailData?.memberInfo?.isAllowedEmail as boolean) ||
                  true
                }
                readOnly
                disabled={
                  userDetailData?.memberInfo.memberStatus === "Withdrawn"
                }
              />
              <label className="label-text">이메일</label>
            </div>
          </div>
          {/* <div className="flex flex-wrap gap-4 mt-[1rem]">
            <div className="text-lg min-w-16 max-lg:text-sm">건강데이터</div>
            <div className="text-lg font-bold whitespace-nowrap max-lg:text-sm">
              연동됨
            </div>
            <div className="text-lg whitespace-nowrap max-lg:text-sm">
              애플 건강
            </div>
          </div> */}
        </div>

        <div className="divider divider-horizontal max-2xl:hidden"></div>
        <div>
          <div
            className="mb-4 text-2xl font-bold max-lg:text-lg"
            onClick={() => {
              alert();
            }}
          >
            커뮤니티/콘텐츠 활동
          </div>
          <div className="flex flex-wrap gap-10 max-lg:gap-4">
            <div className="">
              <div className="flex flex-col flex-wrap gap-4">
                <div className="flex gap-4">
                  <div className="text-lg min-w-40 whitespace-nowrap max-lg:text-sm">
                    내가 쓴 게시글
                  </div>
                  <div
                    className={`${
                      userDetailData?.memberInfo.memberStatus === "Withdrawn"
                        ? "pointer-events-none"
                        : ""
                    } text-lg font-bold underline cursor-pointer whitespace-nowrap max-lg:text-sm`}
                    onClick={() => {
                      route(
                        `/community/board?fromUserDetailSearchId=${userDetailData?.memberInfo?.userName}`
                      );
                    }}
                  >
                    {userDetailData?.activity?.board}
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-lg min-w-40 whitespace-nowrap max-lg:text-sm">
                    신고한 게시글/댓글
                  </div>
                  <div
                    className={`${
                      userDetailData?.memberInfo.memberStatus === "Withdrawn"
                        ? "pointer-events-none"
                        : ""
                    } text-lg font-bold underline cursor-pointer whitespace-nowrap max-lg:text-sm`}
                    onClick={() => {
                      route(
                        `/cs/report?fromUserDetailSearchIdTypeReporter=${userDetailData?.memberInfo?.userName}`
                      );
                    }}
                  >
                    {userDetailData?.activity?.reporting}
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-lg min-w-40 whitespace-nowrap max-lg:text-sm">
                    차단한 사용자
                  </div>
                  <div
                    className={`${
                      userDetailData?.memberInfo.memberStatus === "Withdrawn" ||
                      userDetailData?.activity?.blockingUser === 0
                        ? "pointer-events-none"
                        : ""
                    } text-lg font-bold underline cursor-pointer whitespace-nowrap max-lg:text-sm`}
                    onClick={() => {
                      // setBlock((prev) => {
                      //   return { ...prev, type: "blocking" };
                      // });
                      getBlockData("blocking");
                      openModal("blocking");
                    }}
                  >
                    {userDetailData?.activity?.blockingUser}
                  </div>
                </div>
              </div>
            </div>
            <div className="">
              <div className="flex flex-col flex-wrap gap-4">
                <div className="flex gap-4">
                  <div className="text-lg min-w-40 whitespace-nowrap max-lg:text-sm">
                    내가 쓴 댓글
                  </div>
                  <div
                    className={`${
                      userDetailData?.memberInfo.memberStatus === "Withdrawn"
                        ? "pointer-events-none"
                        : ""
                    } text-lg font-bold underline cursor-pointer whitespace-nowrap max-lg:text-sm`}
                    onClick={() => {
                      route(
                        `/community/comments?fromUserDetailSearchId=${userDetailData?.memberInfo?.userName}`
                      );
                    }}
                  >
                    {userDetailData?.activity?.boardComment}
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-lg min-w-40 whitespace-nowrap max-lg:text-sm">
                    신고당한 게시글/댓글
                  </div>
                  <div
                    className={`${
                      userDetailData?.memberInfo.memberStatus === "Withdrawn"
                        ? "pointer-events-none"
                        : ""
                    } text-lg font-bold underline cursor-pointer whitespace-nowrap max-lg:text-sm`}
                    onClick={() => {
                      route(
                        `/cs/report?fromUserDetailSearchIdTypeWriter=${userDetailData?.memberInfo?.userName}`
                      );
                    }}
                  >
                    {userDetailData?.activity?.reported}
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-lg min-w-40 whitespace-nowrap max-lg:text-sm">
                    차단 받은 사용자
                  </div>
                  <div
                    className={`${
                      userDetailData?.memberInfo.memberStatus === "Withdrawn" ||
                      userDetailData?.activity?.blockedUser === 0
                        ? "pointer-events-none"
                        : ""
                    } text-lg font-bold underline cursor-pointer whitespace-nowrap max-lg:text-sm`}
                    onClick={() => {
                      getBlockData("blocked");
                      openModal("blocked");
                    }}
                  >
                    {userDetailData?.activity?.blockedUser}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Table
          perPageList={[5, 10, 15]}
          // checkable={{ active: true, multi: false, setter: () => {} }}
          tableTitle={`종합심리검사 - ${
            userDetailData?.psychologicalTest?.length || 0
          }건`}
          data={psychologicalTestData || []}
          addedMap={[
            ["id", "UID"],
            ["session", "회차"],
            ["gender", "성별"],
            ["ageRange", "적용구간"],
            ["overallResult", "결과"],
            ["우울", "우울"],
            ["불안", "불안"],
            ["공황발작", "공황발작"],
            ["강박", "강박"],
            ["PTSD", "PTSD"],
            ["신체화", "신체화"],
            ["대인민감성", "대인민감성"],
            ["대인관계 어려움", "대인관계 어려움"],
            ["학업스트레스", "학업스트레스"],
            ["전공적응 어려움", "전공적응 어려움"],
            ["학업적응 어려움", "학업적응 어려움"],
            ["createdAt", "검사일시"],
          ]}
          additionalTrOptions={additionalTrOptions}
          trOptions={{
            tbody: {
              className: () => "hover:bg-gray-300",
            },
          }}
          tdOptions={{
            ageRange: {
              el: (item: number) => {
                return (
                  <>
                    {item === 0
                      ? "24세 이하"
                      : item === 1
                      ? "25 ~ 29세"
                      : "30세 이상"}
                  </>
                );
              },
            },
            gender: {
              el: (item: string) => {
                return <>{item === "Male" ? "남성" : "여성"}</>;
              },
            },
          }}
          perPageOptions={{
            page: psyPerPage.page,
            perPage: psyPerPage.perPage,
            pageLength: psyPerPage.pageLength,
            setPerPage: setPsyPerPage,
          }}
        />
      </div>

      <Table
        perPageList={[5, 10, 15]}
        tableTitle={`마음상태 - ${userDetailData?.diary?.length || 0}건`}
        data={userDiaryData || []}
        tdOptions={{
          together: {
            el: (item: string[] | null) => {
              return <span>{item === null ? "-" : item.toString()}</span>;
            },
          },
        }}
        trOptions={{
          tbody: {
            className: () => "hover:bg-gray-300",
          },
        }}
        addedMap={[
          ["diaryDate", "일기 일자"],
          ["feeling", "감정"],
          ["together", "함께"],
          ["createdAt", "작성 일시"],
          ["updatedAt", "수정 일시"],
        ]}
        perPageOptions={{
          page: diaryPerPage.page,
          perPage: diaryPerPage.perPage,
          pageLength: diaryPerPage.pageLength,
          setPerPage: setDiaryPerPage,
        }}
      />

      <Table
        perPageList={[5, 10, 15]}
        tableTitle={`프로그램 내역 - ${userProgramData?.length || 0}건`}
        data={userProgramData || []}
        addedMap={[
          ["createdAt", "참여 일시"],
          ["activityStatus", "진행상태"],
          ["programId", "프로그램 ID"],
          ["title", "프로그램명"],
          ["completedAt", "완료일시"],
        ]}
        trOptions={{
          tbody: {
            className: () => "hover:bg-gray-300",
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
        perPageOptions={{
          page: programPerPage.page,
          perPage: programPerPage.perPage,
          pageLength: programPerPage.pageLength,
          setPerPage: setProgramPerPage,
        }}
      />

      <Modal id="blocking">
        <div className="text-xl font-bold">차단한 사용자</div>
        <div className="divider divider-vertical "></div>

        <Table
          divider={false}
          data={block.data || []}
          addedMap={[
            ["createdAt", "차단일시"],
            ["id", "UID"],
            ["userName", "이름"],
          ]}
          perPageOptions={{
            page: blockingPerPage.page,
            perPage: blockingPerPage.perPage,
            pageLength: blockingPerPage.pageLength,
            setPerPage: setBlockingPerPage,
          }}
        />
      </Modal>
      <Modal id="blocked">
        <div className="text-xl font-bold">차단받은 사용자</div>
        <div className="divider divider-vertical "></div>

        <Table
          data={block.data || []}
          addedMap={[
            ["createdAt", "차단일시"],
            ["id", "UID"],
            ["userName", "이름"],
          ]}
          perPageOptions={{
            page: blockedPerPage.page,
            perPage: blockedPerPage.perPage,
            pageLength: blockedPerPage.pageLength,
            setPerPage: setBlockedPerPage,
          }}
        />
      </Modal>
    </div>
  );
}

export default index;
