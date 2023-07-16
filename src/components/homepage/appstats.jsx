import React, { useEffect } from "react";
import stats from "../../assets/stats.png";
import { BiUserPlus, BiClinic } from "react-icons/bi";
import { BsCardChecklist } from "react-icons/bs";
import AOS from "aos";
import "aos/dist/aos.css";

const Appstats = () => {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);
  return (
    <div>
      {/* LARGE SCREEN */}
      <div className="bg-[#f9f9f9] pt-2 hidden md:block">
        <header className="text-4xl font-bold flex justify-center translate-y-20">
          <span className="px-3 text-[#0099ff]">APP</span> STATISTICS
        </header>
        <div className="flex justify-center opacity-30">
          <img className="w-[600px]" src={stats} alt="/"></img>
        </div>
        <div className="flex justify-between h-40">
          <div className="bg-white rounded-xl max-w-[400px] w-full mx-3 -translate-y-[420px] hover:bg-[#7385e1] transition-all ">
            <BiUserPlus size={50} fill="#2c3e50" className="m-auto " />
            <h2 className="text-center flex justify-center text-[#2c3e50] font-medium p-3">
              USERS WORLDWIDE
            </h2>
            <p className="text-center pb-1 text-[#2c3e50] font-semibold text-3xl">
              7000+
            </p>
          </div>
          <div className="bg-white rounded-xl max-w-[400px] w-full mx-3 -translate-y-[420px] hover:bg-[#7385e1] transition-all">
            <BsCardChecklist size={50} fill="#2c3e50" className="m-auto" />
            <h2 className="p-3 text-center text-[#2c3e50] font-medium">
              ENCODED PATIENTS
            </h2>
            <p className="text-center pb-1 text-[#2c3e50] font-semibold text-3xl">
              40,000+
            </p>
          </div>
          <div className="bg-white rounded-xl max-w-[400px] w-full mx-3  -translate-y-[420px] hover:bg-[#7385e1] transition-all">
            <BiClinic size={50} fill="#2c3e50" className="m-auto" />
            <h2 className="p-3 text-center text-[#2c3e50] font-semibold">
              REGISTERED CLINIC OWNERS
            </h2>
            <p className="text-center pb-1 text-[#2c3e50] font-semibold text-3xl">
              3000+
            </p>
          </div>
        </div>

        <p className="font-bold tracking-widest text-5xl text-center p-3 -translate-y-44 text-[#0099ff]">
          BE PART OF THE DREMS FAMILY
        </p>
      </div>
      {/* MOBILE */}
      <div className="bg-[#f9f9f9] pt-2 md:hidden">
        <header className="text-4xl font-bold flex justify-center translate-y-9">
          <span className="px-3 text-[#0099ff]">APP</span> STATISTICS
        </header>
        <div className="flex justify-center opacity-30">
          <img className="max-w-7xl" src={stats} alt="/"></img>
        </div>

        <div className="bg-white p-1 rounded-xl max-w-[300px] m-auto -translate-y-[420px] hover:bg-[#7385e1] transition-all ">
          <BiUserPlus size={40} fill="#2c3e50" className="m-auto " />
          <h2 className="text-center flex justify-center text-[#2c3e50] font-medium">
            USERS WORLDWIDE
          </h2>
          <p className="text-center pb-1 text-[#2c3e50] font-medium">7000+</p>
        </div>
        <div className="bg-white rounded-xl max-w-[300px] m-auto -translate-y-[380px] hover:bg-[#7385e1] transition-all">
          <BsCardChecklist size={40} fill="#2c3e50" className="m-auto" />
          <h2 className="p-1 text-center text-[#2c3e50] font-medium">
            ENCODED PATIENTS
          </h2>
          <p className="text-center pb-1 text-[#2c3e50] font-medium">40,000+</p>
        </div>
        <div className="bg-white rounded-xl max-w-[300px] m-auto -translate-y-[340px] hover:bg-[#7385e1] transition-all">
          <BiClinic size={40} fill="#2c3e50" className="m-auto" />
          <h2 className="p-1 text-center text-[#2c3e50] font-semibold">
            REGISTERED CLINIC OWNERS
          </h2>
          <p className="text-center pb-1 text-[#2c3e50] font-medium">3000+</p>
        </div>
        <p className="font-bold tracking-widest text-4xl text-center p-3 -translate-y-52 text-[#0099ff]">
          BE PART OF THE DREMS FAMILY
        </p>
      </div>
    </div>
  );
};

export default Appstats;
