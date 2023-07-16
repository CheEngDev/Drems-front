import React, { useState, useContext } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { paginate } from "./utils/paginate";
import { GrAdd } from "react-icons/gr";
import { AiOutlineClose } from "react-icons/ai";
import Pagination from "./common/pagination";
import Input from "./common/input";
import hmoContext from "../context/hmoContext";
import Joi from "joi";

const Insurances = () => {
  const companyContext = useContext(hmoContext);
  const companies = companyContext.companies;
  const [currentPage, setPage] = useState(0);
  const [pageSize] = useState(5);
  //   {
  //     id: 1,
  //     name: "Maxicare HealthCare",
  //     number: "09369340381",
  //     email: "Maxicare@gmail.com",
  //     address: "idkwherebuthere",
  //   },
  //   {
  //     id: 2,
  //     name: "Valucare",
  //     number: "09369347682",
  //     email: "Valucare@gmail.com",
  //     address: "idkwherebuthere",
  //   },
  //   {
  //     id: 3,
  //     name: "Medicard",
  //     number: "09369340987",
  //     email: "Valucare@gmail.com",
  //     address: "idkwherebuthere",
  //   },
  //   {
  //     id: 4,
  //     name: "Intellicare",
  //     number: "09392870381",
  //     email: "Valucare@gmail.com",
  //     address: "idkwherebuthere",
  //   },
  //   {
  //     id: 5,
  //     name: "Caritas Health Shield",
  //     number: "09369340381",
  //     email: "Caritas@gmail.com",
  //     address: "idkwherebuthere",
  //   },
  //   {
  //     id: 6,
  //     name: "Philhealth Care",
  //     number: "09369340381",
  //     email: "Valucare@gmail.com",
  //     address: "idkwherebuthere",
  //   },
  //   {
  //     id: 7,
  //     name: "Eastwest Health Care",
  //     number: "09369987681",
  //     email: "Valucare@gmail.com",
  //     address: "idkwherebuthere",
  //   },
  //   {
  //     id: 8,
  //     name: "Avega Care",
  //     number: "09361234381",
  //     email: "Valucare@gmail.com",
  //     address: "idkwherebuthere",
  //   },
  //   {
  //     id: 9,
  //     name: "Insular Health Care",
  //     number: "09368340281",
  //     email: "Valucare@gmail.com",
  //     address: "idkwherebuthere",
  //   },
  // ]);
  const [data, setData] = useState({
    _id: "",
    name: "",
    number: "",
    dentist: "",
  });
  const [newCompPopup, setCompPopup] = useState(false);
  const [editCompPopup, seteditCompPopup] = useState(false);
  const [errors, setErrors] = useState({});

  let paginated = paginate(companies, currentPage, pageSize);

  function prevPage() {
    if (currentPage === 0) return 0;
    setPage(currentPage - 1);
  }

  function nextPage() {
    if (currentPage === Math.ceil(companies.length / 5 - 1)) {
      setPage(0);
    } else {
      setPage(currentPage + 1);
    }
    console.log(Math.ceil(companies.length / 5));
  }

  function deleteCompany(comp) {
    companyContext.deleteHmo(comp);
  }

  function handleCompPopup() {
    setCompPopup(!newCompPopup);
    setData({
      id: "",
      name: "",
      number: "",
      email: "",
      address: "",
    });
    setErrors({});
  }

  function handleEditCompPopup(comp) {
    seteditCompPopup(!editCompPopup);
    setData({
      _id: comp._id,
      name: comp.name,
      number: comp.number,
      dentist: comp.dentist,
    });
    setErrors({});
  }

  function handleChange(e) {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    setData((prev) => {
      return { ...prev, [name]: value };
    });
  }

  function addCompany(e) {
    e.preventDefault();
    const errors = validate();
    setErrors(errors || {});

    if (errors) return;

    companyContext.addHmo(data);
    // companies.push(addedCompany);

    setCompPopup(!newCompPopup);
  }

  function editCompany(e) {
    e.preventDefault();
    const errors = validate();
    setErrors(errors || {});
    if (errors) return;

    companyContext.editHmo(data);

    seteditCompPopup(!editCompPopup);
  }

  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    number: Joi.string().min(11).max(11).required(),
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

  return (
    <div>
      <div className="m-3 bg-white p-2 rounded-xl">
        <div className="flex justify-between">
          <h1 className="font-bold text-lg">List of HMO's</h1>
          <div
            className="flex text-xs bg-blue-300 rounded-full items-center px-1 hover:cursor-pointer"
            onClick={handleCompPopup}
          >
            {" "}
            <GrAdd size={15} fill="#1993c6" />
            <p className="px-1">Add Company</p>
          </div>
        </div>

        <div className="flex px-2 pt-2">
          <table className="w-full ">
            <thead className="text-xs text-left border-b-2 border-[#ddeef5]">
              <tr>
                <th>Name</th>
                <th>Number</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((company) => (
                <tr
                  className=" border-b-2 border-[#ddeef5] text-sm"
                  key={company._id}
                >
                  <td className="py-1 max-w-[100px]">{company.name}</td>
                  <td className="py-1">{company.number}</td>
                  <td className="hover:cursor-pointer">
                    <AiOutlineEdit
                      size={15}
                      fill="#1993c6"
                      onClick={() => handleEditCompPopup(company)}
                    />
                  </td>
                  <td className="hover:cursor-pointer">
                    <AiOutlineDelete
                      size={15}
                      fill="#1993c6"
                      onClick={() => deleteCompany(company)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          itemsCount={companies.length}
          pageS={pageSize}
          currentPage={currentPage}
          prevbt={prevPage}
          nextbt={nextPage}
          pxsonpage={paginated.length}
        />
        {/* Add New Company */}
        {/* Large Screen */}
        <div
          className={
            !newCompPopup
              ? "w-1/2 h-1/2 absolute left-0 right-0 top-0 bottom-0 m-auto hidden -z-10"
              : "w-[40%] h-[40%] absolute left-0 right-0 top-0 bottom-0 m-auto hidden md:block z-20"
          }
        >
          <div className="bg-white rounded-xl h-[280px]">
            <div className="flex justify-end pt-1 pr-2 ">
              <AiOutlineClose
                className="hover:cursor-pointer"
                size={20}
                fill="#FF2400"
                onClick={handleCompPopup}
              />
            </div>

            <h1 className="text-center text-xl font-semibold tracking-widest pb-1">
              Add new HMO Company
            </h1>

            <form action="">
              <Input
                value={data.name}
                onChange={handleChange}
                name="name"
                label="Company"
                type="text"
                error={errors.name}
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
                  onClick={addCompany}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div
        className={
          !newCompPopup
            ? "w-screen h-screen bg-slate-300 opacity-80 absolute top-0 hidden"
            : "w-screen h-screen bg-slate-300 opacity-80 absolute top-0 hidden md:block z-10"
        }
      ></div>
      {/* Mobile */}
      <div
        className={
          !newCompPopup
            ? "w-1/2 h-1/2 absolute left-0 right-0 top-0 bottom-0 m-auto hidden -z-10"
            : "w-[80%] h-[40%] absolute left-0 right-0 top-0 bottom-0 m-auto md:hidden z-20"
        }
      >
        <div className="bg-white rounded-xl h-[280px]">
          <div className="flex justify-end pt-1 pr-2 ">
            <AiOutlineClose
              className="hover:cursor-pointer"
              size={20}
              fill="#FF2400"
              onClick={handleCompPopup}
            />
          </div>

          <h1 className="text-center text-xl font-semibold tracking-widest pb-1">
            Add HMO Company
          </h1>

          <form action="">
            <Input
              value={data.name}
              onChange={handleChange}
              name="name"
              label="Company"
              type="text"
              error={errors.name}
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
                className=" max-w-[140px] w-full py-1 bg-blue-900 rounded-full font-bold tracking-wider text-white  hover:bg-blue-500 transition-all duration-200"
                onClick={addCompany}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
      <div
        className={
          !newCompPopup
            ? "w-screen h-screen bg-slate-300 opacity-80 absolute top-0 hidden"
            : "w-screen h-screen bg-slate-300 opacity-80 absolute top-0 md:hidden z-10"
        }
      ></div>
      {/* Edit Company */}
      {/* Large Screen */}
      <div>
        <div
          className={
            !editCompPopup
              ? "w-1/2 h-1/2 absolute left-0 right-0 top-0 bottom-0 m-auto hidden -z-10"
              : "w-[40%] h-[40%] absolute left-0 right-0 top-0 bottom-0 m-auto hidden md:block z-20"
          }
        >
          <div className="bg-white rounded-xl h-[280px]">
            <div className="flex justify-end pt-1 pr-2 ">
              <AiOutlineClose
                className="hover:cursor-pointer"
                size={20}
                fill="#FF2400"
                onClick={handleEditCompPopup}
              />
            </div>

            <h1 className="text-center text-xl font-semibold tracking-widest pb-1">
              Edit HMO Information
            </h1>

            <form action="">
              <Input
                value={data.name}
                onChange={handleChange}
                name="name"
                label="Company"
                type="text"
                error={errors.name}
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
                  onClick={editCompany}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div
        className={
          !editCompPopup
            ? "w-screen h-screen bg-slate-300 opacity-80 absolute top-0 hidden"
            : "w-screen h-screen bg-slate-300 opacity-80 absolute hidden md:block top-0 z-10"
        }
      ></div>
      {/* Mobile */}
      <div>
        <div
          className={
            !editCompPopup
              ? "w-1/2 h-1/2 absolute left-0 right-0 top-0 bottom-0 m-auto hidden -z-10"
              : "w-[80%] h-[40%] absolute left-0 right-0 top-0 bottom-0 m-auto md:hidden z-20"
          }
        >
          <div className="bg-white rounded-xl h-[280px]">
            <div className="flex justify-end pt-1 pr-2 ">
              <AiOutlineClose
                className="hover:cursor-pointer"
                size={20}
                fill="#FF2400"
                onClick={handleEditCompPopup}
              />
            </div>

            <h1 className="text-center text-xl font-semibold tracking-widest pb-1">
              Edit HMO Information
            </h1>

            <form action="">
              <Input
                value={data.name}
                onChange={handleChange}
                name="name"
                label="Company"
                type="text"
                error={errors.name}
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
                  className=" max-w-[140px] w-full py-1 bg-blue-900 rounded-full font-bold tracking-wider text-white hover:bg-blue-500 transition-all duration-200"
                  onClick={editCompany}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div
        className={
          !editCompPopup
            ? "w-screen h-screen bg-slate-300 opacity-80 absolute top-0 hidden"
            : "w-screen h-screen bg-slate-300 opacity-80 absolute md:hidden top-0 z-10"
        }
      ></div>
    </div>
  );
};

export default Insurances;
