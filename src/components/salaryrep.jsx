import React, { useContext } from "react";
import moment from "moment/moment";
import assocDentContext from "../context/assocDentContext";
import expensesContext from "../context/expensesContext";

const SalaryReport = (props) => {
  const assocDentcontext = useContext(assocDentContext);
  const associates = assocDentcontext.associate;
  const expenseContext = useContext(expensesContext);
  const salaries = expenseContext.salaries;

  const currentMonth = moment().month() + 1;
  const currentYear = moment().year();
  const currentDay = moment().date();

  const Month = salaries.filter((salary) => {
    let [year, month] = salary.date.split("-");
    return currentMonth === +month && currentYear == year;
  });

  const Year = salaries.filter((salary) => {
    let [year] = salary.date.split("-");
    return currentYear == year;
  });

  const Today = salaries.filter((salary) => {
    let [year, month, today] = salary.date.split("-");
    return (
      currentMonth === +month && currentYear == year && currentDay === +today
    );
  });

  const salary = {
    Month: Month,
    Year: Year,
    Today: Today,
  };

  let filteredSalary = salary[props.dateFilter];
  console.log(filteredSalary);
  function computeSalary(id) {
    const salaryAssoc = filteredSalary.filter(
      (salary) => salary.dentist._id === id
    );
    let salaryofdent = 0;
    for (let i = 0; i < salaryAssoc.length; i++) {
      salaryofdent += salaryAssoc[i].salary;
    }
    return salaryofdent;
  }

  function computeTotalSalary() {
    let salaryofdent = 0;
    for (let i = 0; i < filteredSalary.length; i++) {
      salaryofdent += filteredSalary[i].salary;
    }
    return salaryofdent;
  }

  // Format for number to be currency
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "Php",
  });
  console.log(associates);
  return (
    <div>
      <div className="max-h-[330px] overflow-y-auto">
        {associates.map((assoc) => (
          <div>
            <div
              key={assoc._id}
              className="flex py-1 border-b-2 justify-evenly"
            >
              <div className="md:max-w-[200px] max-w-[150px] min-w-[100px] w-full translate-y-3 font-medium">
                <span
                  className="cursor-pointer"
                  onClick={() => props.showSalaryList(assoc)}
                >{`Dr. ${assoc.lastName}, ${assoc.firstName} `}</span>
              </div>
              <div className=" md:max-w-[200px] max-w-[150px] min-w-[150px] w-full ">
                <p className=" text-gray-500">Total Salary</p>
                {assoc._id === assoc.dentist ? (
                  <p>Clinic Owner</p>
                ) : (
                  <p>{formatter.format(computeSalary(assoc._id))}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center text-lg">
        <h2 className="font-semibold">Total Salaries</h2>
        <p className="mx-2">{formatter.format(computeTotalSalary())}</p>
      </div>
    </div>
  );
};

export default SalaryReport;
