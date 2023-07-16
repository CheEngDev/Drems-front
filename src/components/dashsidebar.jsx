import React, { useContext, useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { TbLayoutDashboard } from "react-icons/tb";
import {
  BiClinic,
  BiCalendarCheck,
  BiMoney,
  BiLogOut,
  BiArrowBack,
} from "react-icons/bi";
import { HiUserGroup } from "react-icons/hi";
import avatar from "../assets/avatar.png";
import authService from "../services/authService";
import UserContext from "../context/userContext";

const DashSidebar = () => {
  const userContext = useContext(UserContext);
  const user = userContext.user;
  const [sidebar, setSidebar] = useState(false);
  function logout() {
    authService.logout();
    window.location = "/";
  }

  function showSideBar() {
    setSidebar(!sidebar);
  }
  function closeSideBar() {
    setSidebar(false);
  }
  return (
    <div className=" md:max-w-[210px] lg:max-w-[240px] md:min-w-[190px] w-full md:h-screen">
      {/* Mobile */}
      <div className=" md:hidden ">
        <div className="flex justify-between items-center bg-black fixed p-2 w-full z-10">
          <AiOutlineMenu
            className="cursor-pointer m-1"
            fill="white"
            size={15}
            onClick={showSideBar}
          />
          <div className="text-white text-lg font-medium">
            Welcome Dr. {user.lastName}
          </div>
          <div></div>
        </div>
        <div
          className={
            !sidebar
              ? "bg-black h-screen max-w-[240px] w-full -translate-x-80 -z-30 fixed  transition-all duration-500"
              : "bg-black h-screen max-w-[240px] w-full transition-all z-30 fixed   duration-500"
          }
        >
          <div className="flex justify-end w-full p-1">
            <BiArrowBack
              className="cursor-pointer"
              size={18}
              fill="#e0e0e2"
              onClick={closeSideBar}
            />
          </div>

          <img
            className="w-[60px] h-[60px] rounded-full m-auto"
            src={avatar}
            alt=""
          />
          <h1 className=" text-center text-white font-medium tracking-widest">
            {user.clinicName} Dental Clinic
          </h1>
          <div className="py-2 mt-4 pl-2 hover:text-white flex cursor-pointer hover:scale-105 transition-all duration-200">
            <TbLayoutDashboard className=" mx-1" fill="white" size={17} />
            <a className="text-white text-sm" href="/dashboard">
              Dashboard
            </a>
          </div>
          <div className="py-2 pl-2 hover:text-white flex cursor-pointer hover:scale-105 transition-all duration-200">
            <BiClinic className=" mx-1" fill="white" size={19} />
            <a className="text-white text-sm" href="/dashboard/myclinic">
              My Clinic
            </a>
          </div>
          <div className="py-2 pl-2 hover:text-white flex cursor-pointer hover:scale-105 transition-all duration-200">
            <HiUserGroup className=" mx-1" fill="white" size={19} />
            <a className="text-white text-sm" href="/dashboard/patients">
              Patients
            </a>
          </div>
          <div className="py-2 pl-2 hover:text-white flex cursor-pointer hover:scale-105 transition-all duration-200">
            <BiCalendarCheck className=" mx-1" fill="white" size={21} />
            <a className="text-white text-sm" href="/dashboard/appointments">
              Appointments
            </a>
          </div>
          <div className="py-2 pl-2 hover:text-white flex cursor-pointer hover:scale-105 transition-all duration-200">
            <BiMoney className=" mx-1" fill="white" size={21} />
            <a className="text-white text-sm" href="/dashboard/finances">
              Finances
            </a>
          </div>
          <div
            className="mt-36 pl-2 text-white text-sm flex cursor-pointer hover:scale-105 transition-all duration-200"
            onClick={logout}
          >
            <BiLogOut className=" mx-1" fill="white" size={21} />
            Log out
          </div>
        </div>
        {/* <div className="bg-red-700 h-[500px]">dfsdfsdfds</div> */}
        <div
          className={
            !sidebar
              ? "bg-slate-400 h-screen w-full transition-all fixed -z-10 opacity-0 duration-1000 "
              : "bg-slate-400 h-screen w-full transition-all duration-1000 z-20 fixed opacity-30 flex "
          }
        ></div>
      </div>
      {/* Large Screen */}
      <div className=" md:max-w-[210px] lg:max-w-[240px] md:min-w-[190px] md:w-full md:h-screen md:text-sm lg:text-base hidden md:block bg-black">
        <div className="bg-black">
          <h1 className="text-center text-white font-semibold tracking-wider pt-6 pb-8 md:text-lg lg:text-2xl">
            Good Day<br></br> Dr. {user.lastName}, {user.firstName}
          </h1>
          <ul className=" text-[#D3D3D3] w-[150px] font-semibold m-auto mt-10 tracking-widest ">
            <li className="py-2 hover:text-white flex cursor-pointer hover:scale-105 transition-all duration-200">
              <TbLayoutDashboard
                className="translate-y-1 mx-1"
                fill="white"
                size={17}
              />
              <a href="/dashboard">Dashboard</a>
            </li>
            <li className="py-2 hover:text-white flex cursor-pointer hover:scale-105 transition-all duration-200">
              <BiClinic className="translate-y-1 mx-1" fill="white" size={19} />
              <a href="/dashboard/myclinic">My Clinic</a>
            </li>
            <li className="py-2 hover:text-white flex cursor-pointer hover:scale-105 transition-all duration-200">
              <HiUserGroup
                className="translate-y-1 mx-1"
                fill="white"
                size={19}
              />
              <a href="/dashboard/patients">Patients</a>
            </li>

            <li className="py-2 hover:text-white flex cursor-pointer hover:scale-105 transition-all duration-200">
              <BiCalendarCheck
                className="translate-y-1 mx-1"
                fill="white"
                size={21}
              />
              <a href="/dashboard/appointments">Appointments</a>
            </li>
            <li className="py-2 hover:text-white flex cursor-pointer hover:scale-105 transition-all duration-200">
              <BiMoney className="translate-y-1 mx-1" fill="white" size={21} />
              <a href="/dashboard/finances">Finances</a>
            </li>
            <li
              className="mt-48 hover:text-white flex cursor-pointer hover:scale-105 transition-all duration-200"
              onClick={logout}
            >
              <BiLogOut className="translate-y-1 mx-1" fill="white" size={21} />
              Log out
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashSidebar;
