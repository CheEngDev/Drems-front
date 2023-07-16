import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { paginate } from "./utils/paginate";
import {
  AiOutlineClose,
  AiFillCaretDown,
  AiOutlineRollback,
} from "react-icons/ai";
import { BiPlusMedical } from "react-icons/bi";
import { BsCashCoin } from "react-icons/bs";
import { GrView } from "react-icons/gr";
import _ from "lodash";
import dayjs from "dayjs";
import Joi from "joi";
import axios from "axios";
import avatar from "../assets/avatar.png";
import Pagination from "./common/pagination";
import DentistList from "./common/dentistlistpopup";
import ProcedureList from "./common/procedurespopup";
import dental from "../assets/dental.png";
import medicalhistory from "../assets/medical-report.png";
import payment from "../assets/payment.png";
import TreamentRecords from "./treatmentrec";
import MedicalHistory from "./medicalhistory";
import PxPayment from "./pxpayments";
import DentalChart from "./common/dentalChart";
import DentalChartPrev from "./common/dentalChartPrevCase";
import http from "../services/httpService";
import treatmentRecService from "../services/treatmentRecService";
import medHisService from "../services/medHisService";
import paymentService from "../services/paymentService";
import pxListContext from "../context/pxListContext";
import assocDentContext from "../context/assocDentContext";
import UserContext from "../context/userContext";
import procedureContext from "../context/procedureContext";
import hmoContext from "../context/hmoContext";

const Patient = (props) => {
  // New Datas Connected to Backend or Context
  const patientContext = useContext(pxListContext);
  const pxs = patientContext.pxs;
  const assocdentContext = useContext(assocDentContext);
  const associate = assocdentContext.associate;
  const userContext = useContext(UserContext);
  const user = userContext.user;
  const procContext = useContext(procedureContext);
  const procedures = procContext.procedures;
  const hmocontext = useContext(hmoContext);
  const companies = hmocontext.companies;

  // // Selected Patient
  const { id } = useParams();

  const selectedPx = pxs.filter((p) => p._id == id);

  // States
  const [currentPage, setPage] = useState(0);
  const [currentPagePay, setPagePay] = useState(0);
  const [currentPageMH, setPageMH] = useState(0);
  const [pageSize] = useState(9);
  const [pageSizeMH] = useState(3);
  const [selectedTreatments, setTreatmentrec] = useState([]);
  const [trorpay, setTrorpay] = useState(true);
  const [addData, setaddData] = useState(false);
  // Pop up for TR or Med His
  const [selectedTr, setSelectedTr] = useState(true);
  const [selectedMedHis, setSelectedMedHis] = useState(false);
  // Img Preview
  const [prevImage, setPrevImg] = useState("");
  // Img Uploaed
  const [medhisImg, setmedhisImg] = useState("");
  // Pop up for Selection of Tooth Number
  const [dentalChart, setDentalChart] = useState(false);
  const [selectedTooth, setSelectedTooth] = useState("");
  // Pop up for Selection of Dentist
  const [dentistList, setDentistList] = useState(false);
  // Pop up for Selection of Procedure
  const [procedureList, setProcedureList] = useState(false);
  // TR Data
  const [trData, setTRData] = useState({
    _id: "",
    dentist: "",
    teeth: "",
    handledby: "",
    procedure: "",
    date: "",
    notes: "",
    paid: "",
    patient: id,
  });
  // Pop up for Treatment record View details
  const [viewDets, setViewDets] = useState(false);
  // Adding or Editing?
  const [addoredit, setAddorEdit] = useState("");
  // Make Payments Pop up
  const [makepayment, setMakepayment] = useState(false);
  // Payments
  const [selectedPayments, setselectedPayments] = useState([]);
  // Payment Data
  const [paymentData, setPaymentData] = useState({
    _id: "",
    dentist: "",
    mop: "",
    treatment: "",
    company: "",
    date: "",
    company: "",
    handledby: "",
  });
  // View Payment Details
  const [viewPaymentDets, setViewPaymentDets] = useState(false);
  // Selected Medical History
  const [selectedMedicalHis, setSelectedMedicalHis] = useState([]);
  // Medical History Data
  const [medHisData, setmedHisData] = useState({
    _id: "",
    caption: "",
    date: "",
    pxPhotoUrl: "",
    patient: id,
  });
  // View Med His Details
  const [viewmhDets, setViewmhDets] = useState(false);
  // Errors
  const [errorsTr, setErrorsTr] = useState({});
  const [errorsPay, setErrorsPay] = useState({});
  const [errorsMedHis, setErrorsMedHis] = useState({});
  // Selected Tooth of Prev Case
  const [teeth, setTeeth] = useState(0);
  // get Treatments in backend
  async function getTreatmentRec() {
    const result = await treatmentRecService.getTreatmentRec();
    const selected = result.data.filter((r) => r.patient._id == id);

    setTreatmentrec(selected);
  }

  // get Payments in backend
  async function getPayments() {
    const result = await paymentService.getPayments();

    const selected = result.data.filter((r) => r.treatment.patient == id);
    setselectedPayments(selected);
  }

  // get Medical History in backend
  async function getMedHis() {
    const result = await medHisService.getMedHis();

    const selected = result.data.filter((r) => r.patient == id);
    setSelectedMedicalHis(selected);
  }

  // useeffect
  useEffect(() => {
    getTreatmentRec();
    getPayments();
    getMedHis();
  }, []);
  // Sorting
  let sortedTr = _.orderBy(selectedTreatments, "date", "desc");
  // Pagination
  let pagpxs = paginate(sortedTr, currentPage, pageSize);

  let pagpay = paginate(selectedPayments, currentPagePay, pageSize);

  let pagmh = paginate(selectedMedicalHis, currentPageMH, pageSizeMH);
  console.log(pagpay);

  // Selected Teeth for prev case

  // Next Page TR
  function nextPage() {
    if (currentPage === Math.ceil(selectedTreatments.length / 9 - 1)) {
      setPage(0);
    } else {
      setPage(currentPage + 1);
    }
  }
  // Prev Page TR
  function prevPage() {
    if (currentPage === 0) return 0;
    setPage(currentPage - 1);
  }

  // Next Page Payment
  function nextPagePay() {
    if (currentPagePay === Math.ceil(selectedPayments.length / 9 - 1)) {
      setPagePay(0);
    } else {
      setPagePay(currentPagePay + 1);
    }
  }
  // Prev Page Payment
  function prevPagePay() {
    if (currentPagePay === 0) return 0;
    setPagePay(currentPagePay - 1);
  }

  // Next Page Med His
  function nextPageMH() {
    if (currentPageMH === Math.ceil(selectedMedicalHis.length / 3 - 1)) {
      setPageMH(0);
    } else {
      setPageMH(currentPageMH + 1);
    }
  }
  // Prev Page Med His
  function prevPageMH() {
    if (currentPageMH === 0) return 0;
    setPageMH(currentPageMH - 1);
  }

  // Selection Between Treatment Rec / Payments
  function handleSelectTR() {
    setTrorpay(true);
  }

  function handlePayment() {
    setTrorpay(false);
  }

  // Add a Data (TR,Med His)
  function handleAddData() {
    setaddData(true);
    setAddorEdit("add");
  }

  function handleCloseAddDataPopup() {
    setaddData(false);
    setSelectedMedHis(false);
    setSelectedTr(true);
    setPrevImg("");
    setAddorEdit("");
    setErrorsTr({});
    setTRData({
      _id: "",
      dentist: "",
      teeth: "",
      handledby: "",
      procedure: "",
      date: "",
      notes: "",
      paid: "",
      patient: id,
    });

    setmedHisData({
      _id: "",
      date: "",
      caption: "",
      pxPhotoUrl: "",
      patient: id,
    });
  }

  // Add TR or Med His Data Input Field
  function handleAddMedhis() {
    setSelectedMedHis(true);
    setSelectedTr(false);
  }

  function handleAddTR() {
    setSelectedTr(true);
    setSelectedMedHis(false);
  }
  // For Med His of Patient
  //Handle Uploading an Image / Preview Image
  function handleImageUpload(e) {
    const file = e.target.files[0];
    setmedhisImg(file);

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

  function closePrevImg() {
    setPrevImg("");
  }

  // Handle Upload in Cloudinary
  function handleImgUploadtoCloud() {
    const formData = new FormData();
    formData.append("file", medhisImg);
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

  // handle medhisDataChanges
  function handledMedHisDataChanges(e) {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;

    setmedHisData((prev) => {
      return { ...prev, [name]: value };
    });
  }

  // add MedHis
  async function addMedHis() {
    const errors = validateMedHis();
    setErrorsMedHis(errors || {});
    if (errors || prevImage === "") return;

    setaddData(false);
    const result = await handleImgUploadtoCloud();

    const record = medHisData;
    record.pxPhotoUrl = result;

    handleCloseAddDataPopup();
    setSelectedMedicalHis((oldArray) => [...oldArray, record]);

    const data = await medHisService.addMedHis(record);
  }

  // View Med His Details
  function handleViewMedHisDets(mh) {
    setmedHisData({
      _id: mh._id,
      caption: mh.caption,
      date: mh.date,
      pxPhotoUrl: mh.pxPhotoUrl,
      patient: id,
    });
    setViewmhDets(true);
  }

  // Close View MedHis Details
  function closeViewMedHisDets() {
    setViewmhDets(false);
  }

  // Delete MedHis
  async function deletedMedHis() {
    const medhis2 = pagmh.filter((mh) => mh._id !== medHisData._id);

    setViewmhDets(false);
    setSelectedMedicalHis(medhis2);
    console.log(medHisData);
    const result = await medHisService.deleteMedHis(medHisData);

    setmedHisData({
      _id: "",
      caption: "",
      date: "",
      pxPhotoUrl: "",
      patient: id,
    });
    console.log(result.data);
  }

  // Edit MedHis
  async function editMedHis() {
    const errors = validateMedHis();
    setErrorsMedHis(errors || {});
    console.log(errors);
    if (errors) return;

    const medhis = pagmh;
    let selectedmedhis = medhis.filter((t) => t._id === medHisData._id);
    const index = pagmh.indexOf(selectedmedhis[0]);
    medhis[index] = {
      _id: medHisData._id,
      caption: medHisData.caption,
      date: medHisData.date,
      pxPhotoUrl: medHisData.pxPhotoUrl,
      patient: id,
    };

    setSelectedMedicalHis(medhis);
    setViewmhDets(false);
    const data = medHisData;

    data.date = dayjs(medHisData.date).format("YYYY/MM/DD");
    const result = await medHisService.editMedHis(data);
  }

  // Tooth Selection Pop up
  function handleSelecttoothPopup() {
    setDentalChart(true);
    setViewDets(false);
  }

  function closeSelectToothPopup() {
    if (addoredit === "add") {
      setDentalChart(false);
    } else {
      setDentalChart(false);
      setViewDets(true);
    }
  }

  // Give me the tooth number
  function getToothNumber(toothnumber) {
    setSelectedTooth(toothnumber);
  }

  // Selected Tooth
  function submitChosenTooth() {
    setTRData((prev) => {
      return { ...prev, teeth: selectedTooth };
    });
    if (addoredit === "add") {
      setDentalChart(false);
    } else {
      setDentalChart(false);
      setViewDets(true);
    }
  }

  // Dentist List Pop up
  function handleDentistListPopup() {
    setDentistList(true);
    setaddData(false);
    setViewDets(false);
  }

  function closeDentistListPopup() {
    setDentistList(false);
    if (addoredit === "add") {
      setaddData(true);
    } else {
      setViewDets(true);
    }
  }

  function choosenDentist(dentist) {
    let parseddentist = JSON.parse(dentist);
    setTRData((prev) => {
      return { ...prev, handledby: parseddentist };
    });
    setDentistList(false);
    if (addoredit === "add") {
      setaddData(true);
    } else {
      setViewDets(true);
    }
  }

  // Procedure List Pop up
  function handleProcedureList() {
    setProcedureList(true);
    setaddData(false);
    setViewDets(false);
  }
  function closeProcedureList() {
    setProcedureList(false);
    if (addoredit === "add") {
      setaddData(true);
    } else {
      setViewDets(true);
    }
  }
  function choosenProcedure(proc) {
    let parsedprocedure = JSON.parse(proc);
    setTRData((prev) => {
      return { ...prev, procedure: parsedprocedure };
    });
    setProcedureList(false);
    if (addoredit === "add") {
      setaddData(true);
    } else {
      setViewDets(true);
    }
  }
  // Tr Data onChange
  function handleTrDataChange(e) {
    let value = e.currentTarget.value;
    let name = e.currentTarget.name;
    setTRData((prev) => {
      return { ...prev, [name]: value };
    });
  }

  // Add Treatment Record to backend
  async function addTreatmentRec() {
    const data = {
      _id: trData._id,
      dentist: trData.dentist._id,
      teeth: trData.teeth,
      handledby: trData.handledby._id,
      procedure: trData.procedure._id,
      date: dayjs(trData.date).format("YYYY/MM/DD"),
      notes: trData.notes,
      paid: trData.paid,
      patient: id,
    };

    const errors = validateTr(data);
    setErrorsTr(errors || {});

    if (errors) return;

    const result = await treatmentRecService.addTreatmentRec(data);

    setTreatmentrec((oldArray) => [...oldArray, result.data[0]]);

    setaddData(false);
    setTRData({
      _id: "",
      dentist: "",
      teeth: "",
      handledby: "",
      procedure: "",
      date: "",
      notes: "",
      paid: "",
      patient: id,
    });
  }

  // View Dets Pop up
  function handleViewDetsPopup(tr) {
    setViewDets(true);
    setTRData({
      _id: tr._id,
      dentist: tr.dentist,
      teeth: tr.teeth,
      handledby: tr.handledby,
      procedure: tr.procedure,
      date: dayjs(tr.date).format("YYYY-MM-DD"),
      notes: tr.notes,
      paid: tr.paid,
      patient: tr.patient,
    });
    setAddorEdit("edit");
  }
  // Close View Dets
  function closeViewDetsPopup() {
    setViewDets(false);
    setTRData({
      _id: "",
      dentist: "",
      teeth: "",
      handledby: "",
      procedure: "",
      date: "",
      notes: "",
      paid: "",
      patient: "",
    });
    setAddorEdit("");
  }
  // Delete TreatmentRec
  async function deleteTreatmentRec() {
    const treatmentrec2 = selectedTreatments.filter(
      (tr) => tr._id !== trData._id
    );

    setViewDets(false);
    setTreatmentrec(treatmentrec2);
    const result = await treatmentRecService.deletedTreatmentRec(trData);

    setTRData({
      _id: "",
      dentist: "",
      teeth: "",
      handledby: "",
      procedure: "",
      date: "",
      notes: "",
      paid: "",
      patient: "",
    });
  }

  // Edit Treatment Record
  async function editTreatmentRec() {
    const treatment2 = selectedTreatments;
    let selectedtr = treatment2.filter((t) => t._id === trData._id);
    const index = selectedTreatments.indexOf(selectedtr[0]);
    treatment2[index] = {
      _id: trData._id,
      dentist: trData.dentist,
      teeth: trData.teeth,
      handledby: trData.handledby,
      procedure: trData.procedure,
      date: dayjs(trData.date).format("YYYY-MM-DD"),
      notes: trData.notes,
      paid: trData.paid,
      patient: id,
    };

    setTreatmentrec(treatment2);
    setViewDets(false);
    const data = trData;
    data.handledby = trData.handledby._id;
    data.procedure = trData.procedure._id;
    data.date = dayjs(trData.date).format("YYYY/MM/DD");
    const result = await treatmentRecService.editTreatmentRec(data);
  }

  // Make Payment pop up
  function handlemakePaymentPopup(tr) {
    setTRData({
      _id: tr._id,
      dentist: tr.dentist,
      teeth: tr.teeth,
      handledby: tr.handledby,
      procedure: tr.procedure,
      date: dayjs(tr.date).format("YYYY-MM-DD"),
      notes: tr.notes,
      paid: tr.paid,
      patient: tr.patient,
    });
    setPaymentData({
      _id: "",
      dentist: tr.dentist._id,
      mop: "",
      treatment: tr._id,
      company: "",
      date: "",
      handledby: tr.handledby._id,
    });
    setMakepayment(true);
  }

  function closePaymentPopup() {
    setMakepayment(false);
  }

  // Changes of Payment data
  function handlePaymentDataChange(e) {
    let value = e.currentTarget.value;
    let name = e.currentTarget.name;
    setPaymentData((prev) => {
      return { ...prev, [name]: value };
    });
  }

  // Add Payment
  async function addpayment() {
    const errors = validatePayment();
    console.log(errors);
    if (paymentData.mop === "HMO") {
      if (paymentData.company === "") {
        errors.company = "Company not allowed to be empty";
      }
    }
    setErrorsPay(errors || {});

    if (errors) return;

    const data = paymentData;
    data.date = dayjs(paymentData.date).format("YYYY/MM/DD");
    if (data.mop === "Cash") {
      delete data.company;
      setMakepayment(false);

      const result = await paymentService.addPayment(data);

      setselectedPayments((oldArray) => [...oldArray, result.data]);
    } else if (data.mop === "Online") {
      delete data.company;
      setMakepayment(false);

      const result = await paymentService.addPayment(data);
      setselectedPayments((oldArray) => [...oldArray, result.data]);
    } else {
      setMakepayment(false);

      const result = await paymentService.addPayment(data);
      setselectedPayments((oldArray) => [...oldArray, result.data]);
    }
  }

  // View Payment Details Pop up
  function handleViewPaymentDets(payment) {
    setViewPaymentDets(true);
    setTRData({
      handledby: payment.handledby,
      procedure: payment.treatment.procedure,
    });
    setPaymentData({
      _id: payment._id,
      dentist: payment.dentist,
      mop: payment.mop,
      treatment: payment.treatment._id,
      date: dayjs(payment.date).format("YYYY-MM-DD"),
      handledby: payment.handledby._id,
    });
  }

  // Close Paymen Details Pop up
  function closePaymentDets() {
    setViewPaymentDets(false);
  }

  // Delete Payment
  async function deletePayment() {
    const paymentrec2 = selectedPayments.filter(
      (sp) => sp._id !== paymentData._id
    );
    setViewPaymentDets(false);
    setselectedPayments(paymentrec2);
    const result = await paymentService.deletePayment(paymentData);
    setTRData({
      _id: "",
      dentist: "",
      teeth: "",
      handledby: "",
      procedure: "",
      date: "",
      notes: "",
      paid: "",
      patient: "",
    });
  }

  // Schemas
  // Treatment record Error handling
  const trSchema = Joi.object({
    teeth: Joi.number().required(),
    handledby: Joi.string().required(),
    procedure: Joi.string().required(),
    date: Joi.date().required(),
    notes: Joi.string().required(),
  }).options({ stripUnknown: true });

  function validateTr(data) {
    const result = trSchema.validate(data, { abortEarly: false });
    if (!result.error) return null;

    const errors = {};

    for (let item of result.error.details) {
      errors[item.path[0]] = item.message;
    }

    return errors;
  }

  // Payment Error Handling
  const paySchema = Joi.object({
    mop: Joi.string().valid("Cash", "HMO", "Online").required(),
    date: Joi.date().required(),
  }).options({ stripUnknown: true });

  function validatePayment() {
    const result = paySchema.validate(paymentData, { abortEarly: false });
    if (!result.error) return null;

    const errors = {};

    for (let item of result.error.details) {
      errors[item.path[0]] = item.message;
    }

    return errors;
  }

  // Medical History Error Handling
  const medhisSchema = Joi.object({
    date: Joi.date().required(),
    caption: Joi.string().required(),
  }).options({ stripUnknown: true });

  function validateMedHis() {
    const result = medhisSchema.validate(medHisData, { abortEarly: false });
    if (!result.error) return null;

    const errors = {};

    for (let item of result.error.details) {
      errors[item.path[0]] = item.message;
    }

    return errors;
  }

  return selectedPx[0] ? (
    <div className="md:grid w-full mx-1">
      {/* /Mobile */}
      <div className="pt-14 mr-2 md:hidden">
        {/* Patient Gen Info */}
        <div className="bg-[#5552d3] rounded-2xl w-full py-2   ">
          <div className="flex items-center justify-evenly h-full px-2">
            <div className="flex items-center h-full">
              <img
                className="w-[60px] h-[60px] rounded-full"
                src={avatar}
                alt=""
              />
              <div>
                <div>
                  <div className="text-lg text-white w-[220px] font-semibold px-2">
                    {selectedPx[0].lastName}, {selectedPx[0].firstName}
                  </div>
                  <div className="text-white lg:text-sm  md:text-xs px-2">
                    {selectedPx[0].age} yrs old, {selectedPx[0].sex} <br /> Last
                    Visit:{" "}
                    {dayjs(selectedPx[0].lastVisit).format("MMM/DD/YYYY")}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#4b49d3] p-2 mr-6 rounded-xl ">
              <BiPlusMedical
                size={20}
                fill="white"
                className="cursor-pointer"
                onClick={handleAddData}
              />
            </div>
          </div>
        </div>
        {/* Prev Case */}
        <div className="bg-[#1b1f24]  auto-cols-fr col-span-2 row-span-3  rounded-2xl my-2 pt-2">
          <div className="  flex justify-evenly px-2">
            <div className="text-white text-sm w-[40%]">
              <h2 className=" font-bold text-xl mb-2 ">Previous Case</h2>
              <p className="pb-1 md:text-xs lg:text-base">
                Tooth No.{" "}
                <span className="lg:text-lg md:text-base font-medium ">
                  {sortedTr[0] ? sortedTr[0].teeth : "None"}
                </span>
              </p>

              <p className="pb-1 md:text-xs lg:text-base">
                Procedure <br />-{" "}
                <span className=" font-medium ">
                  {sortedTr[0] ? sortedTr[0].procedure.name : "None"}
                </span>
              </p>

              <p className="pb-1 md:text-xs lg:text-base">
                Dentist <br /> -{" "}
                <span className=" font-medium ">
                  {sortedTr[0]
                    ? `Dr. ${sortedTr[0].handledby.lastName}`
                    : "None"}
                </span>
              </p>

              <p className="pb-1 md:text-xs lg:text-base">
                Comment <br />
                <span className=" font-medium pl-2 whitespace-pre-wrap">
                  - {sortedTr[0] ? sortedTr[0].notes : "None"}
                </span>
              </p>
              <p></p>
            </div>
            <div className="min-w-[40%]">
              <DentalChartPrev case={sortedTr[0]} />
            </div>
          </div>
          <div className="border-b-2 border-white pt-2"></div>
          <div className="p-2">
            <h2 className="text-white text-lg font-semibold ">
              Medical History
            </h2>
            <div className="border-b-2 border-white"></div>
            <table className=" border-collapse w-full">
              <thead className="border-b-2 text-sm text-white">
                <tr className="text-xs font-light">
                  <th className="font-medium text-left">Photo</th>
                  <th className="font-medium text-left">Caption</th>
                  <th className="font-medium text-left">Date</th>
                  <th className="font-medium text-left"></th>
                </tr>
              </thead>
              <tbody>
                {pagmh.map((mh) => (
                  <tr className="text-sm text-white border-b-2">
                    <td className="py-1">
                      <img
                        className="w-[60px] h-[60px] rounded-xl cursor-pointer"
                        onClick={() => handleViewMedHisDets(mh)}
                        src={mh.pxPhotoUrl}
                        alt=""
                      />
                    </td>
                    <td className=" pr-2">{mh.caption}</td>
                    <td>{dayjs(mh.date).format("MMM/DD/YYYY")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
              itemsCount={selectedMedicalHis.length}
              pageS={pageSizeMH}
              currentPage={currentPageMH}
              pxsonpage={pagmh.length}
              prevbt={prevPageMH}
              nextbt={nextPageMH}
            />
          </div>
        </div>
        {/* Treatment and Payment Recs */}
        <div className="bg-[#1b1f24] col-span-2 row-span-2 mb-2 rounded-2xl p-2 ">
          <div className="flex justify-evenly text-sm">
            <h2
              className={
                trorpay
                  ? "text-white font-semibold text-lg cursor-pointer"
                  : "text-white font-semibold hover:text-lg cursor-pointer"
              }
              onClick={handleSelectTR}
            >
              Treatment Records
            </h2>
            <h2
              className={
                !trorpay
                  ? "text-white font-semibold text-lg cursor-pointer"
                  : "text-white font-semibold hover:text-lg cursor-pointer"
              }
              onClick={handlePayment}
            >
              Payment Records
            </h2>
          </div>

          <div className="border-b-2 border-white"></div>
          {trorpay ? (
            <div>
              <table className=" border-collapse w-full">
                <thead className="border-b-2 text-sm text-white">
                  <tr className="text-xs font-light">
                    <th className="font-medium text-left">Tooth No.</th>
                    <th className="font-medium text-left">Procedure</th>
                    <th className="font-medium text-left">Date</th>
                    <th className="font-medium text-left"></th>
                    <th className="font-medium text-left"></th>
                  </tr>
                </thead>
                <tbody>
                  {pagpxs.map((tr) => (
                    <tr key={tr._id} className="text-sm text-white border-b-2">
                      <td className="px-2">{tr.teeth}</td>
                      <td className="">{tr.procedure.name}</td>
                      <td>{dayjs(tr.date).format("MMM/DD/YYYY")}</td>
                      <td>
                        {tr.paid ? (
                          "Paid"
                        ) : (
                          <BsCashCoin
                            size={20}
                            className="m-1 translate-y-1 cursor-pointer "
                            onClick={() => handlemakePaymentPopup(tr)}
                          />
                        )}
                      </td>

                      <td className="md:inline lg:hidden">
                        <button
                          className="p-1  bg-[#5552d3] rounded-3xl my-1"
                          onClick={() => handleViewDetsPopup(tr)}
                        >
                          <GrView />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination
                itemsCount={selectedTreatments.length}
                pageS={pageSize}
                currentPage={currentPage}
                pxsonpage={pagpxs.length}
                prevbt={prevPage}
                nextbt={nextPage}
              />
            </div>
          ) : (
            <div>
              <div></div>
              <table className=" border-collapse w-full">
                <thead className="border-b-2 text-sm text-white">
                  <tr className="text-xs font-light">
                    <th className="font-medium text-left">Procedure</th>
                    <th className="font-medium text-left">Amount</th>
                    <th className="font-medium text-left">Payment Date</th>
                    <th className="font-medium text-left md:hidden lg:block">
                      MOP
                    </th>
                    <th className="font-medium text-left"></th>
                  </tr>
                </thead>
                <tbody>
                  {pagpay.map((p) => (
                    <tr className="text-sm text-white border-b-2">
                      <td className="">{p.treatment.procedure.name}</td>
                      <td className="">
                        Php {p.treatment.procedure.amount}.00
                      </td>
                      <td>{dayjs(p.date).format("MMM/DD/YYYY")}</td>
                      <td className="md:hidden lg:inline-block">{p.mop}</td>

                      <td className="md:inline lg:hidden">
                        <button
                          className="p-1  bg-[#5552d3] rounded-3xl my-1"
                          onClick={() => handleViewPaymentDets(p)}
                        >
                          <GrView />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination
                itemsCount={selectedPayments.length}
                pageS={pageSize}
                currentPage={currentPagePay}
                pxsonpage={pagpay.length}
                prevbt={prevPagePay}
                nextbt={nextPagePay}
              />
            </div>
          )}
        </div>
        {/* Add TR or Med His Pop up */}
        <div
          className={
            !addData
              ? "w-1/2 h-1/2 absolute left-0 right-0 top-0 bottom-0 m-auto hidden -z-10"
              : "w-[85%] h-[70%] absolute left-0 right-0 top-0 bottom-0 m-auto z-20"
          }
        >
          <div className="bg-white rounded-xl h-[450px]">
            <div className="flex justify-end pt-1 pr-2 ">
              <AiOutlineClose
                className="hover:cursor-pointer"
                size={20}
                fill="#FF2400"
                onClick={handleCloseAddDataPopup}
              />
            </div>
            <div className="text-center tracking-wider font-medium mb-2">
              Add Patient Dental Informations
            </div>

            <div className="flex justify-evenly text-white">
              <button
                className="bg-[#5552d3] text-sm p-1 px-2 rounded-xl"
                onClick={handleAddTR}
              >
                Treatment Record
              </button>
              <button
                className="bg-[#5552d3] p-1 text-sm px-2 rounded-xl"
                onClick={handleAddMedhis}
              >
                Medical History
              </button>
            </div>
            {/* Adding A New Treatment Record */}
            {selectedTr ? (
              <div className="pt-3 mr-3">
                <div className=" m-auto max-w-[380px] min-w-[200px] px-9 pb-1">
                  <h2 className="text-sm">
                    Tooth Number
                    {errorsTr.teeth && (
                      <span className="text-red-600 text-lg font-bold">
                        {" "}
                        *{" "}
                      </span>
                    )}
                  </h2>
                  <div className="flex justify-between">
                    {!trData.teeth ? (
                      <h3 className="text-gray-300">Tooth Number</h3>
                    ) : (
                      <h3 className="text-xl mx-2">{trData.teeth}</h3>
                    )}

                    <AiFillCaretDown
                      className="translate-y-1 cursor-pointer"
                      fill="#ddd8db"
                      onClick={handleSelecttoothPopup}
                    />
                  </div>
                  <div className="border-b-2"></div>
                </div>
                <div className=" m-auto max-w-[380px] min-w-[200px] px-9 pb-1">
                  <h2 className="text-sm">
                    Dentist{" "}
                    {errorsTr.handledby && (
                      <span className="text-red-600 text-lg font-bold">
                        {" "}
                        *{" "}
                      </span>
                    )}
                  </h2>
                  <div className="flex justify-between">
                    {!trData.handledby ? (
                      <h3 className="text-gray-300">Dentist</h3>
                    ) : (
                      <h3 className="">{`Dr. ${trData.handledby.lastName}, ${trData.handledby.firstName}`}</h3>
                    )}

                    <AiFillCaretDown
                      className="translate-y-1 cursor-pointer"
                      fill="#ddd8db"
                      onClick={handleDentistListPopup}
                    />
                  </div>
                  <div className="border-b-2"></div>
                </div>
                <div className=" m-auto max-w-[380px] min-w-[200px] px-9 pb-1">
                  <h2 className="text-sm">
                    Procedure
                    {errorsTr.procedure && (
                      <span className="text-red-600 text-lg font-bold">
                        {" "}
                        *{" "}
                      </span>
                    )}
                  </h2>
                  <div className="flex justify-between">
                    {!trData.procedure ? (
                      <h3 className="text-gray-300">Procedure</h3>
                    ) : (
                      <h3 className="">{`${trData.procedure.name} -- ${trData.procedure.amount}`}</h3>
                    )}

                    <AiFillCaretDown
                      className="translate-y-1 cursor-pointer"
                      fill="#ddd8db"
                      onClick={handleProcedureList}
                    />
                  </div>
                  <div className="border-b-2"></div>
                </div>
                <div className=" m-auto max-w-[380px] min-w-[200px] px-9 pb-1">
                  <label className="text-sm" htmlFor="dates">
                    Date{" "}
                    {errorsTr.date && (
                      <span className="text-red-600 text-lg font-bold">
                        {" "}
                        *{" "}
                      </span>
                    )}
                  </label>
                  <input
                    className="border-b-2 outline-none  w-full pl-2 b"
                    id="dates"
                    type="date"
                    name="date"
                    value={trData.date}
                    onChange={handleTrDataChange}
                  />
                </div>
                <div className=" m-auto max-w-[380px] min-w-[200px] px-9 pb-1">
                  <label className="text-sm" htmlFor="dates">
                    Note
                    {errorsTr.notes && (
                      <span className="text-red-600 text-lg font-bold">
                        {" "}
                        *{" "}
                      </span>
                    )}
                  </label>
                  <input
                    className="border-b-2 outline-none  w-full pl-2 b"
                    id="notes"
                    type="string"
                    name="notes"
                    value={trData.notes}
                    onChange={handleTrDataChange}
                  />
                </div>
                <div className="flex justify-center pt-3  ">
                  <button
                    className="bg-[#5552d3] px-14 py-1 rounded-full text-white outline-none font-medium text-lg"
                    onClick={addTreatmentRec}
                  >
                    Submit
                  </button>
                </div>
              </div>
            ) : (
              <div></div>
            )}
            {/* Adding Med his*/}
            {selectedMedHis ? (
              <div className="pt-3 mr-3">
                <div className=" m-auto flex justify-center px-9 ">
                  {prevImage ? (
                    <div className="w-[100px] ">
                      <div className="flex justify-end translate-y-[12px] ">
                        <AiOutlineClose
                          className="hover:cursor-pointer"
                          size={12}
                          fill="#FF2400"
                          onClick={closePrevImg}
                        />
                      </div>

                      <img
                        className="w-[100px] h-[100px]"
                        src={prevImage}
                        alt=""
                      />
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
                <div
                  className={
                    prevImage === ""
                      ? " text-center px-9 pb-3 text-red-500"
                      : "hidden"
                  }
                >
                  Please upload an image
                </div>
                <div className=" m-auto max-w-[270px] min-w-[200px] px-9 pb-1 mt-2">
                  <input
                    className="max-w-[250px]"
                    type="file"
                    accept="image/"
                    onChange={(e) => handleImageUpload(e)}
                  ></input>
                </div>
                <div className=" m-auto max-w-[380px] min-w-[200px] px-9 pb-1">
                  <label className="" htmlFor="dates">
                    Date{" "}
                    {errorsMedHis.date && (
                      <span className="text-red-600 text-lg font-bold">
                        {" "}
                        *{" "}
                      </span>
                    )}
                  </label>
                  <input
                    className="border-b-2 outline-none w-full  b"
                    id="dates"
                    type="date"
                    name="date"
                    value={medHisData.date}
                    onChange={handledMedHisDataChanges}
                  />
                </div>
                <div className=" m-auto max-w-[380px] min-w-[200px] px-9 pb-1 ">
                  <label className="" htmlFor="caption">
                    Caption
                    {errorsMedHis.caption && (
                      <span className="text-red-600 text-lg font-bold">*</span>
                    )}
                  </label>
                  <input
                    className="border-b-2 outline-none  w-full pl-2 b"
                    id="caption"
                    type="string"
                    name="caption"
                    value={medHisData.caption}
                    onChange={handledMedHisDataChanges}
                  />

                  <div className="flex justify-center pt-3  ">
                    <button
                      className="bg-[#5552d3] px-14 py-1 rounded-full text-white outline-none font-medium text-lg"
                      onClick={addMedHis}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
        {/* Select Tooth */}
        <div
          className={
            !dentalChart
              ? "w-1/2 h-1/2 absolute left-0 right-0 top-0 bottom-0 m-auto hidden -z-10"
              : "w-[85%] h-[70%] absolute left-0 right-0 top-0 bottom-0 m-auto z-20"
          }
        >
          <div className="bg-white rounded-xl h-[450px]">
            <AiOutlineRollback
              className="cursor-pointer translate-x-1 translate-y-1"
              size={20}
              onClick={closeSelectToothPopup}
            />
            <div className="text-center text-2xl font-semibold tracking-widest">
              Select a Tooth
            </div>
            <div className="flex justify-center mt-3">
              <DentalChart toothNum={getToothNumber} />
            </div>
            <div className="text-center pt-2">
              <div className="font-semibold">Tooth Number </div>
              <div className="text-xl">{selectedTooth}</div>
            </div>
            <div className="flex justify-center pt-3  ">
              <button
                className="bg-[#5552d3] px-14 py-1 rounded-full text-white outline-none font-medium text-lg"
                onClick={submitChosenTooth}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
        {/* Select Dentist */}
        <div
          className={
            !dentistList
              ? "w-1/2 h-1/2 absolute left-0 right-0 top-0 bottom-0 m-auto hidden -z-10"
              : "w-[85%] h-[70%] absolute left-0 right-0 top-0 bottom-0 m-auto z-20"
          }
        >
          <DentistList
            dentists={associate}
            back={closeDentistListPopup}
            chosenDentist={choosenDentist}
          />
        </div>
        {/* Select Procedure */}
        <div
          className={
            !procedureList
              ? "w-1/2 h-1/2 absolute left-0 right-0 top-0 bottom-0 m-auto hidden -z-10"
              : "w-[85%] h-[70%] absolute left-0 right-0 top-0 bottom-0 m-auto z-20"
          }
        >
          <ProcedureList
            procedures={procedures}
            back={closeProcedureList}
            chosenProc={choosenProcedure}
          />
        </div>
        {/* Edit TR */}
        <div
          className={
            !viewDets
              ? "w-1/2 h-1/2 absolute left-0 right-0 top-0 bottom-0 m-auto hidden -z-10"
              : "w-[90%] h-[70%] absolute left-0 right-0 top-0 bottom-0 m-auto z-20"
          }
        >
          <div className="bg-white rounded-xl h-[450px]">
            <div className="flex justify-end pt-1 pr-2 ">
              <AiOutlineClose
                className="hover:cursor-pointer"
                size={20}
                fill="#FF2400"
                onClick={closeViewDetsPopup}
              />
            </div>
            <div className="pt-3 ">
              <div className="text-center text-xl tracking-widest mb-4 font-semibold">
                Edit or Delete Record
              </div>
              <div className=" m-auto max-w-[380px] min-w-[200px] px-9 pb-1">
                <h2 className="text-sm">
                  Tooth Number
                  {/* {errors.procedure && (
                    <span className="text-red-600 text-lg font-bold"> * </span>
                  )} */}
                </h2>
                <div className="flex justify-between">
                  {!trData.teeth ? (
                    <h3 className="text-gray-300">Tooth Number</h3>
                  ) : (
                    <h3 className="text-xl mx-2">{trData.teeth}</h3>
                  )}

                  <AiFillCaretDown
                    className="translate-y-1 cursor-pointer"
                    fill="#ddd8db"
                    onClick={handleSelecttoothPopup}
                  />
                </div>
                <div className="border-b-2"></div>
              </div>
              <div className=" m-auto max-w-[380px] min-w-[200px] px-9 pb-1">
                <h2 className="">
                  Dentist{" "}
                  {/* {errorsSalary.dentist && (
                    <span className="text-red-600 text-lg font-bold"> * </span>
                  )} */}
                </h2>
                <div className="flex justify-between">
                  {!trData.handledby ? (
                    <h3 className="text-gray-300">Dentist</h3>
                  ) : (
                    <h3 className="">{`Dr. ${trData.handledby.lastName}, ${trData.handledby.firstName}`}</h3>
                  )}

                  <AiFillCaretDown
                    className="translate-y-1 cursor-pointer"
                    fill="#ddd8db"
                    onClick={handleDentistListPopup}
                  />
                </div>
                <div className="border-b-2"></div>
              </div>
              <div className=" m-auto max-w-[380px] min-w-[200px] px-9 pb-1">
                <h2 className="text-sm">
                  Procedure
                  {/* {errors.procedure && (
                    <span className="text-red-600 text-lg font-bold"> * </span>
                  )} */}
                </h2>
                <div className="flex justify-between">
                  {!trData.procedure ? (
                    <h3 className="text-gray-300">Procedure</h3>
                  ) : (
                    <h3 className="">{`${trData.procedure.name} -- ${trData.procedure.amount}`}</h3>
                  )}

                  <AiFillCaretDown
                    className="translate-y-1 cursor-pointer"
                    fill="#ddd8db"
                    onClick={handleProcedureList}
                  />
                </div>
                <div className="border-b-2"></div>
              </div>
              <div className=" m-auto max-w-[380px] min-w-[200px] px-9 pb-1">
                <label className="text-sm" htmlFor="dates">
                  Date{" "}
                  {/* {errors.date && (
                    <span className="text-red-600 text-lg font-bold"> * </span>
                  )} */}
                </label>
                <input
                  className="border-b-2 outline-none  w-full pl-2 b"
                  id="dates"
                  type="date"
                  name="date"
                  value={trData.date}
                  onChange={handleTrDataChange}
                />
              </div>

              <div className=" m-auto max-w-[380px] min-w-[200px] px-9 pb-1">
                <label className="text-sm" htmlFor="dates">
                  Note
                  {/* {errors.date && (
                    <span className="text-red-600 text-lg font-bold"> * </span>
                  )} */}
                </label>
                <input
                  className="border-b-2 outline-none  w-full pl-2 b"
                  id="notes"
                  type="string"
                  name="notes"
                  value={trData.notes}
                  onChange={handleTrDataChange}
                />
              </div>
              <div className="flex justify-evenly pt-3  ">
                <button
                  className="bg-[#5552d3] px-11 py-1 rounded-full text-white outline-none font-medium "
                  onClick={editTreatmentRec}
                >
                  Submit
                </button>
                <button
                  className="bg-[#5552d3] px-11 py-1 rounded-full text-white outline-none font-medium "
                  onClick={deleteTreatmentRec}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          className={
            !makepayment
              ? "w-1/2 h-1/2 absolute left-0 right-0 top-0 bottom-0 m-auto hidden -z-10"
              : "w-[85%] h-[70%] absolute left-0 right-0 top-0 bottom-0 m-auto z-20"
          }
        >
          <div className="bg-white rounded-xl h-[450px]">
            <div className="flex justify-end pt-1 pr-2 ">
              <AiOutlineClose
                className="hover:cursor-pointer"
                size={20}
                fill="#FF2400"
                onClick={closePaymentPopup}
              />
            </div>
            <div className="pt-3 mr-3">
              <div className="text-center text-xl tracking-widest mb-4 font-semibold">
                Make Payment
              </div>
              <div className=" m-auto max-w-[380px] min-w-[200px] px-9 mb-2">
                <label className=" " htmlFor="startTime">
                  Mode of Payment
                  {errorsPay.mop && (
                    <span className="text-red-600 text-lg font-bold"> * </span>
                  )}
                </label>
                <select
                  value={paymentData.mop}
                  onChange={handlePaymentDataChange}
                  id="mop"
                  name="mop"
                  className="borderb-2 outline-none  w-full border-b-2"
                >
                  <option value=""></option>
                  <option value="Cash">Cash</option>
                  <option value="HMO">HMO</option>
                  <option value="Online">Online</option>
                </select>
              </div>
              {paymentData.mop === "HMO" ? (
                <div className=" m-auto max-w-[380px] min-w-[200px] px-9 mb-2">
                  <label className=" " htmlFor="startTime">
                    HMO Company
                    {errorsPay.company && (
                      <span className="text-red-600 text-lg font-bold">
                        {" "}
                        *{" "}
                      </span>
                    )}
                  </label>
                  <select
                    value={paymentData.company}
                    onChange={handlePaymentDataChange}
                    id="company"
                    name="company"
                    className="borderb-2 outline-none  w-full border-b-2"
                  >
                    <option value="none"></option>
                    {companies.map((comp) => (
                      <option value={comp._id}>{comp.name}</option>
                    ))}
                  </select>
                </div>
              ) : (
                ""
              )}
              <div className=" m-auto max-w-[380px] min-w-[200px] px-9 pb-2">
                <h2 className="">Dentist </h2>
                <div className="flex justify-between">
                  {!trData.handledby ? (
                    <h3 className="text-gray-300">Dentist</h3>
                  ) : (
                    <h3 className="">{`Dr. ${trData.handledby.lastName}, ${trData.handledby.firstName}`}</h3>
                  )}

                  <AiFillCaretDown className="translate-y-1 " fill="#ddd8db" />
                </div>
                <div className="border-b-2"></div>
              </div>
              <div className=" m-auto max-w-[380px] min-w-[200px] px-9 pb-2">
                <h2 className="">Procedure</h2>
                <div className="flex justify-between">
                  {!trData.procedure ? (
                    <h3 className="text-gray-300">Procedure</h3>
                  ) : (
                    <h3 className="">{`${trData.procedure.name} -- ${trData.procedure.amount}`}</h3>
                  )}

                  <AiFillCaretDown className="translate-y-1" fill="#ddd8db" />
                </div>
                <div className="border-b-2"></div>
              </div>
              <div className=" m-auto max-w-[380px] min-w-[200px] px-9 pb-1">
                <label className="" htmlFor="dates">
                  Date{" "}
                  {errorsPay.date && (
                    <span className="text-red-600 text-lg font-bold"> * </span>
                  )}
                </label>
                <input
                  className="border-b-2 outline-none  w-full  b"
                  id="dates"
                  type="date"
                  name="date"
                  value={paymentData.date}
                  onChange={handlePaymentDataChange}
                />
              </div>
              <div className="flex justify-center mt-8  ">
                <button
                  className="bg-[#5552d3] px-14 py-1 rounded-full text-white outline-none font-medium text-lg"
                  onClick={addpayment}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* View Payment dets */}
        <div
          className={
            !viewPaymentDets
              ? "w-1/2 h-1/2 absolute left-0 right-0 top-0 bottom-0 m-auto hidden -z-10"
              : "w-[85%] h-[70%] absolute left-0 right-0 top-0 bottom-0 m-auto z-20"
          }
        >
          <div className="bg-white rounded-xl h-[450px]">
            <div className="flex justify-end pt-1 pr-2 ">
              <AiOutlineClose
                className="hover:cursor-pointer"
                size={20}
                fill="#FF2400"
                onClick={closePaymentDets}
              />
            </div>
            <div className="pt-3 mr-3">
              <div className="text-center text-xl tracking-widest mb-4 font-semibold">
                Make Payment
              </div>
              <div className=" m-auto max-w-[380px] min-w-[200px] px-9 mb-2">
                <label className=" " htmlFor="startTime">
                  Mode of Payment
                  {/* {errors.startTime && (
                <span className="text-red-600 text-lg font-bold"> * </span>
              )} */}
                </label>
                <select
                  value={paymentData.mop}
                  onChange={handlePaymentDataChange}
                  id="mop"
                  name="mop"
                  className="borderb-2 outline-none  w-full border-b-2"
                >
                  <option value=""></option>
                  <option value="Cash">Cash</option>
                  <option value="HMO">HMO</option>
                  <option value="Online">Online</option>
                </select>
              </div>
              <div className=" m-auto max-w-[380px] min-w-[200px] px-9 pb-2">
                <h2 className="">
                  Dentist{" "}
                  {/* {errorsSalary.dentist && (
                    <span className="text-red-600 text-lg font-bold"> * </span>
                  )} */}
                </h2>
                <div className="flex justify-between">
                  {!trData.handledby ? (
                    <h3 className="text-gray-300">Dentist</h3>
                  ) : (
                    <h3 className="">{`Dr. ${trData.handledby.lastName}, ${trData.handledby.firstName}`}</h3>
                  )}

                  <AiFillCaretDown className="translate-y-1 " fill="#ddd8db" />
                </div>
                <div className="border-b-2"></div>
              </div>
              <div className=" m-auto max-w-[380px] min-w-[200px] px-9 pb-2">
                <h2 className="">
                  Procedure
                  {/* {errors.procedure && (
                    <span className="text-red-600 text-lg font-bold"> * </span>
                  )} */}
                </h2>
                <div className="flex justify-between">
                  {!trData.procedure ? (
                    <h3 className="text-gray-300">Procedure</h3>
                  ) : (
                    <h3 className="">{`${trData.procedure.name} -- ${trData.procedure.amount}`}</h3>
                  )}

                  <AiFillCaretDown className="translate-y-1" fill="#ddd8db" />
                </div>
                <div className="border-b-2"></div>
              </div>
              <div className=" m-auto max-w-[380px] min-w-[200px] px-9 pb-1">
                <label className="" htmlFor="dates">
                  Date{" "}
                  {/* {errors.date && (
                    <span className="text-red-600 text-lg font-bold"> * </span>
                  )} */}
                </label>
                <input
                  className="border-b-2 outline-none  w-full  b"
                  id="dates"
                  type="date"
                  name="date"
                  value={paymentData.date}
                  onChange={handlePaymentDataChange}
                />
              </div>
              <div className="flex justify-center mt-8  ">
                <button
                  className="bg-[#5552d3] px-14 py-1 rounded-full text-white outline-none font-medium text-lg"
                  onClick={deletePayment}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* View Med His Dets */}
        <div
          className={
            !viewmhDets
              ? "w-1/2 h-1/2 absolute left-0 right-0 top-0 bottom-0 m-auto hidden -z-10"
              : "w-[85%] h-[80%] absolute left-0 right-0 top-0 bottom-0 m-auto z-20"
          }
        >
          <div className="bg-white rounded-xl h-[480px]">
            <div className="flex justify-end pt-1 pr-2 ">
              <AiOutlineClose
                className="hover:cursor-pointer"
                size={20}
                fill="#FF2400"
                onClick={closeViewMedHisDets}
              />
            </div>

            <img
              className="w-[260px] h-[280px] m-auto rounded-2xl"
              src={medHisData.pxPhotoUrl}
              alt=""
            />
            <div className=" m-auto max-w-[400px] min-w-[200px] px-9 pb-3 ">
              <label className="text-sm" htmlFor="caption">
                Caption
                {errorsMedHis.caption && (
                  <span className="text-red-600 text-lg font-bold">*</span>
                )}
              </label>
              <input
                className="border-b-2 outline-none  w-full  b"
                id="caption"
                type="string"
                name="caption"
                value={medHisData.caption}
                onChange={handledMedHisDataChanges}
              />
            </div>
            <div className="flex justify-evenly pt-3  ">
              <button
                className="bg-[#5552d3] px-10  py-1 rounded-full text-white outline-none font-medium "
                onClick={editMedHis}
              >
                Submit
              </button>
              <button
                className="bg-[#5552d3] px-10 py-1 rounded-full text-white outline-none font-medium "
                onClick={deletedMedHis}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Large Screen */}
      <div className="hidden md:grid grid-cols-4 grid-rows-[100px_minmax(220px,_42%)_minmax(220px,_42%)] gap-1 w-full ">
        <div className="bg-[#5552d3] rounded-2xl col-span-2 mt-2   ">
          <div className="flex items-center justify-between h-full px-2">
            <div className="flex items-center h-full">
              <img
                className="lg:w-[60px] lg:h-[60px] md:w-[50px] md:h-[50px] rounded-full"
                src={avatar}
                alt=""
              />
              <div>
                <div>
                  <div className="lg:text-lg md:text-base text-white font-semibold px-2">
                    {selectedPx[0].lastName}, {selectedPx[0].firstName}
                  </div>
                  <div className="text-white lg:text-sm  md:text-xs px-2">
                    {selectedPx[0].age} yrs old, {selectedPx[0].sex},{" "}
                    {selectedPx[0].number}
                    <br /> Last Appointment:{" "}
                    {dayjs(selectedPx[0].lastVisit).format("MMM/DD/YYYY")}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#4b49d3] p-2 lg:mr-6 rounded-xl">
              <BiPlusMedical
                size={20}
                fill="white"
                className="cursor-pointer"
                onClick={handleAddData}
              />
            </div>
          </div>
        </div>
        <div className="bg-[#1b1f24]  auto-cols-fr col-span-2 row-span-3  rounded-2xl my-2 pt-2">
          <div className="  flex justify-evenly px-2">
            <div className="text-white text-sm w-[40%]">
              <h2 className=" font-bold lg:text-2xl md:text-xl mb-2 ">
                Previous Case
              </h2>
              <p className="pb-1 md:text-xs lg:text-base">
                Tooth No.{" "}
                <span className="lg:text-lg md:text-base font-medium ">
                  {sortedTr[0] ? sortedTr[0].teeth : "None"}
                </span>
              </p>

              <p className="pb-1 md:text-xs lg:text-base">
                Procedure <br />-{" "}
                <span className=" font-medium ">
                  {sortedTr[0] ? sortedTr[0].procedure.name : "None"}
                </span>
              </p>

              <p className="pb-1 md:text-xs lg:text-base">
                Dentist <br />-{" "}
                <span className=" font-medium ">
                  {sortedTr[0]
                    ? `Dr. ${sortedTr[0].handledby.lastName}`
                    : "None"}
                </span>
              </p>

              <p className="pb-1 md:text-xs lg:text-base">
                Comment <br />
                <span className=" font-medium pl-2 whitespace-pre-wrap">
                  - {sortedTr[0] ? sortedTr[0].notes : "None"}
                </span>
              </p>
              <p></p>
            </div>
            <div className="min-w-[40%]">
              <DentalChartPrev case={sortedTr[0]} />
            </div>
          </div>
          <div className="border-b-2 border-white pt-2"></div>
          <div className="p-2">
            <h2 className="text-white text-lg font-semibold ">
              Medical History
            </h2>
            <div className="border-b-2 border-white"></div>
            <table className=" border-collapse w-full">
              <thead className="border-b-2 text-sm text-white">
                <tr className="text-xs font-light">
                  <th className="font-medium text-left">Photo</th>
                  <th className="font-medium text-left">Caption</th>
                  <th className="font-medium text-left">Date</th>
                  <th className="font-medium text-left"></th>
                </tr>
              </thead>
              <tbody>
                {pagmh.map((mh) => (
                  <tr className="text-sm text-white border-b-2">
                    <td className="py-1">
                      <img
                        className="w-[60px] h-[60px] rounded-xl cursor-pointer"
                        onClick={() => handleViewMedHisDets(mh)}
                        src={mh.pxPhotoUrl}
                        alt=""
                      />
                    </td>
                    <td className=" pr-2">{mh.caption}</td>
                    <td>{dayjs(mh.date).format("MMM/DD/YYYY")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
              itemsCount={selectedMedicalHis.length}
              pageS={pageSizeMH}
              currentPage={currentPageMH}
              pxsonpage={pagmh.length}
              prevbt={prevPageMH}
              nextbt={nextPageMH}
            />
          </div>
        </div>

        <div className="bg-[#1b1f24] col-span-2 row-span-2 mb-2 rounded-2xl p-2 ">
          <div className="flex justify-evenly text-sm">
            <h2
              className={
                trorpay
                  ? "text-white font-semibold text-lg cursor-pointer"
                  : "text-white font-semibold hover:text-lg cursor-pointer"
              }
              onClick={handleSelectTR}
            >
              Treatment Records
            </h2>
            <h2
              className={
                !trorpay
                  ? "text-white font-semibold text-lg cursor-pointer"
                  : "text-white font-semibold hover:text-lg cursor-pointer"
              }
              onClick={handlePayment}
            >
              Payment Records
            </h2>
          </div>

          <div className="border-b-2 border-white"></div>
          {trorpay ? (
            <div>
              <table className=" border-collapse w-full">
                <thead className="border-b-2 text-sm text-white">
                  <tr className="text-xs font-light">
                    <th className="font-medium text-left">Tooth No.</th>
                    <th className="font-medium text-left">Procedure</th>
                    <th className="font-medium text-left">Date</th>
                    <th className="font-medium text-left"></th>
                    <th className="font-medium text-left"></th>
                  </tr>
                </thead>
                <tbody>
                  {pagpxs.map((tr) => (
                    <tr key={tr._id} className="text-sm text-white border-b-2">
                      <td className="px-2">{tr.teeth}</td>
                      <td className="">{tr.procedure.name}</td>
                      <td>{dayjs(tr.date).format("MMM/DD/YYYY")}</td>
                      <td>
                        {tr.paid ? (
                          "Paid"
                        ) : (
                          <BsCashCoin
                            size={20}
                            className="m-1 translate-y-1 cursor-pointer "
                            onClick={() => handlemakePaymentPopup(tr)}
                          />
                        )}
                      </td>
                      <td className="md:hidden lg:block">
                        <button
                          className="p-1 px-2 bg-[#5552d3] rounded-3xl my-1 translate-x-2"
                          onClick={() => handleViewDetsPopup(tr)}
                        >
                          View Details
                        </button>
                      </td>
                      <td className="md:inline lg:hidden">
                        <button
                          className="p-1  bg-[#5552d3] rounded-3xl my-1"
                          onClick={() => handleViewDetsPopup(tr)}
                        >
                          <GrView />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination
                itemsCount={selectedTreatments.length}
                pageS={pageSize}
                currentPage={currentPage}
                pxsonpage={pagpxs.length}
                prevbt={prevPage}
                nextbt={nextPage}
              />
            </div>
          ) : (
            <div>
              <div></div>
              <table className=" border-collapse w-full">
                <thead className="border-b-2 text-sm text-white">
                  <tr className="text-xs font-light">
                    <th className="font-medium text-left">Procedure</th>
                    <th className="font-medium text-left">Amount</th>
                    <th className="font-medium text-left">Payment Date</th>
                    <th className="font-medium text-left md:hidden lg:block">
                      MOP
                    </th>
                    <th className="font-medium text-left"></th>
                  </tr>
                </thead>
                <tbody>
                  {pagpay.map((p) => (
                    <tr className="text-sm text-white border-b-2">
                      <td className="">{p.treatment.procedure.name}</td>
                      <td className="">
                        Php {p.treatment.procedure.amount}.00
                      </td>
                      <td>{dayjs(p.date).format("MMM/DD/YYYY")}</td>
                      <td className="md:hidden lg:inline-block">{p.mop}</td>
                      <td className="md:hidden lg:inline-block">
                        <button
                          className="p-1 px-2 bg-[#5552d3] rounded-3xl my-1 translate-x-2"
                          onClick={() => handleViewPaymentDets(p)}
                        >
                          View Details
                        </button>
                      </td>
                      <td className="md:inline lg:hidden">
                        <button
                          className="p-1  bg-[#5552d3] rounded-3xl my-1"
                          onClick={() => handleViewPaymentDets(p)}
                        >
                          <GrView />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination
                itemsCount={selectedPayments.length}
                pageS={pageSize}
                currentPage={currentPagePay}
                pxsonpage={pagpay.length}
                prevbt={prevPagePay}
                nextbt={nextPagePay}
              />
            </div>
          )}
        </div>
        {/* Adding TR or MEd His Pop up */}
        <div
          className={
            !addData
              ? "w-1/2 h-1/2 absolute left-0 right-0 top-0 bottom-0 m-auto hidden -z-10"
              : "w-[40%] h-[70%] absolute left-0 right-0 top-0 bottom-0 m-auto z-20"
          }
        >
          <div className="bg-white rounded-xl h-[450px]">
            <div className="flex justify-end pt-1 pr-2 ">
              <AiOutlineClose
                className="hover:cursor-pointer"
                size={20}
                fill="#FF2400"
                onClick={handleCloseAddDataPopup}
              />
            </div>
            <div className="text-center text-lg tracking-wider font-medium mb-2">
              Add Patient Dental Informations
            </div>

            <div className="flex justify-evenly text-white">
              <button
                className="bg-[#5552d3] p-1 px-2 rounded-xl"
                onClick={handleAddTR}
              >
                Treatment Record
              </button>
              <button
                className="bg-[#5552d3] p-1 px-2 rounded-xl"
                onClick={handleAddMedhis}
              >
                Medical History
              </button>
            </div>
            {/* Adding A New Treatment Record */}
            {selectedTr ? (
              <div className="pt-3 mr-3">
                <div className=" m-auto max-w-[380px] min-w-[200px] px-9 pb-1">
                  <h2 className="text-sm">
                    Tooth Number
                    {errorsTr.teeth && (
                      <span className="text-red-600 text-lg font-bold">
                        {" "}
                        *{" "}
                      </span>
                    )}
                  </h2>
                  <div className="flex justify-between">
                    {!trData.teeth ? (
                      <h3 className="text-gray-300">Tooth Number</h3>
                    ) : (
                      <h3 className="text-xl mx-2">{trData.teeth}</h3>
                    )}

                    <AiFillCaretDown
                      className="translate-y-1 cursor-pointer"
                      fill="#ddd8db"
                      onClick={handleSelecttoothPopup}
                    />
                  </div>
                  <div className="border-b-2"></div>
                </div>
                <div className=" m-auto max-w-[380px] min-w-[200px] px-9 pb-1">
                  <h2 className="">
                    Dentist{" "}
                    {errorsTr.handledby && (
                      <span className="text-red-600 text-lg font-bold">
                        {" "}
                        *{" "}
                      </span>
                    )}
                  </h2>
                  <div className="flex justify-between">
                    {!trData.handledby ? (
                      <h3 className="text-gray-300">Dentist</h3>
                    ) : (
                      <h3 className="">{`Dr. ${trData.handledby.lastName}, ${trData.handledby.firstName}`}</h3>
                    )}

                    <AiFillCaretDown
                      className="translate-y-1 cursor-pointer"
                      fill="#ddd8db"
                      onClick={handleDentistListPopup}
                    />
                  </div>
                  <div className="border-b-2"></div>
                </div>
                <div className=" m-auto max-w-[380px] min-w-[200px] px-9 pb-1">
                  <h2 className="text-sm">
                    Procedure
                    {errorsTr.procedure && (
                      <span className="text-red-600 text-lg font-bold">
                        {" "}
                        *{" "}
                      </span>
                    )}
                  </h2>
                  <div className="flex justify-between">
                    {!trData.procedure ? (
                      <h3 className="text-gray-300">Procedure</h3>
                    ) : (
                      <h3 className="">{`${trData.procedure.name} -- ${trData.procedure.amount}`}</h3>
                    )}

                    <AiFillCaretDown
                      className="translate-y-1 cursor-pointer"
                      fill="#ddd8db"
                      onClick={handleProcedureList}
                    />
                  </div>
                  <div className="border-b-2"></div>
                </div>
                <div className=" m-auto max-w-[380px] min-w-[200px] px-9 pb-1">
                  <label className="text-sm" htmlFor="dates">
                    Date{" "}
                    {errorsTr.date && (
                      <span className="text-red-600 text-lg font-bold">
                        {" "}
                        *{" "}
                      </span>
                    )}
                  </label>
                  <input
                    className="border-b-2 outline-none  w-full pl-2 b"
                    id="dates"
                    type="date"
                    name="date"
                    value={trData.date}
                    onChange={handleTrDataChange}
                  />
                </div>
                <div className=" m-auto max-w-[380px] min-w-[200px] px-9 pb-1">
                  <label className="text-sm" htmlFor="dates">
                    Note
                    {errorsTr.notes && (
                      <span className="text-red-600 text-lg font-bold">
                        {" "}
                        *{" "}
                      </span>
                    )}
                  </label>
                  <input
                    className="border-b-2 outline-none  w-full pl-2 b"
                    id="notes"
                    type="string"
                    name="notes"
                    value={trData.notes}
                    onChange={handleTrDataChange}
                  />
                </div>
                <div className="flex justify-center pt-3  ">
                  <button
                    className="bg-[#5552d3] px-14 py-1 rounded-full text-white outline-none font-medium text-lg"
                    onClick={addTreatmentRec}
                  >
                    Submit
                  </button>
                </div>
              </div>
            ) : (
              <div></div>
            )}
            {/* Adding Med his*/}
            {selectedMedHis ? (
              <div className="pt-3 mr-3">
                <div className=" m-auto flex justify-center px-9 ">
                  {prevImage ? (
                    <div className="w-[100px] ">
                      <div className="flex justify-end translate-y-[12px] ">
                        <AiOutlineClose
                          className="hover:cursor-pointer"
                          size={12}
                          fill="#FF2400"
                          onClick={closePrevImg}
                        />
                      </div>

                      <img
                        className="w-[100px] h-[100px]"
                        src={prevImage}
                        alt=""
                      />
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
                <div
                  className={
                    prevImage === ""
                      ? " text-center px-9 pb-3 text-red-500"
                      : "hidden"
                  }
                >
                  Please upload an image
                </div>
                <div className=" m-auto max-w-[270px] min-w-[200px] px-9 pb-1 mt-2">
                  <input
                    className="max-w-[250px]"
                    type="file"
                    accept="image/"
                    onChange={(e) => handleImageUpload(e)}
                  ></input>
                </div>
                <div className=" m-auto max-w-[380px] min-w-[200px] px-9 pb-1">
                  <label className="" htmlFor="dates">
                    Date{" "}
                    {errorsMedHis.date && (
                      <span className="text-red-600 text-lg font-bold">
                        {" "}
                        *{" "}
                      </span>
                    )}
                  </label>
                  <input
                    className="border-b-2 outline-none w-full  b"
                    id="dates"
                    type="date"
                    name="date"
                    value={medHisData.date}
                    onChange={handledMedHisDataChanges}
                  />
                </div>
                <div className=" m-auto max-w-[380px] min-w-[200px] px-9 pb-1 ">
                  <label className="" htmlFor="caption">
                    Caption
                    {errorsMedHis.caption && (
                      <span className="text-red-600 text-lg font-bold">*</span>
                    )}
                  </label>
                  <input
                    className="border-b-2 outline-none  w-full pl-2 b"
                    id="caption"
                    type="string"
                    name="caption"
                    value={medHisData.caption}
                    onChange={handledMedHisDataChanges}
                  />

                  <div className="flex justify-center pt-3  ">
                    <button
                      className="bg-[#5552d3] px-14 py-1 rounded-full text-white outline-none font-medium text-lg"
                      onClick={addMedHis}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
        {/* Select Tooth Pop up */}
        <div
          className={
            !dentalChart
              ? "w-1/2 h-1/2 absolute left-0 right-0 top-0 bottom-0 m-auto hidden -z-10"
              : "w-[40%] h-[70%] absolute left-0 right-0 top-0 bottom-0 m-auto z-20"
          }
        >
          <div className="bg-white rounded-xl h-[450px]">
            <AiOutlineRollback
              className="cursor-pointer translate-x-1 translate-y-1"
              size={20}
              onClick={closeSelectToothPopup}
            />
            <div className="text-center text-2xl font-semibold tracking-widest">
              Select a Tooth
            </div>
            <div className="flex justify-center mt-3">
              <DentalChart toothNum={getToothNumber} />
            </div>
            <div className="text-center pt-2">
              <div className="font-semibold">Tooth Number </div>
              <div className="text-xl">{selectedTooth}</div>
            </div>
            <div className="flex justify-center pt-3  ">
              <button
                className="bg-[#5552d3] px-14 py-1 rounded-full text-white outline-none font-medium text-lg"
                onClick={submitChosenTooth}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
        {/* Select Dentist */}
        <div
          className={
            !dentistList
              ? "w-1/2 h-1/2 absolute left-0 right-0 top-0 bottom-0 m-auto hidden -z-10"
              : "w-[40%] h-[70%] absolute left-0 right-0 top-0 bottom-0 m-auto z-20"
          }
        >
          <DentistList
            dentists={associate}
            back={closeDentistListPopup}
            chosenDentist={choosenDentist}
          />
        </div>
        {/* Select Procedure */}
        <div
          className={
            !procedureList
              ? "w-1/2 h-1/2 absolute left-0 right-0 top-0 bottom-0 m-auto hidden -z-10"
              : "w-[40%] h-[70%] absolute left-0 right-0 top-0 bottom-0 m-auto z-20"
          }
        >
          <ProcedureList
            procedures={procedures}
            back={closeProcedureList}
            chosenProc={choosenProcedure}
          />
        </div>
        {/* View Details of Treatment Record */}
        <div
          className={
            !viewDets
              ? "w-1/2 h-1/2 absolute left-0 right-0 top-0 bottom-0 m-auto hidden -z-10"
              : "w-[40%] h-[70%] absolute left-0 right-0 top-0 bottom-0 m-auto z-20"
          }
        >
          <div className="bg-white rounded-xl h-[450px]">
            <div className="flex justify-end pt-1 pr-2 ">
              <AiOutlineClose
                className="hover:cursor-pointer"
                size={20}
                fill="#FF2400"
                onClick={closeViewDetsPopup}
              />
            </div>
            <div className="pt-3 mr-3">
              <div className="text-center text-xl tracking-widest mb-4 font-semibold">
                Edit or Delete Record
              </div>
              <div className=" m-auto max-w-[380px] min-w-[200px] px-9 pb-1">
                <h2 className="text-sm">
                  Tooth Number
                  {/* {errors.procedure && (
                    <span className="text-red-600 text-lg font-bold"> * </span>
                  )} */}
                </h2>
                <div className="flex justify-between">
                  {!trData.teeth ? (
                    <h3 className="text-gray-300">Tooth Number</h3>
                  ) : (
                    <h3 className="text-xl mx-2">{trData.teeth}</h3>
                  )}

                  <AiFillCaretDown
                    className="translate-y-1 cursor-pointer"
                    fill="#ddd8db"
                    onClick={handleSelecttoothPopup}
                  />
                </div>
                <div className="border-b-2"></div>
              </div>
              <div className=" m-auto max-w-[380px] min-w-[200px] px-9 pb-1">
                <h2 className="">
                  Dentist{" "}
                  {/* {errorsSalary.dentist && (
                    <span className="text-red-600 text-lg font-bold"> * </span>
                  )} */}
                </h2>
                <div className="flex justify-between">
                  {!trData.handledby ? (
                    <h3 className="text-gray-300">Dentist</h3>
                  ) : (
                    <h3 className="">{`Dr. ${trData.handledby.lastName}, ${trData.handledby.firstName}`}</h3>
                  )}

                  <AiFillCaretDown
                    className="translate-y-1 cursor-pointer"
                    fill="#ddd8db"
                    onClick={handleDentistListPopup}
                  />
                </div>
                <div className="border-b-2"></div>
              </div>
              <div className=" m-auto max-w-[380px] min-w-[200px] px-9 pb-1">
                <h2 className="text-sm">
                  Procedure
                  {/* {errors.procedure && (
                    <span className="text-red-600 text-lg font-bold"> * </span>
                  )} */}
                </h2>
                <div className="flex justify-between">
                  {!trData.procedure ? (
                    <h3 className="text-gray-300">Procedure</h3>
                  ) : (
                    <h3 className="">{`${trData.procedure.name} -- ${trData.procedure.amount}`}</h3>
                  )}

                  <AiFillCaretDown
                    className="translate-y-1 cursor-pointer"
                    fill="#ddd8db"
                    onClick={handleProcedureList}
                  />
                </div>
                <div className="border-b-2"></div>
              </div>
              <div className=" m-auto max-w-[380px] min-w-[200px] px-9 pb-1">
                <label className="text-sm" htmlFor="dates">
                  Date{" "}
                  {/* {errors.date && (
                    <span className="text-red-600 text-lg font-bold"> * </span>
                  )} */}
                </label>
                <input
                  className="border-b-2 outline-none  w-full pl-2 b"
                  id="dates"
                  type="date"
                  name="date"
                  value={trData.date}
                  onChange={handleTrDataChange}
                />
              </div>

              <div className=" m-auto max-w-[380px] min-w-[200px] px-9 pb-1">
                <label className="text-sm" htmlFor="dates">
                  Note
                  {/* {errors.date && (
                    <span className="text-red-600 text-lg font-bold"> * </span>
                  )} */}
                </label>
                <input
                  className="border-b-2 outline-none  w-full pl-2 b"
                  id="notes"
                  type="string"
                  name="notes"
                  value={trData.notes}
                  onChange={handleTrDataChange}
                />
              </div>
              <div className="flex justify-evenly pt-3  ">
                <button
                  className="bg-[#5552d3] lg:px-14 md:px-11 py-1 rounded-full text-white outline-none font-medium lg:text-lg md:text-base"
                  onClick={editTreatmentRec}
                >
                  Submit
                </button>
                <button
                  className="bg-[#5552d3] lg:px-14 md:px-11 py-1 rounded-full text-white outline-none font-medium lg:text-lg md:text-base"
                  onClick={deleteTreatmentRec}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Make Pyament */}
        <div
          className={
            !makepayment
              ? "w-1/2 h-1/2 absolute left-0 right-0 top-0 bottom-0 m-auto hidden -z-10"
              : "w-[40%] h-[70%] absolute left-0 right-0 top-0 bottom-0 m-auto z-20"
          }
        >
          <div className="bg-white rounded-xl h-[450px]">
            <div className="flex justify-end pt-1 pr-2 ">
              <AiOutlineClose
                className="hover:cursor-pointer"
                size={20}
                fill="#FF2400"
                onClick={closePaymentPopup}
              />
            </div>
            <div className="pt-3 mr-3">
              <div className="text-center text-xl tracking-widest mb-4 font-semibold">
                Make Payment
              </div>
              <div className=" m-auto max-w-[380px] min-w-[200px] px-9 mb-2">
                <label className=" " htmlFor="startTime">
                  Mode of Payment
                  {errorsPay.mop && (
                    <span className="text-red-600 text-lg font-bold"> * </span>
                  )}
                </label>
                <select
                  value={paymentData.mop}
                  onChange={handlePaymentDataChange}
                  id="mop"
                  name="mop"
                  className="borderb-2 outline-none  w-full border-b-2"
                >
                  <option value=""></option>
                  <option value="Cash">Cash</option>
                  <option value="HMO">HMO</option>
                  <option value="Online">Online</option>
                </select>
              </div>
              {paymentData.mop === "HMO" ? (
                <div className=" m-auto max-w-[380px] min-w-[200px] px-9 mb-2">
                  <label className=" " htmlFor="startTime">
                    HMO Company
                    {errorsPay.company && (
                      <span className="text-red-600 text-lg font-bold">
                        {" "}
                        *{" "}
                      </span>
                    )}
                  </label>
                  <select
                    value={paymentData.company}
                    onChange={handlePaymentDataChange}
                    id="company"
                    name="company"
                    className="borderb-2 outline-none  w-full border-b-2"
                  >
                    <option value="none"></option>
                    {companies.map((comp) => (
                      <option value={comp._id}>{comp.name}</option>
                    ))}
                  </select>
                </div>
              ) : (
                ""
              )}
              <div className=" m-auto max-w-[380px] min-w-[200px] px-9 pb-2">
                <h2 className="">Dentist </h2>
                <div className="flex justify-between">
                  {!trData.handledby ? (
                    <h3 className="text-gray-300">Dentist</h3>
                  ) : (
                    <h3 className="">{`Dr. ${trData.handledby.lastName}, ${trData.handledby.firstName}`}</h3>
                  )}

                  <AiFillCaretDown className="translate-y-1 " fill="#ddd8db" />
                </div>
                <div className="border-b-2"></div>
              </div>
              <div className=" m-auto max-w-[380px] min-w-[200px] px-9 pb-2">
                <h2 className="">Procedure</h2>
                <div className="flex justify-between">
                  {!trData.procedure ? (
                    <h3 className="text-gray-300">Procedure</h3>
                  ) : (
                    <h3 className="">{`${trData.procedure.name} -- ${trData.procedure.amount}`}</h3>
                  )}

                  <AiFillCaretDown className="translate-y-1" fill="#ddd8db" />
                </div>
                <div className="border-b-2"></div>
              </div>
              <div className=" m-auto max-w-[380px] min-w-[200px] px-9 pb-1">
                <label className="" htmlFor="dates">
                  Date{" "}
                  {errorsPay.date && (
                    <span className="text-red-600 text-lg font-bold"> * </span>
                  )}
                </label>
                <input
                  className="border-b-2 outline-none  w-full  b"
                  id="dates"
                  type="date"
                  name="date"
                  value={paymentData.date}
                  onChange={handlePaymentDataChange}
                />
              </div>
              <div className="flex justify-center mt-8  ">
                <button
                  className="bg-[#5552d3] px-14 py-1 rounded-full text-white outline-none font-medium text-lg"
                  onClick={addpayment}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* View Payment Dets */}
        <div
          className={
            !viewPaymentDets
              ? "w-1/2 h-1/2 absolute left-0 right-0 top-0 bottom-0 m-auto hidden -z-10"
              : "w-[40%] h-[70%] absolute left-0 right-0 top-0 bottom-0 m-auto z-20"
          }
        >
          <div className="bg-white rounded-xl h-[450px]">
            <div className="flex justify-end pt-1 pr-2 ">
              <AiOutlineClose
                className="hover:cursor-pointer"
                size={20}
                fill="#FF2400"
                onClick={closePaymentDets}
              />
            </div>
            <div className="pt-3 mr-3">
              <div className="text-center text-xl tracking-widest mb-4 font-semibold">
                Make Payment
              </div>
              <div className=" m-auto max-w-[380px] min-w-[200px] px-9 mb-2">
                <label className=" " htmlFor="startTime">
                  Mode of Payment
                  {/* {errors.startTime && (
                <span className="text-red-600 text-lg font-bold"> * </span>
              )} */}
                </label>
                <select
                  value={paymentData.mop}
                  onChange={handlePaymentDataChange}
                  id="mop"
                  name="mop"
                  className="borderb-2 outline-none  w-full border-b-2"
                >
                  <option value=""></option>
                  <option value="Cash">Cash</option>
                  <option value="HMO">HMO</option>
                  <option value="Online">Online</option>
                </select>
              </div>
              <div className=" m-auto max-w-[380px] min-w-[200px] px-9 pb-2">
                <h2 className="">
                  Dentist{" "}
                  {/* {errorsSalary.dentist && (
                    <span className="text-red-600 text-lg font-bold"> * </span>
                  )} */}
                </h2>
                <div className="flex justify-between">
                  {!trData.handledby ? (
                    <h3 className="text-gray-300">Dentist</h3>
                  ) : (
                    <h3 className="">{`Dr. ${trData.handledby.lastName}, ${trData.handledby.firstName}`}</h3>
                  )}

                  <AiFillCaretDown className="translate-y-1 " fill="#ddd8db" />
                </div>
                <div className="border-b-2"></div>
              </div>
              <div className=" m-auto max-w-[380px] min-w-[200px] px-9 pb-2">
                <h2 className="">
                  Procedure
                  {/* {errors.procedure && (
                    <span className="text-red-600 text-lg font-bold"> * </span>
                  )} */}
                </h2>
                <div className="flex justify-between">
                  {!trData.procedure ? (
                    <h3 className="text-gray-300">Procedure</h3>
                  ) : (
                    <h3 className="">{`${trData.procedure.name} -- ${trData.procedure.amount}`}</h3>
                  )}

                  <AiFillCaretDown className="translate-y-1" fill="#ddd8db" />
                </div>
                <div className="border-b-2"></div>
              </div>
              <div className=" m-auto max-w-[380px] min-w-[200px] px-9 pb-1">
                <label className="" htmlFor="dates">
                  Date{" "}
                  {/* {errors.date && (
                    <span className="text-red-600 text-lg font-bold"> * </span>
                  )} */}
                </label>
                <input
                  className="border-b-2 outline-none  w-full  b"
                  id="dates"
                  type="date"
                  name="date"
                  value={paymentData.date}
                  onChange={handlePaymentDataChange}
                />
              </div>
              <div className="flex justify-center mt-8  ">
                <button
                  className="bg-[#5552d3] px-14 py-1 rounded-full text-white outline-none font-medium text-lg"
                  onClick={deletePayment}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* View Med His Dets */}
        <div
          className={
            !viewmhDets
              ? "w-1/2 h-1/2 absolute left-0 right-0 top-0 bottom-0 m-auto hidden -z-10"
              : "w-[40%] h-[80%] absolute left-0 right-0 top-0 bottom-0 m-auto z-20"
          }
        >
          <div className="bg-white rounded-xl h-[480px]">
            <div className="flex justify-end pt-1 pr-2 ">
              <AiOutlineClose
                className="hover:cursor-pointer"
                size={20}
                fill="#FF2400"
                onClick={closeViewMedHisDets}
              />
            </div>

            <img
              className="w-[290px] h-[300px] m-auto rounded-2xl"
              src={medHisData.pxPhotoUrl}
              alt=""
            />
            <div className=" m-auto max-w-[400px] min-w-[200px] px-9 pb-3 ">
              <label className="text-sm" htmlFor="caption">
                Caption
                {errorsMedHis.caption && (
                  <span className="text-red-600 text-lg font-bold">*</span>
                )}
              </label>
              <input
                className="border-b-2 outline-none  w-full  b"
                id="caption"
                type="string"
                name="caption"
                value={medHisData.caption}
                onChange={handledMedHisDataChanges}
              />
            </div>
            <div className="flex justify-evenly pt-3  ">
              <button
                className="bg-[#5552d3] lg:px-14 md:px-10 py-1 rounded-full text-white outline-none font-medium lg:text-lg md:text-base"
                onClick={editMedHis}
              >
                Submit
              </button>
              <button
                className="bg-[#5552d3] lg:px-14 md:px-10 py-1 rounded-full text-white outline-none font-medium lg:text-lg md:text-base"
                onClick={deletedMedHis}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div></div>
  );
};

export default Patient;
