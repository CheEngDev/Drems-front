import React, { useState, useEffect } from "react";
import dentalChart from "../../assets/Dental Chart Teeths/dentalChart.png";

const DentalChartPrev = (props) => {
  return (
    <div className="relative inline-block">
      <img className="w-[180px] h-[220px]" src={dentalChart} alt="" />
      {/* Upper */}
      <div
        className={
          props.case && props.case.teeth === 1
            ? "absolute -translate-y-[131px] translate-x-[17px] bg-red-600 rounded-full w-[10px] h-[10px] "
            : "absolute -translate-y-[131px] translate-x-[17px] rounded-full w-[10px] h-[10px] "
        }
      ></div>
      <div
        className={
          props.case && props.case.teeth === 2
            ? "absolute -translate-y-[148px] translate-x-[19px] bg-red-600 rounded-full w-[10px] h-[10px] "
            : "absolute -translate-y-[149px] translate-x-[19px] rounded-full w-[10px] h-[10px] "
        }
      ></div>
      <div
        className={
          props.case && props.case.teeth === 3
            ? "absolute -translate-y-[165px] translate-x-[23px] bg-red-600 rounded-full w-[10px] h-[10px] "
            : "absolute -translate-y-[165px] translate-x-[23px] rounded-full w-[10px] h-[10px] "
        }
      ></div>
      <div
        className={
          props.case && props.case.teeth === 4
            ? "absolute -translate-y-[180px] translate-x-[29px] bg-red-600 rounded-full w-[10px] h-[10px] "
            : "absolute -translate-y-[180px] translate-x-[29px] rounded-full w-[10px] h-[10px] "
        }
      ></div>
      <div
        className={
          props.case && props.case.teeth === 5
            ? "absolute -translate-y-[191px] translate-x-[38px] bg-red-600 rounded-full w-[10px] h-[10px] "
            : "absolute -translate-y-[191px] translate-x-[38px] rounded-full w-[10px] h-[10px] "
        }
      ></div>
      <div
        className={
          props.case && props.case.teeth === 6
            ? "absolute -translate-y-[200px] translate-x-[49px] bg-red-600 rounded-full w-[10px] h-[10px] "
            : "absolute -translate-y-[200px] translate-x-[49px] rounded-full w-[10px] h-[10px] "
        }
      ></div>
      <div
        className={
          props.case && props.case.teeth === 7
            ? "absolute -translate-y-[205px] translate-x-[62px] bg-red-600 rounded-full w-[10px] h-[10px] "
            : "absolute -translate-y-[205px] translate-x-[62px] rounded-full w-[10px] h-[10px] "
        }
      ></div>
      <div
        className={
          props.case && props.case.teeth === 8
            ? "absolute -translate-y-[209px] translate-x-[75px] bg-red-600 rounded-full w-[10px] h-[10px] "
            : "absolute -translate-y-[209px] translate-x-[75px] rounded-full w-[10px] h-[10px] "
        }
      ></div>
      <div
        className={
          props.case && props.case.teeth === 9
            ? "absolute -translate-y-[209px] translate-x-[94px] bg-red-600 rounded-full w-[10px] h-[10px] "
            : "absolute -translate-y-[209px] translate-x-[94px] rounded-full w-[10px] h-[10px] "
        }
      ></div>
      <div
        className={
          props.case && props.case.teeth === 10
            ? "absolute -translate-y-[205px] translate-x-[107px] bg-red-600 rounded-full w-[10px] h-[10px] "
            : "absolute -translate-y-[205px] translate-x-[107px] rounded-full w-[10px] h-[10px] "
        }
      ></div>
      <div
        className={
          props.case && props.case.teeth === 11
            ? "absolute -translate-y-[200px] translate-x-[120px] bg-red-600 rounded-full w-[10px] h-[10px] "
            : "absolute -translate-y-[200px] translate-x-[120px] rounded-full w-[10px] h-[10px] "
        }
      ></div>
      <div
        className={
          props.case && props.case.teeth === 12
            ? "absolute -translate-y-[190px] translate-x-[130px] bg-red-600 rounded-full w-[10px] h-[10px] "
            : "absolute -translate-y-[190px] translate-x-[130px] rounded-full w-[10px] h-[10px] "
        }
      ></div>
      <div
        className={
          props.case && props.case.teeth === 13
            ? "absolute -translate-y-[179px] translate-x-[138px] bg-red-600 rounded-full w-[10px] h-[10px] "
            : "absolute -translate-y-[179px] translate-x-[138px] rounded-full w-[10px] h-[10px] "
        }
      ></div>
      <div
        className={
          props.case && props.case.teeth === 14
            ? "absolute -translate-y-[165px] translate-x-[145px] bg-red-600 rounded-full w-[10px] h-[10px] "
            : "absolute -translate-y-[165px] translate-x-[145px] rounded-full w-[10px] h-[10px] "
        }
      ></div>
      <div
        className={
          props.case && props.case.teeth === 15
            ? "absolute -translate-y-[148px] translate-x-[150px] bg-red-600 rounded-full w-[10px] h-[10px] "
            : "absolute -translate-y-[148px] translate-x-[150px] rounded-full w-[10px] h-[10px] "
        }
      ></div>
      <div
        className={
          props.case && props.case.teeth === 16
            ? "absolute -translate-y-[131px] translate-x-[153px] bg-red-600 rounded-full w-[10px] h-[10px] "
            : "absolute -translate-y-[131px] translate-x-[153px] rounded-full w-[10px] h-[10px] "
        }
      ></div>
      {/* Lower */}
      <div
        className={
          props.case && props.case.teeth === 32
            ? "absolute -translate-y-[101px] translate-x-[17px] bg-red-600 rounded-full w-[10px] h-[10px] "
            : "absolute -translate-y-[101px] translate-x-[17px] rounded-full w-[10px] h-[10px] "
        }
      ></div>
      <div
        className={
          props.case && props.case.teeth === 31
            ? "absolute -translate-y-[84px] translate-x-[19px] bg-red-600 rounded-full w-[10px] h-[10px] "
            : "absolute -translate-y-[84px] translate-x-[19px] rounded-full w-[10px] h-[10px] "
        }
      ></div>
      <div
        className={
          props.case && props.case.teeth === 30
            ? "absolute -translate-y-[68px] translate-x-[23px] bg-red-600 rounded-full w-[10px] h-[10px] "
            : "absolute -translate-y-[68px] translate-x-[23px] rounded-full w-[10px] h-[10px] "
        }
      ></div>
      <div
        className={
          props.case && props.case.teeth === 29
            ? "absolute -translate-y-[52px] translate-x-[29px] bg-red-600 rounded-full w-[10px] h-[10px] "
            : "absolute -translate-y-[52px] translate-x-[29px] rounded-full w-[10px] h-[10px] "
        }
      ></div>
      <div
        className={
          props.case && props.case.teeth === 28
            ? "absolute -translate-y-[42px] translate-x-[38px] bg-red-600 rounded-full w-[10px] h-[10px] "
            : "absolute -translate-y-[42px] translate-x-[38px] rounded-full w-[10px] h-[10px] "
        }
      ></div>
      <div
        className={
          props.case && props.case.teeth === 27
            ? "absolute -translate-y-[32px] translate-x-[49px] bg-red-600 rounded-full w-[10px] h-[10px] "
            : "absolute -translate-y-[32px] translate-x-[49px] rounded-full w-[10px] h-[10px] "
        }
      ></div>
      <div
        className={
          props.case && props.case.teeth === 26
            ? "absolute -translate-y-[26px] translate-x-[62px] bg-red-600 rounded-full w-[10px] h-[10px] "
            : "absolute -translate-y-[26px] translate-x-[62px] rounded-full w-[10px] h-[10px] "
        }
      ></div>
      <div
        className={
          props.case && props.case.teeth === 25
            ? "absolute -translate-y-[23px] translate-x-[75px] bg-red-600 rounded-full w-[10px] h-[10px] "
            : "absolute -translate-y-[23px] translate-x-[75px] rounded-full w-[10px] h-[10px] "
        }
      ></div>
      <div
        className={
          props.case && props.case.teeth === 24
            ? "absolute -translate-y-[23px] translate-x-[94px] bg-red-600 rounded-full w-[10px] h-[10px] "
            : "absolute -translate-y-[23px] translate-x-[94px] rounded-full w-[10px] h-[10px] "
        }
      ></div>
      <div
        className={
          props.case && props.case.teeth === 23
            ? "absolute -translate-y-[26px] translate-x-[108px] bg-red-600 rounded-full w-[10px] h-[10px] "
            : "absolute -translate-y-[26px] translate-x-[108px] rounded-full w-[10px] h-[10px] "
        }
      ></div>
      <div
        className={
          props.case && props.case.teeth === 22
            ? "absolute -translate-y-[32px] translate-x-[120px] bg-red-600 rounded-full w-[10px] h-[10px] "
            : "absolute -translate-y-[32px] translate-x-[120px] rounded-full w-[10px] h-[10px] "
        }
      ></div>
      <div
        className={
          props.case && props.case.teeth === 21
            ? "absolute -translate-y-[42px] translate-x-[132px] bg-red-600 rounded-full w-[10px] h-[10px] "
            : "absolute -translate-y-[42px] translate-x-[132px] rounded-full w-[10px] h-[10px] "
        }
      ></div>
      <div
        className={
          props.case && props.case.teeth === 20
            ? "absolute -translate-y-[53px] translate-x-[140px] bg-red-600 rounded-full w-[10px] h-[10px] "
            : "absolute -translate-y-[53px] translate-x-[140px] rounded-full w-[10px] h-[10px] "
        }
      ></div>
      <div
        className={
          props.case && props.case.teeth === 19
            ? "absolute -translate-y-[68px] translate-x-[145px] bg-red-600 rounded-full w-[10px] h-[10px] "
            : "absolute -translate-y-[68px] translate-x-[145px] rounded-full w-[10px] h-[10px] "
        }
      ></div>
      <div
        className={
          props.case && props.case.teeth === 18
            ? "absolute -translate-y-[84px] translate-x-[150px] bg-red-600 rounded-full w-[10px] h-[10px] "
            : "absolute -translate-y-[84px] translate-x-[150px] rounded-full w-[10px] h-[10px] "
        }
      ></div>
      <div
        className={
          props.case && props.case.teeth === 17
            ? "absolute -translate-y-[101px] translate-x-[153px] bg-red-600 rounded-full w-[10px] h-[10px] "
            : "absolute -translate-y-[101px] translate-x-[153px] rounded-full w-[10px] h-[10px] "
        }
      ></div>
    </div>
  );
};

export default DentalChartPrev;
