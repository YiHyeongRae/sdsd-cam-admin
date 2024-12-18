import { Alert } from "#/components/Alert";
import Authorization from "#/components/AuthGuard";
import api from "#/library/axios/api";
import { getCookie, setCookie } from "#/library/cookies/cookie";
import { loadingState } from "#/library/recoil/atoms/loadingState";
import useLoadingState from "#/library/recoil/hook/useLoadingState";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import CryptoJS from "crypto-js";
function index() {
  const route = useNavigate();

  const { setLoading } = useLoadingState();

  const [newPassword, setNewPassword] = useState({
    password: "",
    passwordCheck: "",
  });

  const [user, setUser] = useState<{ [key: string]: string | number }>();

  useEffect(() => {
    const userCookie = getCookie("sdsd_admin_user") || "";
    const bytes = CryptoJS.AES.decrypt(
      userCookie,
      import.meta.env.VITE_AUTH_SESSION_SECRET_KEY
    );

    const decrypted =
      bytes.words.length !== 0
        ? JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
        : {};

    setUser(decrypted);
  }, []);

  const submitChangePw = () => {
    setLoading(true);

    api
      .put(`/admin/auth/password/change`, {
        oldPassword: import.meta.env.VITE_INITIAL_PASSWORD,
        newPassword: newPassword.password,
      })
      .then((result) => {
        if (result) {
          const updateUser = {
            adminType: user?.adminType,
            adminId: user?.adminId,
            adminName: user?.adminName,
            role: user?.role,
            email: user?.email,
            isChangedPassword: true,
          };
          const encryptedUser = CryptoJS.AES.encrypt(
            JSON.stringify(updateUser),
            import.meta.env.VITE_AUTH_SESSION_SECRET_KEY
          ).toString();

          setCookie("sdsd_admin_user", encryptedUser);

          setLoading(false);
          route("/");
        }
      })
      .catch((error) => {
        console.log("catch", error.response.data.message);

        setLoading(false);
      });
  };

  return (
    <Authorization>
      <div className="flex items-center justify-center w-full h-full">
        <div className="w-full max-w-sm shadow-2xl card shrink-0 bg-base-100">
          <form className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">새 비밀번호</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="password"
                  placeholder="새로운 비밀번호를 입력해주세요."
                  className="w-full input input-bordered"
                  required
                  onChange={(e) =>
                    setNewPassword((prev) => {
                      return { ...prev, password: e.target.value.trim() };
                    })
                  }
                />
              </div>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">비밀번호 확인</span>
              </label>
              <input
                type="password"
                placeholder="새로운 비밀번호를 입력해주세요."
                className="input input-bordered"
                required
                onChange={(e) =>
                  setNewPassword((prev) => {
                    return { ...prev, passwordCheck: e.target.value.trim() };
                  })
                }
              />
            </div>
            <div className="mt-6 form-control">
              <button
                className="btn btn-primary"
                disabled={
                  newPassword.password === "" ||
                  newPassword.passwordCheck === "" ||
                  newPassword.password !== newPassword.passwordCheck
                }
                onClick={(e) => {
                  e.preventDefault();
                  submitChangePw();
                }}
              >
                변경하기
              </button>
            </div>
          </form>
        </div>

        <Alert
          title="비밀번호 변경 실패"
          id="login-error"
          text={"비밀번호 변경에 실패했습니다."}
          buttons={[
            { style: "", text: "확인", func: () => {}, disabled: false },
          ]}
        />
      </div>
    </Authorization>
  );
}

export default index;
