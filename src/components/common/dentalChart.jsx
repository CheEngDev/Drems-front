import React, { useState } from "react";
import dentalChart from "../../assets/Dental Chart Teeths/dentalChart.png";

const DentalChart = (props) => {
  const [toothSelected, setToothSelected] = useState("");

  function handleselectTooth(toothnumber) {
    setToothSelected(toothnumber);
    props.toothNum(toothnumber);
  }
  return (
    <div className="relative inline-block">
      <img className="w-[180px] h-[220px]" src={dentalChart} alt="" />
      {/* Upper */}
      <div
        className={
          toothSelected === 1
            ? "absolute -translate-y-[131px] translate-x-[17px] bg-red-600 rounded-full w-[10px] h-[10px] cursor-pointer"
            : "absolute -translate-y-[131px] translate-x-[17px] rounded-full w-[10px] h-[10px] cursor-pointer"
        }
        onClick={() => handleselectTooth(1)}
      ></div>
      <div
        className={
          toothSelected === 2
            ? "absolute -translate-y-[148px] translate-x-[19px] bg-red-600 rounded-full w-[10px] h-[10px] cursor-pointer"
            : "absolute -translate-y-[149px] translate-x-[19px] rounded-full w-[10px] h-[10px] cursor-pointer"
        }
        onClick={() => handleselectTooth(2)}
      ></div>
      <div
        className={
          toothSelected === 3
            ? "absolute -translate-y-[165px] translate-x-[23px] bg-red-600 rounded-full w-[10px] h-[10px] cursor-pointer"
            : "absolute -translate-y-[165px] translate-x-[23px] rounded-full w-[10px] h-[10px] cursor-pointer"
        }
        onClick={() => handleselectTooth(3)}
      ></div>
      <div
        className={
          toothSelected === 4
            ? "absolute -translate-y-[180px] translate-x-[29px] bg-red-600 rounded-full w-[10px] h-[10px] cursor-pointer"
            : "absolute -translate-y-[180px] translate-x-[29px] rounded-full w-[10px] h-[10px] cursor-pointer"
        }
        onClick={() => handleselectTooth(4)}
      ></div>
      <div
        className={
          toothSelected === 5
            ? "absolute -translate-y-[191px] translate-x-[38px] bg-red-600 rounded-full w-[10px] h-[10px] cursor-pointer"
            : "absolute -translate-y-[191px] translate-x-[38px] rounded-full w-[10px] h-[10px] cursor-pointer"
        }
        onClick={() => handleselectTooth(5)}
      ></div>
      <div
        className={
          toothSelected === 6
            ? "absolute -translate-y-[200px] translate-x-[49px] bg-red-600 rounded-full w-[10px] h-[10px] cursor-pointer"
            : "absolute -translate-y-[200px] translate-x-[49px] rounded-full w-[10px] h-[10px] cursor-pointer"
        }
        onClick={() => handleselectTooth(6)}
      ></div>
      <div
        className={
          toothSelected === 7
            ? "absolute -translate-y-[205px] translate-x-[62px] bg-red-600 rounded-full w-[10px] h-[10px] cursor-pointer"
            : "absolute -translate-y-[205px] translate-x-[62px] rounded-full w-[10px] h-[10px] cursor-pointer"
        }
        onClick={() => handleselectTooth(7)}
      ></div>
      <div
        className={
          toothSelected === 8
            ? "absolute -translate-y-[209px] translate-x-[75px] bg-red-600 rounded-full w-[10px] h-[10px] cursor-pointer"
            : "absolute -translate-y-[209px] translate-x-[75px] rounded-full w-[10px] h-[10px] cursor-pointer"
        }
        onClick={() => handleselectTooth(8)}
      ></div>
      <div
        className={
          toothSelected === 9
            ? "absolute -translate-y-[209px] translate-x-[94px] bg-red-600 rounded-full w-[10px] h-[10px] cursor-pointer"
            : "absolute -translate-y-[209px] translate-x-[94px] rounded-full w-[10px] h-[10px] cursor-pointer"
        }
        onClick={() => handleselectTooth(9)}
      ></div>
      <div
        className={
          toothSelected === 10
            ? "absolute -translate-y-[205px] translate-x-[107px] bg-red-600 rounded-full w-[10px] h-[10px] cursor-pointer"
            : "absolute -translate-y-[205px] translate-x-[107px] rounded-full w-[10px] h-[10px] cursor-pointer"
        }
        onClick={() => handleselectTooth(10)}
      ></div>
      <div
        className={
          toothSelected === 11
            ? "absolute -translate-y-[200px] translate-x-[120px] bg-red-600 rounded-full w-[10px] h-[10px] cursor-pointer"
            : "absolute -translate-y-[200px] translate-x-[120px] rounded-full w-[10px] h-[10px] cursor-pointer"
        }
        onClick={() => handleselectTooth(11)}
      ></div>
      <div
        className={
          toothSelected === 12
            ? "absolute -translate-y-[190px] translate-x-[130px] bg-red-600 rounded-full w-[10px] h-[10px] cursor-pointer"
            : "absolute -translate-y-[190px] translate-x-[130px] rounded-full w-[10px] h-[10px] cursor-pointer"
        }
        onClick={() => handleselectTooth(12)}
      ></div>
      <div
        className={
          toothSelected === 13
            ? "absolute -translate-y-[179px] translate-x-[138px] bg-red-600 rounded-full w-[10px] h-[10px] cursor-pointer"
            : "absolute -translate-y-[179px] translate-x-[138px] rounded-full w-[10px] h-[10px] cursor-pointer"
        }
        onClick={() => handleselectTooth(13)}
      ></div>
      <div
        className={
          toothSelected === 14
            ? "absolute -translate-y-[165px] translate-x-[145px] bg-red-600 rounded-full w-[10px] h-[10px] cursor-pointer"
            : "absolute -translate-y-[165px] translate-x-[145px] rounded-full w-[10px] h-[10px] cursor-pointer"
        }
        onClick={() => handleselectTooth(14)}
      ></div>
      <div
        className={
          toothSelected === 15
            ? "absolute -translate-y-[148px] translate-x-[150px] bg-red-600 rounded-full w-[10px] h-[10px] cursor-pointer"
            : "absolute -translate-y-[148px] translate-x-[150px] rounded-full w-[10px] h-[10px] cursor-pointer"
        }
        onClick={() => handleselectTooth(15)}
      ></div>
      <div
        className={
          toothSelected === 16
            ? "absolute -translate-y-[131px] translate-x-[153px] bg-red-600 rounded-full w-[10px] h-[10px] cursor-pointer"
            : "absolute -translate-y-[131px] translate-x-[153px] rounded-full w-[10px] h-[10px] cursor-pointer"
        }
        onClick={() => handleselectTooth(16)}
      ></div>
      {/* Lower */}
      <div
        className={
          toothSelected === 32
            ? "absolute -translate-y-[101px] translate-x-[17px] bg-red-600 rounded-full w-[10px] h-[10px] cursor-pointer"
            : "absolute -translate-y-[101px] translate-x-[17px] rounded-full w-[10px] h-[10px] cursor-pointer"
        }
        onClick={() => handleselectTooth(32)}
      ></div>
      <div
        className={
          toothSelected === 31
            ? "absolute -translate-y-[84px] translate-x-[19px] bg-red-600 rounded-full w-[10px] h-[10px] cursor-pointer"
            : "absolute -translate-y-[84px] translate-x-[19px] rounded-full w-[10px] h-[10px] cursor-pointer"
        }
        onClick={() => handleselectTooth(31)}
      ></div>
      <div
        className={
          toothSelected === 30
            ? "absolute -translate-y-[68px] translate-x-[23px] bg-red-600 rounded-full w-[10px] h-[10px] cursor-pointer"
            : "absolute -translate-y-[68px] translate-x-[23px] rounded-full w-[10px] h-[10px] cursor-pointer"
        }
        onClick={() => handleselectTooth(30)}
      ></div>
      <div
        className={
          toothSelected === 29
            ? "absolute -translate-y-[52px] translate-x-[29px] bg-red-600 rounded-full w-[10px] h-[10px] cursor-pointer"
            : "absolute -translate-y-[52px] translate-x-[29px] rounded-full w-[10px] h-[10px] cursor-pointer"
        }
        onClick={() => handleselectTooth(29)}
      ></div>
      <div
        className={
          toothSelected === 28
            ? "absolute -translate-y-[42px] translate-x-[38px] bg-red-600 rounded-full w-[10px] h-[10px] cursor-pointer"
            : "absolute -translate-y-[42px] translate-x-[38px] rounded-full w-[10px] h-[10px] cursor-pointer"
        }
        onClick={() => handleselectTooth(28)}
      ></div>
      <div
        className={
          toothSelected === 27
            ? "absolute -translate-y-[32px] translate-x-[49px] bg-red-600 rounded-full w-[10px] h-[10px] cursor-pointer"
            : "absolute -translate-y-[32px] translate-x-[49px] rounded-full w-[10px] h-[10px] cursor-pointer"
        }
        onClick={() => handleselectTooth(27)}
      ></div>
      <div
        className={
          toothSelected === 26
            ? "absolute -translate-y-[26px] translate-x-[62px] bg-red-600 rounded-full w-[10px] h-[10px] cursor-pointer"
            : "absolute -translate-y-[26px] translate-x-[62px] rounded-full w-[10px] h-[10px] cursor-pointer"
        }
        onClick={() => handleselectTooth(26)}
      ></div>
      <div
        className={
          toothSelected === 25
            ? "absolute -translate-y-[23px] translate-x-[75px] bg-red-600 rounded-full w-[10px] h-[10px] cursor-pointer"
            : "absolute -translate-y-[23px] translate-x-[75px] rounded-full w-[10px] h-[10px] cursor-pointer"
        }
        onClick={() => handleselectTooth(25)}
      ></div>
      <div
        className={
          toothSelected === 24
            ? "absolute -translate-y-[23px] translate-x-[94px] bg-red-600 rounded-full w-[10px] h-[10px] cursor-pointer"
            : "absolute -translate-y-[23px] translate-x-[94px] rounded-full w-[10px] h-[10px] cursor-pointer"
        }
        onClick={() => handleselectTooth(24)}
      ></div>
      <div
        className={
          toothSelected === 23
            ? "absolute -translate-y-[26px] translate-x-[108px] bg-red-600 rounded-full w-[10px] h-[10px] cursor-pointer"
            : "absolute -translate-y-[26px] translate-x-[108px] rounded-full w-[10px] h-[10px] cursor-pointer"
        }
        onClick={() => handleselectTooth(23)}
      ></div>
      <div
        className={
          toothSelected === 22
            ? "absolute -translate-y-[32px] translate-x-[120px] bg-red-600 rounded-full w-[10px] h-[10px] cursor-pointer"
            : "absolute -translate-y-[32px] translate-x-[120px] rounded-full w-[10px] h-[10px] cursor-pointer"
        }
        onClick={() => handleselectTooth(22)}
      ></div>
      <div
        className={
          toothSelected === 21
            ? "absolute -translate-y-[42px] translate-x-[132px] bg-red-600 rounded-full w-[10px] h-[10px] cursor-pointer"
            : "absolute -translate-y-[42px] translate-x-[132px] rounded-full w-[10px] h-[10px] cursor-pointer"
        }
        onClick={() => handleselectTooth(21)}
      ></div>
      <div
        className={
          toothSelected === 20
            ? "absolute -translate-y-[53px] translate-x-[140px] bg-red-600 rounded-full w-[10px] h-[10px] cursor-pointer"
            : "absolute -translate-y-[53px] translate-x-[140px] rounded-full w-[10px] h-[10px] cursor-pointer"
        }
        onClick={() => handleselectTooth(20)}
      ></div>
      <div
        className={
          toothSelected === 19
            ? "absolute -translate-y-[68px] translate-x-[145px] bg-red-600 rounded-full w-[10px] h-[10px] cursor-pointer"
            : "absolute -translate-y-[68px] translate-x-[145px] rounded-full w-[10px] h-[10px] cursor-pointer"
        }
        onClick={() => handleselectTooth(19)}
      ></div>
      <div
        className={
          toothSelected === 18
            ? "absolute -translate-y-[84px] translate-x-[150px] bg-red-600 rounded-full w-[10px] h-[10px] cursor-pointer"
            : "absolute -translate-y-[84px] translate-x-[150px] rounded-full w-[10px] h-[10px] cursor-pointer"
        }
        onClick={() => handleselectTooth(18)}
      ></div>
      <div
        className={
          toothSelected === 17
            ? "absolute -translate-y-[101px] translate-x-[153px] bg-red-600 rounded-full w-[10px] h-[10px] cursor-pointer"
            : "absolute -translate-y-[101px] translate-x-[153px] rounded-full w-[10px] h-[10px] cursor-pointer"
        }
        onClick={() => handleselectTooth(17)}
      ></div>
    </div>
  );
};

export default DentalChart;
