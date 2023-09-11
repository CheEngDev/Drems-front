import React, { useContext, useEffect, useState } from "react";
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
import profpicService from "../services/profpicService";
import avatar from "../assets/avatar.png";
import authService from "../services/authService";
import UserContext from "../context/userContext";

const DashSidebar = () => {
  const userContext = useContext(UserContext);
  const user = userContext.user;
  const [sidebar, setSidebar] = useState(false);

  // Uploading Prof Pic
  const [prevImg, setPrevImg] = useState("");
  const [profPicData, setProcPicData] = useState({
    _id: "",
    pfpowner: "",
    profpicUrl: "",
  });
  const [profpic, setProcPic] = useState("");
  const [uploadpf, setUploadPf] = useState(false);

  function logout() {
    authService.logout();
    window.location = "/";
  }

  // Get profpic
  async function getProfPic() {
    // Returns only 1 result since the implementation in backend we have set the req.user
    const result = await profpicService.getProfpic();

    if (result.data.length > 0) {
      setProcPicData(result.data[0]);
    } else {
      setProcPicData({
        _id: "",
        pfpowner: "",
        profpicUrl: "",
      });
    }
  }
  // Post/Add Prof Pic
  async function addProfPic() {
    setUploadPf(false);
    const url = await handleImgUploadtoCloud();
    const profpic = {
      pfpowner: user._id,
      profpicUrl: url,
    };
    const data = await profpicService.addProfpic(profpic);
    setProcPicData(data);
  }

  // Handle upload to cloudinary
  function handleImgUploadtoCloud() {
    const formData = new FormData();
    formData.append("file", profpic);
    formData.append("upload_preset", "xblijdel");
    formData.append("cloud_name", "duxhh9oxy");

    return fetch("https://api.cloudinary.com/v1_1/duxhh9oxy/image/upload", {
      method: "post",
      body: formData,
    })
      .then((resp) => resp.json())
      .then((data) => {
        return data.url;
      })
      .catch((err) => console.log(err));
  }

  // Edit Prof Pic
  async function editProfPic() {
    setUploadPf(false);
    const url = await handleImgUploadtoCloud();
    const profpic = {
      _id: profPicData._id,
      pfpowner: user._id,
      profpicUrl: url,
    };
    const data = await profpicService.editProfpic(profpic);

    setProcPicData(data);
  }

  // Prof Pic pop up
  function handleProfPopup() {
    setUploadPf(!uploadpf);
  }
  function closeProfPopup() {
    setUploadPf(false);
    setPrevImg("");
  }

  // Handle Uploading or Prev Img
  function handleImageUpload(e) {
    const file = e.target.files[0];
    setProcPic(file);

    transformFile(file);
  }

  function transformFile(file) {
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPrevImg(reader.result);
      };
    } else {
      setPrevImg("");
    }
  }

  // Mobile sidebar
  function showSideBar() {
    setSidebar(!sidebar);
  }
  function closeSideBar() {
    setSidebar(false);
  }

  useEffect(() => {
    getProfPic();
  }, []);

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
          {prevImg ? (
            <img
              className="w-[65px] h-[65px] rounded-full m-auto cursor-pointer"
              src={prevImg}
              alt=""
              onClick={handleProfPopup}
            />
          ) : (
            <img
              className="w-[65px] h-[65px] rounded-full m-auto cursor-pointer"
              src={!profPicData.profpicUrl ? avatar : profPicData.profpicUrl}
              alt=""
              onClick={handleProfPopup}
            />
          )}
          {uploadpf ? (
            <div className="absolute bg-slate-100 w-[270px] h-[80px] rounded-2xl left-2">
              <div className="bg-slate-50 rounded-xl h-[90px]">
                <div className="flex justify-end pt-1 px-1">
                  <AiOutlineClose
                    className="cursor-pointer"
                    fill="red"
                    onClick={closeProfPopup}
                  />
                </div>
                <div className="flex justify-center">
                  <input
                    className="mt-2 pl-3"
                    type="file"
                    accept="image/"
                    onChange={(e) => handleImageUpload(e)}
                  />
                </div>

                <div className="flex justify-center pt-2">
                  <button
                    className="bg-black text-white px-5 rounded-full font-medium text-sm"
                    onClick={profPicData.profpicUrl ? editProfPic : addProfPic}
                  >
                    Upload
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div></div>
          )}
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
        <div className="bg-black pt-3">
          {prevImg ? (
            <img
              className="w-[60px] h-[60px] rounded-xl m-auto cursor-pointer"
              src={prevImg}
              alt=""
              onClick={handleProfPopup}
            />
          ) : (
            <img
              className="w-[60px] h-[60px] rounded-xl m-auto cursor-pointer"
              src={
                profPicData.profpicUrl === "" ? avatar : profPicData.profpicUrl
              }
              alt=""
              onClick={handleProfPopup}
            />
          )}
          <div
            className={
              !uploadpf
                ? "w-1/2 h-1/2 absolute left-0 right-0 top-0 bottom-0 m-auto hidden -z-10"
                : "w-[28%] h-[50%] absolute left-20  top-16  m-auto z-20"
            }
          >
            <div className="bg-slate-50 rounded-xl h-[90px]">
              <div className="flex justify-end pt-1 px-1">
                <AiOutlineClose
                  className="cursor-pointer"
                  fill="red"
                  onClick={closeProfPopup}
                />
              </div>
              <div className="flex justify-center">
                <input
                  className="mt-2 pl-3"
                  type="file"
                  accept="image/"
                  onChange={(e) => handleImageUpload(e)}
                />
              </div>

              <div className="flex justify-center pt-2">
                <button
                  className="bg-black text-white px-5 rounded-full font-medium text-sm"
                  onClick={profPicData.profpicUrl ? editProfPic : addProfPic}
                >
                  Upload
                </button>
              </div>
            </div>
          </div>
          <div
            className={
              !uploadpf
                ? "w-screen h-screen bg-slate-300 opacity-80 absolute top-0 hidden"
                : "w-screen h-screen bg-slate-300 opacity-0 absolute hidden md:block top-0 z-10"
            }
          ></div>

          <h1 className="text-center text-white font-semibold tracking-wider   md:text-lg lg:text-2xl">
            Good Day<br></br> Dr. {user.lastName}, {user.firstName}
          </h1>
          <ul className=" text-[#D3D3D3] w-[150px] font-semibold m-auto mt-5 tracking-widest ">
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
              className="mt-44 pb-7 hover:text-white flex cursor-pointer hover:scale-105 transition-all duration-200"
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
