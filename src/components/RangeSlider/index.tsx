import { join, map } from "lodash";
import React, { useEffect, useRef, useState } from "react";
import TrianglePink from "../../assets/image/icon_triangle_pink.png";

function index({ value }: { value: number }) {
  const rangeInputRef = useRef<HTMLInputElement | null>(null);

  // const [range] = useState(value);
  const triangleRef = useRef<HTMLDivElement | null>(null);

  const colorArr = [
    { color: "rgba(32, 27, 127, 1)", start: "0%", end: "10%" },
    { color: "rgba(36, 32, 156, 1)", start: "10%", end: "20%" },
    { color: "rgba(32, 74, 182, 1)", start: "20%", end: "30%" },
    { color: "rgba(40, 109, 234, 1)", start: "30%", end: "40%" },
    { color: "rgba(39, 167, 230, 1)", start: "40%", end: "50%" },
    { color: "rgba(252, 123, 42, 1)", start: "50%", end: "60%" },
    { color: "rgba(254, 84, 35, 1)", start: "60%", end: "70%" },
    { color: "rgba(219, 71, 40, 1)", start: "70%", end: "80%" },
    { color: "rgba(185, 31, 31, 1)", start: "80%", end: "90%" },
    { color: "rgba(141, 24, 30, 1)", start: "90%", end: "100%" },
  ];

  // useEffect(() => {
  //   if (rangeInputRef.current) {
  //     const amount = rangeInputRef.current?.clientWidth / 10 / 2 - 16;

  //     setGapAmt(amount);
  //   }
  // }, [value, range]);

  useEffect(() => {
    const gradient = map(
      colorArr,
      (item, i) =>
        `${item.color.slice(0, -2)}${i === value - 1 ? "1" : "0.3"}) ${
          item.start
        }, ${item.color.slice(0, -2)}${i === value - 1 ? "1" : "0.3"}) ${
          item.end
        }`
    );
    const gradientString = join(gradient, ", ");
    if (rangeInputRef.current) {
      rangeInputRef.current.style.background = `linear-gradient(to right, ${gradientString})`;
      rangeInputRef.current.type = "";
    }

    if (triangleRef.current && rangeInputRef.current) {
      const sliderRect = rangeInputRef.current.clientWidth;

      const triangleWidth = 3.5;
      const leftPosition = (sliderRect / 10) * value;
      const calcMinus = triangleWidth + sliderRect / 10 / 2;
      console.log("sliderRect", leftPosition);
      triangleRef.current.style.left = `${leftPosition - calcMinus}px`;

      document.documentElement.style.setProperty(
        "--thumb-color",
        colorArr[value - 1].color
      );
    }
  }, [value]);

  const emotionArr = ["절망", "우울", "불편", "불안", "분노"];

  return (
    <div className="relative touch-pan-y mt-[20px]">
      <div className="triangle-pointer" ref={triangleRef}>
        <img src={TrianglePink} alt="핑크 삼칵형" />
      </div>
      <input
        id="range-input"
        type="range"
        min={1}
        max={10}
        value={value}
        ref={rangeInputRef}
        style={{
          outline: "none",
          WebkitAppearance: "none",
          accentColor: "#fff",
          borderRadius: "8px",
          // padding: `0 ${gapAmt}px`,
        }}
        autoFocus
      />
      {/* <div className="flex justify-between mx-[22.5px] mt-[7px]"> */}
      <div className="flex justify-between mt-[7px]">
        {map(emotionArr, (item, index) => {
          return (
            <p
              key={`${item}-${index}`}
              className={`
              ${Math.floor((value - 1) / 2) === index && "!text-primary-500"}
              ${"!text-gray-300"}
              ${
                Math.floor((value - 1) / 2) === index
                  ? "text-primary-500"
                  : "text-gary600"
              } text-center titleds5 flex-[1_1_20%]`}
            >
              {item}
            </p>
          );
        })}
      </div>
    </div>
  );
}

export default index;
