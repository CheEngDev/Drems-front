import React from "react";
import { IoMdClipboard } from "react-icons/io";
import { HiPhoto } from "react-icons/hi2";
import { MdPayments } from "react-icons/md";
import { BsFillCalendarCheckFill, BsBarChartSteps } from "react-icons/bs";
import { GiMoneyStack } from "react-icons/gi";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { FaFilePrescription } from "react-icons/fa";

const Features = () => {
  return (
    <div>
      {/* LARGE SCREEN */}
      <div className="pt-16 hidden sm:block" id="features">
        <h1 className="text-center text-5xl font-medium tracking-widest text-[#2c3e50] cursor-pointer">
          DREMS Features
        </h1>
        <p className="text-center pt-2 px-3 text-[21px] tracking-wider text-[#7b8087] lg:px-48">
          Drems has been designed to be user-friendly so that you can get
          started in just a few minutes. We have incorporated the essential
          features that you require.
        </p>
        <div className="flex">
          <div className="flex p-5 pt-14 pl-11 w-1/2">
            <div>
              <span className="w-[75px] h-[75px] bg-[#0099ff] rounded-full flex justify-center items-center">
                <IoMdClipboard size={50} fill="white" />
              </span>
            </div>
            <div className="pt-1 px-5 pb-2">
              <h1 className="text-[20px] font-medium text-[#2c3e50]">
                PATIENT INFORMATION
              </h1>
              <p className="md:text-[20px]">
                Keep tract of your patients records
              </p>
            </div>
          </div>
          <div className="flex p-5 pt-14 pl-8 w-1/2">
            <div>
              <span className="w-[75px] h-[75px] bg-[#0099ff] rounded-full flex justify-center items-center">
                <HiPhoto size={50} fill="white" />
              </span>
            </div>
            <div className="pt-1 px-5 pb-2">
              <h1 className="text-[20px] font-medium text-[#2c3e50]">
                ATTACH IMAGE
              </h1>
              <p className="md:text-[20px]">
                Attach important images of your patient
              </p>
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="flex p-5 pl-11 w-1/2">
            <div>
              <span className="w-[75px] h-[75px] bg-[#0099ff] rounded-full flex justify-center items-center">
                <MdPayments size={50} fill="white" />
              </span>
            </div>
            <div className="pt-1 px-5 pb-2">
              <h1 className="text-[20px] font-medium text-[#2c3e50]">
                PAYMENT TRANSACTIONS
              </h1>
              <p className="md:text-[20px]">
                Keep tract of your patient's payments
              </p>
            </div>
          </div>
          <div className="flex p-5 pl-8 w-1/2">
            <div>
              <span className="w-[75px] h-[75px] bg-[#0099ff] rounded-full flex justify-center items-center">
                <BsFillCalendarCheckFill size={40} fill="white" />
              </span>
            </div>
            <div className="pt-1 px-5 pb-2">
              <h1 className="text-[20px] font-medium text-[#2c3e50]">
                APPOINTMENTS
              </h1>
              <p className="md:text-[20px]">Keep tract of your appointments</p>
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="flex p-5 pl-11 w-1/2">
            <div>
              <span className="w-[75px] h-[75px] bg-[#0099ff] rounded-full flex justify-center items-center">
                <BsBarChartSteps size={40} fill="white" />
              </span>
            </div>
            <div className="pt-1 px-5 pb-2">
              <h1 className="text-[20px] font-medium text-[#2c3e50]">CHARTS</h1>
              <p className="md:text-[20px]">Charting made easy</p>
            </div>
          </div>
          <div className="flex p-5 pl-8 w-1/2">
            <div>
              <span className="w-[75px] h-[75px] bg-[#0099ff] rounded-full flex justify-center items-center">
                <GiMoneyStack size={50} fill="white" />
              </span>
            </div>
            <div className="pt-1 px-5 pb-2">
              <h1 className="text-[20px] font-medium text-[#2c3e50]">
                EXPENSES MONITORING
              </h1>
              <p className="md:text-[20px]">Keep tract of your finances</p>
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="flex p-5 pl-11 w-1/2">
            <div>
              <span className="w-[75px] h-[75px] bg-[#0099ff] rounded-full flex justify-center items-center">
                <AiOutlineUsergroupAdd size={50} fill="white" />
              </span>
            </div>
            <div className="pt-1 px-5 pb-2 w-1/2">
              <h1 className="text-[20px] font-medium text-[#2c3e50]">
                MULTI DENTIST
              </h1>
              <p className="md:text-[20px]">Add up to several dentists</p>
            </div>
          </div>
          <div className="flex p-5 pl-8 w-1/2">
            <div>
              <span className="w-[75px] h-[75px] bg-[#0099ff] rounded-full flex justify-center items-center">
                <FaFilePrescription size={40} fill="white" />
              </span>
            </div>
            <div className="pt-1 px-5 pb-2">
              <h1 className="text-[20px] font-medium text-[#2c3e50]">
                PRESCRIPTION PLAN
              </h1>
              <p className="md:text-[20px]">
                Create a prescription plan for your patients
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE */}
      <div className="pt-16 sm:hidden" id="featuresmb">
        <h1 className="text-center text-3xl font-medium tracking-widest text-[#2c3e50] cursor-pointer">
          DREMS Features
        </h1>
        <p className="text-center pt-2 px-3 text-[18px] tracking-wider text-[#7b8087]">
          Drems has been designed to be user-friendly so that you can get
          started in just a few minutes. We have incorporated the essential
          features that you require.
        </p>
        <div className="flex-col max-w-xl justify-center content-center">
          <div className="flex p-5 pt-14 pl-8">
            <div>
              <span className="w-[75px] h-[75px] bg-[#0099ff] rounded-full flex justify-center items-center">
                <IoMdClipboard size={50} fill="white" />
              </span>
            </div>
            <div className="pt-1 px-5 pb-2">
              <h1 className="text-[20px] font-medium text-[#2c3e50]">
                PATIENT INFORMATION
              </h1>
              <p>Keep tract of your patients records</p>
            </div>
          </div>
          <div className="flex p-5 pl-8">
            <div>
              <span className="w-[75px] h-[75px] bg-[#0099ff] rounded-full flex justify-center items-center">
                <HiPhoto size={50} fill="white" />
              </span>
            </div>
            <div className="pt-1 px-5 pb-2">
              <h1 className="text-[20px] font-medium text-[#2c3e50]">
                ATTACH IMAGE
              </h1>
              <p>Attach important images of your patient</p>
            </div>
          </div>
          <div className="flex p-5 pl-8">
            <div>
              <span className="w-[75px] h-[75px] bg-[#0099ff] rounded-full flex justify-center items-center">
                <MdPayments size={50} fill="white" />
              </span>
            </div>
            <div className="pt-1 px-5 pb-2">
              <h1 className="text-[20px] font-medium text-[#2c3e50]">
                PAYMENT TRANSACTIONS
              </h1>
              <p>Keep tract of your patient's payments</p>
            </div>
          </div>
          <div className="flex p-5 pl-8">
            <div>
              <span className="w-[75px] h-[75px] bg-[#0099ff] rounded-full flex justify-center items-center">
                <BsFillCalendarCheckFill size={40} fill="white" />
              </span>
            </div>
            <div className="pt-1 px-5 pb-2">
              <h1 className="text-[20px] font-medium text-[#2c3e50]">
                APPOINTMENTS
              </h1>
              <p>Keep tract of your appointments</p>
            </div>
          </div>
          <div className="flex p-5 pl-8">
            <div>
              <span className="w-[75px] h-[75px] bg-[#0099ff] rounded-full flex justify-center items-center">
                <BsBarChartSteps size={40} fill="white" />
              </span>
            </div>
            <div className="pt-1 px-5 pb-2">
              <h1 className="text-[20px] font-medium text-[#2c3e50]">CHARTS</h1>
              <p>Charting made easy</p>
            </div>
          </div>
          <div className="flex p-5 pl-8">
            <div>
              <span className="w-[75px] h-[75px] bg-[#0099ff] rounded-full flex justify-center items-center">
                <GiMoneyStack size={50} fill="white" />
              </span>
            </div>
            <div className="pt-1 px-5 pb-2">
              <h1 className="text-[20px] font-medium text-[#2c3e50]">
                EXPENSES MONITORING
              </h1>
              <p>Keep tract of your finances</p>
            </div>
          </div>
          <div className="flex p-5 pl-8">
            <div>
              <span className="w-[75px] h-[75px] bg-[#0099ff] rounded-full flex justify-center items-center">
                <AiOutlineUsergroupAdd size={50} fill="white" />
              </span>
            </div>
            <div className="pt-1 px-5 pb-2">
              <h1 className="text-[20px] font-medium text-[#2c3e50]">
                MULTI DENTIST
              </h1>
              <p>
                Add up to several dentist and keep tract on their
                appointments,patients and progress
              </p>
            </div>
          </div>
          <div className="flex p-5 pl-8">
            <div>
              <span className="w-[75px] h-[75px] bg-[#0099ff] rounded-full flex justify-center items-center">
                <FaFilePrescription size={40} fill="white" />
              </span>
            </div>
            <div className="pt-1 px-5 pb-2">
              <h1 className="text-[20px] font-medium text-[#2c3e50]">
                PRESCRIPTION PLAN
              </h1>
              <p>Create a prescription plan for your patients</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
