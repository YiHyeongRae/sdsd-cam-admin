import { Alert } from "#/components/Alert";
import { Modal } from "#/components/Modal";
import Table from "#/components/Table";
import TableExtensionHeader from "#/components/TableExtensionHeader";
import { TdObjTypes } from "#/data/types/components";
import api from "#/library/axios/api";
import useCollegeState from "#/library/recoil/hook/useCollegeState";

import useLoadingState from "#/library/recoil/hook/useLoadingState";
import { closeModal, openModal } from "#/utils/useModalHandler";
import { chunk } from "lodash";

import { useEffect, useState } from "react";

function index() {
  const [collegeData, setCollegeData] = useState({
    college: [],
    totalCount: 0,
  });
  const [perPage, setPerPage] = useState({
    page: 1,
    perPage: 20,
    pageLength: 1,
  });

  const { state, setColleges } = useCollegeState();
  const [targetCollege, setTargetCollege] = useState({
    id: "",
    isActive: "",
  });

  const { setLoading } = useLoadingState();
  const submitSearchCollege = (isSubmit: boolean) => {
    setLoading(true);
    api
      .get(
        `/admin/college`,
        isSubmit
          ? {
              params: {
                searchWord: search.word,
              },
            }
          : {}
      )
      .then((result) => {
        const slice = chunk(result.data, perPage.perPage);

        setCollegeData((prev) => {
          return {
            ...prev,
            college: slice[perPage.page - 1] as [],
            totalCount: result.data.length,
          };
        });

        !isSubmit && setColleges(result.data);
        setPerPage((prev) => {
          return {
            ...prev,
            pageLength: Math.ceil(result.data.length / prev.perPage),
          };
        });
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    // if (state.colleges.length === 0) {
    //   submitSearchCollege(false);
    // } else {
    //   const slice = chunk(state.colleges, perPage.perPage);

    //   setCollegeData((prev) => {
    //     return {
    //       ...prev,
    //       college: slice[perPage.page - 1] as [],
    //       totalCount: state.colleges?.length,
    //     };
    //   });
    //   setPerPage((prev) => {
    //     return {
    //       ...prev,
    //       pageLength: Math.ceil(state.colleges?.length / prev.perPage),
    //     };
    //   });
    // }
    const slice = chunk(state.colleges, perPage.perPage);

    setCollegeData((prev) => {
      return {
        ...prev,
        college: slice[perPage.page - 1] as [],
        totalCount: state.colleges?.length,
      };
    });
    setPerPage((prev) => {
      return {
        ...prev,
        pageLength: Math.ceil(state.colleges?.length / prev.perPage),
      };
    });
  }, [perPage.perPage, perPage.page, state]);

  const addedMap = [
    ["id", "학교 ID"],
    ["collegeName", "대학교 이름"],
    ["campus", "캠퍼스"],
    ["emailDomain", "이메일 도메인"],
    ["collegeImage", "이미지"],
    ["isActive", "사용"],
  ];

  const [isEdit, setIsEdit] = useState(false);
  const [collegeDetail, setCollegeDetail] = useState<{
    collegeName: string;
    emailDomain: string;
    campus: string;
    isActive: boolean | string;
  }>({
    collegeName: "",
    emailDomain: "",
    campus: "",
    isActive: false,
  });
  const [collegeFile, setCollegeFile] = useState<File | null>(null);

  const submitAddCollege = () => {
    setLoading(true);
    const collegeForm = new FormData();
    if (collegeFile !== null) {
      collegeForm.append("collegeImage", collegeFile);
    }
    collegeForm.append("campus", collegeDetail.campus);
    collegeForm.append("collegeName", collegeDetail.collegeName);
    collegeForm.append("emailDomain", collegeDetail.emailDomain);
    collegeForm.append("isActive", String(collegeDetail.isActive));
    api
      .post("/admin/college", collegeForm, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((result) => {
        console.log("add college success", result);
        setLoading(false);
        submitSearchCollege(false);
        closeModal("college-detail");
      })
      .catch((error) => {
        console.log("add college failed", error);
        setLoading(false);
      });
  };

  const submitActiveCollege = () => {
    setLoading(true);
    const collegeForm = new FormData();

    collegeForm.append("collegeId", targetCollege.id);
    collegeForm.append("isActive", targetCollege.isActive);

    api
      .put("/admin/college", collegeForm, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((result) => {
        console.log("active change success", result);

        setLoading(false);
        submitSearchCollege(false);
      })
      .catch((error) => {
        console.log("active change failed", error);
        setLoading(false);
      });
  };

  const [search, setSearch] = useState({
    word: "",
  });

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
        period={{ active: false }}
        query={{
          reset: () =>
            setSearch({
              word: "",
            }),
          submit: () => submitSearchCollege(true),
          // submit: submitSearchBoard,
          // disabled: search.word === "",
        }}
      />
      <Table
        tableTitle={`조회 ${collegeData?.totalCount || ""} 건`}
        data={collegeData?.college || []}
        addedMap={addedMap}
        tdOptions={{
          isActive: {
            className: "text-center",
            el: (item: boolean, index: number, obj: { id: string }) => {
              return (
                <input
                  type="checkbox"
                  className="toggle toggle-primary"
                  checked={item}
                  onChange={(e) => {
                    setTargetCollege((prev) => {
                      return {
                        ...prev,
                        id: obj.id,
                        isActive: String(e.target.checked),
                      };
                    });

                    openModal("college-change-active");
                  }}
                />
              );
            },
          },
          collegeImage: {
            el: (item: string) => {
              return (
                <div className="flex items-center justify-center">
                  <img
                    className="w-[66px] h-[66px] object-cover"
                    src={item}
                    alt={`${item}-image`}
                  />
                </div>
              );
            },
          },
        }}
        trOptions={{
          tbody: {
            dbClickFunc: (item: TdObjTypes) => {
              setIsEdit(true);
              openModal("college-detail");
              console.log("dbclicked", item);
              setCollegeDetail((prev) => {
                return {
                  ...prev,
                  collegeName: String(item.collegeName),
                  emailDomain: String(item.emailDomain),
                  campus: String(item.campus),
                  isActive: String(item.isActive),
                };
              });
              const targetIndex =
                String(item.collegeImage).indexOf("/college/") + 9;
              const emptyFile = new File(
                [""],
                String(item.collegeImage).substring(targetIndex, 9999),
                {
                  type: "text/plain",
                }
              );
              setCollegeFile(emptyFile);
            },
          },
        }}
        buttons={
          <button
            className="rounded-none btn btn-primary btn-sm max-xl:btn-xs"
            onClick={() => {
              openModal("college-detail");
            }}
          >
            추가
          </button>
        }
        perPageOptions={{
          page: perPage.page,
          perPage: perPage.perPage,
          pageLength: perPage.pageLength,
          setPerPage: setPerPage,
        }}
      />

      <Modal
        id="college-detail"
        closeFunc={() => {
          setCollegeDetail({
            collegeName: "",
            emailDomain: "",
            campus: "",
            isActive: "",
          });
          setCollegeFile(null);
          setIsEdit(false);
        }}
      >
        <div className="flex flex-col justify-between h-full">
          <div>
            <div className="mb-6 text-xl font-bold max-sm:text-base">
              대학교 등록
            </div>

            <div className="flex flex-col gap-10">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 px-2 py-1 my-1 text-lg text-white bg-primary">
                  대학교
                </div>

                <div className="grid items-center grid-cols-3 col-span-2 gap-2">
                  <span className="col-span-1">대학교 명</span>
                  <input
                    type="text"
                    className="col-span-2 rounded-none grow bg-base-100 input input-bordered input-sm max-sm:input-xs"
                    placeholder="대학교 명"
                    value={collegeDetail.collegeName || ""}
                    onChange={(e) => {
                      setCollegeDetail((prev) => {
                        return { ...prev, collegeName: e.target.value };
                      });
                    }}
                    autoFocus={false}
                  />
                </div>
                <div className="grid items-center grid-cols-3 col-span-2 gap-2">
                  <span className="col-span-1">캠퍼스</span>
                  <input
                    type="text"
                    className="col-span-2 rounded-none grow bg-base-100 input input-bordered input-sm max-sm:input-xs"
                    placeholder="캠퍼스"
                    value={collegeDetail.campus || ""}
                    onChange={(e) => {
                      setCollegeDetail((prev) => {
                        return { ...prev, campus: e.target.value };
                      });
                    }}
                    autoFocus={false}
                  />
                </div>
                <div className="grid items-center grid-cols-3 col-span-2 gap-2">
                  <span className="col-span-1">도메인</span>
                  <input
                    type="text"
                    className="col-span-2 rounded-none grow bg-base-100 input input-bordered input-sm max-sm:input-xs"
                    placeholder="이메일 도메인을 입력해 주세요.(snu.ac.kr)"
                    value={collegeDetail.emailDomain || ""}
                    onChange={(e) => {
                      setCollegeDetail((prev) => {
                        return { ...prev, emailDomain: e.target.value };
                      });
                    }}
                    autoFocus={false}
                  />
                </div>
                <div className="relative grid items-center grid-cols-3 col-span-2 gap-2">
                  <span className="col-span-1">로고 이미지</span>
                  <label
                    htmlFor="college-file"
                    className={`${
                      collegeFile !== null ? "btn-disabled" : ""
                    } rounded-none cursor-pointer btn btn-outline btn-ghost border-base-200 btn-sm max-sm:btn-xs`}
                  >
                    첨부
                  </label>
                  <span
                    className={`truncate ${
                      collegeFile?.name ? "" : "hidden"
                    } mr-3`}
                  >
                    {collegeFile?.name}
                    <span
                      className="absolute right-0 ml-2 cursor-pointer text-error"
                      onClick={() => setCollegeFile(null)}
                    >
                      x
                    </span>
                  </span>
                  <div className="col-span-2 label-text-alt text-error">
                    ※ 10MB 이하 이미지 파일을 업로드해주세요 (권장 해상도 288 X
                    288)
                  </div>
                  <div className="col-span-2 label-text-alt text-error">
                    ※ 미등록 시 디폴트 이미지가 노출됩니다.
                  </div>
                  <input
                    id="college-file"
                    type="file"
                    className="hidden col-span-2 file-input-ghost bg-base-100 file-input input-bordered file-input-sm max-sm:input-xs"
                    onChange={(e) => {
                      if (e.currentTarget.files) {
                        setCollegeFile(e.currentTarget.files[0]);
                        e.currentTarget.value = "";
                      }
                    }}
                  />
                </div>
                <div className="grid items-center grid-cols-3 col-span-2 gap-2">
                  <span className="col-span-1">사용</span>

                  <select
                    className="rounded-none join-item select-sm select select-bordered max-xl:select-xs"
                    value={String(collegeDetail.isActive)}
                    onChange={(e) =>
                      setCollegeDetail((prev) => {
                        return { ...prev, isActive: e.target.value };
                      })
                    }
                  >
                    <option value="false">중지</option>
                    <option value="true">사용</option>
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
                    className="rounded-none btn-block btn btn-error btn-sm max-sm:btn-xs btn-primary"
                    onClick={() => {
                      setCollegeDetail({
                        collegeName: "",
                        emailDomain: "",
                        campus: "",
                        isActive: "",
                      });
                      setCollegeFile(null);
                      closeModal("college-detail");
                      setIsEdit(false);
                    }}
                  >
                    취소
                  </button>
                </label>
                <label className="flex-auto">
                  {isEdit ? (
                    <button
                      className="rounded-none btn-block btn btn-sm max-sm:btn-xs btn-primary"
                      // onClick={() => {}}
                      disabled={
                        collegeFile === null ||
                        collegeDetail.collegeName === "" ||
                        collegeDetail.emailDomain === ""
                      }
                    >
                      수정
                    </button>
                  ) : (
                    <button
                      className="rounded-none btn-block btn btn-sm max-sm:btn-xs btn-primary"
                      // onClick={() => submitAddCollege()}
                      disabled={
                        collegeDetail.collegeName === "" ||
                        collegeDetail.emailDomain === "" ||
                        collegeDetail.campus === ""
                      }
                    >
                      등록
                    </button>
                  )}
                </label>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <Alert
        id="college-change-active"
        title="대학교 상태 변경"
        text="해당 대학교의 상태를 변경하시겠습니까?"
        buttons={[
          {
            style: "btn-outline",
            text: "취소",
            func: () => setTargetCollege({ id: "", isActive: "" }),

            disabled: false,
          },
          {
            style: "",
            text: "변경",
            func: () => submitActiveCollege(),
            disabled: false,
          },
        ]}
      />
    </div>
  );
}

export default index;
