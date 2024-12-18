import { Alert } from "../../components/Alert";
import { HeaderTypes } from "../../data/types/layout";
import { useNavigate } from "react-router-dom";
import { removeCookie } from "#/library/cookies/cookie";
import { openModal } from "#/utils/useModalHandler";
function index({ func, navState, user }: HeaderTypes) {
  const route = useNavigate();
  return (
    <div
      className={`${
        func ? "justify-between" : "justify-end"
      } flex items-center p-4 max-sm:p-2 w-full border-b gap-2 border-base-300`}
    >
      {func && (
        <button
          onClick={() => {
            func((prev: boolean) => !prev);
          }}
        >
          {navState ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 max-sm:size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 max-sm:size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25"
              />
            </svg>
          )}
        </button>
      )}
      <div className="flex items-center">
        <div className="flex items-center grid-cols-2 gap-2 ">
          <div className="p-0 card-body">
            {/* <h2 className="text-sm card-title">[{user?.adminName || ""}]님</h2> */}
            <h2 className="text-sm card-title">[관리자]님</h2>
          </div>
          <div>|</div>

          <div className="p-0 cursor-pointer card-body">
            <h2
              className="text-sm card-title"
              onClick={() => {
                openModal("logout");
                // removeCookie("sdsd_admin_access_token");
                // document.cookie =
                //   "sdsd_admin_access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

                // route("/login");
              }}
            >
              로그아웃
            </h2>
          </div>
        </div>
      </div>

      <Alert
        id="logout"
        title="로그아웃"
        text="로그아웃 하시겠습니까?"
        buttons={[
          { style: "", text: "취소", func: () => {}, disabled: false },
          {
            style: "",
            text: "확인",
            func: () => {
              removeCookie("sdsd_admin_access_token");
              document.cookie =
                "sdsd_admin_access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

              route("/login");
            },
            disabled: false,
          },
        ]}
      />
    </div>
  );
}

export default index;
