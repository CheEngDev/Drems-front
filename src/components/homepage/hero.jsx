import React from "react";
import hero from "../../assets/hero.png";

const Hero = () => {
  return (
    <div>
      {/* LARGE SCREENS */}
      <div className="pt-28 pb-40 bg-[#0099ff] justify-evenly hidden lg:flex">
        <div className="pl-14 pt-14 translate-y-10">
          <h1 className="text-left text-5xl font-bold text-white tracking-widest ">
            MONITORING
          </h1>
          <h1 className="text-left text-5xl font-bold text-white tracking-widest ">
            MADE EASY
          </h1>
          <p className="py-5 pb-8 text-white text-[20px] text-left tracking-widest">
            Our aim is to assist you in handling your patients' data more
            efficiently. Rather than relying on manual records, we have
            developed an application that can be accessed on various devices.
          </p>
          <div className="pb-7 flex justify-start">
            <button className="py-1 px-10 text-[29px] text-white font-medium bg-[#002D62] rounded-full hover:scale-105 transition-all duration-300 ">
              Get Started
            </button>
          </div>
        </div>
        <img
          className="max-w-full max-h-[350px] translate-y-10"
          src={hero}
          alt="/"
        ></img>
      </div>
      {/* MOBILE */}
      <div className="pt-28 bg-[#0099ff] lg:hidden">
        <h1 className="text-center text-4xl font-bold text-white tracking-widest ">
          MONITORING MADE EASY
        </h1>
        <p className="pt-3 px-3 text-white text-[18px] text-center tracking-wider">
          Our aim is to assist you in handling your patients' data more
          efficiently. Rather than relying on manual records, we have developed
          an application that can be accessed on various devices.
        </p>
        <div className="pb-2 flex justify-center">
          <img src={hero} alt="/"></img>
        </div>
        <div className="pb-7 flex justify-center">
          <button className="py-1 px-7 text-[25px] text-white font-medium bg-[#002D62] rounded-full hover:scale-105 transition-all duration-300 ">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
