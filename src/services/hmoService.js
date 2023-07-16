import http from "./httpService";

const apiEndpoint = "/hmos";

export function getHmos() {
  return http.get(apiEndpoint);
}
export function deleteHmo(hmo) {
  return http.delete(`${apiEndpoint}/${hmo._id}`);
}
export function addHmo(hmo) {
  return http.post(apiEndpoint, hmo);
}
export function editHmo(hmo) {
  const hmoid = hmo._id;
  delete hmo._id;
  return http.put(`${apiEndpoint}/${hmoid}`, hmo);
}

export default { getHmos, deleteHmo, addHmo, editHmo };
