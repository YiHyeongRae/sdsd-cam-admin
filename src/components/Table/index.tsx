import { useEffect, useRef, useState } from "react";
import { useTable } from "#/utils/useTable";
import { TableTypes, TdObjTypes } from "#/data/types/components";
import { getRegExp } from "korean-regexp";
import { map, orderBy, throttle, times } from "lodash";

function index({
  className,
  data = [],
  divider = true,
  addedMap,
  checkable = { active: false, multi: false, setter: () => {} },
  tdOptions = {},
  trOptions = {
    thead: { className: () => {}, func: () => {}, isDraggable: () => {} },
    tbody: { className: () => {}, func: () => {}, isDraggable: () => {} },
  },
  tableTitle,
  searchText = "",
  additionalTrOptions,
  buttons,
  perPageOptions,
  perPageList = [20, 50, 100, 200],
  overflowY = { active: false, maxHeight: "" },
}: TableTypes) {
  const thMap = new Map([["no", "no"]]);

  const [tableThData, setTableThData] = useState(thMap);
  const [tableTdData, setTableTdData] = useState<TdObjTypes[]>([]);
  const [addedMapData, setAddedMapData] = useState(addedMap);
  const [tabelCkecked, setTableChecked] = useState<number[]>([]);
  const [currentDrag, setCurrentDrag] = useState<"thead" | "tbody" | "">("");

  const [orderByList, setOrderByList] = useState<"ASC" | "DESC">("DESC");
  const [currentOrderBy, setCurrentOrderBy] = useState("index");
  const [theadDrag, setTheadDrag] = useState({
    start: "",
    end: "",
    beforeChanged: "",
  });
  const [tbodyDrag, setTbodyDrag] = useState({
    start: 0,
    end: 0,
    beforeChanged: 0,
  });

  useEffect(() => {
    useTable.makeTableThData({
      addedMap: addedMapData,
      thMap,
      setter: setTableThData,
    });
    useTable.makeTableTdData({
      array: data,
      setter: setTableTdData,
      page: perPageOptions?.page || 1,
      perPage: perPageOptions?.perPage || 20,
      thMap,
    });
  }, [perPageOptions?.perPage, addedMapData, data]);
  const checkboxRef = useRef<null[] | HTMLDivElement[]>([]);

  useEffect(() => {
    setTableChecked([]);
  }, [checkable.active, checkable.multi]);

  useEffect(() => {
    setAddedMapData(addedMap);
  }, [data]);

  return (
    <div className={`flex flex-col justify-between h-full gap-10 ${className}`}>
      {divider && <div className="divider divider-vertical"></div>}
      <div className="flex flex-wrap items-center justify-between gap-4 ">
        <div className="text-lg font-bold max-xl:text-sm">{tableTitle}</div>
        <div className="flex gap-2">
          {buttons}

          {perPageOptions && (
            <div className="gap-2 join">
              <select
                value={perPageOptions?.perPage}
                className="rounded-none join-item select-sm select select-bordered max-xl:select-xs"
                onChange={(e) => {
                  perPageOptions?.setPerPage(
                    (prev: { page: number; perPage: number }) => {
                      return {
                        ...prev,
                        page: 1,
                        perPage: Number(e.target.value),
                      };
                    }
                  );
                }}
              >
                {map(perPageList, (item, index) => {
                  return (
                    <option value={item} key={`perPage-${index}`}>
                      {`${item} 개씩 보기`}
                    </option>
                  );
                })}
              </select>
            </div>
          )}
        </div>
      </div>
      <div
        className="overflow-auto"
        style={{
          minHeight: "calc(100% - 114px)",
          maxHeight: overflowY.active ? overflowY.maxHeight : "",
        }}
      >
        <table className="table table-s max-sm:table-xs !border-separate !border-spacing-0">
          <thead className="sticky top-0 left-0 bg-base-100">
            <tr
              className={`border-zinc-400 ${trOptions?.thead?.className?.()}`}
              onClick={() =>
                trOptions?.thead?.func !== undefined && trOptions.thead.func()
              }
            >
              {/* draggable 시 tbody에 생기는 1칸(draggable icon)을 위해 추가하기위함 */}
              {trOptions.tbody?.isDraggable?.() && (
                <th className="border border-zinc-300"></th>
              )}
              {checkable.active && (
                <th
                  className="border border-zinc-300 "
                  rowSpan={
                    additionalTrOptions?.colSpanTarget.length !== 0
                      ? 2
                      : undefined
                  }
                >
                  <label className="flex">
                    <input
                      disabled={!checkable.multi}
                      type="checkbox"
                      className="checkbox max-sm:checkbox-sm"
                      checked={
                        tabelCkecked.length > 0 &&
                        tabelCkecked.length === tableTdData.flat().length
                      }
                      onChange={(e) => {
                        const tableChekced: number[] = [];

                        if (e.currentTarget.checked) {
                          map(tableTdData, (item) => {
                            tableChekced.push(item.no as number);
                          });
                        }
                        setTableChecked(tableChekced);
                        checkable.setter(tableChekced);
                      }}
                    />
                  </label>
                </th>
              )}

              {Array.from(tableThData.keys())?.map((item, index) => {
                return (
                  <th
                    rowSpan={
                      additionalTrOptions?.colSpanTarget.includes(item)
                        ? undefined
                        : 2
                    }
                    colSpan={
                      additionalTrOptions &&
                      item in additionalTrOptions?.colSpanStarter
                        ? additionalTrOptions?.colSpanStarter[item].colSpan
                        : undefined
                    }
                    className={`border border-zinc-300  ${
                      additionalTrOptions &&
                      !(item in additionalTrOptions?.colSpanStarter) &&
                      additionalTrOptions?.colSpanTarget.includes(item)
                        ? "hidden"
                        : ""
                    }`}
                    key={`${item}-${index}`}
                    draggable={
                      !additionalTrOptions && trOptions?.thead?.isDraggable?.()
                    }
                    onDragStart={(e) => {
                      const selection = window.getSelection();

                      if (selection?.type === "Range") {
                        selection.removeAllRanges();
                      }
                      setCurrentDrag("thead");
                      const text = e.currentTarget.children[0]
                        .children[0] as HTMLElement;
                      setTheadDrag((prev) => {
                        return {
                          ...prev,
                          start: text.innerText,
                        };
                      });
                    }}
                    onDragEnter={(e) => {
                      if (currentDrag === "thead") {
                        const text = e.currentTarget.children[0]
                          .children[0] as HTMLElement;
                        setTheadDrag((prev) => {
                          return {
                            ...prev,
                            beforeChanged: text.innerText,
                          };
                        });
                        const throttledDrager = throttle(() => {
                          if (
                            theadDrag.start !== "no" &&
                            theadDrag.start !== "" &&
                            text.innerText !== "" &&
                            text.innerText !== "no" &&
                            theadDrag.beforeChanged !== text.innerText
                          ) {
                            const copy = [...addedMapData];
                            const startIndex = copy.findIndex((subArr) =>
                              subArr.includes(theadDrag.start)
                            );
                            const endIndex = copy.findIndex((subArr) =>
                              subArr.includes(text.innerText)
                            );

                            copy[startIndex] = addedMapData[endIndex];
                            copy[endIndex] = addedMapData[startIndex];

                            setAddedMapData(copy);
                          }
                        }, 3000);

                        throttledDrager();
                      }
                    }}
                    onDragOver={(e) => {
                      e.preventDefault();
                    }}
                    onDragEnd={() => {
                      setTheadDrag({ start: "", end: "", beforeChanged: "" });
                      setCurrentDrag("");
                    }}
                  >
                    <div
                      className={`flex items-center justify-center gap-2  ${
                        !additionalTrOptions?.colSpanTarget.includes(item) &&
                        currentOrderBy === item
                          ? "text-secondary"
                          : ""
                      }`}
                      onClick={() => {
                        if (
                          !additionalTrOptions?.colSpanTarget.includes(item)
                        ) {
                          setOrderByList((prev) =>
                            prev === "ASC" ? "DESC" : "ASC"
                          );
                          setCurrentOrderBy(item);

                          const sorted = orderBy(
                            tableTdData,
                            [item],
                            [orderByList === "ASC" ? "asc" : "desc"]
                          );
                          setTableTdData(sorted);
                        }
                      }}
                    >
                      <div
                        className={`${
                          !additionalTrOptions?.colSpanTarget.includes(item)
                            ? "cursor-pointer"
                            : ""
                        } text-base max-sm:text-sm`}
                      >
                        {additionalTrOptions &&
                        item in additionalTrOptions?.colSpanStarter &&
                        additionalTrOptions?.colSpanTarget.includes(item)
                          ? additionalTrOptions?.colSpanStarter[item].title
                          : tableThData.get(item)}
                      </div>
                      {!additionalTrOptions?.colSpanTarget.includes(item) && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="2.5"
                          stroke="currentColor"
                          className={`
                        ${
                          orderByList === "DESC" ? "rotate-180" : "rotate-0"
                        } size-3 ${
                            currentOrderBy === item ? "block" : "hidden"
                          }`}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
                          />
                        </svg>
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
            <tr
              className={`border-zinc-400 ${trOptions?.thead?.className?.()} `}
              onClick={() =>
                trOptions?.thead?.func !== undefined && trOptions.thead.func()
              }
            >
              {additionalTrOptions?.colSpanTarget.length === 0 && (
                <th className="border border-zinc-300">
                  <label className="flex">
                    <input
                      disabled={!checkable.multi}
                      type="checkbox"
                      className="checkbox max-sm:checkbox-sm"
                      checked={
                        tabelCkecked.length > 0 &&
                        tabelCkecked.length === tableTdData.flat().length
                      }
                      onChange={(e) => {
                        const tableChekced: number[] = [];

                        if (e.currentTarget.checked) {
                          map(tableTdData, (item) => {
                            tableChekced.push(item.no as number);
                          });
                        }
                        setTableChecked(tableChekced);
                        checkable.setter(tableChekced);
                      }}
                    />
                  </label>
                </th>
              )}

              {Array.from(tableThData.keys())?.map((item, index) => {
                return (
                  <th
                    rowSpan={
                      additionalTrOptions?.colSpanTarget.length !== 0
                        ? 2
                        : undefined
                    }
                    className={`border border-zinc-300 ${
                      !additionalTrOptions?.colSpanTarget.includes(item)
                        ? "hidden"
                        : ""
                    }`}
                    key={`${item}-${index}`}
                    draggable={
                      !additionalTrOptions && trOptions?.thead?.isDraggable?.()
                    }
                    onDragStart={(e) => {
                      const selection = window.getSelection();

                      if (selection?.type === "Range") {
                        selection.removeAllRanges();
                      }

                      setCurrentDrag("thead");
                      const text = e.currentTarget.children[0]
                        .children[0] as HTMLElement;
                      setTheadDrag((prev) => {
                        return {
                          ...prev,
                          start: text.innerText,
                        };
                      });
                    }}
                    onDragEnter={(e) => {
                      if (currentDrag === "thead") {
                        const text = e.currentTarget.children[0]
                          .children[0] as HTMLElement;
                        setTheadDrag((prev) => {
                          return {
                            ...prev,
                            beforeChanged: text.innerText,
                          };
                        });
                        const throttledDrager = throttle(() => {
                          if (
                            theadDrag.start !== "no" &&
                            theadDrag.start !== "" &&
                            text.innerText !== "" &&
                            text.innerText !== "no" &&
                            theadDrag.beforeChanged !== text.innerText
                          ) {
                            const copy = [...addedMapData];
                            const startIndex = copy.findIndex((subArr) =>
                              subArr.includes(theadDrag.start)
                            );
                            const endIndex = copy.findIndex((subArr) =>
                              subArr.includes(text.innerText)
                            );

                            copy[startIndex] = addedMapData[endIndex];
                            copy[endIndex] = addedMapData[startIndex];

                            setAddedMapData(copy);
                          }
                        }, 3000);

                        throttledDrager();
                      }
                    }}
                    onDragOver={(e) => {
                      e.preventDefault();
                    }}
                    onDragEnd={() => {
                      setTheadDrag({ start: "", end: "", beforeChanged: "" });
                      setCurrentDrag("");
                    }}
                  >
                    <div
                      className={`flex items-center gap-2 ${
                        currentOrderBy === item ? "text-secondary" : ""
                      }`}
                      onClick={() => {
                        setOrderByList((prev) =>
                          prev === "ASC" ? "DESC" : "ASC"
                        );
                        setCurrentOrderBy(item);
                        // const sorted = tableTdData.sort((a, b) => {
                        //   if (orderBy === "ASC") {
                        //     if (a[item] > b[item]) {
                        //       return 1;
                        //     }
                        //     if (a[item] < b[item]) {
                        //       return -1;
                        //     }
                        //     return 0;
                        //   } else if (orderBy === "DESC") {
                        //     if (a[item] > b[item]) {
                        //       return -1;
                        //     }
                        //     if (a[item] < b[item]) {
                        //       return 1;
                        //     }
                        //     return 0;
                        //   }
                        //   return 0;
                        // });
                        const sorted = orderBy(
                          tableTdData,
                          [item],
                          [orderByList === "ASC" ? "asc" : "desc"]
                        );
                        setTableTdData(sorted);
                      }}
                    >
                      <div
                        className={`cursor-pointer text-base max-sm:text-sm`}
                      >
                        {tableThData.get(item)}
                      </div>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2.5"
                        stroke="currentColor"
                        className={`
                        ${
                          orderByList === "DESC" ? "rotate-180" : "rotate-0"
                        } size-3 ${
                          currentOrderBy === item ? "opacity-1" : "opacity-0"
                        }`}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
                        />
                      </svg>
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody draggable={false}>
            {tableTdData?.map((item, index) => {
              return (
                <tr
                  key={index}
                  className={`
                  ${
                    searchText !== "" &&
                    !getRegExp(searchText).test(Object.values(item).toString())
                      ? "hidden"
                      : ""
                  }
                  ${trOptions?.tbody?.className?.(item, index)} ${
                    tabelCkecked.includes(item.no as number)
                      ? "bg-[#333] text-primary-content"
                      : ""
                  } border-zinc-400`}
                  onClick={() => {
                    trOptions?.tbody?.func?.(item, index);
                  }}
                  onDoubleClick={() => {
                    trOptions?.tbody?.dbClickFunc?.(item, index);
                  }}
                  draggable={trOptions.tbody?.isDraggable?.(item, index)}
                  onDragStart={() => {
                    const selection = window.getSelection();

                    if (selection?.type === "Range") {
                      selection.removeAllRanges();
                    }

                    setCurrentDrag("tbody");
                    setTbodyDrag((prev) => {
                      return {
                        ...prev,
                        start: index,
                      };
                    });
                  }}
                  onDragEnter={() => {
                    if (currentDrag === "tbody") {
                      setTbodyDrag((prev) => {
                        return {
                          ...prev,
                          beforeChanged: index,
                        };
                      });

                      if (
                        tbodyDrag.beforeChanged !== index &&
                        item.isActive !== false
                      ) {
                        const copy = [...tableTdData];

                        copy[index] = tableTdData[tbodyDrag.start];
                        copy[tbodyDrag.start] = tableTdData[index];

                        setTableTdData(copy);
                        setTbodyDrag((prev) => {
                          return {
                            ...prev,
                            start: index,
                          };
                        });
                      }
                    }
                  }}
                  onDragOver={(e) => {
                    e.preventDefault();
                  }}
                  onDragEnd={() => {
                    setCurrentDrag("");
                    trOptions.tbody?.dragEndFunc &&
                      trOptions.tbody?.dragEndFunc(tableTdData);
                  }}
                >
                  {trOptions.tbody?.isDraggable?.(item, index) && (
                    <td>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
                        />
                      </svg>
                    </td>
                  )}
                  {checkable.active && (
                    <td className="bg-inherit">
                      <label className="flex">
                        <input
                          type="checkbox"
                          className="checkbox max-sm:checkbox-sm"
                          checked={tabelCkecked.includes(item.no as number)}
                          ref={(el) =>
                            (checkboxRef.current[item.no as number] = el)
                          }
                          onChange={(e) => {
                            const isChecekd = [...tabelCkecked];
                            if (e.currentTarget.checked) {
                              isChecekd.push(item.no as number);
                            } else {
                              const targetIndex = isChecekd.indexOf(
                                item.no as number
                              );
                              isChecekd.splice(targetIndex, 1);
                            }

                            if (!checkable.multi) {
                              if (e.currentTarget.checked) {
                                isChecekd.splice(0, 1);
                                isChecekd[0] = item.no as number;
                              } else {
                                isChecekd.splice(0, 1);
                              }
                            }
                            setTableChecked(isChecekd);
                            checkable.setter(isChecekd);
                          }}
                        />
                      </label>
                    </td>
                  )}

                  {map(item, (value, key) => {
                    return (
                      <td
                        id={`${key}-${index}`}
                        key={key}
                        className={`
                   

                        ${tdOptions[key]?.className}
                         ${key === "no" ? "" : ""}
                        `}
                        onClick={(e) => {
                          e.preventDefault();
                          tdOptions[key]?.func && tdOptions[key]?.func?.();
                          checkable.active &&
                            checkboxRef.current[item.no as number]?.click();
                        }}
                      >
                        <div
                          className={`
                          flex whitespace-nowrap justify-center
                          ${
                            tdOptions[key]?.tooltip?.active
                              ? "tooltip tooltip-bottom tooltip-primary"
                              : ""
                          }`}
                          data-tip={
                            tdOptions[key]?.tooltip?.text === ""
                              ? value
                              : tdOptions[key]?.tooltip?.text
                          }
                        >
                          {tdOptions[key]?.el
                            ? tdOptions[key]?.el?.(value, index, item)
                            : value}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              );
            })}

            {tableTdData.length === 0 && (
              <tr>
                <td
                  className="p-10 text-center border-t-0 border-b border-l border-r border-base-200"
                  colSpan={9999}
                >
                  데이터가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {(perPageOptions?.pageLength || 0) > 1 && (
        <div className="flex justify-center">
          <div className="join">
            <button
              className="join-item btn btn-ghost btn-outline border-base-200 btn-sm max-sm:btn-xs"
              disabled={perPageOptions?.page === 1}
              onClick={() =>
                perPageOptions?.setPerPage((prev: { page: number }) => {
                  return { ...prev, page: prev.page - 1 };
                })
              }
            >
              &lt;
            </button>

            {times(perPageOptions?.pageLength || 0, (item) => {
              const startRange =
                Math.floor((perPageOptions?.page || 1 - 1) / 10) * 10 + 1;
              const endRange = startRange + 9;

              return (
                <button
                  key={`page-${item}`}
                  className={`
                  ${startRange <= item + 1 && item < endRange ? "" : "hidden"}
                  ${
                    perPageOptions?.page === item + 1
                      ? "bg-black text-white border-black"
                      : ""
                  } join-item btn  btn-outline border-base-200 btn-sm max-sm:btn-xs`}
                  onClick={() =>
                    perPageOptions?.setPerPage((prev: { page: number }) => {
                      return { ...prev, page: item + 1 };
                    })
                  }
                >
                  {item + 1}
                </button>
              );
            })}
            <button
              className="join-item btn btn-ghost btn-outline border-base-200 btn-sm max-sm:btn-xs"
              disabled={perPageOptions?.pageLength === perPageOptions?.page}
              onClick={() =>
                perPageOptions?.setPerPage((prev: { page: number }) => {
                  return { ...prev, page: prev.page + 1 };
                })
              }
            >
              &gt;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default index;
