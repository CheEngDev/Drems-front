import http from "./httpService";

const apiEndpoint = "/treatmentrecords";

export function getTreatmentRec() {
  return http.get(apiEndpoint);
}

export function addTreatmentRec(tr) {
  return http.post(apiEndpoint, tr);
}

export function deletedTreatmentRec(tr) {
  return http.delete(`${apiEndpoint}/${tr._id}`);
}

export function editTreatmentRec(tr) {
  // const trid = tr._id;
  // delete tr._id;
  return http.put(`${apiEndpoint}/${tr._id}`, tr);
}

export default {
  getTreatmentRec,
  addTreatmentRec,
  deletedTreatmentRec,
  editTreatmentRec,
};
