import axios from "axios";
import { getCookie, removeCookie } from "../cookies/cookie";
import { forEach, map } from "lodash";

const api = axios.create({
  baseURL: import.meta.env.DEV
    ? `${import.meta.env.VITE_API_CAMPUS_LOCAL_URL}${
        import.meta.env.VITE_API_CAMPUS_SERVER_VERSION
      }`
    : `${import.meta.env.VITE_API_CAMPUS_SERVER_URL}${
        import.meta.env.VITE_API_CAMPUS_SERVER_VERSION
      }`,
});
api.defaults.paramsSerializer = (params) => {
  let query = "";
  forEach(params, (value, key) => {
    if (value === "" || value === null || value === undefined) {
    } else {
      if (Array.isArray(value)) {
        map(value, (arrItem) => {
          query = query + key + "=" + arrItem + "&";
        });
      } else {
        query = query + key + "=" + value + "&";
      }
    }
  });

  const result = query.slice(0, -1);

  return result;
};

api.interceptors.request.use(
  function (config) {
    // 요청이 전달되기 전에 작업 수행
    console.log("before req interceptors");
    config.headers["Authorization"] = `Bearer ${
      getCookie("sdsd_admin_access_token") || ""
    }`;
    return config;
  },
  function (error) {
    // 요청 오류가 있는 작업 수행
    return Promise.reject(error);
  }
);

// 응답 인터셉터 추가하기
api.interceptors.response.use(
  function (response) {
    // 2xx 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    // 응답 데이터가 있는 작업 수행
    console.log("before res interceptors");

    return response;
  },
  function (error) {
    // 2xx 외의 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    // 응답 오류가 있는 작업 수행

    // if (error.response.status === 401) {
    //   if (getCookie("sdsd_admin_access_token") !== undefined) {
    //     alert("로그인 정보가 유효하지 않습니다.");

    //     removeCookie("sdsd_admin_access_token");

    //     document.cookie =
    //       "sdsd_admin_access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    //   }

    //   window.location.href = "/login";
    // } else {
    //   alert(`Error Status : ${error.response.status}`);
    // }

    return Promise.reject(error);

    // return Promise.reject(error);
  }
);

export default api;
