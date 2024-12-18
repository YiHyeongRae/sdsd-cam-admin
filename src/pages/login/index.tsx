import { Alert } from "#/components/Alert";
import api from "#/library/axios/api";
import { getCookie, setCookie } from "#/library/cookies/cookie";
import useLoadingState from "#/library/recoil/hook/useLoadingState";
import { openModal } from "#/utils/useModalHandler";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
function index() {
  const isLogin =
    getCookie("sdsd_admin_access_token") &&
    getCookie("sdsd_admin_access_token") !== "";

  // const isLogin = false;
  const [sign, setSign] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const emailRegExp =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.([a-zA-Z]{3}|k[a-zA-Z]{1,2})$/i;
  const route = useNavigate();
  const { setLoading } = useLoadingState();

  const login = () => {
    // setLoading(true);

    // api
    //   .post(`/admin/auth/sign-in`, {
    //     ...sign,
    //   })
    //   .then((result) => {
    //     if (result) {
    //       setCookie("sdsd_admin_access_token", result?.data?.accessToken);

    //       const user = {
    //         adminType: result.data.adminType,
    //         adminId: result.data.adminId,
    //         adminName: result.data?.adminName,
    //         role: result.data.role,
    //         email: sign.email,
    //         isChangedPassword: result.data.isChangedPassword,
    //       };
    //       const encryptedUser = CryptoJS.AES.encrypt(
    //         JSON.stringify(user),
    //         import.meta.env.VITE_AUTH_SESSION_SECRET_KEY
    //       ).toString();

    //       setCookie("sdsd_admin_user", encryptedUser);
    //       setLoading(false);

    //       if (result.data.isChangedPassword) {
    //         route("/");
    //       } else {
    //         route("/changPw");
    //       }
    //     }
    //   })
    //   .catch((error) => {
    //     console.log("catch", error.response.data.message);

    //     setError(error.response.data.message);
    //     openModal("login-error");
    //     setLoading(false);
    //   });
    setCookie("sdsd_admin_access_token", "abcdef");
    route("/");
  };

  if (isLogin) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen hero bg-base-100 ">
      <div className="flex-col gap-20 hero-content lg:flex-row-reverse max-lg:gap-10">
        <div className="flex-[1_0_auto] text-center  lg:text-left">
          <h1 className="text-5xl font-bold text-primary">
            Andreia Admin System
          </h1>
        </div>
        <div className="w-full max-w-sm shadow-2xl card shrink-0 bg-base-100">
          <form className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">이메일</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="example@andreia.kr"
                  className="w-full input input-bordered"
                  required
                  onChange={(e) =>
                    setSign((prev) => {
                      return { ...prev, email: e.target.value.trim() };
                    })
                  }
                />
              </div>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">비밀번호</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                required
                onChange={(e) =>
                  setSign((prev) => {
                    return { ...prev, password: e.target.value.trim() };
                  })
                }
              />
            </div>
            <div className="mt-6 form-control">
              <button
                className="btn btn-primary"
                disabled={
                  !emailRegExp.test(sign.email) ||
                  sign.email === "" ||
                  sign.password === ""
                }
                onClick={(e) => {
                  e.preventDefault();
                  login();
                }}
              >
                로그인
              </button>
            </div>
          </form>
        </div>
      </div>

      <Alert
        title="에러"
        id="login-error"
        text={error}
        buttons={[{ style: "", text: "확인", func: () => {}, disabled: false }]}
      />
    </div>
  );
}

export default index;
