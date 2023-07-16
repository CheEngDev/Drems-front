import React, { useState } from "react";
import {
  AiFillEdit,
  AiFillDelete,
  AiOutlineClose,
  AiFillCaretDown,
} from "react-icons/ai";
import Pagination from "./common/pagination";

const PxPayment = (props) => {
  const [editpopup, seteditpopup] = useState(false);

  const [data, setData] = useState({
    id: "",
    pxid: "",
    Mop: "",
    treatmentRecID: "",
    date: "",
    handledBy: "",
    hmoCompany: "",
  });

  function editPopup(payment) {
    seteditpopup(!editpopup);

    setData({
      id: payment.id,
      pxid: props.id,
      Mop: payment.Mop,
      treatmentRecID: payment.treatmentRecID,
      date: payment.date,
      handledBy: payment.handledBy,
      hmoCompany: payment.hmoCompany,
    });
  }

  function closeEditPopup() {
    seteditpopup(!editpopup);
  }

  function handleChange(e) {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    setData((prev) => {
      return { ...prev, [name]: value };
    });

    console.log(data);
  }

  function editPayment(data) {
    seteditpopup(!editpopup);
    props.edit(data);
    console.log(data);
  }

  return (
    <div className="w-full">
      <div className="bg-white max-w-[420px] min-w-[350px] max-h-[600px]   m-auto mt-0 rounded-lg">
        <div>
          <table className="w-full">
            <thead className="text-lg tracking-wider border-b-2 border-gray-200 text-center">
              <tr>
                <th>
                  <div className="flex justify-center">
                    <h1 className="translate-x-6">Payments</h1>
                    <div className="translate-x-16">Filter</div>
                  </div>
                  <div className="text-xs font-medium">
                    Total Revenue: {`Php ${props.revenue}.00`}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {props.payment.map((pay) => (
                <tr key={pay.id}>
                  <td className="border-b-2 border-gray-200">
                    <div className="flex justify-between px-5">
                      <div>
                        <h2 className="text-gray-500 text-xs">Procedure</h2>
                        <p className="font-medium pl-2">
                          {`${pay.treatmentRecID.toothNumber}-${pay.treatmentRecID.procedureid.name}`}
                        </p>
                      </div>
                      <div className="-translate-x-8">
                        <h2 className="text-gray-500 text-xs">Total Amount</h2>
                        <p className="font-medium pl-2">
                          {pay.treatmentRecID.procedureid.amount}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between px-5">
                      <div>
                        <h2 className="text-gray-500 text-xs">Dentist</h2>
                        <p className="font-medium pl-2">
                          {pay.treatmentRecID.handledBy.firstName}
                        </p>
                      </div>
                      <div className="-translate-x-1">
                        <h2 className="text-gray-500 text-xs">
                          Mode of Payment
                        </h2>
                        <p className="font-medium pl-2">{pay.Mop}</p>
                      </div>
                    </div>
                    <div className="flex justify-between px-5">
                      <div>
                        <h2 className="text-gray-500 text-xs">HMO Company</h2>
                        <p className="font-mediumpl-2">{pay.hmoCompany.name}</p>
                      </div>
                      <div className="-translate-x-3">
                        <h2 className="text-gray-500 text-xs">
                          Date of Payment
                        </h2>
                        <p className="font-medium pl-2">{pay.date}</p>
                      </div>
                    </div>
                    <div className="flex justify-evenly border-t-2">
                      <AiFillEdit
                        className="cursor-pointer"
                        size={15}
                        onClick={() => editPopup(pay)}
                      />
                      <div className="border-l-2"></div>
                      <AiFillDelete
                        className="cursor-pointer"
                        size={15}
                        onClick={() => props.deletePay(pay)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="px-2 pb-2">
            <Pagination
              itemsCount={props.itemsCount}
              pageS={props.pageS}
              currentPage={props.currentPage}
              pxsonpage={props.paymentonpage}
              nextbt={props.nextbtn}
              prevbt={props.prevbtn}
            />
          </div>
        </div>
      </div>
      <div
        className={
          !editpopup
            ? "w-1/2 h-1/2 absolute left-0 right-0 top-0 bottom-0 m-auto hidden -z-10"
            : "w-1/2 h-1/2 absolute left-0 right-0 top-0 bottom-0 m-auto z-20 flex justify-end"
        }
      >
        <div className=" bg-white max-h-[300px] w-full m-auto h-full rounded-xl">
          <div className="flex justify-end pt-1 px-1">
            <AiOutlineClose
              className="cursor-pointer"
              fill="#FF2400"
              onClick={closeEditPopup}
            />
          </div>
          <h1 className="text-center text-xl font-semibold pb-1">
            Edit Payment
          </h1>
          <div className=" m-auto max-w-[380px] min-w-[200px] px-9 pb-2">
            <h2 className="text-sm">Treatment Record</h2>
            <div className="flex justify-between">
              {!data.treatmentRecID.procedureid ? (
                <h3 className="text-gray-300">Treatment</h3>
              ) : (
                <h3 className="text-gray-300">{`${data.treatmentRecID.toothNumber}-${data.treatmentRecID.procedureid.name} - Php ${data.treatmentRecID.procedureid.amount}`}</h3>
              )}
            </div>
            <div className="border-b-2"></div>
          </div>
          <div className=" m-auto max-w-[380px] min-w-[200px] px-9 pb-1">
            <label className="px-1 text-sm" htmlFor="Mop">
              Mode of Payment
            </label>
            <select
              value={data.Mop}
              onChange={handleChange}
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
              Date
            </label>
            <input
              className="border-b-2 outline-none  w-full pl-2 b"
              id="dates"
              type="date"
              name="date"
              value={data.date}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-center pt-6">
            <button
              className="bg-[#1993c6] px-14 py-1 rounded-full text-white outline-none font-medium text-lg"
              onClick={() => editPayment(data)}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      <div
        className={
          !editpopup
            ? "w-full h-full bg-slate-300 opacity-80 absolute top-0 hidden"
            : "w-full h-full bg-slate-300 opacity-80 absolute top-0 z-10"
        }
      ></div>
    </div>
  );
};

export default PxPayment;
