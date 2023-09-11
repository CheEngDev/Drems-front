import React, { useState, useContext } from "react";
import _ from "lodash";
import moment from "moment";
import { GrView } from "react-icons/gr";
import avatar from "../assets/avatar.png";
import pxpicContext from "../context/pxpicContext";

const IncomeReport = (props) => {
  const pxs = props.pxs;
  const pxpiccontext = useContext(pxpicContext);
  const pxpic = pxpiccontext.pxPics;

  const payments = props.payments;
  const sortedpayments = _.orderBy(payments, "date", "desc");
  const currentMonth = moment().month() + 1;
  const currentYear = moment().year();
  const currentDay = moment().date();

  const pxidswhopaid = [
    ...new Set(sortedpayments.map((item) => item.treatment.patient)),
  ];

  const pxswhopaid = [];
  for (const id of pxidswhopaid) {
    const px = pxs.filter((px) => px._id === id);
    pxswhopaid.push(...px);
  }
  console.log(pxswhopaid);
  // Filtering by date
  const Month = payments.filter((pay) => {
    let [year, month] = pay.date.split("-");
    return currentMonth === +month && currentYear == year;
  });

  const Year = payments.filter((pay) => {
    let [year] = pay.date.split("-");
    return currentYear == year;
  });

  const Today = payments.filter((pay) => {
    let [year, month, today] = pay.date.split("-");
    return (
      currentMonth === +month && currentYear == year && currentDay === +today
    );
  });

  const pay = {
    Month: Month,
    Year: Year,
    Today: Today,
  };

  let filteredPayment = pay[props.dateFilter];

  function computerevenue(id) {
    const revenuepx = filteredPayment.filter(
      (pay) => pay.treatment.patient === id
    );

    let revenues = 0;
    for (let i = 0; i < revenuepx.length; i++) {
      revenues += revenuepx[i].treatment.procedure.amount;
    }
    return revenues;
  }

  function computetotalrev() {
    let revenues = 0;
    for (let i = 0; i < filteredPayment.length; i++) {
      revenues += filteredPayment[i].treatment.procedure.amount;
    }
    return revenues;
  }

  // Px Pic
  function handlePxPic(id) {
    const pxprofpic = pxpic.filter((p) => p.pfpowner === id);
    if (pxprofpic[0]) {
      return pxprofpic[0].profpicUrl;
    } else {
      return avatar;
    }
  }

  // Format for number to be currency
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "Php",
  });
  return (
    <div>
      {/* Mobile */}
      <div className="max-h-[330px] overflow-y-auto md:hidden">
        {pxswhopaid.map((px) => (
          <div className="flex py-1 border-b-2">
            <div className="flex max-w-[350px] min-w-[130px] w-full ">
              <img
                className="rounded-full w-[55px] mx-2"
                src={handlePxPic(px._id)}
                alt=""
              />
              <div className="pt-2 text-sm font-medium">
                {px.firstName} {px.lastName}
              </div>
            </div>
            <div className="max-w-[300px] min-w-[130px] w-full text-center ">
              <p className="pt-2 text-gray-500">
                Total Payments <br />
                <span className="text-black">
                  {formatter.format(computerevenue(px._id))}
                </span>
              </p>
            </div>
            <div className="  w-full text-center pt-3">
              <a
                className="bg-[#1993c6] w-[40px] inline-block rounded-full py-1 text-white cursor-pointer"
                href={`/dashboard/patients/${px._id}`}
              >
                <GrView fill="white" className="translate-x-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
      <div className="flex md:hidden justify-center text-lg ">
        <h2 className="font-semibold">Total Revenue</h2>
        <p className="mx-2">{formatter.format(computetotalrev())}</p>
      </div>
      {/* Large Screen */}
      <div className="max-h-[330px] overflow-y-auto hidden md:block">
        {pxswhopaid.map((px) => (
          <div className="flex py-1 border-b-2">
            <div className="flex max-w-[350px] min-w-[150px] w-full ">
              <img
                className="rounded-full w-[55px] mx-2"
                src={handlePxPic(px._id)}
                alt=""
              />
              <div className="pt-2 font-medium">
                {px.firstName} {px.lastName}
              </div>
            </div>
            <div className="max-w-[350px] min-w-[150px] w-full text-center mx-2">
              <p className="pt-2 text-gray-500">
                Total Payments <br />
                <span className="text-black">
                  {formatter.format(computerevenue(px._id))}
                </span>
              </p>
            </div>
            <div className=" max-w-[350px] min-w-[150px] w-full text-center pt-3">
              <a
                className="bg-[#1993c6] w-[110px] inline-block rounded-full py-1 text-white cursor-pointer"
                href={`/dashboard/patients/${px._id}`}
              >
                View Details
              </a>
            </div>
          </div>
        ))}
      </div>
      <div className="hidden md:flex justify-center text-lg ">
        <h2 className="font-semibold">Total Revenue</h2>
        <p className="mx-2">{formatter.format(computetotalrev())}</p>
      </div>
    </div>
  );
};

export default IncomeReport;
