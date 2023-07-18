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

  function computerevenue(id) {
    const withcompany = filteredPay.filter((p) => p.company);

    const revenuesinsu = withcompany.filter((pay) => pay.company._id === id);
    let revenues = 0;
    for (let i = 0; i < revenuesinsu.length; i++) {
      revenues += revenuesinsu[i].treatment.procedure.amount;
    }
    return revenues;
  }

  function computetotalrev() {
    const withcompany = filteredPay.filter((p) => p.company);
    let revenues = 0;
    for (let i = 0; i < withcompany.length; i++) {
      revenues += withcompany[i].treatment.procedure.amount;
    }
    return revenues;
  }

  // Format for number to be currency
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "Php",
  });

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
              <p>{formatter.format(computerevenue(company._id))}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center text-lg md:hidden">
        <h2 className="font-semibold">Total Revenue</h2>
        <p className="mx-2">{formatter.format(computetotalrev())}</p>
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
              <p>{formatter.format(computerevenue(company._id))}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="justify-center text-lg hidden md:flex">
        <h2 className="font-semibold">Total Revenue</h2>
        <p className="mx-2">{formatter.format(computetotalrev())}</p>
      </div>
    </div>
  );
};

export default IncomeRepPerInsu;
