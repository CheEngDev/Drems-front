import http from "./httpService";

const apiEndPoint = "/pxphotos";

export function getMedHis() {
  return http.get(apiEndPoint);
}

export function addMedHis(medhis) {
  return http.post(apiEndPoint, medhis);
}

export function deleteMedHis(medhis) {
  return http.delete(`${apiEndPoint}/${medhis._id}`);
}

export function editMedHis(medhis) {
  const medhisid = medhis._id;
  delete medhis._id;
  return http.put(`${apiEndPoint}/${medhisid}`, medhis);
}

export default { getMedHis, addMedHis, deleteMedHis, editMedHis };
