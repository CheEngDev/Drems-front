import React, { useState } from "react";
import { AiOutlineRollback } from "react-icons/ai";

const PatientList = (props) => {
  const [selectedPx, setSelectedPx] = useState();

  return (
    <div className="bg-white max-h-[300px] w-full m-auto h-full rounded-xl">
      <AiOutlineRollback
        className="m-1 cursor-pointer"
        size={20}
        onClick={props.back}
      />
      <div>
        <h1 className="text-center text-2xl font-medium">Patients</h1>
        <div className="max-h-[180px] h-full w-[350px] m-auto overflow-y-auto ml-20 mt-2">
          {props.patients.map((px) => (
            <div className="flex items-center mb-4">
              <input
                id="procedures"
                type="radio"
                value={JSON.stringify(px)}
                name="procedureid"
                className="w-4 h-4 "
                onChange={(e) => setSelectedPx(e.currentTarget.value)}
              />
              <label htmlFor="procedures" className="ml-2 text-sm font-medium ">
                {px.firstName}, {px.lastName}
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center pt-5">
        <button
          className="bg-[#1993c6] px-14 py-1 rounded-full text-white outline-none font-medium text-lg"
          onClick={() => props.chosenPatient(selectedPx)}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default PatientList;
