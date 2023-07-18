import http from "./httpService";

const apiEndPoint = "/pxpic";

export function getpxPic() {
  return http.get(apiEndPoint);
}

export function addpxPic(pxPic) {
  return http.post(apiEndPoint, pxPic);
}

export function editpxPic(pxPic) {
  const pxPicid = pxPic._id;
  delete pxPic._id;
  return http.put(`${apiEndPoint}/${pxPicid}`, pxPic);
}

export function deletepxPic(pxPic) {
  return http.delete(`${apiEndPoint}/${pxPic._id}`, pxPic);
}

export default {
  getpxPic,
  addpxPic,
  editpxPic,
  deletepxPic,
};
