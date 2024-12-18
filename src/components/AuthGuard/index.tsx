import { Navigate, useNavigate } from "react-router-dom";
import { AuthGuardTypes } from "../../data/types/components";
import { useEffect, useState } from "react";
import { getCookie } from "#/library/cookies/cookie";

const Authorization = ({ children }: AuthGuardTypes) => {
  const [isLogin, setIsLogin] = useState(
    getCookie("sdsd_admin_access_token") !== ""
  );
  const route = useNavigate();

  useEffect(() => {
    const checkToken =
      getCookie("sdsd_admin_access_token") &&
      getCookie("sdsd_admin_access_token") !== "";
    3;

    setIsLogin(checkToken === undefined ? false : true);
  }, [route]);
  if (isLogin) {
    return <>{children}</>;
  } else {
    return <Navigate to="/login" />;
  }
};
export default Authorization;
