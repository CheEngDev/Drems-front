import React from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";

const SearchBox = (props) => {
  return (
    <div className="border-2 rounded-full bg-white flex ">
      <HiMagnifyingGlass className="translate-y-1  " size={18} fill="#aeb4b7" />
      <input
        className="outline-0 rounded-full"
        type="text"
        placeholder="Search...."
        value={props.value}
        onChange={(e) => {
          props.onChange(e.currentTarget.value);
        }}
      />
    </div>
  );
};

export default SearchBox;
