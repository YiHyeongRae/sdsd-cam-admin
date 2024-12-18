import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AccessGuardTypes } from "../../data/types/components";

const AccessGuard = ({
  data,
  role,
  children,
  isChangedPassword,
}: AccessGuardTypes) => {
  const location = useLocation();
  const route = useNavigate();
  const [currentRequireAccess, setCurrentRequireAccess] = useState<string[]>([
    "",
  ]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const target = data.filter((item: { key: string }) =>
      location.pathname.includes(item.key)
    );
    setCurrentRequireAccess(target[0]?.access);
    setLoading(false);
  }, [location]);

  if (currentRequireAccess?.includes(role) && isChangedPassword) {
    return children;
  } else if (currentRequireAccess?.includes(role) && !isChangedPassword) {
    return (
      <div className="h-full hero bg-base-100">
        <div className="text-center hero-content">
          <div className="max-w-md">
            <p className="py-6">최초 1회 비밀번호를 변경해주세요.</p>
            <button
              className="btn btn-primary"
              onClick={() => route("/changePw")}
            >
              비밀번호 변경하기
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="h-full hero bg-base-100">
        <div className="text-center hero-content">
          <div className="max-w-md">
            <p className="py-6">
              접근 권한이 없습니다. 아래 버튼을 눌러 홈으로 돌아가 주세요.
            </p>
            <button className="btn btn-primary" onClick={() => route("/")}>
              홈으로 돌아가기
            </button>
          </div>
        </div>
      </div>
    );
  }
};
export default AccessGuard;
