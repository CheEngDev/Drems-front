import http from "./httpService";

const apiEndpoint = "/patients";

export function getPatients() {
  return http.get(apiEndpoint);
}

export function addPatient(px) {
  return http.post(apiEndpoint, px);
}

export function editPatient(px) {
  const pxid = px._id;
  delete px._id;
  return http.put(`${apiEndpoint}/${pxid}`, px);
}

export function deletePatient(px) {
  return http.delete(`${apiEndpoint}/${px._id}`, px);
}

export default {
  getPatients,
  addPatient,
  editPatient,
  deletePatient,
};
