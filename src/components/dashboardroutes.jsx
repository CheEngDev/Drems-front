import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import DashSidebar from "./dashsidebar";
import Dashboard from "./dashboard";
import Patients from "./patients";
import MyClinic from "./myclinic";
import Patient from "./patient";
import Finances from "./finances";
import Appointments from "./appointments";
import userService from "../services/userService";
import assocDentService from "../services/assocDentService";
import pxsService from "../services/pxsService";
import appointService from "../services/appointService";
import procedureService from "../services/procedureService";
import expensesServices from "../services/expensesServices";
import hmoService from "../services/hmoService";
import paymentService from "../services/paymentService";
import UserContext from "../context/userContext";
import pxListContext from "../context/pxListContext";
import appointmentContext from "../context/appointmentContext";
import procedureContext from "../context/procedureContext";
import hmoContext from "../context/hmoContext";
import expensesContext from "../context/expensesContext";
import assocDentContext from "../context/assocDentContext";
import paymentContext from "../context/paymentContext";
import treatmentContext from "../context/treatmentRecContext";
import dayjs from "dayjs";

const Dashboardroutes = () => {
  const [user, setUser] = useState({});
  const [associate, setAssociate] = useState([]);
  const [pxs, setPxs] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [procedures, setProcedures] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [otherExpense, setOtherexp] = useState([]);
  const [salaries, setSalaries] = useState([]);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    getUsers();
    getAssociate();
    getPatients();
    getAppointments();
    getProcedures();
    getHmos();
    getOtherExpenses();
    getSalaries();
    getPayments();
  }, []);

  // Get User Infos in backend
  async function getUsers() {
    const userinfo = await userService.getUserInfo();
    setUser(userinfo.data);
  }

  async function editUser(currentuser) {
    setUser(currentuser);

    const result = await userService.editUserInfo(currentuser);
  }

  // Get Associate in backend
  async function getAssociate() {
    const associates = await assocDentService.getAssocDents();
    setAssociate(associates.data);
  }
  // Add Associate
  async function addAssociate(assoc) {
    const result = await assocDentService.addAssocDent(assoc);
    setAssociate((oldArray) => [...oldArray, result.data]);
  }
  // Edit Associate
  async function editAssociate(assoc) {
    const associates = associate;
    let selectedassoc = associates.filter((a) => a._id === assoc._id);
    const index = associate.indexOf(selectedassoc[0]);
    associates[index] = {
      _id: assoc._id,
      firstName: assoc.firstName,
      lastName: assoc.lastName,
      dentist: assoc.dentist,
      date: assoc.date,
    };
    setAssociate(associates);

    const result = await assocDentService.editAssocDent(assoc);
    console.log(result);
  }
  // Delete Associate
  async function deleteAssociate(assoc) {
    const associates = associate.filter((a) => a._id !== assoc._id);
    setAssociate(associates);
    const deleted = await assocDentService.deletedAssocDent(assoc);
    console.log(deleted);
  }

  // Get Patients in backend
  async function getPatients() {
    const pxslist = await pxsService.getPatients();
    setPxs(pxslist.data);
  }
  // Add a Patient
  async function addPatient(px) {
    const result = await pxsService.addPatient(px);
    setPxs((oldArray) => [...oldArray, result.data]);
  }
  // Delete a Patient
  async function deletePatient(px) {
    const patients = pxs.filter((p) => p._id !== px._id);
    setPxs(patients);
    const deleted = await pxsService.deletePatient(px);
  }
  // Edit a Patient
  async function editPatient(px) {
    const patients = pxs;
    let selectedpx = patients.filter((p) => p._id === px._id);
    const index = pxs.indexOf(selectedpx[0]);
    patients[index] = {
      _id: px._id,
      firstName: px.firstName,
      lastName: px.lastName,
      sex: px.sex,
      age: px.age,
      email: px.email,
      number: px.number,
    };
    setPxs(patients);

    const result = await pxsService.editPatient(px);
  }

  // Get Appointments in backend
  async function getAppointments() {
    const appoint = await appointService.getAppointments();
    setAppointments(appoint.data);
  }
  // Add an Appointment
  async function addAppointment(appointment) {
    const result = await appointService.addAppointment(appointment);
    setAppointments((oldArray) => [...oldArray, result.data[0]]);
    return result.data;
  }
  // Delete an Appointment
  async function deleteAppointment(appointment) {
    const appointment2 = appointments.filter((a) => a._id !== appointment._id);
    setAppointments(appointment2);
    const deleted = await appointService.deleteAppointment(appointment);
  }
  // edit a Appointment
  async function editAppointment(appointment) {
    const appointments2 = appointments;
    console.log(appointment);
    let selectedappointment = appointments2.filter(
      (a) => a._id === appointment._id
    );
    const index = appointments.indexOf(selectedappointment[0]);
    appointments2[index] = {
      _id: appointment._id,
      patient: appointment.patient,
      date: appointment.date,
      startTime: appointment.startTime,
      dentistOD: appointment.dentistOD,
      procedure: appointment.procedure,
      dentist: appointment.dentist,
      remarks: appointment.remarks,
    };
    setAppointments(appointments2);
    let appointment2 = appointment;
    appointment2.patient = appointment.patient._id;
    appointment2.dentistOD = appointment.dentistOD._id;
    appointment2.procedure = appointment.procedure._id;
    appointment2.date = dayjs(appointment.date).format("YYYY/MM/DD");

    const result = await appointService.editAppointment(appointment2);
  }

  // Get Procedures in backend
  async function getProcedures() {
    const proc = await procedureService.getProcedures();
    setProcedures(proc.data);
  }
  // Add a Procedure
  async function addProcedure(procedure) {
    const result = await procedureService.addProcedure(procedure);
    setProcedures((oldArray) => [...oldArray, result.data]);
  }
  // Delete a Procedure
  async function deleteProcedure(procedure) {
    const procedures2 = procedures.filter((p) => p._id !== procedure._id);
    setProcedures(procedures2);
    const deleted = await procedureService.deleteProcedure(procedure);
  }
  // Edit a Procedure
  async function editProcedure(procedure) {
    const procedures2 = procedures;
    let selectedprocedure = procedures2.filter((p) => p._id === procedure._id);
    const index = procedures.indexOf(selectedprocedure[0]);
    procedures2[index] = {
      _id: procedure._id,
      name: procedure.name,
      amount: procedure.amount,
      dentist: procedure.dentist,
    };
    setProcedures(procedures2);

    const result = await procedureService.editProcedure(procedure);
  }

  // Get Hmo's in backend
  async function getHmos() {
    const hmos = await hmoService.getHmos();
    setCompanies(hmos.data);
  }
  // Add an Hmo
  async function addHmo(hmo) {
    const result = await hmoService.addHmo(hmo);
    setCompanies((oldArray) => [...oldArray, result.data]);
  }
  // Delete an Hmo
  async function deleteHmo(hmo) {
    const companies2 = companies.filter((company) => company._id !== hmo._id);
    setCompanies(companies2);
    const deleted = await hmoService.deleteHmo(hmo);
  }
  // Edit an HMO
  async function editHmo(hmo) {
    const companies2 = companies;
    let selectedcompany = companies2.filter((c) => c._id === hmo._id);
    const index = companies.indexOf(selectedcompany[0]);
    companies2[index] = {
      _id: hmo._id,
      name: hmo.name,
      number: hmo.number,
      dentist: hmo.dentist,
    };
    setProcedures(companies2);

    const updated = await hmoService.editHmo(hmo);
  }

  // Get Other Expenses from Backend
  async function getOtherExpenses() {
    const otherExpenses = await expensesServices.getOtherExpense();
    setOtherexp(otherExpenses.data);
  }
  // Add Other Expense
  async function addOtherExpense(expense) {
    const result = await expensesServices.addOtherExpense(expense);
    setOtherexp((oldArray) => [...oldArray, result.data]);
  }
  // Delete Other Expense
  async function deleteOtherExpense(expense) {
    const otherexpense2 = otherExpense.filter((oe) => oe._id !== expense._id);
    setOtherexp(otherexpense2);
    const deleted = await expensesServices.deleteOtherExpense(expense);
  }

  // Get Salaries
  async function getSalaries() {
    const salaries = await expensesServices.getSalaries();
    setSalaries(salaries.data);
  }
  // Add Salary
  async function addSalary(salary) {
    const result = await expensesServices.addSalary(salary);
    setSalaries((oldArray) => [...oldArray, result.data[0]]);
  }

  // Delete Salary
  async function deleteSalary(salary) {
    const salaries2 = salaries.filter((sa) => sa._id !== salary._id);

    setSalaries(salaries2);
    const deleted = await expensesServices.deleteSalary(salary);
    console.log(deleted);
  }

  // Get Payments
  async function getPayments() {
    const result = await paymentService.getPayments();
    setPayments(result.data);
  }

  // // Get Treatment Record
  // async function getTreatmentRec() {
  //   const result = await treatmentRecService.getTreatmentRec();
  //   setTreatmentrec(result.data);
  // }

  // // Add Treatment Record
  // async function addTreatmentrec(Tr) {
  //   const result = await treatmentRecService.addTreatmentRec(Tr);
  //   setTreatmentrec((oldArray) => [...oldArray, result.data]);
  // }

  // // Delete Treatment Record
  // async function deleteTreatmentrec(Tr) {
  //   const treatmentrec2 = treatmentrec.filter((tr) => tr._id !== Tr._id);

  //   setTreatmentrec(treatmentrec2);
  //   const result = await treatmentRecService.deletedTreatmentRec(Tr);
  // }

  return (
    <div className="md:flex items-stretch ">
      <paymentContext.Provider value={payments}>
        <hmoContext.Provider value={{ companies, addHmo, deleteHmo, editHmo }}>
          <expensesContext.Provider
            value={{
              otherExpense,
              addOtherExpense,
              deleteOtherExpense,
              salaries,
              addSalary,
              deleteSalary,
            }}
          >
            <appointmentContext.Provider
              value={{
                appointments,
                addAppointment,
                deleteAppointment,
                editAppointment,
              }}
            >
              <pxListContext.Provider
                value={{ pxs, addPatient, deletePatient, editPatient }}
              >
                <assocDentContext.Provider
                  value={{
                    associate,
                    addAssociate,
                    deleteAssociate,
                    editAssociate,
                  }}
                >
                  <UserContext.Provider value={{ user, editUser }}>
                    <procedureContext.Provider
                      value={{
                        procedures,
                        addProcedure,
                        deleteProcedure,
                        editProcedure,
                      }}
                    >
                      <DashSidebar />
                      <Routes>
                        <Route index element={<Dashboard />} />
                        <Route path="patients" element={<Patients />} />
                        <Route path="myclinic" element={<MyClinic />} />
                        <Route path="patients/:id" element={<Patient />} />
                        <Route path="finances" element={<Finances />} />
                        <Route path="appointments" element={<Appointments />} />
                      </Routes>
                    </procedureContext.Provider>
                  </UserContext.Provider>
                </assocDentContext.Provider>
              </pxListContext.Provider>
            </appointmentContext.Provider>
          </expensesContext.Provider>
        </hmoContext.Provider>
      </paymentContext.Provider>
    </div>
  );
};

export default Dashboardroutes;
