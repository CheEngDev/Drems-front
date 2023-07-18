import React, { useContext } from "react";
import moment from "moment";
import UserContext from "../context/userContext";

const CommisionPerDent = (props) => {
  const associates = props.associates;
  const payments = props.payments;
  const user = useContext(UserContext).user;

  const currentMonth = moment().month() + 1;
  const currentYear = moment().year();
  const currentDay = moment().date();

  const Month = payments.filter((payment) => {
    let [year, month] = payment.date.split("-");
    return currentMonth === +month && currentYear == year;
  });

  const Year = payments.filter((payment) => {
    let [year] = payment.date.split("-");
    return currentYear == year;
  });

  const Today = payments.filter((payment) => {
    let [year, month, today] = payment.date.split("-");
    return (
      currentMonth === +month && currentYear == year && currentDay === +today
    );
  });

  const commision = {
    Month: Month,
    Year: Year,
    Today: Today,
  };

  let filteredCommi = commision[props.dateFilter];

  console.log(filteredCommi);

  function computecommision(id) {
    const commisionpx = filteredCommi.filter((pay) => pay.handledby._id === id);
    let revenues = 0;
    for (let i = 0; i < commisionpx.length; i++) {
      revenues += commisionpx[i].treatment.procedure.amount;
    }

    return revenues * 0.1;
  }

  function computeTotalcommision() {
    const withoutowner = filteredCommi.filter(
      (commi) => filteredCommi[0].handledby._id !== user._id
    );

    let expenses = 0;
    for (let i = 0; i < withoutowner.length; i++) {
      expenses += withoutowner[i].treatment.procedure.amount;
    }
    return expenses * 0.1;
  }

  // Format for number to be currency
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "Php",
  });

  return (
    <div>
      <div className="max-h-[330px] overflow-y-auto">
        {associates.map((assoc) => (
          <div>
            <div key={assoc.id} className="flex py-1 border-b-2 justify-evenly">
              <div className="md:max-w-[200px] max-w-[150px] w-full translate-y-3 font-medium">{`Dr. ${assoc.lastName}, ${assoc.firstName} `}</div>
              <div className=" md:max-w-[200px] max-w-[150px] w-full ">
                <p className=" text-gray-500">Total Commision</p>
                {assoc._id === assoc.dentist ? (
                  <p>Clinic Owner</p>
                ) : (
                  <p>{formatter.format(computecommision(assoc._id))}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center text-lg">
        <h2 className="font-semibold">Total Commision</h2>
        <p className="mx-2">{formatter.format(computeTotalcommision())}</p>
      </div>
    </div>
  );
};

export default CommisionPerDent;
