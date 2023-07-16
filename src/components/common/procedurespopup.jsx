import React, { useState } from "react";
import { AiOutlineRollback } from "react-icons/ai";

const ProcedureList = (props) => {
  const [selectedProc, setSelectedProc] = useState("");

  return (
    <div className="bg-white max-h-[300px] w-full m-auto h-full rounded-xl">
      <AiOutlineRollback
        className="m-1 cursor-pointer"
        size={20}
        onClick={props.back}
      />
      <div>
        <h1 className="text-center text-2xl font-medium pb-5">Procedures</h1>
        <div className="max-h-[180px] h-full w-[220px] m-auto overflow-y-auto px-2">
          {props.procedures.map((procedure) => (
            <div className="flex items-center mb-4">
              <input
                id="procedures"
                type="radio"
                value={JSON.stringify(procedure)}
                name="procedureid"
                className="w-4 h-4 "
                onChange={(e) => setSelectedProc(e.currentTarget.value)}
              />
              <label htmlFor="procedures" className="ml-2 text-sm font-medium">
                {procedure.name} -- Php {procedure.amount}.00
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center pt-5">
        <button
          className="bg-[#1993c6] px-14 py-1 rounded-full text-white outline-none font-medium text-lg"
          onClick={() => props.chosenProc(selectedProc)}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default ProcedureList;
