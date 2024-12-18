import { Modal } from "#/components/Modal";
import Table from "#/components/Table";
import { filter, find, findIndex, map, remove, sumBy, times } from "lodash";
import { useEffect, useState } from "react";
import ElleThumbnail from "../../../../assets/image/thumbnail_character_ellie_program_01.png";
import { openModal } from "#/utils/useModalHandler";
import RangeSlider from "#/components/RangeSlider";
import LabelList from "#/components/LabelList";
import api from "#/library/axios/api";
import useLoadingState from "#/library/recoil/hook/useLoadingState";
import { TdObjTypes } from "#/data/types/components";

function index() {
  const params = new URLSearchParams(location.search);

  const { setLoading } = useLoadingState();

  type ProgramDetailTypes = {
    activity: {
      id: number;
      userId: number;
      userName: string;
      collegeName: string;
      programId: number;
      title: string;
      userSequence: number;
      createdAt: string;
      completedAt: string;
      sessions: {
        activityId: number;
        session: number;
        activityStatus: string;
        completedAt: string;
      }[];

      sequences: {
        sequence: number;
        programContentId: number;
        programContentType: string;
        title: string;
        completedAt: string;
      }[];
    };
    goal: {
      goal: string;
      point: null | number;
    }[];
    psychologicalTest: {
      session: number;
      mentalHealth: string;
      relationship: string;
      academic: string;
      overallResult: string;
      result: {
        academic: {
          [key: string]: string;
        };
        mentalHealth: {
          [key: string]: string;
        };
        relationship: {
          [key: string]: string;
        };
      };
    }[];

    mindChat: {
      id: number;
      session: number;
    }[];
    challenge: {
      session: number;
      challengeDomainType: string;
      challenge: string;
      done: boolean;
    }[];
    mindfulness: {
      session: number;
      mindfulnessId: number;
      title: string;
      playTime: number;
      mindfulnessGroupId: number;
    }[];
    quiz: {
      session: number;
      question: string;
      answer: number;
      userAnswer: number;
      timeOut: boolean;
    }[];

    video: {
      session: number;
      title: string;
      done: boolean;
    }[];
  };

  const initialState = {
    activity: {
      id: 0,
      userId: 0,
      userName: "",
      collegeName: "",
      programId: 0,
      title: "",
      userSequence: 0,
      createdAt: "",
      completedAt: "",
      sessions: [],
      sequences: [],
    },
    goal: [{ goal: "", point: null }],
    psychologicalTest: [
      {
        session: 0,
        mentalHealth: "",
        relationship: "",
        academic: "",
        overallResult: "",
        result: {
          academic: {},
          mentalHealth: {},
          relationship: {},
        },
      },
    ],
    mindChat: [{ id: 0, session: 0 }],
    challenge: [
      {
        session: 0,
        challengeDomainType: "",
        challenge: "",
        done: false,
      },
    ],
    mindfulness: [
      {
        session: 0,
        mindfulnessId: 0,
        title: "",
        playTime: 0,
        mindfulnessGroupId: 0,
      },
    ],
    quiz: [
      {
        session: 0,
        question: "",
        answer: 0,
        userAnswer: 0,
        timeOut: false,
      },
    ],
    video: [
      {
        session: 0,
        title: "",
        done: false,
      },
    ],
  };

  const [mindChatId, setMindChatId] = useState(0);
  const [mindChatData, setMindChatData] = useState();

  const [currentSequence, setCurrentSequence] = useState();
  const searchMindChat = (id: number) => {
    // setLoading(true);
    // api
    //   .get(`/admin/program-user/mind-chat/${id}`)
    //   .then((result) => {
    //     setLoading(false);
    //     setMindChatData(result.data);
    //   })
    //   .catch((error) => {
    //     setLoading(false);
    //   });

    const dummyResult: any = [
      {
        sequence: 1,
        question:
          "최근 2-3일(또는 일주일)을 떠올렸을 때, 가장 스트레스 받았던 사건은 어떤 사건이었나요?",
        questionType: "OpenEnded",
        choices: null,
        answer: "ㅋㅋㅋ",
      },
      {
        sequence: 2,
        question: "그 당시, 어떤 감정이 느껴졌나요?",
        questionType: "OpenEnded",
        choices: null,
        answer: "ㅎㅎ",
      },
      {
        sequence: 3,
        question: "다음 중 어떤 감정이었는지 선택해 주세요.",
        questionType: "Slide",
        choices: [
          "절망",
          "절망",
          "우울",
          "우울",
          "불편",
          "불편",
          "불안",
          "불안",
          "분노",
          "분노",
        ],
        answer: "8",
      },
      {
        sequence: 4,
        question: "세부 감정을 모두 선택해 주세요.",
        questionType: "MultipleChoiceSlide",
        choices: [
          "격노한",
          "몹시 화가 난",
          "좌절한",
          "신경이 날카로운",
          "망연자실함",
        ],
        answer: ["격노한", "신경이 날카로운"],
      },
      {
        sequence: 5,
        question:
          "그 감정과 관련해 그 당시 떠올랐던 생각이나 느낌은 어떤 것이었는지 자세히 적어주세요",
        questionType: "OpenEnded",
        choices: null,
        answer: "즐",
      },
    ];

    setMindChatData(dummyResult);
  };

  const searchSequences = (id: number) => {
    setLoading(true);
    api
      .get(`/admin/program-user/sequence/${id}`)
      .then((result) => {
        setLoading(false);
        setProgramDetailData((prev) => {
          return {
            ...prev,
            activity: { ...prev.activity, sequences: result.data.sequences },
          };
        });
      })
      .catch((error) => {
        setLoading(false);
      });
  };
  const [programDetailData, setProgramDetailData] =
    useState<ProgramDetailTypes>(initialState);
  const [opend, setOpend] = useState<string[]>([
    "목표설정",
    "심리검사",
    "구조화 질문",
    "챌린지",
    "명상",
    "퀴즈",
    "미디어",
  ]);

  const challengeDomainMap = new Map([
    ["autonomy", "자율성"],
    ["competence", "유능성"],
    ["relatedness", "관계성"],
  ]);

  // 심리검사 데이터 핸들링
  const mainCategory: Array<"mentalHealth" | "academic" | "relationship"> = [
    "mentalHealth",
    "relationship",
    "academic",
  ];
  const [psychologicalTestData, setPsychologicalTestData] = useState<any>();

  useEffect(() => {
    // setLoading(true);
    // api
    //   .get(`/admin/program-user/${params.get("id")}`)
    //   .then((result) => {
    //     setLoading(false);
    //     setProgramDetailData(result.data);

    //     const target = find(
    //       result.data.activity.sequences,
    //       (item) => !("completedAt" in item)
    //     );

    //     const current = target
    //       ? result.data.activity.sequences.indexOf(target)
    //       : -1;

    //     setCurrentSequence(current);
    //   })
    //   .catch((error) => {
    //     setLoading(false);
    //   });

    const dummyResult: any = {
      activity: {
        id: 181,
        userId: 53,
        userName: "이형래래",
        collegeName: "서울대학교(본교)",
        programId: 1,
        title: "마음운동",
        userSequence: 1,
        createdAt: "2024-11-19 12:50:34",
        completedAt: "2024-11-19 14:29:43",
        sessions: [
          {
            activityId: 171,
            session: 1,
            activityStatus: "Completed",
            completedAt: "2024-11-19 12:50:32",
          },
          {
            activityId: 181,
            session: 2,
            activityStatus: "Completed",
            completedAt: "2024-11-19 14:29:43",
          },
        ],
        sequences: [
          {
            sequence: 1,
            programContentId: 5,
            programContentType: "Quiz",
            title: "심리 퀴즈",
            session: 2,
            completedAt: "2024-11-19 14:23:43",
          },
          {
            sequence: 2,
            programContentId: 8,
            programContentType: "Video",
            title: "이완 훈련",
            session: 2,
            completedAt: "2024-11-19 14:24:25",
          },
          {
            sequence: 3,
            programContentId: 2,
            programContentType: "Challenge",
            title: "마음 챌린지",
            session: 2,
            completedAt: "2024-11-19 14:24:32",
          },
          {
            sequence: 4,
            programContentId: 7,
            programContentType: "MindChat",
            title: "마음관리 대화",
            session: 2,
            completedAt: "2024-11-19 14:24:54",
          },
          {
            sequence: 5,
            programContentId: 6,
            programContentType: "Mindfulness",
            title: "마음챙김 명상",
            session: 2,
            completedAt: "2024-11-19 14:29:21",
          },
          {
            sequence: 6,
            programContentId: 4,
            programContentType: "PsychologicalTest",
            title: "마음 점검",
            session: 2,
            completedAt: "2024-11-19 14:29:37",
          },
          {
            sequence: 7,
            programContentId: 14,
            programContentType: "Result",
            title: "결과 확인",
            session: 2,
            completedAt: "2024-11-19 14:29:43",
          },
        ],
      },
      goal: [
        {
          goal: "내 감정을 이해하고 싶어요.",
          point: null,
        },
        {
          goal: "사람들과 갈등을 만들고 싶지 않아요.",
          point: null,
        },
        {
          goal: "새로운 친구를 만들고 싶어요.",
          point: null,
        },
      ],
      psychologicalTest: [
        {
          session: 1,
          mentalHealth: "안정",
          relationship: "주의",
          academic: "위험",
          overallResult: "주의",
          result: {
            academic: {
              학업스트레스: "위험",
              "전공적응 어려움": "안정",
            },
            mentalHealth: {
              불안: "안정",
              우울: "안정",
            },
            relationship: {
              대인민감성: "안정",
              "대인관계 어려움": "주의",
            },
          },
        },
        {
          session: 2,
          mentalHealth: "위험",
          relationship: "위험",
          academic: "위험",
          overallResult: "위험",
          result: {
            academic: {
              학업스트레스: "위험",
              "전공적응 어려움": "안정",
            },
            mentalHealth: {
              불안: "위험",
              우울: "위험",
            },
            relationship: {
              대인민감성: "위험",
              "대인관계 어려움": "주의",
            },
          },
        },
      ],
      mindChat: [
        {
          id: 890,
          session: 1,
        },
        {
          id: 922,
          session: 2,
        },
      ],
      challenge: [
        {
          session: 1,
          challengeDomainType: "autonomy",
          challenge: "친구와 함께 기지개 켜기",
          done: false,
        },
        {
          session: 1,
          challengeDomainType: "competence",
          challenge: "마음일기에 수면 기록하기",
          done: false,
        },
        {
          session: 1,
          challengeDomainType: "autonomy",
          challenge: "캠퍼스 내 산책하기",
          done: true,
        },
        {
          session: 1,
          challengeDomainType: "autonomy",
          challenge: "일어나서 미지근한 물 1컵 마시기",
          done: true,
        },
        {
          session: 1,
          challengeDomainType: "autonomy",
          challenge: "수면시간 8시간 지키기",
          done: false,
        },
        {
          session: 2,
          challengeDomainType: "autonomy",
          challenge: "피곤할 때 15분 잠자기",
          done: false,
        },
        {
          session: 2,
          challengeDomainType: "competence",
          challenge: "유튜브 보면서 간단한 홈트레이닝 하기",
          done: false,
        },
        {
          session: 2,
          challengeDomainType: "autonomy",
          challenge: "명상 1개 해보기",
          done: false,
        },
      ],
      mindfulness: [
        {
          session: 1,
          mindfulnessId: 1,
          title: "처음 시작하는 마음챙김",
          playTime: 398,
          mindfulnessGroupId: 2,
        },
        {
          session: 2,
          mindfulnessId: 2,
          title: "호흡으로 편안해지는 마음챙김",
          playTime: 365,
          mindfulnessGroupId: 2,
        },
      ],
      quiz: [
        {
          session: 1,
          question: "규칙적인 수면이 정신건강에 중요하다.",
          answer: 1,
          userAnswer: 0,
          timeOut: false,
        },
        {
          session: 2,
          question: "명상은 모든 사람에게 적합하지 않다.",
          answer: 1,
          userAnswer: 1,
          timeOut: false,
        },
      ],
      video: [
        {
          session: 1,
          title: "호흡 훈련",
          done: true,
        },
        {
          session: 2,
          title: "이완 훈련",
          done: true,
        },
        {
          session: 3,
          title: "호흡 훈련",
          done: false,
        },
        {
          session: 4,
          title: "이완 훈련",
          done: false,
        },
        {
          session: 5,
          title: "호흡 훈련",
          done: false,
        },
        {
          session: 6,
          title: "이완 훈련",
          done: false,
        },
        {
          session: 7,
          title: "호흡 훈련",
          done: false,
        },
        {
          session: 8,
          title: "이완 훈련",
          done: false,
        },
      ],
    };
    setLoading(false);
    setProgramDetailData(dummyResult);

    const target = find(
      dummyResult.activity.sequences,
      (item) => !("completedAt" in item)
    );

    const current = target
      ? dummyResult.activity.sequences.indexOf(target)
      : -1;

    setCurrentSequence(current);
  }, []);

  useEffect(() => {
    const mainCategoryMap = new Map([
      ["mentalHealth", "정신건강영역"],
      ["relationship", "관계영역"],
      ["academic", "학업영역"],
    ]);

    const reverseTableData: {}[] = [];
    const copy =
      (programDetailData && [...programDetailData.psychologicalTest]) || [];

    times(mainCategory.length, (firstItem) => {
      const obj: { [key: string]: string } = {};

      obj.category = mainCategoryMap.get(mainCategory[firstItem]) || "";

      times(8, (innerItem) => {
        obj[`times${innerItem + 1}`] = copy[innerItem]
          ? copy[innerItem][mainCategory[firstItem]]
          : "-";
      });

      reverseTableData.push(obj);

      const subCategory = Object.keys(
        copy[0]?.result[mainCategory[firstItem]] || {}
      );
      map(subCategory, (secondItem) => {
        const obj2: { [key: string]: string } = {};
        obj2.category = secondItem;
        times(8, (innerItem) => {
          obj2[`times${innerItem + 1}`] = copy[innerItem]
            ? copy[innerItem].result[mainCategory[firstItem]][secondItem]
            : "-";
        });
        reverseTableData.push(obj2);
      });
      setPsychologicalTestData(reverseTableData);
    });
  }, [programDetailData]);
  return (
    <div className="flex flex-col">
      <div className="flex flex-wrap gap-4 max-2xl:gap-10">
        <div className="w-full pb-10 border-b border-gray-300">
          <div className="mb-4 text-2xl font-bold max-lg:text-lg">
            프로그램 내역
          </div>
          <div className="col-span-2 px-2 py-1 my-1 text-lg text-white bg-primary">
            참여정보
          </div>
          <div className="flex flex-wrap gap-10 mt-4 max-lg:gap-4">
            <div className="flex-1">
              <div className="flex flex-col flex-wrap gap-4">
                <div className="flex flex-wrap gap-4">
                  <div className="text-lg min-w-24 max-lg:text-sm">내역 ID</div>
                  <div className="text-lg font-bold whitespace-nowrap max-lg:text-sm">
                    {programDetailData?.activity.id || ""}
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-lg min-w-24 whitespace-nowrap max-lg:text-sm">
                    UID
                  </div>
                  <div className="text-lg font-bold whitespace-nowrap max-lg:text-sm">
                    {programDetailData?.activity.userId || ""}
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-lg min-w-24 whitespace-nowrap max-lg:text-sm">
                    진행상태
                  </div>
                  <div className="text-lg font-bold whitespace-nowrap max-lg:text-sm">
                    {!programDetailData?.activity.sessions[7]?.completedAt ||
                    programDetailData?.activity.sessions[7]?.completedAt ===
                      null
                      ? "진행중"
                      : "완료"}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex flex-col flex-wrap gap-4">
                <div className="flex gap-4">
                  <div className="text-lg min-w-24 whitespace-nowrap max-lg:text-sm">
                    프로그램명
                  </div>
                  <div className="text-lg font-bold whitespace-nowrap max-lg:text-sm">
                    {programDetailData?.activity.title || ""}
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-lg min-w-24 whitespace-nowrap max-lg:text-sm">
                    이름
                  </div>
                  <div className="text-lg font-bold whitespace-nowrap max-lg:text-sm">
                    {programDetailData?.activity.userName || ""}
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="text-lg min-w-24 whitespace-nowrap max-lg:text-sm">
                    참여 일시
                  </div>
                  <div className="text-lg font-bold whitespace-nowrap max-lg:text-sm">
                    {programDetailData?.activity.createdAt || ""}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex flex-col flex-wrap gap-4">
                <div className="flex gap-4">
                  <div className="text-lg min-w-24 whitespace-nowrap max-lg:text-sm">
                    프로그램 ID
                  </div>
                  <div className="text-lg font-bold whitespace-nowrap max-lg:text-sm">
                    {programDetailData?.activity.programId || ""}
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-lg min-w-24 whitespace-nowrap max-lg:text-sm">
                    학교
                  </div>
                  <div className="text-lg font-bold whitespace-nowrap max-lg:text-sm">
                    {programDetailData?.activity.collegeName || ""}
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="text-lg min-w-24 whitespace-nowrap max-lg:text-sm">
                    완료 일시
                  </div>
                  <div className="text-lg font-bold whitespace-nowrap max-lg:text-sm">
                    {programDetailData?.activity.completedAt || ""}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex flex-col flex-wrap gap-4">
                <div className="flex gap-4">
                  <div className="text-lg min-w-24 whitespace-nowrap max-lg:text-sm">
                    회차
                  </div>
                  <div className="text-lg font-bold whitespace-nowrap max-lg:text-sm">
                    {programDetailData?.activity.userSequence || ""}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <ul className="flex flex-wrap gap-4 mt-10"> */}
          <ul className="grid grid-cols-8 gap-4 mt-10 max-lg:grid-cols-4">
            {times(8, (item) => {
              return (
                <li
                  className={`${
                    programDetailData?.activity.sessions[item]?.completedAt
                      ? "bg-[#F1EFFD]"
                      : "bg-[#F8F8FB]"
                  } cursor-pointer col-span-1 flex rounded-2xl flex-col items-center justify-start gap-1 py-2 flex-shrink-0 flex-grow-0`}
                  key={`${item}`}
                  onClick={() => {
                    // if (
                    //   programDetailData?.activity.sessions[item]
                    //     ?.activityStatus === "Completed" ||
                    //   programDetailData?.activity.sessions[item]
                    //     ?.activityStatus === "InProgress"
                    // ) {
                    //   searchSequences(
                    //     programDetailData?.activity.sessions[item].activityId
                    //   );
                    // }
                  }}
                >
                  <div className="min-w-1 min-h-[26px]">
                    {programDetailData?.activity.sessions[item]
                      ?.activityStatus === "Completed" ? (
                      <div className="rounded-full btn btn-xs btn-primary">
                        완료
                      </div>
                    ) : (
                      programDetailData?.activity.sessions[item]
                        ?.activityStatus === "InProgress" && (
                        <div className="rounded-full btn btn-xs bg-[#5b4ac1] text-white">
                          진행중
                        </div>
                      )
                    )}
                  </div>
                  <div
                    className={`${
                      programDetailData?.activity.sessions[item]?.completedAt ||
                      item + 1 === programDetailData?.activity.sessions.length
                        ? "text-[#5B4AC1]"
                        : "text-[#7F7F85]"
                    } text-2xl font-bold text-[#5B4AC1] max-lg:text-base`}
                  >
                    {item + 1 || ""}회기
                  </div>
                  <div className="text-xs text-center min-h-4 text-[#5B4AC1] max-lg:text-xs">
                    {programDetailData?.activity.sessions[item]?.completedAt ||
                      ""}
                  </div>
                </li>
              );
            })}
          </ul>
          <ul className="flex flex-wrap gap-4 mt-6">
            {map(programDetailData?.activity.sequences, (item, index) => {
              return (
                <li
                  className={`
                  
                  ${
                    !item.completedAt &&
                    currentSequence === index &&
                    "!bg-[#725DF2]"
                  }
                  ${
                    item.completedAt ? "bg-[#F1EFFD]" : "bg-[#F8F8FB]"
                  } flex rounded-2xl flex-col items-center justify-center gap-1 py-2 px-4 min-w-36 `}
                  key={`${item.title}-${index}`}
                >
                  <div
                    className={`
                    ${
                      !item.completedAt &&
                      currentSequence === index &&
                      "!text-white"
                    }
                  text-xs text-[#5B4AC1] w-full text-left max-lg:text-xs`}
                  >
                    {item.sequence || ""} 단계
                  </div>
                  <div
                    className={`
                    ${
                      !item.completedAt &&
                      currentSequence === index &&
                      "!text-white"
                    }
                    text-left w-full text-lg font-bold text-[#5B4AC1] max-lg:text-base`}
                  >
                    {item.title || ""}
                  </div>
                  <div className="min-h-4 text-xs text-[#5B4AC1] px-4 max-lg:text-xs">
                    {item.completedAt || ""}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="flex flex-col w-full gap-10 pb-10">
          <div className="flex flex-col">
            <div className="flex justify-between w-full px-2 py-1 text-lg text-white bg-primary">
              <p>목표설정</p>
              <span
                onClick={() => {
                  const copy = [...opend];
                  if (copy.includes("목표설정")) {
                    const removed = remove(copy, (item) => item !== "목표설정");
                    setOpend(removed);
                  } else {
                    copy.push("목표설정");
                    setOpend(copy);
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </span>
            </div>

            {opend.includes("목표설정") && (
              <Table
                className="!gap-0"
                divider={false}
                data={programDetailData?.goal || []}
                addedMap={[
                  ["goal", "설정목표"],
                  ["point", "결과"],
                ]}
                tdOptions={{
                  point: {
                    el: (item: number | null) => {
                      if (item === null) {
                        return <span>-</span>;
                      }

                      const subText =
                        item === 0
                          ? "달성하지 못했다"
                          : item === 1 || item === 2
                          ? "조금 달성한 것 같다"
                          : item === 3 || item === 4
                          ? "많이 달성한 것 같다"
                          : "완벽히 달성했다";
                      return (
                        <span className="btn btn-primary btn-xs">
                          {`${item} 점`} {subText}
                        </span>
                      );
                    },
                  },
                }}
              />
            )}
          </div>

          <div className="flex flex-col">
            <div className="flex justify-between w-full px-2 py-1 text-lg text-white bg-primary ">
              <p>심리검사</p>
              <span
                onClick={() => {
                  const copy = [...opend];
                  if (copy.includes("심리검사")) {
                    const removed = remove(copy, (item) => item !== "심리검사");
                    setOpend(removed);
                  } else {
                    copy.push("심리검사");
                    setOpend(copy);
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </span>
            </div>
            {opend.includes("심리검사") && (
              <Table
                className="!gap-0"
                divider={false}
                data={psychologicalTestData || []}
                trOptions={{
                  tbody: {
                    className: (item: TdObjTypes, index: number) => {
                      // if (
                      //   index === 0 ||
                      //   index === 3 ||
                      //   index === 6 ||
                      //   index === 9
                      // ) {
                      //   return "!font-bold text-base";
                      // }

                      if (
                        item.category === "정신건강영역" ||
                        item.category === "관계영역" ||
                        item.category === "학업영역"
                      ) {
                        return "!font-bold text-base";
                      }
                    },
                  },
                }}
                addedMap={[
                  ["category", "구분"],
                  ["times1", "1회기"],
                  ["times2", "2회기"],
                  ["times3", "3회기"],
                  ["times4", "4회기"],
                  ["times5", "5회기"],
                  ["times6", "6회기"],
                  ["times7", "7회기"],
                  ["times8", "8회기"],
                ]}
              />
            )}
          </div>

          <div className="flex flex-col">
            <div className="flex justify-between w-full px-2 py-1 text-lg text-white bg-primary ">
              <p>구조화 질문</p>
              <span
                onClick={() => {
                  const copy = [...opend];
                  if (copy.includes("구조화 질문")) {
                    const removed = remove(
                      copy,
                      (item) => item !== "구조화 질문"
                    );
                    setOpend(removed);
                  } else {
                    copy.push("구조화 질문");
                    setOpend(copy);
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </span>
            </div>

            {opend.includes("구조화 질문") && (
              <ul className="grid grid-cols-[repeat(auto-fit,minmax(100px,calc(11%)))] justify-between gap-4 mt-6">
                {times(8, (item) => {
                  return (
                    <li
                      className="flex flex-col items-center justify-center col-span-1 gap-2"
                      key={`${item}`}
                    >
                      <div
                        className={`${
                          item <
                          (programDetailData?.mindChat
                            ? programDetailData?.mindChat?.length
                            : 0)
                            ? "btn-primary"
                            : ""
                        } w-full rounded-full pointer-events-none min-w-fit btn btn-lg cursor-none`}
                      >
                        {/* {programDetailData.mindChat[item]?.session}회기 */}
                        {item + 1}회기
                      </div>
                      <p
                        className="flex text-xs cursor-pointer"
                        onClick={() => {
                          if (programDetailData?.mindChat[item]) {
                            openModal("mind-chat");
                            searchMindChat(
                              programDetailData?.mindChat[item].id
                            );
                          }
                        }}
                      >
                        대화 보기
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m8.25 4.5 7.5 7.5-7.5 7.5"
                            />
                          </svg>
                        </span>
                      </p>
                    </li>
                  );
                })}
                {/* {map(programDetailData.mindChat, (item, index) => {
                  return (
                    <li
                      className="flex flex-col items-center justify-center col-span-1 gap-2"
                      key={`${item}-${index}`}
                    >
                      <div className="w-full rounded-full pointer-events-none min-w-fit btn btn-primary btn-lg cursor-none">
                        {item.session}회기
                      </div>
                      <p
                        className="flex text-xs cursor-pointer"
                        onClick={() => openModal("mind-chat")}
                      >
                        대화 보기
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m8.25 4.5 7.5 7.5-7.5 7.5"
                            />
                          </svg>
                        </span>
                      </p>
                    </li>
                  );
                })} */}
              </ul>
            )}
          </div>

          <div className="flex flex-col">
            <div className="flex justify-between w-full px-2 py-1 text-lg text-white bg-primary ">
              <p>챌린지</p>
              <span
                onClick={() => {
                  const copy = [...opend];
                  if (copy.includes("챌린지")) {
                    const removed = remove(copy, (item) => item !== "챌린지");
                    setOpend(removed);
                  } else {
                    copy.push("챌린지");
                    setOpend(copy);
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </span>
            </div>
            {opend.includes("챌린지") && (
              <>
                <Table
                  className="!gap-0"
                  divider={false}
                  data={programDetailData?.challenge || []}
                  addedMap={[
                    ["session", "회기"],
                    ["challenge", "선택 챌린지"],
                    ["challengeDomainType", "요인"],
                    ["done", "실천 여부"],
                  ]}
                  tdOptions={{
                    challengeDomainType: {
                      el: (item: string) => {
                        return <span>{challengeDomainMap.get(item)}</span>;
                      },
                    },
                    done: {
                      el: (item: boolean) => {
                        return <span>{item === true ? "O" : "X"}</span>;
                      },
                    },
                  }}
                />

                <div className="flex justify-end w-full gap-4 my-4">
                  {map(Array.from(challengeDomainMap), (mapItem, index) => {
                    return (
                      <div key={index}>
                        <span className="text-lg font-bold">
                          {mapItem[1]}
                          {
                            filter(
                              programDetailData.challenge,
                              (item) =>
                                item.challengeDomainType === mapItem[0] &&
                                item.done === true
                            ).length
                          }
                        </span>
                        <span>
                          (관심 :{" "}
                          {
                            filter(
                              programDetailData.challenge,
                              (item) => item.challengeDomainType === mapItem[0]
                            ).length
                          }
                          )
                        </span>
                      </div>
                    );
                  })}
                  {/* <div>
                    <span className="text-lg font-bold">
                      자율성{" "}
                      {
                        filter(
                          programDetailData.challenge,
                          (item) =>
                            item.challengeDomainType === "autonomy" &&
                            item.done === true
                        ).length
                      }
                    </span>
                    <span>
                      (관심 :{" "}
                      {
                        filter(
                          programDetailData.challenge,
                          (item) => item.challengeDomainType === "autonomy"
                        ).length
                      }
                      )
                    </span>
                  </div>
                  <div>
                    <span className="text-lg font-bold">유능성</span>
                    <span>(관심 : 3)</span>
                  </div>
                  <div>
                    <span className="text-lg font-bold">관계성</span>
                    <span>(관심 : 3)</span>
                  </div> */}
                </div>
              </>
            )}
          </div>

          <div className="flex flex-col">
            <div className="flex justify-between w-full px-2 py-1 text-lg text-white bg-primary ">
              <p>명상</p>
              <span
                onClick={() => {
                  const copy = [...opend];
                  if (copy.includes("명상")) {
                    const removed = remove(copy, (item) => item !== "명상");
                    setOpend(removed);
                  } else {
                    copy.push("명상");
                    setOpend(copy);
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </span>
            </div>
            {opend.includes("명상") && (
              <>
                <Table
                  className="!gap-0"
                  divider={false}
                  data={programDetailData?.mindfulness || []}
                  addedMap={[
                    ["session", "회기"],
                    ["mindfulnessGroupId", "그룹 ID"],
                    ["mindfulnessId", "명상 ID"],
                    ["title", "명상 제목"],
                    ["playTime", "청취 시간"],
                  ]}
                  tdOptions={{
                    playTime: {
                      el: (item: number) => {
                        const minute = Math.floor(item / 60);

                        const minuteStr = minute < 10 ? `0${minute}` : minute;

                        const second = item % 60;
                        const secondStr = second < 10 ? `0${second}` : second;

                        return <span>{`${minuteStr}:${secondStr}`}</span>;
                      },
                    },
                  }}
                />

                <div className="flex justify-end w-full gap-4 my-4">
                  <span className="text-lg font-bold">총 플레이타임</span>
                  <span>
                    {Math.floor(
                      sumBy(
                        programDetailData.mindfulness,
                        (item) => item.playTime
                      ) / 60
                    )}
                    :
                    {sumBy(
                      programDetailData.mindfulness,
                      (item) => item.playTime
                    ) % 60}
                  </span>
                </div>
              </>
            )}
          </div>

          <div className="flex flex-col">
            <div className="flex justify-between w-full px-2 py-1 text-lg text-white bg-primary ">
              <p>퀴즈</p>
              <span
                onClick={() => {
                  const copy = [...opend];
                  if (copy.includes("퀴즈")) {
                    const removed = remove(copy, (item) => item !== "퀴즈");
                    setOpend(removed);
                  } else {
                    copy.push("퀴즈");
                    setOpend(copy);
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </span>
            </div>
            {opend.includes("퀴즈") && (
              <>
                <Table
                  className="!gap-0"
                  divider={false}
                  data={programDetailData?.quiz || []}
                  addedMap={[
                    ["session", "회기"],
                    ["question", "퀴즈"],
                    ["answer", "답"],
                    ["userAnswer", "채점 결과"],
                  ]}
                  tdOptions={{
                    answer: {
                      el: (item: number) => {
                        return <span>{item === 0 ? "X" : "O"}</span>;
                      },
                    },
                    userAnswer: {
                      el: (item: number, index: number) => {
                        return (
                          <span>
                            {item === programDetailData?.quiz[index]?.answer
                              ? "정답"
                              : "오답"}
                            {programDetailData?.quiz[index]?.timeOut === true
                              ? ` (시간초과)`
                              : ""}
                          </span>
                        );
                      },
                    },
                  }}
                />
              </>
            )}
          </div>

          <div className="flex flex-col">
            <div className="flex justify-between w-full px-2 py-1 text-lg text-white bg-primary ">
              <p>미디어</p>
              <span
                onClick={() => {
                  const copy = [...opend];
                  if (copy.includes("미디어")) {
                    const removed = remove(copy, (item) => item !== "미디어");
                    setOpend(removed);
                  } else {
                    copy.push("미디어");
                    setOpend(copy);
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </span>
            </div>
            {opend.includes("미디어") && (
              <>
                <Table
                  className="!gap-0"
                  divider={false}
                  data={programDetailData?.video || []}
                  addedMap={[
                    ["session", "회기"],
                    ["title", "미디어"],
                    ["done", "수행여부"],
                  ]}
                  tdOptions={{
                    done: {
                      el: (item: boolean) => {
                        return <span>{item === true ? "O" : "X"}</span>;
                      },
                    },
                  }}
                />
              </>
            )}
          </div>
        </div>
      </div>

      <Modal id="mind-chat">
        <div id="chats" className="flex flex-col gap-4 pb-10 overflow-auto">
          {map(mindChatData, (item: any, index) => {
            if (item.questionType === "OpenEnded") {
              return (
                <>
                  <div className="pr-16">
                    <div className="mb-1 text-gray-600 body5 indent-1 ml-[40px]">
                      앨리
                    </div>
                    <div className="flex items-end gap-2">
                      <div className="w-[32px] flex-shrink-0">
                        <img
                          className="w-full"
                          src={ElleThumbnail}
                          alt="앨리 썸네일"
                        />
                      </div>
                      <div className="inline-flex px-4 py-3 bg-gray-200 rounded-2xl !rounded-bl-[4px] max-w-fit break-keep">
                        {item.question}
                      </div>
                    </div>
                  </div>
                  <div
                    className="relative inline-flex px-4 ml-auto py-3  text-white bg-primary body4 rounded-2xl !rounded-br-[4px] break-all"
                    style={{ maxWidth: "calc(100% - 64px)" }}
                  >
                    {item.answer}
                  </div>
                </>
              );
            }

            if (item.questionType === "Slide") {
              return (
                <>
                  <div className="pr-16">
                    <div className="mb-1 text-gray-600 body5 indent-1 ml-[40px]">
                      앨리
                    </div>
                    <div className="flex items-end gap-2">
                      <div className="w-[32px] flex-shrink-0">
                        <img
                          className="w-full"
                          src={ElleThumbnail}
                          alt="앨리 썸네일"
                        />
                      </div>
                      <div className="inline-flex px-4 py-3 bg-gray-200 rounded-2xl !rounded-bl-[4px] max-w-fit break-keep">
                        {item.question}
                      </div>
                    </div>
                    <div className="ml-10">
                      <RangeSlider value={Number(item.answer)} />
                    </div>
                  </div>
                  {/* <div
                    className="relative inline-flex px-4 ml-auto py-3  text-white bg-primary body4 rounded-2xl !rounded-br-[4px] break-all"
                    style={{ maxWidth: "calc(100% - 64px)" }}
                  >
                    {item.answer}
                  </div> */}
                </>
              );
            }
            if (item.questionType === "MultipleChoiceSlide") {
              return (
                <>
                  <div className="pr-16">
                    <div className="mb-1 text-gray-600 body5 indent-1 ml-[40px]">
                      앨리
                    </div>
                    <div className="flex items-end gap-2">
                      <div className="w-[32px] flex-shrink-0">
                        <img
                          className="w-full"
                          src={ElleThumbnail}
                          alt="앨리 썸네일"
                        />
                      </div>
                      <div className="inline-flex px-4 py-3 bg-gray-200 rounded-2xl !rounded-bl-[4px] max-w-fit break-keep">
                        {item.question}
                      </div>
                    </div>
                    <div className="mt-5 ml-10">
                      <LabelList
                        choices={item.choices}
                        selected={item.answer}
                      />
                    </div>
                  </div>
                  {/* <div
                    className="relative inline-flex px-4 ml-auto py-3  text-white bg-primary body4 rounded-2xl !rounded-br-[4px] break-all"
                    style={{ maxWidth: "calc(100% - 64px)" }}
                  >
                    {item.answer}
                  </div> */}
                </>
              );
            }
          })}
          {/* <div className="pr-16">
            <div className="mb-1 text-gray-600 body5 indent-1 ml-[40px]">
              앨리
            </div>
            <div className="flex items-end gap-2">
              <div className="w-[32px] flex-shrink-0">
                <img className="w-full" src={ElleThumbnail} alt="앨리 썸네일" />
              </div>
              <div className="inline-flex px-4 py-3 bg-gray-200 rounded-2xl !rounded-bl-[4px] max-w-fit break-keep">
                대충 텍스트
              </div>
            </div>
            <div className="ml-10">
              <RangeSlider value={1} />
            </div>

            <div className="ml-10">
              <LabelList choices={["가", "나", "다", "라"]} selected={["가"]} />
            </div>
          </div>
          <div
            className="relative inline-flex px-4 ml-auto py-3  text-white bg-primary body4 rounded-2xl !rounded-br-[4px] break-all"
            style={{ maxWidth: "calc(100% - 64px)" }}
          >
            그래그래
          </div> */}
        </div>
      </Modal>
    </div>
  );
}

export default index;
