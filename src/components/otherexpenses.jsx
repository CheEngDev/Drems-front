import React, { useContext } from "react";
import moment from "moment";
import _ from "lodash";
import expensesContext from "../context/expensesContext";
import { AiOutlineDelete } from "react-icons/ai";

const OtherExpenses = (props) => {
  // Context
  const expenseContext = useContext(expensesContext);

  const otherexpenses = props.otherexpenses;
  const currentMonth = moment().month() + 1;
  const currentYear = moment().year();
  const currentDay = moment().date();

  const Month = otherexpenses.filter((expenses) => {
    let [year, month] = expenses.date.split("-");
    return currentMonth === +month && currentYear == year;
  });

  const Year = otherexpenses.filter((expenses) => {
    let [year] = expenses.date.split("-");
    return currentYear == year;
  });

  const Today = otherexpenses.filter((expenses) => {
    let [year, month, today] = expenses.date.split("-");
    return (
      currentMonth === +month && currentYear == year && currentDay === +today
    );
  });

  const expenses = {
    Month: Month,
    Year: Year,
    Today: Today,
  };

  const filteredExpenses = expenses[props.dateFilter];

  const sortedExpenses = _.orderBy(filteredExpenses, "date", "desc");

  function computeTotalOtherExpenses() {
    let otherexpenses = 0;
    for (let i = 0; i < filteredExpenses.length; i++) {
      otherexpenses += filteredExpenses[i].amount;
    }
    return otherexpenses;
  }

  return (
    <div>
      <div className="max-h-[330px] overflow-y-auto ">
        {sortedExpenses.map((expense) => (
          <div
            key={expense._id}
            className="flex py-1 border-b-2 justify-evenly "
          >
            <div className="md:max-w-[200px] max-w-[150px] w-full translate-y-3 font-medium ml-2">{`${expense.description} `}</div>

            <div className=" md:max-w-[200px] max-w-[150px] w-full ">
              <p className=" text-gray-500">Expense</p>
              <p>{`Php ${expense.amount}.00`}</p>
            </div>
            <div className="md:max-w-[200px] max-w-[150px] w-full translate-y-3 font-medium">{`${moment(
              expense.date
            ).format("MM/DD/YYYY")} `}</div>
            <div className="mr-2">
              <AiOutlineDelete
                className="translate-y-4 cursor-pointer"
                size={18}
                onClick={() => expenseContext.deleteOtherExpense(expense)}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center text-lg">
        <h2 className="font-semibold">Total Revenue</h2>
        <p className="mx-2">{`Php ${computeTotalOtherExpenses()}.00`}</p>
      </div>
    </div>
  );
};

export default OtherExpenses;
