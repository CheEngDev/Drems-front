import http from "./httpService";

const apiEndpoint = "/users";
const apiEndpoint2 = "users/dashboard";

export function register(user) {
  return http.post(apiEndpoint, user);
}

export function getUserInfo() {
  return http.get(apiEndpoint2);
}

export function editUserInfo(currentuser) {
  return http.put(`${apiEndpoint}/${currentuser._id}`, currentuser);
}

export default {
  register,
  getUserInfo,
  editUserInfo,
};
