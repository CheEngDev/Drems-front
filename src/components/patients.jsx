import React, { useState, useEffect, useContext } from "react";
import _, { set } from "lodash";
import dayjs from "dayjs";
import { FaSortUp, FaSortDown } from "react-icons/fa";
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineUserAdd,
  AiOutlineClose,
} from "react-icons/ai";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { paginate } from "./utils/paginate";
import Avatar from "./common/avatar";
import avatar from "../assets/avatar.png";
import SearchBox from "./searchbox";
import Pagination from "./common/pagination";
import Input from "./common/input";
import pxListContext from "../context/pxListContext";
import pxpicContext from "../context/pxpicContext";
import moment from "moment/moment";
import Joi from "joi";

const Patients = () => {
  // Contexts
  const pxContext = useContext(pxListContext);
  const pxs = pxContext.pxs;
  const pxpiccontext = useContext(pxpicContext);
  const pxpic = pxpiccontext.pxPics;

  // Client Side Only Data
  const [currentPage, setPage] = useState(0);
  const [pageSize] = useState(5);
  const [sortColumn, setSort] = useState({ path: "lastName", order: "asc" });
  const [searchQuery, setSearchQuery] = useState("");
  // const [pxs, setPxs] = useState([
  //   {
  //     id: 1,
  //     firstName: "Joyce",
  //     lastName: "Almendarez",
  //     age: 25,
  //     sex: "Male",
  //     number: "09750744869",
  //     lastVisit: "05/11/2023",
  //   },
  //   {
  //     id: 2,
  //     firstName: "Verity",
  //     lastName: "Garza",
  //     age: 39,
  //     sex: "Male",
  //     number: "09750727748",
  //     lastVisit: "05/08/2023",
  //   },
  //   {
  //     id: 3,
  //     firstName: "Alexandria",
  //     lastName: "Simon",
  //     age: 26,
  //     sex: "Male",
  //     number: "09750727756",
  //     lastVisit: "05/07/2023",
  //   },
  //   {
  //     id: 4,
  //     firstName: "Bruno",
  //     lastName: "Graves",
  //     age: 27,
  //     sex: "Male",
  //     number: "09952502100",
  //     lastVisit: "02/20/2023",
  //   },
  //   {
  //     id: 5,
  //     firstName: "Farhan",
  //     lastName: "Hill",
  //     age: 7,
  //     sex: "Female",
  //     number: "09952501985",
  //     lastVisit: "04/23/2023",
  //   },
  //   {
  //     id: 6,
  //     firstName: "Nora",
  //     lastName: "Klein",
  //     age: 19,
  //     sex: "Female",
  //     number: "09952502098",
  //     lastVisit: "05/03/2023",
  //   },
  //   {
  //     id: 7,
  //     firstName: "Haider",
  //     lastName: "Norton",
  //     age: 35,
  //     sex: "Male",
  //     number: "09952501902",
  //     lastVisit: "05/11/2023",
  //   },
  //   {
  //     id: 8,
  //     firstName: "Jan",
  //     lastName: "Klein",
  //     age: 55,
  //     sex: "Male",
  //     number: "09952501948",
  //     lastVisit: "01/10/2023",
  //   },
  //   {
  //     id: 9,
  //     firstName: "Tamara",
  //     lastName: "Knight",
  //     age: 61,
  //     sex: "Male",
  //     number: "09952501900",
  //     lastVisit: "02/27/2023",
  //   },
  //   {
  //     id: 10,
  //     firstName: "Amelia",
  //     lastName: "Mcleod",
  //     age: 11,
  //     sex: "Female",
  //     number: "09078908630",
  //     lastVisit: "04/23/2023",
  //   },
  //   {
  //     id: 11,
  //     firstName: "Janice",
  //     lastName: "Ang",
  //     age: 11,
  //     sex: "Female",
  //     number: "09353018829",
  //     lastVisit: "05/02/2023",
  //   },
  //   {
  //     id: 12,
  //     firstName: "Martha",
  //     lastName: "Wheeler",
  //     age: 11,
  //     sex: "Female",
  //     number: "09353018830",
  //     lastVisit: "05/01/2023",
  //   },
  //   {
  //     id: 13,
  //     firstName: "Nathanael",
  //     lastName: "Nathanael",
  //     age: 11,
  //     sex: "Female",
  //     number: "09750744817",
  //     lastVisit: "04/11/2023",
  //   },
  // ]);
  const [data, setData] = useState({
    _id: "",
    firstName: "",
    lastName: "",
    sex: "",
    age: "",
    email: "",
    number: "",
  });
  const [newPxPopup, setPxPopup] = useState(false);
  const [editPxPopup, seteditPxPopup] = useState(false);
  const [errors, setErrors] = useState({});

  let filtered = pxs.filter((p) =>
    p.firstName.toLowerCase().startsWith(searchQuery.toLowerCase())
  );

  let sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

  let pagpxs = paginate(sorted, currentPage, pageSize);

  function prevPage() {
    if (currentPage === 0) return 0;
    setPage(currentPage - 1);
  }

  function nextPage() {
    if (currentPage === Math.ceil(pxs.length / 5 - 1)) {
      setPage(0);
    } else {
      setPage(currentPage + 1);
    }
  }

  function handleSort(path) {
    if (sortColumn.path === path) {
      if (sortColumn.order === "asc") {
        setSort({ path: path, order: "desc" });
      } else {
        setSort({ path: path, order: "asc" });
      }
    } else {
      setSort({ path: path, order: "asc" });
    }
  }

  function handleSearch(query) {
    setSearchQuery(query);
    setPage(0);
  }

  function renderSortIcon(path) {
    if (path !== sortColumn.path) return null;

    if (sortColumn.order === "asc") return <FaSortUp />;
    return <FaSortDown />;
  }

  function handleChange(e) {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    setData((prev) => {
      return { ...prev, [name]: value };
    });
  }

  function handlePopup() {
    setPxPopup(!newPxPopup);
    setData({
      firstName: "",
      lastName: "",
      sex: "",
      age: "",
      email: "",
      number: "",
    });
    setErrors({});
  }

  function handleEditPopup(px) {
    seteditPxPopup(!editPxPopup);
    setData({
      _id: px._id,
      firstName: px.firstName,
      lastName: px.lastName,
      sex: px.sex,
      age: px.age,
      email: px.email,
      number: px.number,
      dentist: px.dentist,
    });
    setErrors({});
  }

  function handlePxPic(id) {
    const pxprofpic = pxpic.filter((p) => p.pfpowner === id);
    if (pxprofpic[0]) {
      return pxprofpic[0].profpicUrl;
    } else {
      return avatar;
    }
  }

  function addPx(e) {
    e.preventDefault();
    const errors = validate();
    setErrors(errors || {});

    if (errors) return;
    pxContext.addPatient(data);
    setPxPopup(!newPxPopup);
  }

  function editPx(e) {
    e.preventDefault();
    const errors = validate();
    setErrors(errors || {});
    if (errors) return;

    pxContext.editPatient(data);
    seteditPxPopup(!editPxPopup);
  }

  function deletepx(px) {
    // const patients2 = pxs.filter((p) => p.id !== px.id);
    // setPxs(patients2);
    pxContext.deletePatient(px);
  }

  const schema = Joi.object({
    firstName: Joi.string().min(3).max(20).required(),
    lastName: Joi.string().min(3).max(20).required(),
    sex: Joi.string().valid("Male", "Female").required(),
    age: Joi.number().required(),
    number: Joi.string().min(11).max(11).required(),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
  }).options({ stripUnknown: true });

  function validate() {
    const result = schema.validate(data, { abortEarly: false });
    if (!result.error) return null;

    const errors = {};

    for (let item of result.error.details) {
      errors[item.path[0]] = item.message;
    }

    return errors;
  }

  // Mobile States
  const [sortingPopup, setsortingPopup] = useState(false);

  function sortPopup() {
    setsortingPopup(!sortingPopup);
  }

  function sortByName() {
    setsortingPopup(false);
    handleSort("lastName");
  }

  function sortByAge() {
    setsortingPopup(false);
    handleSort("age");
  }

  function sortByLastVisit() {
    setsortingPopup(false);
    handleSort("lastVisit");
  }

  return (
    // Patient List
    <div className="w-full pb-20 bg-slate-50">
      {/* Mobile */}
      <div className="md:hidden h-screen">
        <div className="pt-[52px] flex items-center justify-center px-2">
          <BiDotsVerticalRounded
            className="cursor-pointer"
            onClick={sortPopup}
          />
          {!sortingPopup ? (
            <div></div>
          ) : (
            <div className="w-[100px]  rounded-xl border-2  bg-white fixed top-[70px] center mr-10">
              <div
                className="hover:bg-slate-400 rounded-t-xl cursor-pointer"
                onClick={sortByName}
              >
                <p className="px-1">Last Name</p>
              </div>
              <div
                className="hover:bg-slate-400 cursor-pointer"
                onClick={sortByAge}
              >
                {" "}
                <p className="px-1">Age</p>
              </div>
              <div
                className="hover:bg-slate-400 rounded-b-xl cursor-pointer"
                onClick={sortByLastVisit}
              >
                {" "}
                <p className="px-1">Last Visit</p>
              </div>
            </div>
          )}
          <div className="text-lg font-bold ">Patient List</div>
          <div className="flex items-center -translate-y-1">
            <AiOutlineUserAdd
              className="cursor-pointer hover:scale-110 transition-all duration-200 ml-1"
              size={15}
              fill="#1993c6"
              onClick={handlePopup}
            />
            <p className="text-xs text-[#1993c6]">Add</p>
          </div>
        </div>

        <div className=" max-w-[300px] m-auto w-full  px-2 pb-3">
          <SearchBox onChange={handleSearch} value={searchQuery} />
        </div>

        <div>
          {pagpxs.map((px) => (
            <div
              key={px._id}
              className="bg-white w-full py-3 border-b-2 border-gray-200  flex items-center justify-evenly px-3"
            >
              <div className="flex items-center">
                <img
                  className="w-[55px] h-[55px] mr-2 rounded-full"
                  src={handlePxPic(px._id)}
                />
                <div>
                  <a
                    className="cursor-pointer text-sm font-medium tracking-widest"
                    href={`/dashboard/patients/${px._id}`}
                  >
                    {px.lastName},{px.firstName}
                  </a>
                  <div className="text-xs tracking-wider">
                    {px.age}, {px.sex}, {px.number}
                  </div>
                  <div className="text-xs">
                    Last Visit: {dayjs(px.lastVisit).format("MMM/DD/YYYY")}
                  </div>
                </div>
              </div>

              <div className=" hover:cursor-pointer px-2">
                <AiOutlineEdit
                  onClick={() => handleEditPopup(px)}
                  fill="#1993c6"
                  size={20}
                />
              </div>
              <div className=" hover:cursor-pointer px-2">
                <AiOutlineDelete
                  onClick={() => deletepx(px)}
                  fill="#1993c6"
                  size={20}
                />
              </div>
            </div>
          ))}
          <Pagination
            itemsCount={pxs.length}
            pageS={pageSize}
            currentPage={currentPage}
            prevbt={prevPage}
            nextbt={nextPage}
            pxsonpage={pagpxs.length}
          />
        </div>
      </div>
      {/* Add new Px Pop up Mobile */}
      <div
        className={
          !newPxPopup
            ? "w-1/2 h-1/2 absolute left-0 right-0 top-0 bottom-0 m-auto hidden -z-10"
            : "w-[85%] h-[90%] absolute left-0 right-0 top-0 bottom-0 m-auto z-20 md:hidden"
        }
      >
        <div className="bg-white rounded-xl h-[450px]">
          <div className="flex justify-end pt-1 pr-2 ">
            <AiOutlineClose
              className="hover:cursor-pointer"
              size={20}
              fill="#FF2400"
              onClick={handlePopup}
            />
          </div>

          <h1 className="text-center text-xl font-semibold tracking-widest pb-1">
            Add a new Patient
          </h1>

          <form action="">
            <Input
              value={data.firstName}
              onChange={handleChange}
              name="firstName"
              label="First Name"
              type="text"
              error={errors.firstName}
            />
            <Input
              value={data.lastName}
              onChange={handleChange}
              name="lastName"
              label="Last Name"
              type="text"
              error={errors.lastName}
            />
            <Input
              value={data.age}
              onChange={handleChange}
              name="age"
              label="Age"
              type="number"
              error={errors.age}
            />
            <div className=" m-auto max-w-[380px] min-w-[200px] px-9">
              <label className="px-1 text-sm" htmlFor="sex">
                Sex{" "}
                {errors.sex && (
                  <span className="text-red-600 text-lg font-bold"> * </span>
                )}
              </label>
              <select
                value={data.sex}
                onChange={handleChange}
                id="sex"
                name="sex"
                className="border-2 outline-none rounded-xl w-full pl-1"
              >
                <option value=""></option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <Input
              value={data.email}
              onChange={handleChange}
              name="email"
              label="Email"
              type="email"
              error={errors.email}
            />
            <Input
              value={data.number}
              onChange={handleChange}
              name="number"
              label="Number"
              type="text"
              error={errors.number}
            />
            <div className="flex justify-center w-full pt-4">
              <button
                className=" max-w-[150px] w-full py-1 bg-blue-900 rounded-full font-bold tracking-wider text-white  hover:bg-blue-500 transition-all duration-200 "
                onClick={addPx}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
      <div
        className={
          !newPxPopup
            ? "w-full h-screen bg-slate-300 opacity-80 absolute top-0 hidden"
            : "w-full h-full bg-slate-300 opacity-80 absolute top-0 z-10 md:hidden"
        }
      ></div>
      {/* Edit Px Pop up Mobile */}
      <div
        className={
          !editPxPopup
            ? "w-1/2 h-1/2 absolute left-0 right-0 top-0 bottom-0 m-auto hidden -z-10"
            : "w-[85%] h-[90%] absolute left-0 right-0 top-0 bottom-0 m-auto md:hidden z-20"
        }
      >
        <div className="bg-white rounded-xl h-[450px]">
          <div className="flex justify-end pt-1 pr-2">
            <AiOutlineClose
              className="hover:cursor-pointer"
              size={20}
              fill="#FF2400"
              onClick={handleEditPopup}
            />
          </div>

          <h1 className="text-center text-xl font-semibold tracking-widest pb-1">
            Edit Patient Informations
          </h1>

          <form action="">
            <Input
              value={data.firstName}
              onChange={handleChange}
              name="firstName"
              label="First Name"
              type="text"
              error={errors.firstName}
            />
            <Input
              value={data.lastName}
              onChange={handleChange}
              name="lastName"
              label="Last Name"
              type="text"
              error={errors.lastName}
            />
            <Input
              value={data.age}
              onChange={handleChange}
              name="age"
              label="Age"
              type="number"
              error={errors.age}
            />
            <div className=" m-auto max-w-[380px] min-w-[200px] px-9">
              <label className="px-1" htmlFor="sex">
                Sex{" "}
                {errors.sex && (
                  <span className="text-red-600 text-lg font-bold"> * </span>
                )}
              </label>
              <select
                value={data.sex}
                onChange={handleChange}
                id="sex"
                name="sex"
                className="border-2 outline-none rounded-xl w-full pl-1"
              >
                {" "}
                <option value=""></option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <Input
              value={data.email}
              onChange={handleChange}
              name="email"
              label="Email"
              type="email"
              error={errors.email}
            />
            <Input
              value={data.number}
              onChange={handleChange}
              name="number"
              label="Number"
              type="text"
              error={errors.number}
            />

            <div className="flex justify-center w-full pt-4">
              <button
                className=" max-w-[150px] w-full py-1 bg-blue-900 rounded-full font-bold tracking-wider text-white hover:bg-blue-500 transition-all duration-200"
                onClick={editPx}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
      <div
        className={
          !editPxPopup
            ? "w-full h-full bg-slate-300 opacity-80 absolute top-0 hidden"
            : "w-full h-full bg-slate-300 opacity-80 absolute top-0 md:hidden  z-10"
        }
      ></div>
      {/* Large Screen */}
      <div className="w-full px-6 py-3 hidden md:block">
        <div className="flex justify-between items-center">
          <div className="flex items-center justify-center">
            <h1 className="text-2xl font-bold tracking-widest pb-2  ">
              Patient List
            </h1>
            <AiOutlineUserAdd
              className="cursor-pointer hover:scale-110 transition-all duration-200 ml-4"
              size={30}
              fill="#1993c6"
              onClick={handlePopup}
            />
            <p className="text-xs text-[#1993c6]">Add Patient</p>
          </div>

          <SearchBox onChange={handleSearch} value={searchQuery} />
        </div>

        <div className="p-2 pb-0">
          <table className="max-w-[900px] min-w-[400px] w-full border-collapse">
            <thead className="border-b-2 border-gray-200 bg-gray-50">
              <tr>
                <th
                  className="tracking-widest text-left text-xs p-2 flex hover:cursor-pointer"
                  onClick={() => handleSort("lastName")}
                >
                  Patient Name {renderSortIcon("lastName")}
                </th>

                <th className="tracking-wider text-left text-xs p-2">Gender</th>
                <th
                  className="tracking-widest text-left text-xs p-2 flex hover:cursor-pointer"
                  onClick={() => handleSort("age")}
                >
                  Age {renderSortIcon("age")}
                </th>
                <th className="tracking-widest text-left text-xs p-2">
                  Number
                </th>
                <th
                  className="tracking-widest text-left text-xs p-2 flex hover:cursor-pointer"
                  onClick={() => handleSort("lastVisit")}
                >
                  Last Visit {renderSortIcon("lastVisit")}
                </th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody className="border-b-2 border-gray-200">
              {pagpxs.map((px) => (
                <tr key={px._id}>
                  <td className="pt-1 border-b-2 border-gray-200 font-medium min-w-[120px] w-[170px] lg:w-[190px]">
                    <img
                      className="w-[65px] h-[65px] rounded-full"
                      src={handlePxPic(px._id)}
                    />
                    <a
                      className="cursor-pointer"
                      href={`/dashboard/patients/${px._id}`}
                    >
                      {px.lastName}, {px.firstName}
                    </a>
                  </td>
                  <td className="pt-2 border-b-2 border-gray-200 text-sm">
                    {px.sex}
                  </td>
                  <td className="pt-2 border-b-2 border-gray-200 text-sm">
                    {px.age}
                  </td>
                  <td className="pt-2 border-b-2 border-gray-200 text-sm">
                    {px.number}
                  </td>
                  <td className="pt-2 border-b-2 border-gray-200 text-sm px-2">
                    {moment(px.date).format("MM/DD/YYYY")}
                  </td>
                  <td className="border-b-2 border-gray-200 hover:cursor-pointer px-2">
                    {" "}
                    <AiOutlineEdit
                      onClick={() => handleEditPopup(px)}
                      fill="#1993c6"
                    />
                  </td>
                  <td className="border-b-2 border-gray-200 hover:cursor-pointer px-2">
                    {" "}
                    <AiOutlineDelete
                      onClick={() => deletepx(px)}
                      fill="#1993c6"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            itemsCount={pxs.length}
            pageS={pageSize}
            currentPage={currentPage}
            prevbt={prevPage}
            nextbt={nextPage}
            pxsonpage={pagpxs.length}
          />
        </div>
      </div>
      {/* Add new patient Pop-up */}
      <div
        className={
          !newPxPopup
            ? "w-1/2 h-1/2 absolute left-0 right-0 top-0 bottom-0 m-auto hidden -z-10"
            : "w-1/2 h-[80%] absolute left-0 right-0 top-0 bottom-0 m-auto z-20 hidden md:block"
        }
      >
        <div className="bg-white rounded-xl h-[450px]">
          <div className="flex justify-end pt-1 pr-2 ">
            <AiOutlineClose
              className="hover:cursor-pointer"
              size={20}
              fill="#FF2400"
              onClick={handlePopup}
            />
          </div>

          <h1 className="text-center text-xl font-semibold tracking-widest pb-1">
            Add a new Patient
          </h1>

          <form action="">
            <Input
              value={data.firstName}
              onChange={handleChange}
              name="firstName"
              label="First Name"
              type="text"
              error={errors.firstName}
            />
            <Input
              value={data.lastName}
              onChange={handleChange}
              name="lastName"
              label="Last Name"
              type="text"
              error={errors.lastName}
            />
            <Input
              value={data.age}
              onChange={handleChange}
              name="age"
              label="Age"
              type="number"
              error={errors.age}
            />
            <div className=" m-auto max-w-[380px] min-w-[200px] px-9">
              <label className="px-1 text-sm" htmlFor="sex">
                Sex{" "}
                {errors.sex && (
                  <span className="text-red-600 text-lg font-bold"> * </span>
                )}
              </label>
              <select
                value={data.sex}
                onChange={handleChange}
                id="sex"
                name="sex"
                className="border-2 outline-none rounded-xl w-full pl-1"
              >
                <option value=""></option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <Input
              value={data.email}
              onChange={handleChange}
              name="email"
              label="Email"
              type="email"
              error={errors.email}
            />
            <Input
              value={data.number}
              onChange={handleChange}
              name="number"
              label="Number"
              type="text"
              error={errors.number}
            />
            <div className="flex justify-center w-full pt-4">
              <button
                className=" max-w-[200px] w-full py-1 bg-blue-900 rounded-full font-bold tracking-wider text-white text-lg hover:bg-blue-500 transition-all duration-200 "
                onClick={addPx}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>

      <div
        className={
          !newPxPopup
            ? "w-full h-screen bg-slate-300 opacity-80 absolute top-0 hidden"
            : "w-full h-full bg-slate-300 opacity-80 absolute top-0 z-10 hidden md:block"
        }
      ></div>

      {/* Edit patient Pop-up */}
      <div
        className={
          !editPxPopup
            ? "w-1/2 h-1/2 absolute left-0 right-0 top-0 bottom-0 m-auto hidden -z-10"
            : "w-1/2 h-[80%] absolute left-0 right-0 top-0 bottom-0 m-auto hidden md:block z-20"
        }
      >
        <div className="bg-white rounded-xl h-[450px]">
          <div className="flex justify-end pt-1 pr-2">
            <AiOutlineClose
              className="hover:cursor-pointer"
              size={20}
              fill="#FF2400"
              onClick={handleEditPopup}
            />
          </div>

          <h1 className="text-center text-xl font-semibold tracking-widest pb-1">
            Edit Patient Informations
          </h1>

          <form action="">
            <Input
              value={data.firstName}
              onChange={handleChange}
              name="firstName"
              label="First Name"
              type="text"
              error={errors.firstName}
            />
            <Input
              value={data.lastName}
              onChange={handleChange}
              name="lastName"
              label="Last Name"
              type="text"
              error={errors.lastName}
            />
            <Input
              value={data.age}
              onChange={handleChange}
              name="age"
              label="Age"
              type="number"
              error={errors.age}
            />
            <div className=" m-auto max-w-[380px] min-w-[200px] px-9">
              <label className="px-1" htmlFor="sex">
                Sex{" "}
                {errors.sex && (
                  <span className="text-red-600 text-lg font-bold"> * </span>
                )}
              </label>
              <select
                value={data.sex}
                onChange={handleChange}
                id="sex"
                name="sex"
                className="border-2 outline-none rounded-xl w-full pl-1"
              >
                {" "}
                <option value=""></option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <Input
              value={data.email}
              onChange={handleChange}
              name="email"
              label="Email"
              type="email"
              error={errors.email}
            />
            <Input
              value={data.number}
              onChange={handleChange}
              name="number"
              label="Number"
              type="text"
              error={errors.number}
            />

            <div className="flex justify-center w-full pt-4">
              <button
                className=" max-w-[200px] w-full py-1 bg-blue-900 rounded-full font-bold tracking-wider text-white text-lg hover:bg-blue-500 transition-all duration-200"
                onClick={editPx}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
      <div
        className={
          !editPxPopup
            ? "w-full h-full bg-slate-300 opacity-80 absolute top-0 hidden"
            : "w-full h-full bg-slate-300 opacity-80 absolute top-0 hidden md:block z-10"
        }
      ></div>
    </div>
  );
};

export default Patients;
