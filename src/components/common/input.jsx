import React from "react";

const Input = (props) => {
  return (
    <div className=" m-auto max-w-[380px] min-w-[200px] px-9">
      <label className="px-1 text-sm " htmlFor={props.name}>
        {props.label}{" "}
        {props.error && (
          <span className="text-red-600 text-lg font-bold"> * </span>
        )}
      </label>
      <input
        className="border-2 outline-none rounded-xl w-full pl-2"
        value={props.value}
        onChange={props.onChange}
        id={props.name}
        name={props.name}
        type={props.type}
      />
    </div>
  );
};

export default Input;
