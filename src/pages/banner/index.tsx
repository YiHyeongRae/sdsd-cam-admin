import Table from "../../components/Table";
import { useEffect, useState } from "react";
import { Modal } from "../../components/Modal";
import { closeModal, openModal } from "../../utils/useModalHandler";
import Calendar from "../../components/Calendar";
import useDateTimes from "#/utils/useDateTimes";
import useLoadingState from "#/library/recoil/hook/useLoadingState";
import { useRecoilState } from "recoil";
import { loadingState } from "#/library/recoil/atoms/loadingState";
import api from "#/library/axios/api";
import { Alert } from "#/components/Alert";
import { TdObjTypes } from "#/data/types/components";
import { isEqual, map, sortBy } from "lodash";

function index() {
  const [bannerData, setBannerData] = useState<
    { [key: string]: number | string | boolean }[]
  >([]);
  const { setLoading } = useLoadingState();
  const [perPage, setPerPage] = useState({
    page: 1,
    perPage: 20,
    pageLength: 1,
  });
  const [tbodyTrdraggable, setTbodyTrDraggable] = useState(false);
  const [freezeBanner, setFreezeBanner] = useState<
    { [key: string]: number | string | boolean }[]
  >([]);

  const submitGetBanner = () => {
    // setLoading(true);
    // api
    //   .get("/admin/banner", {
    //     params: {
    //       page: perPage.page,
    //       pageSize: perPage.perPage,
    //     },
    //   })
    //   .then((result) => {
    //     const sort = sortBy(result, [(item) => item.isActive !== true]);
    //     setBannerData(sort);

    //     const copy = JSON.parse(JSON.stringify(sort));
    //     setFreezeBanner(copy);
    //     setPerPage((prev) => {
    //       return {
    //         ...prev,
    //         pageLength: Math.ceil(result.data.length / prev.perPage),
    //       };
    //     });
    //     setTbodyTrDraggable(false);
    //     setLoading(false);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     setLoading(false);
    //   });

    const dummyResult: any = [
      {
        id: 1,
        location: "홈",
        title: "홈",
        bannerImage:
          "https://ssokdak.s3.ap-northeast-2.amazonaws.com/banner/1724637220754_dog.jpeg",
        isActive: true,
        periodStartDate: "2024-08-01",
        periodEndDate: "2024-08-31",
      },
      {
        id: 3,
        location: "커뮤니티",
        title: "커뮤니티 테스트",
        bannerImage:
          "https://ssokdak.s3.ap-northeast-2.amazonaws.com/banner/1724725526615_banner.png",
        isActive: true,
        periodStartDate: "2024-08-01",
        periodEndDate: "2024-08-31",
      },
      {
        id: 2,
        location: "커뮤니티",
        title: "커뮤니티 테스트",
        bannerImage:
          "https://ssokdak.s3.ap-northeast-2.amazonaws.com/banner/1724725525163_banner.png",
        isActive: true,
        periodStartDate: "2024-08-01",
        periodEndDate: "2024-08-31",
      },
      {
        id: 4,
        location: "홈",
        title: "상시노출 배너",
        bannerImage:
          "https://ssokdak.s3.ap-northeast-2.amazonaws.com/banner/1724731641672_abcdef%20%C3%A1%C2%84%C2%87%C3%A1%C2%85%C2%A9%C3%A1%C2%86%C2%A8%C3%A1%C2%84%C2%89%C3%A1%C2%85%C2%A1%C3%A1%C2%84%C2%87%C3%A1%C2%85%C2%A9%C3%A1%C2%86%C2%AB.png",
        isActive: false,
        periodStartDate: null,
        periodEndDate: null,
      },
    ];
    const sort = sortBy(dummyResult, [(item) => item.isActive !== true]);
    setBannerData(sort);

    const copy = JSON.parse(JSON.stringify(sort));
    setFreezeBanner(copy);
    setPerPage((prev) => {
      return {
        ...prev,
        pageLength: Math.ceil(dummyResult.length / prev.perPage),
      };
    });
    setTbodyTrDraggable(false);
    setLoading(false);
  };

  useEffect(() => {
    submitGetBanner();
  }, [perPage.page, perPage.perPage]);

  const calendarRegExp = /^\d{0,4}(\/\d{0,2})?(\/\d{0,2})?$/;

  const [bannerDetail, setBannerDetail] = useState({
    id: 0,
    location: "홈",
    title: "",
    isActive: false,
  });

  const [bannerType, setBannerType] = useState<"always" | "period">("always");
  const [bannerFile, setBannerFile] = useState<File | null>(null);

  const [targetBanner, setTargetBanner] = useState<{
    [key: string]: string | number | boolean;
  }>({});
  const [isEdit, setIsEdit] = useState(false);

  const addedMap = [
    ["id", "배너ID"],
    ["location", "위치"],
    ["title", "제목"],
    ["bannerImage", "배너 이미지"],
    ["isActive", "사용"],
  ];

  const [openCalendar, setOpenCalendar] = useState<"start" | "end" | "">("");
  const [period, setPeriod] = useState({
    startDate: "",
    endDate: "",
  });

  const submitBannerDetail = () => {
    const bannerForm = new FormData();
    if (bannerFile !== null) {
      bannerForm.append("bannerImage", bannerFile);
    }

    bannerForm.append("location", bannerDetail.location);
    bannerForm.append("title", bannerDetail.title);

    if (period.startDate !== "" && period.endDate !== "") {
      bannerForm.append("periodStartDate", period.startDate);
      bannerForm.append("periodEndDate", period.endDate);
    }
    bannerForm.append("isActive", String(bannerDetail.isActive));
    api.post("/admin/banner", bannerForm, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    submitGetBanner();
  };

  const changeBannerAcitve = () => {
    const bannerFrom = new FormData();

    bannerFrom.append("bannerId", String(targetBanner.id));
    bannerFrom.append("location", String(targetBanner.location));
    bannerFrom.append("title", String(targetBanner.title));

    bannerFrom.append("isActive", String(targetBanner.changeActive));
    api.put("/admin/banner", bannerFrom, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    submitGetBanner();
  };

  const [bannerSequence, setBannerSequence] = useState<TdObjTypes[]>([]);
  const submitPutBannerSequence = () => {
    const copy = [...bannerSequence];

    const emptyArr: {}[] = [];

    map(copy, (item, index) => {
      const bannerObj = {
        bannerId: item.id,
        sequence: index + 1,
      };
      // item.sequence = index + 1;

      emptyArr.push(bannerObj);
    });

    api
      .put(`/admin/banner/sequence`, { banners: emptyArr }, {})
      .then((result) => {
        console.log(result, "put banner success");
        submitGetBanner();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div
        className="flex flex-col justify-between h-full"
        style={{ minHeight: "calc(100% - 114px)" }}
      >
        <Table
          divider={false}
          checkable={{
            active: false,
            multi: false,
            setter: () => {},
          }}
          data={bannerData || []}
          addedMap={addedMap}
          tdOptions={{
            isActive: {
              el: (item: boolean, index: number) => {
                return (
                  <div className="flex justify-center">
                    <input
                      disabled={tbodyTrdraggable}
                      type="checkbox"
                      className="toggle toggle-primary max-xl:toggle-sm"
                      checked={item}
                      onChange={(e) => {
                        bannerData[index].changeActive = e.target.checked;
                        setTargetBanner(bannerData[index]);
                        openModal("change-active");
                      }}
                    />
                  </div>
                );
              },
            },
            bannerImage: {
              className: "min-w-[1059px]",
              el: (_: undefined, __: undefined, item: TdObjTypes) => {
                return (
                  <img
                    draggable={false}
                    className=" w-[1059px] h-[138px] object-cover"
                    src={item.bannerImage as string}
                    alt={item.bannerImage + `이미지`}
                  />
                );
              },
            },
          }}
          trOptions={{
            thead: {
              className: () => "pointer-events-none",
            },
            tbody: {
              isDraggable: (item: TdObjTypes) => {
                return tbodyTrdraggable;
              },
              dragEndFunc: (e: TdObjTypes[]) => {
                setBannerSequence(e);
              },
              dbClickFunc: (item: {
                no: number;
                title: string;
                location: string;
                isActive: boolean;
                bannerImage: string;
              }) => {
                console.log(item, "dbclick obj");

                setIsEdit(true);
                setBannerDetail((prev) => {
                  return {
                    ...prev,
                    id: item.no,
                    title: item.title,
                    location: item.location,
                    isActive: item.isActive,
                    bannerImage: item.bannerImage,
                  };
                });

                const targetIndex = item.bannerImage.indexOf("/banner/") + 8;
                const emptyFile = new File(
                  [""],
                  item.bannerImage.substring(targetIndex, 9999),
                  {
                    type: "text/plain",
                  }
                );
                setBannerFile(emptyFile);
                openModal("banner-details");
              },
            },
          }}
          buttons={
            <>
              {tbodyTrdraggable ? (
                <>
                  <button
                    className="rounded-none btn btn-outline btn-sm max-xl:btn-xs"
                    onClick={() => {
                      const copy = [...freezeBanner];
                      setBannerData(copy);
                      setBannerSequence(copy);
                      setTbodyTrDraggable((prev) => !prev);
                    }}
                  >
                    취소
                  </button>
                  <button
                    className="rounded-none btn btn-primary btn-sm max-xl:btn-xs"
                    onClick={() => {
                      setTbodyTrDraggable((prev) => !prev);
                      // submitPutBannerSequence();
                    }}
                  >
                    저장
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="rounded-none btn btn-primary btn-sm max-xl:btn-xs"
                    onClick={() => setTbodyTrDraggable((prev) => !prev)}
                  >
                    우선순위 변경
                  </button>
                  <button
                    className="rounded-none btn btn-primary btn-sm max-xl:btn-xs"
                    onClick={() => openModal("banner-details")}
                  >
                    추가
                  </button>
                </>
              )}
            </>
          }
          perPageOptions={{
            page: perPage.page,
            perPage: perPage.perPage,
            pageLength: perPage.pageLength,
            setPerPage: setPerPage,
          }}
        />
      </div>

      <Modal
        id="banner-details"
        className="h-full max-w-none"
        closeFunc={() => {
          setBannerType("always");
          setTargetBanner({});
          setBannerDetail({
            id: 0,
            location: "홈",
            title: "",
            isActive: false,
          });
          setOpenCalendar("");
          setBannerFile(null);
          setIsEdit(false);
        }}
      >
        <div className="flex flex-col justify-between h-full">
          <div>
            <div className="mb-6 text-xl font-bold max-sm:text-base">
              {isEdit ? "배너 수정" : "배너 등록"}
            </div>

            <div className="flex flex-col gap-10">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 px-2 py-1 my-1 text-lg text-white bg-primary">
                  배너
                </div>

                <div className="grid items-center grid-cols-3 col-span-2 gap-2">
                  <span className="col-span-1">위치</span>
                  <select
                    className="rounded-none join-item select-sm select select-bordered max-xl:select-xs"
                    onChange={(e) =>
                      setBannerDetail((prev) => {
                        return { ...prev, location: e.target.value };
                      })
                    }
                  >
                    <option>홈</option>
                    <option>커뮤니티</option>
                  </select>
                </div>
                <div className="grid items-center grid-cols-3 col-span-2 gap-2">
                  <span className="col-span-1">제목</span>
                  <input
                    type="text"
                    className="col-span-2 rounded-none grow bg-base-100 input input-bordered input-sm max-sm:input-xs"
                    placeholder="제목"
                    value={bannerDetail.title}
                    onFocus={() => setOpenCalendar("")}
                    onChange={(e) => {
                      setBannerDetail((prev) => {
                        return { ...prev, title: e.target.value };
                      });
                    }}
                    autoFocus={false}
                  />
                </div>

                <div className="grid items-center grid-cols-3 col-span-2 gap-2">
                  <span className="col-span-1">배너 이미지</span>

                  <label
                    htmlFor="custom-file"
                    className={`
                    ${bannerFile !== null ? "btn-disabled" : ""}
                    rounded-none cursor-pointer btn btn-outline btn-ghost border-base-200 btn-sm`}
                  >
                    첨부
                  </label>
                  <span className={`${bannerFile !== null ? "" : "hidden"} `}>
                    {bannerFile?.name}

                    <span
                      className="ml-2 cursor-pointer text-error"
                      onClick={() => {
                        setBannerFile(null);
                      }}
                    >
                      x
                    </span>
                  </span>
                  <div className="col-span-2 label-text-alt text-error">
                    ※ 10MB 이하 이미지 파일을 업로드해주세요 (권장 해상도 1059 X
                    276)
                  </div>
                  <input
                    id="custom-file"
                    type="file"
                    className="hidden col-span-2 file-input-ghost bg-base-100 file-input input-bordered file-input-sm max-sm:input-xs"
                    onFocus={() => setOpenCalendar("")}
                    onChange={(e) => {
                      if (e.currentTarget.files) {
                        setBannerFile(e.currentTarget.files[0]);
                        e.target.value = "";
                      }
                    }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 px-2 py-1 my-1 text-lg text-white bg-primary">
                  기간
                </div>
                <div className="grid items-center grid-cols-3 col-span-2 gap-2">
                  <span className="col-span-1">노출기간</span>
                  <div className="flex flex-auto col-span-2 gap-2">
                    <label className="flex gap-2 cursor-pointer label">
                      <span className="label-text">상시노출</span>
                      <input
                        type="radio"
                        name="radio-10"
                        className="radio"
                        defaultChecked
                        onChange={(e) =>
                          setBannerType(e.target.checked ? "always" : "period")
                        }
                      />
                    </label>
                    <label className="flex gap-2 cursor-pointer label">
                      <span className="label-text">기간설정</span>
                      <input
                        type="radio"
                        name="radio-10"
                        className="radio"
                        onChange={(e) =>
                          setBannerType(e.target.checked ? "period" : "always")
                        }
                      />
                    </label>
                  </div>
                </div>
                <div className="grid items-center grid-cols-3 col-span-2 gap-2">
                  <span className="col-span-1"></span>
                  <div
                    className={`${
                      bannerType === "always" ? "btn-disabled" : ""
                    } flex items-center col-span-2 gap-2`}
                  >
                    <div className="relative inline-flex">
                      <input
                        disabled={bannerType === "always"}
                        type="text"
                        className="rounded-none input-ghost input input-bordered input-sm"
                        placeholder="YYYY-MM-DD"
                        maxLength={10}
                        value={period.startDate}
                        onChange={(e) => {
                          if (calendarRegExp.test(e.target.value)) {
                            setPeriod((prev) => {
                              return { ...prev, startDate: e.target.value };
                            });
                          }
                        }}
                      />
                      <div
                        className="absolute top-[50%] right-[17px] translate-y-[-50%]"
                        onClick={() => {
                          setOpenCalendar("start");
                        }}
                      >
                        <svg
                          width="24"
                          height="23"
                          viewBox="0 0 24 23"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="max-xl:size-4"
                        >
                          <path
                            d="M21.1385 2.14663H19.9641V0.0681152H17.6154V2.14663H5.87179V0.0681152H3.52308V2.14663H2.34872C1.05692 2.14663 0 3.08196 0 4.22515V20.8533C0 21.9965 1.05692 22.9318 2.34872 22.9318H21.1385C22.4303 22.9318 23.4872 21.9965 23.4872 20.8533V4.22515C23.4872 3.08196 22.4303 2.14663 21.1385 2.14663ZM21.1385 20.8533H2.34872V7.34292H21.1385V20.8533Z"
                            fill="black"
                          />
                        </svg>
                      </div>
                      <div
                        className="absolute top-[50%] z-10 bg-base-100 left-[85%]"
                        style={{
                          display: openCalendar === "start" ? "block" : "none",
                        }}
                      >
                        <Calendar
                          future={period.endDate}
                          select={{
                            selected: useDateTimes.separteDate(
                              period.startDate
                            ),
                            setter: (dateStr: string) => {
                              setPeriod((prev) => {
                                return { ...prev, startDate: dateStr };
                              }),
                                setOpenCalendar("");
                            },
                          }}
                          separater="-"
                          closeFunc={() => setOpenCalendar("")}
                        />
                      </div>
                    </div>
                    <div>~</div>
                    <div className="relative inline-flex">
                      <input
                        disabled={bannerType === "always"}
                        type="text"
                        className="rounded-none input-ghost input input-bordered input-sm"
                        placeholder="YYYY-MM-DD"
                        maxLength={10}
                        value={period.endDate}
                        onChange={(e) => {
                          if (calendarRegExp.test(e.target.value)) {
                            setPeriod((prev) => {
                              return { ...prev, endDate: e.target.value };
                            });
                          }
                        }}
                      />
                      <div
                        className="absolute top-[50%] right-[17px] translate-y-[-50%]"
                        onClick={() => {
                          setOpenCalendar("end");
                        }}
                      >
                        <svg
                          width="24"
                          height="23"
                          viewBox="0 0 24 23"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="max-xl:size-4"
                        >
                          <path
                            d="M21.1385 2.14663H19.9641V0.0681152H17.6154V2.14663H5.87179V0.0681152H3.52308V2.14663H2.34872C1.05692 2.14663 0 3.08196 0 4.22515V20.8533C0 21.9965 1.05692 22.9318 2.34872 22.9318H21.1385C22.4303 22.9318 23.4872 21.9965 23.4872 20.8533V4.22515C23.4872 3.08196 22.4303 2.14663 21.1385 2.14663ZM21.1385 20.8533H2.34872V7.34292H21.1385V20.8533Z"
                            fill="black"
                          />
                        </svg>
                      </div>
                      <div
                        className="absolute top-[50%] z-10 bg-base-100 left-[85%]"
                        style={{
                          display: openCalendar === "end" ? "block" : "none",
                        }}
                      >
                        <Calendar
                          past={period.startDate}
                          select={{
                            selected: useDateTimes.separteDate(period.endDate),
                            setter: (dateStr: string) => {
                              setPeriod((prev) => {
                                return { ...prev, endDate: dateStr };
                              }),
                                setOpenCalendar("");
                            },
                          }}
                          separater="-"
                          closeFunc={() => setOpenCalendar("")}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid items-center grid-cols-3 col-span-2 gap-2">
                  <span className="col-span-1">사용</span>

                  <select
                    className="rounded-none join-item select-sm select select-bordered max-xl:select-xs"
                    onChange={(e) =>
                      setBannerDetail((prev) => {
                        return {
                          ...prev,
                          isActive: e.target.value === "사용" ? true : false,
                        };
                      })
                    }
                    value={bannerDetail.isActive === true ? "사용" : "중지"}
                  >
                    <option value="중지">중지</option>
                    <option value="사용">사용</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="grid justify-end col-span-2">
              <div className="flex gap-2 mt-4">
                <label className="flex-auto">
                  <button
                    className="rounded-none btn-block btn btn-sm max-sm:btn-xs btn-primary"
                    onClick={() => {
                      setBannerDetail({
                        id: 0,
                        title: "",
                        location: "",
                        isActive: false,
                      });
                      setBannerFile(null);
                      closeModal("banner-details");
                    }}
                  >
                    취소
                  </button>
                </label>
                <label className="flex-auto">
                  <button
                    className="rounded-none btn-block btn btn-sm max-sm:btn-xs btn-primary"
                    onClick={(e) => {
                      e.preventDefault();
                      // submitBannerDetail();
                      closeModal("banner-details");
                    }}
                    disabled={
                      isEdit
                        ? isEqual(
                            bannerData.filter(
                              (item) => item.id === bannerDetail.id
                            )[0],
                            bannerDetail
                          ) ||
                          (bannerType === "period"
                            ? period.endDate === "" && period.startDate === ""
                            : false)
                        : bannerDetail.location === "" ||
                          bannerDetail.title === "" ||
                          bannerFile === null ||
                          (bannerType === "period"
                            ? period.endDate === "" && period.startDate === ""
                            : false)
                    }
                  >
                    {isEdit ? "수정" : "등록"}
                  </button>
                </label>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <Alert
        id="change-active"
        title="배너상태 변경"
        text="해당 배너의 상태를 변경하시겠습니까?"
        buttons={[
          {
            style: "btn-outline",
            text: "취소",
            func: () => setTargetBanner({}),
            disabled: false,
          },
          {
            style: "",
            text: "변경",
            // func: () => changeBannerAcitve(),
            func: () => {},

            disabled: false,
          },
        ]}
      />
    </div>
  );
}

export default index;
