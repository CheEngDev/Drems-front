import http from "./httpService";

// Other Expenses
const apiEndpointOtherExpense = "/otherexpense";

export function getOtherExpense() {
  return http.get(apiEndpointOtherExpense);
}

export function addOtherExpense(expense) {
  return http.post(apiEndpointOtherExpense, expense);
}

export function deleteOtherExpense(expense) {
  return http.delete(`${apiEndpointOtherExpense}/${expense._id}`);
}

// Salary Expense

const apiEndpointSalaries = "/salaries";

export function getSalaries() {
  return http.get(apiEndpointSalaries);
}

export function addSalary(salary) {
  return http.post(apiEndpointSalaries, salary);
}

export function deleteSalary(salary) {
  return http.delete(`${apiEndpointSalaries}/${salary._id}`);
}

export default {
  getOtherExpense,
  addOtherExpense,
  deleteOtherExpense,
  getSalaries,
  addSalary,
  deleteSalary,
};
