import Table from "#/components/Table";
import TableExtensionHeader from "#/components/TableExtensionHeader";
import { TableStateTypes } from "#/data/types/components";
import api from "#/library/axios/api";
import useCollegeState from "#/library/recoil/hook/useCollegeState";
import useLoadingState from "#/library/recoil/hook/useLoadingState";
import { makeExcel } from "#/utils/useExcelJs";
import { find, forEach, map } from "lodash";
import { useEffect, useState } from "react";

function index() {
  const [totalPsyData, setTotalPsyData] = useState<TableStateTypes>();
  const [perPage, setPerPage] = useState({
    page: 1,
    perPage: 20,
    pageLength: 1,
  });

  const [search, setSearch] = useState<{ [key: string]: string | number }>({
    overallResult: "",
  });
  const { setLoading } = useLoadingState();

  const addedMap = [
    ["id", "검사 ID"],
    ["userName", "이름"],
    ["collegeName", "학교"],
    ["gender", "성별"],
    ["ageRange", "적용구간"],
    ["session", "회차"],
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
  ];

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

  const submitSearchPsychology = (isSubmt: boolean) => {
    // setLoading(true);
    // api
    //   .get(`/admin/psychology`, {
    //     params: {
    //       page: isSubmt ? 1 : perPage.page,
    //       searchWord: search.word,
    //       pageSize: perPage.perPage,
    //       searchStartDate: search.startDate,
    //       searchEndDate: search.endDate,
    //       gender: search.gender,
    //       ageRange: search.ageRange,
    //       overallResult: search.overallResult,
    //       collegeId: search.collegeId,
    //     },
    //   })
    //   .then((result) => {
    //     const { totalCount } = result.data;
    //     const emptyArr: {}[] = [];
    //     map(
    //       result.data.results,
    //       (item: {
    //         point: { [key: string]: {} };
    //         result: { [key: string]: { [key: string]: string } };
    //       }) => {
    //         const { point, result, ...rest } = item;

    //         const copyRest = Object.assign(rest);
    //         forEach(point, (pointValue, pointKey) => {
    //           forEach(pointValue, (value, key) => {
    //             if (key.includes("-")) {
    //               const leftSide = Math.floor(value);
    //               const rightSide = Math.floor(value);

    //               copyRest[key] =
    //                 (Number(value) < 0
    //                   ? `${100 - Number(leftSide)}%/${leftSide}%`
    //                   : `${rightSide}%/${100 - Number(rightSide)}%`) +
    //                 `(${result[pointKey][key]})`;
    //             } else {
    //               copyRest[key] = `${
    //                 !isNaN(value) ? Number(Math.floor(value)) : value
    //               }(${result[pointKey][key]})`;
    //             }
    //           });
    //         });

    //         emptyArr.push(copyRest);
    //       }
    //     );

    //     setTotalPsyData((prev) => {
    //       return { ...prev, totalCount: totalCount, psyData: emptyArr };
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
      results: [
        {
          id: 287,
          userName: "카고임",
          collegeName: "경희대학교(본교)",
          gender: "Female",
          ageRange: 2,
          session: 8,
          overallResult: "주의",
          point: {
            "관계 영역": {
              대인민감성: 68,
              "대인관계 어려움": 55,
            },
            "학업 영역": {
              학업스트레스: 58,
              "전공적응 어려움": 70,
              "학업적응 어려움": 63,
            },
            "정신건강 영역": {
              PTSD: 58,
              강박: 52,
              불안: 51,
              우울: 57,
              신체화: 57,
              공황발작: 68,
            },
          },
          result: {
            "관계 영역": {
              overallResult: "주의",
              대인민감성: "주의",
              "대인관계 어려움": "주의",
            },
            "학업 영역": {
              overallResult: "위험",
              학업스트레스: "주의",
              "전공적응 어려움": "위험",
              "학업적응 어려움": "위험",
            },
            "정신건강 영역": {
              PTSD: "안정",
              강박: "안정",
              불안: "안정",
              우울: "안정",
              신체화: "안정",
              공황발작: "주의",
              overallResult: "주의",
            },
          },
          createdAt: "2024-12-06 17:46:46",
        },
        {
          id: 286,
          userName: "카고임",
          collegeName: "경희대학교(본교)",
          gender: "Male",
          ageRange: 2,
          session: 7,
          overallResult: "관심",
          point: {
            "관계 영역": {
              대인민감성: 53,
              "대인관계 어려움": 46,
            },
            "학업 영역": {
              학업스트레스: 58,
              "전공적응 어려움": 36,
              "학업적응 어려움": 50,
            },
            "정신건강 영역": {
              PTSD: 54,
              강박: 58,
              불안: 56,
              우울: 65,
              신체화: 67,
              공황발작: 65,
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
              PTSD: "안정",
              강박: "안정",
              불안: "안정",
              우울: "주의",
              신체화: "주의",
              공황발작: "주의",
              overallResult: "주의",
            },
          },
          createdAt: "2024-12-05 14:01:20",
        },
        {
          id: 284,
          userName: "서이리sk",
          collegeName: "대신대학교(본교)",
          gender: "Male",
          ageRange: 2,
          session: 1,
          overallResult: "위험",
          point: {
            "관계 영역": {
              대인민감성: 86,
              "대인관계 어려움": 58,
            },
            "학업 영역": {
              학업스트레스: 75,
              "전공적응 어려움": 31,
              "학업적응 어려움": 25,
            },
            "정신건강 영역": {
              PTSD: 87,
              강박: 98,
              불안: 84,
              우울: 87,
              신체화: 72,
              공황발작: 108,
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
              "전공적응 어려움": "안정",
              "학업적응 어려움": "안정",
            },
            "정신건강 영역": {
              PTSD: "위험",
              강박: "위험",
              불안: "위험",
              우울: "위험",
              신체화: "위험",
              공황발작: "위험",
              overallResult: "위험",
            },
          },
          createdAt: "2024-10-31 08:59:41",
        },
        {
          id: 283,
          userName: "금태종태종태종",
          collegeName: "백석예술대학교(본교)",
          gender: "Male",
          ageRange: 0,
          session: 7,
          overallResult: "주의",
          point: {
            "관계 영역": {
              대인민감성: 37.73,
              "대인관계 어려움": 49.07,
            },
            "학업 영역": {
              학업스트레스: 38,
              "전공적응 어려움": 70.51,
              "학업적응 어려움": 72.96,
            },
            "정신건강 영역": {
              PTSD: 39.59,
              강박: 33.67,
              불안: 37.26,
              우울: 38.12,
              신체화: 39.25,
              공황발작: 44.96,
            },
          },
          result: {
            "관계 영역": {
              overallResult: "안정",
              대인민감성: "안정",
              "대인관계 어려움": "안정",
            },
            "학업 영역": {
              overallResult: "위험",
              학업스트레스: "안정",
              "전공적응 어려움": "위험",
              "학업적응 어려움": "위험",
            },
            "정신건강 영역": {
              PTSD: "안정",
              강박: "안정",
              불안: "안정",
              우울: "안정",
              신체화: "안정",
              공황발작: "안정",
              overallResult: "안정",
            },
          },
          createdAt: "2024-09-19 21:00:08",
        },
        {
          id: 282,
          userName: "금태종태종태종",
          collegeName: "백석예술대학교(본교)",
          gender: "Male",
          ageRange: 0,
          session: 6,
          overallResult: "주의",
          point: {
            "관계 영역": {
              대인민감성: 37.73,
              "대인관계 어려움": 49.07,
            },
            "학업 영역": {
              학업스트레스: 38,
              "전공적응 어려움": 70.51,
              "학업적응 어려움": 72.96,
            },
            "정신건강 영역": {
              PTSD: 39.59,
              강박: 33.67,
              불안: 37.26,
              우울: 38.12,
              신체화: 39.25,
              공황발작: 44.96,
            },
          },
          result: {
            "관계 영역": {
              overallResult: "안정",
              대인민감성: "안정",
              "대인관계 어려움": "안정",
            },
            "학업 영역": {
              overallResult: "위험",
              학업스트레스: "안정",
              "전공적응 어려움": "위험",
              "학업적응 어려움": "위험",
            },
            "정신건강 영역": {
              PTSD: "안정",
              강박: "안정",
              불안: "안정",
              우울: "안정",
              신체화: "안정",
              공황발작: "안정",
              overallResult: "안정",
            },
          },
          createdAt: "2024-09-19 20:59:09",
        },
        {
          id: 281,
          userName: "금태종태종태종",
          collegeName: "백석예술대학교(본교)",
          gender: "Male",
          ageRange: 0,
          session: 5,
          overallResult: "주의",
          point: {
            "관계 영역": {
              대인민감성: 37.73,
              "대인관계 어려움": 49.07,
            },
            "학업 영역": {
              학업스트레스: 38,
              "전공적응 어려움": 70.51,
              "학업적응 어려움": 72.96,
            },
            "정신건강 영역": {
              PTSD: 39.59,
              강박: 33.67,
              불안: 37.26,
              우울: 38.12,
              신체화: 39.25,
              공황발작: 44.96,
            },
          },
          result: {
            "관계 영역": {
              overallResult: "안정",
              대인민감성: "안정",
              "대인관계 어려움": "안정",
            },
            "학업 영역": {
              overallResult: "위험",
              학업스트레스: "안정",
              "전공적응 어려움": "위험",
              "학업적응 어려움": "위험",
            },
            "정신건강 영역": {
              PTSD: "안정",
              강박: "안정",
              불안: "안정",
              우울: "안정",
              신체화: "안정",
              공황발작: "안정",
              overallResult: "안정",
            },
          },
          createdAt: "2024-09-19 20:59:09",
        },
        {
          id: 280,
          userName: "금태종태종태종",
          collegeName: "백석예술대학교(본교)",
          gender: "Male",
          ageRange: 0,
          session: 4,
          overallResult: "주의",
          point: {
            "관계 영역": {
              대인민감성: 37.73,
              "대인관계 어려움": 49.07,
            },
            "학업 영역": {
              학업스트레스: 38,
              "전공적응 어려움": 70.51,
              "학업적응 어려움": 72.96,
            },
            "정신건강 영역": {
              PTSD: 39.59,
              강박: 33.67,
              불안: 37.26,
              우울: 38.12,
              신체화: 39.25,
              공황발작: 44.96,
            },
          },
          result: {
            "관계 영역": {
              overallResult: "안정",
              대인민감성: "안정",
              "대인관계 어려움": "안정",
            },
            "학업 영역": {
              overallResult: "위험",
              학업스트레스: "안정",
              "전공적응 어려움": "위험",
              "학업적응 어려움": "위험",
            },
            "정신건강 영역": {
              PTSD: "안정",
              강박: "안정",
              불안: "안정",
              우울: "안정",
              신체화: "안정",
              공황발작: "안정",
              overallResult: "안정",
            },
          },
          createdAt: "2024-09-19 20:58:21",
        },
        {
          id: 279,
          userName: "금태종태종태종",
          collegeName: "백석예술대학교(본교)",
          gender: "Female",
          ageRange: 0,
          session: 3,
          overallResult: "주의",
          point: {
            "관계 영역": {
              대인민감성: 31.92,
              "대인관계 어려움": 49.07,
            },
            "학업 영역": {
              학업스트레스: 38,
              "전공적응 어려움": 70.51,
              "학업적응 어려움": 72.96,
            },
            "정신건강 영역": {
              PTSD: 37.03,
              강박: 32.06,
              불안: 32.5,
              우울: 32.97,
              신체화: 35.26,
              공황발작: 44.36,
            },
          },
          result: {
            "관계 영역": {
              overallResult: "안정",
              대인민감성: "안정",
              "대인관계 어려움": "안정",
            },
            "학업 영역": {
              overallResult: "위험",
              학업스트레스: "안정",
              "전공적응 어려움": "위험",
              "학업적응 어려움": "위험",
            },
            "정신건강 영역": {
              PTSD: "안정",
              강박: "안정",
              불안: "안정",
              우울: "안정",
              신체화: "안정",
              공황발작: "안정",
              overallResult: "안정",
            },
          },
          createdAt: "2024-09-19 20:57:32",
        },
        {
          id: 278,
          userName: "금태종태종태종",
          collegeName: "백석예술대학교(본교)",
          gender: "Female",
          ageRange: 1,
          session: 2,
          overallResult: "주의",
          point: {
            "관계 영역": {
              대인민감성: 61.03,
              "대인관계 어려움": 55.19,
            },
            "학업 영역": {
              학업스트레스: 63.3,
              "전공적응 어려움": 44.41,
              "학업적응 어려움": 41.56,
            },
            "정신건강 영역": {
              PTSD: 60.85,
              강박: 66.8,
              불안: 60.65,
              우울: 62.47,
              신체화: 53.87,
              공황발작: 79.71,
            },
          },
          result: {
            "관계 영역": {
              overallResult: "주의",
              대인민감성: "주의",
              "대인관계 어려움": "주의",
            },
            "학업 영역": {
              overallResult: "위험",
              학업스트레스: "위험",
              "전공적응 어려움": "안정",
              "학업적응 어려움": "안정",
            },
            "정신건강 영역": {
              PTSD: "주의",
              강박: "주의",
              불안: "주의",
              우울: "주의",
              신체화: "안정",
              공황발작: "위험",
              overallResult: "위험",
            },
          },
          createdAt: "2024-09-19 19:55:17",
        },
        {
          id: 277,
          userName: "금태종태종태종",
          collegeName: "백석예술대학교(본교)",
          gender: "Male",
          ageRange: 2,
          session: 1,
          overallResult: "주의",
          point: {
            "관계 영역": {
              대인민감성: 53.19,
              "대인관계 어려움": 52.13,
            },
            "학업 영역": {
              학업스트레스: 50.65,
              "전공적응 어려움": 57.46,
              "학업적응 어려움": 57.26,
            },
            "정신건강 영역": {
              PTSD: 54.99,
              강박: 53.29,
              불안: 52.39,
              우울: 52.17,
              신체화: 50.29,
              공황발작: 72.48,
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
              학업스트레스: "안정",
              "전공적응 어려움": "주의",
              "학업적응 어려움": "주의",
            },
            "정신건강 영역": {
              PTSD: "안정",
              강박: "안정",
              불안: "안정",
              우울: "안정",
              신체화: "안정",
              공황발작: "위험",
              overallResult: "위험",
            },
          },
          createdAt: "2024-09-19 19:52:42",
        },
        {
          id: 276,
          userName: "Kaco",
          collegeName: "경희대학교(본교)",
          gender: "Female",
          ageRange: 1,
          session: 2,
          overallResult: "관심",
          point: {
            "관계 영역": {
              대인민감성: 47.08,
              "대인관계 어려움": 52.13,
            },
            "학업 영역": {
              학업스트레스: 50.65,
              "전공적응 어려움": 54.85,
              "학업적응 어려움": 57.26,
            },
            "정신건강 영역": {
              PTSD: 52.57,
              강박: 49.44,
              불안: 51.41,
              우울: 46.74,
              신체화: 45.87,
              공황발작: 61.44,
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
              학업스트레스: "안정",
              "전공적응 어려움": "안정",
              "학업적응 어려움": "주의",
            },
            "정신건강 영역": {
              PTSD: "안정",
              강박: "안정",
              불안: "안정",
              우울: "안정",
              신체화: "안정",
              공황발작: "주의",
              overallResult: "주의",
            },
          },
          createdAt: "2024-09-13 12:42:23",
        },
        {
          id: 275,
          userName: "Kaco",
          collegeName: "경희대학교(본교)",
          gender: "Female",
          ageRange: 0,
          session: 1,
          overallResult: "주의",
          point: {
            "관계 영역": {
              대인민감성: 50.04,
              "대인관계 어려움": 58.25,
            },
            "학업 영역": {
              학업스트레스: 58.24,
              "전공적응 어려움": 47.02,
              "학업적응 어려움": 47.84,
            },
            "정신건강 영역": {
              PTSD: 67.76,
              강박: 49.98,
              불안: 53.5,
              우울: 60.57,
              신체화: 49.68,
              공황발작: 95.18,
            },
          },
          result: {
            "관계 영역": {
              overallResult: "주의",
              대인민감성: "안정",
              "대인관계 어려움": "주의",
            },
            "학업 영역": {
              overallResult: "주의",
              학업스트레스: "주의",
              "전공적응 어려움": "안정",
              "학업적응 어려움": "안정",
            },
            "정신건강 영역": {
              PTSD: "주의",
              강박: "안정",
              불안: "안정",
              우울: "주의",
              신체화: "안정",
              공황발작: "위험",
              overallResult: "위험",
            },
          },
          createdAt: "2024-09-13 12:38:48",
        },
        {
          id: 274,
          userName: "카고임",
          collegeName: "경희대학교(본교)",
          gender: "Male",
          ageRange: 2,
          session: 6,
          overallResult: "관심",
          point: {
            "관계 영역": {
              대인민감성: 53.19,
              "대인관계 어려움": 52.13,
            },
            "학업 영역": {
              학업스트레스: 50.65,
              "전공적응 어려움": 57.46,
              "학업적응 어려움": 57.26,
            },
            "정신건강 영역": {
              PTSD: 54.99,
              강박: 53.29,
              불안: 52.39,
              우울: 53.85,
              신체화: 47.85,
              공황발작: 65.37,
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
              학업스트레스: "안정",
              "전공적응 어려움": "주의",
              "학업적응 어려움": "주의",
            },
            "정신건강 영역": {
              PTSD: "안정",
              강박: "안정",
              불안: "안정",
              우울: "안정",
              신체화: "안정",
              공황발작: "주의",
              overallResult: "주의",
            },
          },
          createdAt: "2024-09-13 12:24:34",
        },
        {
          id: 273,
          userName: "카고임",
          collegeName: "경희대학교(본교)",
          gender: "Male",
          ageRange: 2,
          session: 5,
          overallResult: "주의",
          point: {
            "관계 영역": {
              대인민감성: 69.84,
              "대인관계 어려움": 55.19,
            },
            "학업 영역": {
              학업스트레스: 63.3,
              "전공적응 어려움": 44.41,
              "학업적응 어려움": 41.56,
            },
            "정신건강 영역": {
              PTSD: 71.43,
              강박: 75.89,
              불안: 68.68,
              우울: 72.33,
              신체화: 60.05,
              공황발작: 86.7,
            },
          },
          result: {
            "관계 영역": {
              overallResult: "주의",
              대인민감성: "주의",
              "대인관계 어려움": "주의",
            },
            "학업 영역": {
              overallResult: "위험",
              학업스트레스: "위험",
              "전공적응 어려움": "안정",
              "학업적응 어려움": "안정",
            },
            "정신건강 영역": {
              PTSD: "위험",
              강박: "위험",
              불안: "주의",
              우울: "위험",
              신체화: "주의",
              공황발작: "위험",
              overallResult: "위험",
            },
          },
          createdAt: "2024-09-13 12:22:48",
        },
        {
          id: 272,
          userName: "카고임",
          collegeName: "경희대학교(본교)",
          gender: "Male",
          ageRange: 2,
          session: 4,
          overallResult: "주의",
          point: {
            "관계 영역": {
              대인민감성: 59.85,
              "대인관계 어려움": 55.19,
            },
            "학업 영역": {
              학업스트레스: 53.18,
              "전공적응 어려움": 47.02,
              "학업적응 어려움": 44.7,
            },
            "정신건강 영역": {
              PTSD: 71.43,
              강박: 64.59,
              불안: 75.92,
              우울: 37.05,
              신체화: 50.29,
              공황발작: 79.59,
            },
          },
          result: {
            "관계 영역": {
              overallResult: "주의",
              대인민감성: "안정",
              "대인관계 어려움": "주의",
            },
            "학업 영역": {
              overallResult: "안정",
              학업스트레스: "안정",
              "전공적응 어려움": "안정",
              "학업적응 어려움": "안정",
            },
            "정신건강 영역": {
              PTSD: "위험",
              강박: "주의",
              불안: "위험",
              우울: "안정",
              신체화: "안정",
              공황발작: "위험",
              overallResult: "위험",
            },
          },
          createdAt: "2024-09-13 12:13:47",
        },
        {
          id: 271,
          userName: "tester",
          collegeName: "한신대학교(본교)",
          gender: "Female",
          ageRange: 2,
          session: 60,
          overallResult: "주의",
          point: {
            "관계 영역": {
              대인민감성: 68.3,
              "대인관계 어려움": 58.25,
            },
            "학업 영역": {
              학업스트레스: 50.65,
              "전공적응 어려움": 49.63,
              "학업적응 어려움": 57.26,
            },
            "정신건강 영역": {
              PTSD: 63.78,
              강박: 60.93,
              불안: 68.81,
              우울: 71.14,
              신체화: 50.88,
              공황발작: 60.49,
            },
          },
          result: {
            "관계 영역": {
              overallResult: "주의",
              대인민감성: "주의",
              "대인관계 어려움": "주의",
            },
            "학업 영역": {
              overallResult: "주의",
              학업스트레스: "안정",
              "전공적응 어려움": "안정",
              "학업적응 어려움": "주의",
            },
            "정신건강 영역": {
              PTSD: "주의",
              강박: "주의",
              불안: "주의",
              우울: "위험",
              신체화: "안정",
              공황발작: "주의",
              overallResult: "위험",
            },
          },
          createdAt: "2024-09-12 14:30:43",
        },
        {
          id: 270,
          userName: "tester",
          collegeName: "한신대학교(본교)",
          gender: "Female",
          ageRange: 2,
          session: 59,
          overallResult: "주의",
          point: {
            "관계 영역": {
              대인민감성: 48.44,
              "대인관계 어려움": 55.19,
            },
            "학업 영역": {
              학업스트레스: 58.24,
              "전공적응 어려움": 57.46,
              "학업적응 어려움": 57.26,
            },
            "정신건강 영역": {
              PTSD: 47.82,
              강박: 56.49,
              불안: 67.05,
              우울: 69.48,
              신체화: 41.72,
              공황발작: 44.51,
            },
          },
          result: {
            "관계 영역": {
              overallResult: "주의",
              대인민감성: "안정",
              "대인관계 어려움": "주의",
            },
            "학업 영역": {
              overallResult: "주의",
              학업스트레스: "주의",
              "전공적응 어려움": "주의",
              "학업적응 어려움": "주의",
            },
            "정신건강 영역": {
              PTSD: "안정",
              강박: "안정",
              불안: "주의",
              우울: "주의",
              신체화: "안정",
              공황발작: "안정",
              overallResult: "주의",
            },
          },
          createdAt: "2024-09-12 14:30:43",
        },
        {
          id: 269,
          userName: "tester",
          collegeName: "한신대학교(본교)",
          gender: "Female",
          ageRange: 2,
          session: 58,
          overallResult: "주의",
          point: {
            "관계 영역": {
              대인민감성: 68.3,
              "대인관계 어려움": 58.25,
            },
            "학업 영역": {
              학업스트레스: 60.77,
              "전공적응 어려움": 60.07,
              "학업적응 어려움": 50.98,
            },
            "정신건강 영역": {
              PTSD: 58.46,
              강박: 60.93,
              불안: 58.25,
              우울: 67.82,
              신체화: 69.2,
              공황발작: 68.48,
            },
          },
          result: {
            "관계 영역": {
              overallResult: "주의",
              대인민감성: "주의",
              "대인관계 어려움": "주의",
            },
            "학업 영역": {
              overallResult: "위험",
              학업스트레스: "위험",
              "전공적응 어려움": "위험",
              "학업적응 어려움": "안정",
            },
            "정신건강 영역": {
              PTSD: "안정",
              강박: "주의",
              불안: "안정",
              우울: "주의",
              신체화: "주의",
              공황발작: "주의",
              overallResult: "주의",
            },
          },
          createdAt: "2024-09-12 14:30:43",
        },
        {
          id: 268,
          userName: "tester",
          collegeName: "한신대학교(본교)",
          gender: "Female",
          ageRange: 2,
          session: 57,
          overallResult: "주의",
          point: {
            "관계 영역": {
              대인민감성: 55.06,
              "대인관계 어려움": 49.07,
            },
            "학업 영역": {
              학업스트레스: 50.65,
              "전공적응 어려움": 54.85,
              "학업적응 어려움": 57.26,
            },
            "정신건강 영역": {
              PTSD: 74.42,
              강박: 56.49,
              불안: 67.05,
              우울: 79.44,
              신체화: 46.3,
              공황발작: 52.5,
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
              학업스트레스: "안정",
              "전공적응 어려움": "안정",
              "학업적응 어려움": "주의",
            },
            "정신건강 영역": {
              PTSD: "위험",
              강박: "안정",
              불안: "주의",
              우울: "위험",
              신체화: "안정",
              공황발작: "안정",
              overallResult: "위험",
            },
          },
          createdAt: "2024-09-12 14:30:43",
        },
        {
          id: 267,
          userName: "tester",
          collegeName: "한신대학교(본교)",
          gender: "Female",
          ageRange: 2,
          session: 56,
          overallResult: "주의",
          point: {
            "관계 영역": {
              대인민감성: 64.99,
              "대인관계 어려움": 58.25,
            },
            "학업 영역": {
              학업스트레스: 50.65,
              "전공적응 어려움": 49.63,
              "학업적응 어려움": 50.98,
            },
            "정신건강 영역": {
              PTSD: 47.82,
              강박: 52.05,
              불안: 79.37,
              우울: 77.78,
              신체화: 66.91,
              공황발작: 68.48,
            },
          },
          result: {
            "관계 영역": {
              overallResult: "주의",
              대인민감성: "주의",
              "대인관계 어려움": "주의",
            },
            "학업 영역": {
              overallResult: "안정",
              학업스트레스: "안정",
              "전공적응 어려움": "안정",
              "학업적응 어려움": "안정",
            },
            "정신건강 영역": {
              PTSD: "안정",
              강박: "안정",
              불안: "위험",
              우울: "위험",
              신체화: "주의",
              공황발작: "주의",
              overallResult: "위험",
            },
          },
          createdAt: "2024-09-12 14:30:43",
        },
      ],
    };
    const { totalCount } = dummyResult;
    const emptyArr: {}[] = [];
    map(
      dummyResult.results,
      (item: {
        point: { [key: string]: {} };
        result: { [key: string]: { [key: string]: string } };
      }) => {
        const { point, result, ...rest } = item;

        const copyRest = Object.assign(rest);
        forEach(point, (pointValue, pointKey) => {
          forEach(pointValue, (value, key) => {
            if (key.includes("-")) {
              const leftSide = Math.floor(value);
              const rightSide = Math.floor(value);

              copyRest[key] =
                (Number(value) < 0
                  ? `${100 - Number(leftSide)}%/${leftSide}%`
                  : `${rightSide}%/${100 - Number(rightSide)}%`) +
                `(${result[pointKey][key]})`;
            } else {
              copyRest[key] = `${
                !isNaN(value) ? Number(Math.floor(value)) : value
              }(${result[pointKey][key]})`;
            }
          });
        });

        emptyArr.push(copyRest);
      }
    );

    setTotalPsyData((prev) => {
      return { ...prev, totalCount: totalCount, psyData: emptyArr };
    });

    setPerPage((prev) => {
      return {
        ...prev,
        pageLength: Math.ceil(totalCount / prev.perPage),
      };
    });
    setLoading(false);
  };
  console.log(search);
  useEffect(() => {
    submitSearchPsychology(false);
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

          reset: () => setSearch({ overallResult: "" }),
          submit: () => {
            submitSearchPsychology(true);
            setPerPage((prev) => {
              return { ...prev, page: 1 };
            });
          },
        }}
        additionalArea={
          <>
            <div className="grid items-center w-full grid-cols-3 gap-4 max-sm:grid-cols-1">
              <div className="flex flex-wrap flex-auto col-span-2 gap-4">
                <div className="mr-4 text-xl font-bold min-w-24 max-xl:text-sm">
                  결과
                </div>
                <div className="flex flex-wrap gap-4">
                  <label className="flex gap-2 cursor-pointer label">
                    <input
                      type="radio"
                      name="result"
                      className="radio max-sm:radio-sm"
                      checked={search.overallResult === ""}
                      onChange={() => {
                        setSearch((prev) => {
                          return { ...prev, overallResult: "" };
                        });
                      }}
                    />
                    <span className="label-text max-sm:text-xs">전체</span>
                  </label>
                  <label className="flex gap-2 cursor-pointer label">
                    <input
                      type="radio"
                      name="result"
                      className="radio max-sm:radio-sm"
                      checked={search.overallResult === "위험"}
                      onChange={() => {
                        setSearch((prev) => {
                          return { ...prev, overallResult: "위험" };
                        });
                      }}
                    />
                    <span className="label-text max-sm:text-xs">위험</span>
                  </label>
                  <label className="flex gap-2 cursor-pointer label">
                    <input
                      type="radio"
                      name="result"
                      className="radio max-sm:radio-sm"
                      checked={search.overallResult === "주의"}
                      onChange={() => {
                        setSearch((prev) => {
                          return { ...prev, overallResult: "주의" };
                        });
                      }}
                    />
                    <span className="label-text max-sm:text-xs">주의</span>
                  </label>
                  <label className="flex gap-2 cursor-pointer label">
                    <input
                      type="radio"
                      name="result"
                      className="radio max-sm:radio-sm"
                      checked={search.overallResult === "관심"}
                      onChange={() => {
                        setSearch((prev) => {
                          return { ...prev, overallResult: "관심" };
                        });
                      }}
                    />
                    <span className="label-text max-sm:text-xs">관심</span>
                  </label>
                  <label className="flex gap-2 cursor-pointer label">
                    <input
                      type="radio"
                      name="result"
                      className="radio max-sm:radio-sm"
                      checked={search.overallResult === "안정"}
                      onChange={() => {
                        setSearch((prev) => {
                          return { ...prev, overallResult: "안정" };
                        });
                      }}
                    />
                    <span className="label-text max-sm:text-xs">안정</span>
                  </label>
                </div>
              </div>
              <div className="flex col-span-1 gap-4">
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
            <div className="grid items-center w-full grid-cols-3 gap-4 max-sm:grid-cols-1">
              <div className="flex col-span-2 gap-4">
                <div className="mr-4 text-xl font-bold min-w-24 max-xl:text-sm">
                  성별
                </div>
                <select
                  className="rounded-none join-item select-sm select select-bordered max-xl:select-xs"
                  value={search.gender || ""}
                  onChange={(e) => {
                    setSearch((prev) => {
                      return { ...prev, gender: e.target.value };
                    });
                  }}
                >
                  <option value="">전체</option>
                  <option value="Male">남</option>
                  <option value="Female">여</option>
                </select>
              </div>
              <div className="flex col-span-1 gap-4">
                <div className="mr-4 text-xl font-bold min-w-24 max-xl:text-sm">
                  적용구간
                </div>
                <select
                  className="rounded-none join-item select-sm select select-bordered max-xl:select-xs"
                  value={search.ageRange || ""}
                  onChange={(e) => {
                    setSearch((prev) => {
                      return { ...prev, ageRange: Number(e.target.value) };
                    });
                  }}
                >
                  <option value="">전체</option>
                  <option value={0}>24세 이하</option>
                  <option value={1}>25 ~ 29세</option>
                  <option value={2}>30세 이상</option>
                </select>
              </div>
            </div>
          </>
        }
      />
      <Table
        tableTitle={`조회 ${totalPsyData?.totalCount || "0"} 건`}
        // checkable={{ active: true, multi: false, setter: () => {} }}
        data={totalPsyData?.psyData || []}
        addedMap={addedMap}
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
        additionalTrOptions={additionalTrOptions}
        buttons={
          <button
            className="rounded-none btn btn-sm btn-primary max-sm:btn-xs"
            onClick={() =>
              makeExcel({
                sheetName: "total",
                data: totalPsyData?.psyData || [],
                addedMap: addedMap,
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
