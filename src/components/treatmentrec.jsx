import React, { useState } from "react";
import _ from "lodash";
import moment from "moment";
import Joi from "joi";
import { GiTakeMyMoney } from "react-icons/gi";
import {
  AiFillEdit,
  AiFillDelete,
  AiOutlineClose,
  AiOutlineRollback,
  AiFillCaretDown,
} from "react-icons/ai";
import { GrAdd } from "react-icons/gr";
import Pagination from "./common/pagination";
import ProcedureList from "./common/procedurespopup";
import DentistList from "./common/dentistlistpopup";

const TreamentRecords = (props) => {
  const [paymentPopup, setPaymentPopup] = useState(false);
  const [trpopup, setTrPopUp] = useState(false);
  const [selectTooth, setSelectTooth] = useState(false);
  const [adultTeeth, setAdultTeeth] = useState(true);
  const [pediaTeeth, setPediaTeeth] = useState(false);
  const [editTr, seteditTr] = useState(false);
  const [trData, setTRData] = useState({
    id: "",
    pxid: "",
    toothNumber: "",
    procedureid: "",
    date: "",
    time: "",
    handledBy: "",
    paid: "",
    notes: "",
  });
  const [paymentData, setPaymentData] = useState({
    id: "",
    pxid: "",
    Mop: "",
    treatmentRecID: "",
    date: "",
    handledBy: "",
  });
  const [procedurepopup, setProcedurepopup] = useState(false);
  const [dentistpopup, setDentistpopup] = useState(false);
  // Errors
  const [errors, setErrors] = useState({});

  function handlePopup() {
    setTrPopUp(!trpopup);
    setErrors({});
    setTRData({
      id: "",
      pxid: props.id,
      toothNumber: "",
      procedureid: "",
      date: "",
      time: "",
      handledBy: "",
      paid: false,
      notes: "",
    });
  }

  function selectToothPopup() {
    setSelectTooth(!selectTooth);
  }

  function selectAdultTeeth() {
    setAdultTeeth(!adultTeeth);
    setPediaTeeth(false);
  }

  function selectPediaTeeth() {
    setPediaTeeth(!pediaTeeth);
    setAdultTeeth(false);
  }

  function editTrPopup(tr) {
    seteditTr(!editTr);
    setTRData({
      id: tr.id,
      pxid: tr.pxid,
      toothNumber: tr.toothNumber,
      procedureid: tr.procedureid,
      date: tr.date,
      time: tr.time,
      handledBy: tr.handledBy,
      paid: tr.paid,
      notes: tr.notes,
    });
  }

  function procedurespopup() {
    setProcedurepopup(!procedurepopup);
  }

  function dentistspopup() {
    setDentistpopup(!dentistpopup);
  }

  function closePaymentPopup() {
    setPaymentPopup(!paymentPopup);

    let payment = {
      id: "",
      pxid: "",
      Mop: "",
      treatmentRecID: "",
      date: "",
      handledBy: "",
    };

    setPaymentData(payment);

    console.log(paymentData);
  }

  // Data to be inputed by user TR
  function handleChange(e) {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    setTRData((prev) => {
      return { ...prev, [name]: value };
    });
  }

  function selectTeeth(e) {
    const number = e.target.attributes.getNamedItem("number").value;
    setTRData((prev) => {
      return { ...prev, toothNumber: number };
    });
    setSelectTooth(!selectTooth);
  }

  function choosenProcedure(procedure) {
    let parsedprocedure = JSON.parse(procedure);
    setTRData((prev) => {
      return { ...prev, procedureid: parsedprocedure };
    });
    setProcedurepopup(!procedurepopup);
  }

  function choosenDentist(dentist) {
    let parseddentist = JSON.parse(dentist);
    setTRData((prev) => {
      return { ...prev, handledBy: parseddentist };
    });
    setDentistpopup(!dentistpopup);
  }

  function addtreatment(e) {
    e.preventDefault();
    const errors = validate();
    setErrors(errors || {});

    if (errors) return;

    props.add(trData);
    setTrPopUp(!trpopup);
  }

  function edittreatment(e) {
    e.preventDefault();
    const errors = validate();
    setErrors(errors || {});
    if (errors) return;
    props.edit(trData);
    seteditTr(!editTr);
  }
  // Data to be inputed by user Payment
  function addPayment(data) {
    setPaymentPopup(!paymentPopup);

    let payment = {
      id: props.payments.length + 1,
      pxid: data.pxid,
      Mop: "",
      treatmentRecID: data.id,
      date: "",
      handledBy: data.handledBy,
    };
    setPaymentData(payment);
  }

  function makePayment(data) {
    const errors = validatePayment();
    setErrors(errors || {});

    if (errors) return;

    setPaymentPopup(!paymentPopup);
    props.addpayment(data);
  }

  function handleChangePayment(e) {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    setPaymentData((prev) => {
      return { ...prev, [name]: value };
    });
  }

  // Validation of Treatment Record
  const schemaProcedure = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    amount: Joi.number().required(),
  }).options({ stripUnknown: true });
  const schemaHandledBy = Joi.object({
    firstName: Joi.string().min(3).max(20).required(),
    lastName: Joi.string().min(3).max(20).required(),
  }).options({ stripUnknown: true });
  const schemaTreatmentRec = Joi.object({
    procedureid: schemaProcedure,
    date: Joi.date().required(),
    handledBy: schemaHandledBy,
    paid: Joi.boolean().required(),
  }).options({ stripUnknown: true });

  function validate() {
    const result = schemaTreatmentRec.validate(trData, { abortEarly: false });
    if (!result.error) return null;

    const errors = {};

    for (let item of result.error.details) {
      errors[item.path[0]] = item.message;
    }

    return errors;
  }

  // Validation of Payment
  const schemaPayment = Joi.object({
    Mop: Joi.string().valid("Cash", "Online", "HMO").required(),
    date: Joi.date().required(),
  }).options({ stripUnknown: true });

  function validatePayment() {
    const result = schemaPayment.validate(paymentData, { abortEarly: false });
    if (!result.error) return null;

    const errors = {};

    for (let item of result.error.details) {
      errors[item.path[0]] = item.message;
    }

    return errors;
  }

  return (
    <div className=" w-full">
      <div className="bg-white max-w-[500px] min-w-[350px] max-h-[600px] m-auto mt-0 rounded-lg">
        <div>
          <table className="w-full">
            <thead className="text-lg tracking-wider border-b-2 border-gray-200 text-center">
              <tr>
                <th className="flex justify-center">
                  <h1 className="translate-x-3">Treatment Records </h1>
                  <div
                    className=" flex translate-x-16 bg-[#1993c6] rounded-full px-3 font-medium cursor-pointer text-sm"
                    onClick={handlePopup}
                  >
                    <GrAdd className="translate-y-2" />
                    <h2 className="translate-y-1">Add</h2>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {props.treatmentrec.map((treatment) => (
                <tr key={treatment.id}>
                  <td className="border-b-2 border-gray-200">
                    <div className="px-5 pt-2">
                      <h2 className="text-base">
                        Tooth Number:{" "}
                        <span className="font-medium">
                          {treatment.toothNumber}
                        </span>
                      </h2>
                      <h3>
                        Procedure:
                        <span className="font-medium pl-1">
                          {treatment.procedureid.name}
                        </span>{" "}
                        --
                        <span className="font-medium">
                          Php {treatment.procedureid.amount}
                        </span>
                      </h3>
                      <h3>
                        Date:{" "}
                        <span className="font-medium">
                          {moment(treatment.date).format("MM/DD/YYYY")}
                        </span>
                      </h3>
                      <h3 className="pb-1">
                        Dentist:
                        <span className="pl-1 font-medium">
                          Dr.{" "}
                          {`${treatment.handledBy.lastName}, ${treatment.handledBy.firstName}`}
                        </span>
                      </h3>
                    </div>

                    <div className="flex justify-evenly border-t-2 ">
                      {!treatment.paid ? (
                        <div
                          className="pr-12 border-r-2  cursor-pointer"
                          onClick={() => addPayment(treatment)}
                        >
                          <GiTakeMyMoney size={25} />
                        </div>
                      ) : (
                        <div className="pr-[70px] border-r-2"> </div>
                      )}

                      <div
                        className=" cursor-pointer"
                        onClick={() => editTrPopup(treatment)}
                      >
                        <AiFillEdit size={25} />
                      </div>
                      {!treatment.paid ? (
                        <div
                          className="pl-12 border-l-2  cursor-pointer"
                          onClick={() => props.deleteTr(treatment)}
                        >
                          <AiFillDelete size={25} />
                        </div>
                      ) : (
                        <div className="pl-16 border-l-2"> </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="px-2 pb-2">
            {" "}
            <Pagination
              itemsCount={props.itemsCount}
              pageS={props.pageS}
              currentPage={props.currentPage}
              pxsonpage={props.pxsonpage}
              nextbt={props.nextbtn}
              prevbt={props.prevbtn}
            />
          </div>
        </div>
      </div>
      {/* Add new Treatment Rec */}
      <div
        className={
          !trpopup
            ? "w-1/2 h-1/2 absolute left-0 right-0 top-0 bottom-0 m-auto hidden -z-10"
            : "w-1/2 h-1/2 absolute left-0 right-0 top-0 bottom-0 m-auto z-20 "
        }
      >
        <div className=" bg-white h-[330px] w-full m-auto  rounded-xl">
          <div className="flex justify-end m-1 ">
            <AiOutlineClose
              className=" cursor-pointer"
              fill="#FF2400"
              onClick={handlePopup}
            />
          </div>
          <h1 className="text-center text-xl font-semibold pb-4">
            Add New Treatment Record
          </h1>
          <div className="flex justify-center ">
            {!trData.toothNumber ? (
              <button
                className="max-w-[310px] min-w-[150px] w-full bg-[#1993c6] rounded-full p-1 text-white font-medium"
                onClick={selectToothPopup}
              >
                {" "}
                Select Tooth
              </button>
            ) : (
              <div className="flex">
                <h2 className="text-lg">Tooth Number: </h2>
                <div
                  className="mx-1 px-1 text-lg bg-[#1993c6] cursor-pointer"
                  onClick={selectToothPopup}
                >
                  {" "}
                  {trData.toothNumber}
                </div>
              </div>
            )}
          </div>

          <div className=" m-auto max-w-[380px] min-w-[200px] px-9 pb-1">
            <h2 className="text-sm">
              Procedure{" "}
              {errors.procedureid && (
                <span className="text-red-600 text-lg font-bold"> * </span>
              )}
            </h2>
            <div className="flex justify-between">
              {!trData.procedureid ? (
                <h3 className="text-gray-300">Procedure</h3>
              ) : (
                <h3 className="">{`${trData.procedureid.name} -- Php ${trData.procedureid.amount}`}</h3>
              )}
              <AiFillCaretDown
                className="translate-y-1 cursor-pointer"
                fill="#ddd8db"
                onClick={procedurespopup}
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
              value={trData.date}
              onChange={handleChange}
            />
          </div>
          <div className=" m-auto max-w-[380px] min-w-[200px] px-9 pb-1">
            <h2 className="text-sm">
              Dentist{" "}
              {errors.handledBy && (
                <span className="text-red-600 text-lg font-bold"> * </span>
              )}
            </h2>
            <div className="flex justify-between">
              {!trData.handledBy ? (
                <h3 className="text-gray-300">Dentist </h3>
              ) : (
                <h3 className="">{`Dr. ${trData.handledBy.lastName}, ${trData.handledBy.firstName}`}</h3>
              )}
              <AiFillCaretDown
                className="translate-y-1 cursor-pointer"
                fill="#ddd8db"
                onClick={dentistspopup}
              />
            </div>
            <div className="border-b-2"></div>
          </div>
          <div className="flex justify-center pt-2">
            <button
              className="bg-[#1993c6] px-14 py-1 rounded-full text-white outline-none font-medium text-lg"
              onClick={addtreatment}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      {/* Select Tooth */}
      <div
        className={
          !selectTooth
            ? "w-1/2 h-1/2 absolute left-0 right-0 top-0 bottom-0 m-auto hidden -z-10"
            : "w-1/2 h-1/2 absolute left-0 right-0 top-0 bottom-0 m-auto z-30 "
        }
      >
        <div className=" bg-white h-[330px] w-full m-auto  rounded-xl">
          <AiOutlineRollback
            className="m-1 cursor-pointer"
            size={20}
            onClick={selectToothPopup}
          />
          <div className="flex justify-evenly">
            <h2
              className="cursor-pointer text-[#1993c6]"
              onClick={selectAdultTeeth}
            >
              ADULT
            </h2>
            <h2
              className="cursor-pointer text-[#1993c6]"
              onClick={selectPediaTeeth}
            >
              PEDIATRIC
            </h2>
          </div>
          <div className="flex">
            <div
              className={
                !adultTeeth
                  ? "border-b-2 w-1/2"
                  : "border-b-2 w-1/2 border-[#1993c6]"
              }
            ></div>
            <div
              className={
                !pediaTeeth
                  ? "border-b-2 w-1/2"
                  : "border-b-2 w-1/2 border-[#1993c6]"
              }
            ></div>
          </div>
          {adultTeeth ? (
            <div className="pt-11">
              <div className="flex justify-center">
                <div
                  className="m-1 cursor-pointer"
                  number={18}
                  onClick={selectTeeth}
                >
                  18
                </div>
                <div
                  className="m-1 cursor-pointer"
                  number={17}
                  onClick={selectTeeth}
                >
                  17
                </div>
                <div
                  className="m-1 cursor-pointer"
                  number={16}
                  onClick={selectTeeth}
                >
                  16
                </div>
                <div
                  className="m-1 cursor-pointer"
                  number={15}
                  onClick={selectTeeth}
                >
                  15
                </div>
                <div
                  className="m-1 cursor-pointer"
                  number={14}
                  onClick={selectTeeth}
                >
                  14
                </div>
                <div
                  className="m-1 cursor-pointer"
                  number={13}
                  onClick={selectTeeth}
                >
                  13
                </div>
                <div
                  className="m-1 cursor-pointer"
                  number={12}
                  onClick={selectTeeth}
                >
                  12
                </div>
                <div
                  className="m-1 cursor-pointer"
                  number={11}
                  onClick={selectTeeth}
                >
                  11
                </div>
                <div
                  className="m-1 cursor-pointer"
                  number={21}
                  onClick={selectTeeth}
                >
                  21
                </div>
                <div
                  className="m-1 cursor-pointer"
                  number={18}
                  onClick={selectTeeth}
                >
                  22
                </div>
                <div
                  className="m-1 cursor-pointer"
                  number={23}
                  onClick={selectTeeth}
                >
                  23
                </div>
                <div
                  className="m-1 cursor-pointer"
                  number={24}
                  onClick={selectTeeth}
                >
                  24
                </div>
                <div
                  className="m-1 cursor-pointer"
                  number={25}
                  onClick={selectTeeth}
                >
                  25
                </div>
                <div
                  className="m-1 cursor-pointer"
                  number={26}
                  onClick={selectTeeth}
                >
                  26
                </div>
                <div
                  className="m-1 cursor-pointer"
                  number={27}
                  onClick={selectTeeth}
                >
                  27
                </div>
                <div
                  className="m-1 cursor-pointer"
                  number={28}
                  onClick={selectTeeth}
                >
                  28
                </div>
              </div>
              <div className="flex justify-center">
                <div
                  className="m-1 cursor-pointer"
                  number={48}
                  onClick={selectTeeth}
                >
                  48
                </div>
                <div
                  className="m-1 cursor-pointer"
                  number={47}
                  onClick={selectTeeth}
                >
                  47
                </div>
                <div
                  className="m-1 cursor-pointer"
                  number={46}
                  onClick={selectTeeth}
                >
                  46
                </div>
                <div
                  className="m-1 cursor-pointer"
                  number={45}
                  onClick={selectTeeth}
                >
                  45
                </div>
                <div
                  className="m-1 cursor-pointer"
                  number={44}
                  onClick={selectTeeth}
                >
                  44
                </div>
                <div
                  className="m-1 cursor-pointer"
                  number={43}
                  onClick={selectTeeth}
                >
                  43
                </div>
                <div
                  className="m-1 cursor-pointer"
                  number={42}
                  onClick={selectTeeth}
                >
                  42
                </div>
                <div
                  className="m-1 cursor-pointer"
                  number={41}
                  onClick={selectTeeth}
                >
                  41
                </div>
                <div
                  className="m-1 cursor-pointer"
                  number={31}
                  onClick={selectTeeth}
                >
                  31
                </div>
                <div
                  className="m-1 cursor-pointer"
                  number={32}
                  onClick={selectTeeth}
                >
                  32
                </div>
                <div
                  className="m-1 cursor-pointer"
                  number={33}
                  onClick={selectTeeth}
                >
                  33
                </div>
                <div
                  className="m-1 cursor-pointer"
                  number={34}
                  onClick={selectTeeth}
                >
                  34
                </div>
                <div
                  className="m-1 cursor-pointer"
                  number={35}
                  onClick={selectTeeth}
                >
                  35
                </div>
                <div
                  className="m-1 cursor-pointer"
                  number={36}
                  onClick={selectTeeth}
                >
                  36
                </div>
                <div
                  className="m-1 cursor-pointer"
                  number={37}
                  onClick={selectTeeth}
                >
                  37
                </div>
                <div
                  className="m-1 cursor-pointer"
                  number={38}
                  onClick={selectTeeth}
                >
                  38
                </div>
              </div>
            </div>
          ) : (
            <div></div>
          )}
          {pediaTeeth ? (
            <div className="pt-11">
              <div className="flex justify-center">
                <div
                  className="m-1 cursor-pointer"
                  number={55}
                  onClick={selectTeeth}
                >
                  55
                </div>
                <div
                  className="m-1 cursor-pointer"
                  number={54}
                  onClick={selectTeeth}
                >
                  54
                </div>
                <div
                  className="m-1 cursor-pointer"
                  number={53}
                  onClick={selectTeeth}
                >
                  53
                </div>
                <div
                  className="m-1 cursor-pointer"
                  number={52}
                  onClick={selectTeeth}
                >
                  52
                </div>
                <div
                  className="m-1 cursor-pointer"
                  number={51}
                  onClick={selectTeeth}
                >
                  51
                </div>
                <div
                  className="m-1 cursor-pointer"
                  number={61}
                  onClick={selectTeeth}
                >
                  61
                </div>
                <div
                  className="m-1 cursor-pointer"
                  number={62}
                  onClick={selectTeeth}
                >
                  62
                </div>
                <div
                  className="m-1 cursor-pointer"
                  number={63}
                  onClick={selectTeeth}
                >
                  63
                </div>
                <div
                  className="m-1 cursor-pointer"
                  number={64}
                  onClick={selectTeeth}
                >
                  64
                </div>
                <div
                  className="m-1 cursor-pointer"
                  number={65}
                  onClick={selectTeeth}
                >
                  65
                </div>
              </div>
              <div className="flex justify-center">
                <div
                  className="m-1 cursor-pointer"
                  number={85}
                  onClick={selectTeeth}
                >
                  85
                </div>
                <div
                  className="m-1 cursor-pointer"
                  number={84}
                  onClick={selectTeeth}
                >
                  84
                </div>
                <div
                  className="m-1 cursor-pointer"
                  number={83}
                  onClick={selectTeeth}
                >
                  83
                </div>
                <div
                  className="m-1 cursor-pointer"
                  number={82}
                  onClick={selectTeeth}
                >
                  82
                </div>
                <div
                  className="m-1 cursor-pointer"
                  number={81}
                  onClick={selectTeeth}
                >
                  81
                </div>
                <div
                  className="m-1 cursor-pointer"
                  number={71}
                  onClick={selectTeeth}
                >
                  71
                </div>
                <div
                  className="m-1 cursor-pointer"
                  number={72}
                  onClick={selectTeeth}
                >
                  72
                </div>
                <div
                  className="m-1 cursor-pointer"
                  number={73}
                  onClick={selectTeeth}
                >
                  73
                </div>
                <div
                  className="m-1 cursor-pointer"
                  number={74}
                  onClick={selectTeeth}
                >
                  74
                </div>
                <div
                  className="m-1 cursor-pointer"
                  number={75}
                  onClick={selectTeeth}
                >
                  75
                </div>
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
      <div
        className={
          !trpopup
            ? "w-full h-full bg-slate-300 opacity-80 absolute top-0 hidden"
            : "w-full h-full bg-slate-300 opacity-80 absolute top-0 z-10"
        }
      ></div>
      {/* Edit TR POP-UP */}
      <div
        className={
          !editTr
            ? "w-1/2 h-1/2 absolute left-0 right-0 top-0 bottom-0 m-auto hidden -z-10"
            : "w-1/2 h-[55%] absolute left-0 right-0 top-0 bottom-0 m-auto z-20 "
        }
      >
        <div className=" bg-white h-[330px] w-full m-auto rounded-xl">
          <div className="flex justify-end pt-1 px-1">
            <AiOutlineClose
              className=" cursor-pointer"
              fill="#FF2400"
              onClick={editTrPopup}
            />
          </div>
          <h1 className="text-center text-xl font-semibold pb-1">
            Edit Treatment Record
          </h1>
          <div className=" m-auto max-w-[380px] min-w-[200px] px-9 pb-1">
            <h2>Tooth Number</h2>
            <span className="bg-[#1993c6] m-1">{trData.toothNumber}</span>
          </div>
          <div className=" m-auto max-w-[380px] min-w-[200px] px-9 pb-1">
            <h2 className="text-sm">Procedure</h2>
            <div className="flex justify-between">
              {!trData.procedureid ? (
                <h3 className="text-gray-300">Procedure</h3>
              ) : (
                <h3 className="">{`${trData.procedureid.name} -- Php ${trData.procedureid.amount}`}</h3>
              )}

              <AiFillCaretDown
                className="translate-y-1 cursor-pointer"
                fill="#ddd8db"
                onClick={procedurespopup}
              />
            </div>
            <div className="border-b-2"></div>
          </div>
          <div className=" m-auto max-w-[380px] min-w-[200px] px-9 pb-1">
            <label className="text-sm" htmlFor="dates">
              Date
            </label>
            <input
              className="border-b-2 outline-none  w-full pl-2 b"
              id="dates"
              type="date"
              name="date"
              value={trData.date}
              onChange={handleChange}
            />
          </div>
          <div className=" m-auto max-w-[380px] min-w-[200px] px-9 pb-1">
            <h2 className="text-sm">Dentist</h2>
            <div className="flex justify-between">
              {!trData.handledBy ? (
                <h3 className="text-gray-300">Dentist</h3>
              ) : (
                <h3 className="">{`Dr. ${trData.handledBy.lastName}, ${trData.handledBy.firstName}`}</h3>
              )}
              <AiFillCaretDown
                className="translate-y-1 cursor-pointer"
                fill="#ddd8db"
                onClick={dentistspopup}
              />
            </div>
            <div className="border-b-2"></div>
          </div>
          <div className="flex justify-center pt-2">
            <button
              className="bg-[#1993c6] px-14 py-1 rounded-full text-white outline-none font-medium text-lg"
              onClick={edittreatment}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      <div
        className={
          !editTr
            ? "w-full h-full bg-slate-300 opacity-80 absolute top-0 hidden"
            : "w-full h-full bg-slate-300 opacity-80 absolute top-0 z-10"
        }
      ></div>
      {/*Edit Procedure List */}
      <div
        className={
          !procedurepopup
            ? "w-1/2 h-1/2 absolute left-0 right-0 top-0 bottom-0 m-auto hidden -z-10"
            : "w-1/2 h-1/2 absolute left-0 right-0 top-0 bottom-0 m-auto z-30 "
        }
      >
        <div className="h-[330px] bg-white rounded-xl">
          <ProcedureList
            back={procedurespopup}
            procedures={props.procedures}
            chosenProc={choosenProcedure}
          />
        </div>
      </div>
      {/* Edit Dentist List */}
      <div
        className={
          !dentistpopup
            ? "w-1/2 h-1/2 absolute left-0 right-0 top-0 bottom-0 m-auto hidden -z-10"
            : "w-1/2 h-1/2 absolute left-0 right-0 top-0 bottom-0 m-auto z-30 "
        }
      >
        <div className="h-[330px] bg-white rounded-xl">
          <DentistList
            dentists={props.dentists}
            back={dentistspopup}
            chosenDentist={choosenDentist}
          />
        </div>
      </div>
      {/* Make Payment */}
      <div
        className={
          !paymentPopup
            ? "w-1/2 h-1/2 absolute left-0 right-0 top-0 bottom-0 m-auto hidden -z-10"
            : "w-1/2 h-[55%] absolute left-0 right-0 top-0 bottom-0 m-auto z-20 "
        }
      >
        <div className=" bg-white max-h-[300px] w-full m-auto h-full rounded-xl">
          <div className="flex justify-end pt-1 px-1">
            <AiOutlineClose
              className=" cursor-pointer"
              fill="#FF2400"
              onClick={closePaymentPopup}
            />
          </div>
          <h1 className="text-center text-xl font-semibold pb-1">
            Make Payment
          </h1>
          <div className=" m-auto max-w-[380px] min-w-[200px] px-9 pb-1">
            <label className="px-1 text-sm" htmlFor="Mop">
              Mode of Payment{" "}
              {errors.Mop && (
                <span className="text-red-600 text-lg font-bold"> * </span>
              )}
            </label>
            <select
              value={paymentData.Mop}
              onChange={handleChangePayment}
              id="Mop"
              name="Mop"
              className="border-b-2 outline-none w-full pl-1"
            >
              <option value=""></option>
              <option value="Cash">Cash</option>
              <option value="Online">Online</option>
              <option value="HMO">HMO</option>
            </select>
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
              value={paymentData.date}
              onChange={handleChangePayment}
            />
          </div>
          <div className=" m-auto max-w-[380px] min-w-[200px] px-9 pb-1">
            <h2 className="text-sm">Dentist</h2>
            <div className="flex justify-between">
              <h3 className="">{`Dr. ${paymentData.handledBy.lastName}, ${paymentData.handledBy.firstName}`}</h3>
            </div>
            <div className="border-b-2"></div>
          </div>
          <div className="flex justify-center pt-8">
            <button
              className="bg-[#1993c6] px-14 py-1 rounded-full text-white outline-none font-medium text-lg"
              onClick={() => makePayment(paymentData)}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      <div
        className={
          !paymentPopup
            ? "w-full h-full bg-slate-300 opacity-80 absolute top-0 hidden"
            : "w-full h-full bg-slate-300 opacity-80 absolute top-0 z-10"
        }
      ></div>
    </div>
  );
};

export default TreamentRecords;
