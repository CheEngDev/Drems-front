import React, { useContext } from "react";
import moment from "moment/moment";
import dayjs from "dayjs";
import UserContext from "../context/userContext";
import pxListContext from "../context/pxListContext";
import appointmentContext from "../context/appointmentContext";
import hmoContext from "../context/hmoContext";
import paymentContext from "../context/paymentContext";

const Dashboard = (props) => {
  // Contexts
  const user = useContext(UserContext);
  const pxContext = useContext(pxListContext);
  const appointContext = useContext(appointmentContext);
  const appointments = appointContext.appointments;
  const hmocontext = useContext(hmoContext);
  const companies = hmocontext.companies;
  const payments = useContext(paymentContext);

  let currentdate = new Date();
  let Month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  let mindes = currentdate.getMonth();
  let month = Month[mindes];
  let day = currentdate.getDate();
  let year = currentdate.getFullYear();

  const pxs = appointments.filter(
    (appoint) =>
      dayjs(appoint.date).format("YYYY/MM/DD") === dayjs().format("YYYY/MM/DD")
  );

  const upcomming = appointments.filter(
    (appoint) =>
      moment(appoint.date).format("MMM/DD/YYYY") ===
      moment(`${month}/${day + 1}/${year}`).format(`MMM/DD/YYYY`)
  );

  const addedPx = pxContext.pxs.filter(
    (px) =>
      moment(px.date).format("MMM/YYYY/W") === moment().format("MMM/YYYY/W")
  );

  let px10am = pxs.filter((px) => px.startTime === "10:00 AM");
  let px11am = pxs.filter((px) => px.startTime === "11:00 AM");
  let px12pm = pxs.filter((px) => px.startTime === "12:00 PM");
  let px1pm = pxs.filter((px) => px.startTime === "1:00 PM");
  let px2pm = pxs.filter((px) => px.startTime === "2:00 PM");
  let px3pm = pxs.filter((px) => px.startTime === "3:00 PM");
  let px4pm = pxs.filter((px) => px.startTime === "4:00 PM");
  let px5pm = pxs.filter((px) => px.startTime === "5:00 PM");
  let px6pm = pxs.filter((px) => px.startTime === "6:00 PM");

  console.log(px11am);
  return (
    <div className="w-full bg-slate-50 ">
      {/* Mobile */}
      <div className=" h-[800px] md:hidden">
        <h1 className=" pt-12 text-xl font-bold text-center py-2">Overview</h1>
        <div className=" flex justify-evenly">
          <div className=" max-w-[170px] min-w-[150px] w-full bg-white mb-4 rounded-lg font-medium mx-1">
            <div className="p-1">
              <h2 className="text-[#A9A9A9] text-sm">Appointments</h2>
              <p className="text-sm">
                Today :
                <span className="inline-block px-1 underline text-base">
                  {pxs.length} Schedules
                </span>
              </p>
            </div>
            <div className="bg-black rounded-b-lg font-normal">
              <p className="p-1 text-sm text-white">
                Tomorrow: {upcomming.length}
              </p>
            </div>
          </div>
          <div className="max-w-[170px] min-w-[150px] w-full bg-white mb-4 rounded-lg font-medium mx-1">
            <div className="p-1">
              <h2 className="text-[#A9A9A9] text-sm">Patients</h2>
              <p className="text-sm">
                Total :
                <span className="inline-block  px-1 underline text-base ">
                  {pxContext.pxs.length} Patients
                </span>
              </p>
            </div>
            <div className="bg-black rounded-b-lg font-normal">
              <p className="p-1 text-sm text-white">
                Weekly added: {addedPx.length}
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-evenly">
          <div className="max-w-[170px] min-w-[150px] w-full bg-white rounded-lg font-medium mx-1">
            <div className=" p-1">
              <h2 className="text-[#A9A9A9]">Revenue</h2>
              <p>
                Today :
                <span className=" inline-block px-1 underline text-base ">
                  Php 10,000
                </span>
              </p>
            </div>
            <div className="bg-black rounded-b-lg font-normal">
              <p className="p-1 text-sm text-white">Weekly Revenue:</p>
            </div>
          </div>
          <div className="max-w-[170px] min-w-[150px] w-full bg-white rounded-lg font-medium mx-1">
            <div className=" p-1">
              <h2 className="text-[#A9A9A9]">Accredited HMO's</h2>
              <p>
                Total :
                <span className="inline-block px-1 underline text-base">
                  {companies.length} HMO's
                </span>
              </p>
            </div>
            <div className="bg-black rounded-b-lg font-normal">
              <p className="p-1 text-sm text-white">Weekly added:</p>
            </div>
          </div>
        </div>
        <div className="w-full mt-9  bg-white max-w-[450px] m-auto min-w-[250px] rounded-xl overflow-y-auto">
          <h1 className="text-lg font-medium p-2">{`${month} ${day}, ${year} Appointments`}</h1>
          {/* Hours */}
          <div className="border-2 ">
            {/* 10am */}
            <div>
              <h2 className="text-center bg-slate-200 font-bold text-sm tracking-widest">
                10:00 AM
              </h2>
              {px10am[0] ? (
                <div className="flex justify-evenly">
                  <div className="">
                    <div>
                      <h3 className="font-semibold text-sm">Patient</h3>
                      <p>{`${px10am[0].patient.lastName}, ${px10am[0].patient.firstName}`}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm ">Age</h3>
                      <p className="">{`${px10am[0].patient.age}`}</p>
                    </div>
                  </div>
                  <div className="">
                    <div>
                      <h3 className="font-semibold text-sm">Dentist</h3>
                      <p className="text-center">{`Dr. ${px10am[0].dentistOD.lastName}`}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">Procedure</h3>
                      <p>{`${px10am[0].procedure.name}`}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <h2 className="text-center">No Schedule</h2>
              )}
            </div>
            {/* 11am */}
            <div>
              <h2 className="text-center bg-slate-200 font-bold text-sm tracking-widest">
                11:00 AM
              </h2>
              {px11am[0] ? (
                <div className="flex justify-evenly md:px-2 lg:px-7 ">
                  <div>
                    <div>
                      <h3 className="font-semibold text-sm">Patient</h3>
                      <p>{`${px11am[0].patient.lastName}, ${px11am[0].patient.firstName}`}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">Age</h3>
                      <p className="">{`${px11am[0].patient.age}`}</p>
                    </div>
                  </div>
                  <div>
                    <div>
                      <h3 className="font-semibold text-sm">Dentist</h3>
                      <p className="">{`Dr. ${px11am[0].dentistOD.lastName}`}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">Procedure</h3>
                      <p>{`${px11am[0].procedure.name}`}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <h2 className="text-center">No Schedule</h2>
              )}
            </div>
            {/* 12nn */}
            <div>
              <h2 className="text-center bg-slate-200 font-bold text-sm tracking-widest">
                12:00 PM
              </h2>
              <h3 className="text-center tracking-widest text-sm">
                -- LUNCH BREAK --
              </h3>
            </div>
            {/* 1pm */}
            <div>
              <h2 className="text-center bg-slate-200 font-bold text-sm tracking-widest">
                1:00 PM
              </h2>
              {px1pm[0] ? (
                <div className="flex justify-evenly md:px-2 lg:px-7">
                  <div>
                    <div>
                      <h3 className="font-semibold text-sm">Patient</h3>
                      <p>{`${px1pm[0].patient.lastName}, ${px1pm[0].patient.firstName}`}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">Age</h3>
                      <p className="">{`${px1pm[0].patient.age}`}</p>
                    </div>
                  </div>
                  <div>
                    <div>
                      <h3 className="font-semibold text-sm">Dentist</h3>
                      <p className="text-center">{`Dr. ${px1pm[0].dentistOD.lastName}`}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">Procedure</h3>
                      <p>{`${px1pm[0].procedure.name}`}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <h2 className="text-center">No Schedule</h2>
              )}
            </div>
            {/* 2pm */}
            <div>
              <h2 className="text-center bg-slate-200 font-bold text-sm tracking-widest">
                2:00 PM
              </h2>
              {px2pm[0] ? (
                <div className="flex justify-evenly md:px-2 lg:px-7">
                  <div>
                    <div>
                      <h3 className="font-semibold text-sm">Patient</h3>
                      <p>{`${px2pm[0].patient.lastName}, ${px2pm[0].patient.firstName}`}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">Age</h3>
                      <p className="">{`${px2pm[0].patient.age}`}</p>
                    </div>
                  </div>
                  <div>
                    <div>
                      <h3 className="font-semibold text-sm">Dentist</h3>
                      <p className="text-center">{`Dr. ${px2pm[0].dentistOD.lastName}`}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">Procedure</h3>
                      <p>{`${px2pm[0].procedure.name}`}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <h2 className="text-center">No Schedule</h2>
              )}
            </div>
            {/* 3pm */}
            <div>
              <h2 className="text-center bg-slate-200 font-bold text-sm tracking-widest">
                3:00 PM
              </h2>
              {px3pm[0] ? (
                <div className="flex justify-evenly md:px-2 lg:px-7">
                  <div>
                    <div>
                      <h3 className="font-semibold text-sm">Patient</h3>
                      <p>{`${px3pm[0].patient.lastName}, ${px3pm[0].patient.firstName}`}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">Age</h3>
                      <p className="">{`${px3pm[0].patient.age}`}</p>
                    </div>
                  </div>
                  <div>
                    <div>
                      <h3 className="font-semibold text-sm">Dentist</h3>
                      <p className="text-center">{`Dr. ${px3pm[0].dentistOD.lastName}`}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">Procedure</h3>
                      <p>{`${px3pm[0].procedure.name}`}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <h2 className="text-center">No Schedule</h2>
              )}
            </div>
            {/* 4pm */}
            <div>
              <h2 className="text-center bg-slate-200 font-bold text-sm tracking-widest">
                4:00 PM
              </h2>
              {px4pm[0] ? (
                <div className="flex justify-evenly md:px-2 lg:px-7">
                  <div>
                    <div>
                      <h3 className="font-semibold text-sm">Patient</h3>
                      <p>{`${px4pm[0].patient.lastName}, ${px4pm[0].patient.firstName}`}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">Age</h3>
                      <p className="">{`${px4pm[0].patient.age}`}</p>
                    </div>
                  </div>
                  <div>
                    <div>
                      <h3 className="font-semibold text-sm">Dentist</h3>
                      <p className="text-center">{`${px4pm[0].dentistOD.lastName}`}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">Procedure</h3>
                      <p>{`${px4pm[0].procedure.name}`}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <h2 className="text-center">No Schedule</h2>
              )}
            </div>
            {/* 5pm */}
            <div>
              <h2 className="text-center bg-slate-200 font-bold text-sm tracking-widest">
                5:00 PM
              </h2>
              {px5pm[0] ? (
                <div className="flex justify-evenly md:px-2 lg:px-7">
                  <div>
                    <div>
                      <h3 className="font-semibold text-sm">Patient</h3>
                      <p>{`${px5pm[0].patient.lastName}, ${px5pm[0].patient.firstName}`}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">Age</h3>
                      <p className="">{`${px5pm[0].patient.age}`}</p>
                    </div>
                  </div>
                  <div>
                    <div>
                      <h3 className="font-semibold text-sm">Dentist</h3>
                      <p className="text-center">{`Dr. ${px5pm[0].dentistOD.lastName}`}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">Procedure</h3>
                      <p>{`${px5pm[0].procedure.name}`}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <h2 className="text-center">No Schedule</h2>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Large Screens */}
      <div className=" h-screen w-full bg-slate-50  hidden md:block">
        <h1 className="text-3xl font-bold pl-5 py-2">Overview</h1>
        <div className="flex max-h-[520px] h-full pl-5">
          {/* Overview */}
          <div className="min-w-[150px] w-full text-xs md:max-w-[165px]  lg:max-w-[180px] ">
            <div className=" max-w-[180px] w-full bg-white mb-4 rounded-lg font-medium">
              <div className="p-3">
                <h2 className="text-[#A9A9A9]">Appointments</h2>
                <p>
                  Today :
                  <span className="inline-block px-1 underline text-base">
                    {pxs.length} Schedules
                  </span>
                </p>
              </div>
              <div className="bg-[#0099ff] rounded-b-lg font-normal">
                <p className="p-1 text-sm">Tomorrow: {upcomming.length}</p>
              </div>
            </div>

            <div className="max-w-[180px] w-full bg-white my-4 rounded-lg font-medium">
              <div className="p-3">
                <h2 className="text-[#A9A9A9] ">Patients</h2>
                <p>
                  Total :
                  <span className="inline-block  px-1 underline text-base ">
                    {pxContext.pxs.length} Patients
                  </span>
                </p>
              </div>
              <div className="bg-[#0099ff] rounded-b-lg font-normal">
                <p className="p-1 text-sm">Weekly added: {addedPx.length}</p>
              </div>
            </div>
            <div className="max-w-[180px] w-full bg-white my-4 rounded-lg font-medium">
              <div className=" p-3">
                <h2 className="text-[#A9A9A9]">Revenue</h2>
                <p>
                  Today :
                  <span className=" inline-block px-1 underline text-base ">
                    Php 10,000
                  </span>
                </p>
              </div>
              <div className="bg-[#0099ff] rounded-b-lg font-normal">
                <p className="p-1 text-sm">Weekly Revenue:</p>
              </div>
            </div>
            <div className="max-w-[180px] w-full bg-white mt-4 rounded-lg font-medium">
              <div className=" p-3">
                <h2 className="text-[#A9A9A9]">Accredited HMO's</h2>
                <p>
                  Total :
                  <span className="inline-block px-1 underline text-base">
                    {companies.length} Companies
                  </span>
                </p>
              </div>
              <div className="bg-[#0099ff] rounded-b-lg font-normal">
                <p className="p-1 text-sm">Weekly added:</p>
              </div>
            </div>
          </div>
          {/* Schedule for today */}
          <div className="w-full mx-4 mb-4  max-w-[700px] min-w-[330px] rounded-xl overflow-y-auto">
            <div className="bg-white rounded-2xl">
              <h1 className="text-lg font-medium p-2">{`${month} ${day}, ${year} Appointments`}</h1>
              {/* Hours */}
              <div className="border-2 "></div>

              {/* 10am */}
              <div>
                <h2 className="text-center bg-slate-200 font-bold text-sm tracking-widest">
                  10:00 AM
                </h2>
                {px10am[0] ? (
                  <div className="flex justify-between md:px-2 lg:px-7 ">
                    <div>
                      <h3 className="font-semibold text-sm">Patient</h3>
                      <p>{`${px10am[0].patient.lastName}, ${px10am[0].patient.firstName}`}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">Age</h3>
                      <p className="text-center">{`${px10am[0].patient.age}`}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">Dentist</h3>
                      <p className="text-center">{`Dr. ${px10am[0].dentistOD.lastName}`}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">Procedure</h3>
                      <p>{`${px10am[0].procedure.name}`}</p>
                    </div>
                  </div>
                ) : (
                  <h2 className="text-center">No Schedule</h2>
                )}
              </div>
              {/* 11am */}
              <div>
                <h2 className="text-center bg-slate-200 font-bold text-sm tracking-widest">
                  11:00 AM
                </h2>
                {px11am[0] ? (
                  <div className="flex justify-between md:px-2 lg:px-7 ">
                    <div>
                      <h3 className="font-semibold text-sm">Patient</h3>
                      <p>{`${px11am[0].patient.lastName}, ${px11am[0].patient.firstName}`}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">Age</h3>
                      <p className="text-center">{`${px11am[0].patient.age}`}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">Dentist</h3>
                      <p className="text-center">{`Dr. ${px11am[0].dentistOD.lastName}`}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">Procedure</h3>
                      <p>{`${px11am[0].procedure.name}`}</p>
                    </div>
                  </div>
                ) : (
                  <h2 className="text-center">No Schedule</h2>
                )}
              </div>
              {/* 12nn */}
              <div>
                <h2 className="text-center bg-slate-200 font-bold text-sm tracking-widest">
                  12:00 PM
                </h2>
                <h3 className="text-center tracking-widest text-sm">
                  -- LUNCH BREAK --
                </h3>
              </div>
              {/* 1pm */}
              <div>
                <h2 className="text-center bg-slate-200 font-bold text-sm tracking-widest">
                  1:00 PM
                </h2>
                {px1pm[0] ? (
                  <div className="flex justify-between md:px-2 lg:px-7">
                    <div>
                      <h3 className="font-semibold text-sm">Patient</h3>
                      <p>{`${px1pm[0].patient.lastName}, ${px1pm[0].patient.firstName}`}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">Age</h3>
                      <p className="text-center">{`${px1pm[0].patient.age}`}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">Dentist</h3>
                      <p className="text-center">{`Dr. ${px1pm[0].dentistOD.lastName}`}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">Procedure</h3>
                      <p>{`${px1pm[0].procedure.name}`}</p>
                    </div>
                  </div>
                ) : (
                  <h2 className="text-center">No Schedule</h2>
                )}
              </div>
              {/* 2pm */}
              <div>
                <h2 className="text-center bg-slate-200 font-bold text-sm tracking-widest">
                  2:00 PM
                </h2>
                {px2pm[0] ? (
                  <div className="flex justify-between md:px-2 lg:px-7">
                    <div>
                      <h3 className="font-semibold text-sm">Patient</h3>
                      <p>{`${px2pm[0].patient.lastName}, ${px2pm[0].patient.firstName}`}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">Age</h3>
                      <p className="text-center">{`${px2pm[0].patient.age}`}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">Dentist</h3>
                      <p className="text-center">{`Dr. ${px2pm[0].dentistOD.lastName}`}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">Procedure</h3>
                      <p>{`${px2pm[0].procedure.name}`}</p>
                    </div>
                  </div>
                ) : (
                  <h2 className="text-center">No Schedule</h2>
                )}
              </div>
              {/* 3pm */}
              <div>
                <h2 className="text-center bg-slate-200 font-bold text-sm tracking-widest">
                  3:00 PM
                </h2>
                {px3pm[0] ? (
                  <div className="flex justify-between md:px-2 lg:px-7">
                    <div>
                      <h3 className="font-semibold text-sm">Patient</h3>
                      <p>{`${px3pm[0].patient.lastName}, ${px3pm[0].patient.firstName}`}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">Age</h3>
                      <p className="text-center">{`${px3pm[0].patient.age}`}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">Dentist</h3>
                      <p className="text-center">{`Dr. ${px3pm[0].dentistOD.lastName}`}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">Procedure</h3>
                      <p>{`${px3pm[0].procedure.name}`}</p>
                    </div>
                  </div>
                ) : (
                  <h2 className="text-center">No Schedule</h2>
                )}
              </div>
              {/* 4pm */}
              <div>
                <h2 className="text-center bg-slate-200 font-bold text-sm tracking-widest">
                  4:00 PM
                </h2>
                {px4pm[0] ? (
                  <div className="flex justify-between md:px-2 lg:px-7">
                    <div>
                      <h3 className="font-semibold text-sm">Patient</h3>
                      <p>{`${px4pm[0].patient.lastName}, ${px4pm[0].patient.firstName}`}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">Age</h3>
                      <p className="text-center">{`${px4pm[0].patient.age}`}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">Dentist</h3>
                      <p className="text-center">{`${px4pm[0].dentistOD.lastName}`}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">Procedure</h3>
                      <p>{`${px4pm[0].procedure.name}`}</p>
                    </div>
                  </div>
                ) : (
                  <h2 className="text-center">No Schedule</h2>
                )}
              </div>
              {/* 5pm */}
              <div>
                <h2 className="text-center bg-slate-200 font-bold text-sm tracking-widest">
                  5:00 PM
                </h2>
                {px5pm[0] ? (
                  <div className="flex justify-between md:px-2 lg:px-7">
                    <div>
                      <h3 className="font-semibold text-sm">Patient</h3>
                      <p>{`${px5pm[0].patient.lastName}, ${px5pm[0].patient.firstName}`}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">Age</h3>
                      <p className="text-center">{`${px5pm[0].patient.age}`}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">Dentist</h3>
                      <p className="text-center">{`Dr. ${px5pm[0].dentistOD.lastName}`}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">Procedure</h3>
                      <p>{`${px5pm[0].procedure.name}`}</p>
                    </div>
                  </div>
                ) : (
                  <h2 className="text-center">No Schedule</h2>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
