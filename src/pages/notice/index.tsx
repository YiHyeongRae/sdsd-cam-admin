import { useEffect, useState } from "react";
import Table from "../../components/Table";
import TableExtensionHeader from "#/components/TableExtensionHeader";
import { Modal } from "#/components/Modal";
import { closeModal, openModal } from "#/utils/useModalHandler";
import useDateTimes from "#/utils/useDateTimes";
import useLoadingState from "#/library/recoil/hook/useLoadingState";
import { TableStateTypes, TdObjTypes } from "#/data/types/components";
import { useRecoilState } from "recoil";
import { loadingState } from "#/library/recoil/atoms/loadingState";
import api from "#/library/axios/api";
import { isEqual, map } from "lodash";
import { Alert } from "#/components/Alert";

function index() {
  const addedMap = [
    ["id", "공지사항 ID"],
    ["isActive", "사용"],
    ["title", "제목"],
    ["views", "조회수"],
    ["adminName", "작성자"],
    ["updatedAt", "최종수정"],
    ["createdAt", "등록일시"],
  ];

  const [noticeDetail, setNoticeDetail] = useState<{
    [key: string]: string | number | null;
  }>({});
  const [edit, setIsEdit] = useState(false);

  const [noticeFile, setNoticeFile] = useState<File | null>(null);

  const [noticeData, setNoticeData] = useState<TableStateTypes>();
  const [freezeNotice, setFreezeNotice] = useState<{
    [key: string]: string | number | null;
  }>();
  const { setLoading } = useLoadingState();

  const [search, setSearch] = useState({
    word: "",
    startDate: "",
    endDate: "",
    isActive: "",
    adminId: "",
  });
  const [perPage, setPerPage] = useState({
    page: 1,
    perPage: 20,
    pageLength: 1,
  });

  const submitSearchNotice = (isSubmit: boolean) => {
    // setLoading(true);
    // api
    //   .get(`/admin/notice`, {
    //     params: {
    //       page: isSubmit ? 1 : perPage.page,
    //       pageSize: perPage.perPage,
    //       adminId: search.adminId,
    //       searchWord: search.word,
    //       searchStartDate: search.startDate,
    //       searchEndDate: search.endDate,
    //       isActive: search.isActive,
    //     },
    //   })
    //   .then((result) => {
    //     const { totalCount } = result.data;

    //     setNoticeData(result.data);
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
      totalCount: 4,
      noticeList: [
        {
          id: 4,
          title: "제목도 수정",
          views: 0,
          isActive: false,
          createdAt: "2024-09-03 17:58:13",
          updatedAt: "2024-09-05 18:14:06",
          adminId: 1,
          adminName: "이형래",
        },
        {
          id: 3,
          title: "[이미지] 이미지 공지사항",
          views: 0,
          isActive: false,
          createdAt: "2024-09-03 17:48:45",
          updatedAt: "2024-09-03 17:48:45",
          adminId: 1,
          adminName: "이형래",
        },
        {
          id: 2,
          title: "[긴급] 공지사항",
          views: 11,
          isActive: true,
          createdAt: "2024-09-03 17:47:30",
          updatedAt: "2024-12-10 18:34:04",
          adminId: 1,
          adminName: "이형래",
        },
        {
          id: 1,
          title: "[이벤트]공지사항 제목",
          views: 7,
          isActive: true,
          createdAt: "2024-08-07 10:11:03",
          updatedAt: "2024-12-10 15:45:37",
          adminId: null,
          adminName: null,
        },
      ],
    };

    const { totalCount } = dummyResult;

    setNoticeData(dummyResult);
    setPerPage((prev) => {
      return {
        ...prev,
        pageLength: Math.ceil(totalCount / prev.perPage),
      };
    });
  };

  const [adminData, setAdminData] = useState<TableStateTypes>();
  useEffect(() => {
    submitSearchNotice(false);

    // api
    //   .get(`/admin/user`, {
    //     params: {
    //       page: 1,
    //       pageSize: 9999,
    //     },
    //   })
    //   .then((result) => {
    //     const { totalCount } = result.data;

    //     setAdminData(result.data);

    //     setLoading(false);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     setLoading(false);
    //   });

    const dummyResult: any = {
      totalCount: 6,
      admins: [
        {
          id: 9,
          adminType: "SUPER_ADMIN",
          role: "CTO",
          adminName: "정주현",
          email: "jhjung@andreia.kr",
          updatedAt: "2024-12-17 08:30:37",
        },
        {
          id: 8,
          adminType: "SUPER_ADMIN",
          role: "SUPER_ADMIN",
          adminName: "배찬희",
          email: "henry@andreia.kr",
          updatedAt: "2024-12-16 12:33:50",
        },
        {
          id: 4,
          adminType: "ADMIN",
          role: "ADMIN",
          adminName: null,
          email: "matthew@andreia.kr",
          updatedAt: null,
        },
        {
          id: 3,
          adminType: "ADMIN",
          role: "ADMIN",
          adminName: "전예림",
          email: "yaelim@andreia.kr",
          updatedAt: null,
        },
        {
          id: 2,
          adminType: "ADMIN",
          role: "ADMIN",
          adminName: null,
          email: "lin@andreia.kr",
          updatedAt: null,
        },
        {
          id: 1,
          adminType: "SUPER_ADMIN",
          role: "SUPER_ADMIN",
          adminName: "이형래",
          email: "dev.yihr@andreia.kr",
          updatedAt: "2024-12-18 16:02:18",
        },
      ],
    };

    setAdminData(dummyResult);
  }, [perPage.perPage, perPage.page]);

  const submitAddNotice = () => {
    const noticeForm = new FormData();
    if (noticeFile !== null) {
      noticeForm.append("image", noticeFile);
    }

    noticeForm.append("title", String(noticeDetail.title));
    noticeForm.append("content", String(noticeDetail.content));
    noticeForm.append("isActive", String(noticeDetail.isActive));

    api
      .post("/admin/notice", noticeForm, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((result) => {
        console.log("add notice success", result);
        closeModal("notice");
        submitSearchNotice(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const submitEditNotice = () => {
    const noticeForm = new FormData();
    if (noticeFile !== null) {
      noticeForm.append("image", noticeFile);
    }

    noticeForm.append("noticeId", String(noticeDetail.id));
    noticeForm.append("title", String(noticeDetail.title));
    noticeForm.append("content", String(noticeDetail.content));
    noticeForm.append("isActive", String(noticeDetail.isActive));

    if (noticeDetail.image !== null) {
      noticeForm.append("oldImage", String(noticeDetail.image));
    }

    for (const [key, value] of noticeForm.entries()) {
      console.log(key, value);
    }
    api
      .put("/admin/notice", noticeForm, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((result) => {
        console.log("edit notice success", result);

        closeModal("notice");
        submitSearchNotice(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const submitDeleteNotice = () => {
    api
      .delete(`/admin/notice/${noticeDetail.id}`)
      .then((result) => {
        console.log("delete notice success", result);

        closeModal("notice");
        submitSearchNotice(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
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
          reset: () => {
            setSearch({
              word: "",
              startDate: "",
              endDate: "",
              isActive: "",
              adminId: "",
            });

            window.location.replace("/notice");
          },
          submit: () => {
            submitSearchNotice(true);
            setPerPage((prev) => {
              return { ...prev, page: 1 };
            });
          },
        }}
        additionalArea={
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center w-full gap-4 ">
              <div className="mr-4 text-xl font-bold min-w-24 max-xl:text-sm">
                사용
              </div>
              <label className="flex gap-2 cursor-pointer label">
                <input
                  type="radio"
                  name="radio-5"
                  className="radio radio-primary max-xl:radio-sm"
                  checked={search.isActive === ""}
                  onChange={() => {
                    setSearch((prev) => {
                      return { ...prev, isActive: "" };
                    });
                  }}
                />
                <span className="label-text">전체</span>
              </label>
              <label className="flex gap-2 cursor-pointer label">
                <input
                  type="radio"
                  name="radio-5"
                  className="radio radio-primary max-xl:radio-sm"
                  checked={search.isActive === "true"}
                  onChange={() => {
                    setSearch((prev) => {
                      return { ...prev, isActive: "true" };
                    });
                  }}
                />
                <span className="label-text">사용</span>
              </label>
              <label className="flex gap-2 cursor-pointer label">
                <input
                  type="radio"
                  name="radio-5"
                  className="radio radio-primary max-xl:radio-sm"
                  checked={search.isActive === "false"}
                  onChange={() => {
                    setSearch((prev) => {
                      return { ...prev, isActive: "false" };
                    });
                  }}
                />
                <span className="label-text">중지</span>
              </label>
              <div className="flex flex-wrap items-center gap-4 ml-auto">
                <div className="mr-4 text-xl font-bold max-xl:text-sm">
                  등록
                </div>
                <select
                  className="rounded-none select-bordered select select-sm max-xl:select-xs"
                  onChange={(e) => {
                    setSearch((prev) => {
                      return { ...prev, adminId: e.target.value };
                    });
                  }}
                >
                  <option value="">전체</option>
                  {map(
                    adminData?.admins,
                    (
                      item: { [key: string]: string | number },
                      index: number
                    ) => {
                      return (
                        <option
                          key={`${item.adminName}-${item.id}-${index}`}
                          value={item.id}
                        >
                          {item.adminName}
                        </option>
                      );
                    }
                  )}
                </select>
              </div>
            </div>
          </div>
        }
      />
      <Table
        tableTitle={`조회 ${noticeData?.totalCount || "0"} 건`}
        data={noticeData?.noticeList || []}
        addedMap={addedMap}
        buttons={
          <>
            <button
              className="rounded-none btn btn-primary btn-sm max-xl:btn-xs"
              onClick={() => {
                setNoticeDetail((prev) => {
                  return {
                    ...prev,
                    title: "",
                    content: "",
                    isActive: "false",
                    image: null,
                  };
                });
                setNoticeFile(null);
                openModal("notice");
              }}
            >
              공지사항 등록
            </button>
          </>
        }
        checkable={{ active: false, multi: false, setter: () => {} }}
        tdOptions={{
          isActive: {
            el: (item: boolean) => {
              return (
                <span className="w-full max-w-xs text-center">
                  {item ? "사용" : "중지"}
                </span>
              );
            },
          },
        }}
        trOptions={{
          tbody: {
            className: () => "hover:bg-gray-300",

            dbClickFunc: (item: TdObjTypes) => {
              setIsEdit(true);

              // setLoading(true);
              // api
              //   .get(`/admin/notice/${item.id}`)
              //   .then((result) => {
              //     setNoticeDetail(result.data);
              //     setFreezeNotice(result.data);
              //     setLoading(false);
              //   })
              //   .catch((error) => {
              //     console.log(error);
              //     setLoading(false);
              //   });

              const dummyResult: any = {
                id: 4,
                title: "제목도 수정",
                content: "강아지 이미지에서 더미이미지로 수정",
                views: 0,
                isActive: false,
                image:
                  "https://ssokdak.s3.ap-northeast-2.amazonaws.com/notice/1725527646274_dog.jpeg",
                createdAt: "2024-09-03 17:58:13",
                updatedAt: "2024-09-05 18:14:06",
                adminId: 1,
                adminName: "이형래",
              };
              setNoticeDetail(dummyResult);
              setFreezeNotice(dummyResult);

              openModal("notice");
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
        id="notice"
        closeFunc={() => {
          setNoticeDetail({});
          setNoticeFile(null);
          setFreezeNotice({});
        }}
      >
        <div className="flex flex-col justify-between h-full">
          <div>
            <div className="mb-6 text-xl font-bold max-sm:text-base">
              {edit ? "공지사항 수정" : "공지사항 등록"}
            </div>

            <div className="flex flex-col gap-4">
              {edit && (
                <div className="flex flex-col gap-2">
                  <div className="col-span-2 px-2 py-1 my-1 text-lg text-white bg-primary">
                    작성 정보
                  </div>
                  <div className="grid grid-cols-3 gap-2 max-lg:grid-cols-1">
                    <div className="col-span-1">
                      <div className="flex flex-col flex-wrap gap-4">
                        <div className="flex flex-wrap gap-4">
                          <div className=" min-w-16 max-lg:text-sm">
                            작성일시
                          </div>
                          <div className="font-bold whitespace-nowrap max-lg:text-sm">
                            {noticeDetail.createdAt || ""}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-1">
                      <div className="flex flex-col flex-wrap gap-4">
                        <div className="flex gap-4">
                          <div className=" min-w-16 whitespace-nowrap max-lg:text-sm">
                            수정일시
                          </div>
                          <div className="font-bold whitespace-nowrap max-lg:text-sm">
                            {noticeDetail.updatedAt || ""}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-1">
                      <div className="flex flex-col flex-wrap gap-4">
                        <div className="flex gap-4">
                          <div className=" min-w-16 whitespace-nowrap max-lg:text-sm">
                            최종수정
                          </div>
                          <div className="font-bold whitespace-nowrap max-lg:text-sm">
                            {noticeDetail.adminName || ""}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 px-2 py-1 my-1 text-lg text-white bg-primary">
                  공지사항
                </div>

                <div className="grid items-center grid-cols-3 col-span-2 gap-2">
                  <span className="col-span-1">제목</span>
                  <input
                    type="text"
                    className="col-span-2 rounded-none grow bg-base-100 input input-bordered input-sm max-sm:input-xs"
                    placeholder="제목을 입력해주세요."
                    autoFocus={false}
                    value={String(noticeDetail.title)}
                    onChange={(e) =>
                      setNoticeDetail((prev) => {
                        return { ...prev, title: e.target.value };
                      })
                    }
                  />
                </div>
                <div className="grid items-center grid-cols-3 col-span-2 gap-2">
                  <span className="col-span-1">내용</span>
                  <textarea
                    className="col-span-2 rounded-none resize-none h-60 textarea-bordered grow bg-base-100 textarea textarea-sm max-sm:textarea-xs"
                    placeholder="내용을 입력해주세요."
                    autoFocus={false}
                    value={String(noticeDetail.content)}
                    onChange={(e) =>
                      setNoticeDetail((prev) => {
                        return { ...prev, content: e.target.value };
                      })
                    }
                  ></textarea>
                </div>
                <div className="relative grid items-center grid-cols-3 col-span-2 gap-2">
                  <span className="col-span-1">이미지</span>

                  <label
                    htmlFor="notice-file"
                    className={`${
                      noticeFile !== null ||
                      (edit && noticeDetail.image !== null)
                        ? "btn-disabled"
                        : ""
                    } rounded-none cursor-pointer btn btn-outline btn-ghost border-base-200 btn-sm max-sm:btn-xs`}
                  >
                    첨부
                  </label>
                  <span
                    className={`truncate ${
                      noticeFile !== null ||
                      (edit && noticeDetail.image !== null)
                        ? ""
                        : "hidden"
                    } mr-3`}
                  >
                    {noticeFile?.name ||
                      String(noticeDetail.image).substring(
                        String(noticeDetail.image).indexOf("/notice/") + 8,
                        9999
                      )}

                    <span
                      className="absolute right-0 ml-2 cursor-pointer text-error"
                      onClick={() => {
                        setNoticeFile(null);
                        setNoticeDetail((prev) => {
                          return { ...prev, image: null };
                        });
                      }}
                    >
                      x
                    </span>
                  </span>
                  <div className="col-span-2 label-text-alt text-error">
                    ※ 10MB 이하 이미지 파일을 업로드해주세요 (권장 해상도 720 X
                    1080)
                  </div>
                  <input
                    id="notice-file"
                    type="file"
                    className="hidden col-span-2 file-input-ghost bg-base-100 file-input input-bordered file-input-sm max-sm:input-xs"
                    // onFocus={() => setCalendarState("")}
                    onChange={(e) => {
                      if (e.currentTarget.files) {
                        setNoticeFile(
                          e.currentTarget.files && e.currentTarget.files[0]
                        );

                        e.target.value = "";
                      }
                    }}
                  />
                </div>
              </div>
              <div className="grid items-center grid-cols-3 col-span-2 gap-2">
                <span className="col-span-1">사용</span>
                <select
                  className="rounded-none join-item select-sm select select-bordered max-sm:select-xs"
                  value={String(noticeDetail.isActive)}
                  onChange={(e) =>
                    setNoticeDetail((prev) => {
                      return {
                        ...prev,
                        isActive: String(e.target.value),
                      };
                    })
                  }
                >
                  <option value="false">중지</option>
                  <option value="true">사용</option>
                </select>
              </div>
            </div>
          </div>
          <div>
            <div className="grid justify-end col-span-2">
              <div className="flex gap-2 mt-4">
                <label className="flex-auto">
                  <button
                    className="rounded-none btn-block btn btn-sm max-sm:btn-xs btn-primary"
                    onClick={() => openModal("notice-mockup-preview")}
                  >
                    미리보기
                  </button>
                </label>

                {edit && (
                  <label className="flex-auto">
                    <button
                      className="rounded-none btn-block btn btn-sm max-sm:btn-xs btn-error"
                      onClick={() => {
                        // submitDeleteNotice();
                        openModal("notice-delete");
                      }}
                    >
                      삭제
                    </button>
                  </label>
                )}
                <label className="flex-auto">
                  <button
                    className="rounded-none btn-block btn btn-sm max-sm:btn-xs btn-primary"
                    // onClick={() =>
                    //   edit ? submitEditNotice() : submitAddNotice()
                    // }
                    disabled={
                      edit
                        ? isEqual(noticeDetail, freezeNotice) &&
                          noticeFile === null
                        : noticeDetail.title === "" ||
                          noticeDetail.content === ""
                    }
                  >
                    {edit ? "수정" : "등록"}
                  </button>
                </label>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        id="notice-mockup-preview"
        className="!max-w-md flex items-center justify-center"
      >
        <div className="mockup-phone">
          <div className="camera"></div>
          <div className="display">
            <div className="flex flex-col justify-start gap-4 p-8 overflow-auto bg-white artboard artboard-demo phone-1">
              <div className="flex flex-col w-full gap-2">
                <div className="text-xl font-bold">
                  {noticeDetail.title || "{제목}"}
                </div>
                <div>
                  {useDateTimes.makeFullDateStr(
                    new Date().getFullYear(),
                    new Date().getMonth() + 1,
                    new Date().getDate(),
                    "."
                  )}
                </div>
                <div className="m-0 divider divider-vertical"></div>
              </div>

              {(noticeFile !== null || noticeDetail.image) && (
                <div>
                  <img
                    src={
                      noticeFile !== null
                        ? URL.createObjectURL(noticeFile)
                        : String(noticeDetail.image)
                    }
                    alt=""
                  />
                </div>
              )}
              <div className="w-full text-sm whitespace-pre-wrap">
                {`${noticeDetail.content}` || "{내용}"}
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <Alert
        id="notice-delete"
        title="공지사항 삭제"
        text={`삭제할경우 복구할 수 없습니다\n정말 삭제하시겠습니까?`}
        buttons={[
          {
            style: "",
            text: "취소",
            func: () => closeModal("notice-delete"),

            disabled: false,
          },
          {
            style: "btn-error",
            text: "삭제",
            // func: () => submitDeleteNotice(),
            func: () => {},
            disabled: false,
          },
        ]}
      />
    </>
  );
}

export default index;
