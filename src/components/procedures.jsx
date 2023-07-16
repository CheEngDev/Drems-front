import React, { useState, useContext } from "react";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineClose } from "react-icons/ai";
import { paginate } from "./utils/paginate";
import Pagination from "./common/pagination";
import Input from "./common/input";
import procedureContext from "../context/procedureContext";
import { GrAdd } from "react-icons/gr";
import Joi from "joi";

const Procedures = () => {
  // Context
  const procedureCont = useContext(procedureContext);
  const procedures = procedureCont.procedures;
  const [currentPage, setPage] = useState(0);
  const [pageSize] = useState(5);
  // const [procedures, setProcedures] = useState([
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
  const [data, setData] = useState({
    _id: "",
    name: "",
    amount: "",
    dentist: "",
  });
  const [newProcPopup, setProcPopup] = useState(false);
  const [editProcPopup, seteditProcPopup] = useState(false);
  const [errors, setErrors] = useState({});

  let paginated = paginate(procedures, currentPage, pageSize);

  function prevPage() {
    if (currentPage === 0) return 0;
    setPage(currentPage - 1);
  }

  function nextPage() {
    if (currentPage === Math.ceil(procedures.length / 6 - 1)) {
      setPage(0);
    } else {
      setPage(currentPage + 1);
    }
  }

  function handleChange(e) {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    setData((prev) => {
      return { ...prev, [name]: value };
    });
  }

  function handleProcPopup() {
    setProcPopup(!newProcPopup);
    setData({
      _id: "",
      name: "",
      amount: "",
    });
    setErrors({});
  }

  function handleEditProc(proc) {
    seteditProcPopup(!editProcPopup);
    setData({
      _id: proc._id,
      name: proc.name,
      amount: proc.amount,
      dentist: proc.dentist,
    });
    setErrors({});
  }

  function addProc(e) {
    e.preventDefault();
    const errors = validate();
    setErrors(errors || {});
    if (errors) return;

    procedureCont.addProcedure(data);
    setProcPopup(!newProcPopup);
  }

  function editProc(e) {
    e.preventDefault();
    const errors = validate();
    setErrors(errors || {});
    if (errors) return;

    procedureCont.editProcedure(data);

    seteditProcPopup(!editProcPopup);
  }

  function deleteProcedure(proc) {
    procedureCont.deleteProcedure(proc);
  }

  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    amount: Joi.number().min(500).max(200000).required(),
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
          <h1 className="font-bold text-lg">List of Procedures</h1>
          <div
            className="flex text-xs bg-blue-300 rounded-full items-center px-1 hover:cursor-pointer"
            onClick={handleProcPopup}
          >
            {" "}
            <GrAdd size={15} fill="#1993c6" />
            <p className="px-1">Add Procedure</p>
          </div>
        </div>
        <div className="flex px-2 pt-2">
          <table className="w-full ">
            <thead className="text-xs text-left border-b-2 border-[#ddeef5]">
              <tr>
                <th>Name</th>
                <th>Cost</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((procedure) => (
                <tr
                  className=" border-b-2 border-[#ddeef5] text-sm"
                  key={procedure._id}
                >
                  <td className="py-1 max-w-[85px]">{procedure.name}</td>
                  <td className="py-1">Php {procedure.amount}.00</td>
                  <td className="hover:cursor-pointer">
                    <AiOutlineEdit
                      size={15}
                      fill="#1993c6"
                      onClick={() => handleEditProc(procedure)}
                    />
                  </td>
                  <td className="hover:cursor-pointer">
                    <AiOutlineDelete
                      size={15}
                      fill="#1993c6"
                      onClick={() => deleteProcedure(procedure)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          itemsCount={procedures.length}
          pageS={pageSize}
          currentPage={currentPage}
          prevbt={prevPage}
          nextbt={nextPage}
          pxsonpage={paginated.length}
        />
      </div>
      {/* Add Procedure */}
      {/* Large Screen */}
      <div
        className={
          !newProcPopup
            ? "w-1/2 h-1/2 absolute left-0 right-0 top-0 bottom-0 m-auto hidden -z-10"
            : "w-[40%] h-[40%] absolute left-0 right-0 top-0 bottom-0 m-auto z-20 hidden md:block"
        }
      >
        <div className="bg-white rounded-xl h-[280px]">
          <div className="flex justify-end pt-1 pr-2 ">
            <AiOutlineClose
              className="hover:cursor-pointer"
              size={20}
              fill="#FF2400"
              onClick={handleProcPopup}
            />
          </div>

          <h1 className="text-center text-xl font-semibold tracking-widest pb-1">
            Add new Procedure
          </h1>

          <form action="">
            <Input
              value={data.name}
              onChange={handleChange}
              name="name"
              label="Procedure"
              type="text"
              error={errors.name}
            />
            <Input
              value={data.amount}
              onChange={handleChange}
              name="amount"
              label="Amount"
              type="number"
              error={errors.amount}
            />
            <div className="flex justify-center w-full pt-4">
              <button
                className=" max-w-[200px] w-full py-1 bg-blue-900 rounded-full font-bold tracking-wider text-white text-lg hover:bg-blue-500 transition-all duration-200"
                onClick={addProc}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
      <div
        className={
          !newProcPopup
            ? "w-screen h-screen bg-slate-300 opacity-80 absolute top-0 hidden"
            : "w-screen h-screen bg-slate-300 opacity-80 absolute top-0 z-10 hidden md:block"
        }
      ></div>
      {/* Mobile */}
      <div
        className={
          !newProcPopup
            ? "w-1/2 h-1/2 absolute left-0 right-0 top-0 bottom-0 m-auto hidden -z-10"
            : "w-[80%] h-[40%] absolute left-0 right-0 top-0 bottom-0 m-auto z-20 md:hidden"
        }
      >
        <div className="bg-white rounded-xl h-[280px]">
          <div className="flex justify-end pt-1 pr-2 ">
            <AiOutlineClose
              className="hover:cursor-pointer"
              size={20}
              fill="#FF2400"
              onClick={handleProcPopup}
            />
          </div>

          <h1 className="text-center text-xl font-semibold tracking-widest pb-1">
            Add new Procedure
          </h1>

          <form action="">
            <Input
              value={data.name}
              onChange={handleChange}
              name="name"
              label="Procedure"
              type="text"
              error={errors.name}
            />
            <Input
              value={data.amount}
              onChange={handleChange}
              name="amount"
              label="Amount"
              type="number"
              error={errors.amount}
            />
            <div className="flex justify-center w-full pt-4">
              <button
                className=" max-w-[140px] w-full py-1 bg-blue-900 rounded-full font-bold tracking-wider text-white  hover:bg-blue-500 transition-all duration-200"
                onClick={addProc}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
      <div
        className={
          !newProcPopup
            ? "w-screen h-screen bg-slate-300 opacity-80 absolute top-0 hidden"
            : "w-screen h-screen bg-slate-300 opacity-80 absolute top-0 z-10 md:hidden"
        }
      ></div>
      {/* Edit Proc */}
      {/* Large Screen */}
      <div
        className={
          !editProcPopup
            ? "w-1/2 h-1/2 absolute left-0 right-0 top-0 bottom-0 m-auto hidden -z-10"
            : "w-[40%] h-[40%] absolute left-0 right-0 top-0 bottom-0 m-auto hidden md:block z-20 "
        }
      >
        <div className="bg-white rounded-xl h-[280px]">
          <div className="flex justify-end pt-1 pr-2 ">
            <AiOutlineClose
              className="hover:cursor-pointer"
              size={20}
              fill="#FF2400"
              onClick={handleEditProc}
            />
          </div>

          <h1 className="text-center text-xl font-semibold tracking-widest pb-1">
            Add new Procedure
          </h1>

          <form action="">
            <Input
              value={data.name}
              onChange={handleChange}
              name="name"
              label="Procedure"
              type="text"
              error={errors.name}
            />
            <Input
              value={data.amount}
              onChange={handleChange}
              name="amount"
              label="Amount"
              type="number"
              error={errors.amount}
            />
            <div className="flex justify-center w-full pt-4">
              <button
                className=" max-w-[200px] w-full py-1 bg-blue-900 rounded-full font-bold tracking-wider text-white text-lg hover:bg-blue-500 transition-all duration-200"
                onClick={editProc}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
      <div
        className={
          !editProcPopup
            ? "w-screen h-screen bg-slate-300 opacity-80 absolute top-0 hidden"
            : "w-screen h-screen bg-slate-300 opacity-80 absolute hidden md:block top-0 z-10"
        }
      ></div>
      {/* Mobile */}
      <div
        className={
          !editProcPopup
            ? "w-1/2 h-1/2 absolute left-0 right-0 top-0 bottom-0 m-auto hidden -z-10"
            : "w-[80%] h-[40%] absolute left-0 right-0 top-0 bottom-0 m-auto md:hidden z-20 "
        }
      >
        <div className="bg-white rounded-xl h-[280px]">
          <div className="flex justify-end pt-1 pr-2 ">
            <AiOutlineClose
              className="hover:cursor-pointer"
              size={20}
              fill="#FF2400"
              onClick={handleEditProc}
            />
          </div>

          <h1 className="text-center text-xl font-semibold tracking-widest pb-1">
            Add new Procedure
          </h1>

          <form action="">
            <Input
              value={data.name}
              onChange={handleChange}
              name="name"
              label="Procedure"
              type="text"
              error={errors.name}
            />
            <Input
              value={data.amount}
              onChange={handleChange}
              name="amount"
              label="Amount"
              type="number"
              error={errors.amount}
            />
            <div className="flex justify-center w-full pt-4">
              <button
                className=" max-w-[140px] w-full py-1 bg-blue-900 rounded-full font-bold tracking-wider text-white  hover:bg-blue-500 transition-all duration-200"
                onClick={editProc}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
      <div
        className={
          !editProcPopup
            ? "w-screen h-screen bg-slate-300 opacity-80 absolute top-0 hidden"
            : "w-screen h-screen bg-slate-300 opacity-80 absolute md:hidden top-0 z-10"
        }
      ></div>
    </div>
  );
};

export default Procedures;
