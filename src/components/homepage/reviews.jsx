import React, { useState } from "react";

const Reviews = () => {
  const reviews = [
    {
      review: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tem",
      dentist: "Dr. Remelyn Rinon",
    },
    {
      review: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tem",
      dentist: "Dr. Rose Canilang",
    },
    {
      review: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tem",
      dentist: "Dr. Jose Antonio",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div>
      <div>
        <h1 className="text-center">Reviews of our Clients</h1>
        <p className="text-center">What dentists say about Drems</p>
      </div>
      <div className="flex overflow-hidden w-[1000px] h-44 bg-slate-500">
        {reviews.map((x, index) => {
          return (
            <div className="w-1000px">
              <p>{x.review}</p>
              <p>{x.dentist}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Reviews;
