import React from "react";
import moment from "moment";

const IncomeRepPerInsu = (props) => {
  const companies = props.companies;
  const payments = props.payments;
  const currentMonth = moment().month() + 1;
  const currentYear = moment().year();
  const currentDay = moment().date();

  // Filtering by Date
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

  const filteredPay = pay[props.dateFilter];
  console.log(filteredPay);
  console.log(payments);
  function computerevenue(id) {
    const revenuesinsu = filteredPay.filter((pay) => pay.company._id === id);
    let revenues = 0;
    for (let i = 0; i < revenuesinsu.length; i++) {
      revenues += revenuesinsu[i].treatment.procedure.amount;
    }
    return revenues;
  }

  function computetotalrev() {
    const revenuesinsu = filteredPay.filter((pay) => pay.hmoCompany);
    let revenues = 0;
    for (let i = 0; i < filteredPay.length; i++) {
      revenues += filteredPay[i].treatment.procedure.amount;
    }
    return revenues;
  }
  return (
    <div>
      {/* Mobile */}
      <div className="max-h-[330px] overflow-y-auto  md:hidden">
        {companies.map((company) => (
          <div className="flex py-1 border-b-2 justify-evenly">
            <div className="max-w-[145px] min-w-[130px] w-full translate-y-3 font-medium">
              {company.name}
            </div>
            <div className="max-w-[145px] min-w-[130px] w-full ">
              <p className=" text-gray-500">Total Revenue</p>
              <p>{`Php ${computerevenue(company._id)}.00`}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center text-lg md:hidden">
        <h2 className="font-semibold">Total Revenue</h2>
        <p className="mx-2">{`Php ${computetotalrev()}.00`}</p>
      </div>
      {/* Large Screens */}
      <div className="max-h-[330px] overflow-y-auto hidden md:block">
        {companies.map((company) => (
          <div className="flex py-1 border-b-2 justify-evenly">
            <div className="max-w-[200px] min-w-[150px] w-full translate-y-3 font-medium">
              {company.name}
            </div>
            <div className=" max-w-[200px] min-w-[150px] w-full ">
              <p className=" text-gray-500">Total Revenue</p>
              <p>{`Php ${computerevenue(company._id)}.00`}</p>
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

export default IncomeRepPerInsu;
