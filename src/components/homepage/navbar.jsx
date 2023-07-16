import React, { useState } from "react";
import dremslogo from "../../assets/dremslogo.png";
import dremslogob from "../../assets/dremslogob.png";
import hero from "../../assets/hero.png";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const Navbar = () => {
  const [nav, setNav] = useState(true);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div>
      {/* LARGE SCREENS */}
      <div className="hidden md:block relative z-20" id="home">
        <header className="bg-[#0099ff] fixed w-full">
          <div className="flex justify-between">
            <a href="#home">
              <img
                className="w-[145px] pl-3 pt-3"
                src={dremslogo}
                alt="/"
              ></img>
            </a>
            <ul className="flex text-[#e0e0e0] text-lg px-5 font-semibold">
              <li className="m-auto px-2 ease-in-out duration-200 hover:text-white cursor-pointer md:text-base lg:text-xl lg:px-5">
                <a href="#home">HOME</a>
              </li>
              <li className="m-auto px-2 ease-in-out duration-200 hover:text-white cursor-pointer md:text-base lg:text-xl lg:px-5">
                <a href="#features">FEATURES</a>
              </li>
              <li className="m-auto px-2 ease-in-out duration-200 hover:text-white cursor-pointer md:text-base lg:text-xl lg:px-5">
                <a href="#">DATE SECURITY</a>
              </li>
              <li className="m-auto px-2 ease-in-out duration-200 hover:text-white cursor-pointer md:text-base lg:text-xl lg:px-5">
                <a href="#contact">CONTACT</a>
              </li>
              <li className="m-auto px-2 ease-in-out duration-200 hover:text-white cursor-pointer md:text-base lg:text-xl lg:px-5">
                <a href="/register">REGISTER</a>
              </li>
              <li className="m-auto px-2 ease-in-out duration-200 hover:text-white cursor-pointer md:text-base lg:text-xl lg:px-5">
                <a href="/login">LOG IN</a>
              </li>
            </ul>
          </div>
        </header>
      </div>
      {/* MOBILE */}
      <div className="md:hidden" id="homemb">
        <header
          className={
            !nav
              ? "bg-white transition-all duration-500 fixed w-full z-30"
              : "bg-[#0099ff] transition-all duration-500 fixed w-full z-30 "
          }
        >
          <div className="flex justify-between">
            {!nav ? (
              <img
                className="w-[145px] pl-3 pt-3"
                src={dremslogob}
                alt="/"
              ></img>
            ) : (
              <img
                className="w-[145px] pl-3 pt-3"
                src={dremslogo}
                alt="/"
              ></img>
            )}
            <div className="flex">
              <div className="p-4 pt-8" onClick={handleNav}>
                {!nav ? (
                  <AiOutlineClose
                    className="cursor-pointer"
                    size={25}
                    fill="black"
                  />
                ) : (
                  <AiOutlineMenu
                    className="cursor-pointer hover:fill-white"
                    size={25}
                    fill="#e0e0e0"
                  />
                )}
              </div>
              {!nav ? (
                <p className="pt-8 pr-6 text-lg -translate-x-3 text-black transition-all duration-500 ">
                  BACK
                </p>
              ) : (
                <p className="pt-8 pr-6 text-lg text-white transition-all duration-500">
                  MENU
                </p>
              )}
            </div>
          </div>
        </header>
        <nav
          className={
            !nav
              ? "bg-white h-screen w-screen transition-all duration-500 opacity-1 fixed z-20"
              : "h-screen transition-all duration-500 opacity-0 fixed w-screen -z-10"
          }
        >
          <ul className="flex-wrap pt-40 pl-10 ">
            <li
              className={
                !nav
                  ? "inline-block w-1/2 h-32  transition-all duration-700 opacity-1 text-xl "
                  : "inline-block w-1/2 pt-12 h-32 transition-all duration-500 overflow-hidden opacity-0 text-xl"
              }
            >
              <a
                className="hover:text-[#0099ff]"
                href="#homemb"
                onClick={handleNav}
              >
                HOME
              </a>
            </li>
            <li
              className={
                !nav
                  ? "inline-block w-1/2 h-32  transition-all duration-700 delay-100 opacity-1 text-xl pl-6"
                  : "inline-block w-1/2 pt-12 h-32 transition-all duration-500 overflow-hidden opacity-0 text-xl pl-6"
              }
            >
              <a
                className="hover:text-[#0099ff]"
                href="#featuresmb"
                onClick={handleNav}
              >
                FEATURES
              </a>
            </li>
            <li
              className={
                !nav
                  ? "inline-block w-1/2 h-32  transition-all duration-700 delay-200 opacity-1 text-xl"
                  : "inline-block w-1/2 pt-12 h-32 transition-all duration-500 overflow-hidden opacity-0 text-xl "
              }
            >
              <a className="hover:text-[#0099ff]" href="#" onClick={handleNav}>
                DATA SECURITY
              </a>
            </li>
            <li
              className={
                !nav
                  ? "inline-block w-1/2 h-32  transition-all duration-700 delay-300 opacity-1 text-xl pl-6"
                  : "inline-block w-1/2 pt-12 h-32 transition-all duration-500 overflow-hidden opacity-0 text-xl pl-6"
              }
            >
              <a
                className="hover:text-[#0099ff]"
                href="#contactmb"
                onClick={handleNav}
              >
                CONTACT
              </a>
            </li>
            <li
              className={
                !nav
                  ? "inline-block w-1/2 h-32  transition-all duration-700 delay-[400ms] opacity-1 text-xl"
                  : "inline-block w-1/2 pt-12 h-32 transition-all duration-500 overflow-hidden opacity-0 text-xl"
              }
            >
              <a className="hover:text-[#0099ff]" href="#" onClick={handleNav}>
                REGISTER
              </a>
            </li>
            <li
              className={
                !nav
                  ? "inline-block w-1/2 h-32  transition-all duration-700 delay-500 opacity-1 text-xl pl-6"
                  : "inline-block w-1/2 pt-12 h-32 transition-all duration-500 overflow-hidden opacity-0 text-xl pl-6"
              }
            >
              <a className="hover:text-[#0099ff]" href="#" onClick={handleNav}>
                LOG IN
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
