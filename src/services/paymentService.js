import http from "./httpService";

const apiEndPoint = "/payments";

export function getPayments() {
  return http.get(apiEndPoint);
}

export function addPayment(payment) {
  return http.post(apiEndPoint, payment);
}

export function deletePayment(payment) {
  return http.delete(`${apiEndPoint}/${payment._id}`);
}

export function editPayment(payment) {
  return http.put(`${apiEndPoint}/${payment._id}`, payment);
}

export default { getPayments, addPayment, deletePayment, editPayment };
