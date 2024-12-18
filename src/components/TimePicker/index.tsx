import { useState } from "react";
import { TimePickerTypes } from "../../data/types/components";
import { times } from "lodash";

function index({
  fixedHeight = "h-[120px]",
  type = "full",
  select,

  use,
  perSecond = 10,
  perItems = 4,
}: TimePickerTypes) {
  const [timeState, setTimeState] = useState({
    ampm: select.selected?.ampm || "",
    hour: select.selected?.hour || "",
    minute: select.selected?.minute || "",
    second: select.selected?.second || "",
    timeStr: select.selected?.timeStr || "",
  });

  const heightRegex = /\[([^\]]+)\]/g;
  const regexResult = heightRegex.exec(fixedHeight);
  const pickerHeight = regexResult !== null && regexResult[1].replace("px", "");
  return (
    <div className={`flex flex-col flex-auto ${fixedHeight} border`}>
      <div className={`flex gap-2 flex-auto ${fixedHeight}`}>
        {use.hour && (
          <div
            className="flex flex-col flex-auto overflow-auto time-picker"
            style={{ scrollSnapType: "y mandatory" }}
          >
            {/* hours */}
            {times(
              type === "half" ? 12 + (perItems - 1) : 24 + (perItems - 1),
              (item: number) => {
                return (
                  <span
                    className={`block text-center cursor-pointer ${
                      Number(item) ===
                        (timeState.hour !== "" && Number(timeState.hour)) &&
                      "bg-primary text-white"
                    }`}
                    key={`hour-${item + 1}`}
                    style={{
                      minHeight: Number(pickerHeight) / perItems,
                      lineHeight: `${Number(pickerHeight) / perItems}px`,
                      visibility:
                        item > (type === "half" ? 11 : 23)
                          ? "hidden"
                          : "visible",
                    }}
                    onClick={(e) => {
                      const parentEl = e.currentTarget.parentElement;

                      if (
                        parentEl &&
                        parentEl?.scrollTop !==
                          item * (Number(pickerHeight) / perItems)
                      ) {
                        parentEl.scrollTo({
                          top: item * (Number(pickerHeight) / perItems),
                          behavior: "smooth",
                        });
                      }

                      const hourItem = String(item < 10 ? `0${item}` : item);

                      setTimeState((prev) => {
                        return {
                          ...prev,
                          hour: hourItem,
                          timeStr: `${hourItem}:${prev.minute}`,
                        };
                      });
                      select.setter(
                        `${timeState.ampm} ${hourItem}:${timeState.minute}${
                          timeState.second ? ":" : ""
                        }${timeState.second}`
                      );
                    }}
                  >
                    {item < 10 ? `0${item}` : item}
                  </span>
                );
              }
            )}
          </div>
        )}

        {use.minute && (
          <div
            className="flex flex-col flex-auto overflow-auto time-picker"
            style={{ scrollSnapType: "y mandatory" }}
          >
            {/* minutes */}
            {times(59 + (perItems - 1), (item) => {
              return (
                <span
                  className={`text-center cursor-pointer ${
                    Number(item + 1) === Number(timeState.minute) &&
                    "bg-primary text-white"
                  }`}
                  key={`minute-${item + 1}`}
                  style={{
                    visibility: item > 58 ? "hidden" : "visible",
                    minHeight: Number(pickerHeight) / perItems,
                    lineHeight: `${Number(pickerHeight) / perItems}px`,
                  }}
                  onClick={(e) => {
                    const parentEl = e.currentTarget.parentElement;

                    if (
                      parentEl &&
                      parentEl?.scrollTop !==
                        item * (Number(pickerHeight) / perItems)
                    ) {
                      parentEl.scrollTo({
                        top: item * (Number(pickerHeight) / perItems),
                        behavior: "smooth",
                      });
                    }
                    const minuteItem = String(
                      item + 1 < 10 ? `0${item + 1}` : item + 1
                    );

                    setTimeState((prev) => {
                      return {
                        ...prev,
                        minute: minuteItem,
                        timeStr: `${prev.hour}:${minuteItem}`,
                      };
                    });
                    select.setter(
                      `${timeState.ampm} ${timeState.hour}:${minuteItem}${
                        timeState.second ? ":" : ""
                      }${timeState.second}`
                    );
                  }}
                >
                  {item + 1 < 10 ? `0${item + 1}` : item + 1}
                </span>
              );
            })}
          </div>
        )}

        {/* seconds */}
        {use.second && (
          <div
            className="flex flex-col flex-auto overflow-auto time-picker"
            style={{ scrollSnapType: "y mandatory" }}
          >
            {times(59 / perSecond + perItems, (item) => {
              return (
                <span
                  className={` text-center cursor-pointer ${
                    timeState.second !== "" &&
                    Number(item * perSecond) === Number(timeState.second) &&
                    "bg-primary text-white"
                  }`}
                  style={{
                    visibility: item > 59 / perSecond ? "hidden" : "visible",
                    minHeight: Number(pickerHeight) / perItems,
                    lineHeight: `${Number(pickerHeight) / perItems}px`,
                  }}
                  key={`hour-${item + 1}`}
                  onClick={(e) => {
                    const parentEl = e.currentTarget.parentElement;

                    if (
                      parentEl &&
                      parentEl?.scrollTop !==
                        item * (Number(pickerHeight) / perItems)
                    ) {
                      parentEl.scrollTo({
                        top: item * (Number(pickerHeight) / perItems),
                        behavior: "smooth",
                      });
                    }
                    const secondItem = String(
                      item * perSecond < 10
                        ? `0${item * perSecond}`
                        : item * perSecond
                    );

                    setTimeState((prev) => {
                      return {
                        ...prev,
                        second: secondItem,
                        timeStr: `${prev.hour}:${prev.minute}:${secondItem}`,
                      };
                    });
                    select.setter(
                      `${timeState.ampm} ${timeState.hour}:${timeState.minute}:${secondItem}`
                    );
                  }}
                >
                  {item * perSecond < 10
                    ? `0${item * perSecond}`
                    : item * perSecond}
                </span>
              );
            })}
          </div>
        )}

        {type === "half" && (
          <div
            className="flex flex-col flex-auto overflow-auto time-picker"
            style={{ scrollSnapType: "y mandatory" }}
          >
            <span
              className={`text-center cursor-pointer ${
                timeState.ampm === "AM" && "bg-primary text-white"
              }`}
              style={{
                minHeight: Number(pickerHeight) / perItems,
                lineHeight: `${Number(pickerHeight) / perItems}px`,
              }}
              onClick={(e) => {
                const parentEl = e.currentTarget.parentElement;

                if (parentEl && parentEl?.scrollTop !== 0) {
                  parentEl.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                }
                setTimeState((prev) => {
                  return { ...prev, ampm: "AM" };
                });
                select.setter(
                  `AM ${timeState.hour}:${timeState.minute}${
                    timeState.second ? ":" : ""
                  }${timeState.second}`
                );
              }}
            >
              AM
            </span>
            <span
              className={`text-center cursor-pointer ${
                timeState.ampm === "PM" && "bg-primary text-white"
              }`}
              style={{
                minHeight: Number(pickerHeight) / perItems,
                lineHeight: `${Number(pickerHeight) / perItems}px`,
              }}
              onClick={(e) => {
                const parentEl = e.currentTarget.parentElement;

                if (
                  parentEl &&
                  parentEl?.scrollTop !== Number(pickerHeight) / perItems
                ) {
                  parentEl.scrollTo({
                    top: Number(pickerHeight) / perItems,
                    behavior: "smooth",
                  });
                }
                setTimeState((prev) => {
                  return { ...prev, ampm: "PM", timeStr: `PM ${prev.timeStr}` };
                });
                select.setter(
                  `PM ${timeState.hour}:${timeState.minute}${
                    timeState.second ? ":" : ""
                  }${timeState.second}`
                );
              }}
            >
              PM
            </span>
            {times(perItems - 1, () => {
              return (
                <span
                  className={`text-center cursor-pointer`}
                  style={{
                    visibility: "hidden",
                    minHeight: Number(pickerHeight) / perItems,
                    lineHeight: `${Number(pickerHeight) / perItems}px`,
                  }}
                >
                  PM
                </span>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default index;
