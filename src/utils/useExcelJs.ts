import Excel, { Column } from "exceljs";
import { saveAs } from "file-saver";

import { MakeExcelFunctionTypes } from "../data/types/utils";
import { indexOf, isBoolean, map, times } from "lodash";

const splitArray = (arr: [], chunkSize = 50000) => {
  let result = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    result.push(arr.slice(i, i + chunkSize));
  }
  return result;
};

const getColumnCode = (colIndex: number) => {
  let letter = "";
  while (colIndex > 0) {
    let mod = (colIndex - 1) % 26;
    letter = String.fromCharCode(65 + mod) + letter;
    colIndex = Math.floor((colIndex - mod) / 26);
  }
  return letter;
};

export const makeExcel = async ({
  sheetName,
  data,
  addedMap,
  colSpanStarter,
}: MakeExcelFunctionTypes) => {
  const wb = new Excel.Workbook();
  const sheetObj: { [key: string]: Excel.Worksheet } = {};

  try {
    sheetObj[sheetName] = wb.addWorksheet(sheetName);

    const headers = map(addedMap, (item) => item[1]);
    headers.unshift("no");

    const mergeHeaders: string[] = [];
    times(headers.length, (index) => {
      mergeHeaders.push("");
    });

    if (colSpanStarter) {
      map(colSpanStarter, (value, key) => {
        const target = indexOf(headers, key);
        times(value.colSpan, (item) => {
          mergeHeaders[target + item] = value.title;
        });
      });

      sheetObj[sheetName].addRow(mergeHeaders);
    }
    // colSpanStarter로 상위분류로 묶을 시작점에만 해당 값 넣기

    const headCells = sheetObj[sheetName].addRow(headers);

    if (colSpanStarter) {
      map(mergeHeaders, (item, index) => {
        if (item === "") {
          sheetObj[sheetName].mergeCells(
            `${getColumnCode(index + 1)}1:${getColumnCode(index + 1)}2`
          );
          sheetObj[sheetName].getCell(`${getColumnCode(index + 1)}1`).value =
            headers[index];
        }
      });

      // 헤드셀 상위분류 머지
      map(colSpanStarter, (value, key) => {
        // 머지 시작할 타겟인덱스 체크
        const target = indexOf(headers, key);

        // 타겟인덱스의 code 가져와서 병합, colSpan 갯수만큼 병합하기
        sheetObj[sheetName].mergeCells(
          `${getColumnCode(target + 1)}1:${getColumnCode(
            target + value.colSpan
          )}1`
        );
      });
    }
    // item ==="" 은 세로로 병합해야할 셀

    headCells.eachCell((_, colNum: number) => {
      sheetObj[sheetName].getColumn(colNum).alignment = {
        vertical: "middle",
        horizontal: "center",
      };
    });

    const bodyCells: string[][] = [];
    map(data, (item, index) => {
      const bodyItem: string[] = [String(index + 1)];
      map(addedMap, (mapKey) => {
        if (isBoolean(item[mapKey[0]])) {
          bodyItem.push(item[mapKey[0]] === true ? "O" : "X");
        } else if (
          item[mapKey[0]] === "" ||
          item[mapKey[0]] === undefined ||
          item[mapKey[0]] === null
        ) {
          bodyItem.push("-");
        } else {
          bodyItem.push(String(item[mapKey[0]]));
        }
      });

      bodyCells.push(bodyItem);
    });

    map(bodyCells, (item) => {
      sheetObj[sheetName].addRow(item);
    });

    sheetObj[sheetName].columns.forEach((column: Partial<Column>) => {
      let maxLength = 0;

      if (column && column.header) {
        const headerLength = column.header.toString().length;
        maxLength = headerLength;
      }

      if (column && column.eachCell) {
        column.eachCell({ includeEmpty: true }, (cell) => {
          const cellValue = cell.value ? cell.value.toString() : "";
          const columnLength = cellValue.length;
          if (columnLength > maxLength) {
            maxLength = columnLength;
          }
        });
      }

      if (column) {
        column.width = maxLength + 10;
      }
    });

    const stamp = Date.now();

    const fileData = await wb.xlsx.writeBuffer();
    const blob = new Blob([fileData], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, `${sheetName}_excel_${stamp}`);
  } catch (error) {
    console.log(error);
    throw new Error("Excel Make Errored");
  }
};
