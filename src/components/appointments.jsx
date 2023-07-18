import React, { useState, useContext, useEffect } from "react";
import { generateDate, months } from "./utils/calendar";
import cn from "./utils/cn";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlineClose, AiFillCaretDown } from "react-icons/ai";
import avatar from "../assets/avatar.png";
import Avatar from "./common/avatar";
import DentistList from "./common/dentistlistpopup";
import ProcedureList from "./common/procedurespopup";
import PatientList from "./common/pxlistpopup";
import appointmentContext from "../context/appointmentContext";
import UserContext from "../context/userContext";
import procedureContext from "../context/procedureContext";
import pxListContext from "../context/pxListContext";
import assocDentContext from "../context/assocDentContext";
import pxpicContext from "../context/pxpicContext";
import Joi from "joi";
import dayjs from "dayjs";

export default function Appointments(props) {
  // Contexts
  const appointContext = useContext(appointmentContext);
  const appointment = appointContext.appointments;
  const userContext = useContext(UserContext);
  const pxContext = useContext(pxListContext);
  const pxs = pxContext.pxs;
  const proceduresContext = useContext(procedureContext);
  const procedures = proceduresContext.procedures;
  const assocContext = useContext(assocDentContext);
  const dentists = assocContext.associate;
  const pxpiccontext = useContext(pxpicContext);
  const pxpic = pxpiccontext.pxPics;

  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [selectDate, setSelectDate] = useState(currentDate);

  // Scheduled
  // const [appointment, setAppointments] = useState([
  //   {
  //     id: "1",
  //     patient: {
  //       id: "1",
  //       firstName: "Joyce",
  //       lastName: "Almendarez",
  //       img: avatar,
  //     },
  //     date: "2023-06-05",
  //     startTime: "1:00PM",
  //     dentistOD: { id: "1", firstName: "Remelyn", lastName: "Rinon" },
  //     procedure: { id: "1", name: "Tooth Filling" },
  //   },
  //   {
  //     id: "2",
  //     patient: {
  //       id: "3",
  //       firstName: "Alexandria",
  //       lastName: "Simon",
  //       img: avatar,
  //     },
  //     date: "2023-06-05",
  //     startTime: "2:00PM",
  //     dentistOD: { id: "1", firstName: "Remelyn", lastName: "Rinon" },
  //     procedure: { id: "1", name: "Tooth Filling" },
  //   },
  //   {
  //     id: "3",
  //     patient: { id: "2", firstName: "Verity", lastName: "Garza", img: avatar },
  //     date: "2023-06-11",
  //     startTime: "10:00AM",
  //     dentistOD: { id: "1", firstName: "Remelyn", lastName: "Rinon" },
  //     procedure: { id: "1", name: "Tooth Filling" },
  //   },
  //   {
  //     id: "4",
  //     patient: {
  //       id: "1",
  //       firstName: "Joyce",
  //       lastName: "Almendarez",
  //       img: avatar,
  //     },
  //     date: "2023-06-21",
  //     startTime: "10:00AM",
  //     dentistOD: { id: "1", firstName: "Remelyn", lastName: "Rinon" },
  //     procedure: { id: "1", name: "Tooth Filling" },
  //   },
  //   {
  //     id: "5",
  //     patient: { id: "4", firstName: "Bruno", lastName: "Graves", img: avatar },
  //     date: "2023-06-14",
  //     startTime: "10:00AM",
  //     dentistOD: { id: "1", firstName: "Remelyn", lastName: "Rinon" },
  //     procedure: { id: "1", name: "Tooth Filling" },
  //   },
  //   {
  //     id: "6",
  //     patient: {
  //       id: "1",
  //       firstName: "Joyce",
  //       lastName: "Almendarez",
  //       img: avatar,
  //     },
  //     date: "2023-06-06",
  //     startTime: "5:00PM",
  //     dentistOD: { id: "1", firstName: "Remelyn", lastName: "Rinon" },
  //     procedure: { id: "1", name: "Tooth Filling" },
  //   },
  //   {
  //     id: "7",
  //     patient: {
  //       id: "1",
  //       firstName: "Joyce",
  //       lastName: "Almendarez",
  //       img: avatar,
  //     },
  //     date: "2023-07-01",
  //     startTime: "10:00AM",
  //     dentistOD: { id: "1", firstName: "Remelyn", lastName: "Rinon" },
  //     procedure: { id: "1", name: "Tooth Filling" },
  //   },
  //   {
  //     id: "8",
  //     patient: { id: "2", firstName: "Verity", lastName: "Garza", img: avatar },
  //     date: "2023-07-05",
  //     startTime: "11:00AM",
  //     dentistOD: { id: "1", firstName: "Remelyn", lastName: "Rinon" },
  //     procedure: { id: "1", name: "Tooth Filling" },
  //   },
  //   {
  //     id: "9",
  //     patient: { id: "2", firstName: "Verity", lastName: "Garza", img: avatar },
  //     date: "2023-06-05",
  //     startTime: "10:00AM",
  //     dentistOD: { id: "1", firstName: "Remelyn", lastName: "Rinon" },
  //     procedure: { id: "1", name: "Tooth Filling" },
  //   },
  //   {
  //     id: "10",
  //     patient: { id: "2", firstName: "Verity", lastName: "Garza", img: avatar },
  //     date: "2023-06-05",
  //     startTime: "10:00AM",
  //     dentistOD: { id: "1", firstName: "Remelyn", lastName: "Rinon" },
  //     procedure: { id: "1", name: "Tooth Filling" },
  //   },
  //   {
  //     id: "11",
  //     patient: { id: "2", firstName: "Verity", lastName: "Garza", img: avatar },
  //     date: "2023-06-05",
  //     startTime: "3:00PM",
  //     dentistOD: { id: "1", firstName: "Remelyn", lastName: "Rinon" },
  //     procedure: { id: "1", name: "Tooth Filling" },
  //   },
  // ]);
  const [scheduled, setScheduled] = useState([]);
  const [appointmentData, setAppoinmentData] = useState({
    _id: "",
    patient: "",
    date: "",
    startTime: "",
    dentistOD: "",
    procedure: "",
    dentist: "",
    remarks: "",
    completed: "",
  });

  // Px Pic
  function handlePxPic(id) {
    const pxprofpic = pxpic.filter((p) => p.pfpowner === id);

    if (pxprofpic[0]) {
      return pxprofpic[0].profpicUrl;
    } else {
      return avatar;
    }
  }

  // Procedures
  // const [procedures] = useState([
  //   { id: 1, name: "Teeth cleaning", amount: 500 },
  //   { id: 2, name: "Teeth Whitening", amount: 500 },
  //   { id: 3, name: "Dental restoration", amount: 500 },
  //   { id: 4, name: "Dental Extraction", amount: 500 },
  //   { id: 5, name: "Dental braces", amount: 500 },
  //   { id: 6, name: "Bridge", amount: 500 },
  //   { id: 7, name: "Dentures", amount: 500 },
  //   { id: 8, name: "Dental sealant", amount: 500 },
  //   { id: 9, name: "Veneer", amount: 500 },
  //   { id: 10, name: "Dental bonding", amount: 500 },
  //   { id: 11, name: "Root canal", amount: 500 },
  //   { id: 12, name: "Gingival graft", amount: 500 },
  //   { id: 13, name: "Dental implant", amount: 500 },
  // ]);
  // Patients
  // const [pxs, setPxs] = useState([
  //   {
  //     id: 1,
  //     firstName: "Joyce",
  //     lastName: "Almendarez",
  //     age: 25,
  //     sex: "Male",
  //     number: "09750744869",
  //     lastVisit: "05/11/2023",
  //     img: avatar,
  //   },
  //   {
  //     id: 2,
  //     firstName: "Verity",
  //     lastName: "Garza",
  //     age: 39,
  //     sex: "Male",
  //     number: "09750727748",
  //     lastVisit: "05/08/2023",
  //     img: avatar,
  //   },
  //   {
  //     id: 3,
  //     firstName: "Alexandria",
  //     lastName: "Simon",
  //     age: 26,
  //     sex: "Male",
  //     number: "09750727756",
  //     lastVisit: "05/07/2023",
  //     img: avatar,
  //   },
  //   {
  //     id: 4,
  //     firstName: "Bruno",
  //     lastName: "Graves",
  //     age: 27,
  //     sex: "Male",
  //     number: "09952502100",
  //     lastVisit: "02/20/2023",
  //     img: avatar,
  //   },
  //   {
  //     id: 5,
  //     firstName: "Farhan",
  //     lastName: "Hill",
  //     age: 7,
  //     sex: "Female",
  //     number: "09952501985",
  //     lastVisit: "04/23/2023",
  //     img: avatar,
  //   },
  //   {
  //     id: 6,
  //     firstName: "Nora",
  //     lastName: "Klein",
  //     age: 19,
  //     sex: "Female",
  //     number: "09952502098",
  //     lastVisit: "05/03/2023",
  //     img: avatar,
  //   },
  //   {
  //     id: 7,
  //     firstName: "Haider",
  //     lastName: "Norton",
  //     age: 35,
  //     sex: "Male",
  //     number: "09952501902",
  //     lastVisit: "05/11/2023",
  //     img: avatar,
  //   },
  //   {
  //     id: 8,
  //     firstName: "Jan",
  //     lastName: "Klein",
  //     age: 55,
  //     sex: "Male",
  //     number: "09952501948",
  //     lastVisit: "01/10/2023",
  //     img: avatar,
  //   },
  //   {
  //     id: 9,
  //     firstName: "Tamara",
  //     lastName: "Knight",
  //     age: 61,
  //     sex: "Male",
  //     number: "09952501900",
  //     lastVisit: "02/27/2023",
  //     img: avatar,
  //   },
  //   {
  //     id: 10,
  //     firstName: "Amelia",
  //     lastName: "Mcleod",
  //     age: 11,
  //     sex: "Female",
  //     number: "09078908630",
  //     lastVisit: "04/23/2023",
  //     img: avatar,
  //   },
  //   {
  //     id: 11,
  //     firstName: "Janice",
  //     lastName: "Ang",
  //     age: 11,
  //     sex: "Female",
  //     number: "09353018829",
  //     lastVisit: "05/02/2023",
  //     img: avatar,
  //   },
  //   {
  //     id: 12,
  //     firstName: "Martha",
  //     lastName: "Wheeler",
  //     age: 11,
  //     sex: "Female",
  //     number: "09353018830",
  //     lastVisit: "05/01/2023",
  //     img: avatar,
  //   },
  //   {
  //     id: 13,
  //     firstName: "Nathanael",
  //     lastName: "Nathanael",
  //     age: 11,
  //     sex: "Female",
  //     number: "09750744817",
  //     lastVisit: "04/11/2023",
  //     img: avatar,
  //   },
  // ]);
  // Pop Up for dets/delete
  const [viewdetsPopup, setviewdetsPupup] = useState({});
  // Add Appointment
  const [addAppointPopup, setAddPopup] = useState(false);
  const [existingPx, setExistingPx] = useState(false);
  // View/Edit Appointment Pop up
  const [vieworEdit, setVieworEdit] = useState(false);
  // Selected Pop up Add new one or View/Edit old one
  const [selectedPopup, setSelectedpopup] = useState();
  // Dentist List Pop up
  const [dentistList, setDentistList] = useState(false);
  // Procedure List Pop up
  const [procedureList, setProcedureList] = useState(false);
  // Patient List Pop up
  const [pxList, setPxList] = useState(false);

  // Errors
  const [errors, setErrors] = useState({});
  // Filtering By Date
  function returnSchedules(date) {
    const appointmentToday = appointment.filter(
      (appoint) =>
        dayjs(appoint.date).format("YYYY/MM/DD") === date.format("YYYY/MM/DD")
    );

    setScheduled(appointmentToday);

    setSelectDate(date);
  }

  let px10am = scheduled.filter((px) => px.startTime === "10:00 AM");
  let px11am = scheduled.filter((px) => px.startTime === "11:00 AM");
  let px12pm = scheduled.filter((px) => px.startTime === "12:00 PM");
  let px1pm = scheduled.filter((px) => px.startTime === "1:00 PM");
  let px2pm = scheduled.filter((px) => px.startTime === "2:00 PM");
  let px3pm = scheduled.filter((px) => px.startTime === "3:00 PM");
  let px4pm = scheduled.filter((px) => px.startTime === "4:00 PM");
  let px5pm = scheduled.filter((px) => px.startTime === "5:00 PM");
  let px6pm = scheduled.filter((px) => px.startTime === "6:00 PM");
  console.log(pxpic);
  console.log(px10am);
  const scheds = [
    ...px10am,
    ...px11am,
    ...px12pm,
    ...px1pm,
    ...px2pm,
    ...px3pm,
    ...px4pm,
    ...px5pm,
    ...px6pm,
  ];

  // Popup for delete/edit
  function viewDetsPopup(appoint) {
    const sched = scheds.find((e) => e._id === appoint._id);
    setviewdetsPupup(sched);
    setErrors({});
  }

  function removeDetsPopup() {
    setviewdetsPupup({});
  }

  // Pop up for add Appointment / Add appointment
  function handledAddpopUp() {
    setAddPopup(!addAppointPopup);
    setExistingPx(false);
    setAppoinmentData({
      _id: "",
      patient: "",
      date: "",
      startTime: "",
      dentistOD: "",
      procedure: "",
      dentist: "",
      remarks: "",
      completed: "",
    });
    setSelectedpopup("add");
    setErrors({});
  }

  function handlecloseAddpopUp() {
    setAddPopup(false);
  }

  function handleExistingPx() {
    setExistingPx(!existingPx);
  }

  async function handleAddAppoint(e) {
    e.preventDefault();
    const errors = validateAppointment();

    setErrors(errors || {});
    if (errors) return;
    let appoint = appointmentData;
    appoint.date = dayjs(appoint.date).format("YYYY/MM/DD");
    appoint.patient = appointmentData.patient._id;
    appoint.dentistOD = appointmentData.dentistOD._id;
    appoint.procedure = appointmentData.procedure._id;
    const result = await appointContext.addAppointment(appoint);
    console.log(result);
    if (appoint.date === dayjs().format("YYYY/MM/DD")) {
      setScheduled((oldArray) => [...oldArray, result[0]]);
    }

    // console.log(result[0]);
    // console.log(scheduled);
    setAddPopup(!addAppointPopup);
  }

  // Pop up for View Details of Appoint or Edit
  function handleViewPopup(appoint) {
    setVieworEdit(!vieworEdit);
    console.log(appoint);
    setviewdetsPupup({});
    setAppoinmentData({
      _id: appoint._id,
      patient: appoint.patient,
      date: appoint.date,
      startTime: appoint.startTime,
      dentistOD: appoint.dentistOD,
      procedure: appoint.procedure,
      remarks: appoint.remarks,
      dentist: appoint.dentist,
    });
    setSelectedpopup("view");
  }

  function handleCloseViewPopup() {
    setVieworEdit(!vieworEdit);
  }

  function handledEditAppoint(data) {
    const errors = validateAppointment();
    setErrors(errors || {});
    if (errors) return;

    let scheduledarray = scheduled;

    const selectedSchedule = scheduledarray.filter((sa) => sa._id === data._id);

    const indexschedule = scheduledarray.indexOf(selectedSchedule[0]);

    scheduledarray[indexschedule] = {
      _id: data._id,
      patient: data.patient,
      procedure: data.procedure,
      date: data.date,
      startTime: data.startTime,
      dentistOD: data.dentistOD,
      remarks: data.remarks,
    };

    setScheduled(scheduledarray);

    appointContext.editAppointment(data);
    setVieworEdit(false);
  }
  // Dentist List Pop up / Choosing Dentist
  function handleDentistPopup() {
    setDentistList(!dentistList);
    setAddPopup(false);
    setVieworEdit(false);
  }
  function handleBacktoAppoint() {
    setDentistList(false);
    setProcedureList(false);
    setPxList(false);
    if (selectedPopup === "add") {
      setAddPopup(true);
    } else {
      setVieworEdit(true);
    }
  }
  function choosenDentist(dentist) {
    if (!dentist) {
      setDentistList(false);
      if (selectedPopup === "add") {
        setAddPopup(true);
      } else {
        setVieworEdit(true);
      }
    } else {
      let parseddentist = JSON.parse(dentist);
      setAppoinmentData((prev) => {
        return { ...prev, dentistOD: parseddentist };
      });
      setDentistList(!dentistList);
      if (selectedPopup === "add") {
        setAddPopup(true);
      } else {
        setVieworEdit(true);
      }
    }
  }
  // Procedures List Pop up / Choosing Procedure
  function handleProcedurePopup() {
    setProcedureList(!procedureList);
    setAddPopup(false);
    setVieworEdit(false);
  }

  function choosenProcedure(procedure) {
    if (!procedure) {
      setProcedureList(false);

      if (selectedPopup === "add") {
        setAddPopup(true);
      } else {
        setVieworEdit(true);
      }
    } else {
      let parsedprocedure = JSON.parse(procedure);
      setAppoinmentData((prev) => {
        return { ...prev, procedure: parsedprocedure };
      });
      setProcedureList(!procedureList);
      if (selectedPopup === "add") {
        setAddPopup(true);
      } else {
        setVieworEdit(true);
      }
    }
  }

  // Patient List Pop up / Choosing Patient
  function handlePatientPopup() {
    setPxList(!pxList);
    setAddPopup(false);
    setVieworEdit(false);
  }

  function choosenPatient(patient) {
    if (!patient) {
      setPxList(false);
      if (selectedPopup === "add") {
        setAddPopup(true);
      } else {
        setVieworEdit(true);
      }
    } else {
      let parsedpatient = JSON.parse(patient);
      setAppoinmentData((prev) => {
        return { ...prev, patient: parsedpatient };
      });
      setPxList(!pxList);
      if (selectedPopup === "add") {
        setAddPopup(true);
      } else {
        setVieworEdit(true);
      }
    }
  }
  // Deleting  Appointment
  function handleDeleteAppoint(appoint) {
    appointContext.deleteAppointment(appoint);
    // const appointments2 = appointment.filter((a) => a.id !== appoint.id);
    // setAppointments(appointments2);
    const appointments = scheduled.filter((a) => a._id !== appoint._id);
    setScheduled(appointments);
  }

  // Handle appointmentData change
  function handleChange(e) {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    setAppoinmentData((prev) => {
      return { ...prev, [name]: value };
    });
  }

  // Validation of Appointment
  const schemaPatient = Joi.object({
    firstName: Joi.string().min(3).max(20).required(),
    lastName: Joi.string().min(3).max(20).required(),
  }).options({ stripUnknown: true });

  const schemaDentist = Joi.object({
    firstName: Joi.string().min(3).max(20).required(),
    lastName: Joi.string().min(3).max(20).required(),
  }).options({ stripUnknown: true });

  const schemaProcedure = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    amount: Joi.number().required(),
  }).options({ stripUnknown: true });

  const schemaAppointment = Joi.object({
    patient: schemaPatient,
    date: Joi.date().required(),
    startTime: Joi.string()
      .regex(/\b((1[0-2]|0?[1-9]):([0-5][0-9]) ([AaPp][Mm]))/)
      .required(),
    dentistOD: schemaDentist,
    procedure: schemaProcedure,
  }).options({ stripUnknown: true });

  function validateAppointment() {
    const result = schemaAppointment.validate(appointmentData, {
      abortEarly: false,
    });
    if (!result.error) return null;

    const errors = {};

    for (let item of result.error.details) {
      errors[item.path[0]] = item.message;
    }

    return errors;
  }

  return (
    <div className="flex gap-3 sm:divide-x justify-center sm:w-1/2 mx-auto  h-screen items-center sm:flex-row flex-col pt-20 md:pt-0">
      <div className=" md:w-96 md:h-96 w-72 h-72">
        <div className="flex justify-between items-center">
          <h1 className="select-none font-semibold">
            {months[today.month()]}, {today.year()}
          </h1>
          <div className="flex items-center  lg:gap-5">
            <GrFormPrevious
              className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
              onClick={() => {
                setToday(today.month(today.month() - 1));
              }}
            />
            <h1
              className=" cursor-pointer hover:scale-105 transition-all"
              onClick={() => {
                setToday(currentDate);
              }}
            >
              Today
            </h1>
            <GrFormNext
              className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
              onClick={() => {
                setToday(today.month(today.month() + 1));
              }}
            />
          </div>
        </div>
        <div className="grid grid-cols-7 ">
          {days.map((day, index) => {
            return (
              <h1
                key={index}
                className="text-sm text-center h-14 w-15 grid place-content-center text-gray-500 select-none"
              >
                {day}
              </h1>
            );
          })}
        </div>

        <div className=" grid grid-cols-7 ">
          {generateDate(today.month(), today.year()).map(
            ({ date, currentMonth, today }, index) => {
              return (
                <div
                  key={index}
                  className="p-2 text-center h-14 grid place-content-center text-sm border-t"
                >
                  <h1
                    className={cn(
                      currentMonth ? "" : "text-gray-400",
                      today ? "bg-red-600 text-white" : "",
                      selectDate.toDate().toDateString() ===
                        date.toDate().toDateString()
                        ? "bg-black text-white"
                        : "",
                      "lg:h-10 lg:w-10 md:h-7 md:w-7 h-10 w-10 rounded-full grid place-content-center hover:bg-black hover:text-white transition-all cursor-pointer select-none"
                    )}
                    onClick={() => {
                      returnSchedules(date);
                    }}
                  >
                    {date.date()}
                  </h1>
                </div>
              );
            }
          )}
        </div>
      </div>
      <div className="md:h-96 md:w-96 h-72 w-72 pt-32 md:pt-0 sm:px-3">
        <h1
          className="bg-[#1993c6] w-[150px] text-center text-white rounded-md md:ml-10 m-auto cursor-pointer"
          onClick={handledAddpopUp}
        >
          Add Appointment
        </h1>
        <h1 className=" font-semibold text-center md:text-left">
          Schedule for {selectDate.toDate().toDateString()}
        </h1>
        {scheduled.length === 0 ? (
          <p className="text-gray-400 text-center md:text-left">
            No Schedules for today.
          </p>
        ) : (
          <div className="mt-3 h-[380px] lg:w-[220px] md:w-[190px] overflow-y-auto overflow-x-hidden">
            <div className="border-b-2"></div>
            {px10am.length === 0 ? (
              <div></div>
            ) : (
              <div>
                {px10am.map((px) => (
                  <div key={px._id}>
                    <h1 className="text-center font-medium">10:00AM</h1>
                    <div className="w-full h-[60px]  mb-1 flex items-center justify-between border-b-2">
                      <div
                        className="flex cursor-pointer"
                        onClick={removeDetsPopup}
                      >
                        <img
                          className="rounded-full w-[50px] mx-2"
                          src={handlePxPic(px.patient._id)}
                          alt=""
                        />
                        <p>
                          {px.patient.lastName}, {<br />}
                          {px.patient.firstName}
                        </p>
                      </div>
                      <div className="flex items-center ">
                        <BsThreeDotsVertical
                          className="cursor-pointer"
                          size={20}
                          onClick={() => viewDetsPopup(px)}
                        />
                        {viewdetsPopup._id === px._id ? (
                          <div className="bg-gray-200  -translate-x-5 -translate-y-2 md:-translate-x-10 md:translate-y-2 lg:-translate-x-5 lg:-translate-y-2 rounded-xl">
                            <div
                              className="hover:bg-gray-100 p-1 rounded-t-xl cursor-pointer"
                              onClick={() => handleViewPopup(px)}
                            >
                              Details/Edit
                            </div>
                            <div
                              className="hover:bg-gray-100 p-1 rounded-b-xl cursor-pointer"
                              onClick={() => handleDeleteAppoint(px)}
                            >
                              Delete
                            </div>
                          </div>
                        ) : (
                          <div></div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {px11am.length === 0 ? (
              <div></div>
            ) : (
              <div>
                {px11am.map((px) => (
                  <div key={px.id}>
                    <h1 className="text-center font-medium">11:00AM</h1>
                    <div className="w-full h-[60px]  mb-1 flex items-center justify-between border-b-2">
                      <div
                        className="flex cursor-pointer"
                        onClick={removeDetsPopup}
                      >
                        <img
                          className="rounded-full w-[50px] mx-2"
                          src={handlePxPic(px.patient._id)}
                          alt=""
                        />
                        <p>
                          {px.patient.lastName}, {<br />}
                          {px.patient.firstName}
                        </p>
                      </div>

                      <div className="flex items-center">
                        <BsThreeDotsVertical
                          className="cursor-pointer"
                          size={20}
                          onClick={() => viewDetsPopup(px)}
                        />
                        {viewdetsPopup._id === px._id ? (
                          <div className="bg-gray-200  -translate-x-5 -translate-y-2 md:-translate-x-10 md:translate-y-2 lg:-translate-x-5 lg:-translate-y-2 rounded-xl">
                            <div
                              className="hover:bg-gray-100 p-1 rounded-t-xl cursor-pointer"
                              onClick={() => handleViewPopup(px)}
                            >
                              Details/Edit
                            </div>
                            <div
                              className="hover:bg-gray-100 p-1 rounded-b-xl cursor-pointer"
                              onClick={() => handleDeleteAppoint(px)}
                            >
                              Delete
                            </div>
                          </div>
                        ) : (
                          <div></div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {px12pm.length === 0 ? (
              <div></div>
            ) : (
              <div>
                {px12pm.map((px) => (
                  <div key={px.id}>
                    <h1 className="text-center font-medium">12:00PM</h1>
                    <div className="w-full h-[60px]  mb-1 flex items-center justify-between border-b-2">
                      <div
                        className="flex cursor-pointer"
                        onClick={removeDetsPopup}
                      >
                        <img
                          className="rounded-full w-[50px] mx-2"
                          src={handlePxPic(px.patient._id)}
                          alt=""
                        />
                        <p>
                          {px.patient.lastName}, {<br />}
                          {px.patient.firstName}
                        </p>
                      </div>

                      <div className="flex items-center">
                        <BsThreeDotsVertical
                          className="cursor-pointer"
                          size={20}
                          onClick={() => viewDetsPopup(px)}
                        />
                        {viewdetsPopup._id === px._id ? (
                          <div className="bg-gray-200 -translate-x-5 -translate-y-2 md:-translate-x-10 md:translate-y-2 lg:-translate-x-5 lg:-translate-y-2 rounded-xl">
                            <div
                              className="hover:bg-gray-100 p-1 rounded-t-xl cursor-pointer"
                              onClick={() => handleViewPopup(px)}
                            >
                              Details/Edit
                            </div>
                            <div
                              className="hover:bg-gray-100 p-1 rounded-b-xl cursor-pointer"
                              onClick={() => handleDeleteAppoint(px)}
                            >
                              Delete
                            </div>
                          </div>
                        ) : (
                          <div></div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {px1pm.length === 0 ? (
              <div></div>
            ) : (
              <div>
                {px1pm.map((px) => (
                  <div key={px.id}>
                    <h1 className="text-center font-medium">1:00PM</h1>
                    <div className="w-full h-[60px]  mb-1 flex items-center justify-between border-b-2">
                      <div
                        className="flex cursor-pointer"
                        onClick={removeDetsPopup}
                      >
                        <img
                          className="rounded-full w-[50px] mx-2"
                          src={handlePxPic(px.patient._id)}
                          alt=""
                        />
                        <p>
                          {px.patient.lastName}, {<br />}
                          {px.patient.firstName}
                        </p>
                      </div>

                      <div className="flex items-center">
                        <BsThreeDotsVertical
                          className="cursor-pointer"
                          size={20}
                          onClick={() => viewDetsPopup(px)}
                        />
                        {viewdetsPopup._id === px._id ? (
                          <div className="bg-gray-200 -translate-x-5 -translate-y-2 md:-translate-x-10 md:translate-y-2 lg:-translate-x-5 lg:-translate-y-2 rounded-xl">
                            <div
                              className="hover:bg-gray-100 p-1 rounded-t-xl cursor-pointer"
                              onClick={() => handleViewPopup(px)}
                            >
                              Details/Edit
                            </div>
                            <div
                              className="hover:bg-gray-100 p-1 rounded-b-xl cursor-pointer"
                              onClick={() => handleDeleteAppoint(px)}
                            >
                              Delete
                            </div>
                          </div>
                        ) : (
                          <div></div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {px2pm.length === 0 ? (
              <div></div>
            ) : (
              <div>
                {px2pm.map((px) => (
                  <div key={px.id}>
                    <h1 className="text-center font-medium">2:00PM</h1>
                    <div className="w-full h-[60px]  mb-1 flex items-center justify-between border-b-2">
                      <div
                        className="flex cursor-pointer"
                        onClick={removeDetsPopup}
                      >
                        <img
                          className="rounded-full w-[50px] mx-2"
                          src={handlePxPic(px.patient._id)}
                          alt=""
                        />
                        <p>
                          {px.patient.lastName}, {<br />}
                          {px.patient.firstName}
                        </p>
                      </div>

                      <div className="flex items-center">
                        <BsThreeDotsVertical
                          className="cursor-pointer"
                          size={20}
                          onClick={() => viewDetsPopup(px)}
                        />
                        {viewdetsPopup._id === px._id ? (
                          <div className="bg-gray-200 -translate-x-5 -translate-y-2 md:-translate-x-10 md:translate-y-2 lg:-translate-x-5 lg:-translate-y-2 rounded-xl">
                            <div
                              className="hover:bg-gray-100 p-1 rounded-t-xl cursor-pointer"
                              onClick={() => handleViewPopup(px)}
                            >
                              Details/Edit
                            </div>
                            <div
                              className="hover:bg-gray-100 p-1 rounded-b-xl cursor-pointer"
                              onClick={() => handleDeleteAppoint(px)}
                            >
                              Delete
                            </div>
                          </div>
                        ) : (
                          <div></div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {px3pm.length === 0 ? (
              <div></div>
            ) : (
              <div>
                {px3pm.map((px) => (
                  <div key={px.id}>
                    <h1 className="text-center font-medium">3:00PM</h1>
                    <div className="w-full h-[60px]  mb-1 flex items-center justify-between border-b-2">
                      <div
                        className="flex cursor-pointer"
                        onClick={removeDetsPopup}
                      >
                        <img
                          className="rounded-full w-[50px] mx-2"
                          src={handlePxPic(px.patient._id)}
                          alt=""
                        />
                        <p>
                          {px.patient.lastName}, {<br />}
                          {px.patient.firstName}
                        </p>
                      </div>

                      <div className="flex items-center">
                        <BsThreeDotsVertical
                          className="cursor-pointer"
                          size={20}
                          onClick={() => viewDetsPopup(px)}
                        />
                        {viewdetsPopup._id === px._id ? (
                          <div className="bg-gray-200 -translate-x-5 -translate-y-2 md:-translate-x-10 md:translate-y-2 lg:-translate-x-5 lg:-translate-y-2 rounded-xl">
                            <div
                              className="hover:bg-gray-100 p-1 rounded-t-xl cursor-pointer"
                              onClick={() => handleViewPopup(px)}
                            >
                              Details/Edit
                            </div>
                            <div
                              className="hover:bg-gray-100 p-1 rounded-b-xl cursor-pointer"
                              onClick={() => handleDeleteAppoint(px)}
                            >
                              Delete
                            </div>
                          </div>
                        ) : (
                          <div></div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {px4pm.length === 0 ? (
              <div></div>
            ) : (
              <div>
                {px4pm.map((px) => (
                  <div key={px.id}>
                    <h1 className="text-center font-medium">4:00PM</h1>
                    <div className="w-full h-[60px]  mb-1 flex items-center justify-between border-b-2">
                      <div
                        className="flex cursor-pointer"
                        onClick={removeDetsPopup}
                      >
                        <img
                          className="rounded-full w-[50px] mx-2"
                          src={handlePxPic(px.patient._id)}
                          alt=""
                        />
                        <p>
                          {px.patient.lastName}, {<br />}
                          {px.patient.firstName}
                        </p>
                      </div>

                      <div className="flex items-center">
                        <BsThreeDotsVertical
                          className="cursor-pointer"
                          size={20}
                          onClick={() => viewDetsPopup(px)}
                        />
                        {viewdetsPopup._id === px._id ? (
                          <div className="bg-gray-200 -translate-x-5 -translate-y-2 md:-translate-x-10 md:translate-y-2 lg:-translate-x-5 lg:-translate-y-2 rounded-xl">
                            <div
                              className="hover:bg-gray-100 p-1 rounded-t-xl cursor-pointer"
                              onClick={() => handleViewPopup(px)}
                            >
                              Details/Edit
                            </div>
                            <div
                              className="hover:bg-gray-100 p-1 rounded-b-xl cursor-pointer"
                              onClick={() => handleDeleteAppoint(px)}
                            >
                              Delete
                            </div>
                          </div>
                        ) : (
                          <div></div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {px5pm.length === 0 ? (
              <div></div>
            ) : (
              <div>
                {px5pm.map((px) => (
                  <div key={px.id}>
                    <h1 className="text-center font-medium">5:00PM</h1>
                    <div className="w-full h-[60px]  mb-1 flex items-center justify-between border-b-2">
                      <div
                        className="flex cursor-pointer"
                        onClick={removeDetsPopup}
                      >
                        <img
                          className="rounded-full w-[50px] mx-2"
                          src={handlePxPic(px.patient._id)}
                          alt=""
                        />
                        <p>
                          {px.patient.lastName}, {<br />}
                          {px.patient.firstName}
                        </p>
                      </div>

                      <div className="flex items-center">
                        <BsThreeDotsVertical
                          className="cursor-pointer"
                          size={20}
                          onClick={() => viewDetsPopup(px)}
                        />
                        {viewdetsPopup._id === px._id ? (
                          <div className="bg-gray-200 -translate-x-5 -translate-y-2 md:-translate-x-10 md:translate-y-2 lg:-translate-x-5 lg:-translate-y-2 rounded-xl cursor-pointer">
                            <div
                              className="hover:bg-gray-100 p-1 rounded-t-xl"
                              onClick={() => handleViewPopup(px)}
                            >
                              Details/Edit
                            </div>
                            <div
                              className="hover:bg-gray-100 p-1 rounded-b-xl cursor-pointer"
                              onClick={() => handleDeleteAppoint(px)}
                            >
                              Delete
                            </div>
                          </div>
                        ) : (
                          <div></div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {px6pm.length === 0 ? (
              <div></div>
            ) : (
              <div>
                {px6pm.map((px) => (
                  <div key={px.id}>
                    <h1 className="text-center font-medium">6:00PM</h1>
                    <div className="w-full h-[60px]  mb-1 flex items-center justify-between border-b-2">
                      <div
                        className="flex cursor-pointer"
                        onClick={removeDetsPopup}
                      >
                        <img
                          className="rounded-full w-[50px] mx-2"
                          src={handlePxPic(px.patient._id)}
                          alt=""
                        />
                        <p>
                          {px.patient.lastName}, {<br />}
                          {px.patient.firstName}
                        </p>
                      </div>

                      <div className="flex items-center">
                        <BsThreeDotsVertical
                          className="cursor-pointer"
                          size={20}
                          onClick={() => viewDetsPopup(px)}
                        />
                        {viewdetsPopup._id === px._id ? (
                          <div className="bg-gray-200 -translate-x-5 -translate-y-2 md:-translate-x-10 md:translate-y-2 lg:-translate-x-5 lg:-translate-y-2 rounded-xl">
                            <div
                              className="hover:bg-gray-100 p-1 rounded-t-xl cursor-pointer"
                              onClick={() => handleViewPopup(px)}
                            >
                              Details/Edit
                            </div>
                            <div
                              className="hover:bg-gray-100 p-1 rounded-b-xl cursor-pointer"
                              onClick={() => handleDeleteAppoint(px)}
                            >
                              Delete
                            </div>
                          </div>
                        ) : (
                          <div></div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Add Appointment Pop up */}
      <div
        className={
          !addAppointPopup
            ? "w-1/2 h-1/2 absolute left-0 right-0 top-0 bottom-0 m-auto hidden -z-10"
            : "md:w-[400px] h-[65%] w-[300px] absolute left-0 right-0 top-0 bottom-0 m-auto z-20 "
        }
      >
        <div className=" bg-white h-[410px] w-full m-auto rounded-xl border-2 overflow-y-auto">
          <div className="flex justify-end pt-1 pr-2">
            <AiOutlineClose
              className="hover:cursor-pointer"
              size={20}
              fill="#FF2400"
              onClick={handlecloseAddpopUp}
            />
          </div>
          <h1 className="text-center text-lg font-semibold tracking-widest pb-1">
            Add Appointment
          </h1>
          {existingPx ? (
            <div></div>
          ) : (
            <div className="flex justify-evenly ">
              <button
                className="md:max-w-[150px] max-w-[120px] text-sm md:text-base min-w-[100px] w-full bg-[#1993c6] rounded-full p-1 text-white font-medium"
                onClick={handleExistingPx}
              >
                Existing Patient
              </button>
              <a
                href="/dashboard/patients"
                className="text-center md:max-w-[150px] max-w-[120px] text-sm md:text-base w-full bg-[#1993c6] rounded-full p-1 text-white font-medium cursor-pointer"
              >
                New Patient
              </a>
            </div>
          )}

          {!existingPx ? (
            <div></div>
          ) : (
            <div>
              <div className=" m-auto max-w-[380px] min-w-[200px] px-9 pb-1">
                <h2 className="text-sm">
                  Patient{" "}
                  {errors.patient && (
                    <span className="text-red-600 text-lg font-bold"> * </span>
                  )}
                </h2>
                <div className="flex justify-between">
                  {!appointmentData.patient ? (
                    <h3 className="text-gray-300">Patient</h3>
                  ) : (
                    <h3 className="">
                      {`${appointmentData.patient.lastName}, 
                      ${appointmentData.patient.firstName}`}
                    </h3>
                  )}

                  <AiFillCaretDown
                    className="translate-y-1 cursor-pointer"
                    fill="#ddd8db"
                    onClick={handlePatientPopup}
                  />
                </div>
                <div className="border-b-2"></div>
              </div>
              <div className=" m-auto max-w-[380px] min-w-[200px] px-9 pb-1">
                <h2 className="text-sm">
                  Dentist{" "}
                  {errors.dentistOD && (
                    <span className="text-red-600 text-lg font-bold"> * </span>
                  )}
                </h2>
                <div className="flex justify-between">
                  {!appointmentData.dentistOD ? (
                    <h3 className="text-gray-300">Dentist</h3>
                  ) : (
                    <h3 className="">{`Dr. ${appointmentData.dentistOD.lastName}, ${appointmentData.dentistOD.firstName}`}</h3>
                  )}

                  <AiFillCaretDown
                    className="translate-y-1 cursor-pointer"
                    fill="#ddd8db"
                    onClick={handleDentistPopup}
                  />
                </div>
                <div className="border-b-2"></div>
              </div>
              <div className=" m-auto max-w-[380px] min-w-[200px] px-9 pb-1">
                <h2 className="text-sm">
                  Procedure
                  {errors.procedure && (
                    <span className="text-red-600 text-lg font-bold"> * </span>
                  )}
                </h2>
                <div className="flex justify-between">
                  {!appointmentData.procedure ? (
                    <h3 className="text-gray-300">Procedure</h3>
                  ) : (
                    <h3 className="">{`${appointmentData.procedure.name} -- ${appointmentData.procedure.amount}`}</h3>
                  )}

                  <AiFillCaretDown
                    className="translate-y-1 cursor-pointer"
                    fill="#ddd8db"
                    onClick={handleProcedurePopup}
                  />
                </div>
                <div className="border-b-2"></div>
              </div>
              <div className=" m-auto max-w-[380px] min-w-[200px] px-9 pb-1">
                <label className="text-sm" htmlFor="dates">
                  Date{" "}
                  {errors.date && (
                    <span className="text-red-600 text-lg font-bold"> * </span>
                  )}
                </label>
                <input
                  className="border-b-2 outline-none  w-full pl-2 b"
                  id="dates"
                  type="date"
                  name="date"
                  value={appointmentData.date}
                  onChange={handleChange}
                />
              </div>

              <div className=" m-auto max-w-[380px] min-w-[200px] px-9">
                <label className="px-1" htmlFor="startTime">
                  Time of Appointment{" "}
                  {errors.startTime && (
                    <span className="text-red-600 text-lg font-bold"> * </span>
                  )}
                </label>
                <select
                  value={appointmentData.startTime}
                  onChange={handleChange}
                  id="startTime"
                  name="startTime"
                  className="borderb-2 outline-none  w-full pl-1 border-b-2"
                >
                  <option value=""></option>
                  <option value="10:00 AM">10:00AM</option>
                  <option value="11:00 AM">11:00AM</option>
                  <option value="12:00 PM">12:00PM</option>
                  <option value="1:00 PM">1:00PM</option>
                  <option value="2:00 PM">2:00PM</option>
                  <option value="3:00 PM">3:00PM</option>
                  <option value="4:00 PM">4:00PM</option>
                  <option value="5:00 PM">5:00PM</option>
                  <option value="6:00 PM">6:00PM</option>
                </select>
              </div>
              <div className="flex justify-center w-full pt-4">
                <button
                  className=" md:max-w-[200px] max-w-[160px] w-full py-1 bg-[#1993c6] rounded-full font-bold tracking-wider text-white text-base md:text-lg "
                  onClick={handleAddAppoint}
                >
                  Submit
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div
        className={
          !addAppointPopup
            ? "w-full h-full opacity-100 absolute top-0 hidden"
            : "w-[2000px] h-full opacity-100 absolute top-0 z-10"
        }
      ></div>
      {/* Dentist List Pop up */}
      <div
        className={
          !dentistList
            ? "w-1/2 h-1/2 absolute left-0 right-0 top-0 bottom-0 m-auto hidden -z-10"
            : "w-[300px] h-1/2 absolute left-0 right-0 top-0 bottom-0 m-auto z-30 "
        }
      >
        <div className="border-2 rounded-xl">
          <div className=" bg-white w-full h-[300px] ">
            <DentistList
              dentists={dentists}
              back={handleBacktoAppoint}
              chosenDentist={choosenDentist}
            />
          </div>
        </div>
      </div>
      <div
        className={
          !dentistList
            ? "w-full h-full opacity-100 absolute top-0 hidden"
            : "w-[2000px] h-full opacity-100 absolute top-0 z-10"
        }
      ></div>
      {/* Procedure List */}
      <div
        className={
          !procedureList
            ? "w-1/2 h-1/2 absolute left-0 right-0 top-0 bottom-0 m-auto hidden -z-10"
            : "w-[300px]  h-1/2 absolute left-0 right-0 top-0 bottom-0 m-auto z-30  "
        }
      >
        <div className="border-2 rounded-xl">
          <div className=" bg-white w-full h-[300px] ">
            <ProcedureList
              back={handleBacktoAppoint}
              procedures={procedures}
              chosenProc={choosenProcedure}
            />
          </div>
        </div>
      </div>
      <div
        className={
          !procedureList
            ? "w-full h-full opacity-100 absolute top-0 hidden"
            : "w-[2000px] h-full opacity-100 absolute top-0 z-10"
        }
      ></div>
      {/* Patient List */}
      <div
        className={
          !pxList
            ? "w-1/2 h-1/2 absolute left-0 right-0 top-0 bottom-0 m-auto hidden -z-10"
            : "w-[300px]  h-1/2 absolute left-0 right-0 top-0 bottom-0 m-auto z-30  "
        }
      >
        <div className="border-2 rounded-xl">
          <div className=" bg-white w-full h-[300px] ">
            <PatientList
              back={handleBacktoAppoint}
              patients={pxs}
              chosenPatient={choosenPatient}
            />
          </div>
        </div>
      </div>
      <div
        className={
          !pxList
            ? "w-full h-full opacity-100 absolute top-0 hidden"
            : "w-[2000px] h-full opacity-100 absolute top-0 z-10"
        }
      ></div>
      {/* View or Edit Appointment */}
      <div
        className={
          !vieworEdit
            ? "w-1/2 h-1/2 absolute left-0 right-0 top-0 bottom-0 m-auto hidden -z-10"
            : "md:w-[400px] h-[65%] w-[300px] absolute left-0 right-0 top-0 bottom-0 m-auto z-20 "
        }
      >
        <div className=" bg-white h-[410px] w-full m-autorounded-xl border-2 overflow-y-auto">
          <div className="flex justify-end pt-1 pr-2">
            <AiOutlineClose
              className="hover:cursor-pointer"
              size={20}
              fill="#FF2400"
              onClick={handleCloseViewPopup}
            />
          </div>
          <h1 className="text-center text-lg font-semibold tracking-widest pb-1">
            Appointment Details
          </h1>
          <div>
            <div className=" m-auto max-w-[380px] min-w-[200px] px-9 pb-1">
              <h2 className="text-sm">
                Patient{" "}
                {errors.patient && (
                  <span className="text-red-600 text-lg font-bold"> * </span>
                )}
              </h2>
              <div className="flex justify-between">
                {!appointmentData.patient ? (
                  <h3 className="text-gray-300">Patient</h3>
                ) : (
                  <h3 className="">
                    {`${appointmentData.patient.lastName}, 
                      ${appointmentData.patient.firstName}`}
                  </h3>
                )}

                <AiFillCaretDown
                  className="translate-y-1 cursor-pointer"
                  fill="#ddd8db"
                  onClick={handlePatientPopup}
                />
              </div>
              <div className="border-b-2"></div>
            </div>
            <div className=" m-auto max-w-[380px] min-w-[200px] px-9 pb-1">
              <h2 className="text-sm">
                Dentist{" "}
                {errors.dentistOD && (
                  <span className="text-red-600 text-lg font-bold"> * </span>
                )}
              </h2>
              <div className="flex justify-between">
                {!appointmentData.dentistOD ? (
                  <h3 className="text-gray-300">Dentist</h3>
                ) : (
                  <h3 className="">{`Dr. ${appointmentData.dentistOD.lastName}, ${appointmentData.dentistOD.firstName}`}</h3>
                )}

                <AiFillCaretDown
                  className="translate-y-1 cursor-pointer"
                  fill="#ddd8db"
                  onClick={handleDentistPopup}
                />
              </div>
              <div className="border-b-2"></div>
            </div>
            <div className=" m-auto max-w-[380px] min-w-[200px] px-9 pb-1">
              <h2 className="text-sm">
                Procedure
                {errors.procedure && (
                  <span className="text-red-600 text-lg font-bold"> * </span>
                )}
              </h2>
              <div className="flex justify-between">
                {!appointmentData.procedure ? (
                  <h3 className="text-gray-300">Procedure</h3>
                ) : (
                  <h3 className="">{`${appointmentData.procedure.name} -- ${appointmentData.procedure.amount}`}</h3>
                )}

                <AiFillCaretDown
                  className="translate-y-1 cursor-pointer"
                  fill="#ddd8db"
                  onClick={handleProcedurePopup}
                />
              </div>
              <div className="border-b-2"></div>
            </div>
            <div className=" m-auto max-w-[380px] min-w-[200px] px-9 pb-1">
              <label className="text-sm" htmlFor="dates">
                Date{" "}
                {errors.date && (
                  <span className="text-red-600 text-lg font-bold"> * </span>
                )}
              </label>
              <input
                className="border-b-2 outline-none  w-full pl-2 b"
                id="dates"
                type="date"
                name="date"
                value={dayjs(appointmentData.date).format("YYYY-MM-DD")}
                onChange={handleChange}
              />
            </div>

            <div className=" m-auto max-w-[380px] min-w-[200px] px-9">
              <label className="px-1" htmlFor="startTime">
                Time of Appointment{" "}
                {errors.startTime && (
                  <span className="text-red-600 text-lg font-bold"> * </span>
                )}
              </label>
              <select
                onChange={handleChange}
                id="startTime"
                name="startTime"
                className="borderb-2 outline-none  w-full pl-1 border-b-2"
              >
                <option value=""></option>
                <option value="10:00 AM">10:00AM</option>
                <option value="11:00 AM">11:00AM</option>
                <option value="12:00 PM">12:00PM</option>
                <option value="1:00 PM">1:00PM</option>
                <option value="2:00 PM">2:00PM</option>
                <option value="3:00 PM">3:00PM</option>
                <option value="4:00 PM">4:00PM</option>
                <option value="5:00 PM">5:00PM</option>
                <option value="6:00 PM">6:00PM</option>
              </select>
            </div>
            <div className="flex justify-center w-full pt-4">
              <button
                className=" max-w-[200px] w-full py-1 bg-[#1993c6] rounded-full font-bold tracking-wider text-white text-lg "
                onClick={() => handledEditAppoint(appointmentData)}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className={
          !vieworEdit
            ? "w-full h-full opacity-100 absolute top-0 hidden"
            : "w-[2000px] h-full opacity-100 absolute top-0 z-10"
        }
      ></div>
    </div>
  );
}
