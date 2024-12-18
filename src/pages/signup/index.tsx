import { useNavigate } from "react-router-dom";

function index() {
  const route = useNavigate();

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="min-h-screen hero">
        <div className="flex-col border border-base-200 hero-content lg:flex-row-revers">
          <div className="text-center lg:text-left">
            <h1 className="mb-5 text-3xl font-bold">관리자 등록</h1>
          </div>
          <div className="w-full gap-4 card shrink-0">
            <label className="flex items-center gap-2 ">
              <span className="flex min-w-32">이름</span>
              <input
                type="text"
                className="grow bg-base-100 input input-bordered input-sm max-sm:input-xs"
                placeholder="Andreia"
              />
            </label>
            <label className="flex items-center gap-2 ">
              <span className="min-w-32">이메일</span>
              <input
                type="text"
                className="grow input input-bordered input-sm max-sm:input-xs"
                placeholder="admin@andreia.kr"
              />
            </label>
            <label className="flex items-center gap-2">
              <span className="min-w-32">비밀번호</span>
              <input
                type="password"
                className="grow input input-bordered input-sm max-sm:input-xs"
                placeholder="6자리이상 영문,숫자,특수문자 가능"
              />
            </label>
            <label className="flex items-center gap-2 ">
              <span className="min-w-32">비밀번호 확인</span>
              <input
                type="password"
                className="grow input input-bordered input-sm max-sm:input-xs"
                placeholder="6자리이상 영문,숫자,특수문자 가능"
              />
            </label>
            <label className="flex items-center gap-2  focus:!outline-none !outline-0 overflow-hidden">
              <span className="min-w-32">권한</span>
              <select className="w-full select select-sm max-sm:select-xs  select-bordered focus:!outline-none !outline-0 !outline-none">
                <option disabled>권한을 선택해주세요.</option>
                <option>관리자</option>
                <option>슈퍼관리자</option>
              </select>
            </label>
            <label className="flex items-center gap-2 ">
              <span className="flex min-w-32">직책</span>
              <input
                type="text"
                className="grow input input-bordered input-sm max-sm:input-xs"
                placeholder="선택사항"
              />
            </label>

            <div className="mt-6 form-control">
              <button disabled className="btn btn-sm max-sm:btn-xs btn-primary">
                등록
              </button>
            </div>
            <label className="flex items-center gap-2">
              <button
                className="w-full btn btn-sm max-sm:btn-xs btn-primary"
                onClick={() => route("/")}
              >
                취소
              </button>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default index;
