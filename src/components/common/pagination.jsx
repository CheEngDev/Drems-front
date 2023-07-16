import React, { useState } from "react";
import { GrNext, GrPrevious } from "react-icons/gr";

const Pagination = (props) => {
  return (
    <div className="flex justify-between pt-4">
      <div>
        <p className="text-sm">
          Displaying{" "}
          <span className="font-bold text-base underline">
            {props.currentPage * props.pageS + props.pxsonpage}
          </span>{" "}
          Out of <span className="font-bold text-base">{props.itemsCount}</span>
        </p>
      </div>
      <div className="flex">
        <p className="px-3 font-bold">{props.currentPage + 1} </p>
        <button className="bg-gray-200 mx-1" onClick={props.prevbt}>
          <GrPrevious size={15} />
        </button>
        <button className="bg-gray-200 mx-1" onClick={props.nextbt}>
          <GrNext size={15} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
