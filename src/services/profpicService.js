import http from "./httpService";

const apiEndPoint = "/profpic";

export function getProfpic() {
  return http.get(apiEndPoint);
}

export function addProfpic(profpic) {
  return http.post(apiEndPoint, profpic);
}

export function editProfpic(profpic) {
  const profpicid = profpic._id;
  delete profpic._id;
  return http.put(`${apiEndPoint}/${profpicid}`, profpic);
}

export default {
  getProfpic,
  addProfpic,
  editProfpic,
};
