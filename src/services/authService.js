import jwtDecode from "jwt-decode";
import http from "./httpService";

const apiEndpoint = "/auth";

http.setJwt(getJwt());

export async function login(user) {
  const { data: jwt } = await http.post(apiEndpoint, user);
  localStorage.setItem("token", jwt);
  console.log(jwt);
}
export function logout() {
  localStorage.removeItem("token");
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem("token");
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export function loginWithJwt(jwt) {
  localStorage.setItem("token", jwt);
}

export function getJwt() {
  return localStorage.getItem("token");
}

export default {
  login,
  logout,
  getCurrentUser,
  loginWithJwt,
};
