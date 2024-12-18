import { useEffect, useRef, useState } from "react";
import Calendar from "../Calendar";
import { TableExtensionHeaderTypes } from "#/data/types/components";
import useDateTimes from "#/utils/useDateTimes";
import { useNavigate } from "react-router-dom";

function index({
  period = { active: true, setter: () => {} },
  search = { active: true, setter: () => {} },
  additionalArea,
  query = {
    active: true,
    reset: () => {},
    submit: () => {},
    disabled: false,
  },
}: TableExtensionHeaderTypes) {
  const [openCalendar, setOpenCalendar] = useState<"start" | "end" | "">("");
  const [searchDate, setSearchDate] = useState({
    startDate: "",
    endDate: "",
  });

  const [currentPeriod, setCurrentPeriod] = useState("전체");
  const calendarRegExp = /^\d{0,4}(\/\d{0,2})?(\/\d{0,2})?$/;

  useEffect(() => {
    period.setter && period.setter(searchDate);
  }, [searchDate]);

  const searchInput = useRef<HTMLInputElement | null>(null);

  const route = useNavigate();
  return (
    <>
      <div className="flex flex-col max-w-screen-lg gap-6">
        {period.active && (
          <div className="flex flex-wrap items-center w-full gap-4">
            <div className="mr-4 text-xl font-bold min-w-24 max-xl:text-sm">
              기간
            </div>
            <div className="flex items-center gap-2">
              <div className="relative inline-flex">
                <input
                  type="text"
                  className="rounded-none input-sm input-ghost input input-bordered max-xl:input-xs max-sm:max-w-32"
                  placeholder="YYYY-MM-DD"
                  maxLength={10}
                  value={searchDate.startDate}
                  onChange={(e) => {
                    if (calendarRegExp.test(e.target.value)) {
                      setSearchDate((prev) => {
                        return { ...prev, startDate: e.target.value };
                      });
                    }
                  }}
                  readOnly
                />
                <div
                  className="absolute top-[50%] right-[17px] translate-y-[-50%]"
                  onClick={() => {
                    setOpenCalendar("start");
                  }}
                >
                  <svg
                    width="24"
                    height="23"
                    viewBox="0 0 24 23"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-5 max-xl:size-4"
                  >
                    <path
                      d="M21.1385 2.14663H19.9641V0.0681152H17.6154V2.14663H5.87179V0.0681152H3.52308V2.14663H2.34872C1.05692 2.14663 0 3.08196 0 4.22515V20.8533C0 21.9965 1.05692 22.9318 2.34872 22.9318H21.1385C22.4303 22.9318 23.4872 21.9965 23.4872 20.8533V4.22515C23.4872 3.08196 22.4303 2.14663 21.1385 2.14663ZM21.1385 20.8533H2.34872V7.34292H21.1385V20.8533Z"
                      fill="black"
                    />
                  </svg>
                </div>
                <div
                  className="absolute top-[50%] z-10 bg-base-100 left-[85%]"
                  style={{
                    display: openCalendar === "start" ? "block" : "none",
                  }}
                >
                  <Calendar
                    future={searchDate.endDate}
                    select={{
                      selected: useDateTimes.separteDate(searchDate.startDate),
                      setter: (dateStr: string) => {
                        setSearchDate((prev) => {
                          return { ...prev, startDate: dateStr };
                        }),
                          setOpenCalendar("");
                      },
                    }}
                    separater="-"
                    closeFunc={() => setOpenCalendar("")}
                  />
                </div>
              </div>
              <div>~</div>
              <div className="relative inline-flex">
                <input
                  type="text"
                  className="rounded-none input-sm input-ghost input input-bordered max-xl:input-xs max-sm:max-w-32"
                  placeholder="YYYY-MM-DD"
                  maxLength={10}
                  value={searchDate.endDate}
                  onChange={(e) => {
                    if (calendarRegExp.test(e.target.value)) {
                      setSearchDate((prev) => {
                        return { ...prev, endDate: e.target.value };
                      });
                    }
                  }}
                  readOnly
                />
                <div
                  className="absolute top-[50%] right-[17px] translate-y-[-50%]"
                  onClick={() => {
                    setOpenCalendar("end");
                  }}
                >
                  <svg
                    width="24"
                    height="23"
                    viewBox="0 0 24 23"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-5 max-xl:size-4"
                  >
                    <path
                      d="M21.1385 2.14663H19.9641V0.0681152H17.6154V2.14663H5.87179V0.0681152H3.52308V2.14663H2.34872C1.05692 2.14663 0 3.08196 0 4.22515V20.8533C0 21.9965 1.05692 22.9318 2.34872 22.9318H21.1385C22.4303 22.9318 23.4872 21.9965 23.4872 20.8533V4.22515C23.4872 3.08196 22.4303 2.14663 21.1385 2.14663ZM21.1385 20.8533H2.34872V7.34292H21.1385V20.8533Z"
                      fill="black"
                    />
                  </svg>
                </div>
                <div
                  className="absolute top-[50%] z-10 bg-base-100 left-[85%]"
                  style={{ display: openCalendar === "end" ? "block" : "none" }}
                >
                  <Calendar
                    past={searchDate.startDate}
                    select={{
                      selected: useDateTimes.separteDate(searchDate.endDate),
                      setter: (dateStr: string) => {
                        setSearchDate((prev) => {
                          return { ...prev, endDate: dateStr };
                        }),
                          setOpenCalendar("");
                      },
                    }}
                    separater="-"
                    closeFunc={() => setOpenCalendar("")}
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                className={`${
                  currentPeriod === "전체" ? "btn-primary" : "bg-transparent"
                }  rounded-none btn-sm btn max-xl:btn-xs`}
                onClick={() => {
                  setSearchDate({ startDate: "", endDate: "" });
                  setCurrentPeriod("전체");
                }}
              >
                전체
              </button>
              <button
                className={`${
                  currentPeriod === "오늘" ? "btn-primary" : "bg-transparent"
                }  rounded-none btn-sm btn max-xl:btn-xs`}
                onClick={() => {
                  const year = new Date().getFullYear();
                  const month = new Date().getMonth() + 1;
                  const date = new Date().getDate();
                  const fullDateStr = useDateTimes.makeFullDateStr(
                    year,
                    month,
                    date
                  );

                  setSearchDate((prev) => {
                    return {
                      ...prev,
                      startDate: fullDateStr,
                      endDate: fullDateStr,
                    };
                  });
                  setCurrentPeriod("오늘");
                }}
              >
                오늘
              </button>
              <button
                className={`${
                  currentPeriod === "일주일" ? "btn-primary" : "bg-transparent"
                }  rounded-none btn-sm btn max-xl:btn-xs`}
                onClick={() => {
                  const year = new Date().getFullYear();
                  const month = new Date().getMonth() + 1;
                  const date = new Date().getDate();

                  const fullDateStr = useDateTimes.makeFullDateStr(
                    year,
                    month,
                    date
                  );

                  const mSeconds7Days = 24 * 60 * 60 * 1000 * 7;

                  const before =
                    new Date(fullDateStr).getTime() - mSeconds7Days;

                  const before7Days = useDateTimes.makeFullDateStr(
                    new Date(before).getFullYear(),
                    new Date(before).getMonth() + 1,
                    new Date(before).getDate()
                  );
                  setSearchDate((prev) => {
                    return {
                      ...prev,
                      startDate: before7Days,
                      endDate: fullDateStr,
                    };
                  });
                  setCurrentPeriod("일주일");
                }}
              >
                일주일
              </button>
              <button
                className={`${
                  currentPeriod === "1개월" ? "btn-primary" : "bg-transparent"
                }  rounded-none btn-sm btn max-xl:btn-xs`}
                onClick={() => {
                  const year = new Date().getFullYear();
                  const month = new Date().getMonth() + 1;
                  const date = new Date().getDate();

                  const fullDateStr = useDateTimes.makeFullDateStr(
                    year,
                    month,
                    date
                  );

                  const mSeconds30Days = 24 * 60 * 60 * 1000 * 30;

                  const before =
                    new Date(fullDateStr).getTime() - mSeconds30Days;

                  const before30Days = useDateTimes.makeFullDateStr(
                    new Date(before).getFullYear(),
                    new Date(before).getMonth() + 1,
                    new Date(before).getDate()
                  );
                  setSearchDate((prev) => {
                    return {
                      ...prev,
                      startDate: before30Days,
                      endDate: fullDateStr,
                    };
                  });

                  setCurrentPeriod("1개월");
                }}
              >
                1개월
              </button>
              <button
                className={`${
                  currentPeriod === "3개월" ? "btn-primary" : "bg-transparent"
                }  rounded-none btn-sm btn max-xl:btn-xs `}
                onClick={() => {
                  const year = new Date().getFullYear();
                  const month = new Date().getMonth() + 1;
                  const date = new Date().getDate();

                  const fullDateStr = useDateTimes.makeFullDateStr(
                    year,
                    month,
                    date
                  );

                  const mSeconds90Days = 24 * 60 * 60 * 1000 * 90;

                  const before =
                    new Date(fullDateStr).getTime() - mSeconds90Days;

                  const before90Days = useDateTimes.makeFullDateStr(
                    new Date(before).getFullYear(),
                    new Date(before).getMonth() + 1,
                    new Date(before).getDate()
                  );

                  setSearchDate((prev) => {
                    return {
                      ...prev,
                      startDate: before90Days,
                      endDate: fullDateStr,
                    };
                  });

                  setCurrentPeriod("3개월");
                }}
              >
                3개월
              </button>
            </div>
          </div>
        )}

        {additionalArea}

        {search.active && (
          <div className="flex flex-wrap items-center w-full gap-4">
            <div className="mr-4 text-xl font-bold min-w-24 max-xl:text-sm">
              검색
            </div>

            <div className="flex flex-auto gap-2">
              <input
                ref={searchInput}
                type="text"
                placeholder={search.placeholder || "검색어를 입력해주세요."}
                className="w-full rounded-none input input-sm input-bordered max-xl:input-xs"
                onChange={(e) => search.setter && search.setter(e.target.value)}
              />
            </div>
          </div>
        )}

        <div className="flex justify-center gap-2">
          <button
            type="button"
            className="rounded-none btn-sm btn btn-outline max-xl:btn-xs"
            onClick={() => {
              query.reset && query.reset();

              setSearchDate({
                startDate: "",
                endDate: "",
              });
              if (searchInput.current) {
                searchInput.current.value = "";
              }

              if (location.search.length !== 0) {
                route(location.pathname);
                window.location.reload();
              }
            }}
          >
            초기화
          </button>

          <button
            type="button"
            className="px-4 rounded-none btn-sm btn-primary btn max-xl:btn-xs"
            onClick={() => query.submit && query.submit()}
            // disabled={query.disabled}
            disabled
          >
            검색
          </button>
        </div>
      </div>
    </>
  );
}

export default index;
