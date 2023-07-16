import React from "react";

const Avatar = (props) => {
  return (
    <div className="max-w-[50px] min-w-[50px] h-[50px] mx-2">
      <img className="rounded-full" src={props.img} alt="/" />
    </div>
  );
};

export default Avatar;
