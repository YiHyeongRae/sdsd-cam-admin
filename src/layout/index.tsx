import { ReactNode, useEffect, useState } from "react";
import Header from "./header/header";
import Sidebar from "./sidebar/sidebar";
import Paths from "../data/datas/paths";
import LoadingFullScreen from "../components/LoadingFullScreen";
import AccessGuard from "../components/AccessGuard";
import useMatchMediaQuery from "../utils/useMatchMediaQuery";
import { useRecoilState } from "recoil";
import { loadingState } from "../library/recoil/atoms/loadingState";
import { getCookie } from "#/library/cookies/cookie";
import CryptoJS from "crypto-js";
import { isBoolean } from "lodash";

function index({ children }: { children: ReactNode }) {
  const [navStatae, setNavState] = useState(true);

  const isMaxSm = useMatchMediaQuery("not all and (min-width: 640px)");
  const [loading] = useRecoilState(loadingState);
  const [user, setUser] = useState<{ [key: string]: string | number }>();

  // useEffect(() => {
  //   if (/Android|iPhone/i.test(navigator.userAgent)) {
  //     setNavState(false);
  //   }

  //   const userCookie = getCookie("sdsd_admin_user") || "";
  //   const bytes = CryptoJS.AES.decrypt(
  //     userCookie,
  //     import.meta.env.VITE_AUTH_SESSION_SECRET_KEY
  //   );

  //   const decrypted =
  //     bytes?.words?.length !== 0
  //       ? JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
  //       : {};

  //   setUser(decrypted);
  // }, []);

  return (
    <>
      {loading.isLoading && !loading.isModal && <LoadingFullScreen />}
      <div className={`h-full ${navStatae ? "pl-56" : "pl-14"}`}>
        <Header func={setNavState} navState={navStatae} user={{}} />
        <Sidebar
          open={navStatae}
          data={Paths}
          role={user?.adminType as string}
        />
        <div
          style={{
            maxHeight: isMaxSm ? "calc(100% - 106px)" : "calc(100% - 94px)",
          }}
          className="relative h-full p-6 overflow-y-auto max-sm:p-2"
        >
          <AccessGuard
            data={Paths}
            role={user?.adminType as string}
            isChangedPassword={
              (isBoolean(user?.isChangedPassword) && user?.isChangedPassword) ||
              false
            }
          >
            {children}
          </AccessGuard>
        </div>
      </div>
    </>
  );
}

export default index;
