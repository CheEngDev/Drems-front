import React, { useState } from "react";
import { AiOutlineRollback } from "react-icons/ai";

const DentistList = (props) => {
  const [selectedDentist, setSelectedDentist] = useState("");
  return (
    <div className="bg-white max-h-[350px] w-full m-auto h-full rounded-xl">
      <AiOutlineRollback
        className="m-1 cursor-pointer"
        size={20}
        onClick={props.back}
      />
      <div>
        <h1 className="text-center text-3xl font-medium pb-5">Dentist</h1>
        <div className="max-h-[180px] h-full w-[190px] m-auto overflow-y-auto px-2">
          {props.dentists.map((dentist) => (
            <div className="flex items-center mb-4">
              <input
                id="procedures"
                type="radio"
                value={JSON.stringify(dentist)}
                name="default-radio"
                className="w-4 h-4 "
                onChange={(e) => setSelectedDentist(e.currentTarget.value)}
              />
              <label
                htmlFor="default-radio-1"
                className="ml-2 text-lg font-medium"
              >
                {` ${dentist.lastName},${dentist.firstName}`}
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center pt-4">
        <button
          className="bg-[#1993c6] px-14 py-1 rounded-full text-white outline-none font-medium text-lg"
          onClick={() => props.chosenDentist(selectedDentist)}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default DentistList;
