import React from "react";
import moment from "moment";

const IncomeRepPerDent = (props) => {
  const payments = props.payments;
  const associates = props.associates;
  const currentMonth = moment().month() + 1;
  const currentYear = moment().year();
  const currentDay = moment().date();

  // Filtering By Date
  const Month = payments.filter((px) => {
    let [year, month] = px.date.split("-");
    return currentMonth === +month && currentYear == year;
  });

  const Year = payments.filter((px) => {
    let [year] = px.date.split("-");
    return currentYear == year;
  });

  const Today = payments.filter((px) => {
    let [year, month, today] = px.date.split("-");
    return (
      currentMonth === +month && currentYear == year && currentDay === +today
    );
  });

  const pay = {
    Month: Month,
    Year: Year,
    Today: Today,
  };

  const filteredPay = pay[props.dateFilter];

  function computerevenue(id) {
    const revenueassoc = filteredPay.filter((pay) => pay.handledby._id === id);
    let revenues = 0;
    for (let i = 0; i < revenueassoc.length; i++) {
      revenues += revenueassoc[i].treatment.procedure.amount;
    }

    return revenues;
  }

  function computetotalrev() {
    let revenues = 0;
    for (let i = 0; i < filteredPay.length; i++) {
      revenues += filteredPay[i].treatment.procedure.amount;
    }
    return revenues;
  }

  return (
    <div>
      {/* Mobile */}
      <div className="max-h-[330px] overflow-y-auto md:hidden">
        {associates.map((assoc) => (
          <div>
            <div className="flex py-1 border-b-2 justify-evenly">
              <div className="max-w-[145px] min-w-[130px] w-full translate-y-3 font-medium">{`Dr. ${assoc.lastName}, ${assoc.firstName} `}</div>
              <div className=" max-w-[145px] min-w-[130px] w-full ">
                <p className=" text-gray-500">Total Revenue</p>
                <p>{`Php ${computerevenue(assoc._id)}.00`}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="justify-center text-lg flex md:hidden">
        <h2 className="font-semibold">Total Revenue</h2>
        <p className="mx-2">{`Php ${computetotalrev()}.00`}</p>
      </div>
      {/* Large Screen */}
      <div className="max-h-[330px] overflow-y-auto hidden md:block">
        {associates.map((assoc) => (
          <div>
            <div className="flex py-1 border-b-2 justify-evenly">
              <div className="max-w-[200px] min-w-[150px] w-full translate-y-3 font-medium">{`Dr. ${assoc.lastName}, ${assoc.firstName} `}</div>
              <div className=" max-w-[200px] min-w-[150px] w-full ">
                <p className=" text-gray-500">Total Revenue</p>
                <p>{`Php ${computerevenue(assoc._id)}.00`}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="justify-center text-lg hidden md:flex">
        <h2 className="font-semibold">Total Revenue</h2>
        <p className="mx-2">{`Php ${computetotalrev()}.00`}</p>
      </div>
    </div>
  );
};

export default IncomeRepPerDent;
