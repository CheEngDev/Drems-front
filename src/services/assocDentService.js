import http from "./httpService";

const apiEndPoint = "/associates";

export function getAssocDents() {
  return http.get(apiEndPoint);
}

export function addAssocDent(assoc) {
  return http.post(apiEndPoint, assoc);
}

export function deletedAssocDent(assoc) {
  return http.delete(`${apiEndPoint}/${assoc._id}`);
}

export function editAssocDent(assoc) {
  const associd = assoc._id;
  delete assoc._id;
  return http.put(`${apiEndPoint}/${associd}`, assoc);
}

export default {
  getAssocDents,
  addAssocDent,
  deletedAssocDent,
  editAssocDent,
};
