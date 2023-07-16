import http from "./httpService";

const apiEndPoint = "/procedures";

export function getProcedures() {
  return http.get(apiEndPoint);
}

export function deleteProcedure(proc) {
  return http.delete(`${apiEndPoint}/${proc._id}`);
}

export function addProcedure(proc) {
  return http.post(apiEndPoint, proc);
}

export function editProcedure(proc) {
  const procid = proc._id;
  delete proc._id;
  return http.put(`${apiEndPoint}/${procid}`, proc);
}

export default { getProcedures, deleteProcedure, addProcedure, editProcedure };
