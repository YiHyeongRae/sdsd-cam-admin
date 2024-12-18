import { Alert } from "#/components/Alert";
import { Modal } from "#/components/Modal";
import Table from "#/components/Table";
import TableExtensionHeader from "#/components/TableExtensionHeader";
import { TableStateTypes } from "#/data/types/components";
import api from "#/library/axios/api";
import { loadingState } from "#/library/recoil/atoms/loadingState";
import useLoadingState from "#/library/recoil/hook/useLoadingState";
import { getDecryptedUser } from "#/utils/useGetUser";
import { closeModal, openModal } from "#/utils/useModalHandler";
import { find, isEqual } from "lodash";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

function index() {
  const { setLoading } = useLoadingState();
  const [perPage, setPerPage] = useState({
    page: 1,
    perPage: 20,
    pageLength: 1,
  });

  const [search, setSearch] = useState({
    word: "",
  });

  const addedMap = [
    ["id", "관리자 ID"],
    ["role", "직책"],
    ["adminType", "관리자 타입"],
    ["adminName", "사용자 이름"],
    ["email", "사용자 이메일"],
    ["updatedAt", "최근 접속일시"],
  ];

  const [adminDetail, setAdminDetail] = useState({
    adminName: "",
    adminType: "",
    email: "",
    id: "",
    role: "",
    updatedAt: "",
  });

  const [adminData, setAdminData] = useState<TableStateTypes>();

  const [edit, setEdit] = useState(false);

  const submitSearchAdmin = (isSubmit: boolean) => {
    // setLoading(true);
    // api
    //   .get(`/admin/user`, {
    //     params: {
    //       page: isSubmit ? 1 : perPage.page,
    //       pageSize: perPage.perPage,
    //       searchWord: search.word,
    //     },
    //   })
    //   .then((result) => {
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
          adminName: "bbbbwww",
          email: "aass@andreia.kr",
          updatedAt: "2024-12-17 08:30:37",
        },
        {
          id: 8,
          adminType: "SUPER_ADMIN",
          role: "SUPER_ADMIN",
          adminName: "adfb",
          email: "aer@andreia.kr",
          updatedAt: "2024-12-16 12:33:50",
        },
        {
          id: 4,
          adminType: "ADMIN",
          role: "ADMIN",
          adminName: null,
          email: "aer@andreia.kr",
          updatedAt: null,
        },
        {
          id: 3,
          adminType: "ADMIN",
          role: "ADMIN",
          adminName: "baa",
          email: "dddd@andreia.kr",
          updatedAt: null,
        },
        {
          id: 2,
          adminType: "ADMIN",
          role: "ADMIN",
          adminName: null,
          email: "aaa@andreia.kr",
          updatedAt: null,
        },
        {
          id: 1,
          adminType: "SUPER_ADMIN",
          role: "SUPER_ADMIN",
          adminName: "이형래",
          email: "sss@andreia.kr",
          updatedAt: "2024-12-18 16:05:18",
        },
      ],
    };

    setAdminData(dummyResult);
  };
  useEffect(() => {
    submitSearchAdmin(false);
  }, [perPage.perPage, perPage.page]);

  const submitEditAdmin = (isReset: boolean) => {
    setLoading(true);

    isReset
      ? api
          .put("/admin/uesr/reset", {
            adminId: adminDetail.id,
          })
          .then(() => {
            setLoading(false);
            closeModal("admin");
            submitSearchAdmin(false);
          })
          .catch((error) => {
            console.log(error);
          })
      : api
          .put(`/admin/user`, {
            adminId: adminDetail.id,
            adminType: adminDetail.adminType,
            adminName: adminDetail.adminName,
            role: adminDetail.role,
            email: adminDetail.email,
          })
          .then((result) => {
            setLoading(false);
            closeModal("admin");
            submitSearchAdmin(false);
          })
          .catch((error) => {
            console.log(error);
            setLoading(false);
          });
  };

  const submitAddAdmin = () => {
    api
      .post(
        `/admin/user`,

        {
          adminType: adminDetail.adminType,
          adminName: adminDetail.adminName,
          role: adminDetail.role,
          email: adminDetail.email,
          password: "123456",
        }
      )
      .then((result) => {
        console.log("post admin", result);
        setLoading(false);
        submitSearchAdmin(false);
        closeModal("admin");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const submitDeleteAdmin = () => {
    api
      .delete(`/admin/user`, {
        params: {
          adminId: adminDetail.id,
        },
      })
      .then((result) => {
        console.log("delete admin", result);
        setLoading(false);
        closeModal("admin");

        submitSearchAdmin(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  console.log(adminDetail);
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
          reset: () => {
            setSearch({
              word: "",
            });
            // window.location.replace("/cs/report");
          },
          submit: () => {
            // submitSearchReport(true);
            submitSearchAdmin(true);
            setPerPage((prev) => {
              return { ...prev, page: 1 };
            });
          },
        }}
      />
      <Table
        tableTitle={`조회 ${adminData?.totalCount || "0"} 건`}
        data={adminData?.admins || []}
        addedMap={addedMap}
        buttons={
          <button
            className="rounded-none btn btn-primary btn-sm max-sm:btn-xs"
            onClick={() => {
              setAdminDetail((prev) => {
                return {
                  ...prev,
                  adminType: "ADMIN",
                };
              });
              openModal("admin");
            }}
          >
            추가
          </button>
        }
        trOptions={{
          tbody: {
            className: () => "hover:bg-gray-300",

            dbClickFunc: (obj: { [key: string]: string }) => {
              setEdit(true);
              openModal("admin");
              setAdminDetail((prev) => {
                return {
                  ...prev,
                  id: obj.id,
                  role: obj.role,
                  adminType: obj.adminType,
                  adminName: obj.adminName,
                  email: obj.email,
                  updatedAt: obj.updatedAt,
                };
              });
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
        id="admin"
        closeFunc={() => {
          setAdminDetail({
            adminName: "",
            adminType: "",
            email: "",
            id: "",
            role: "",
            updatedAt: "",
          });
          setEdit(false);
        }}
      >
        <div className="flex flex-col justify-between h-full">
          <div>
            <div className="mb-6 text-xl font-bold max-sm:text-base">
              {edit ? "사용자 수정" : "사용자 등록"}
            </div>

            <div className="flex flex-col gap-10">
              <div className="grid grid-cols-2 gap-4 text-xs">
                {edit && (
                  <div className="col-span-2 text-right text-base-300">
                    최근 접속일시 {adminDetail.updatedAt}
                  </div>
                )}
                <div className="col-span-2 px-2 py-1 my-1 text-lg text-white bg-primary">
                  사용자 정보
                </div>

                <div className="grid items-center grid-cols-3 col-span-2 gap-2">
                  <span className="col-span-1">권한 *</span>
                  <select
                    className="col-span-2 rounded-none select select-sm select-ghost select-bordered"
                    value={adminDetail?.adminType || "ADMIN"}
                    onChange={(e) => {
                      setAdminDetail((prev) => {
                        return { ...prev, adminType: e.target.value };
                      });
                    }}
                  >
                    <option value="SUPER_ADMIN">최고관리자</option>
                    <option value="ADMIN">관리자</option>
                  </select>
                </div>
                <div className="grid items-center grid-cols-3 col-span-2 gap-2">
                  <span className="col-span-1">직책 *</span>
                  <input
                    type="text"
                    className="col-span-2 rounded-none grow bg-base-100 input input-bordered input-sm max-sm:input-xs"
                    placeholder="직책을 입력해 주세요."
                    autoFocus={false}
                    value={adminDetail?.role || ""}
                    onChange={(e) =>
                      setAdminDetail((prev) => {
                        return { ...prev, role: e.target.value };
                      })
                    }
                  />
                </div>
                <div className="grid items-center grid-cols-3 col-span-2 gap-2">
                  <span className="col-span-1">이름</span>
                  <input
                    type="text"
                    className="col-span-2 rounded-none grow bg-base-100 input input-bordered input-sm max-sm:input-xs"
                    placeholder="이름을 입력해 주세요."
                    autoFocus={false}
                    value={adminDetail?.adminName || ""}
                    onChange={(e) =>
                      setAdminDetail((prev) => {
                        return { ...prev, adminName: e.target.value };
                      })
                    }
                  />
                </div>
                <div className="grid items-center grid-cols-3 col-span-2 gap-2">
                  <span className="col-span-1">이메일</span>
                  <input
                    type="text"
                    className="col-span-2 rounded-none grow bg-base-100 input input-bordered input-sm max-sm:input-xs"
                    placeholder="이메일을 입력해 주세요."
                    autoFocus={false}
                    value={adminDetail?.email || ""}
                    onChange={(e) =>
                      setAdminDetail((prev) => {
                        return { ...prev, email: e.target.value };
                      })
                    }
                  />
                </div>
                <div className="grid items-center grid-cols-3 col-span-2 gap-2">
                  <span className="col-span-1">비밀번호</span>

                  {edit ? (
                    <button
                      className="rounded-none btn btn-error btn-sm"
                      onClick={() => openModal("reset-password")}
                    >
                      비밀번호 초기화
                    </button>
                  ) : (
                    <input
                      type="text"
                      className="col-span-2 rounded-none grow bg-base-100 input input-bordered input-sm max-sm:input-xs"
                      placeholder="초기비밀번호 123456."
                      disabled
                      autoFocus={false}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="grid justify-end col-span-2">
              <div className="flex gap-2 mt-4">
                {edit && (
                  <label className="flex-auto">
                    <button
                      className="rounded-none btn-block btn btn-error btn-sm max-sm:btn-xs btn-primary"
                      // disabled={getDecryptedUser().adminId === adminDetail.id}
                      onClick={() => {
                        openModal("delete-admin");
                        // closeModal("admin");
                      }}
                    >
                      삭제
                    </button>
                  </label>
                )}

                {edit ? (
                  <label className="flex-auto">
                    <button
                      className="rounded-none btn-block btn btn-sm max-sm:btn-xs btn-primary"
                      onClick={() => {
                        // submitEditAdmin(false);
                      }}
                      disabled={isEqual(
                        adminDetail,
                        find(adminData?.admins, { id: adminDetail.id })
                      )}
                    >
                      수정
                    </button>
                  </label>
                ) : (
                  <label className="flex-auto">
                    <button
                      className="rounded-none btn-block btn btn-sm max-sm:btn-xs btn-primary"
                      disabled={
                        adminDetail.adminName === "" ||
                        adminDetail.adminType === "" ||
                        adminDetail.email === "" ||
                        adminDetail.role === ""
                      }
                      // onClick={() => submitAddAdmin()}
                    >
                      등록
                    </button>
                  </label>
                )}
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <Alert
        id="reset-password"
        title="비밀번호 초기화"
        text="비밀번호를 초기화 하시겠습니까?"
        buttons={[
          {
            style: "rounded-none",
            text: "취소",
            disabled: false,
            func: () => {},
          },
          {
            style: "btn-error rounded-none",
            text: "초기화",
            disabled: false,
            func: () => {
              // submitEditAdmin(true);
              closeModal("admin");
              closeModal("reset-password");
            },
          },
        ]}
      />
      <Alert
        id="delete-admin"
        title="관리자 삭제"
        text="관리자를 삭제 하시겠습니까?"
        buttons={[
          {
            style: "rounded-none",
            text: "취소",
            disabled: false,
            func: () => {},
          },
          {
            style: "btn-error rounded-none",
            text: "삭제",
            disabled: false,
            func: () => {
              // submitDeleteAdmin();
              closeModal("admin");
              closeModal("delete-admin");
            },
          },
        ]}
      />
    </div>
  );
}

export default index;
