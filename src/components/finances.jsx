import React, { useState, useContext } from "react";
import moment from "moment";
import Joi from "joi";
import dayjs from "dayjs";
import { GiReceiveMoney, GiPayMoney } from "react-icons/gi";
import {
  AiFillEye,
  AiOutlineClose,
  AiFillCaretDown,
  AiOutlineDelete,
} from "react-icons/ai";
import { IoMdAdd } from "react-icons/io";
import IncomeReport from "./incomereport";
import IncomeRepPerDent from "./incomreportperdent";
import IncomeRepPerInsu from "./incomereportperinsu";
import SalaryReport from "./salaryrep";
import CommisionPerDent from "./commiperdent";
import OtherExpenses from "./otherexpenses";
import DentistList from "./common/dentistlistpopup";
import assocDentContext from "../context/assocDentContext";
import expensesContext from "../context/expensesContext";
import pxListContext from "../context/pxListContext";
import paymentContext from "../context/paymentContext";
import hmoContext from "../context/hmoContext";
const Finances = () => {
  // Context
  const expenseContext = useContext(expensesContext);
  const assocContext = useContext(assocDentContext);
  const associates = assocContext.associate;
  let salaries = expenseContext.salaries;
  let otherExpense = expenseContext.otherExpense;
  for (const element of otherExpense) {
    element.date = dayjs(element.date).format("YYYY-MM-DD");
  }
  for (const element of salaries) {
    element.date = dayjs(element.date).format("YYYY-MM-DD");
  }
  const pxsContext = useContext(pxListContext);
  const pxs = pxsContext.pxs;
  const payments = useContext(paymentContext);
  for (const element of payments) {
    element.date = dayjs(element.date).format("YYYY-MM-DD");
  }
  const hmocontext = useContext(hmoContext);
  const companies = hmocontext.companies;
  console.log(payments);

  //   {
  //     id: "1",
  //     pxid: "1",
  //     Mop: "Cash",
  //     treatmentRecID: {
  //       id: "1",
  //       pxid: "1",
  //       toothNumber: 11,
  //       procedureid: { name: "Teeth cleaning", amount: 500 },
  //       date: "2023-05-15",
  //       time: "11:31 AM",
  //       handledBy: { id: "1", firstName: "Remelyn", lastName: "Rinon" },
  //       paid: true,
  //       notes: "",
  //     },
  //     date: "2023-05-20",
  //     handledBy: { id: "1", firstName: "Remelyn", lastName: "Rinon" },
  //     hmoCompany: "",
  //   },
  //   {
  //     id: "2",
  //     pxid: "1",
  //     Mop: "Cash",
  //     treatmentRecID: {
  //       id: "3",
  //       pxid: "1",
  //       toothNumber: 27,
  //       procedureid: { name: "Teeth cleaning", amount: 500 },
  //       date: "2023-05-15",
  //       time: "11:31 AM",
  //       handledBy: { firstName: "Associate", lastName: "Two" },
  //       paid: true,
  //       notes: "",
  //     },
  //     date: "2023-05-21",
  //     handledBy: { id: "1", firstName: "Remelyn", lastName: "Rinon" },
  //     hmoCompany: "",
  //   },
  //   {
  //     id: "3",
  //     pxid: "2",
  //     Mop: "HMO",
  //     treatmentRecID: {
  //       id: "4",
  //       pxid: "2",
  //       toothNumber: 31,
  //       procedureid: { name: "Dental Extraction", amount: 500 },
  //       date: "2023-05-15",
  //       time: "11:31 AM",
  //       handledBy: { firstName: "Associate", lastName: "Two" },
  //       paid: true,
  //       notes: "",
  //     },
  //     date: "2023-05-25",
  //     handledBy: { id: "1", firstName: "Remelyn", lastName: "Rinon" },
  //     hmoCompany: {
  //       id: 2,
  //       name: "Valucare",
  //       number: "09369347682",
  //       email: "Valucare@gmail.com",
  //       address: "idkwherebuthere",
  //     },
  //   },
  // ]);

  // const [companies] = useState([
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
  // Salaries
  // const [salaries, setSalaries] = useState([
  //   {
  //     id: "1",
  //     dentist: { id: "1", firstName: "Remelyn", lastName: "Rinon" },
  //     salary: 24000,
  //     date: "2023-05-31",
  //   },
  //   {
  //     id: "2",
  //     dentist: { id: "2", firstName: "Lady", lastName: "Ancheta" },
  //     salary: 24000,
  //     date: "2023-05-31",
  //   },
  // ]);

  const [salaryList, setSalaryList] = useState([]);

  const [dateFilter, setDateFilter] = useState("Month");

  // Selection of wether Revenue or Expenses
  const [viewRev, setViewRev] = useState(true);

  const [viewExp, setViewExp] = useState(false);

  // Revenue Selection of Report
  const [increport, setincReport] = useState(true);

  const [increportperdent, setincReportperDent] = useState(false);

  const [increportperinsu, setincReportperInsu] = useState(false);

  // Expenses Selection of Report
  const [salaryreport, setsalaryReport] = useState(true);

  const [commiperdent, setcommiperDent] = useState(false);

  const [otherexpenses, setotherExpenses] = useState(false);

  const [addexpenses, setAddExpenses] = useState(false);

  // Selection of what expense
  const [salaryR, setSalaryR] = useState(true);
  const [otherexpense, setOtherExp] = useState(false);
  const [dentistspopup, setdentistpopup] = useState(false);

  const [dentSalaryList, setDentSalaryList] = useState(false);

  const [salaryData, setSalaryData] = useState({
    dentist: "",
    salary: "",
    date: "",
  });

  const [otherData, setOtherData] = useState({
    dentist: "",
    description: "",
    amount: "",
    date: "",
  });

  // Errors
  const [errorsSalary, setErrorsSalary] = useState({});
  const [errorsExpense, setErrorsExpense] = useState({});

  function showIncome() {
    if (viewRev === true) {
      if (viewExp === true) {
        setViewRev(!viewRev);
      } else if (viewExp === false) {
        setViewRev(viewRev);
      }
    } else {
      setViewRev(!viewRev);
      setViewExp(!viewExp);
    }
  }

  function showexpenses() {
    if (viewExp === true) {
      if (viewRev === true) {
        setViewExp(!viewExp);
      } else if (viewRev === false) {
        setViewExp(viewExp);
      }
    } else {
      setViewExp(!viewExp);
      setViewRev(!viewRev);
    }
  }

  // Revenue Selection of Report
  function selectIncomeRep() {
    setincReport(!increport);
    setincReportperDent(false);
    setincReportperInsu(false);
  }
  function selectIncomeperDent() {
    setincReportperDent(!increportperdent);
    setincReport(false);
    setincReportperInsu(false);
  }
  function selectIncomeperinsu() {
    setincReportperInsu(!increportperinsu);
    setincReport(false);
    setincReportperDent(false);
  }

  // Expenses Selection of Report
  function selectSalaryRep() {
    setsalaryReport(!salaryreport);
    setcommiperDent(false);
    setotherExpenses(false);
  }

  function selectCommiperDent() {
    setcommiperDent(!commiperdent);
    setsalaryReport(false);
    setotherExpenses(false);
  }

  function selectOtherExpenses() {
    setotherExpenses(!otherexpenses);
    setcommiperDent(false);
    setsalaryReport(false);
  }

  // Add Expenses Pop-up & dent Salary list
  function showAddExpenses() {
    if (viewRev === true) {
      setAddExpenses(false);
    } else {
      setAddExpenses(!addexpenses);
    }

    setSalaryData({
      dentist: "",
      salary: "",
      date: "",
    });

    setOtherData({ description: "", amount: "", date: "" });
    setErrorsExpense({});
    setErrorsSalary({});
  }
  function dentsalaryList(assoc) {
    setDentSalaryList(!dentSalaryList);
    const listSalary = salaries.filter((s) => s.dentist._id === assoc._id);

    // const salMonth = listSalary.filter((salary) => {
    //   let [year, month] = salary.date.split("-");
    //   return currentMonth === +month && currentYear == year;
    // });

    // const salYear = listSalary.filter((salary) => {
    //   let [year] = salary.date.split("-");
    //   return currentYear == year;
    // });

    // const salToday = listSalary.filter((salary) => {
    //   let [year, month, today] = salary.date.split("-");
    //   return (
    //     currentMonth === +month && currentYear == year && currentDay === +today
    //   );
    // });

    setSalaryList(listSalary);
  }

  function closeDentSalaryList() {
    setDentSalaryList(!dentSalaryList);
    setSalaryList([]);
  }

  // Popup
  function addsalary() {
    setSalaryR(!salaryR);
    setOtherExp(false);
  }

  function addotherexpenses() {
    setOtherExp(!otherexpense);
    setSalaryR(false);

    setOtherData({ description: "", amount: "" });
  }

  function choosedentist() {
    setdentistpopup(!dentistspopup);
    setAddExpenses(!addexpenses);
  }

  function choosenDentist(dentist) {
    let parseddentist = JSON.parse(dentist);
    setSalaryData((prev) => {
      return { ...prev, dentist: parseddentist };
    });
    setdentistpopup(!dentistspopup);
    setViewExp(true);
    setAddExpenses(!addexpenses);
  }

  function handlesalaryChange(e) {
    let value = e.currentTarget.value;
    let name = e.currentTarget.name;
    setSalaryData((prev) => {
      return { ...prev, [name]: value };
    });
  }

  function handleOtherExpChange(e) {
    let value = e.currentTarget.value;
    let name = e.currentTarget.name;
    setOtherData((prev) => {
      return { ...prev, [name]: value };
    });
  }

  function addSalary() {
    const errors = validateSalary();
    setErrorsSalary(errors || {});

    if (errors) return;

    const data = salaryData;
    data.date = dayjs(salaryData.date).format("YYYY/MM/DD");
    data.dentist = salaryData.dentist._id;

    expenseContext.addSalary(data);

    setAddExpenses(!addexpenses);
  }
  function deleteSalary(salary) {
    const salaries2 = salaryList.filter((sa) => sa._id !== salary._id);
    expenseContext.deleteSalary(salary);
    console.log(salaries);
    setSalaryList(salaries2);
  }

  function addOtherExpenses() {
    const errors = validateOtherExpenses();
    setErrorsExpense(errors || {});

    if (errors) return;
    const data = otherData;
    data.date = dayjs(otherData.date).format("YYYY/MM/DD");

    expenseContext.addOtherExpense(data);
    // setOtherexp((oldArray) => [...oldArray, expense]);
    setAddExpenses(!addexpenses);
  }

  // Filtering
  function changeFiltering(e) {
    let filter = e.currentTarget.value;
    setDateFilter(filter);
  }

  // Filtering either Total revenue or Total expenses
  const currentMonth = moment().month() + 1;
  const currentYear = moment().year();
  const currentDay = moment().date();

  const payMonth = payments.filter((pay) => {
    let [year, month] = pay.date.split("-");
    return currentMonth === +month && currentYear == year;
  });

  const payYear = payments.filter((pay) => {
    let [year] = pay.date.split("-");
    return currentYear == year;
  });

  const payToday = payments.filter((pay) => {
    let [year, month, today] = pay.date.split("-");
    return (
      currentMonth === +month && currentYear == year && currentDay === +today
    );
  });

  const salMonth = salaries.filter((salary) => {
    let [year, month] = salary.date.split("-");
    return currentMonth === +month && currentYear == year;
  });

  const salYear = salaries.filter((salary) => {
    let [year] = salary.date.split("-");
    return currentYear == year;
  });

  const salToday = salaries.filter((salary) => {
    let [year, month, today] = salary.date.split("-");
    return (
      currentMonth === +month && currentYear == year && currentDay === +today
    );
  });

  const expenseMonth = otherExpense.filter((expenses) => {
    let [year, month] = expenses.date.split("-");
    return currentMonth === +month && currentYear == year;
  });

  const expenseYear = otherExpense.filter((expenses) => {
    let [year] = expenses.date.split("-");
    return currentYear == year;
  });

  const expenseToday = otherExpense.filter((expenses) => {
    let [year, month, today] = expenses.date.split("-");
    return (
      currentMonth === +month && currentYear == year && currentDay === +today
    );
  });

  const pay = {
    Month: payMonth,
    Year: payYear,
    Today: payToday,
  };

  const totalSalaries = {
    Month: salMonth,
    Year: salYear,
    Today: salToday,
  };

  const totalExpenses = {
    Month: expenseMonth,
    Year: expenseYear,
    Today: expenseToday,
  };

  let filteredPayment = pay[dateFilter];

  let filteredSalary = totalSalaries[dateFilter];

  let filteredExpenses = totalExpenses[dateFilter];

  function computeTotalRevenue() {
    let revenue = 0;

    for (let i = 0; i < filteredPayment.length; i++) {
      revenue += filteredPayment[i].treatment.procedure.amount;
    }
    return revenue;
  }

  function computeTotalExpenses() {
    let expense = 0;
    // Commi
    const withoutowner = filteredPayment.filter(
      (commi) => filteredPayment[0].handledby._id !== filteredPayment[0].dentist
    );
    for (let i = 0; i < withoutowner.length; i++) {
      expense += withoutowner[i].treatment.procedure.amount * 0.1;
    }
    // Salary
    for (let i = 0; i < filteredSalary.length; i++) {
      expense += filteredSalary[i].salary;
    }
    // Other Expenses
    for (let i = 0; i < filteredExpenses.length; i++) {
      expense += filteredExpenses[i].amount;
    }
    return expense;
  }
  // Format for number to be currency
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "Php",
  });

  // Salary Validation
  const schemaDent = Joi.object({
    firstName: Joi.string().min(3).max(20).required(),
    lastName: Joi.string().min(3).max(20).required(),
  }).options({ stripUnknown: true });
  const schemaSalary = Joi.object({
    dentist: schemaDent,
    salary: Joi.number().required(),
    date: Joi.date().required(),
  }).options({ stripUnknown: true });

  function validateSalary() {
    const result = schemaSalary.validate(salaryData, { abortEarly: false });
    if (!result.error) return null;

    const errors = {};

    for (let item of result.error.details) {
      errors[item.path[0]] = item.message;
    }

    return errors;
  }

  // Other Expenses Validation

  const schemaOtherExpenses = Joi.object({
    description: Joi.string().min(3).max(20).required(),
    amount: Joi.number().required(),
    date: Joi.date().required(),
  }).options({ stripUnknown: true });

  function validateOtherExpenses() {
    const result = schemaOtherExpenses.validate(otherData, {
      abortEarly: false,
    });
    if (!result.error) return null;

    const errors = {};

    for (let item of result.error.details) {
      errors[item.path[0]] = item.message;
    }

    return errors;
  }
  return (
    <div className="w-full bg-slate-50">
      {/* Mobile */}
      <div className="w-full bg-slate-50 md:hidden">
        <div className="flex items-center justify-evenly pt-14">
          <h1 className="text-2xl tracking-widest font-bold px-2">Finances</h1>
          <div className="flex pr-2 items-center">
            <h2 className="text-xs w-[45px]">Filter By</h2>
            <div className="w-full max-w-[150px] min-w-[150px] ">
              <select
                id="date"
                name="date"
                className="border-2 outline-none rounded-xl w-full text-sm pl-1"
                value={dateFilter}
                onChange={changeFiltering}
              >
                <option value="Year">This Year</option>
                <option value="Month">This Month</option>
                <option value="Today">Today</option>
              </select>
            </div>
          </div>
        </div>
        <div className="mx-2">
          <div className="bg-[#32612d] mt-5 max-w-[400px] min-w-[250px] w-full h-full m-auto rounded-2xl">
            <div className="px-2 pb-1 pt-2 flex">
              <GiReceiveMoney fill="white" size={40} />
              <div className="text-white -translate-y-1 px-1">
                <h2>Total Revenue</h2>
                <p className="text-xl font-medium">
                  {formatter.format(computeTotalRevenue())}
                </p>
              </div>
            </div>
            <div className="flex justify-evenly text-xs pb-2">
              <div
                className="flex text-white bg-[#3cb043] min-w-[120px]  max-w-[130px] w-full mx-1 py-1 rounded-3xl justify-center cursor-pointer"
                onClick={showIncome}
              >
                <AiFillEye className=" mx-1" size={15} fill="white" />
                <p>View Revenue</p>
              </div>
              <a
                href="/dashboard/patients"
                className="flex text-white bg-[#3cb043] min-w-[120px] max-w-[130px] w-full mx-1 py-1 rounded-3xl justify-center cursor-pointer"
              >
                <IoMdAdd className=" mx-1" size={15} fill="white" />
                <p>Add Revenue</p>
              </a>
            </div>
          </div>
        </div>
        <div className="px-2">
          <div className="bg-[#60100b] max-w-[400px] min-w-[250px] w-full  h-full m-auto rounded-2xl mt-3">
            <div className="px-2 pb-1 pt-2 flex">
              <GiPayMoney fill="white" size={40} />
              <div className="text-white -translate-y-1 px-1">
                <h2>Total Expenses</h2>
                <p className="text-xl font-medium">
                  {formatter.format(computeTotalExpenses())}
                </p>
              </div>
            </div>
            <div className="flex justify-evenly text-xs pb-2">
              <div
                className="flex text-white bg-[#e3242b] min-w-[120px]  max-w-[130px] w-full mx-1  py-1 rounded-3xl justify-center cursor-pointer"
                onClick={showexpenses}
              >
                <AiFillEye className=" mx-1" size={15} fill="white" />
                <p>View Expenses</p>
              </div>
              <div
                className="flex text-white bg-[#e3242b] min-w-[120px] max-w-[130px] w-full mx-1 py-1 rounded-3xl justify-center cursor-pointer"
                onClick={showAddExpenses}
              >
                <IoMdAdd className=" mx-1" size={15} fill="white" />
                <p>Add Expenses</p>
              </div>
            </div>
          </div>
        </div>
        {viewRev ? (
          <div>
            <div className="pt-2">
              <div className="border-t-2"></div>
              <div className="flex">
                <div
                  className={
                    !increport
                      ? "text-sm max-w-[400px] min-w-[100px] w-full text-center bg-slate-300  cursor-pointer hover:bg-slate-100"
                      : "text-sm max-w-[400px] min-w-[100px] w-full text-center bg-slate-100  cursor-pointer hover:bg-slate-100"
                  }
                  onClick={selectIncomeRep}
                >
                  Income <br />
                  Report
                </div>
                <div className="border-l-2"></div>
                <div
                  className={
                    !increportperdent
                      ? "text-sm max-w-[400px] min-w-[100px] w-full text-center  bg-slate-300  cursor-pointer hover:bg-slate-100"
                      : "text-sm max-w-[400px] min-w-[100px] w-full text-center  bg-slate-100  cursor-pointer hover:bg-slate-100"
                  }
                  onClick={selectIncomeperDent}
                >
                  Income Report <br /> Dentist
                </div>
                <div className="border-l-2"></div>
                <div
                  className={
                    !increportperinsu
                      ? "text-sm max-w-[400px] min-w-[100px] w-full text-center  bg-slate-300  cursor-pointer hover:bg-slate-100"
                      : "text-sm max-w-[400px] min-w-[100px] w-full text-center  bg-slate-100  cursor-pointer hover:bg-slate-100"
                  }
                  onClick={selectIncomeperinsu}
                >
                  Income Report <br />
                  Insurance
                </div>
              </div>
              <div className="border-b-2"></div>
              {increport ? (
                <IncomeReport
                  payments={payments}
                  pxs={pxs}
                  dateFilter={dateFilter}
                />
              ) : (
                <div></div>
              )}
              {!increportperdent ? (
                <div></div>
              ) : (
                <IncomeRepPerDent
                  payments={payments}
                  associates={associates}
                  dateFilter={dateFilter}
                />
              )}
              {!increportperinsu ? (
                <div></div>
              ) : (
                <IncomeRepPerInsu
                  payments={payments}
                  companies={companies}
                  dateFilter={dateFilter}
                />
              )}
            </div>
          </div>
        ) : (
          <div></div>
        )}
        {!viewExp ? (
          <div></div>
        ) : (
          <div className="pt-2">
            <div className="border-t-2"></div>
            <div className="flex">
              <div
                className={
                  salaryreport
                    ? "text-sm max-w-[400px] min-w-[110px] w-full text-center bg-slate-100  cursor-pointer hover:bg-slate-100"
                    : "text-sm max-w-[400px] min-w-[110px] w-full text-center bg-slate-300  cursor-pointer hover:bg-slate-100"
                }
                onClick={selectSalaryRep}
              >
                Salary <br /> Report
              </div>
              <div className="border-l-2"></div>
              <div
                className={
                  !commiperdent
                    ? "text-sm max-w-[400px] min-w-[110px] w-full text-center  bg-slate-300  cursor-pointer hover:bg-slate-100"
                    : "text-sm max-w-[400px] min-w-[110px] w-full text-center  bg-slate-100  cursor-pointer hover:bg-slate-100"
                }
                onClick={selectCommiperDent}
              >
                Commision per <br /> Dentist
              </div>
              <div className="border-l-2"></div>
              <div
                className={
                  !otherexpenses
                    ? "text-sm max-w-[400px] min-w-[110px] w-full text-center  bg-slate-300 cursor-pointer hover:bg-slate-100"
                    : "text-sm max-w-[400px] min-w-[10px] w-full text-center  bg-slate-100 cursor-pointer hover:bg-slate-100"
                }
                onClick={selectOtherExpenses}
              >
                Other <br />
                Expenses
              </div>
            </div>
            <div className="border-b-2"></div>
            {!salaryreport ? (
              <div></div>
            ) : (
              <SalaryReport
                salary={salaries}
                associates={associates}
                dateFilter={dateFilter}
                showSalaryList={dentsalaryList}
              />
            )}
            {!commiperdent ? (
              <div></div>
            ) : (
              <CommisionPerDent
                payments={payments}
                associates={associates}
                dateFilter={dateFilter}
              />
            )}
            {!otherexpenses ? (
              <div></div>
            ) : (
              <OtherExpenses
                otherexpenses={otherExpense}
                dateFilter={dateFilter}
              />
            )}
          </div>
        )}
        {/* Add Expenses  */}
        <div
          className={
            !addexpenses
              ? "w-1/2 h-1/2 absolute left-0 right-0 top-0 bottom-0 m-auto hidden -z-10"
              : "w-[80%] h-1/2 absolute left-0 right-0 top-0 bottom-0 m-auto z-20 md:hidden"
          }
        >
          <div className=" bg-white h-[320px] w-full m-auto rounded-xl overflow-y-auto">
            <div className="flex justify-end pt-1 px-1">
              <AiOutlineClose
                className=" cursor-pointer"
                fill="#FF2400"
                onClick={showAddExpenses}
                size={25}
              />
            </div>
            <div className="flex justify-evenly">
              <div
                className="bg-[#1993c6] px-3 py-1 rounded-xl text-white cursor-pointer"
                onClick={addsalary}
              >
                Add Salary
              </div>
              <div
                className="bg-[#1993c6] px-3 py-1 rounded-xl  text-white cursor-pointer"
                onClick={addotherexpenses}
              >
                Other Expenses
              </div>
            </div>
            {/* Salary Inputs */}
            {salaryR ? (
              <div className="pt-3 mr-3">
                <div className=" m-auto max-w-[380px] min-w-[200px] px-9 pb-1">
                  <h2 className="">
                    Dentist{" "}
                    {errorsSalary.dentist && (
                      <span className="text-red-600 text-lg font-bold">
                        {" "}
                        *{" "}
                      </span>
                    )}
                  </h2>
                  <div className="flex justify-between">
                    {!salaryData.dentist ? (
                      <h3 className="text-gray-300">Dentist</h3>
                    ) : (
                      <h3 className="">{`Dr. ${salaryData.dentist.lastName}, ${salaryData.dentist.firstName}`}</h3>
                    )}

                    <AiFillCaretDown
                      className="translate-y-1 cursor-pointer"
                      fill="#ddd8db"
                      onClick={choosedentist}
                    />
                  </div>
                  <div className="border-b-2"></div>
                </div>
                <div className=" m-auto max-w-[380px] min-w-[200px] px-9 pb-1 pt-1">
                  <label htmlFor="salary">
                    Salary{" "}
                    {errorsSalary.salary && (
                      <span className="text-red-600 text-lg font-bold">
                        {" "}
                        *{" "}
                      </span>
                    )}
                  </label>
                  <input
                    value={salaryData.salary}
                    className="border-b-2 outline-none w-full"
                    type="number"
                    name="salary"
                    id="salary"
                    placeholder="Php ......"
                    onChange={handlesalaryChange}
                  />
                </div>
                <div className=" m-auto max-w-[380px] min-w-[200px] px-9 pb-1">
                  <label className="text-sm" htmlFor="dates">
                    Date
                    {errorsSalary.date && (
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
                    value={salaryData.date}
                    onChange={handlesalaryChange}
                  />
                </div>
                <div className="flex justify-center pt-3">
                  <button
                    className="bg-[#1993c6] px-14 py-1 rounded-full text-white outline-none font-medium text-lg"
                    onClick={addSalary}
                  >
                    Submit
                  </button>
                </div>
              </div>
            ) : (
              <div></div>
            )}
            {/* Other Expenses */}
            {otherexpense ? (
              <div className="pt-2 mr-3">
                <div className=" m-auto max-w-[380px] min-w-[200px] px-9 pb-1 pt-1">
                  <label htmlFor="description">
                    Description{" "}
                    {errorsExpense.description && (
                      <span className="text-red-600 text-lg font-bold">
                        {" "}
                        *{" "}
                      </span>
                    )}
                  </label>
                  <input
                    value={otherData.description}
                    className="border-b-2 outline-none w-full"
                    type="text"
                    id="description"
                    placeholder="Description"
                    name="description"
                    onChange={handleOtherExpChange}
                  />
                </div>
                <div className=" m-auto max-w-[380px] min-w-[200px] px-9 pb-1 pt-1">
                  <label htmlFor="amount">
                    Amount{" "}
                    {errorsExpense.amount && (
                      <span className="text-red-600 text-lg font-bold">
                        {" "}
                        *{" "}
                      </span>
                    )}
                  </label>
                  <input
                    value={otherData.amount}
                    className="border-b-2 outline-none w-full"
                    type="number"
                    id="amount"
                    placeholder="Php ......"
                    name="amount"
                    onChange={handleOtherExpChange}
                  />
                </div>
                <div className=" m-auto max-w-[380px] min-w-[200px] px-9 pb-1">
                  <label className="text-sm" htmlFor="dates">
                    Date{" "}
                    {errorsExpense.date && (
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
                    value={otherData.date}
                    onChange={handleOtherExpChange}
                  />
                </div>
                <div className="flex justify-center pt-3  ">
                  <button
                    className="bg-[#1993c6] px-14 py-1 rounded-full text-white outline-none font-medium text-lg"
                    onClick={addOtherExpenses}
                  >
                    Submit
                  </button>
                </div>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
        <div
          className={
            !addexpenses
              ? "w-full h-full bg-slate-300 opacity-80 absolute top-0 hidden"
              : "w-full h-full bg-slate-300 opacity-80 absolute top-0 z-10 md:hidden"
          }
        ></div>
        <div
          className={
            !dentistspopup
              ? "w-1/2 h-1/2 absolute left-0 right-0 top-0 bottom-0 m-auto hidden -z-10"
              : "w-[80%] h-1/2 absolute left-0 right-0 top-0 bottom-0 m-auto z-20 md:hidden"
          }
        >
          <DentistList
            dentists={associates}
            back={choosedentist}
            chosenDentist={choosenDentist}
          />
        </div>
        <div
          className={
            !dentistspopup
              ? "w-full h-full bg-slate-300 opacity-80 absolute top-0 hidden"
              : "w-full h-full bg-slate-300 opacity-80 absolute top-0 z-10 md:hidden"
          }
        ></div>
        <div
          className={
            !dentSalaryList
              ? "w-1/2 h-1/2 absolute left-0 right-0 top-0 bottom-0 m-auto hidden -z-10"
              : "w-[80%] h-1/2 absolute left-0 right-0 top-0 bottom-0 m-auto z-20 md:hidden"
          }
        >
          <div className=" bg-white h-[320px] w-full m-auto rounded-xl overflow-y-auto">
            <div className="flex justify-end pt-1 px-1">
              <AiOutlineClose
                className=" cursor-pointer"
                fill="#FF2400"
                onClick={closeDentSalaryList}
                size={20}
              />
            </div>
            <div className="text-center">List of Salaries</div>
            <div className="h-[270px] overflow-y-auto">
              {salaryList.map((sl) => (
                <div
                  key={sl._id}
                  className="flex justify-evenly pt-2 max-w-[380px]  m-auto border-b-2"
                >
                  <div>Php {sl.salary}.00</div>
                  <div>{dayjs(sl.date).format("MMM/DD/YYYY")}</div>
                  <AiOutlineDelete
                    className="translate-y-1 cursor-pointer"
                    size={18}
                    onClick={() => deleteSalary(sl)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div
          className={
            !dentSalaryList
              ? "w-full h-full bg-slate-300 opacity-80 absolute top-0 hidden"
              : "w-full h-full bg-slate-300 opacity-80 absolute top-0 z-10 md:hidden"
          }
        ></div>
      </div>

      {/* Large Screen */}
      <div className="w-full bg-slate-50  hidden md:block">
        <div className="flex items-center justify-between ">
          <h1 className="text-3xl tracking-widest font-bold p-3">Finances</h1>
          <div className="flex pr-8">
            <h2 className="w-[90px]">Filter By:</h2>
            <div className="w-full max-w-[250px] min-w-[200px] ">
              <select
                id="date"
                name="date"
                className="border-2 outline-none rounded-xl w-full pl-1"
                value={dateFilter}
                onChange={changeFiltering}
              >
                <option value="Year">This Year</option>
                <option value="Month">This Month</option>
                <option value="Today">Today</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex h-[110px] justify-between">
          <div className="bg-[#32612d] max-w-[450px] min-w-[250px] w-full h-full mx-2 rounded-2xl">
            <div className="p-2 flex">
              <GiReceiveMoney fill="white" size={45} />
              <div className="text-white -translate-y-1 px-1">
                <h2>Total Revenue</h2>
                <p className="text-2xl font-medium">
                  {formatter.format(computeTotalRevenue())}
                </p>
              </div>
            </div>
            <div className="flex justify-evenly text-xs pt-1">
              <div
                className="flex text-white bg-[#3cb043] min-w-[120px]  max-w-[150px] w-full mx-1 py-1 rounded-3xl justify-center cursor-pointer"
                onClick={showIncome}
              >
                <AiFillEye className=" mx-1" size={15} fill="white" />
                <p>View Revenue</p>
              </div>
              <a
                href="/dashboard/patients"
                className="flex text-white bg-[#3cb043] min-w-[120px] max-w-[150px] w-full mx-1 py-1 rounded-3xl justify-center cursor-pointer"
              >
                <IoMdAdd className=" mx-1" size={15} fill="white" />
                <p>Add Revenue</p>
              </a>
            </div>
          </div>
          <div className="bg-[#60100b] max-w-[450px] min-w-[250px] w-full  h-full mx-2 rounded-2xl">
            <div className="p-2 flex">
              <GiPayMoney fill="white" size={45} />
              <div className="text-white -translate-y-1 px-1">
                <h2>Total Expenses</h2>
                <p className="text-2xl font-medium">
                  {formatter.format(computeTotalExpenses())}
                </p>
              </div>
            </div>
            <div className="flex justify-evenly text-xs pt-1">
              <div
                className="flex text-white bg-[#e3242b] min-w-[120px]  max-w-[150px] w-full mx-1  py-1 rounded-3xl justify-center cursor-pointer"
                onClick={showexpenses}
              >
                <AiFillEye className=" mx-1" size={15} fill="white" />
                <p>View Expenses</p>
              </div>
              <div
                className="flex text-white bg-[#e3242b] min-w-[120px] max-w-[150px] w-full mx-1 py-1 rounded-3xl justify-center cursor-pointer"
                onClick={showAddExpenses}
              >
                <IoMdAdd className=" mx-1" size={15} fill="white" />
                <p>Add Expenses</p>
              </div>
            </div>
          </div>
        </div>
        {viewRev ? (
          <div>
            <div className="pt-2">
              <div className="border-t-2"></div>
              <div className="flex">
                <div
                  className={
                    !increport
                      ? "text-sm max-w-[400px] min-w-[150px] w-full text-center bg-slate-300  cursor-pointer hover:bg-slate-100"
                      : "text-sm max-w-[400px] min-w-[150px] w-full text-center bg-slate-100  cursor-pointer hover:bg-slate-100"
                  }
                  onClick={selectIncomeRep}
                >
                  Income <br />
                  Report
                </div>
                <div className="border-l-2"></div>
                <div
                  className={
                    !increportperdent
                      ? "text-sm max-w-[400px] min-w-[150px] w-full text-center  bg-slate-300  cursor-pointer hover:bg-slate-100"
                      : "text-sm max-w-[400px] min-w-[150px] w-full text-center  bg-slate-100  cursor-pointer hover:bg-slate-100"
                  }
                  onClick={selectIncomeperDent}
                >
                  Income Report per <br /> Dentist
                </div>
                <div className="border-l-2"></div>
                <div
                  className={
                    !increportperinsu
                      ? "text-sm max-w-[400px] min-w-[150px] w-full text-center  bg-slate-300  cursor-pointer hover:bg-slate-100"
                      : "text-sm max-w-[400px] min-w-[150px] w-full text-center  bg-slate-100  cursor-pointer hover:bg-slate-100"
                  }
                  onClick={selectIncomeperinsu}
                >
                  Income Report per <br />
                  Insurance
                </div>
              </div>
              <div className="border-b-2"></div>
              {increport ? (
                <IncomeReport
                  payments={payments}
                  pxs={pxs}
                  dateFilter={dateFilter}
                />
              ) : (
                <div></div>
              )}
              {!increportperdent ? (
                <div></div>
              ) : (
                <IncomeRepPerDent
                  payments={payments}
                  associates={associates}
                  dateFilter={dateFilter}
                />
              )}
              {!increportperinsu ? (
                <div></div>
              ) : (
                <IncomeRepPerInsu
                  payments={payments}
                  companies={companies}
                  dateFilter={dateFilter}
                />
              )}
            </div>
          </div>
        ) : (
          <div></div>
        )}
        {!viewExp ? (
          <div></div>
        ) : (
          <div className="pt-2">
            <div className="border-t-2"></div>
            <div className="flex">
              <div
                className={
                  salaryreport
                    ? "text-sm max-w-[400px] min-w-[150px] w-full text-center bg-slate-100  cursor-pointer hover:bg-slate-100"
                    : "text-sm max-w-[400px] min-w-[150px] w-full text-center bg-slate-300  cursor-pointer hover:bg-slate-100"
                }
                onClick={selectSalaryRep}
              >
                Salary <br /> Report
              </div>
              <div className="border-l-2"></div>
              <div
                className={
                  !commiperdent
                    ? "text-sm max-w-[400px] min-w-[150px] w-full text-center  bg-slate-300  cursor-pointer hover:bg-slate-100"
                    : "text-sm max-w-[400px] min-w-[150px] w-full text-center  bg-slate-100  cursor-pointer hover:bg-slate-100"
                }
                onClick={selectCommiperDent}
              >
                Commision per <br /> Dentist
              </div>
              <div className="border-l-2"></div>
              <div
                className={
                  !otherexpenses
                    ? "text-sm max-w-[400px] min-w-[150px] w-full text-center  bg-slate-300 cursor-pointer hover:bg-slate-100"
                    : "text-sm max-w-[400px] min-w-[150px] w-full text-center  bg-slate-100 cursor-pointer hover:bg-slate-100"
                }
                onClick={selectOtherExpenses}
              >
                Other <br />
                Expenses
              </div>
            </div>
            <div className="border-b-2"></div>
            {!salaryreport ? (
              <div></div>
            ) : (
              <SalaryReport
                salary={salaries}
                associates={associates}
                dateFilter={dateFilter}
                showSalaryList={dentsalaryList}
              />
            )}
            {!commiperdent ? (
              <div></div>
            ) : (
              <CommisionPerDent
                payments={payments}
                associates={associates}
                dateFilter={dateFilter}
              />
            )}
            {!otherexpenses ? (
              <div></div>
            ) : (
              <OtherExpenses
                otherexpenses={otherExpense}
                dateFilter={dateFilter}
              />
            )}
          </div>
        )}

        {/* Add Expenses  */}
        <div
          className={
            !addexpenses
              ? "w-1/2 h-1/2 absolute left-0 right-0 top-0 bottom-0 m-auto hidden -z-10"
              : "w-[40%] h-1/2 absolute left-0 right-0 top-0 bottom-0 m-auto z-20 "
          }
        >
          <div className=" bg-white h-[320px] w-full m-auto rounded-xl overflow-y-auto">
            <div className="flex justify-end pt-1 px-1">
              <AiOutlineClose
                className=" cursor-pointer"
                fill="#FF2400"
                onClick={showAddExpenses}
                size={25}
              />
            </div>
            <div className="flex justify-evenly">
              <div
                className="bg-[#1993c6] px-3 py-1 rounded-xl text-white cursor-pointer"
                onClick={addsalary}
              >
                Add Salary
              </div>
              <div
                className="bg-[#1993c6] px-3 py-1 rounded-xl  text-white cursor-pointer"
                onClick={addotherexpenses}
              >
                Other Expenses
              </div>
            </div>
            {/* Salary Inputs */}
            {salaryR ? (
              <div className="pt-3 mr-3">
                <div className=" m-auto max-w-[380px] min-w-[200px] px-9 pb-1">
                  <h2 className="">
                    Dentist{" "}
                    {errorsSalary.dentist && (
                      <span className="text-red-600 text-lg font-bold">
                        {" "}
                        *{" "}
                      </span>
                    )}
                  </h2>
                  <div className="flex justify-between">
                    {!salaryData.dentist ? (
                      <h3 className="text-gray-300">Dentist</h3>
                    ) : (
                      <h3 className="">{`Dr. ${salaryData.dentist.lastName}, ${salaryData.dentist.firstName}`}</h3>
                    )}

                    <AiFillCaretDown
                      className="translate-y-1 cursor-pointer"
                      fill="#ddd8db"
                      onClick={choosedentist}
                    />
                  </div>
                  <div className="border-b-2"></div>
                </div>
                <div className=" m-auto max-w-[380px] min-w-[200px] px-9 pb-1 pt-1">
                  <label htmlFor="salary">
                    Salary{" "}
                    {errorsSalary.salary && (
                      <span className="text-red-600 text-lg font-bold">
                        {" "}
                        *{" "}
                      </span>
                    )}
                  </label>
                  <input
                    value={salaryData.salary}
                    className="border-b-2 outline-none w-full"
                    type="number"
                    name="salary"
                    id="salary"
                    placeholder="Php ......"
                    onChange={handlesalaryChange}
                  />
                </div>
                <div className=" m-auto max-w-[380px] min-w-[200px] px-9 pb-1">
                  <label className="text-sm" htmlFor="dates">
                    Date
                    {errorsSalary.date && (
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
                    value={salaryData.date}
                    onChange={handlesalaryChange}
                  />
                </div>
                <div className="flex justify-center pt-3">
                  <button
                    className="bg-[#1993c6] px-14 py-1 rounded-full text-white outline-none font-medium text-lg"
                    onClick={addSalary}
                  >
                    Submit
                  </button>
                </div>
              </div>
            ) : (
              <div></div>
            )}
            {/* Other Expenses */}
            {otherexpense ? (
              <div className="pt-2 mr-3">
                <div className=" m-auto max-w-[380px] min-w-[200px] px-9 pb-1 pt-1">
                  <label htmlFor="description">
                    Description{" "}
                    {errorsExpense.description && (
                      <span className="text-red-600 text-lg font-bold">
                        {" "}
                        *{" "}
                      </span>
                    )}
                  </label>
                  <input
                    value={otherData.description}
                    className="border-b-2 outline-none w-full"
                    type="text"
                    id="description"
                    placeholder="Description"
                    name="description"
                    onChange={handleOtherExpChange}
                  />
                </div>
                <div className=" m-auto max-w-[380px] min-w-[200px] px-9 pb-1 pt-1">
                  <label htmlFor="amount">
                    Amount{" "}
                    {errorsExpense.amount && (
                      <span className="text-red-600 text-lg font-bold">
                        {" "}
                        *{" "}
                      </span>
                    )}
                  </label>
                  <input
                    value={otherData.amount}
                    className="border-b-2 outline-none w-full"
                    type="number"
                    id="amount"
                    placeholder="Php ......"
                    name="amount"
                    onChange={handleOtherExpChange}
                  />
                </div>
                <div className=" m-auto max-w-[380px] min-w-[200px] px-9 pb-1">
                  <label className="text-sm" htmlFor="dates">
                    Date{" "}
                    {errorsExpense.date && (
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
                    value={otherData.date}
                    onChange={handleOtherExpChange}
                  />
                </div>
                <div className="flex justify-center pt-3  ">
                  <button
                    className="bg-[#1993c6] px-14 py-1 rounded-full text-white outline-none font-medium text-lg"
                    onClick={addOtherExpenses}
                  >
                    Submit
                  </button>
                </div>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
        {/* Dentist List */}
        <div
          className={
            !dentistspopup
              ? "w-1/2 h-1/2 absolute left-0 right-0 top-0 bottom-0 m-auto hidden -z-10"
              : "w-[40%] h-1/2 absolute left-0 right-0 top-0 bottom-0 m-auto z-20 "
          }
        >
          <DentistList
            dentists={associates}
            back={choosedentist}
            chosenDentist={choosenDentist}
          />
        </div>
        <div
          className={
            !addexpenses
              ? "w-full h-full bg-slate-300 opacity-80 absolute top-0 hidden"
              : "w-full h-full bg-slate-300 opacity-80 absolute top-0 z-10"
          }
        ></div>
        <div
          className={
            !dentistspopup
              ? "w-full h-full bg-slate-300 opacity-80 absolute top-0 hidden"
              : "w-full h-full bg-slate-300 opacity-80 absolute top-0 z-10 hidden md:block"
          }
        ></div>
        <div
          className={
            !dentistspopup
              ? "w-full h-full bg-slate-300 opacity-80 absolute top-0 hidden"
              : "w-full h-full bg-slate-300 opacity-80 absolute md:hidden top-0 z-10"
          }
        ></div>
        {/* Salary Report Dentist Salaries Popup */}
        <div
          className={
            !dentSalaryList
              ? "w-1/2 h-1/2 absolute left-0 right-0 top-0 bottom-0 m-auto hidden -z-10"
              : "w-[40%] h-1/2 absolute left-0 right-0 top-0 bottom-0 m-auto z-20 "
          }
        >
          <div className=" bg-white h-[320px] w-full m-auto rounded-xl overflow-y-auto">
            <div className="flex justify-end pt-1 px-1">
              <AiOutlineClose
                className=" cursor-pointer"
                fill="#FF2400"
                onClick={closeDentSalaryList}
                size={20}
              />
            </div>
            <div className="text-center">List of Salaries</div>
            <div className="h-[270px] overflow-y-auto">
              {salaryList.map((sl) => (
                <div
                  key={sl._id}
                  className="flex justify-evenly pt-2 max-w-[380px]  m-auto border-b-2"
                >
                  <div>Php {sl.salary}.00</div>
                  <div>{dayjs(sl.date).format("MMM/DD/YYYY")}</div>
                  <AiOutlineDelete
                    className="translate-y-1 cursor-pointer"
                    size={18}
                    onClick={() => deleteSalary(sl)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div
          className={
            !dentSalaryList
              ? "w-full h-full bg-slate-300 opacity-80 absolute top-0 hidden"
              : "w-full h-full bg-slate-300 opacity-80 absolute top-0 z-10"
          }
        ></div>
      </div>
    </div>
  );
};

export default Finances;
